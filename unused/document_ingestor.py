import os
import json
import pdfplumber
from docx import Document
from pathlib import Path
import re

UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("output")
MAX_TOKENS = 800  # rough estimate, ~600–800 words

def extract_text_from_pdf(filepath):
    text = ""
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def extract_text_from_docx(filepath):
    doc = Document(filepath)
    paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    return "\n\n".join(paragraphs)

def chunk_text(text, max_tokens=MAX_TOKENS):
    paragraphs = re.split(r"\n{2,}", text)
    chunks, current_chunk = [], ""
    
    for para in paragraphs:
        para_words = para.split()
        if len(current_chunk.split()) + len(para_words) < max_tokens:
            current_chunk += para + "\n\n"
        else:
            chunks.append(current_chunk.strip())
            current_chunk = para + "\n\n"
    
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
    
    return chunks

def process_file(filepath):
    ext = filepath.suffix.lower()
    if ext == ".pdf":
        text = extract_text_from_pdf(filepath)
    elif ext == ".docx":
        text = extract_text_from_docx(filepath)
    else:
        return None
    
    chunks = chunk_text(text)
    return {
        "filename": filepath.name,
        "chunks": chunks
    }

def run_ingestion():
    OUTPUT_DIR.mkdir(exist_ok=True)
    files = list(UPLOAD_DIR.glob("*.pdf")) + list(UPLOAD_DIR.glob("*.docx"))

    for file in files:
        print(f"Processing: {file.name}")
        result = process_file(file)
        if result:
            output_file = OUTPUT_DIR / f"{file.stem}.json"
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    run_ingestion()

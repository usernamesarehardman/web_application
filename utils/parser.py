import pdfplumber
import docx2txt


def extract_text_from_pdf(path):
    """Extracts text from a PDF file.

    Args:
        path: The file path to the PDF.

    Returns:
        A string containing the extracted text.
    """
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"
    return text.strip()


def extract_text_from_docx(path):
    """Extracts text from a DOCX file.

    Args:
        path: The file path to the DOCX.

    Returns:
        A string containing the extracted text.
    """
    return docx2txt.process(path).strip()


def chunk_text(text, max_words=300):
    """Chunks text into smaller pieces with a maximum word count.

    Args:
        text: The input text to be chunked.
        max_words: The maximum number of words per chunk.

    Returns:
        A list of text chunks.
    """
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
    chunks = []
    current = ""

    for para in paragraphs:
        if len((current + " " + para).split()) <= max_words:
            current += "\n\n" + para
        else:
            if current:
                chunks.append(current.strip())
            current = para
    if current:
        chunks.append(current.strip())

    return chunks
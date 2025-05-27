import os
import re
import json
import smtplib
from flask import (
    Flask, request, render_template, send_from_directory, jsonify, redirect, 
    url_for, flash
)
from email.mime.text import MIMEText
from utils.parser import extract_text_from_pdf, extract_text_from_docx, chunk_text

# Flask app initialization
app = Flask(
    __name__,
    static_folder='static',
    template_folder='templates'
)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'


# Routes for normal pages
@app.route('/')
def home():
    """Render the home page."""
    return render_template('index.html')


@app.route('/about')
def about():
    """Render the about page."""
    return render_template('about.html')


@app.route('/contact')
def contact():
    """Render the contact page."""
    return render_template('contact.html')


# Routes for testing pages
@app.route('/testing/example')
def example():
    """Render the example testing page."""
    return render_template('testing/example.html')


@app.route('/testing/font')
def font():
    """Render the font testing page."""
    return render_template('testing/font.html')


@app.route('/testing/submit')
def submit_page():
    """Render the submit testing page."""
    return render_template('testing/submit.html')


@app.route('/testing/template')
def template():
    """Render the template testing page."""
    return render_template('testing/template.html')

# Routes for internal logic
@app.route('/ingest', methods=['POST'])
def ingest():
    run_ingestion()
    return jsonify({"status": "Ingestion complete"})


@app.route('/uploads', methods=['POST'])
def upload_file():
    """Handle file uploads and process the content."""
    if 'files' not in request.files:
        return 'No files part', 400

    files = request.files.getlist('files')
    if not files or all(file.filename == '' for file in files):
        return 'No selected files', 400

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs("output", exist_ok=True)  # ensure output dir exists once
    responses = []

    for file in files:
        if file.filename == '':
            continue

        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(upload_path)

        # Extract and chunk text
        if file.filename.lower().endswith(".pdf"):
            extracted_text = extract_text_from_pdf(upload_path)
        elif file.filename.lower().endswith(".docx"):
            extracted_text = extract_text_from_docx(upload_path)
        else:
            responses.append({
                "filename": file.filename,
                "status": "Unsupported file type"
            })
            continue

        chunks = chunk_text(extracted_text)

        # Save structured output to JSON
        output_filename = os.path.splitext(file.filename)[0] + ".json"
        output_path = os.path.join("output", output_filename)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump({
                "filename": file.filename,
                "chunks": chunks
            }, f, indent=2, ensure_ascii=False)

        responses.append({
            "filename": file.filename,
            "status": "Processed successfully",
            "num_chunks": len(chunks),
            "sample_chunk": chunks[0] if chunks else ""
        })

    return jsonify(responses)

@app.route("/delete_file", methods=["DELETE"])
def delete_file():
    """Delete a file from the server."""
    filename = request.args.get("filename", "")
    if not filename:
        return "No filename provided", 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({
            "status": "File deleted", 
            "refresh": True
        })
    else:
        return jsonify({"status": "File not found"}), 404

@app.route('/list_files')
def list_files():
    """List all uploaded files."""
    files = []

    try:
        if os.path.exists(app.config['UPLOAD_FOLDER']):
            for file_name in os.listdir(app.config['UPLOAD_FOLDER']):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
                if os.path.isfile(file_path):
                    files.append({
                        "name": file_name,
                        "size": os.path.getsize(file_path),
                        "url": f"/uploads/{file_name}"
                    })
    except Exception as e:
        print(f"Error listing files: {e}")
        return jsonify({"error": "Failed to list files"}), 500

    return jsonify(files)


@app.route('/uploads/<filename>')
def download_file(filename):
    """Download a specific file."""
    return send_from_directory(
        app.config['UPLOAD_FOLDER'], filename, as_attachment=True
    )


# Contact form handling
@app.route("/process_message", methods=["POST"])
def process_message():
    """Process the contact form message."""
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    # Validate input
    if not name or not email or not message:
        flash("All fields are required.", "danger")
        return redirect(url_for("contact"))

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        flash("Invalid email address.", "danger")
        return redirect(url_for("contact"))

    if len(message) > 500:
        flash("Message exceeds the 500-character limit.", "danger")
        return redirect(url_for("contact"))

    # Optional: Send an email
    # send_email(name, email, message)  # Uncomment to enable email sending

    flash("Message sent successfully!", "success")
    return redirect(url_for("contact"))


# Main entry point
if __name__ == '__main__':
    app.run(debug=True)
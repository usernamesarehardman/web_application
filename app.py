import os
from flask import Flask, request, render_template, send_from_directory, jsonify, redirect, url_for, flash
import re
import smtplib
from email.mime.text import MIMEText

# Initialization
app = Flask(__name__,
            static_folder='static',
            template_folder='templates')

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'

# Normal page routing
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Test page routing
@app.route('/testing/example')
def example():
    return render_template('testing/example.html')

@app.route('/testing/font')
def font():
    return render_template('testing/font.html')

@app.route('/testing/submit')
def submit_page():
    return render_template('testing/submit.html')

@app.route('/testing/template')
def template():
    return render_template('testing/template.html')

# Functions
# Upload file
@app.route('/uploads', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    # Ensure the uploads directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Save the file
    upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(upload_path)
    return 'File uploaded successfully!', 200

# Delete file
@app.route("/delete_file", methods=["DELETE"])
def delete_file():
    filename = request.args.get("filename", "")
    if not filename:
        return "No filename provided", 400
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return "File deleted", 200
    else:
        return "File not found", 404

# List files
@app.route('/list_files')
def list_files():
    files = []
    
    if os.path.exists(app.config['UPLOAD_FOLDER']):
        for file_name in os.listdir(app.config['UPLOAD_FOLDER']):
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            if os.path.isfile(file_path):
                files.append({
                    "name": file_name,
                    "size": os.path.getsize(file_path),
                    "url": f"/uploads/{file_name}"
                })
    
    return jsonify(files)

# Download file
@app.route('/uploads/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

# Contact form handling
@app.route("/process_message", methods=["POST"])
def process_message():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    # Validate input
    if not name or not email or not message:
        flash("All fields are required.", "danger")
        return redirect(url_for("contact_form"))
    
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        flash("Invalid email address.", "danger")
        return redirect(url_for("contact_form"))

    if len(message) > 500:
        flash("Message exceeds the 500-character limit.", "danger")
        return redirect(url_for("contact_form"))

    # Optional: Send an email
    # send_email(name, email, message)  # Uncomment to enable email sending

    flash("Message sent successfully!", "success")
    return redirect(url_for("contact_form"))

if __name__ == '__main__':
    app.run(debug=True)
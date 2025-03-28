import os
from flask import Flask, request, render_template, send_from_directory, jsonify

# Initialize the Flask app
app = Flask(__name__,
            static_folder='static',
            template_folder='templates')

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'  # Explicitly define upload folder

# Page routing
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Below are routes for testing
@app.route('/font')
def font():
    return render_template('font.html')

@app.route('/example')
def example_index():
    return render_template('example_index.html')

@app.route('/bootstrap')
def bootstrap_page():
    return render_template('bs.html')

@app.route('/submit')
def submit_page():
    return render_template('submit.html')

# File listing route
@app.route('/files')
def list_files():
    """Return a list of files in the uploads folder."""
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        return jsonify([])  # Return empty list if the folder doesn't exist
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)

# File retrieval route
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve files from the uploads folder."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# File upload route
@app.route('/uploads', methods=['POST'])
def upload_file():
    """Handle file uploads."""
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
    return 'File uploaded successfully!'

if __name__ == '__main__':
    app.run(debug=True)

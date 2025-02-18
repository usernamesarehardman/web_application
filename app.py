import os
from flask import Flask, request, render_template

# Initialize the Flask app
app = Flask(__name__,
            static_folder='static',
            template_folder='templates')

# Configure upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/uploads', methods=['POST'])
def upload_file():
    # Check if a file was sent with the request
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    # Check if the file has a name
    if file.filename == '':
        return 'No selected file', 400

    # Define the upload path and save the file
    upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    
    # Ensure the uploads directory exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Save the file
    file.save(upload_path)
    return 'File uploaded successfully!'

if __name__ == '__main__':
    app.run(debug=True)
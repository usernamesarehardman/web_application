# Web App Project

This is a simple web application built using **Flask** for the backend and **HTML, CSS, JavaScript** for the frontend. The app allows for dynamic content rendering and is designed to integrate with a database in the future.

## Project Structure

### Files and their Intended Purpose

- **app.py**: Main backend file that runs the Flask application. Defines routes and serves HTML templates.
  
- **templates/index.html**: The main HTML template that is rendered by Flask. Displays the welcome message for the web app.

- **start_app.bat**: A batch script to automate the process of starting the Flask app. It runs the `python app.py` command to start the server with a single click.

- **static/**: This folder will contain static files such as CSS, JavaScript, and image assets that are used by the frontend.

- **templates/**: Folder where HTML files and templates will be stored. Flask will look here to render templates dynamically.

## Requirements

Before running the app, make sure you have the following installed:

- **Python**: Version 3.6 or later. You can check your Python version by running:
```bash
python --version
```
- **Flask**: The web framework used for the backend. Install it using `pip`:
```bash
pip install flask
```
- **Git**: For version control and cloning the repository. If you don't have it installed, follow the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/usernamesarehardman/web-application.git
   cd web-application
    ```
2. **Install Flask**:
   If you haven't already installed Flask, you can install it via `pip`:
   ```bash
   pip install flask
   ```
3. **Start the Flask application**:
   To run the app, you can either:
   - Manually run the Flask app with:
     ```bash
     python app.py
     ```
   - Or use the batch script (`start_app.bat`) to automatically start the app:
     - Simply double-click the `start_app.bat` file.
4. **Access the app**:
   Open your browser and go to `http://127.0.0.1:5000/` to see your web application.

## To-Do List / Planned Workflow

### **Frontend Enhancements**
- [ ] Improve styling using **CSS** or **Bootstrap**.
- [ ] Add JavaScript interactivity, such as form validation and dynamic content.
- [ ] Implement **responsive design** to make the app mobile-friendly.

### **Backend Enhancements**
- [ ] Set up **SQLite** or **PostgreSQL** for database integration.
- [ ] Add more routes to handle additional pages or API endpoints.
- [ ] Implement **user authentication** (login, signup, and logout functionality).
- [ ] Use **Flask-WTF** for form handling and validation.

### **Frontend & Backend Integration**
- [ ] Create **forms** in the frontend to send data to the backend.
- [ ] Implement **AJAX** for asynchronous data exchange between frontend and backend.
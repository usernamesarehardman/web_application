@echo off
echo Starting Flask app...

:: Activate the virtual environment
call venv\Scripts\activate

:: Run the Flask app
py -m flask run
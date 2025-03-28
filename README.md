# Democratizing Generative AI Quiz Creation: Accelerating Assessment Development in Engineering Education

## Introduction

Generative Artificial Intelligence (GenAI) is experiencing rapid growth across numerous industries, with its adoption expected to expand even further. Despite its potential, educational institutions, particularly those with limited funding, struggle to integrate GenAI into their workflows due to technical challenges and resource constraints. This research addresses these barriers by developing an autonomous GenAI-powered quiz generation system designed to streamline the creation of assessments. The system will automatically integrate course materials into Learning Management Systems (LMS), enhancing accessibility for educators while preserving the pedagogical quality of assessments. This project aims to bridge the gap between technological innovation and educational application, empowering instructors with efficient tools to improve learning outcomes.

## Repository Structure
```
📁 websitename.domain/   
├── 📁 static/              # Folder for static files (JS, CSS, etc.)  
│   ├── 📁 css/  
│   │   └── 📄 style.css    # CSS for styling the webpage 
│   ├── 📁 images/  
│   │   └── ...             # Location for stored images
│   └── 📁 js/
│       └── 📄 script.js    # JavaScript for handling file drop and preview
├── 📁 templates/           # Folder containing HTML files
│   ├── 📄 index.html       # Homepage
│   └── ...                 # Future pages will be located here       
├── 📁 uploads              # Folder containing user-uploaded files  
├── 📄 app.py               # Python script containing the Flask application  
└── 📄 README.md            # This file  
```

### Prerequisites

Make sure you have the following installed on your system:
- Python 3.x
- Flask (`pip install flask`)
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

## Background and Significance

Recent research suggests that integrating AI into educational practices could enable teachers to reallocate between 20% and 40% of their time (McKinsey, 2020). Despite this potential, many existing AI tools remain inaccessible due to their complexity and the need for advanced programming knowledge. This project proposes developing an AI agent with an intuitive interface to simplify advanced data analysis, making it accessible to educators across disciplines. By lowering technical barriers, this AI-driven solution aims to democratize data analysis and empower educators from diverse backgrounds to harness analytical capabilities for enhanced teaching and research outcomes.

## Hypothesis

I. Implementing a GenAI-powered quiz generation system will reduce the time educators spend on lesson planning.

II. Machine learning models optimized for educational purposes will generate assessment materials of comparable or superior quality to those produced through traditional methods.

III. A well-designed and user-friendly front-end interface will enhance accessibility for educators, lowering technical barriers and promoting broader adoption of GenAI tools in assessment creation.

## Research Objectives

I. Develop a front-end web interface with an accessible interface and back-end system utilizing a relational database for the AI agent to interact with user-uploaded files.

II. Develop a semi-autonomous AI agent to analyze materials and generate educational content for educators to utilize.

III. Evaluate the agent’s performance for accuracy, quality, speed, and ability to interface with LMS systems.

IV. Provide recommendations for integrating the AI agent into educational environments.

## Conclusion

This research aims to address the challenges educators face in adopting Generative AI for assessment creation by developing an accessible, GenAI-powered quiz generation system. Through efficient integration with LMS and a user-friendly front-end interface, this solution seeks to streamline the assessment design process while maintaining high pedagogical standards. The anticipated outcomes include increased efficiency, broader educational adoption, and improved educational experiences. By democratizing access to advanced AI tools, this project has the potential to contribute meaningfully to the evolution of engineering education and future academic technologies.

## To-Do List
- [ ] Clean up CSS folder
- [ ] Clean up redundant CSS code
- [ ] Clean up redundant JS code
- [ ] Split JS code into multiple digestible files
- [ ] Clean up app.py
- [ ] Update references to include Bootstrap
- [ ] Update README
- [ ] Address commented TODO and FIXME

### Research
- [ ] Content security policy
- [ ] SQLite
- [ ] PostgreSQL
- [ ] APT endpoints
- [ ] User authentication
- [ ] Flask-WTF
- [ ] AJAX
- [ ] HIPAA

## References
1. ChatGPT. (2025). *Content partially generated using OpenAI's ChatGPT-4o*. Retrieved from OpenAI API.
2. Bryant, J., Heitz, C., Sanghvi, S., & Wagle, D. (2020, January 14). How artificial intelligence will impact K-12 teachers. McKinsey. https://www.mckinsey.com/industries/education/our-insights/how-artificial-intelligence-will-impact-k-12-teachers
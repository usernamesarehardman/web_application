# Democratizing Generative AI Quiz Creation: Accelerating Assessment Development in Engineering Education

## Introduction

Generative Artificial Intelligence (GenAI) is experiencing rapid growth across numerous industries, with its adoption expected to expand even further. Despite its potential, educational institutions, particularly those with limited funding, struggle to integrate GenAI into their workflows due to technical challenges and resource constraints. This research addresses these barriers by developing an autonomous GenAI-powered quiz generation system designed to streamline the creation of assessments. The system will automatically integrate course materials into Learning Management Systems (LMS), enhancing accessibility for educators while preserving the pedagogical quality of assessments. This project aims to bridge the gap between technological innovation and educational application, empowering instructors with efficient tools to improve learning outcomes.

## Repository Structure
```
📁 web_application/   
├── 📁 static/              # Folder for static files (JS, CSS, etc.)  
│   ├── 📁 css/  
│   │   ├── 📁 fonts/       # Contains custom fonts
│   │   ├── 📄 styles.css   # CSS for styling the webpage 
│   │   └── ...             # Other .css files
│   ├── 📁 images/  
│   │   └── ...             # Location for stored images
│   └── 📁 js/
│       ├── 📄 main.js      # JavaScript for handling file drop and preview
│       └── ...             # Other .js files
├── 📁 templates/           # Folder containing HTML files
│   ├── 📄 index.html       # Homepage
│   └── ...                 # Future pages will be located here       
├── 📁 uploads/             # Folder containing user-uploaded files   
├── 📄 app.py               # Python script containing the Flask application  
├── 📄 start_app.bat        # Batch script to start the Flask application  
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

## Abstract

Generative Artificial Intelligence (GenAI) is experiencing rapid growth across numerous industries, with its adoption expected to expand even further. Despite its potential, educational institutions, particularly those with limited funding, struggle to integrate GenAI into their workflows due to technical challenges and resource constraints. This research addresses these barriers by developing an autonomous GenAI-powered quiz generation system designed to streamline the creation of assessments. The system will automatically integrate course materials into Learning Management Systems (LMS), enhancing accessibility for educators while preserving the pedagogical quality of assessments. This project aims to bridge the gap between technological innovation and educational application, empowering instructors with efficient tools to improve learning outcomes.

## Background and Significance

Severe teacher shortages are a critical challenge facing education systems worldwide. For example, 33 countries currently lack enough teachers to ensure universal primary education by 2030. To meet this goal, the world would need to recruit up to 25.8 million schoolteachers (UNESCO Institute for Statistics, 2015). To address these issues, the education sector should begin leveraging technology to enhance teaching efficiency and reduce workload burdens, administrative tasks, and teacher burnout. Recent research suggests that AI integration in education (AIED) could enable teachers to reallocate between 20% and 40% of their time (McKinsey & Company, 2020). Traditional quiz creation is often a time-consuming and labor-intensive process that relies on manual input and fixed question formats, whereas an AI-driven approach can dynamically generate assessments tailored to course content. This not only saves time but also allows for more adaptive and personalized testing methods. According to a systemic analysis by Zawacki-Richter, O., Marín, V. I., Bond, M., and Gouverneur, F. (2019), which examined over 20 years of research on AIED, the authors assert that “Overall, the studies show that AI applications can perform assessment and evaluation tasks with remarkable accuracy and efficiency” (p. 17). Despite this potential, many existing AI tools remain inaccessible due to their complexity and the need for advanced programming knowledge. Luckin, R., Holmes, W., Griffiths, M., and Forcier, L. B. (2016) describe AIED as, “something of a cottage industry” continuing that, “development of a single monolithic AIEd system that tackles every subject, and every possible learning scenario [is not feasible]. Instead, success will lie in the development of a multitude of individual AIEd components that specialise in a particular expertise” (p. 51). Further research supports this idea, with Roll, I., and Wylie, R. (2016) arguing that AIED should leverage existing resources, such as Innovative Learning Environments (ILEs), which use technology to shape teaching approaches. They contend that there is no need to reinvent the wheel, noting that ILE developers currently create their own content, a process that is both labor-intensive and inefficient. They suggest, “Instead, we suggest to build ILE that operates as a shell or an envelope for existing learning objects” (p. 594) This project aligns with this perspective, proposing the development of an AI agent with an intuitive interface to simplify advanced data analysis. By utilizing existing resources and reducing technical barriers, this AI-driven solution aims to democratize data analysis, enabling educators from diverse disciplines to harness its capabilities for enhanced teaching and research outcomes.

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
- [ ] Clean up redundant JS code
- [ ] Clean up `app.py`
- [ ] Address polluted `requirements.txt`
- [ ] Address commented TODO and FIXME
- [ ] Remove testing features

## References
1. ChatGPT. (2025). *Content Partially Generated Using OpenAI's ChatGPT-4o.* Retrieved from OpenAI API.
2. Bryant, J., Heitz, C., Sanghvi, S., & Wagle, D. (2020, January 14). *How Artificial Intelligence Will Impact K-12 Teachers.* McKinsey & Company. https://www.mckinsey.com/industries/education/our-insights/how-artificial-intelligence-will-impact-k-12-teachers .
3. Luckin, R., Holmes, W., Griffiths, M., & Forcier, L. B. (2016). *Intelligence Unleashed: An Argument for AI in Education.* Pearson Education. https://www.pearson.com/corporate/about-pearson/what-we-do/innovation/smarter-digital-tools/intelligence-unleashed.html .
4. Roll, I., & Wylie, R. (2016). *Evolution and Revolution in Artificial Intelligence in Education.* International Journal of Artificial Intelligence in Education, 26(2), 582-599. https://doi.org/10.1007/s40593-016-0110-3 .
5. UNESCO. (2015). *Sustainable Development Goal for Education Cannot Advance Without More Teachers (UIS Fact Sheet No. 33).* UNESCO Institute for Statistics. http://www.uis.unesco.org/Education/Documents/fs33-2015teachers.pdf .
6. Zawacki-Richter, O., Marín, V. I., Bond, M., & Gouverneur, F. (2019). *Systematic Review of Research on Artificial Intelligence Applications in Higher Education.* International Journal of Educational Technology in Higher Education, 16(1), 39. https://doi.org/10.1186/s41239-019-0171-0 .
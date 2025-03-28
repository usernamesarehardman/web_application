const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileNameDisplay = document.getElementById('file-name-display');
const form = document.getElementById('upload-form');

// Prevent default drag behaviors
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('dragging');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragging');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('dragging');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        updateFileNameDisplay(files[0]);
    }
});

// Open file dialog when clicking the Browse button
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

// Set file input value when files are selected manually
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        updateFileNameDisplay(fileInput.files[0]);
    }
});

// Update the file name display and enable the upload button
function updateFileNameDisplay(file) {
    fileNameDisplay.textContent = `Selected file: ${file.name}`;
    uploadBtn.disabled = false;
}

// Optional: Add a submit handler if needed to show an upload confirmation
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch('/uploads', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Error:', error));
});

// Smooth Scrolling for navbar links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const linkUrl = new URL(this.href, window.location.href); // Get absolute URL
        const currentPageUrl = new URL(window.location.href); // Get current page URL

        if (linkUrl.origin === currentPageUrl.origin && linkUrl.pathname === currentPageUrl.pathname && linkUrl.hash) {
            e.preventDefault(); // Stop default link behavior

            const section = document.querySelector(linkUrl.hash); // Select section
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
            } else {
                console.warn('Section not found for hash:', linkUrl.hash);
            }
        } else {
            // Allow default behavior for different page links
            console.log(`Navigating to different page: ${linkUrl.href}`);
        }
    });
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle visibility of the floating contact form
document.querySelector('.floating-contact-button').addEventListener('click', function() {
    var form = document.querySelector('.floating-contact-form');
    
    // Toggle form visibility
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';  // Show the form
    } else {
        form.style.display = 'none';  // Hide the form
    }
});

// Nav bar hide on scroll down, show on scroll up
let lastScrollPosition = 0;
const header = document.querySelector('header');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition > lastScrollPosition) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollPosition = currentScrollPosition;
            ticking = false;
        });

        ticking = true;
    }
});
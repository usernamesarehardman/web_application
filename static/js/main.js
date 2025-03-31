// Drag and drop file upload functionality
document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const uploadForm = document.getElementById("upload-form");
    const fileInput  = document.getElementById("file-input");

    if (!dropArea || !uploadForm || !fileInput) return;

    ["dragenter", "dragover", "dragleave", "drop"].forEach(evtName => {
        dropArea.addEventListener(evtName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ["dragenter", "dragover"].forEach(evtName => {
        dropArea.addEventListener(evtName, () => {
            dropArea.classList.add("dragging");
        });
    });

    ["dragleave", "drop"].forEach(evtName => {
        dropArea.addEventListener(evtName, () => {
            dropArea.classList.remove("dragging");
        });
    });

    // Instead of auto-upload, just set the dropped files in the file input
    dropArea.addEventListener("drop", e => {
        const droppedFiles = e.dataTransfer.files;
        if (!droppedFiles.length) return;
        
        // Create a new DataTransfer to populate file input
        const dt = new DataTransfer();
        for (let file of droppedFiles) {
            dt.items.add(file);
        }
        // Now the fileInput contains the dropped files
        fileInput.files = dt.files;
    });
});

// Show or hide the back-to-top button based on scroll position
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Update the year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
    
// Fetch and display the list of files
document.addEventListener("DOMContentLoaded", function() {
    fetch("/list_files")
        .then(response => response.json())
        .then(files => {
            let tableBody = document.getElementById("file-list");
            tableBody.innerHTML = ""; // Clear loading text

            if (files.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='4' class='text-center'>No files found</td></tr>";
                return;
            }

            files.forEach(file => {
                let row = `<tr>
                    <td>${file.name}</td>
                    <td>${(file.size / 1024).toFixed(2)} KB</td>
                    <td><a href="${file.url}" class="download-btn" download>Download</a></td>
                    <td><button class="button delete-btn" data-filename="${file.name}">Delete</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            // Add event listeners to delete buttons
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const filename = this.getAttribute("data-filename");
                    deleteFile(filename);
                });
            });
        })
        .catch(error => console.error("Error fetching files:", error));
});

// Function to upload a file
document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById("upload-form");
    if (uploadForm) {
        uploadForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(uploadForm);

            fetch("/uploads", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert("File uploaded successfully.");
                    // Refresh or re-fetch the list of files
                    document.dispatchEvent(new Event("DOMContentLoaded"));
                } else {
                    alert("Failed to upload file.");
                }
            })
            .catch(error => console.error("Error uploading file:", error));
        });
    }
});

// Function to delete a file
function deleteFile(filename) {
    fetch(`/delete_file?filename=${encodeURIComponent(filename)}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                alert("File deleted successfully.");
                // Refresh the file list
                document.dispatchEvent(new Event("DOMContentLoaded"));
            } else {
                alert("Failed to delete the file.");
            }
        })
        .catch(error => console.error("Error deleting file:", error));
}
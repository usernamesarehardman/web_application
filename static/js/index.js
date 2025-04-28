// Drag and drop file upload functionality
document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const uploadForm = document.getElementById("upload-form");
    const fileInput  = document.getElementById("file-input");

    if (!dropArea || !uploadForm || !fileInput) {
        console.error("Missing required elements:", {
            dropArea: !!dropArea,
            uploadForm: !!uploadForm,
            fileInput: !!fileInput
        });

        // Display an error message to the user if elements are missing
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Required elements for file upload are missing. Please contact support.";
        errorMessage.style.color = "red";
        errorMessage.style.textAlign = "center";
        errorMessage.style.marginTop = "20px";
        document.body.prepend(errorMessage);

        // Disable drag-and-drop functionality
        return;
    }

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
    // This allows the user to review the files before uploading
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

// Functions to handle file upload
document.addEventListener("DOMContentLoaded", () => {

    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file-input");

    if (!uploadForm || !fileInput) {
        console.warn("Upload form or file input not found. File upload functionality will be disabled.");
        return;
    }

    const allowedExtensions = ["py", "txt", "csv", "json", "xml", "pdf"]; // Extensions that can be parsed in Python
    const uploadedFiles = new Set(); // Track uploaded files to prevent duplicates

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const files = fileInput.files;

        if (files.length === 0) {
            alert("No files selected. Please choose a file to upload.");
            return;
        }

        const formData = new FormData();
        let validFiles = true;

        for (let file of files) {
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                alert(`File "${file.name}" has an unsupported file type. Allowed types: ${allowedExtensions.join(", ")}`);
                validFiles = false;
                break;
            }

            if (uploadedFiles.has(file.name)) {
                alert(`File "${file.name}" has already been uploaded.`);
                validFiles = false;
                break;
            }

            formData.append("files", file);
        }

        if (!validFiles) return;

        try {
            const response = await fetch("/uploads", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "File(s) uploaded successfully.");
                // Update the uploadedFiles set with the names of successfully uploaded files
                for (let file of files) {
                    uploadedFiles.add(file.name);
                }

                // Refresh the file list
                document.dispatchEvent(new Event("DOMContentLoaded"));
            } else {
                console.error("Upload failed:", data);
                alert(data.message || "Failed to upload file(s).");
            }
        } catch (error) {
            console.error("Error uploading file(s):", error);
            alert("An error occurred while uploading the file(s). Please try again.");
        }
    });
});

// Function to delete a file
function deleteFile(filename) {
    if (confirm(`Are you sure you want to delete the file "${filename}"?`)) {
        fetch(`/delete_file?filename=${encodeURIComponent(filename)}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    // Refresh the file list
                    document.dispatchEvent(new Event("DOMContentLoaded"));
                } else {
                    alert("Failed to delete the file.");
                }
            })
            .catch(error => console.error("Error deleting file:", error));
    }
}

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => { 
    const container = document.getElementById("file-inputs-container");

    // Add an event listener to the container to handle changes in any file input within it
    container.addEventListener("change", (event) => {
        const target = event.target;
        
        // Check if the event target is a file input and if at least one file is selected
        if (target.matches('input[type="file"][name="files"]') && target.files.length > 0) {
            // If the file input was previously empty and now has a file, add a new blank file input
            addNewFileInput(container);
        }
    });
});

// Function to dynamically add a new file input field
function addNewFileInput(container) { 
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.name = "files";
    newInput.classList.add("form-control", "mb-3");
    
    // Append the new input to the container (e.g., before the "Upload" button or at the end)
    container.appendChild(newInput);
}
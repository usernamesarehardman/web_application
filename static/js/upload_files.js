// upload_files.js

document.addEventListener("DOMContentLoaded", () => {
    // Ensure you reference the correct form and file input container
    const uploadForm = document.getElementById("upload-form"); // Corrected the ID here

    if (!uploadForm) {
        console.error('Form with id "upload-form" not found.'); // Adjusted error message to match the ID
        return;
    }

    const fileInputContainer = document.getElementById("file-inputs-container");
    const allowedExtensions = ["jpg", "png", "pdf", "docx", "txt"];  // Define the allowed extensions
    const uploadedFiles = new Set();  // Keep track of uploaded files

    // Set uploading state to disable buttons/indicators during upload
    function setUploadingState(isUploading) {
        const uploadButton = document.getElementById("uploadFormButton");
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');

        if (isUploading) {
            uploadButton.disabled = true;
            fileInputs.forEach(input => input.disabled = true);  // Disable inputs during upload
        } else {
            uploadButton.disabled = false;
            fileInputs.forEach(input => input.disabled = false);  // Enable inputs after upload
        }
    }

    // Add event listener for file input change to check for valid file slots
    fileInputContainer.addEventListener("change", checkFileSlots);

    // Check if there are empty file input slots and add/remove new slots
    function checkFileSlots() {
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');
        const emptySlots = Array.from(fileInputs).filter(input => !input.files.length);
        
        if (emptySlots.length === 0) {
            addFileInputSlot();
        } else if (emptySlots.length > 1) {
            removeEmptyFileInputSlot();
        }
    }

    // Handle form submission for file upload
    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"][name="files"]');
        let hasValidFiles = false;

        for (const input of fileInputs) {
            if (!input.files.length) continue;

            for (const file of input.files) {
                const extension = file.name.split(".").pop().toLowerCase();

                if (!allowedExtensions.includes(extension)) {
                    alert(`Unsupported file type: "${file.name}". Allowed types: ${allowedExtensions.join(", ")}`);
                    return;
                }

                if (uploadedFiles.has(file.name)) {
                    alert(`Duplicate file: "${file.name}" has already been uploaded.`);
                    return;
                }

                formData.append("files", file);
                hasValidFiles = true;
            }
        }

        // Prevent submission if no valid files or empty slots
        if (!hasValidFiles) {
            alert("No valid files selected. Please choose a file to upload.");
            return;
        }

        if (fileInputs.length === 0 || Array.from(fileInputs).some(input => !input.files.length)) {
            alert("Please fill in or remove all empty file slots.");
            return;
        }

        try {
            setUploadingState(true);

            const response = await fetch("/uploads", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Upload failed:", result);
                alert(result.message || "File upload failed.");
                return;
            }

            result.forEach(fileInfo => {
                if (fileInfo.status === "Processed successfully") {
                    uploadedFiles.add(fileInfo.filename);
                }
            });

            // Refresh the file list to display the newly uploaded files
            refreshFileList();

            alert("File(s) uploaded successfully.");
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("An unexpected error occurred during upload.");
        } finally {
            setUploadingState(false);
        }
    });

    // Function to refresh the list of files displayed on the page (calls list_files.js)
    window.refreshFileList = function () {
        const tableBody = document.getElementById("file-list");
        if (!tableBody) {
            console.warn("File list table body not found.");
            return;
        }

        // Display a loading indicator while fetching the file list
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading files...</span>
                    </div>
                    <p class="mt-2">Loading files, please wait...</p>
                </td>
            </tr>
        `;

        fetch("/list_files")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch file list.");
                }
                return response.json();
            })
            .then(files => {
                tableBody.innerHTML = ""; // Clear loading indicator

                // If no files are found, display a message
                if (files.length === 0) {
                    tableBody.innerHTML = `
                        <tr>
                            <td colspan="4" class="text-center">No files found.</td>
                        </tr>
                    `;
                    return;
                }

                // Loop through each file and add a row to the table
                files.forEach(file => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${file.name}</td>
                        <td>${(file.size / 1024).toFixed(2)} KB</td>
                        <td>
                            <a href="${file.url}" class="btn btn-sm btn-outline-primary" download aria-label="Download ${file.name}">
                                Download
                            </a>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger delete-btn" data-filename="${file.name}" aria-label="Delete ${file.name}">
                                Delete
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Attach delete handlers to buttons after rendering file list
                attachDeleteHandlers();
            })
            .catch(error => {
                console.error("Error fetching file list:", error);
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-danger text-center">
                            Error loading file list. Please try again later.
                        </td>
                    </tr>
                `;
            });
    };

    // Attach delete handlers for file deletion actions
    function attachDeleteHandlers() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        const modal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"));
        const confirmBtn = document.getElementById("confirmDeleteBtn");
        const message = document.getElementById("deleteConfirmMessage");

        let fileToDelete = null;

        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const filename = button.getAttribute("data-filename");
                if (!filename) return;

                fileToDelete = filename;
                message.textContent = `Are you sure you want to delete "${filename}"? This action cannot be undone.`;
                modal.show();
            });
        });

        confirmBtn.addEventListener("click", () => {
            if (!fileToDelete) return;

            confirmBtn.disabled = true;

            fetch(`/delete_file?filename=${encodeURIComponent(fileToDelete)}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete file.");
                modal.hide();
                refreshFileList();
                fileToDelete = null;
                confirmBtn.disabled = false;
            })
            .catch(error => {
                console.error("Error deleting file:", error);
                alert("Failed to delete file. Please try again.");
                confirmBtn.disabled = false;
            });
        });
    }

    // Add event listener to "+ Add File" button to create new file input
    const addFileButton = document.getElementById("add-file-button");
    if (addFileButton) {
        addFileButton.addEventListener("click", () => {
            const newInput = document.createElement("input");
            newInput.type = "file";
            newInput.classList.add("form-control", "mb-3"); // Ensure it has the same styling
            newInput.name = "files";
            fileInputContainer.appendChild(newInput);
        });
    }

    // Trigger file list refresh on page load
    refreshFileList();
});
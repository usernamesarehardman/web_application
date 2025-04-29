document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");

    if (!uploadForm) {
        console.error('Form with id "upload-form" not found.');
        return;
    }

    const fileInputContainer = document.getElementById("file-inputs-container");
    const allowedExtensions = ["jpg", "png", "pdf", "docx", "txt"];
    const uploadedFiles = new Set();

    function setUploadingState(isUploading) {
        const uploadButton = document.getElementById("uploadFormButton");
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');

        if (isUploading) {
            uploadButton.disabled = true;
            fileInputs.forEach(input => input.disabled = true);
        } else {
            uploadButton.disabled = false;
            fileInputs.forEach(input => input.disabled = false);
        }
    }

    fileInputContainer.addEventListener("change", checkFileSlots);

    function checkFileSlots() {
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');
        const emptySlots = Array.from(fileInputs).filter(input => !input.files.length);

        if (emptySlots.length > 1) {
            removeEmptyFileInputSlot();
        }
    }

    function removeEmptyFileInputSlot() {
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');
        const emptySlots = Array.from(fileInputs).filter(input => !input.files.length);

        // Remove the last empty file input
        if (emptySlots.length > 1) {
            emptySlots[emptySlots.length - 1].parentElement.remove();
        }
    }

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
    
            refreshFileList();
    
            alert("File(s) uploaded successfully.");
    
            // Clear the file input fields after a successful upload
            fileInputs.forEach(input => input.value = "");
    
            // Optionally, remove empty file inputs if you want
            checkFileSlots();
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("An unexpected error occurred during upload.");
        } finally {
            setUploadingState(false);
        }
    });

    window.refreshFileList = function () {
        const tableBody = document.getElementById("file-list");
        if (!tableBody) {
            console.warn("File list table body not found.");
            return;
        }

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
                tableBody.innerHTML = "";

                if (files.length === 0) {
                    tableBody.innerHTML = `  
                        <tr>
                            <td colspan="4" class="text-center">No files found.</td>
                        </tr>
                    `;
                    return;
                }

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

                // Attach delete handlers
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

    const addFileButton = document.getElementById("add-file-button");
    if (addFileButton) {
        addFileButton.addEventListener("click", () => {
            const newInputWrapper = document.createElement("div");
            newInputWrapper.classList.add("file-input-wrapper", "mb-3", "d-flex", "align-items-center");

            const newInput = document.createElement("input");
            newInput.type = "file";
            newInput.classList.add("form-control");
            newInput.name = "files";
            newInputWrapper.appendChild(newInput);

            // Create the delete button for this file input
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("btn", "btn-sm", "btn-danger", "delete-file-input", "ms-2");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                newInputWrapper.remove();
            });
            newInputWrapper.appendChild(deleteButton);

            fileInputContainer.appendChild(newInputWrapper);
        });
    }

    refreshFileList();
});

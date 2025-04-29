document.addEventListener("DOMContentLoaded", () => {
    const fileInputContainer = document.getElementById("file-inputs-container");
    const addFileButton = document.getElementById("add-file-button");
    const allowedExtensions = ["jpg", "png", "pdf", "docx", "txt"];
    const uploadedFiles = new Set();

    // Handle drag and drop functionality
    const dropArea = document.getElementById("drag-drop-area");
    
    if (dropArea) {
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropArea.classList.add("drag-over");
        });

        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("drag-over");
        });

        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            dropArea.classList.remove("drag-over");
            handleFiles(event.dataTransfer.files);
        });
    }

    // Check if there are empty file input slots and add/remove new slots
    function checkFileSlots() {
        const fileInputs = fileInputContainer.querySelectorAll('input[type="file"]');
        const emptySlots = Array.from(fileInputs).filter(input => !input.files.length);

        if (emptySlots.length === 0) {
            addFileInputSlot();
        }
    }

    // Handle files dropped or selected
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const extension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                alert(`Unsupported file type: "${file.name}". Allowed types: ${allowedExtensions.join(", ")}`);
                return;
            }

            if (uploadedFiles.has(file.name)) {
                alert(`Duplicate file: "${file.name}" has already been uploaded.`);
                return;
            }

            uploadedFiles.add(file.name);
            const newInput = document.createElement("input");
            newInput.type = "file";
            newInput.name = "files";
            newInput.files = files;
            newInput.classList.add("form-control", "mb-3");

            // Append the new file input to the form
            fileInputContainer.appendChild(newInput);
        });
    }
});

// drag_and_drop.js

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
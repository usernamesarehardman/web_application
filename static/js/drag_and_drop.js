// drag-and-drop.js

document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const container = document.getElementById("file-inputs-container");

    if (!dropArea || !container) {
        console.error("Missing drop area or file input container.");
        return;
    }

    // Prevent default behavior for drag and drop
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventType => {
        dropArea.addEventListener(eventType, event => {
            event.preventDefault();
            event.stopPropagation();
        });
    });

    // Visual feedback for when dragging over the drop area
    dropArea.addEventListener("dragenter", () => {
        dropArea.classList.add("dragging");
    });

    dropArea.addEventListener("dragover", () => {
        dropArea.classList.add("dragging");
    });

    // Remove visual feedback when drag leaves or drop occurs
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragging");
    });

    dropArea.addEventListener("drop", event => {
        dropArea.classList.remove("dragging");  // Clean up after drop

        const files = event.dataTransfer.files;
        if (!files.length) return;

        // Add the files to the file input container
        for (const file of files) {
            createFileInput(file);  // Add file with the remove button support
        }
    });
});
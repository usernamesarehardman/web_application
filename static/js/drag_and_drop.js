// drag_and_drop.js

document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const container = document.getElementById("file-inputs-container");

    if (!dropArea || !container) {
        console.error("Missing drop area or file input container.");
        return;
    }

    // Prevent default behavior for drag-and-drop events
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventType => {
        dropArea.addEventListener(eventType, event => {
            event.preventDefault();
            event.stopPropagation();
        });
    });

    ["dragenter", "dragover"].forEach(eventType => {
        dropArea.addEventListener(eventType, () => {
            dropArea.classList.add("dragging");
        });
    });

    ["dragleave", "drop"].forEach(eventType => {
        dropArea.addEventListener(eventType, () => {
            dropArea.classList.remove("dragging");
        });
    });

    // Handle file drop
    dropArea.addEventListener("drop", event => {
        const droppedFiles = event.dataTransfer.files;
        if (!droppedFiles.length) return;

        for (let file of droppedFiles) {
            const input = document.createElement("input");
            input.type = "file";
            input.name = "files";
            input.classList.add("form-control", "mb-3");

            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;

            container.appendChild(input);
        }
    });
});

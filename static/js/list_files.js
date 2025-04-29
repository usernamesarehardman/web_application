// list_files.js

// Function to refresh the list of files displayed on the page.
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

            // If no files are found, display a message.
            if (files.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center">No files found.</td>
                    </tr>
                `;
                return;
            }

            // Loop through each file and add a row to the table
            for (const file of files) {
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
            }

            // Attach the delete button handlers after rendering the file list
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

// Function to attach event listeners to the delete buttons
function attachDeleteHandlers() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const modal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"));
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    const message = document.getElementById("deleteConfirmMessage");

    let fileToDelete = null;

    // Add event listener to each delete button
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filename = button.getAttribute("data-filename");
            if (!filename) return;

            // Show confirmation modal when delete button is clicked
            fileToDelete = filename;
            message.textContent = `Are you sure you want to delete "${filename}"? This action cannot be undone.`;
            modal.show();
        });
    });

    // Confirm the file deletion when the user clicks the "Confirm Delete" button
    confirmBtn.addEventListener("click", () => {
        if (!fileToDelete) return;

        // Disable the confirm button during the deletion process
        confirmBtn.disabled = true;

        // Send a DELETE request to the server to remove the file
        fetch(`/delete_file?filename=${encodeURIComponent(fileToDelete)}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete file.");
                modal.hide();
                refreshFileList(); // Refresh the file list after deletion
                fileToDelete = null;
                confirmBtn.disabled = false; // Re-enable after deletion
            })
            .catch(error => {
                console.error("Error deleting file:", error);
                alert("Failed to delete file. Please try again."); // Inform the user if deletion fails
                confirmBtn.disabled = false; // Re-enable on error
            });
    });
}

// Trigger the refresh function when the page content is loaded
document.addEventListener("DOMContentLoaded", refreshFileList);
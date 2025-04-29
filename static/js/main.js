// main.js

document.addEventListener("DOMContentLoaded", () => {
    setupBackToTopButton();
});

function setupBackToTopButton() {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {
        button.style.display = window.scrollY > 100 ? "block" : "none";
    });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Update the year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
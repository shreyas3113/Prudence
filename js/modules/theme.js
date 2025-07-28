export function initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    
    // Initialize with light mode
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-mode");
        themeToggle.textContent = isLight ? "☀️" : "🌙";
    });
} 
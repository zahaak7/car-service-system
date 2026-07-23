/* =========================================================
   REDLINE AUTO CARE — theme.js
   Theme: dark/light mode toggle with localStorage
   Owner: Person 1 (M3)
   ========================================================= */

function initTheme() {
  const btn = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  
  // Load saved theme
  const saved = localStorage.getItem("redline_theme");
  if (saved) root.setAttribute("data-theme", saved);
  updateThemeIcon(btn, root.getAttribute("data-theme") === "dark");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    
    if (next === "light") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    
    localStorage.setItem("redline_theme", next);
    updateThemeIcon(btn, !isDark);
  });
}

function updateThemeIcon(btn, isDark) {
  if (!btn) return;
  btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}
// ========== Dark Mode ==========

function initDarkMode() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateDarkModeIcon(savedTheme);
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateDarkModeIcon(next);
}

function updateDarkModeIcon(theme) {
  const btn = document.getElementById("darkModeToggle");
  if (!btn) return;
  btn.innerHTML = theme === "dark"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// ========== Init ==========

document.addEventListener("DOMContentLoaded", function () {
  initDarkMode();

  const darkBtn = document.getElementById("darkModeToggle");
  if (darkBtn) {
    darkBtn.addEventListener("click", toggleDarkMode);
  }

  setActiveNavLink();
});
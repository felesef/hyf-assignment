(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const THEME_DARK = "dark";
  const THEME_LIGHT = "light";

  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || THEME_LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === THEME_DARK ? THEME_DARK : "");
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const theme = getStoredTheme();
    applyTheme(theme);
  }

  function toggleTheme() {
    const current = getStoredTheme();
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(next);
  }

  function initThemeToggle() {
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  }

  function init() {
    setYear();
    initTheme();
    initThemeToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

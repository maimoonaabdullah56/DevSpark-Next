// ============================================================
// DevSpark — Theme Utility (ES6 Module)
// Assignment Task 4: Persistent Dark/Light Mode
// ============================================================

import { THEME_KEY, THEMES, THEME_ICONS, THEME_LABELS, LIGHT_VARS, DARK_VARS } from "../constants/themeConstants.js";

// Apply CSS variables to :root
const applyVars = (vars) => {
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val));
};

// Get stored theme or default to dark
export const getStoredTheme = () => localStorage.getItem(THEME_KEY) || THEMES.DARK;

// Apply theme visually
export const applyTheme = (theme) => {
  applyVars(theme === THEMES.LIGHT ? LIGHT_VARS : DARK_VARS);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = THEME_ICONS[theme];
    btn.title       = THEME_LABELS[theme];
  }

  // Store preference
  localStorage.setItem(THEME_KEY, theme);
};

// Toggle between themes
export const toggleTheme = () => {
  const current = getStoredTheme();
  const next    = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(next);
};

// Initialise on every page load
export const initTheme = () => {
  applyTheme(getStoredTheme());

  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", toggleTheme);
};

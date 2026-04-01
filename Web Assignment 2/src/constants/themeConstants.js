// ============================================================
// DevSpark — Theme Constants
// Assignment Task 4: Dark/Light Mode with localStorage
// ============================================================

export const THEME_KEY = "devspark_theme";

export const THEMES = {
  DARK: "dark",
  LIGHT: "light"
};

export const THEME_ICONS = {
  dark:  "☀️",  // shown when dark → click switches to light
  light: "🌙"   // shown when light → click switches to dark
};

export const THEME_LABELS = {
  dark:  "Switch to Light Mode",
  light: "Switch to Dark Mode"
};

// CSS variable overrides injected into :root for light mode
// (dark mode is the default defined in each page's <style>)
export const LIGHT_VARS = {
  "--bg":       "#f4f4f0",
  "--surface":  "#ffffff",
  "--surface2": "#e8e8e2",
  "--text":     "#0d0d12",
  "--muted":    "#666670",
  "--border":   "#d0d0d8",
  "--accent":   "#00b5a0",
  "--accent2":  "#d93355",
  "--accent3":  "#c9a000"
};

export const DARK_VARS = {
  "--bg":       "#0a0a0f",
  "--surface":  "#111118",
  "--surface2": "#1a1a24",
  "--text":     "#e8e8f0",
  "--muted":    "#6b6b80",
  "--border":   "#2a2a38",
  "--accent":   "#00e5c8",
  "--accent2":  "#ff4d6d",
  "--accent3":  "#ffd166"
};

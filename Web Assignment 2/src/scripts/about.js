// ============================================================
// DevSpark — About Page JS
// Fills project info cells + uses Object methods (Task 5)
// ============================================================

import { projectsDB }    from "../database/projects.js";
import { getProjectKeys, getProjectEntries } from "../utils/crud.js";
import { capitalise, formatId, starRating }  from "../utils/stringUtils.js";
import { initTheme }     from "../utils/theme.js";
import { APP_NAME, APP_VERSION } from "../constants/appConstants.js";

// ── Fill Project Info Cells ──────────────────────────────────
const fillInfo = () => {
  const sample = projectsDB[0];

  // Object.keys() — Task 5
  const keys = getProjectKeys(sample);

  document.getElementById("projectName")?.setText !== undefined
    ? null : null;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set("projectName",     `${APP_NAME} v${APP_VERSION}`);
  set("totalProjects",   `${projectsDB.length} projects`);
  set("platformStatus",  "🟢 Live & Active");

  // Object.entries() — gather unique tech used
  const allTech = new Set();
  projectsDB.forEach(p => {
    p.tech.split(",").forEach(t => allTech.add(t.trim()));
  });
  set("techList", [...allTech].slice(0, 4).map(capitalise).join(", "));
  set("devName",  "Maimona Abdullah · Lead Developer");
};

// ── Project Summary (View Summary button) ───────────────────
window.showProjectSummary = () => {
  const summaryEl = document.getElementById("summary");
  if (!summaryEl) return;

  if (summaryEl.classList.contains("visible")) {
    summaryEl.classList.remove("visible");
    return;
  }

  // Build summary using Object.entries()
  const stats = projectsDB.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const rows = Object.entries(stats)
    .map(([cat, count]) => `<strong>${capitalise(cat)}</strong>: ${count} project${count > 1 ? "s" : ""}`)
    .join(" &nbsp;|&nbsp; ");

  const avgRating = (
    projectsDB.reduce((s, p) => s + p.rating, 0) / projectsDB.length
  ).toFixed(1);

  summaryEl.innerHTML = `
    <p style="margin-bottom:0.75rem">${rows}</p>
    <p>Platform average rating: <strong style="color:var(--accent3)">${starRating(avgRating)} ${avgRating}</strong></p>
    <p style="margin-top:0.5rem;font-size:0.82rem;">
      Total projects tracked: <strong style="color:var(--accent)">${projectsDB.length}</strong>
      &nbsp;·&nbsp; 
      Property count per record: <strong style="color:var(--accent)">${getProjectKeys(projectsDB[0]).length}</strong>
    </p>
  `;
  summaryEl.classList.add("visible");
};

// ── FAQ toggle (already inline in HTML, kept here for module support) ──
window.toggleFaq = (btn) => {
  const item    = btn.closest(".faq-item");
  const wasOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
};

// ── Init ─────────────────────────────────────────────────────
initTheme();
fillInfo();

// Scroll reveal (redundant safety in case observer didn't fire)
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

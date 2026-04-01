// ============================================================
// DevSpark — Resources Page JS
// Assignment Task 2, 3, 4, 5, 6 — CRUD + Filters + Theme
// ============================================================

import { projectsDB }     from "../../database/projects.js";
import { createProject, readAllProjects, updateProject, deleteProject } from "../../utils/crud.js";
import { applyAllFilters } from "../../utils/filters.js";
import { truncate, starRating, tagsToString, formatId, highlightMatch, formatProjectBadge } from "../../utils/stringUtils.js";
import { initTheme }       from "../../utils/theme.js";

// ── State ────────────────────────────────────────────────────
let filters = {
  searchQuery: "",
  category:    "All",
  difficulty:  "All",
  minRating:   0,
  sortBy:      "newest",
  status:      "All"
};
let editingId = null;  // null = create mode, number = edit mode

// ── DOM References ───────────────────────────────────────────
const grid        = document.getElementById("projectsGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const toast       = document.getElementById("toast");
const overlay     = document.getElementById("modalOverlay");
const modalTitle  = document.getElementById("modalTitle");
const modalSub    = document.getElementById("modalSub");

// ── Render Cards ─────────────────────────────────────────────
const renderGrid = () => {
  const results = applyAllFilters(filters);
  resultCount.textContent = results.length;

  if (!results.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <p class="empty-state-text">No projects match your filters.</p>
      </div>`;
    return;
  }

  grid.innerHTML = results.map(p => buildCard(p)).join("");

  // Attach edit/delete listeners
  grid.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => openEditModal(parseInt(btn.dataset.id)));
  });
  grid.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => handleDelete(parseInt(btn.dataset.id)));
  });
};

// ── Build Card HTML ──────────────────────────────────────────
const buildCard = (p) => {
  const diffClass  = {
    Beginner:     "diff-beginner",
    Intermediate: "diff-intermediate",
    Advanced:     "diff-advanced"
  }[p.difficulty] || "";

  const titleHL = highlightMatch(p.title,       filters.searchQuery);
  const descHL  = highlightMatch(truncate(p.description, 90), filters.searchQuery);
  const tags    = p.tags.slice(0, 3).map(t =>
    `<span class="card-tag">#${t}</span>`).join("");

  return `
    <div class="project-card">
      <div class="card-top">
        <div class="card-header">
          <span class="card-category">${p.category}</span>
          <span class="card-rating">${starRating(p.rating)} ${p.rating}</span>
        </div>
        <h3 class="card-title">${titleHL}</h3>
        <p class="card-desc">${descHL}</p>
        <div class="card-meta">${tags}</div>
      </div>
      <div class="card-bottom">
        <span class="card-author">// ${p.author}</span>
        <span class="card-difficulty ${diffClass}">${formatProjectBadge(p.difficulty)}</span>
      </div>
      <div class="card-actions">
        <button class="btn-edit"   data-id="${p.id}">✎ Edit</button>
        <button class="btn-delete" data-id="${p.id}">✕ Delete</button>
      </div>
    </div>`;
};

// ── Toast Notification ───────────────────────────────────────
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
};

// ── Modal Helpers ────────────────────────────────────────────
const openModal = () => overlay.classList.add("active");
const closeModal = () => {
  overlay.classList.remove("active");
  clearModalForm();
  editingId = null;
};

const clearModalForm = () => {
  ["mTitle","mTech","mRating","mAuthor","mDescription","mTags"]
    .forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("mCategory").value  = "UI/UX";
  document.getElementById("mDifficulty").value = "Beginner";
};

// ── Open ADD Modal ───────────────────────────────────────────
document.getElementById("btnAddProject").addEventListener("click", () => {
  editingId = null;
  modalTitle.textContent = "Add Project";
  modalSub.textContent   = "Fill in the details below";
  document.getElementById("modalSubmit").textContent = "→ Save Project";
  openModal();
});

// ── Open EDIT Modal ──────────────────────────────────────────
const openEditModal = (id) => {
  const p = projectsDB.find(p => p.id === id);
  if (!p) return;
  editingId = id;
  modalTitle.textContent = "Edit Project";
  modalSub.textContent   = `Editing project #${formatId(id)}`;
  document.getElementById("modalSubmit").textContent = "→ Update Project";

  document.getElementById("mTitle").value       = p.title;
  document.getElementById("mCategory").value    = p.category;
  document.getElementById("mDifficulty").value  = p.difficulty;
  document.getElementById("mTech").value        = p.tech;
  document.getElementById("mRating").value      = p.rating;
  document.getElementById("mAuthor").value      = p.author;
  document.getElementById("mDescription").value = p.description;
  document.getElementById("mTags").value        = p.tags.join(", ");
  openModal();
};

// ── Submit Modal Form (Create or Update) ─────────────────────
document.getElementById("modalSubmit").addEventListener("click", () => {
  const title = document.getElementById("mTitle").value.trim();
  const tech  = document.getElementById("mTech").value.trim();
  const author= document.getElementById("mAuthor").value.trim();
  const desc  = document.getElementById("mDescription").value.trim();

  if (!title || !tech || !author || !desc) {
    alert("Please fill in all required fields.");
    return;
  }

  const formData = {
    title,
    category:    document.getElementById("mCategory").value,
    difficulty:  document.getElementById("mDifficulty").value,
    tech,
    rating:      document.getElementById("mRating").value || "4.0",
    author,
    description: desc,
    tags:        document.getElementById("mTags").value
  };

  if (editingId !== null) {
    // UPDATE
    updateProject(editingId, {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(",").map(t => t.trim().toLowerCase())
        : []
    });
    showToast("✓ Project updated successfully");
  } else {
    // CREATE
    createProject(formData);
    showToast("✓ Project added successfully");
  }

  closeModal();
  renderGrid();
});

// ── Delete Handler ───────────────────────────────────────────
const handleDelete = (id) => {
  if (!confirm("Delete this project? This cannot be undone.")) return;
  deleteProject(id);
  showToast("✓ Project deleted");
  renderGrid();
};

// ── Filter Event Listeners ───────────────────────────────────
searchInput.addEventListener("input", (e) => {
  filters.searchQuery = e.target.value;
  renderGrid();
});

document.getElementById("filterCategory").addEventListener("change", (e) => {
  filters.category = e.target.value;
  renderGrid();
});

document.getElementById("filterDifficulty").addEventListener("change", (e) => {
  filters.difficulty = e.target.value;
  renderGrid();
});

document.getElementById("filterRating").addEventListener("change", (e) => {
  filters.minRating = parseFloat(e.target.value) || 0;
  renderGrid();
});

document.getElementById("sortBy").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderGrid();
});

// ── Modal Close ──────────────────────────────────────────────
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalCancel").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// ── Scroll Reveal ────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ── Init ─────────────────────────────────────────────────────
initTheme();
renderGrid();

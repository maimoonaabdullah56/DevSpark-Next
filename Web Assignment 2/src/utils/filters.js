// ============================================================
// DevSpark — Filter, Search & Sort Functions
// Assignment Task 3: 5+ filters using required Array methods
// ============================================================

import { projectsDB }   from "../database/projects.js";
import { cleanSearch }  from "./stringUtils.js";
import { SORT_OPTIONS } from "../constants/appConstants.js";

// ── FILTER 1: Search by title, author, tech, description ────
// Uses: arr.filter() + String includes()
export const filterBySearch = (projects, query) => {
  const q = cleanSearch(query);
  if (!q) return projects;
  return projects.filter(p =>
    p.title.toLowerCase().includes(q)       ||
    p.description.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q)      ||
    p.tech.toLowerCase().includes(q)        ||
    p.tags.some(tag => tag.includes(q))     // arr.some()
  );
};

// ── FILTER 2: Filter by category ────────────────────────────
// Uses: arr.filter()
export const filterByCategory = (projects, category) => {
  if (category === "All") return projects;
  return projects.filter(p => p.category === category);
};

// ── FILTER 3: Filter by difficulty ──────────────────────────
// Uses: arr.filter()
export const filterByDifficulty = (projects, difficulty) => {
  if (difficulty === "All") return projects;
  return projects.filter(p => p.difficulty === difficulty);
};

// ── FILTER 4: Filter by minimum rating ──────────────────────
// Uses: arr.filter()
export const filterByRating = (projects, minRating) => {
  const min = parseFloat(minRating) || 0;
  return projects.filter(p => p.rating >= min);
};

// ── FILTER 5: Filter by status ───────────────────────────────
// Uses: arr.filter()
export const filterByStatus = (projects, status) => {
  if (status === "All") return projects;
  return projects.filter(p => p.status === status);
};

// ── SORT ─────────────────────────────────────────────────────
// Uses: arr.sort()
export const sortProjects = (projects, sortBy) => {
  const sorted = [...projects]; // avoid mutating original
  switch (sortBy) {
    case SORT_OPTIONS.NEWEST:
      return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case SORT_OPTIONS.OLDEST:
      return sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    case SORT_OPTIONS.RATING_HIGH:
      return sorted.sort((a, b) => b.rating - a.rating);
    case SORT_OPTIONS.RATING_LOW:
      return sorted.sort((a, b) => a.rating - b.rating);
    case SORT_OPTIONS.TITLE_AZ:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case SORT_OPTIONS.TITLE_ZA:
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

// ── AGGREGATE HELPERS (uses reduce, every, some, includes) ──

// Total rating average using arr.reduce()
export const getAverageRating = (projects) => {
  if (!projects.length) return 0;
  const total = projects.reduce((sum, p) => sum + p.rating, 0);
  return (total / projects.length).toFixed(1);
};

// Check if every project is Active using arr.every()
export const allActive = (projects) =>
  projects.every(p => p.status === "Active");

// Check if some project has rating >= 4.8 using arr.some()
export const hasTopRated = (projects) =>
  projects.some(p => p.rating >= 4.8);

// Check if a specific category exists using arr.includes()
export const categoryExists = (categories, cat) =>
  categories.includes(cat);

// Get all unique categories using arr.map() + Set
export const getUniqueCategories = (projects) =>
  ["All", ...new Set(projects.map(p => p.category))];

// Apply all active filters at once
export const applyAllFilters = (filters) => {
  let results = [...projectsDB];
  results = filterBySearch(results,     filters.searchQuery);
  results = filterByCategory(results,   filters.category);
  results = filterByDifficulty(results, filters.difficulty);
  results = filterByRating(results,     filters.minRating);
  results = filterByStatus(results,     filters.status);
  results = sortProjects(results,       filters.sortBy);
  return results;
};

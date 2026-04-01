// ============================================================
// DevSpark — CRUD Operations
// Assignment Task 2 & 5: Array CRUD + Object Manipulation
// ============================================================

import { projectsDB, getNextId } from "../database/projects.js";
import { sanitise, cleanSearch }   from "./stringUtils.js";

// ── CREATE ──────────────────────────────────────────────────
// Task 2c-a: Add new object using Array.push()
export const createProject = (formData) => {
  const newProject = {
    id:          getNextId(),
    title:       sanitise(formData.title),
    category:    formData.category,
    tech:        sanitise(formData.tech),
    rating:      parseFloat(formData.rating) || 4.0,
    difficulty:  formData.difficulty,
    status:      "Active",
    author:      sanitise(formData.author),
    dateAdded:   new Date().toISOString().split("T")[0],
    description: sanitise(formData.description),
    price:       0,
    tags:        formData.tags
      ? formData.tags.split(",").map(t => cleanSearch(t))
      : []
  };

  projectsDB.push(newProject);          // Task 2: Array.push()
  return newProject;
};

// ── READ ────────────────────────────────────────────────────
// Task 2c-b: Return all projects via Array.map()
export const readAllProjects = () =>
  projectsDB.map(p => ({ ...p }));      // shallow copy each object

// Read single project by id using Array.find()
export const readProjectById = (id) =>
  projectsDB.find(p => p.id === id);    // Task 3: arr.find()

// ── UPDATE ──────────────────────────────────────────────────
// Task 2c-c: Edit existing object using obj.key assignment
export const updateProject = (id, updatedFields) => {
  const idx = projectsDB.findIndex(p => p.id === id);
  if (idx === -1) return null;

  // Task 5: Object.assign() for object CRUD
  Object.assign(projectsDB[idx], updatedFields);

  // Also clean text fields
  if (updatedFields.title)       projectsDB[idx].title       = sanitise(projectsDB[idx].title);
  if (updatedFields.description) projectsDB[idx].description = sanitise(projectsDB[idx].description);

  return projectsDB[idx];
};

// ── DELETE ──────────────────────────────────────────────────
// Task 2c-d: Remove object using Array.filter()
export const deleteProject = (id) => {
  const before = projectsDB.length;
  const removed = projectsDB.splice(
    projectsDB.findIndex(p => p.id === id), 1
  );
  return removed.length > 0;
};

// ── OBJECT CRUD METHODS (Task 5) ────────────────────────────

// Object.keys() — get all property names of a project
export const getProjectKeys = (project) => Object.keys(project);

// Object.values() — get all property values
export const getProjectValues = (project) => Object.values(project);

// Object.entries() — iterate key-value pairs
export const getProjectEntries = (project) => Object.entries(project);

// delete operator — remove a specific property
export const removeProperty = (project, key) => {
  const copy = { ...project };
  delete copy[key];
  return copy;
};

// Object spread — create a merged/updated copy
export const mergeProjectData = (existing, updates) => ({
  ...existing,
  ...updates,
  lastModified: new Date().toISOString()
});

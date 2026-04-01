// ============================================================
// DevSpark — String Utility Functions
// Assignment Task 6: 10+ String Methods used purposefully
// ============================================================

// 1. toUpperCase() — format category labels for display
export const formatCategory = (str) => str.toUpperCase();

// 2. toLowerCase() + trim() — clean search input before filtering
export const cleanSearch = (str) => str.toLowerCase().trim();

// 3. includes() — check if a project title/desc matches search
export const matchesSearch = (text, query) =>
  text.toLowerCase().includes(query.toLowerCase());

// 4. slice() — truncate long descriptions for card preview
export const truncate = (str, maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen) + "…" : str;

// 5. split() + join() — convert tag array to display string
export const tagsToString = (tags) => tags.join(" · ");

// 6. replace() — sanitise user input (remove extra spaces)
export const sanitise = (str) => str.replace(/\s{2,}/g, " ").trim();

// 7. charAt(0).toUpperCase() + slice(1) — capitalise first letter
export const capitalise = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// 8. startsWith() — check if author name starts with a letter (search filter)
export const startsWithLetter = (str, letter) =>
  str.toLowerCase().startsWith(letter.toLowerCase());

// 9. padStart() — format IDs with leading zeros → "001"
export const formatId = (id) => String(id).padStart(3, "0");

// 10. indexOf() — find position of keyword in description
export const findKeyword = (text, keyword) => text.indexOf(keyword);

// 11. repeat() — generate star rating string "★★★★☆"
export const starRating = (rating) => {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

// 12. replaceAll() — highlight matching text in search results
export const highlightMatch = (text, query) => {
  if (!query) return text;
  return text.replaceAll(
    new RegExp(`(${query})`, "gi"),
    `<mark style="background:rgba(0,229,200,0.25);color:inherit;border-radius:2px;">$1</mark>`
  );
};

// Bonus: template literal formatting for card HTML
export const formatProjectBadge = (difficulty) =>
  `[${difficulty.toUpperCase()}]`;

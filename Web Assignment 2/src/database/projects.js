// ============================================================
// DevSpark — Projects Database (Array of Objects)
// Assignment Task 2: CRUD App Data Source
// ============================================================

export let projectsDB = [
  {
    id: 1,
    title: "Portfolio Landing Page",
    category: "UI/UX",
    tech: "HTML, CSS, Tailwind",
    rating: 4.9,
    difficulty: "Beginner",
    status: "Active",
    author: "Maimona Abdullah",
    dateAdded: "2026-01-10",
    description:
      "A sleek personal portfolio layout using Tailwind CSS grid and flex utilities.",
    price: 0,
    tags: ["portfolio", "landing", "responsive"],
  },
  {
    id: 2,
    title: "Dashboard UI Kit",
    category: "Dashboard",
    tech: "HTML, Tailwind, JS",
    rating: 4.7,
    difficulty: "Intermediate",
    status: "Active",
    author: "Ali Arif",
    dateAdded: "2026-01-15",
    description:
      "Admin dashboard with charts, tables, and sidebar navigation components.",
    price: 0,
    tags: ["dashboard", "admin", "charts"],
  },
  {
    id: 3,
    title: "E-Commerce Product Page",
    category: "E-Commerce",
    tech: "HTML, CSS, JavaScript",
    rating: 4.8,
    difficulty: "Intermediate",
    status: "Active",
    author: "Fatima Malik",
    dateAdded: "2026-01-20",
    description:
      "Product detail page with image gallery, reviews, and add-to-cart functionality.",
    price: 0,
    tags: ["ecommerce", "product", "cart"],
  },
  {
    id: 4,
    title: "Blog Post Layout",
    category: "Blog",
    tech: "HTML, CSS",
    rating: 4.5,
    difficulty: "Beginner",
    status: "Active",
    author: "Maimona Abdullah",
    dateAdded: "2026-02-01",
    description:
      "Clean blog article layout with typography, tags, and author bio section.",
    price: 0,
    tags: ["blog", "article", "typography"],
  },
  {
    id: 5,
    title: "SaaS Pricing Page",
    category: "Landing Page",
    tech: "Tailwind CSS, JS",
    rating: 4.6,
    difficulty: "Beginner",
    status: "Active",
    author: "Ahmed Khan",
    dateAdded: "2026-02-10",
    description: "Monthly/yearly pricing toggle with feature comparison table.",
    price: 0,
    tags: ["saas", "pricing", "toggle"],
  },
  {
    id: 6,
    title: "Auth Form System",
    category: "Forms",
    tech: "HTML, CSS, JS",
    rating: 4.4,
    difficulty: "Beginner",
    status: "Active",
    author: "Sara Raza",
    dateAdded: "2026-02-18",
    description:
      "Login and register forms with validation, error states, and password toggle.",
    price: 0,
    tags: ["auth", "forms", "validation"],
  },
  {
    id: 7,
    title: "Kanban Board",
    category: "Dashboard",
    tech: "JavaScript, Tailwind",
    rating: 4.9,
    difficulty: "Advanced",
    status: "Active",
    author: "Bilal Hassan",
    dateAdded: "2026-03-01",
    description:
      "Drag-and-drop task management board with column CRUD and local storage.",
    price: 0,
    tags: ["kanban", "drag-drop", "tasks"],
  },
  {
    id: 8,
    title: "Dark Mode UI Components",
    category: "UI/UX",
    tech: "Tailwind CSS, JS",
    rating: 4.8,
    difficulty: "Beginner",
    status: "Active",
    author: "Maimona Abdullah",
    dateAdded: "2026-03-05",
    description:
      "Full set of UI components with light/dark mode toggle using CSS variables.",
    price: 0,
    tags: ["dark-mode", "components", "theme"],
  },
  {
    id: 9,
    title: "Data Table with Filters",
    category: "Dashboard",
    tech: "JavaScript, HTML, CSS",
    rating: 4.7,
    difficulty: "Intermediate",
    status: "Active",
    author: "Usman Tariq",
    dateAdded: "2026-03-10",
    description:
      "Sortable, filterable data table with pagination and search functionality.",
    price: 0,
    tags: ["table", "filter", "pagination"],
  },
];

// Generate next unique ID
export const getNextId = () => {
  return projectsDB.length > 0
    ? Math.max(...projectsDB.map((p) => p.id)) + 1
    : 1;
};

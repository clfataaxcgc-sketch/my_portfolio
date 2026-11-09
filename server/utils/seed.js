import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";

dotenv.config();

const sampleProjects = [
  {
    title: "Modern Landing Page",
    shortDescription: "A sleek, responsive landing page built with pure HTML & CSS.",
    description: "A fully responsive landing page focused on clean layout, typography, and CSS animations without any JavaScript dependency.",
    category: "HTML/CSS",
    technologies: ["HTML", "CSS"],
    features: ["Responsive layout", "CSS animations", "Cross-browser support"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: false,
    status: "published",
  },
  {
    title: "JavaScript Weather App",
    shortDescription: "Live weather lookup app powered by a public weather API.",
    description: "A weather dashboard that fetches live data from a public API, with search by city, unit toggling, and animated weather icons.",
    category: "HTML/CSS/JavaScript/API",
    technologies: ["HTML", "CSS", "JavaScript", "REST API"],
    features: ["City search", "5-day forecast", "Unit conversion"],
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: false,
    status: "published",
  },
  {
    title: "React Dashboard",
    shortDescription: "An analytics dashboard UI built with React and Tailwind CSS.",
    description: "A componentized admin analytics dashboard with charts, tables, and filters, focused on reusable React components and clean state management.",
    category: "React",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    features: ["Reusable components", "Chart visualizations", "Responsive tables"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: true,
    status: "published",
  },
  {
    title: "MERN E-Commerce",
    shortDescription: "A full-stack e-commerce platform with cart and checkout.",
    description: "A complete e-commerce solution with product catalog, cart, JWT authentication, and an admin panel for inventory management.",
    category: "MERN",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    features: ["JWT auth", "Cart & checkout", "Admin inventory panel"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    githubUrl: "https://github.com/",
    liveUrl: "",
    featured: true,
    status: "published",
  },
];

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const existing = await Admin.findOne({ email });
  if (!existing) {
    await Admin.create({
      name: "Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
    });
    console.log(`Admin created: ${email}`);
  } else {
    console.log("Admin already exists, skipping.");
  }

  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(sampleProjects);
    console.log(`Seeded ${sampleProjects.length} projects.`);
  } else {
    console.log("Projects already exist, skipping.");
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

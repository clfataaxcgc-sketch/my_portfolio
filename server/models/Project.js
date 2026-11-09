import mongoose from "mongoose";

const CATEGORIES = [
  "HTML/CSS",
  "HTML/CSS/JavaScript",
  "HTML/CSS/JavaScript/API",
  "React",
  "MERN",
  "Other",
];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORIES },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    image: { type: String, required: true },
    screenshots: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["published", "draft"], default: "published" },
  },
  { timestamps: true }
);

projectSchema.index({ title: "text", shortDescription: "text", technologies: "text" });

export const PROJECT_CATEGORIES = CATEGORIES;
export default mongoose.model("Project", projectSchema);

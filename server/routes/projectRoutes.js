import express from "express";
import {
  getProjects,
  getProject,
  getStats,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", protect, getStats);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;

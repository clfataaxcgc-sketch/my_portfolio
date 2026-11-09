import Project, { PROJECT_CATEGORIES } from "../models/Project.js";

// @desc Get all projects (public: only published, admin: all via ?all=true)
// @route GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const { category, search, featured, all } = req.query;
    const filter = {};

    if (!all) filter.status = "published";
    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;
    if (search) filter.$text = { $search: search };

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ count: projects.length, projects });
  } catch (err) {
    next(err);
  }
};

// @desc Get single project
// @route GET /api/projects/:id
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    next(err);
  }
};

// @desc Get dashboard stats
// @route GET /api/projects/stats
export const getStats = async (req, res, next) => {
  try {
    const total = await Project.countDocuments();
    const counts = await Project.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const byCategory = PROJECT_CATEGORIES.reduce((acc, c) => {
      acc[c] = counts.find((x) => x._id === c)?.count || 0;
      return acc;
    }, {});
    res.json({ total, byCategory });
  } catch (err) {
    next(err);
  }
};

// @desc Create project
// @route POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

// @desc Update project
// @route PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    next(err);
  }
};

// @desc Delete project
// @route DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

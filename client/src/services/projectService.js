import api from "./api.js";

export const CATEGORIES = [
  "All",
  "HTML/CSS",
  "HTML/CSS/JavaScript",
  "HTML/CSS/JavaScript/API",
  "React",
  "MERN",
  "Other",
];

export const getProjects = (params = {}) =>
  api.get("/projects", { params }).then((r) => r.data);

export const getProject = (id) => api.get(`/projects/${id}`).then((r) => r.data);

export const getStats = () => api.get("/projects/stats").then((r) => r.data);

export const createProject = (payload) =>
  api.post("/projects", payload).then((r) => r.data);

export const updateProject = (id, payload) =>
  api.put(`/projects/${id}`, payload).then((r) => r.data);

export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);

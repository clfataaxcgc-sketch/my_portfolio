import api from "./api.js";

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const logoutRequest = () => api.post("/auth/logout").then((r) => r.data);

export const meRequest = () => api.get("/auth/me").then((r) => r.data);

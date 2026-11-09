import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, meRequest } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meRequest()
      .then((data) => setAdmin(data.admin))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    setAdmin(data.admin);
    return data.admin;
  };

  const logout = async () => {
    await logoutRequest();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

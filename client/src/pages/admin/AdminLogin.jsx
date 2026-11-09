import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Terminal, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back.");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5 text-paper-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-7 shadow-card"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal">
          <Terminal size={18} />
        </div>
        <h1 className="mt-5 font-display text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-paper-100/60">Manage your portfolio projects.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm outline-none focus:border-signal"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm outline-none focus:border-signal"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary mt-2 justify-center disabled:opacity-60">
            <Lock size={15} /> {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

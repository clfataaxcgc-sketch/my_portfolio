import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Terminal,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/projects/new", label: "Add Project", icon: PlusCircle },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out.");
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5 font-display font-semibold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal">
          <Terminal size={16} />
        </span>
        dev<span className="text-signal">.folio</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-signal/15 text-signal" : "text-paper-100/70 hover:bg-white/5 hover:text-paper-50"
              }`
            }
          >
            <it.icon size={17} /> {it.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/5 px-3 py-4">
        <div className="px-3 pb-2 text-xs text-paper-100/50">{admin?.email}</div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-paper-100/70 hover:bg-white/5 hover:text-red-400"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper-100 dark:bg-ink-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/5 bg-ink-900 text-paper-50 lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-ink-900 text-paper-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink-900/5 bg-paper-50/80 px-5 py-4 backdrop-blur dark:border-white/5 dark:bg-ink-950/80 lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <span className="font-display font-semibold">Admin</span>
        </header>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

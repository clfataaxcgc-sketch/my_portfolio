import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Code2, Braces, Atom, Layers } from "lucide-react";
import { getStats } from "../../services/projectService.js";
import ErrorState from "../../components/ErrorState.jsx";

const cards = [
  { key: "total", label: "Total Projects", icon: FolderKanban, isTotal: true },
  { key: "HTML/CSS", label: "HTML/CSS Projects", icon: Code2 },
  { key: "HTML/CSS/JavaScript/API", label: "JavaScript Projects", icon: Braces },
  { key: "React", label: "React Projects", icon: Atom },
  { key: "MERN", label: "MERN Projects", icon: Layers },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err) => setError(err?.response?.data?.message || "Could not load stats."));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-600 dark:text-paper-100/70">
        Overview of your portfolio content.
      </p>

      {error && <div className="mt-6"><ErrorState message={error} /></div>}

      {!error && (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-surface p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                <c.icon size={18} />
              </div>
              <p className="mt-4 font-display text-3xl font-bold">
                {stats ? (c.isTotal ? stats.total : stats.byCategory?.[c.key] ?? 0) : "—"}
              </p>
              <p className="mt-1 text-sm text-ink-600 dark:text-paper-100/70">{c.label}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

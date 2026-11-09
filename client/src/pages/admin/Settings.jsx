import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Moon, Sun } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { admin } = useAuth();

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-ink-600 dark:text-paper-100/70">
        Manage your admin preferences.
      </p>

      <div className="card-surface mt-6 divide-y divide-ink-900/5 dark:divide-white/5">
        <div className="flex items-center justify-between p-5">
          <div>
            <p className="font-medium">Signed in as</p>
            <p className="text-sm text-ink-600 dark:text-paper-100/70">{admin?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-5">
          <div>
            <p className="font-medium">Appearance</p>
            <p className="text-sm text-ink-600 dark:text-paper-100/70">
              Toggle between light and dark mode.
            </p>
          </div>
          <button onClick={toggleTheme} className="btn-secondary">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

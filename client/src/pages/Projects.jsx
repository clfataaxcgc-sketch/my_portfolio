import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import ProjectCard from "../components/ProjectCard.jsx";
import { ProjectGridSkeleton } from "../components/SkeletonLoader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { getProjects, CATEGORIES } from "../services/projectService.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects(cat && cat !== "All" ? { category: cat } : {});
      setProjects(data.projects);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(category);
  }, [category, load]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <p className="font-mono text-sm text-signal">// projects</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Selected work.</h1>
      <p className="mt-4 max-w-2xl text-ink-600 dark:text-paper-100/70">
        Projects pulled live from the database — filter by category to see
        what I've built with each part of the stack.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === c
                ? "bg-signal text-white"
                : "card-surface text-ink-600 hover:text-signal dark:text-paper-100/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {loading && <ProjectGridSkeleton />}
        {!loading && error && <ErrorState message={error} onRetry={() => load(category)} />}
        {!loading && !error && projects.length === 0 && (
          <EmptyState
            icon={FolderKanban}
            title="No projects here yet"
            description="Try another category, or check back once new projects are added."
          />
        )}
        {!loading && !error && projects.length > 0 && (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;

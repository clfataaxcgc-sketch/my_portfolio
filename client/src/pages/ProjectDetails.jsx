import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { getProject } from "../services/projectService.js";
import ErrorState from "../components/ErrorState.jsx";

const DetailsSkeleton = () => (
  <div className="mx-auto max-w-4xl px-5 py-16">
    <div className="skeleton h-8 w-40" />
    <div className="skeleton mt-6 aspect-video w-full" />
    <div className="skeleton mt-6 h-6 w-2/3" />
    <div className="skeleton mt-3 h-4 w-full" />
    <div className="skeleton mt-2 h-4 w-4/5" />
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getProject(id)
      .then((data) => setProject(data.project))
      .catch((err) => setError(err?.response?.data?.message || "Project not found."))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  if (loading) return <DetailsSkeleton />;

  if (error || !project) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-16">
        <ErrorState message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl px-5 py-16 sm:py-20"
    >
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-signal dark:text-paper-100/70">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img src={project.image} alt={project.title} className="aspect-video w-full object-cover" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="badge">{project.category}</span>
          <h1 className="mt-2 font-display text-3xl font-bold">{project.title}</h1>
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              <Github size={16} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-ink-700 dark:text-paper-100/80">{project.description}</p>

      {project.features?.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold">Features</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink-600 dark:text-paper-100/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.technologies?.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold">Technologies</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.screenshots?.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold">Screenshots</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.screenshots.map((s) => (
              <img key={s} src={s} alt="" className="rounded-xl border border-ink-900/10 dark:border-white/10" />
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectDetails;

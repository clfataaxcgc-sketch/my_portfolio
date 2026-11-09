import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    className="card-surface group flex flex-col overflow-hidden"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {project.featured && (
        <span className="absolute left-3 top-3 rounded-full bg-signal px-2.5 py-1 text-xs font-medium text-white">
          Featured
        </span>
      )}
      <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
        {project.category}
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-5">
      <h3 className="font-display text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-ink-600 dark:text-paper-100/70 line-clamp-2">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies?.slice(0, 4).map((t) => (
          <span key={t} className="badge">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 pt-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-signal dark:text-paper-100/70"
          >
            <Github size={15} /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-signal dark:text-paper-100/70"
          >
            <ExternalLink size={15} /> Live
          </a>
        )}
        <Link
          to={`/projects/${project._id}`}
          className="ml-auto flex items-center gap-1 text-sm font-medium text-signal"
        >
          Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, ArrowRight, Mail } from "lucide-react";

const COMMAND_LINES = [
  { prompt: "~", cmd: "whoami" },
  { prompt: "~", cmd: "Alex Rivera — Full-Stack MERN Developer" },
];

const Home = () => (
  <div className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-dots opacity-40 dark:opacity-20" />
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />

    <section className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-5 pb-20 pt-10 md:flex-row md:pb-32 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <div className="card-surface mb-6 inline-block px-4 py-2.5 font-mono text-xs text-ink-600 dark:text-paper-100/70">
          {COMMAND_LINES.map((l, i) => (
            <div key={i}>
              <span className="text-signal">{l.prompt} $</span> {l.cmd}
            </div>
          ))}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-signal">~ $</span>
            <span className="h-3.5 w-1.5 animate-pulse bg-signal" />
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
          Building fast, reliable
          <span className="text-signal"> full-stack </span>
          products.
        </h1>
        <p className="mt-5 max-w-lg text-base text-ink-600 dark:text-paper-100/70 sm:text-lg">
          I'm Alex — a Full-Stack MERN Developer crafting clean, scalable web
          applications from database to deploy. React on the front,
          Node &amp; MongoDB underneath.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link to="/projects" className="btn-primary">
            View Projects <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="rounded-full p-2 text-ink-600 hover:bg-ink-900/5 hover:text-signal dark:text-paper-100/70 dark:hover:bg-white/5" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full p-2 text-ink-600 hover:bg-ink-900/5 hover:text-signal dark:text-paper-100/70 dark:hover:bg-white/5" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:hello@example.com" className="rounded-full p-2 text-ink-600 hover:bg-ink-900/5 hover:text-signal dark:text-paper-100/70 dark:hover:bg-white/5" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-signal/40 to-mint/30 blur-2xl opacity-40" />
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&q=80"
          alt="Developer portrait"
          className="relative h-56 w-56 rounded-[2rem] object-cover shadow-card sm:h-72 sm:w-72"
        />
      </motion.div>
    </section>
  </div>
);

export default Home;

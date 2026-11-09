import { motion } from "framer-motion";

const skillGroups = [
  { title: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript (ES6+)"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "bcrypt"] },
  { title: "Database", items: ["MongoDB", "Mongoose", "Data Modeling", "Indexing"] },
  { title: "Tooling", items: ["Git & GitHub", "Postman", "Docker basics", "Vercel / Render"] },
];

const Skills = () => (
  <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
    <p className="font-mono text-sm text-signal">// skills</p>
    <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Tools of the trade.</h1>
    <p className="mt-4 max-w-2xl text-ink-600 dark:text-paper-100/70">
      The core stack I reach for on most projects, and the practices that
      keep the codebase maintainable as it grows.
    </p>

    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {skillGroups.map((g, i) => (
        <motion.div
          key={g.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="card-surface p-5"
        >
          <h3 className="font-display font-semibold text-signal">{g.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.items.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;

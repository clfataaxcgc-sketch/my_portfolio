import { motion } from "framer-motion";
import { Code2, Database, Layers, Rocket } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Clean code", text: "Readable, reusable components and a consistent architecture across every layer." },
  { icon: Database, title: "Data-driven", text: "Comfortable modeling schemas, indexes, and relationships that scale." },
  { icon: Layers, title: "Full ownership", text: "From REST API design to the pixel-level UI, I ship complete features." },
  { icon: Rocket, title: "Performance", text: "Fast load times, lazy loading, and thoughtful caching by default." },
];

const About = () => (
  <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-mono text-sm text-signal"
    >
      // about
    </motion.p>
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
      className="mt-2 font-display text-3xl font-bold sm:text-4xl"
    >
      A developer who enjoys the whole stack.
    </motion.h1>
    <p className="mt-5 max-w-2xl text-ink-600 dark:text-paper-100/70">
      I build web applications end to end — designing MongoDB schemas,
      writing Express APIs, and shipping polished React interfaces. I care
      about code that's easy to read a year later, and products that feel
      fast and dependable to the people using them. When I'm not coding, I'm
      usually reading about system design or contributing to open source.
    </p>

    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {highlights.map((h, i) => (
        <motion.div
          key={h.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="card-surface p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
            <h.icon size={18} />
          </div>
          <h3 className="mt-4 font-display font-semibold">{h.title}</h3>
          <p className="mt-1.5 text-sm text-ink-600 dark:text-paper-100/70">{h.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default About;

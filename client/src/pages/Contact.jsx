import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Wire this up to a /api/contact route or a form service (e.g. Formspree) as needed.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent — I'll get back to you soon.");
  };

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      <p className="font-mono text-sm text-signal">// contact</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Let's build something.</h1>
      <p className="mt-4 max-w-xl text-ink-600 dark:text-paper-100/70">
        Have a project in mind or just want to say hi? Send a message and
        I'll respond within a couple of days.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="card-surface col-span-3 flex flex-col gap-4 p-6"
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal dark:border-white/10"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal dark:border-white/10"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal dark:border-white/10"
              placeholder="Tell me about your project..."
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary mt-2 justify-center disabled:opacity-60">
            {submitting ? "Sending..." : (<><Send size={16} /> Send message</>)}
          </button>
        </motion.form>

        <div className="col-span-2 flex flex-col gap-4">
          <div className="card-surface flex items-start gap-3 p-5">
            <Mail size={18} className="mt-0.5 text-signal" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-ink-600 dark:text-paper-100/70">hello@example.com</p>
            </div>
          </div>
          <div className="card-surface flex items-start gap-3 p-5">
            <MapPin size={18} className="mt-0.5 text-signal" />
            <div>
              <p className="text-sm font-medium">Based in</p>
              <p className="text-sm text-ink-600 dark:text-paper-100/70">Remote · Open to relocation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

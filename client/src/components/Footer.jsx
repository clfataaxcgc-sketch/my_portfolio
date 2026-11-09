import { Github, Linkedin, Mail, Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-ink-900/5 dark:border-white/5">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-ink-600 dark:text-paper-100/60 sm:flex-row">
      <span className="flex items-center gap-2 font-display">
        <Terminal size={14} className="text-signal" />
        dev.folio &copy; {new Date().getFullYear()}
      </span>
      <div className="flex items-center gap-4">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-signal" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-signal" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="mailto:hello@example.com" className="hover:text-signal" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

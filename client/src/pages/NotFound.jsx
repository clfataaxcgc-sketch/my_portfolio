import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
    <p className="font-mono text-signal">404</p>
    <h1 className="mt-2 font-display text-3xl font-bold">Page not found</h1>
    <p className="mt-2 text-ink-600 dark:text-paper-100/70">
      The page you're looking for doesn't exist.
    </p>
    <Link to="/" className="btn-primary mt-6">
      Back home
    </Link>
  </div>
);

export default NotFound;

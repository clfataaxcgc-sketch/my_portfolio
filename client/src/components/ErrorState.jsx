import { AlertTriangle, RotateCcw } from "lucide-react";

const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
      <AlertTriangle size={22} />
    </div>
    <h3 className="font-display text-lg font-semibold">Couldn't load this</h3>
    <p className="max-w-sm text-sm text-ink-600 dark:text-paper-100/60">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary mt-1">
        <RotateCcw size={15} /> Try again
      </button>
    )}
  </div>
);

export default ErrorState;

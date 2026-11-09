import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({ open, title, description, confirmLabel = "Delete", onConfirm, onCancel, danger = true }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card-surface w-full max-w-sm p-6"
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${danger ? "bg-red-500/10 text-red-500" : "bg-signal/10 text-signal"}`}>
              <AlertTriangle size={18} />
            </div>
            <button onClick={onCancel} className="text-ink-400 hover:text-ink-900 dark:hover:text-paper-50">
              <X size={18} />
            </button>
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
          {description && (
            <p className="mt-1.5 text-sm text-ink-600 dark:text-paper-100/60">{description}</p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition active:scale-[0.98] ${
                danger ? "bg-red-500 hover:bg-red-600" : "bg-signal hover:bg-signal-dim"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmModal;

import { Inbox } from "lucide-react";

const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-900/15 dark:border-white/10 px-6 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5 dark:bg-white/5 text-ink-500">
      <Icon size={22} />
    </div>
    <h3 className="font-display text-lg font-semibold">{title}</h3>
    {description && (
      <p className="max-w-sm text-sm text-ink-600 dark:text-paper-100/60">{description}</p>
    )}
    {action}
  </div>
);

export default EmptyState;

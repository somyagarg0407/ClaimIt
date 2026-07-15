/**
 * Labeled divider used to separate the credentials form from social login
 * options. Generic enough to reuse on Register with a different label.
 */
function AuthDivider({ label = "OR" }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-gray-100 dark:bg-white/[0.06]" />
      <span className="text-xs font-medium tracking-wide text-gray-400 dark:text-[#8A8A8A]">{label}</span>
      <span className="h-px flex-1 bg-gray-100 dark:bg-white/[0.06]" />
    </div>
  );
}

export { AuthDivider };

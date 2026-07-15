/**
 * Subtle uppercase section label — used to group the navigation drawer's
 * "My Activity" / "Account" clusters. Generic enough to reuse anywhere a
 * quiet group heading is needed.
 */
function SectionHeading({ children }) {
  return (
    <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-[#8A8A8A]">
      {children}
    </span>
  );
}

export { SectionHeading };

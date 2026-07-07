import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * A single row inside the navigation drawer. Handles three states: normal,
 * active (current route), and disabled (future feature, e.g. Logout) —
 * generic enough to reuse if the drawer's item set grows.
 */
function DrawerItem({ icon: Icon, label, to, active = false, disabled = false, badge, onClick }) {
  const content = (
    <>
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
      {label}
      {badge && (
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {badge}
        </span>
      )}
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300"
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
        active ? "bg-brand-50 text-brand-800" : "text-gray-600 hover:bg-gray-50 hover:text-ink"
      )}
    >
      {content}
    </Link>
  );
}

export { DrawerItem };

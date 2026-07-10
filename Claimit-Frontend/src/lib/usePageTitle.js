import { useEffect } from "react";

/**
 * Sets document.title for the current page (as "ClaimIt | {title}") and
 * restores the previous title on unmount. Call once near the top of each
 * page component. Pass null/undefined to fall back to just "ClaimIt".
 */
function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `ClaimIt | ${title}` : "ClaimIt";
    return () => {
      document.title = previous;
    };
  }, [title]);
}

export { usePageTitle };

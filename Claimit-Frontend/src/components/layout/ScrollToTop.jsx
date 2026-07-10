import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on every route change, so navigating
 * never leaves the user halfway down the previous page's scroll position.
 * Skips this when a hash is present (e.g. /#how-it-works) so it doesn't
 * fight with Home.jsx's own effect that scrolls to that section instead.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export { ScrollToTop };

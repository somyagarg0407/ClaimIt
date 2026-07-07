import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Eligibility", href: "/eligibility" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Help", href: "/help" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer automatically on route changes (e.g. back/forward nav).
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  function isActive(href) {
    if (href === "/#how-it-works") {
      return location.pathname === "/" && location.hash === "#how-it-works";
    }
    return location.pathname === href;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-gray-100 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-white"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-ink"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800">
              <span className="tabular-mono text-sm font-bold text-white">C</span>
            </span>
            <span className="font-display text-[1.125rem] font-bold tracking-tight text-ink">
              ClaimIt
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive(link.href) ? "bg-brand-50 text-brand-800" : "text-gray-600 hover:bg-gray-50 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            to="/discover"
            aria-label="Search schemes"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-ink"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-ink"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <div className="mx-2 h-5 w-px bg-gray-200" />
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Login
          </Button>
          <Button as={Link} to="/register" variant="outline" size="sm">
            Register
          </Button>
          <Button as={Link} to="/eligibility" size="sm" className="ml-1">
            Check Eligibility
          </Button>
        </div>
      </Container>

      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

export { Navbar };

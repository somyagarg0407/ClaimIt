import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Eligibility", href: "/eligibility" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Help", href: "/help" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800">
            <span className="tabular-mono text-sm font-bold text-white">C</span>
          </span>
          <span className="font-display text-[1.125rem] font-bold tracking-tight text-ink">
            ClaimIt
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <button
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <button
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <div className="mx-2 h-5 w-px bg-gray-200" />
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="outline" size="sm">
            Register
          </Button>
          <Button size="sm" className="ml-1">
            Check Eligibility
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
              <Button as={Link} to="/login" variant="outline" size="sm" onClick={() => setMobileOpen(false)}>
                Login
              </Button>
              <Button size="sm">
                Check Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

export { Navbar };

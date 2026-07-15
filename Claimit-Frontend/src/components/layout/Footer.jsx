import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { ClaimItLogo } from "@/components/shared/ClaimItLogo";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Discover Schemes", href: "/discover" },
    { label: "Check Eligibility", href: "/eligibility" },
    { label: "My Schemes", href: "/my-schemes" },
    { label: "My Claims", href: "/my-claims" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-white/[0.06] dark:bg-[#0A0A0A]">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <ClaimItLogo variant="wordmark" h={28} />
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-[#8A8A8A]">
              Empowering citizens to discover and claim the government benefits
              they've already earned — free, and built on verified public data.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-brand-25 hover:text-brand-700 dark:text-[#8A8A8A] dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-ink dark:text-white">{heading}</span>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-brand-700 dark:text-[#8A8A8A] dark:hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row dark:border-white/[0.06]">
          <span className="text-xs text-gray-400 dark:text-[#8A8A8A]">
            © {new Date().getFullYear()} ClaimIt AI. All rights reserved.
          </span>
          <span className="text-xs text-gray-400 dark:text-[#8A8A8A]">Not affiliated with the Government of India.</span>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };

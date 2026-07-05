import { Container } from "@/components/ui/Container";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Discover Schemes", href: "/discover" },
    { label: "Check Eligibility", href: "/eligibility" },
    { label: "My Claims", href: "/claims" },
    { label: "How It Works", href: "#how-it-works" },
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
    <footer className="border-t border-gray-100 bg-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800">
                <span className="tabular-mono text-sm font-bold text-white">C</span>
              </span>
              <span className="font-display text-[1.125rem] font-bold text-ink">ClaimIt</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Empowering citizens to discover and claim the government benefits
              they've already earned — free, and built on verified public data.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-brand-25 hover:text-brand-700"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-ink">{heading}</span>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} ClaimIt AI. All rights reserved.
          </span>
          <span className="text-xs text-gray-400">Not affiliated with the Government of India.</span>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };

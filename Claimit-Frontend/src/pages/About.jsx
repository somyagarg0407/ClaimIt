import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Sparkles,
  Code2,
  Zap,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePageTitle } from "@/lib/usePageTitle";

const MILESTONES = [
  {
    icon: Zap,
    title: "The problem",
    body: "India has 20,000+ government welfare schemes. Most citizens never access them — not because they don't qualify, but because the information is buried, jargon-heavy, and impossible to navigate without a middleman.",
  },
  {
    icon: Sparkles,
    title: "The insight",
    body: "AI can read eligibility rules the way a policy expert would, match them against a citizen's profile in milliseconds, and surface only the schemes that matter — in plain language, instantly.",
  },
  {
    icon: Code2,
    title: "The build",
    body: "ClaimIt was designed and built solo — every component, every route, every design decision made from scratch. Version 1.0 covers discovery, eligibility checking, saved schemes, claim tracking, and a full dark/light theme system.",
  },
];

const STATS = [
  { value: "20,000+", label: "Schemes catalogued" },
  { value: "1", label: "Developer" },
  { value: "0", label: "Middlemen" },
  { value: "Free", label: "Forever" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

function About() {
  usePageTitle("About");

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <Section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <Container>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
          >
            <Badge variant="soft">
              <Sparkles className="h-3.5 w-3.5" />
              About ClaimIt
            </Badge>
            <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
              Built for the{" "}
              <span className="text-brand-600 dark:text-brand-400">
                citizens who were always eligible
              </span>{" "}
              — just never told.
            </h1>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
              ClaimIt is an independent AI-powered platform that helps every Indian
              citizen discover, understand, and claim the government schemes they
              already deserve — free, in plain language, with zero paperwork required
              to get started.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <Section className="py-0">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-2 divide-x divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 sm:grid-cols-4 sm:divide-y-0 dark:divide-white/[0.06] dark:border-white/[0.06]"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 bg-white px-6 py-8 text-center dark:bg-[#0A0A0A]"
              >
                <span className="tabular-mono text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {value}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-[#B5B5B5]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ── Story ──────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={i * 0.1}
              >
                <Card className="flex h-full flex-col gap-4 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-white">
                    <m.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
                    {m.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                    {m.body}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Founder ────────────────────────────────────────────── */}
      <Section className="bg-brand-25/60 dark:bg-brand-600/[0.04]">
        <Container>
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mb-12 flex flex-col items-center gap-3 text-center"
            >
              <Badge variant="outline">The Team</Badge>
              <h2 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
                Meet the founder
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                ClaimIt is a solo-built project — designed, coded, and shipped by one
                developer who believed the problem was worth solving.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              custom={0.1}
            >
              <Card className="overflow-hidden p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo */}
                  <div className="relative h-72 w-full shrink-0 sm:h-auto sm:w-64">
                    <img
                      src="/founder.jpg"
                      alt="Somya Garg — Founder &amp; Developer of ClaimIt"
                      className="h-full w-full object-cover object-center"
                      draggable={false}
                    />
                    {/* gradient overlay at bottom of photo on mobile */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white sm:hidden dark:from-[#0A0A0A]" />
                  </div>

                  {/* Bio */}
                  <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl font-bold text-ink dark:text-white">
                          Somya Garg
                        </h3>
                        <Badge variant="soft" size="sm">
                          Founder &amp; Developer
                        </Badge>
                      </div>
                    </div>

                    <p className="text-[0.9375rem] leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                      I built ClaimIt because I believed every citizen deserves to know
                      exactly which government benefits they're entitled to — without
                      needing a middleman or wading through bureaucratic jargon. This
                      platform is my attempt to use AI to close that gap, one verified
                      scheme at a time.
                    </p>

                    <p className="text-[0.9375rem] leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                      ClaimIt v1.0 was designed and engineered entirely by me — from
                      the component system to the AI eligibility engine — as a
                      production-quality flagship project.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href="mailto:somyagarg0407@gmail.com"
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/[0.08] dark:text-[#B5B5B5] dark:hover:border-brand-500/40 dark:hover:text-brand-400"
                      >
                        <Mail className="h-4 w-4" strokeWidth={2} />
                        somyagarg0407@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <Section className="py-16 lg:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center gap-6 text-center"
          >
            <h2 className="text-balance text-display-sm font-bold text-ink dark:text-white">
              Questions or ideas? Reach out.
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
              ClaimIt is actively evolving. If you have feedback, partnership ideas,
              or just want to say hi — I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button as={Link} to="/contact" size="lg">
                Contact Us
              </Button>
              <Button as={Link} to="/eligibility" variant="secondary" size="lg">
                Try ClaimIt Free
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}

export default About;

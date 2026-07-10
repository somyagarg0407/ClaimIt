import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  CheckCircle2,
  Heart,
  ClipboardList,
  LifeBuoy,
  Mail,
  Flag,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { SearchBar } from "@/components/shared/SearchBar";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { AccountTabs } from "@/components/shared/AccountTabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { usePageTitle } from "@/lib/usePageTitle";

const GETTING_STARTED = [
  {
    icon: Compass,
    title: "Discover schemes",
    description: "Search and filter 20,000+ government schemes matched to your profile.",
    to: "/discover",
  },
  {
    icon: CheckCircle2,
    title: "Check your eligibility",
    description: "Answer a few quick questions and get an instant AI match score.",
    to: "/eligibility",
  },
  {
    icon: Heart,
    title: "Save schemes you like",
    description: "Build a personal collection of schemes worth applying to.",
    to: "/my-schemes",
  },
  {
    icon: ClipboardList,
    title: "Track your claims",
    description: "Follow every application from submission to benefit release.",
    to: "/my-claims",
  },
];

const FAQS = [
  {
    question: "Is ClaimIt affiliated with the Government of India?",
    answer:
      "No. ClaimIt is an independent platform that helps you discover and understand government schemes using publicly available information. We are not a government body and don't process applications on the government's behalf.",
  },
  {
    question: "Is ClaimIt free to use?",
    answer:
      "Yes — discovering schemes, checking eligibility, and tracking your saved schemes and claims are all completely free, with no hidden fees.",
  },
  {
    question: "How does the AI match score work?",
    answer:
      "Your match score is calculated from the details you provide — income, location, occupation, and more — compared against each scheme's published eligibility criteria. A higher score means your profile aligns more closely with what a scheme typically requires.",
  },
  {
    question: "Is my personal information and privacy protected?",
    answer:
      "Your data is used only to calculate your eligibility and personalize recommendations. We don't sell your information or share it with advertisers.",
  },
  {
    question: "Can I apply for a scheme directly through ClaimIt?",
    answer:
      "Right now, ClaimIt helps you discover and understand schemes, and points you to the official application process. Direct in-app applications are on our roadmap.",
  },
  {
    question: "What if I don't qualify for a scheme today?",
    answer:
      "Eligibility criteria and your own circumstances can change. We recommend checking back periodically — your saved schemes and eligibility results update as new schemes are added.",
  },
];

function Help() {
  usePageTitle("Help");
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return FAQS;
    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <LifeBuoy className="h-3.5 w-3.5" />
            Help Center
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">
            How can we help?
          </h1>
          <p className="text-lg leading-relaxed text-gray-500">
            Search our help articles, or browse the essentials below to get the most out of
            ClaimIt.
          </p>
        </div>

        <AccountTabs />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search help articles, e.g. \u201celigibility score\u201d..."
        />

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-ink">Getting Started</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GETTING_STARTED.map((item) => (
              <FeatureCard key={item.title} as={Link} to={item.to} {...item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
          {filteredFaqs.length > 0 ? (
            <Accordion items={filteredFaqs} />
          ) : (
            <EmptyState
              title="No articles match your search"
              description="Try a different keyword, or reach out to support below — we're happy to help directly."
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Mail className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-base font-semibold text-ink">Contact Support</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Can't find what you're looking for? Our team typically replies within one business
                day.
              </p>
            </div>
            <Button variant="secondary" className="w-fit">
              Email Support
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>

          <Card className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Flag className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-base font-semibold text-ink">Report an Issue</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Spotted incorrect scheme information or a bug? Let us know and we'll look into it.
              </p>
            </div>
            <Button variant="secondary" className="w-fit">
              Report an Issue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default Help;

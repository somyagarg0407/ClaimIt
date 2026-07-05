import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { SchemeCard } from "@/components/shared/SchemeCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { getSchemeBySlug, getRelatedSchemes } from "@/lib/schemes";

function SchemeDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const scheme = getSchemeBySlug(slug);
  const [bookmarked, setBookmarked] = useState(false);

  if (!scheme) {
    return (
      <Section className="pt-16 pb-28">
        <Container>
          <EmptyState
            title="Scheme not found"
            description="This scheme may have been renamed or removed. Head back to Discover to keep browsing all 20,000+ schemes."
            actionLabel="Back to Discover"
            onAction={() => navigate("/discover")}
          />
        </Container>
      </Section>
    );
  }

  const Icon = scheme.icon;
  const related = getRelatedSchemes(scheme.slug, 3);

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-10">
        <Link
          to="/discover"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Discover
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-3">
              <Badge variant="outline" className="w-fit">
                {scheme.category}
              </Badge>
              <h1 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">
                {scheme.title}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-gray-500">{scheme.description}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 self-start lg:flex-col lg:items-end lg:gap-3">
            <ScoreRing value={scheme.matchPercent} size={84} strokeWidth={7} label="Match" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-600">{scheme.overview}</p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Eligibility Criteria</h2>
              <ul className="flex flex-col gap-3">
                {scheme.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Required Documents</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {scheme.requiredDocuments.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} />
                    <span className="text-sm font-medium text-ink">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">How to Apply</h2>
              <ol className="flex flex-col">
                {scheme.applySteps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="tabular-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      {i < scheme.applySteps.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-gray-200" />
                      )}
                    </div>
                    <p className="pb-6 pt-1 text-[0.9375rem] leading-relaxed text-gray-600">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
              <Accordion items={scheme.faqs} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-400">Estimated Benefit</span>
                <span className="tabular-mono text-2xl font-semibold text-ink">{scheme.benefit}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                <SidebarStat icon={Clock} label="Processing" value={scheme.processingTime} />
                <SidebarStat icon={FileText} label="Documents" value={`${scheme.documentsCount} required`} />
                <SidebarStat icon={Building2} label="Department" value={scheme.department} full />
                <SidebarStat icon={CalendarClock} label="Updated" value={scheme.lastUpdated} />
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5">
                <Button className="w-full">
                  Start Application
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setBookmarked((v) => !v)}
                  aria-pressed={bookmarked}
                >
                  <Bookmark className="h-4 w-4" strokeWidth={2} fill={bookmarked ? "currentColor" : "none"} />
                  {bookmarked ? "Saved" : "Save for later"}
                </Button>
              </div>
            </Card>
          </aside>
        </div>

        {/* Related schemes */}
        {related.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-gray-100 pt-10">
            <h2 className="font-display text-xl font-semibold text-ink">You may also be eligible for</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <SchemeCard
                  key={r.slug}
                  as={Link}
                  to={`/schemes/${r.slug}`}
                  icon={r.icon}
                  name={r.title}
                  category={r.category}
                  matchPercent={r.matchPercent}
                  benefit={r.benefit}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </Section>
  );
}

function SidebarStat({ icon: Icon, label, value, full = false }) {
  return (
    <div className={full ? "col-span-2 flex flex-col gap-1" : "flex flex-col gap-1"}>
      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        {label}
      </span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

export default SchemeDetails;

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight, ClipboardList, Compass } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ClaimCard } from "@/components/shared/ClaimCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { getSchemeBySlug } from "@/lib/schemes";
import { usePageTitle } from "@/lib/usePageTitle";

const PAGE_SIZE = 6;

// Mock claim history — replace with a real GET /api/claims call (auth'd via
// JWT) once the backend exists. fetchClaims() below is already shaped like
// that request/response cycle, including the error path.
const MOCK_CLAIMS = [
  {
    slug: "pm-kisan-samman-nidhi",
    status: "Approved",
    appliedAt: "2026-05-10",
    updatedAt: "2026-06-20",
    processingTime: "7–10 days",
    nextAction: "Your benefit is being processed for disbursal — no action needed.",
  },
  {
    slug: "ayushman-bharat-pm-jay",
    status: "Under Review",
    appliedAt: "2026-06-01",
    updatedAt: "2026-06-25",
    processingTime: "3–5 days",
    nextAction: "Sit tight — the department is verifying your submitted details.",
  },
  {
    slug: "national-scholarship-portal",
    status: "Documents Required",
    appliedAt: "2026-06-15",
    updatedAt: "2026-06-30",
    processingTime: "15–20 days",
    nextAction: "Upload your latest mark sheet to continue processing this claim.",
  },
  {
    slug: "sukanya-samriddhi-yojana",
    status: "Submitted",
    appliedAt: "2026-07-01",
    updatedAt: "2026-07-01",
    processingTime: "2–3 days",
    nextAction: "No action needed — we'll notify you once review begins.",
  },
  {
    slug: "pm-awas-yojana",
    status: "Completed",
    appliedAt: "2026-02-10",
    updatedAt: "2026-04-15",
    processingTime: "20–30 days",
    nextAction: "This claim is complete — your benefit has been released.",
  },
  {
    slug: "pm-mudra-yojana",
    status: "Rejected",
    appliedAt: "2026-03-01",
    updatedAt: "2026-03-20",
    processingTime: "10–15 days",
    nextAction: "Rejected: annual turnover exceeded the eligible threshold. You may reapply if your circumstances change.",
  },
  {
    slug: "disability-pension-scheme",
    status: "Draft",
    appliedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    processingTime: "10–12 days",
    nextAction: "Finish filling out your application to submit it for review.",
  },
];

function relativeDateLabel(isoDate) {
  const diffDays = Math.floor((Date.now() - new Date(isoDate).getTime()) / 86400000);
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

const ACTIONABLE_STATUSES = new Set(["Documents Required", "Draft"]);

function SummaryStat({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2 text-center">
      <span className={`tabular-mono text-lg font-semibold ${highlight ? "text-brand-700" : "text-ink"}`}>
        {value}
      </span>
      <span className="text-xs font-medium text-gray-400">{label}</span>
    </div>
  );
}

function MyClaims() {
  usePageTitle("My Claims");
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "ready"
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(1);

  // Simulates GET /api/claims. Always resolves successfully in this demo —
  // swap the body for a real fetch() call; the error branch below already
  // renders correctly if that call rejects, no other change needed.
  const fetchClaims = useCallback(() => {
    setStatus("loading");
    window.setTimeout(() => {
      const records = MOCK_CLAIMS.map((c) => {
        const scheme = getSchemeBySlug(c.slug);
        if (!scheme) return null;
        return {
          ...scheme,
          ...c,
          appliedLabel: relativeDateLabel(c.appliedAt),
          updatedLabel: relativeDateLabel(c.updatedAt),
        };
      }).filter(Boolean);
      setClaims(records);
      setStatus("ready");
    }, 800);
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const summary = useMemo(() => {
    const approved = claims.filter((c) => c.status === "Approved" || c.status === "Completed").length;
    const inProgress = claims.filter((c) => c.status === "Submitted" || c.status === "Under Review").length;
    const needsAction = claims.filter((c) => ACTIONABLE_STATUSES.has(c.status)).length;
    return { total: claims.length, approved, inProgress, needsAction };
  }, [claims]);

  const totalPages = Math.max(1, Math.ceil(claims.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleClaims = claims.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <ClipboardList className="h-3.5 w-3.5" />
            Your Application Tracker
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">My Claims</h1>
          <p className="text-lg leading-relaxed text-gray-500">
            Every application you&apos;ve started or submitted — where it stands, and what happens
            next.
          </p>
        </div>

        {status === "loading" && <ClaimsSkeleton />}

        {status === "error" && (
          <EmptyState
            icon={AlertTriangle}
            title="We couldn't load your claims"
            description="Something went wrong on our end. Please check your connection and try again."
            actionLabel="Retry"
            onAction={fetchClaims}
          />
        )}

        {status === "ready" && claims.length === 0 && (
          <EmptyState
            icon={ClipboardList}
            title="You haven't submitted any applications yet"
            description="Discover schemes you're eligible for and start your first claim."
            actionLabel="Explore Schemes"
            onAction={() => navigate("/discover")}
          />
        )}

        {status === "ready" && claims.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 sm:justify-start sm:gap-1">
              <SummaryStat label="Total Claims" value={summary.total} />
              <div className="h-9 w-px bg-gray-100" />
              <SummaryStat label="In Progress" value={summary.inProgress} />
              <div className="h-9 w-px bg-gray-100" />
              <SummaryStat label="Approved" value={summary.approved} />
              <div className="h-9 w-px bg-gray-100" />
              <SummaryStat label="Needs Action" value={summary.needsAction} highlight={summary.needsAction > 0} />
            </div>

            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {visibleClaims.map((claim) => (
                  <ClaimCard key={claim.slug} {...claim} />
                ))}
              </div>

              <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
            </div>

            <Card className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col gap-1">
                <span className="flex items-center justify-center gap-2 text-sm font-semibold text-ink sm:justify-start">
                  <Compass className="h-4 w-4 text-brand-600" strokeWidth={2} />
                  Keep exploring
                </span>
                <p className="text-sm text-gray-500">
                  Found something new? Start another claim any time — there's no limit to how many
                  schemes you can apply for.
                </p>
              </div>
              <Button as={Link} to="/discover" variant="secondary" className="w-full shrink-0 sm:w-auto">
                Explore Schemes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </>
        )}
      </Container>
    </Section>
  );
}

function ClaimsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-gray-100" />
              <div className="flex flex-col gap-2 pt-0.5">
                <div className="h-4 w-32 animate-pulse rounded-full bg-gray-100" />
                <div className="h-3 w-40 animate-pulse rounded-full bg-gray-100" />
              </div>
            </div>
            <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="h-8 w-full animate-pulse rounded-full bg-gray-100" />
          <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-gray-100" />
          <div className="h-9 w-full animate-pulse rounded-xl bg-gray-100" />
        </Card>
      ))}
    </div>
  );
}

export default MyClaims;

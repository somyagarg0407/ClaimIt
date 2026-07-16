import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { SchemeCard } from "@/components/shared/SchemeCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { FILTER_FIELDS } from "@/components/shared/FilterPanel";
import { SCHEMES } from "@/lib/schemes";
import { usePageTitle } from "@/lib/usePageTitle";

const FIELD_BY_KEY = Object.fromEntries(FILTER_FIELDS.map((f) => [f.key, f]));

// Discover's FilterPanel doesn't have Education/Minority/Disability fields
// yet, and Discover is out of scope for this task — so these are defined
// locally instead of extending the shared FilterPanel any further.
const LOCAL_FIELDS = {
  education: {
    label: "Education",
    options: ["Any Level", "Below 10th", "10th Pass", "12th Pass", "Undergraduate", "Postgraduate", "Doctorate"],
  },
  minority: {
    label: "Minority Status",
    options: ["Not Applicable", "Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
  },
  disability: {
    label: "Disability",
    options: ["None", "Below 40%", "40% – 79%", "80% and Above"],
  },
};

function getField(key) {
  return LOCAL_FIELDS[key] || FIELD_BY_KEY[key];
}

const DEFAULT_FORM = {
  age: "Any Age",
  gender: "Any Gender",
  state: "All States",
  occupation: "Any Occupation",
  income: "Any Income",
  education: "Any Level",
  category: "All Categories",
  minority: "Not Applicable",
  disability: "None",
};

const STEPS = [
  { title: "About You", fields: ["age", "gender", "state", "occupation"], required: ["age", "state", "occupation"] },
  { title: "Financial & Education", fields: ["income", "education"], required: ["income"] },
  { title: "Preferences", fields: ["category", "minority", "disability"], required: ["category"] },
];

const REQUIRED_FIELD_MESSAGE = "This helps us give you an accurate result.";

// Occupations that most strongly predict eligibility for each scheme
// category. Purely a mock heuristic for the demo profile below — swap
// computeEligibility() for a real POST /api/eligibility/check call once
// the Node/Express backend exists; nothing else on this page needs to change.
const CATEGORY_OCCUPATION_MATCH = {
  Farmers: ["Farmer"],
  Students: ["Student"],
  Education: ["Student"],
  Employment: ["Unemployed", "Self-employed"],
  Business: ["Self-employed"],
  "Senior Citizens": ["Senior Citizen"],
};

function validateStep(stepIndex, form) {
  const step = STEPS[stepIndex];
  const errors = {};
  step.required.forEach((key) => {
    if (form[key] === DEFAULT_FORM[key]) {
      errors[key] = REQUIRED_FIELD_MESSAGE;
    }
  });
  return errors;
}

function computeEligibility(form) {
  let score = 60;
  const reasons = [];

  if (form.income !== "Any Income" && form.income !== "Above ₹10L") {
    score += 12;
    reasons.push({
      matched: true,
      text: `Your income bracket (${form.income}) falls within the range most ${form.category.toLowerCase()} schemes target.`,
    });
  } else if (form.income === "Above ₹10L") {
    score -= 6;
    reasons.push({ matched: false, text: "Your income bracket is above the range most welfare schemes target." });
  }

  if (form.state !== "All States") {
    score += 8;
    reasons.push({ matched: true, text: `${form.state} has active state-specific schemes you may qualify for.` });
  }

  const relevantOccupations = CATEGORY_OCCUPATION_MATCH[form.category] || [];
  if (relevantOccupations.includes(form.occupation)) {
    score += 12;
    reasons.push({
      matched: true,
      text: `Your occupation (${form.occupation}) directly matches ${form.category} eligibility criteria.`,
    });
  } else if (form.occupation !== "Any Occupation") {
    score += 3;
    reasons.push({
      matched: false,
      text: `Your occupation (${form.occupation}) isn't the primary target for ${form.category} schemes, but you may still qualify for others.`,
    });
  }

  if (form.age !== "Any Age") {
    score += 6;
    reasons.push({ matched: true, text: `Your age group (${form.age}) is within range for most schemes in this category.` });
  }

  if (form.category === "Disability" && form.disability !== "Any" && form.disability !== "None") {
    score += 10;
    reasons.push({ matched: true, text: `Your disability status (${form.disability}) matches this category's criteria.` });
  }

  if (form.category === "Minorities" && form.minority !== "Any" && form.minority !== "Not Applicable") {
    score += 10;
    reasons.push({ matched: true, text: `Your minority status (${form.minority}) matches this category's criteria.` });
  }

  score = Math.max(45, Math.min(97, Math.round(score)));

  let tier = "low";
  if (score >= 85) tier = "high";
  else if (score >= 65) tier = "medium";

  return { score, tier, reasons: reasons.slice(0, 4) };
}

const TIER_COPY = {
  high: {
    title: "You're a strong match",
    note: "Based on your answers, you meet most eligibility criteria for this category.",
  },
  medium: {
    title: "You may partially qualify",
    note: "You meet some criteria — a few gaps could affect approval, but it's worth applying.",
  },
  low: {
    title: "Limited match based on your profile",
    note: "Your current profile matches fewer criteria than most applicants in this category.",
  },
};

function Eligibility() {
  usePageTitle("Eligibility");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleFieldChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleNext() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    // No backend yet — simulate the AI evaluation. Replace this block with
    // a real POST /api/eligibility/check call; the loading/result states
    // below already match what that request/response cycle needs.
    setLoading(true);
    window.setTimeout(() => {
      setResult(computeEligibility(form));
      setLoading(false);
    }, 1200);
  }

  function handleRetake() {
    setStep(0);
    setForm(DEFAULT_FORM);
    setErrors({});
    setResult(null);
  }

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Eligibility Check
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Check Your Eligibility
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            Answer a few quick questions and our AI will instantly explain which schemes you
            qualify for — no paperwork, no guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <Card className="flex flex-col gap-6 p-8 sm:p-10">
            <ProgressSteps steps={STEPS.map((s) => s.title)} current={step} />

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                {STEPS[step].fields.map((key) => {
                  const field =
                    key === "category"
                      ? { ...FIELD_BY_KEY.category, options: FIELD_BY_KEY.category.options.slice(1) }
                      : getField(key);
                  return (
                    <Select
                      key={key}
                      label={field.label}
                      value={form[key]}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      options={field.options}
                      error={errors[key]}
                      className={STEPS[step].fields.length === 1 ? "sm:col-span-2" : undefined}
                    />
                  );
                })}
              </motion.div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-6 dark:border-white/[0.06]">
                {step > 0 ? (
                  <Button type="button" variant="ghost" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <span />
                )}

                {step < STEPS.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Analyzing…" : "Check Eligibility"}
                    {!loading && <Sparkles className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </form>
          </Card>

          <div className="flex flex-col gap-6">
            {!result && !loading && (
              <EmptyState
                icon={Sparkles}
                title="Your eligibility result will appear here"
                description="Complete the three quick steps and we'll instantly show your AI match score, why you qualify, and the schemes worth applying to."
              />
            )}

            {loading && <ResultSkeleton />}

            {result && !loading && (
              <EligibilityResult result={result} category={form.category} onRetake={handleRetake} />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ResultSkeleton() {
  return (
    <Card className="flex flex-col gap-6 p-8 sm:p-10">
      <div className="flex items-center gap-5">
        <div className="h-24 w-24 shrink-0 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
          <div className="h-5 w-2/3 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-6 dark:border-white/[0.06]">
        <div className="h-3 w-full animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
        <div className="h-3 w-4/6 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
      </div>
      <p className="text-center text-sm font-medium text-gray-400 dark:text-[#8A8A8A]">Analyzing your eligibility…</p>
    </Card>
  );
}

function EligibilityResult({ result, category, onRetake }) {
  const tierCopy = TIER_COPY[result.tier];

  const topSchemes = useMemo(
    () =>
      SCHEMES.filter((s) => s.category === category)
        .sort((a, b) => b.matchPercent - a.matchPercent)
        .slice(0, 3),
    [category]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <Card className="flex flex-col gap-6 p-8 sm:p-10">
        <div className="flex items-center gap-5">
          <ScoreRing value={result.score} size={96} strokeWidth={8} label="Match" />
          <div className="flex flex-col gap-1.5">
            <Badge variant="soft" size="sm" className="w-fit">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              AI Assessment
            </Badge>
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">{tierCopy.title}</h2>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{tierCopy.note}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 dark:border-white/[0.06]">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#8A8A8A]">Why this result</span>
          <ul className="flex flex-col gap-2.5">
            {result.reasons.map((r) => (
              <li key={r.text} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-[#B5B5B5]">
                {r.matched ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" strokeWidth={2} />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" strokeWidth={2} />
                )}
                {r.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row dark:border-white/[0.06]">
          <Button as={Link} to="/discover" className="w-full sm:w-auto">
            Explore Matched Schemes
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" onClick={onRetake} className="w-full sm:w-auto">
            <RotateCcw className="h-4 w-4" />
            Retake Assessment
          </Button>
        </div>
      </Card>

      {topSchemes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-white">Top matches for you</h3>
          <div className="flex flex-col gap-4">
            {topSchemes.map((s) => (
              <SchemeCard
                key={s.slug}
                as={Link}
                to={`/schemes/${s.slug}`}
                icon={s.icon}
                name={s.title}
                category={s.category}
                matchPercent={s.matchPercent}
                benefit={s.benefit}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Eligibility;

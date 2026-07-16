import { useState } from "react";
import { CircleUserRound, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { AccountTabs } from "@/components/shared/AccountTabs";
import { FormSection } from "@/components/shared/FormSection";
import { CategoryChip } from "@/components/shared/CategoryChip";
import { FILTER_FIELDS } from "@/components/shared/FilterPanel";
import { CATEGORIES } from "@/lib/schemes";
import { usePageTitle } from "@/lib/usePageTitle";

const FIELD_BY_KEY = Object.fromEntries(FILTER_FIELDS.map((f) => [f.key, f]));

// "Category" here means social/reservation category (a standard field on
// Indian government forms) — distinct from lib/schemes.js's scheme
// categories (Farmers, Women, etc.), which are used below for "Interested
// Scheme Categories" instead. Defined locally since neither FilterPanel
// nor Eligibility already has this exact field.
const SOCIAL_CATEGORY_OPTIONS = ["General", "OBC", "SC", "ST", "EWS", "Other"];
const EDUCATION_OPTIONS = [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Undergraduate",
  "Postgraduate",
  "Doctorate",
];
const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
];

const SCHEME_CATEGORY_LABELS = CATEGORIES.filter((c) => c.label !== "All Schemes");

const INITIAL_PROFILE = {
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  mobile: "+91 98765 43210",
  state: "Maharashtra",
  socialCategory: "General",
  occupation: "Salaried",
  income: "₹3L – ₹6L",
  education: "Undergraduate",
  language: "English",
  interestedCategories: ["Farmers", "Healthcare", "Education"],
};

function Profile() {
  usePageTitle("Profile");
  const [form, setForm] = useState(INITIAL_PROFILE);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSavedAt(null);
  }

  function toggleInterestedCategory(label) {
    setForm((prev) => {
      const has = prev.interestedCategories.includes(label);
      return {
        ...prev,
        interestedCategories: has
          ? prev.interestedCategories.filter((c) => c !== label)
          : [...prev.interestedCategories, label],
      };
    });
    setSavedAt(null);
  }

  function handleSave(e) {
    e.preventDefault();
    // No backend yet — simulate PATCH /api/profile. Swap this block for a
    // real request; the saving/savedAt UI already matches that cycle.
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setSavedAt(new Date());
    }, 800);
  }

  function handleCancel() {
    setForm(INITIAL_PROFILE);
    setSavedAt(null);
  }

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <CircleUserRound className="h-3.5 w-3.5" />
            Your Profile
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Profile
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            Keep your details up to date — they power every eligibility check and AI match score.
          </p>
        </div>

        <AccountTabs />

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <FormSection title="Personal Information" description="How we identify and reach you.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <Input
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="sm:col-span-2"
              />
            </div>
          </FormSection>

          <FormSection
            title="Profile Details"
            description="Used to calculate your eligibility and AI match scores."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Select
                label="State"
                name="state"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                options={FIELD_BY_KEY.state.options.filter((o) => o !== "All States")}
              />
              <Select
                label="Category"
                name="socialCategory"
                value={form.socialCategory}
                onChange={(e) => updateField("socialCategory", e.target.value)}
                options={SOCIAL_CATEGORY_OPTIONS}
              />
              <Select
                label="Occupation"
                name="occupation"
                value={form.occupation}
                onChange={(e) => updateField("occupation", e.target.value)}
                options={FIELD_BY_KEY.occupation.options.filter((o) => o !== "Any Occupation")}
              />
              <Select
                label="Annual Income"
                name="income"
                value={form.income}
                onChange={(e) => updateField("income", e.target.value)}
                options={FIELD_BY_KEY.income.options.filter((o) => o !== "Any Income")}
              />
              <Select
                label="Education"
                name="education"
                value={form.education}
                onChange={(e) => updateField("education", e.target.value)}
                options={EDUCATION_OPTIONS}
                className="sm:col-span-2"
              />
            </div>
          </FormSection>

          <FormSection title="Preferences" description="Fine-tune the recommendations you see.">
            <Select
              label="Preferred Language"
              name="language"
              value={form.language}
              onChange={(e) => updateField("language", e.target.value)}
              options={LANGUAGE_OPTIONS}
            />

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-medium text-gray-500 dark:text-[#8A8A8A]">Interested Scheme Categories</span>
              <div className="flex flex-wrap gap-2.5">
                {SCHEME_CATEGORY_LABELS.map((cat) => (
                  <CategoryChip
                    key={cat.label}
                    label={cat.label}
                    icon={cat.icon}
                    active={form.interestedCategories.includes(cat.label)}
                    onClick={() => toggleInterestedCategory(cat.label)}
                  />
                ))}
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-end">
            {savedAt && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-brand-700 dark:text-brand-400">
                <Check className="h-4 w-4" strokeWidth={2} />
                Saved
              </span>
            )}
            <Button type="button" variant="ghost" onClick={handleCancel} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="w-full sm:w-auto">
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}

export default Profile;

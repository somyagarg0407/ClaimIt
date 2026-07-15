import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

/**
 * Filter definitions for the Discover results. UI only, per the product
 * brief — these don't affect the result set yet; they'll plug into the
 * real query once the Node/Express API exists.
 */
const FILTER_FIELDS = [
  {
    key: "state",
    label: "State",
    options: [
      "All States",
      "Maharashtra",
      "Uttar Pradesh",
      "Bihar",
      "Tamil Nadu",
      "Karnataka",
      "West Bengal",
      "Rajasthan",
      "Gujarat",
      "Madhya Pradesh",
      "Punjab",
    ],
  },
  {
    key: "age",
    label: "Age",
    options: ["Any Age", "0–18", "18–25", "26–40", "41–60", "60+"],
  },
  {
    key: "gender",
    label: "Gender",
    options: ["Any Gender", "Male", "Female", "Other"],
  },
  {
    key: "occupation",
    label: "Occupation",
    options: [
      "Any Occupation",
      "Farmer",
      "Student",
      "Salaried",
      "Self-employed",
      "Unemployed",
      "Homemaker",
      "Senior Citizen",
    ],
  },
  {
    key: "income",
    label: "Annual Income",
    options: ["Any Income", "Below ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L – ₹10L", "Above ₹10L"],
  },
  {
    key: "category",
    label: "Category",
    options: [
      "All Categories",
      "Education",
      "Farmers",
      "Women",
      "Senior Citizens",
      "Healthcare",
      "Housing",
      "Business",
      "Employment",
      "Disability",
      "Minorities",
      "Students",
    ],
  },
  {
    key: "benefitType",
    label: "Benefit Type",
    options: [
      "Any Type",
      "Cash Transfer",
      "Subsidy",
      "Insurance",
      "Pension",
      "Scholarship",
      "Loan / Credit",
      "Healthcare Cover",
      "Housing Support",
    ],
  },
];

const DEFAULT_FILTERS = FILTER_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.key]: field.options[0] }),
  {}
);

function FilterPanel({ values = DEFAULT_FILTERS, onChange, onReset }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/[0.06] dark:bg-[#0A0A0A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <SlidersHorizontal className="h-4 w-4 text-brand-600" strokeWidth={2} />
          Refine your results
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {FILTER_FIELDS.map((field) => (
          <Select
            key={field.key}
            label={field.label}
            value={values[field.key]}
            onChange={(e) => onChange?.(field.key, e.target.value)}
            options={field.options}
          />
        ))}
      </div>
    </div>
  );
}

export { FilterPanel, DEFAULT_FILTERS, FILTER_FIELDS };

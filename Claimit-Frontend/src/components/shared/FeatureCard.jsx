import { Card } from "@/components/ui/Card";

/**
 * Generic value-proposition card. Used in the "Why ClaimIt" grid and
 * reusable anywhere the product needs to explain a capability with an
 * icon + short copy.
 */
function FeatureCard({ icon: Icon, title, description, ...rest }) {
  return (
    <Card hover {...rest} className="flex flex-col gap-4 p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-white">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-gray-500">{description}</p>
      </div>
    </Card>
  );
}

export { FeatureCard };

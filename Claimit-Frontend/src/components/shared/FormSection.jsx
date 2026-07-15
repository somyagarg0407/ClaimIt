import { Card } from "@/components/ui/Card";

/**
 * A titled group of form fields inside a Card. Shared by Profile and
 * Settings so their "sections of settings" read as the same pattern
 * rather than two independently invented layouts.
 */
function FormSection({ title, description, children }) {
  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-lg font-semibold text-ink dark:text-white">{title}</h2>
        {description && <p className="text-sm text-gray-500 dark:text-[#B5B5B5]">{description}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </Card>
  );
}

export { FormSection };

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * Shared "under development" template. Not a generic ComingSoon dead-end —
 * each consumer supplies its own icon/title/description so the page still
 * feels like a considered part of the product rather than a placeholder.
 * Reused by Profile, Notifications, Settings and My Claims.
 */
function PlaceholderPage({ icon: Icon, title, description }) {
  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
            <Icon className="h-9 w-9" strokeWidth={1.75} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Badge variant="outline">Under Development</Badge>
            <h1 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-500">{description}</p>
          </div>

          <Button as={Link} to="/discover" size="lg">
            Back to Discover
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export { PlaceholderPage };

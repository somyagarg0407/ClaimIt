import { Link } from "react-router-dom";
import { ArrowRight, Compass, MapPinOff } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePageTitle } from "@/lib/usePageTitle";

function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400">
            <MapPinOff className="h-9 w-9" strokeWidth={1.75} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Badge variant="outline">404</Badge>
            <h1 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">
              Page Not Found
            </h1>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
              This page doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button as={Link} to="/" size="lg" className="w-full sm:w-auto">
              Go Home
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as={Link} to="/discover" variant="secondary" size="lg" className="w-full sm:w-auto">
              <Compass className="h-4 w-4" />
              Explore Schemes
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default NotFound;

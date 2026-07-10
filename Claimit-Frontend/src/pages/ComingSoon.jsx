import { Link } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * Temporary placeholder for pages that are on the roadmap (Discover,
 * Eligibility, My Claims, Help, etc.) but not yet built. Swap out for the
 * real page component in App.jsx as each one ships — no other wiring
 * needed since Navbar/Footer already link here by path.
 */
function ComingSoon({ title = "This page" }) {
  usePageTitle(title);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <Badge variant="outline">
        <Construction className="h-3.5 w-3.5" />
        In progress
      </Badge>
      <h1 className="font-display text-display-sm font-bold text-ink">{title} is on its way</h1>
      <p className="max-w-md text-lg leading-relaxed text-gray-500">
        We&apos;re still building this part of ClaimIt. Check back soon, or
        head back home in the meantime.
      </p>
      <Button as={Link} to="/" variant="secondary">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Button>
    </Container>
  );
}

export default ComingSoon;

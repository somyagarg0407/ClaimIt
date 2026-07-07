import { CircleUserRound } from "lucide-react";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

function Profile() {
  return (
    <PlaceholderPage
      icon={CircleUserRound}
      title="Your Profile"
      description="Manage your personal details, income and occupation information, and the eligibility profile that powers your AI matches — all in one place, coming soon."
    />
  );
}

export default Profile;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { PopularSchemes } from "@/components/sections/PopularSchemes";
import { CTA } from "@/components/sections/CTA";
import { usePageTitle } from "@/lib/usePageTitle";

function Home() {
  const location = useLocation();
  usePageTitle("Home");

  // Handles /#how-it-works links clicked from other pages — a plain anchor
  // only works if you're already on Home, since the element doesn't exist
  // elsewhere. This scrolls to it once Home has mounted instead.
  useEffect(() => {
    if (location.hash !== "#how-it-works") return;
    const target = document.getElementById("how-it-works");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <PopularSchemes />
      <CTA />
    </>
  );
}

export default Home;

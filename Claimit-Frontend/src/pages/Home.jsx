import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { PopularSchemes } from "@/components/sections/PopularSchemes";
import { CTA } from "@/components/sections/CTA";

function Home() {
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

import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import SchemeDetails from "@/pages/SchemeDetails";
import ComingSoon from "@/pages/ComingSoon";

/**
 * Route map for the app. Add new pages here as they're built — Navbar and
 * Footer already link out to these paths (see NAV_LINKS / FOOTER_LINKS),
 * so wiring a new page is a one-line change once the component exists.
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/schemes/:slug" element={<SchemeDetails />} />
          <Route path="/eligibility" element={<ComingSoon title="Eligibility" />} />
          <Route path="/claims" element={<ComingSoon title="My Claims" />} />
          <Route path="/help" element={<ComingSoon title="Help" />} />
          <Route path="/about" element={<ComingSoon title="About" />} />
          <Route path="/contact" element={<ComingSoon title="Contact" />} />
          <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
          <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
          <Route path="/cookies" element={<ComingSoon title="Cookie Policy" />} />
          <Route path="*" element={<ComingSoon title="This page" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

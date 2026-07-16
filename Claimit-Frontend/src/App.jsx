import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import SchemeDetails from "@/pages/SchemeDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Eligibility from "@/pages/Eligibility";
import MySchemes from "@/pages/MySchemes";
import MyClaims from "@/pages/MyClaims";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import NotFound from "@/pages/NotFound";
import ComingSoon from "@/pages/ComingSoon";


/**
 * Route map for the app. Add new pages here as they're built — Navbar and
 * Footer already link out to these paths (see NAV_LINKS / FOOTER_LINKS),
 * so wiring a new page is a one-line change once the component exists.
 *
 * "My Schemes" moved from /claims to /my-schemes to sit alongside
 * /my-claims (two distinct concepts: saved schemes vs. actual submitted
 * applications). /claims redirects so no old link 404s.
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/schemes/:slug" element={<SchemeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ComingSoon title="Password Reset" />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/my-schemes" element={<MySchemes />} />
          <Route path="/claims" element={<Navigate to="/my-schemes" replace />} />
          <Route path="/my-claims" element={<MyClaims />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

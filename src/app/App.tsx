import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { GlobalStyles } from "./components/GlobalStyles";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { FestivalsPage } from "./pages/FestivalsPage";
import { SafetyPage } from "./pages/SafetyPage";
import { NearYouPage } from "./pages/NearYouPage";
import { ApplyPage } from "./pages/ApplyPage";

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const id = location.hash.slice(1);
    let cancelled = false;

    // Give the route change a moment to mount/lay out before scrolling.
    const attempt = setTimeout(() => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    // Some mobile browsers silently drop a smooth scroll if page content
    // (e.g. images) shifts layout mid-animation. Verify we actually landed
    // and snap into place if not.
    const verify = setTimeout(() => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el && Math.abs(el.getBoundingClientRect().top) > 40) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 700);

    return () => {
      cancelled = true;
      clearTimeout(attempt);
      clearTimeout(verify);
    };
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-foreground" style={{ minHeight: "100vh" }}>
        <GlobalStyles />
        <ScrollToHash />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/near-you" element={<NearYouPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/safety" element={<SafetyPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

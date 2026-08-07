import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { GlobalStyles } from "./components/GlobalStyles";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { FestivalsPage } from "./pages/FestivalsPage";
import { SafetyPage } from "./pages/SafetyPage";

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
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
          <Route path="/safety" element={<SafetyPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

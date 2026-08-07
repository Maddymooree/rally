import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goApply = () => {
    setOpen(false);
    navigate("/#apply");
  };

  const linkStyle: React.CSSProperties = {
    color: "color-mix(in srgb, var(--foreground) 55%, transparent)",
  };

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center px-6 md:px-10 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb,var(--background) 88%,transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="flex-1 flex items-center">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="font-display font-black text-xl tracking-tight text-white">rally</span>
          <span
            className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in srgb, var(--primary) 22%, transparent)" }}
          >
            @youshouldrally
          </span>
        </Link>
      </div>

      <div className="nav-links-desktop hidden md:flex items-center justify-center gap-8">
        <Link to="/festivals" className="font-body text-xs font-semibold uppercase tracking-widest" style={linkStyle}>
          festivals
        </Link>
        <Link to="/safety" className="font-body text-xs font-semibold uppercase tracking-widest" style={linkStyle}>
          safety
        </Link>
        <button onClick={goApply} className="font-body text-xs font-semibold uppercase tracking-widest cursor-pointer" style={linkStyle}>
          apply
        </button>
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <div className="hidden md:block">
          <button
            onClick={goApply}
            className="font-body text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            apply
          </button>
        </div>

        <button
          className="nav-menu-btn items-center justify-center w-9 h-9 rounded-full"
          aria-label="menu"
          onClick={() => setOpen((o) => !o)}
          style={{ color: "white", background: open ? "color-mix(in srgb, var(--foreground) 10%, transparent)" : "transparent" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="absolute top-full right-6 mt-3 flex flex-col rounded-2xl p-2 min-w-[180px]"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
        >
          <Link to="/festivals" className="font-body text-sm font-medium px-4 py-3 rounded-xl" style={{ color: "var(--foreground)" }} onClick={() => setOpen(false)}>
            festivals
          </Link>
          <Link to="/safety" className="font-body text-sm font-medium px-4 py-3 rounded-xl" style={{ color: "var(--foreground)" }} onClick={() => setOpen(false)}>
            safety
          </Link>
          <button onClick={goApply} className="font-body text-sm font-bold px-4 py-3 rounded-xl text-left" style={{ color: "var(--primary)" }}>
            apply
          </button>
        </div>
      )}
    </nav>
  );
}

import { Link } from "react-router";

export function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-display font-black text-xl text-white">rally</span>
        <span className="font-body text-xs" style={{ color: "var(--muted-foreground)" }}>
          @youshouldrally
        </span>
      </div>
      <div className="flex items-center gap-5 font-body text-xs" style={{ color: "color-mix(in srgb,var(--foreground) 45%,transparent)" }}>
        <Link to="/festivals" className="hover:underline">
          all festivals
        </Link>
        <Link to="/safety" className="hover:underline">
          safety
        </Link>
        <a href="mailto:partnerships@youshouldrally.com" className="hover:underline">
          partner with us
        </a>
      </div>
    </footer>
  );
}

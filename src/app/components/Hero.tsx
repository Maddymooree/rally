import { ArrowRight } from "lucide-react";
import rally1 from "@/imports/rally1.jpg";
import rally2 from "@/imports/rally2.jpg";
import rally3 from "@/imports/rally3.jpg";
import rally4 from "@/imports/rally4.jpg";
import rally7 from "@/imports/rally7.jpg";

const PHOTOS = [rally1, rally2, rally3, rally4, rally7];

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div className="absolute inset-0 mx-auto" style={{ maxWidth: "1300px" }}>
        <div className="collage-frame f1">
          <div className="frame-inner" style={{ backgroundImage: `url(${PHOTOS[0]})` }} />
        </div>
        <div className="collage-frame f2">
          <div className="frame-inner" style={{ backgroundImage: `url(${PHOTOS[1]})` }} />
        </div>
        <div className="collage-frame f3">
          <div className="frame-inner" style={{ backgroundImage: `url(${PHOTOS[2]})` }} />
        </div>
        <div className="collage-frame f4">
          <div className="frame-inner" style={{ backgroundImage: `url(${PHOTOS[3]})` }} />
        </div>
        <div className="collage-frame f5">
          <div className="frame-inner" style={{ backgroundImage: `url(${PHOTOS[4]})` }} />
        </div>
        <div className="collage-frame f6">
          <div className="frame-inner" style={{ backgroundImage: `url(${rally2})` }} />
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: "200px", zIndex: 4, background: "linear-gradient(to bottom,color-mix(in srgb, var(--background) 85%, transparent) 0%,transparent 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 4, background: "radial-gradient(ellipse 68% 52% at 50% 50%,transparent 10%,color-mix(in srgb, var(--background) 42%, transparent) 65%,color-mix(in srgb, var(--background) 82%, transparent) 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "220px", zIndex: 4, background: "linear-gradient(to top,color-mix(in srgb, var(--background) 95%, transparent) 0%,transparent 100%)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-24" style={{ zIndex: 10 }}>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-7"
          style={{ border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)", background: "color-mix(in srgb, var(--primary) 7%, transparent)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--primary)" }} />
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--primary)" }}>
            not a dating app
          </span>
        </div>

        <h1
          className="font-display text-center text-white mb-6"
          style={{ fontSize: "clamp(2.6rem,7.5vw,6rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: "720px" }}
        >
          you shouldn't have to <span style={{ color: "var(--primary)" }}>rally</span> alone.
        </h1>

        <p className="font-body text-center mb-10 max-w-sm" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)", fontSize: "1rem", lineHeight: 1.65 }}>
          no swiping. no profiles to maintain.
          <br />
          just people headed to the same place as you.
        </p>

        <div className="flex flex-col items-center gap-4">
          <a
            href="#apply"
            className="font-body flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            find my crew <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

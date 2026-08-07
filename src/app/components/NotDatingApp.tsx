import { Check, X } from "lucide-react";
import { Mascot } from "./Mascot";

const IS = [
  "a crew for your festival — not a match",
  "group-first: you meet everyone at once",
  "vetted applicants. real intros. actual plans.",
  "people headed to the same place",
];
const NOT = [
  "a dating app",
  "a random group chat you never show up to",
  "for finding a +1 to hold hands with",
  "for people who are scared of crowds",
];

export function NotDatingApp() {
  return (
    <section className="pt-24 pb-12 px-6 md:px-12" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-12" style={{ color: "var(--primary)" }}>
          let's be clear
        </p>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 28%, transparent)" }}
              >
                <Check size={12} style={{ color: "var(--primary)" }} />
              </div>
              <h2 className="font-display font-black text-2xl text-white">rally is</h2>
            </div>
            <ul className="space-y-4">
              {IS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb,var(--foreground) 60%,transparent)" }}>
                  <Check size={13} className="mt-0.5 shrink-0" style={{ color: "var(--primary)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--destructive) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--destructive) 18%, transparent)" }}
              >
                <X size={12} style={{ color: "color-mix(in srgb, var(--destructive) 70%, transparent)" }} />
              </div>
              <h2 className="font-display font-black text-2xl text-white">rally is not</h2>
            </div>
            <ul className="space-y-4">
              {NOT.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb,var(--foreground) 22%,transparent)" }}>
                  <X size={13} className="mt-0.5 shrink-0" style={{ color: "color-mix(in srgb, var(--destructive) 38%, transparent)" }} />
                  <span style={{ textDecoration: "line-through", textDecorationColor: "color-mix(in srgb, var(--foreground) 10%, transparent)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-3">
          <Mascot size={32} color="color-mix(in srgb, var(--foreground) 30%, transparent)" />
          <p className="font-body text-sm italic" style={{ color: "color-mix(in srgb, var(--foreground) 25%, transparent)" }}>
            "just go. we'll find your people."
          </p>
        </div>
      </div>
    </section>
  );
}

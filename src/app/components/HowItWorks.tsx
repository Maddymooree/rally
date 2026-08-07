const STEPS = [
  { n: "01", title: "apply to rally", body: "tell us where you're headed and a bit about yourself. one form, two minutes, no account to build out." },
  { n: "02", title: "we vet & find your overlap", body: "every application is reviewed by a real person, then matched with others headed to the same event on the same dates." },
  { n: "03", title: "land with your crew", body: "group intro, real names, real plans. show up like you know each other — because you will." },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          how it works
        </p>
        <h2 className="font-display font-black text-white mb-16" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
          simple. on purpose.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="p-7 rounded-xl" style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
              <span className="font-display font-black block mb-5 leading-none select-none" style={{ fontSize: "3.5rem", color: "color-mix(in srgb, var(--primary) 14%, transparent)" }}>
                {s.n}
              </span>
              <h3 className="font-display font-black text-white text-xl mb-3">{s.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

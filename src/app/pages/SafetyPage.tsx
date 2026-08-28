import { Link } from "react-router";
import { Shield, UserCheck, Users, Flag } from "lucide-react";

const ITEMS = [
  {
    icon: Shield,
    title: "vetted, not open signup",
    body: "every application is reviewed by a real person — name, age, instagram, and trip details are all reviewed before you're approved.",
  },
  {
    icon: UserCheck,
    title: "18 and up only",
    body: "every rally member must be 18+ before joining a crew.",
  },
  {
    icon: Users,
    title: "introduced, not matched",
    body: "grouped with people actually headed to your event — never by an algorithm score.",
  },
  {
    icon: Flag,
    title: "report & remove",
    body: "one tap. no awkward confrontation. we'll take it from there.",
  },
];

export function SafetyPage() {
  return (
    <div style={{ paddingTop: "88px" }}>
      <section className="px-6 md:px-12 py-16 text-center" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          safety
        </p>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>
          we take this seriously.
        </h1>
        <p className="font-body text-sm max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
          going out with strangers takes trust. here's how we earn it.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ITEMS.map((item) => (
              <div key={item.title} className="p-6 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <item.icon size={20} style={{ color: "var(--primary)" }} className="mb-4" />
                <h3 className="font-display font-black text-white text-base mb-2">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-center mt-10" style={{ color: "var(--muted-foreground)" }}>
            before you meet up: pick a public spot the first time, tell a friend your plans, and trust your gut.
          </p>
          <a
            href="mailto:support@youshouldrally.com"
            className="font-body text-sm font-semibold underline block text-center mt-2"
            style={{ color: "var(--foreground)" }}
          >
            something feel off? tell us.
          </a>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-display font-black text-white mb-8" style={{ fontSize: "clamp(1.8rem,4.5vw,2.6rem)" }}>
            ready to <span style={{ color: "var(--primary)" }}>rally</span> — safely?
          </h2>
          <Link
            to="/apply"
            className="font-body px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            apply to rally
          </Link>
        </div>
      </section>
    </div>
  );
}

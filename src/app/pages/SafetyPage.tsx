import { Link } from "react-router";
import { Mascot } from "../components/Mascot";

const VETTING = [
  { n: "1", title: "no bots, no open signup", body: "a real person reviews every application before anyone's added to a group — name, age, instagram, and trip details all get checked." },
  { n: "2", title: "18 and up only", body: "rally is restricted to applicants 18 or older. age is checked at application, and reviewed again during manual approval." },
  { n: "3", title: "introduced, not matched", body: "you're grouped with people actually headed to the same event on the same dates — never randomly, never by an algorithm score." },
];

const TIPS = [
  { n: "1", title: "meet in public first", body: "for your first time meeting your crew in person, pick a public spot — a meetup point at the venue, a restaurant, anywhere with people around." },
  { n: "2", title: "tell a friend your plans", body: "share who you're meeting and where with someone you trust, the same way you would for any trip with new people." },
  { n: "3", title: "trust your gut", body: "if something feels off before or during your trip, you don't owe anyone an explanation for stepping back. your comfort comes first." },
];

function CardGrid({ items }: { items: typeof VETTING }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.n} className="p-6 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm mb-4"
            style={{ background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)" }}
          >
            {item.n}
          </div>
          <h4 className="font-display font-black text-white text-base mb-2">{item.title}</h4>
          <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SafetyPage() {
  return (
    <div style={{ paddingTop: "88px" }}>
      <section className="px-6 md:px-12 py-16 text-center" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          safety
        </p>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>
          your safety comes before your crew.
        </h1>
        <p className="font-body text-sm max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
          rally is built on real vetting, not an open signup. here's exactly how that works, and how to stay safe once you're introduced to your crew.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--primary)" }}>
            how we vet
          </p>
          <h2 className="font-display font-black text-white mb-10" style={{ fontSize: "clamp(1.6rem,3.6vw,2.2rem)" }}>
            every application gets a real review
          </h2>
          <CardGrid items={VETTING} />
        </div>
      </section>

      <section className="pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--primary)" }}>
            before you meet up
          </p>
          <h2 className="font-display font-black text-white mb-10" style={{ fontSize: "clamp(1.6rem,3.6vw,2.2rem)" }}>
            a few basics worth keeping in mind
          </h2>
          <CardGrid items={TIPS} />
        </div>
      </section>

      <section className="pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center p-10 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 className="font-display font-black text-white text-2xl mb-3">see something, say something</h3>
          <p className="font-body text-sm max-w-md mx-auto mb-6" style={{ color: "var(--muted-foreground)" }}>
            if someone in your rally crew makes you uncomfortable, misrepresents themselves, or breaks your trust, tell us. we take every report seriously and can remove people from future matching.
          </p>
          <a
            href="mailto:support@youshouldrally.com"
            className="font-body inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            email support@youshouldrally.com
          </a>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <Mascot size={40} color="color-mix(in srgb, var(--foreground) 30%, transparent)" className="mb-4" />
          <h2 className="font-display font-black text-white mb-8" style={{ fontSize: "clamp(1.8rem,4.5vw,2.6rem)" }}>
            ready to <span style={{ color: "var(--primary)" }}>rally</span> — safely?
          </h2>
          <Link
            to="/#apply"
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

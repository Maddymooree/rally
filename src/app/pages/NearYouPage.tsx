import { useState } from "react";
import { Link } from "react-router";
import { CrowdScene } from "../components/CrowdScene";
import { CITIES, getEventsForCity } from "../lib/events";

function EventCard({ event }: { event: ReturnType<typeof getEventsForCity>[number] }) {
  const params = new URLSearchParams({
    festival: "other",
    event: `${event.artist} @ ${event.venue}`,
    dates: event.dateLabel,
  });
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col anim-slide-up"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div
        className="relative"
        style={{
          height: "140px",
          background: event.imageUrl
            ? `center / cover no-repeat url(${event.imageUrl})`
            : "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, var(--background)), var(--background))",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--card) 0%, transparent 60%)" }} />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {event.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="font-body text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: "color-mix(in srgb, var(--background) 55%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
            >
              {g}
            </span>
          ))}
        </div>
        {event.featured && (
          <span
            className="absolute top-3 right-3 font-body text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            featured
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-black text-xl text-white mb-1 lowercase">{event.artist}</h3>
        <p className="font-body text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
          {event.venue} · {event.dateLabel}
        </p>
        <Link
          to={`/?${params.toString()}#apply`}
          className="mt-auto font-body text-sm font-bold text-center py-2.5 rounded-lg transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          find your crew →
        </Link>
      </div>
    </div>
  );
}

function DiscoveryView() {
  const [city, setCity] = useState<string | null>(null);
  const events = city ? getEventsForCity(city) : [];

  return (
    <div className="anim-slide-up" style={{ paddingTop: "88px" }}>
      <section className="px-6 md:px-12 py-16 text-center" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          near you
        </p>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>
          your city has a scene.
        </h1>
        <p className="font-body text-sm max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
          edm, house, techno — pick your city and see who's headed to the same sets you are.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2.5 mb-14">
            {CITIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCity(c.slug)}
                className="font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                style={
                  city === c.slug
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }
                }
              >
                {c.name}
              </button>
            ))}
          </div>

          {!city && (
            <p className="font-body text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
              pick a city above to see what's coming up.
            </p>
          )}

          {city && events.length === 0 && (
            <p className="font-body text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
              nothing confirmed in {CITIES.find((c) => c.slug === city)?.name} yet — check back soon.
            </p>
          )}

          {city && events.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function NearYouPage() {
  const [entered, setEntered] = useState(false);
  const [scattering, setScattering] = useState(false);

  const enter = () => {
    if (scattering) return;
    setScattering(true);
    setTimeout(() => setEntered(true), 650);
  };

  if (entered) return <DiscoveryView />;

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center px-6" style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 45% at 50% 40%, color-mix(in srgb, var(--background) 20%, transparent), var(--background) 88%)" }}
      />
      <CrowdScene scattered={scattering} />
      <div className="relative flex flex-col items-center" style={{ zIndex: 10, opacity: scattering ? 0 : 1, transition: "opacity 0.4s ease 0.15s" }}>
        <p className="font-body text-[11px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "var(--primary)" }}>
          near you
        </p>
        <h1
          className="font-display font-black text-center text-white mb-4 lowercase"
          style={{ fontSize: "clamp(2.6rem,8vw,5.5rem)", letterSpacing: "-0.02em", lineHeight: 1.02 }}
        >
          you should rally
        </h1>
        <p className="font-body text-center mb-10 max-w-sm italic" style={{ color: "color-mix(in srgb, var(--foreground) 55%, transparent)" }}>
          your city has a scene. we'll show you who's in it.
        </p>
        <button
          onClick={enter}
          className="font-body px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          find events near you
        </button>
      </div>
    </section>
  );
}

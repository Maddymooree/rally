import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CITIES, getUpcomingEvents, isMultiNightEvent, type RallyEvent } from "../lib/events";

// The set is rendered 3x back to back and the scroll position starts in the
// middle copy, so there's always more track to scroll into in either
// direction. A scroll listener silently (no animation) re-centers back into
// the middle copy once the user drifts into a neighboring copy — that jump
// is imperceptible since it's an exact duplicate of what's already there,
// which is what makes the loop read as continuous instead of dead-ending.
const LOOP_COPIES = 3;

function UpNextCard({ event }: { event: RallyEvent }) {
  const cityName = CITIES.find((c) => c.slug === event.city)?.name ?? event.city;
  const multiNight = isMultiNightEvent(event);
  const ctaLabel = multiNight ? "apply now →" : "find your crew →";
  const badgeLabel = multiNight ? "● applications open" : "● find your crew";
  const params = new URLSearchParams({
    festival: "other",
    event: `${event.artist} @ ${event.venue}`,
    dates: event.dateLabel,
  });

  return (
    <div
      className="up-next-card shrink-0 p-7 rounded-2xl"
      style={{
        width: "310px",
        scrollSnapAlign: "start",
        background: "color-mix(in srgb, var(--primary) 6%, transparent)",
        border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <svg width={30} height={30 * 0.87} viewBox="0 0 30 26" fill="none" stroke="var(--primary)" strokeWidth="1.8">
          <path d="M4 22 L15 4 L26 22 Z" />
        </svg>
        <span
          className="font-body text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{ background: "color-mix(in srgb, var(--primary) 16%, transparent)", color: "var(--primary)" }}
        >
          {badgeLabel}
        </span>
      </div>
      <h3
        className="font-display font-black text-xl text-white mb-1 text-left lowercase"
        title={event.artist}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "3.5rem",
        }}
      >
        {event.artist}
      </h3>
      <p className="font-body text-sm text-left mb-6" style={{ color: "var(--muted-foreground)" }}>
        {event.dateLabel} · {event.venue}, {cityName}
      </p>
      <Link
        to={`/apply?${params.toString()}`}
        className="font-body block w-full py-3 rounded-lg text-sm font-bold text-center transition-all hover:opacity-90"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export function FeaturedFestival() {
  const events = getUpcomingEvents(10);
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loop = events.length > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loop) return;
    track.scrollLeft = track.scrollWidth / LOOP_COPIES;
  }, [loop, events.length]);

  if (events.length === 0) return null;

  const recenter = () => {
    const track = trackRef.current;
    if (!track) return;
    const oneSetWidth = track.scrollWidth / LOOP_COPIES;
    if (track.scrollLeft < oneSetWidth * 0.5) {
      track.scrollLeft += oneSetWidth;
    } else if (track.scrollLeft > oneSetWidth * 1.5) {
      track.scrollLeft -= oneSetWidth;
    }
  };

  const handleScroll = () => {
    if (!loop) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(recenter, 120);
  };

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 330, behavior: "smooth" });
  };

  const renderedCards = loop
    ? Array.from({ length: LOOP_COPIES }).flatMap((_, copyIndex) =>
        events.map((event) => <UpNextCard key={`${event.id}-${copyIndex}`} event={event} />)
      )
    : events.map((event) => <UpNextCard key={event.id} event={event} />);

  return (
    <section className="py-24" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="text-center px-6 md:px-12">
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          happening soon
        </p>
        <h2 className="font-display font-black text-white mb-10" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
          find your crew.
        </h2>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="up-next-track flex gap-5 overflow-x-auto pb-2 px-6 md:px-12"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {renderedCards}
      </div>

      <div className="text-center px-6 md:px-12">
        {loop && (
          <div className="hidden sm:flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scroll(-1)}
              aria-label="previous"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="next"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <Link to="/near-you" className="font-body inline-block mt-8 text-sm font-semibold" style={{ color: "color-mix(in srgb, var(--foreground) 55%, transparent)" }}>
          browse all shows →
        </Link>
      </div>
    </section>
  );
}

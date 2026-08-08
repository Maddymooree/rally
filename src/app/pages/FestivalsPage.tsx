import { useMemo, useState } from "react";
import { Link } from "react-router";
import { FESTIVALS } from "../lib/festivals";

export function FestivalsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FESTIVALS;
    return FESTIVALS.filter((f) => f.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={{ paddingTop: "88px" }}>
      <section className="px-6 md:px-12 py-16 text-center" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
          all festivals
        </p>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>
          find your crew.
        </h1>
        <p className="font-body text-sm max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
          search or browse every festival and trip we're currently matching people for.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="search festivals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rally-field block w-full max-w-sm mx-auto mb-12"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
              borderRadius: "999px",
              padding: "13px 20px",
              fontSize: "14px",
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((fest) => (
              <div
                key={fest.slug}
                className={`p-6 rounded-xl transition-all duration-200 hover:scale-[1.02] ${fest.status === "open" ? "anim-glow" : ""}`}
                style={{
                  background: fest.status === "open" ? "color-mix(in srgb, var(--primary) 6%, transparent)" : "var(--card)",
                  border: `1px solid ${fest.status === "open" ? "color-mix(in srgb, var(--primary) 30%, transparent)" : "var(--border)"}`,
                }}
              >
                <div className="mb-4">{fest.icon({ size: 28 })}</div>
                {fest.status === "open" && (
                  <span
                    className="inline-block font-body text-[11px] font-bold px-2 py-0.5 rounded-full mb-2"
                    style={{ background: "color-mix(in srgb, var(--primary) 16%, transparent)", color: "var(--primary)" }}
                  >
                    ● applications open
                  </span>
                )}
                <h3 className="font-display font-black text-white mb-1" style={{ fontSize: "1.3rem" }}>
                  {fest.name}
                  {fest.sub && (
                    <span className="font-body text-sm font-normal ml-1.5" style={{ color: "var(--muted-foreground)" }}>
                      {fest.sub}
                    </span>
                  )}
                </h3>
                <p className="font-body text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>
                  {fest.dates} · {fest.city}
                </p>
                <Link
                  to={`/?festival=${encodeURIComponent(fest.slug)}#apply`}
                  className="font-body text-sm font-semibold inline-flex items-center gap-1.5"
                  style={{ color: "var(--foreground)", borderBottom: "1px solid color-mix(in srgb, var(--foreground) 30%, transparent)", paddingBottom: "2px" }}
                >
                  {fest.status === "open" ? "apply now →" : "coming soon"}
                </Link>
              </div>
            ))}

            <div
              className="p-6 rounded-xl flex flex-col justify-between sm:col-span-2 lg:col-span-1"
              style={{ background: "var(--card)", border: "1px dashed var(--border)" }}
            >
              <div>
                <h3 className="font-display font-black text-white mb-1" style={{ fontSize: "1.3rem" }}>
                  can't find it?
                </h3>
                <p className="font-body text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>
                  tell us where you're headed
                </p>
              </div>
              <Link
                to="/?festival=other#apply"
                className="font-body text-sm font-semibold inline-flex items-center gap-1.5"
                style={{ color: "var(--foreground)", borderBottom: "1px solid color-mix(in srgb, var(--foreground) 30%, transparent)", paddingBottom: "2px" }}
              >
                let us know →
              </Link>
            </div>
          </div>

          {filtered.length === 0 && (
            <p className="font-body text-sm text-center py-10" style={{ color: "var(--muted-foreground)" }}>
              no festivals match that search — but you can still apply and tell us where you're headed.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

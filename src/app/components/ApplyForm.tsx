import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Mascot } from "./Mascot";
import { FESTIVALS } from "../lib/festivals";
import { submitApplication } from "../lib/submit";

type Status = { kind: "idle" | "submitting" | "success" | "error"; message: string };

export function ApplyForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    instagram: "",
    email: "",
    festival: "",
    festivalOther: "",
    dates: "",
    from: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [ageError, setAgeError] = useState("");
  // true when we arrived with a specific event/festival already picked
  // (from a card elsewhere on the site) — collapses the dropdown + "other"
  // input into a single pre-filled, editable field.
  const [presetDestination, setPresetDestination] = useState(false);

  useEffect(() => {
    const param = searchParams.get("festival");
    const eventParam = searchParams.get("event");
    const datesParam = searchParams.get("dates");
    if (!param && !eventParam) return;

    let preset = false;
    setForm((f) => {
      const next = { ...f };
      if (eventParam) {
        next.festival = "other";
        next.festivalOther = eventParam;
        preset = true;
      } else if (param) {
        const match = FESTIVALS.find((fest) => fest.slug.toLowerCase() === param.toLowerCase());
        if (match) {
          next.festival = match.slug;
        } else {
          next.festival = "other";
          next.festivalOther = param;
          preset = true;
        }
      }
      if (datesParam) next.dates = datesParam;
      return next;
    });
    if (preset) setPresetDestination(true);
  }, [searchParams]);

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const isOther = form.festival === "other";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ageValue = parseInt(form.age, 10);
    if (isNaN(ageValue) || ageValue < 18) {
      setAgeError("you must be 18 or older to apply to rally.");
      return;
    }
    setAgeError("");

    setStatus({ kind: "submitting", message: "submitting..." });

    submitApplication({
      name: form.name,
      email: form.email,
      instagram: form.instagram,
      age: form.age,
      gender: form.gender,
      festival: isOther ? form.festivalOther : form.festival,
      festivalOther: form.festivalOther,
      dates: form.dates,
      from: form.from,
    })
      .then(() => {
        setStatus({
          kind: "success",
          message: "you're in the queue. follow @youshouldrally and DM us — that's how you get added to your crew's chat.",
        });
        setForm({ name: "", age: "", gender: "", instagram: "", email: "", festival: "", festivalOther: "", dates: "", from: "" });
      })
      .catch(() => {
        setStatus({ kind: "error", message: "something went wrong — mind trying again in a minute?" });
      });
  };

  return (
    <section id="apply" className="pt-10 pb-24 px-6 md:px-12 scroll-mt-[72px]" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-lg mx-auto">
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4 text-center" style={{ color: "var(--primary)" }}>
          apply now
        </p>
        <h2 className="font-display font-black text-white mb-3 text-center" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>
          ready to rally?
        </h2>
        <p className="font-body text-base font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          we keep it curated so every crew is the real deal.
        </p>
        <p className="font-body text-sm text-center mb-10" style={{ color: "var(--muted-foreground)" }}>
          applications are reviewed before you're placed in a crew. real people, real plans — everyone in your crew applied to be there too.
        </p>

        {status.kind === "success" ? (
          <div className="text-center py-14">
            <div className="relative inline-block mb-5">
              <Mascot size={58} color="color-mix(in srgb, var(--foreground) 85%, transparent)" />
              <span className="absolute -top-2 -right-2 text-xl" style={{ color: "var(--primary)" }}>
                ✦
              </span>
            </div>
            <h3 className="font-display font-black text-white text-2xl mb-2">you're on the list.</h3>
            <p className="font-body text-sm max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
              {status.message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 rally-field">
            <div className="grid sm:grid-cols-2 gap-3.5">
              <input required placeholder="your name" {...field("name")} />
              <div>
                <input
                  required
                  type="number"
                  min={18}
                  max={120}
                  placeholder="age (18+)"
                  value={form.age}
                  onChange={(e) => {
                    setAgeError("");
                    e.target.setCustomValidity("");
                    setForm((f) => ({ ...f, age: e.target.value }));
                  }}
                  onInvalid={(e) => {
                    const input = e.currentTarget;
                    input.setCustomValidity(input.validity.rangeUnderflow ? "you must be 18 or older to apply to rally." : "");
                  }}
                />
              </div>
            </div>
            {ageError && (
              <p className="font-body text-xs" style={{ color: "color-mix(in srgb, var(--destructive) 70%, transparent)" }}>
                {ageError}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <select required {...field("gender")} style={{ color: form.gender ? "var(--foreground)" : "var(--muted-foreground)" }}>
                <option value="" disabled>
                  gender
                </option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="prefer not to say">prefer not to say</option>
              </select>
              <input required placeholder="instagram handle" {...field("instagram")} />
            </div>
            <input required type="email" placeholder="email" {...field("email")} />
            {presetDestination ? (
              <input required placeholder="where are you headed" {...field("festivalOther")} />
            ) : (
              <>
                <select required {...field("festival")} style={{ color: form.festival ? "var(--foreground)" : "var(--muted-foreground)" }}>
                  <option value="" disabled>
                    which festival?
                  </option>
                  {FESTIVALS.map((f) => (
                    <option key={f.slug} value={f.slug}>
                      {f.name}
                      {f.sub ? ` — ${f.sub}` : ""}
                    </option>
                  ))}
                  <option value="other">don't see it? let us know →</option>
                </select>
                {isOther && (
                  <input required placeholder="tell us where you're headed" {...field("festivalOther")} />
                )}
              </>
            )}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <input required placeholder="your dates (e.g. july 22–26)" {...field("dates")} />
              <input placeholder="traveling from (city, state)" {...field("from")} />
            </div>
            <button
              type="submit"
              disabled={status.kind === "submitting"}
              className="font-body w-full py-4 font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] rounded-[var(--radius)] disabled:opacity-60"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {status.kind === "submitting" ? "submitting..." : "find my crew →"}
            </button>
            {status.kind === "error" && (
              <p className="font-body text-xs text-center" style={{ color: "color-mix(in srgb, var(--destructive) 70%, transparent)" }}>
                {status.message}
              </p>
            )}
            <p className="font-body text-xs text-center pt-1" style={{ color: "color-mix(in srgb,var(--foreground) 22%,transparent)" }}>
              crews are curated. applications are reviewed.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

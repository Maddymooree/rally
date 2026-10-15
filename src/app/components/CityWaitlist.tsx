import { useState } from "react";
import { Mascot } from "./Mascot";
import { submitWaitlist } from "../lib/waitlist";

type Status = { kind: "idle" | "submitting" | "success" | "error"; message: string };

// The branded "coming soon" experience for a not-yet-active city: leads
// with exciting copy, then progressively discloses a short waitlist form
// on "join the waitlist ->" rather than showing an empty event grid or a
// bare sign-up box.
export function CityWaitlist({ cityName }: { cityName: string }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName: "", email: "", instagram: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "submitting", message: "joining..." });

    submitWaitlist({ firstName: form.firstName, email: form.email, instagram: form.instagram, city: cityName })
      .then(() => {
        setStatus({ kind: "success", message: "you're on the list 💙 we'll let you know when it's time to rally." });
        setForm({ firstName: "", email: "", instagram: "" });
      })
      .catch(() => {
        setStatus({ kind: "error", message: "something went wrong — mind trying again in a minute?" });
      });
  };

  if (status.kind === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-10 anim-slide-up">
        <div className="relative inline-block mb-5">
          <Mascot size={52} color="color-mix(in srgb, var(--foreground) 85%, transparent)" />
          <span className="absolute -top-2 -right-2 text-xl" style={{ color: "var(--primary)" }}>
            ✦
          </span>
        </div>
        <h3 className="font-display font-black text-white text-2xl mb-2">you're on the list.</h3>
        <p className="font-body text-sm max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
          {status.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center py-6 anim-slide-up">
      <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>
        coming soon
      </p>
      <h3 className="font-display font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem,4.5vw,2.4rem)" }}>
        rally is coming to {cityName}.
      </h3>
      <p className="font-body text-sm mb-1" style={{ color: "var(--muted-foreground)" }}>
        your city has a scene. we're bringing the people together.
      </p>
      <p className="font-body text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
        be first to know when crews start forming near you.
      </p>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="font-body px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          join the waitlist →
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 rally-field text-left anim-slide-up">
          <input required placeholder="first name" {...field("firstName")} />
          <input required type="email" placeholder="email" {...field("email")} />
          <input placeholder="instagram handle (optional)" {...field("instagram")} />
          <button
            type="submit"
            disabled={status.kind === "submitting"}
            className="font-body w-full py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            {status.kind === "submitting" ? "joining..." : "join the waitlist →"}
          </button>
          {status.kind === "error" && (
            <p className="font-body text-xs text-center" style={{ color: "color-mix(in srgb, var(--destructive) 70%, transparent)" }}>
              {status.message}
            </p>
          )}
          <p className="font-body text-xs text-center pt-1" style={{ color: "color-mix(in srgb,var(--foreground) 22%,transparent)" }}>
            we'll only use your email to tell you when rally launches in {cityName}. no spam, unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}

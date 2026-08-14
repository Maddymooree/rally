import { useEffect, useRef, useState } from "react";

type DemoScreen = "search" | "forming" | "chat";

const CREW_AVATARS = [
  { initials: "JK", bg: "var(--chart-1)", name: "jaylen" },
  { initials: "MP", bg: "var(--chart-2)", name: "maya" },
  { initials: "SA", bg: "var(--chart-3)", name: "sam" },
  { initials: "TR", bg: "var(--chart-4)", name: "tai" },
  { initials: "EL", bg: "var(--chart-5)", name: "elena" },
];

const CHAT_MESSAGES = [
  { from: "JK", text: "who driving to austin?", self: false },
  { from: "MP", text: "me!! room for 2 more", self: false },
  { from: "SA", text: "wait this crew is actually sick", self: false },
  { from: "EL", text: "lol rally always delivers", self: false },
  { from: "you", text: "ok i'm in. plan for day 1?", self: true },
];

function SearchScreen() {
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setTapped(true), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col h-full px-4 pt-2 pb-4">
      <p className="font-display font-black text-sm tracking-wide mb-3" style={{ color: "var(--primary)" }}>rally</p>
      <p className="font-display font-black text-xl mb-3" style={{ color: "var(--foreground)" }}>where are you going?</p>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
        <span style={{ color: "color-mix(in srgb,var(--foreground) 28%,transparent)", fontSize: "12px" }}>⌕</span>
        <span className="font-body text-sm" style={{ color: "color-mix(in srgb,var(--foreground) 38%,transparent)" }}>austin city limits</span>
        <span className="ml-auto w-px h-3.5 animate-pulse" style={{ background: "var(--primary)" }} />
      </div>
      <div className="p-3.5 rounded-xl" style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display font-black text-sm" style={{ color: "var(--foreground)" }}>austin city limits</span>
          <span className="font-body text-[11px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 18%, transparent)", color: "var(--primary)" }}>open</span>
        </div>
        <p className="font-body text-xs" style={{ color: "var(--muted-foreground)" }}>oct 2–4 & 9–11 · austin, tx</p>
        <div className="relative mt-3">
          <button
            className="font-body w-full py-1.5 rounded-lg text-xs font-bold relative"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              transform: tapped ? "scale(0.93)" : "scale(1)",
              filter: tapped ? "brightness(1.12)" : "none",
              transition: "transform 0.16s ease, filter 0.16s ease",
            }}
          >
            join →
          </button>
          {tapped && (
            <span
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ border: "1.5px solid var(--primary)", animation: "tap-ripple 0.55s ease-out" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FormingScreen({ runKey }: { runKey: number }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => { setCount(0); setDone(false); }, [runKey]);
  useEffect(() => {
    if (count >= CREW_AVATARS.length) { const t = setTimeout(() => setDone(true), 300); return () => clearTimeout(t); }
    const t = setTimeout(() => setCount((c) => c + 1), 420);
    return () => clearTimeout(t);
  }, [count, runKey]);
  return (
    <div className="flex flex-col h-full px-4 pt-2 pb-4">
      <p className="font-display font-black text-sm mb-1.5" style={{ color: "var(--primary)" }}>rally</p>
      <p className="font-display font-black text-xl mb-0.5" style={{ color: "var(--foreground)" }}>finding your crew...</p>
      <p className="font-body text-[11px] mb-5" style={{ color: "var(--muted-foreground)" }}>matching on vibe · exp · logistics</p>
      <div className="flex gap-2 mb-5 justify-between">
        {CREW_AVATARS.map((a, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            {i < count ? (
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white anim-pop-in font-body" style={{ background: a.bg, boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--primary) 40%, transparent)" }}>
                {a.initials}
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full border border-dashed" style={{ borderColor: "var(--border)" }} />
            )}
            <span className="font-body text-[9px]" style={{ color: "var(--muted-foreground)" }}>{i < count ? a.name.slice(0, 3) : "—"}</span>
          </div>
        ))}
      </div>
      {done && (
        <div className="px-3 py-2.5 rounded-xl text-center anim-slide-up" style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 28%, transparent)" }}>
          <p className="font-display font-black text-base" style={{ color: "var(--foreground)" }}>✦ crew matched</p>
          <p className="font-body text-[11px] mt-0.5" style={{ color: "var(--primary)" }}>group chat unlocked</p>
        </div>
      )}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl anim-slide-up" style={{ background: "var(--secondary)" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--muted-foreground)",
              animation: "typing-bounce 1.1s infinite ease-in-out",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatScreen({ runKey }: { runKey: number }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
  }, [runKey]);

  useEffect(() => {
    if (visibleCount >= CHAT_MESSAGES.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(CHAT_MESSAGES.length);
      return;
    }
    const msg = CHAT_MESSAGES[visibleCount];
    if (!msg.self) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisibleCount((c) => c + 1);
      }, 750);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 550);
    return () => clearTimeout(t);
  }, [visibleCount, runKey]);

  return (
    <div className="flex flex-col h-full px-4 pt-2 pb-4">
      <div className="flex items-center gap-2 mb-3 pb-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex -space-x-1.5">
          {CREW_AVATARS.slice(0, 3).map((a, i) => (
            <div key={i} className="w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-bold text-white font-body" style={{ background: a.bg, borderColor: "var(--background)" }}>{a.initials[0]}</div>
          ))}
        </div>
        <p className="font-display font-black text-[11px]" style={{ color: "var(--foreground)" }}>acl crew</p>
        <span className="ml-auto font-body text-[10px] font-semibold" style={{ color: "var(--primary)" }}>5 ppl</span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className={`flex anim-slide-up ${msg.self ? "justify-end" : "justify-start"}`}>
            <div className="px-2.5 py-1.5 rounded-xl font-body text-[11px] max-w-[78%] leading-snug" style={{ background: msg.self ? "var(--primary)" : "var(--secondary)", color: msg.self ? "var(--primary-foreground)" : "color-mix(in srgb,var(--foreground) 80%,transparent)" }}>
              {!msg.self && <p className="font-bold text-[9px] mb-0.5" style={{ color: "var(--primary)" }}>{msg.from}</p>}
              {msg.text}
            </div>
          </div>
        ))}
        {typing && <TypingBubble />}
      </div>
    </div>
  );
}

export function PhoneDemo() {
  const [screen, setScreen] = useState<DemoScreen>("search");
  const [fKey, setFKey] = useState(0);
  const [cKey, setCKey] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const order: DemoScreen[] = ["search", "forming", "chat"];
  const idx = order.indexOf(screen);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const delay = screen === "forming" ? 4200 : screen === "chat" ? 6200 : 3000;
    const t = setTimeout(() => {
      const next = order[(idx + 1) % order.length];
      if (next === "forming") setFKey((k) => k + 1);
      if (next === "chat") setCKey((k) => k + 1);
      setScreen(next);
    }, delay);
    return () => clearTimeout(t);
  }, [screen, inView]);

  const steps: Record<DemoScreen, { num: string; label: string; body: string }> = {
    search: { num: "01", label: "pick your festival", body: "you pick where you're going. we take it from there." },
    forming: { num: "02", label: "crew forms in real time", body: "grouped by vibe, experience, and logistics." },
    chat: { num: "03", label: "you're in", body: "group intro, real names, real plans. show up like you know them." },
  };

  return (
    <section ref={sectionRef} className="pt-12 pb-24 px-6 md:px-12" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--primary)" }}>see it in action</p>
        <h2 className="font-display font-black text-white mb-16" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>three steps. one crew.</h2>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="shrink-0">
            <div className="w-[228px] h-[460px] rounded-[40px] p-1.5" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
              <div className="w-full h-full rounded-[35px] overflow-hidden flex flex-col" style={{ background: "var(--background)" }}>
                <div className="flex items-center justify-between px-5 pt-7 pb-1.5 shrink-0">
                  <span className="font-body text-[10px] font-bold" style={{ color: "var(--foreground)" }}>9:41</span>
                  <div className="w-16 h-4 rounded-full" style={{ background: "var(--card)" }} />
                  <span className="font-body text-[10px]" style={{ color: "var(--muted-foreground)" }}>●●●</span>
                </div>
                <div className="flex-1 min-h-0">
                  {screen === "search" && inView && <SearchScreen />}
                  {screen === "forming" && <FormingScreen runKey={fKey} />}
                  {screen === "chat" && <ChatScreen runKey={cKey} />}
                </div>
                <div className="flex justify-center pb-3 pt-2 gap-1.5 shrink-0">
                  {order.map((s) => (
                    <button key={s} onClick={() => { if (s === "forming") setFKey((k) => k + 1); if (s === "chat") setCKey((k) => k + 1); setScreen(s); }} className="rounded-full transition-all duration-200" style={{ width: screen === s ? "18px" : "6px", height: "6px", background: screen === s ? "var(--primary)" : "color-mix(in srgb,var(--foreground) 18%,transparent)" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full space-y-3">
            {order.map((s) => (
              <button key={s} onClick={() => { if (s === "forming") setFKey((k) => k + 1); if (s === "chat") setCKey((k) => k + 1); setScreen(s); }} className="w-full text-left p-5 rounded-xl transition-all duration-200" style={{ background: screen === s ? "color-mix(in srgb, var(--primary) 7%, transparent)" : "var(--card)", border: `1px solid ${screen === s ? "color-mix(in srgb, var(--primary) 28%, transparent)" : "var(--border)"}` }}>
                <p className="font-body text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5" style={{ color: screen === s ? "var(--primary)" : "color-mix(in srgb,var(--foreground) 22%,transparent)" }}>
                  {steps[s].num} · {steps[s].label}
                </p>
                <p className="font-display font-black text-base" style={{ color: screen === s ? "var(--foreground)" : "color-mix(in srgb,var(--foreground) 28%,transparent)" }}>
                  {steps[s].body}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

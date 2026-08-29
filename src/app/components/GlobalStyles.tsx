export function GlobalStyles() {
  return (
    <style>{`
      :root {
        --font-display:   'Outfit', sans-serif;
        --font-body:      'DM Sans', sans-serif;
      }

      * { scrollbar-width: none; box-sizing: border-box; }
      *::-webkit-scrollbar { display: none; }
      input:focus, select:focus { outline: none; }
      html { scroll-behavior: smooth; }

      /* ── animations ── */
      @keyframes ticker {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes pop-in {
        0%   { transform: scale(0) rotate(-12deg); opacity: 0; }
        72%  { transform: scale(1.18) rotate(2deg);  opacity: 1; }
        100% { transform: scale(1) rotate(0deg);     opacity: 1; }
      }
      @keyframes slide-up {
        from { transform: translateY(14px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes sparkle-dot {
        0%   { transform: scale(0);   opacity: 1; }
        55%  { transform: scale(1.6); opacity: 1; }
        100% { transform: scale(0);   opacity: 0; }
      }
      @keyframes mascot-bounce {
        0%   { transform: scale(1) rotate(0deg); }
        25%  { transform: scale(1.22) rotate(-6deg); }
        55%  { transform: scale(0.92) rotate(4deg); }
        80%  { transform: scale(1.06) rotate(-2deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      @keyframes mascot-spin {
        0%   { transform: rotate(0deg) scale(1); }
        40%  { transform: rotate(200deg) scale(1.15); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes bubble-in {
        from { transform: scale(0) translateY(4px); opacity: 0; }
        to   { transform: scale(1) translateY(0);   opacity: 1; }
      }
      @keyframes glow-pulse {
        0%,100% { box-shadow: 0 0 18px color-mix(in srgb, var(--primary) 28%, transparent); }
        50%      { box-shadow: 0 0 36px color-mix(in srgb, var(--primary) 55%, transparent); }
      }
      @keyframes float-frame {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-4px); }
      }
      @keyframes typing-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-3px); opacity: 1; }
      }
      @keyframes tap-ripple {
        0%   { transform: scale(1);    opacity: 0.9; }
        100% { transform: scale(1.15); opacity: 0; }
      }

      .ticker-track  { animation: ticker 32s linear infinite; display:flex; }
      .anim-pop-in   { animation: pop-in   .42s cubic-bezier(.34,1.56,.64,1) both; }
      .anim-slide-up { animation: slide-up .5s ease-out both; }
      .anim-sparkle  { animation: sparkle-dot .65s ease-out both; }
      .anim-bounce   { animation: mascot-bounce .5s cubic-bezier(.34,1.56,.64,1) both; }
      .anim-spin     { animation: mascot-spin .55s cubic-bezier(.34,1.56,.64,1) both; }
      .anim-bubble   { animation: bubble-in .2s cubic-bezier(.34,1.56,.64,1) both; }
      .anim-glow     { animation: glow-pulse 2.4s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .ticker-track, .anim-pop-in, .anim-slide-up, .anim-sparkle, .anim-bounce, .anim-spin, .anim-bubble, .anim-glow {
          animation: none !important;
        }
      }

      .font-display { font-family: var(--font-display); }
      .font-body    { font-family: var(--font-body); }

      /* ── collage frame base ── */
      .collage-frame {
        position: absolute;
        overflow: hidden;
        border-radius: var(--radius-md);
        box-shadow: 0 10px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3);
      }
      .frame-inner {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        filter: contrast(1.15) brightness(0.75) saturate(0.65) sepia(0.15) grayscale(0.1);
        position: relative;
      }
      .frame-inner::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 2;
      }
      .frame-inner::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,140,60,0.07) 0%, rgba(30,0,90,0.13) 100%);
        mix-blend-mode: soft-light;
      }

      /* ── frame positions: desktop ── */
      .f1 { top: 4%; left: -4%; width: clamp(165px,22vw,278px); height: clamp(225px,30vw,378px); transform: rotate(-5deg); z-index: 3; background: var(--secondary); }
      .f2 { top: 0.5%; left: 28%; width: clamp(170px,20vw,230px); height: clamp(90px,10.5vw,120px); transform: rotate(3.5deg); z-index: 2; background: var(--card); }
      .f3 { top: 4%; right: -3%; width: clamp(185px,20vw,252px); height: clamp(255px,28vw,348px); transform: rotate(5deg); z-index: 3; background: var(--secondary); }
      .f4 { bottom: -5%; left: 0%; width: clamp(225px,27vw,322px); height: clamp(150px,18vw,222px); transform: rotate(-4deg); z-index: 3; background: var(--card); }
      .f5 { bottom: -2%; right: 25%; width: clamp(190px,24vw,272px); height: clamp(132px,16vw,200px); transform: rotate(3.2deg); z-index: 2; background: var(--secondary); }
      .f6 { bottom: -7%; right: -3%; width: clamp(180px,20vw,248px); height: clamp(248px,28vw,338px); transform: rotate(-3.2deg); z-index: 3; background: var(--card); }

      @media (max-width: 767px) {
        .f2, .f5 { display: none; }
        .f1 { width:44vw; height:59vw; top:2%; left:-8%; }
        .f3 { width:40vw; height:55vw; top:2%; right:-6%; }
        .f4 { width:52vw; height:37vw; bottom:-1%; left:-5%; }
        .f6 { width:42vw; height:58vw; bottom:-4%; right:-6%; }
      }

      /* ── hero: short viewports (mobile landscape) ── */
      @media (max-height: 560px) {
        .hero-content { padding-top: 64px; }
        .hero-pill { margin-bottom: 8px !important; padding-top: 5px !important; padding-bottom: 5px !important; }
        .hero-heading { font-size: clamp(1.6rem, 5.5vw, 2.4rem) !important; line-height: 1.15 !important; margin-bottom: 8px !important; }
        .hero-subtext { display: none; }
        .hero-cta { padding-top: 10px !important; padding-bottom: 10px !important; font-size: 14px !important; }
      }

      /* ── near-you: crowd scene ── */
      .crowd-figure {
        position: absolute;
        transform-origin: bottom center;
        will-change: transform, opacity;
      }
      .crowd-dancing {
        animation: crowd-bounce var(--dance-duration, 1.8s) var(--dance-delay, 0s) ease-in-out infinite;
        transition: opacity 0.4s ease;
      }
      .crowd-scattered {
        animation: crowd-scatter 0.7s var(--scatter-delay, 0s) cubic-bezier(0.4, 0, 1, 1) forwards;
      }
      @keyframes crowd-bounce {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50%      { transform: translateY(-14%) rotate(-3deg); }
      }
      @keyframes crowd-scatter {
        0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(60px) translateX(var(--scatter-x, 0)) rotate(-12deg); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .crowd-dancing { animation: none; }
        .crowd-scattered { animation-duration: 0.01s; }
      }

      /* ── homepage: "happening soon" carousel ── */
      .up-next-track {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .up-next-track::-webkit-scrollbar { display: none; }

      /* ── nav mobile dropdown ── */
      .nav-menu-btn { display: none; }
      .nav-dropdown { display: none; }
      .nav-dropdown.open { display: flex; }
      @media (max-width: 720px) {
        .nav-links-desktop { display: none; }
        .nav-menu-btn { display: inline-flex; }
      }

      /* ── form fields ── */
      .rally-field input,
      .rally-field select {
        font-family: var(--font-body);
        background: var(--card);
        border: 1px solid var(--border);
        color: var(--foreground);
        border-radius: var(--radius);
        width: 100%;
        padding: 13px 16px;
        font-size: 14px;
        appearance: none;
      }
      .rally-field select { color-scheme: dark; }
      .rally-field input:focus,
      .rally-field select:focus {
        border-color: color-mix(in srgb, var(--primary) 55%, transparent);
      }
      .rally-field input::placeholder { color: var(--muted-foreground); }
    `}</style>
  );
}

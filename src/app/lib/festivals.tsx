export interface Festival {
  slug: string;
  name: string;
  sub?: string;
  dates: string;
  city: string;
  status: "open" | null;
  icon: (props: { size?: number }) => React.ReactNode;
}

const stroke = "var(--primary)";

export const FESTIVALS: Festival[] = [
  {
    slug: "austin city limits",
    name: "austin city limits",
    dates: "oct 2–4 & 9–11",
    city: "austin, tx",
    status: "open",
    icon: ({ size = 26 }) => (
      <svg width={size} height={size * 0.87} viewBox="0 0 30 26" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M4 22 L15 4 L26 22 Z" />
      </svg>
    ),
  },
  {
    slug: "coachella",
    name: "coachella",
    dates: "apr 9–11 & 16–18, 2027",
    city: "indio, ca",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke={stroke} strokeWidth="1.6">
        <circle cx="14" cy="14" r="4" />
        <path d="M14 2v6M14 20v6M2 14h6M20 14h6M5.5 5.5l4.2 4.2M18.3 18.3l4.2 4.2M22.5 5.5l-4.2 4.2M9.7 18.3l-4.2 4.2" />
      </svg>
    ),
  },
  {
    slug: "edc",
    name: "edc",
    dates: "may 14–16 & 21–23, 2027",
    city: "las vegas, nv",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size * 0.86} height={size} viewBox="0 0 24 28" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M13 1 L4 16 h6 l-3 11 12-17 h-6 Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "tomorrowland",
    name: "tomorrowland",
    sub: "weekend 1",
    dates: "jul 17–19, 2027",
    city: "boom, belgium",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size} height={size} viewBox="0 0 26 26" fill="none" stroke={stroke} strokeWidth="1.6">
        <path d="M18 4a9 9 0 1 0 6 15.9A11 11 0 0 1 18 4Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "ultra",
    name: "ultra",
    dates: "mar 26–28, 2027",
    city: "miami, fl",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size} height={size * 0.73} viewBox="0 0 30 22" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round">
        <path d="M2 14c2.5-4 5.5-4 8 0s5.5 4 8 0 5.5-4 8 0" />
        <path d="M2 20c2.5-4 5.5-4 8 0s5.5 4 8 0 5.5-4 8 0" opacity="0.5" />
      </svg>
    ),
  },
  {
    slug: "rolling loud",
    name: "rolling loud",
    dates: "july",
    city: "miami, fl",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size} height={size * 0.87} viewBox="0 0 30 26" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round">
        <line x1="5" y1="20" x2="5" y2="12" />
        <line x1="12" y1="24" x2="12" y2="4" />
        <line x1="19" y1="20" x2="19" y2="10" />
        <line x1="26" y1="22" x2="26" y2="8" />
      </svg>
    ),
  },
  {
    slug: "lollapalooza",
    name: "lollapalooza",
    dates: "august",
    city: "chicago, il",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M14 2 L17 10.5 L26 10.5 L18.8 16 L21.5 25 L14 19.5 L6.5 25 L9.2 16 L2 10.5 L11 10.5 Z" />
      </svg>
    ),
  },
  {
    slug: "burning man",
    name: "burning man",
    dates: "august",
    city: "black rock city, nv",
    status: null,
    icon: ({ size = 26 }) => (
      <svg width={size * 0.86} height={size} viewBox="0 0 24 28" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round">
        <path d="M12 2c3 4-2 6-1 10 3-1 4-4 4-4 2 3 3 6 3 9a8 8 0 0 1-16 0c0-3 1-5 3-7 0 2 1 3 2 3-1-4 1-7 5-11Z" />
      </svg>
    ),
  },
];

export const FEATURED_FESTIVAL = FESTIVALS[0];

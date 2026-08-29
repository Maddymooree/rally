export const Mascot: React.FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = "white",
}) => {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.44)}
      viewBox="0 0 52 75"
      fill="none"
      aria-hidden
    >
      <circle cx="26" cy="13" r="8" stroke={color} strokeWidth="2.5" />
      <line
        x1="26"
        y1="21"
        x2="26"
        y2="47"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 28 L39 17"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 28 L13 38"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 47 L35 65"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 47 L17 65"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M41 11 L42 8.5 L44.5 8.5 L42.5 10 L43.2 12.5 L41 11 L38.8 12.5 L39.5 10 L37.5 8.5 L40 8.5 Z"
        fill="#7b8fff"
      />
    </svg>
  );
};

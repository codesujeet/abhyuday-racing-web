// Small inline icons (stroke = currentColor).
type P = { size?: number; className?: string };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={`arrow ${className ?? ""}`}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
export const ArrowLeft = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M11 5l-7 7 7 7" />
  </svg>
);
export const ArrowUpRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Check = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12.5 9.5 18 20 6" />
  </svg>
);
export const Trophy = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
  </svg>
);
export const Play = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M7 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);
export const Download = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const Mail = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const Radar = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 12 19 5" />
  </svg>
);
export const Eye = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const Users = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3" />
  </svg>
);
export const Cpu = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="6" y="6" width="12" height="12" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>
);
export const Cube = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
    <path d="m3 7 9 5 9-5M12 12v10" />
  </svg>
);

// Social brand marks (filled), drawn on a 24px grid.
export const Social = ({ name, size = 20 }: { name: string; size?: number }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (name) {
    case "Instagram":
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...p} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9V9Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...p} fill="currentColor">
          <path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.5.1-1.5.1-2.3 1C1.2 5.6 1 7.2 1 7.2s-.2 1.8-.2 3.7v1.8c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.8c0-1.9-.2-3.7-.2-3.7ZM9.7 14.6V8.3l6.1 3.2-6.1 3.1Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...p} fill="currentColor">
          <path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.5 2 10.5 3.4 10.5 5.9V8H8v3h2.5v11H14V11h2.6l.4-3H14Z" />
        </svg>
      );
    default:
      return null;
  }
};

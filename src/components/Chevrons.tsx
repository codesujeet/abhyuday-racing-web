/** The chevron band from A10's wrap. `base` is the colour of the panel it grows out of. */
const stripes = [
  { fill: "#EE7234", points: "62,0 112,0 192,150 112,300 62,300 142,150" },
  { fill: "#2D5BB7", points: "112,0 156,0 236,150 156,300 112,300 192,150" },
  { fill: "#47A3DC", points: "156,0 192,0 272,150 192,300 156,300 236,150" },
  { fill: "#B88BE0", points: "192,0 218,0 298,150 218,300 192,300 272,150" },
];

export function Chevrons({ base = "#131A35", className = "chevrons", animate = true }: { base?: string; className?: string; animate?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,0 70,0 150,150 70,300 0,300" fill={base} />
      {stripes.map((s, i) => (
        <polygon
          key={s.fill}
          className={animate ? "chev" : undefined}
          style={animate ? ({ "--i": i } as React.CSSProperties) : undefined}
          points={s.points}
          fill={s.fill}
          stroke="#131A35"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** A thin strip of the livery colours, used under the header. */
export function LiveryTape() {
  return (
    <div className="livery-tape" aria-hidden="true">
      <span style={{ background: "#EE7234", flexGrow: 6 }} />
      <span style={{ background: "#2D5BB7", flexGrow: 3 }} />
      <span style={{ background: "#47A3DC", flexGrow: 2 }} />
      <span style={{ background: "#B88BE0", flexGrow: 1 }} />
      <span style={{ background: "#131A35", flexGrow: 8 }} />
    </div>
  );
}

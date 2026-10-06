import type { ReactNode } from "react";

/** Camera bounding-box corner brackets that close in on hover (the perception motif). */
export function BBox({ children, label, className = "", on = false }: { children: ReactNode; label?: string; className?: string; on?: boolean }) {
  return (
    <div className={`bbox ${on ? "bbox-on" : ""} ${className}`}>
      {children}
      <span className="bb bb-tl" aria-hidden="true" />
      <span className="bb bb-tr" aria-hidden="true" />
      <span className="bb bb-bl" aria-hidden="true" />
      <span className="bb bb-br" aria-hidden="true" />
      {label && (
        <span className="bb-label" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
}

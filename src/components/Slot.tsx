/** A dashed placeholder that tells the team exactly which picture belongs here. */
export function Slot({ title, hint, className = "slot" }: { title: string; hint?: string; className?: string }) {
  return (
    <div className={className} role="img" aria-label={`Photo to come: ${title}`}>
      <span>
        <strong>{title}</strong>
        {hint}
      </span>
    </div>
  );
}

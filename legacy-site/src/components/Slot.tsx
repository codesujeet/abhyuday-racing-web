import { ImagePlus, UserRound } from "lucide-react";

/** A dashed placeholder that tells the team exactly which picture belongs here. */
export function Slot({ title, hint, className = "slot", person = false }: { title: string; hint?: string; className?: string; person?: boolean }) {
  const Icon = person ? UserRound : ImagePlus;
  return (
    <div className={className} role="img" aria-label={`Photo to come: ${title}`}>
      <span>
        <Icon className="slot-icon" size={26} strokeWidth={1.75} aria-hidden="true" />
        <strong>{title}</strong>
        {hint}
      </span>
    </div>
  );
}

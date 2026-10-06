import type { ReactNode } from "react";

// Page transition into a car page: an orange panel wipes away to reveal the page (pure CSS, replays on every
// navigation because templates remount). The page itself is not faded or moved, so the car photo paints at once.
export default function CarTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="page-wipe" aria-hidden="true" />
      {children}
    </>
  );
}

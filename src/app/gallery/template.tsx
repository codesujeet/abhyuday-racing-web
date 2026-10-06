import type { ReactNode } from "react";

// Page transition into this page: an orange panel wipes away to reveal the page (pure CSS, replays on every
// navigation because templates remount). The page itself is not faded or moved, so photos paint at once.
export default function CarTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="page-wipe" aria-hidden="true" />
      {children}
    </>
  );
}

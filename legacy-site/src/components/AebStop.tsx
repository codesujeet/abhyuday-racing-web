/**
 * Scroll-linked illustration of the emergency braking test: A10 drives toward the target,
 * spots it, brakes and stops short. Pure CSS (scroll-driven animations), no JavaScript.
 * Browsers without scroll timelines, and people who prefer reduced motion, see the final stopped state.
 */
export function AebStop() {
  return (
    <figure className="stop-demo">
      <div className="stop-lane" aria-hidden="true">
        <svg className="stop-car" viewBox="0 0 120 64">
          {/* roll cage */}
          <path d="M30 34 L42 8 L74 8 L86 30" fill="none" stroke="#131A35" strokeWidth="4" strokeLinejoin="round" />
          <path d="M52 8 L50 34" stroke="#131A35" strokeWidth="3" />
          {/* body panels in the livery */}
          <path d="M14 34 L96 30 L108 40 L100 48 L18 48 Z" fill="#EE7234" stroke="#131A35" strokeWidth="3" strokeLinejoin="round" />
          <path d="M40 34 L56 41 L40 48 L52 48 L68 41 L52 33 Z" fill="#2D5BB7" />
          <path d="M64 33 L78 40 L64 47 L72 47 L86 40 L72 32 Z" fill="#47A3DC" />
          {/* brake light at the rear */}
          <rect className="stop-brake" x="12" y="36" width="5" height="7" rx="1.5" fill="#E5322D" />
          {/* wheels */}
          <circle cx="30" cy="50" r="12" fill="#131A35" />
          <circle cx="30" cy="50" r="4" fill="#B88BE0" />
          <circle cx="92" cy="50" r="12" fill="#131A35" />
          <circle cx="92" cy="50" r="4" fill="#B88BE0" />
        </svg>
        <div className="stop-target">
          <svg viewBox="0 0 90 64">
            <path d="M6 54 L6 26 Q8 14 22 12 L66 12 Q82 14 84 28 L84 54 Z" fill="#C9CFDA" stroke="#4A5372" strokeWidth="3" strokeLinejoin="round" />
            <rect x="16" y="20" width="58" height="14" rx="3" fill="#E8EBF1" />
            <circle cx="22" cy="54" r="8" fill="#4A5372" />
            <circle cx="70" cy="54" r="8" fill="#4A5372" />
          </svg>
          <span className="stop-frame" />
        </div>
      </div>
      <div className="stop-readout">
        <div className="stop-speed">
          <span>Speed</span>
          <span className="stop-bar" aria-hidden="true">
            <i />
          </span>
        </div>
        <p className="stop-status" aria-hidden="true">
          <span className="s1">Target detected</span>
          <span className="s2">Braking</span>
          <span className="s3">Stopped. 100 out of 100.</span>
        </p>
      </div>
      <figcaption>
        <span className="visually-hidden">Illustration: A10 detects the target car, brakes by itself and stops short of it. </span>
        Illustration of the braking test. Scroll to play it.
      </figcaption>
    </figure>
  );
}

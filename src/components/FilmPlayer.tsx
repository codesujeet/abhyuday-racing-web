"use client";

import { Play } from "lucide-react";
import { useState, type ReactNode } from "react";

/**
 * Shows a poster until someone presses play, then loads YouTube (privacy-enhanced mode).
 * Without a video ID it links to the team's YouTube channel instead.
 */
export function FilmPlayer({ youtubeId, title, channelUrl, poster }: { youtubeId: string; title: string; channelUrl: string; poster: ReactNode }) {
  const [playing, setPlaying] = useState(false);

  const playIcon = (
    <span className="play" aria-hidden="true">
      <Play size={28} fill="#131A35" stroke="#131A35" strokeWidth={1.5} />
    </span>
  );

  if (!youtubeId) {
    return (
      <a className="film-poster" href={channelUrl} target="_blank" rel="noopener" aria-label={`Watch ${title} on YouTube`}>
        {poster}
        {playIcon}
      </a>
    );
  }

  if (playing) {
    return (
      <div className="film-poster">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button className="film-poster" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      {poster}
      {playIcon}
    </button>
  );
}

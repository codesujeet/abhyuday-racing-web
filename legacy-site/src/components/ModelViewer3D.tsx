"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ready" | "error";

const messages: Record<Status, string> = {
  idle: "",
  loading: "Loading the model…",
  ready: "Drag to turn the car. Pinch or scroll to zoom.",
  error: "The 3D viewer could not load. Check your connection and try again.",
};

/** The 3D model and its viewer library download only after the button is pressed. */
export function ModelViewer3D() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [libReady, setLibReady] = useState(false);

  const toggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (libReady) return;
    setStatus("loading");
    try {
      await import("@google/model-viewer");
      setLibReady(true);
    } catch {
      setStatus("error");
    }
  };

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <div className="viewer">
        <div>
          <p>
            <strong>Want a closer look?</strong> Turn the A10 model around in your browser and see how the frame and
            suspension fit together.
          </p>
          <p className="viewer-note">The model downloads only when you open it (about 1 MB).</p>
        </div>
        <div>
          <button className="btn btn-navy" type="button" aria-expanded={open} aria-controls="viewer-stage" onClick={toggle}>
            {open ? "Close the 3D model" : "Open the 3D model"}
          </button>
          <p className="viewer-status" role="status">
            {open ? messages[status] : ""}
          </p>
        </div>
      </div>
      <div className="viewer-stage" id="viewer-stage" hidden={!open}>
        {libReady && (
          <model-viewer
            src="/models/a10.glb"
            alt="3D model of A10, the team's 2026 autonomous buggy"
            camera-controls=""
            camera-orbit="35deg 72deg auto"
            shadow-intensity="0.6"
            exposure="1.1"
            environment-image="neutral"
            {...(reducedMotion ? {} : { "auto-rotate": "", "auto-rotate-delay": "1500" })}
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("error")}
          />
        )}
        <p>A10 chassis, roll cage and suspension from our CAD model. Body panels and sensors are not in this version yet.</p>
      </div>
    </>
  );
}

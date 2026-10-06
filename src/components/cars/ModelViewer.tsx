"use client";

import { createElement, useState } from "react";
import { Cube } from "@/components/ui/Icons";

type Status = "idle" | "loading" | "ready" | "error";

/**
 * 3D viewer slot. The viewer library and the .glb download only when the visitor asks for them.
 * With no model, shows a placeholder explaining where the file goes.
 */
export function ModelViewer({ src, name, note }: { src?: string; name: string; note?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const load = async () => {
    setStatus("loading");
    try {
      await import("@google/model-viewer");
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="viewer">
      <div className="viewer-grid" aria-hidden="true" />
      {src && status === "ready" ? (
        createElement("model-viewer", {
          src,
          alt: `3D model of ${name}`,
          "camera-controls": "",
          "camera-orbit": "35deg 72deg auto",
          "shadow-intensity": "0.8",
          exposure: "1.1",
          "environment-image": "neutral",
          "interaction-prompt": "none",
          ...(reduced ? {} : { "auto-rotate": "", "auto-rotate-delay": "800" }),
        })
      ) : (
        <div className="viewer-ui">
          <Cube size={44} />
          {src ? (
            <>
              <p className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                Spin {name} in 3D
              </p>
              <p className="muted" style={{ maxWidth: "32em" }}>
                {note}
              </p>
              <button type="button" className="btn btn-primary" onClick={load} disabled={status === "loading"}>
                {status === "loading" ? "Loading…" : "Open 3D model"}
              </button>
              {status === "error" && <p role="status">The 3D viewer could not load. Check your connection and try again.</p>}
            </>
          ) : (
            <>
              <p className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                3D model coming soon
              </p>
              <p className="hud">Placeholder · .glb model</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

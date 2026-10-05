"use client";

import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  const textRef = useRef<HTMLSpanElement>(null);

  const selectText = () => {
    const node = textRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel("Press Ctrl+C");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
      setTimeout(() => setLabel("Copy"), 1800);
    } catch {
      selectText();
    }
  };

  return (
    <div className="email-row">
      <span ref={textRef}>{email}</span>
      <button className="copy" type="button" onClick={copy} aria-live="polite">
        {label}
      </button>
    </div>
  );
}

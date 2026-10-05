"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-head">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Team Abhyuday Racing, home">
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img src="/brand/emblem-120.webp" alt="" width={46} height={34} />
          </span>
          <span className="brand-name">
            Abhyuday Racing<small>GHRCEM Pune</small>
          </span>
        </Link>
        <button
          className="btn btn-line menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className="nav" id="site-nav" aria-label="Main" data-open={open} onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname.replace(/\/$/, "") === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-navy" href="/#join">
            Join the team
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element -- small static logo */
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { site, sections } from "@/content/site";
import { lockScroll, navPinned, scrollToId } from "@/lib/scroll";
import { Social } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Sticky top bar. On the home page (`onHome`) links smooth-scroll to sections, the active
 * section is highlighted and the URL hash follows along. Elsewhere links go to /#section.
 */
export function Nav({ onHome = true }: { onHome?: boolean }) {
  const [active, setActive] = useState<string>("home");
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(!onHome);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const openRef = useRef(false);

  // Hide on scroll down, show on scroll up, solid after the hero; rev-bar progress.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const heroH = onHome ? window.innerHeight * 0.85 : 40;
      setSolid(y > heroH);
      if (navPinned()) setHidden(false);
      else if (!openRef.current) {
        if (y > lastY + 4 && y > 200) setHidden(true);
        else if (y < lastY - 4) setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [onHome]);

  // Active section: whichever section crosses the line 40% down the screen.
  useEffect(() => {
    if (!onHome) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setActive(id);
          const url = id === "home" ? window.location.pathname : `#${id}`;
          if ((id === "home" && window.location.hash) || (id !== "home" && window.location.hash !== `#${id}`)) {
            history.replaceState(null, "", url);
          }
        }
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const setMenu = useCallback((next: boolean) => {
    openRef.current = next;
    setOpen(next);
    lockScroll(next);
    if (next) setHidden(false);
  }, []);

  // Menu: Escape closes, focus moves in and back out.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        btnRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1100) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, setMenu]);

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onHome) return; // normal navigation to /#id
    e.preventDefault();
    const id = (e.currentTarget.getAttribute("href") ?? "#home").replace(/^\/?#/, "");
    const wasOpen = openRef.current;
    if (wasOpen) setMenu(false);
    // let the menu start closing before scrolling
    window.setTimeout(() => scrollToId(id), wasOpen ? 120 : 0);
    history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
    setActive(id);
  };

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className={`nav ${solid || open ? "is-solid" : ""} ${hidden ? "is-hidden" : ""}`}>
        <div className="wrap nav-inner">
          <Link href={onHome ? "#home" : "/"} className="brand" onClick={onHome ? onNav : undefined} aria-label={`${site.name} — home`}>
            <img src="/brand/emblem-320.webp" alt="" width={84} height={61} />
          </Link>

          <nav aria-label="Sections">
            <ul className="nav-links">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={href(s.id)} onClick={onNav} aria-current={onHome && active === s.id ? "true" : undefined}>
                    {s.label}
                    {onHome && active === s.id && (
                      <motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={btnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!open)}
          >
            <span>{open ? "CLOSE" : "MENU"}</span>
            <span className="bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, delay: 0.1, ease } }}
            transition={{ duration: 0.6, ease }}
            data-lenis-prevent
          >
            <nav aria-label="Sections">
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      className="menu-link"
                      href={href(s.id)}
                      onClick={onNav}
                      aria-current={onHome && active === s.id ? "true" : undefined}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.25, ease } }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}
                    >
                      <span className="hud">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </motion.a>
                  </li>
                ))}
              </ol>
            </nav>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ delay: 0.5 }}>
              <a href={`mailto:${site.email}`} className="hud hud-orange">
                {site.email}
              </a>
              <div className="socials">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Social name={s.label} size={22} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

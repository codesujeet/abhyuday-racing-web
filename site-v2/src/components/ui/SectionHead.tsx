"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = { index: string; kicker: string; title: ReactNode; lede?: ReactNode; aside?: ReactNode; id?: string };
const ease = [0.16, 1, 0.3, 1] as const;

/** Big section title with a HUD label and a trajectory line that draws itself. */
export function SectionHead({ index, kicker, title, lede, aside, id }: Props) {
  return (
    <header className="sec-head">
      <motion.p
        className="hud hud-orange"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        {`SEC ${index} // ${kicker}`}
      </motion.p>
      <div className={aside ? "sec-head-split" : undefined}>
        <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
          <motion.h2
            id={id}
            className="sec-title"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            {title}
          </motion.h2>
        </div>
        {aside}
      </div>
      <svg className="trajectory" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0 30 C 200 30, 260 8, 480 10 S 820 32, 1000 22 S 1150 8, 1200 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
        />
      </svg>
      {lede && (
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          {lede}
        </motion.p>
      )}
    </header>
  );
}

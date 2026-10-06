"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element slides in from. */
  from?: "bottom" | "left" | "right" | "none";
  as?: "div" | "li" | "article" | "section" | "header";
};

const offsets = { bottom: { y: 40 }, left: { x: -60 }, right: { x: 60 }, none: {} };
const ease = [0.16, 1, 0.3, 1] as const;

/** Fades and slides children in once, when they enter the viewport. */
export function Reveal({ children, className, delay = 0, from = "bottom", as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Staggers its direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  stagger?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
      {children}
    </Tag>
  );
}

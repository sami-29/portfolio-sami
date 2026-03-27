"use client";

/**
 * MotionWrapper — renders motion.div with full animations normally,
 * or a plain div with no motion when prefers-reduced-motion is set.
 */

import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function MotionDiv({ children, ...props }: MotionDivProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) {
    // Strip animation props, just render children in a plain div
    const { initial, animate, whileInView, viewport, transition, variants, ...rest } = props;
    void initial;
    void animate;
    void whileInView;
    void viewport;
    void transition;
    void variants;
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
}

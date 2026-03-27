"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

export default function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const spring = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const scaleX = useTransform(spring, [0, 100], [0, 1]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <motion.div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(to right, #FF8F00, #FFC107, #FFD54F)",
        transformOrigin: "left",
        scaleX,
        zIndex: 9999,
        boxShadow: "0 0 8px rgba(255, 193, 7, 0.5)",
      }}
    />
  );
}

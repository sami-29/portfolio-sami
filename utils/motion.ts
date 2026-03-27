// ─── Easing curves ────────────────────────────────────────────────────────────

export const easing = {
  outQuart: [0.25, 1, 0.5, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
};

// ─── Stagger delays ───────────────────────────────────────────────────────────

export const stagger = {
  fast: 0.08,
  normal: 0.12,
  slow: 0.18,
};

// ─── Entrance variants ────────────────────────────────────────────────────────

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easing.outQuart },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: easing.outQuart },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: easing.outQuart },
};

// ─── Scroll-reveal variants ───────────────────────────────────────────────────

export const revealOnScroll = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: easing.outQuart },
};

export const revealOnScrollFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: easing.outQuart },
};

// ─── Stagger container ────────────────────────────────────────────────────────

export const staggerContainer = (delay = 0) => ({
  initial: {},
  animate: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger.normal,
    },
  },
});

export const staggerContainerOnScroll = (delay = 0) => ({
  initial: {},
  whileInView: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger.normal,
    },
  },
  viewport: { once: true, margin: "-80px" },
});

// Stagger child — pair with staggerContainer
export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easing.outQuart },
};

// Scroll stagger child — pair with staggerContainerOnScroll
export const staggerChildScroll = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easing.outQuart },
};

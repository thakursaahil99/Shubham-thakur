"use client";

import { motion, useScroll } from "framer-motion";

/* Scroll progress bar. The page itself is a flat paper colour — nothing animated or blurred
   in the background, so scrolling stays smooth on low-end machines. */
export default function Background() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="no-print fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

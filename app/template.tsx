"use client";

import { motion } from "framer-motion";

/* Re-mounts on every route change → ink + orange curtains lift away, page rises in */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="no-print pointer-events-none fixed inset-0 z-[70] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="no-print pointer-events-none fixed inset-0 z-[69] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { SplitText } from "./Motion";

/* Big editorial page heading. Wrap words in *asterisks* for orange italics. */
export default function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="container-x pb-16 pt-40 md:pt-48">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="eyebrow mb-8"
      >
        {eyebrow}
      </motion.p>
      <h1 className="max-w-6xl font-serif text-6xl leading-[0.92] tracking-[-0.02em] sm:text-8xl lg:text-9xl">
        <SplitText text={title} delay={0.35} />
      </h1>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 grid border-t border-ink/15 pt-6 md:grid-cols-2"
        >
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted md:block">( Overview )</span>
          <p className="max-w-xl text-lg leading-relaxed text-ink/70">{text}</p>
        </motion.div>
      )}
    </section>
  );
}

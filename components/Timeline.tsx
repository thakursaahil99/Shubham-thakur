"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";

/* Editorial experience list: sticky dates on the left, an orange line that draws as you scroll */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <div ref={ref} className="relative border-t border-ink/15">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-ink/10 md:left-[260px]" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-accent md:left-[260px]"
      />
      {experience.map((job, i) => (
        <div key={job.company} className="relative grid gap-6 border-b border-ink/15 py-12 pl-8 md:grid-cols-[260px_1fr] md:pl-0">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute left-0 top-14 -ml-[5px] h-3 w-3 rounded-full border-2 border-paper bg-accent md:left-[260px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:sticky md:top-28 md:self-start md:pr-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{job.period}</p>
            <p className="mt-3 font-serif text-6xl leading-none text-ink/15">0{experience.length - i}</p>
            {job.current && (
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Current
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:pl-12"
          >
            <h3 className="font-serif text-4xl leading-tight md:text-5xl">{job.role}</h3>
            <p className="mt-2 text-ink/60">
              <span className="font-medium italic text-accent">{job.company}</span> · {job.type}
            </p>
            <ul className="mt-6 grid gap-3 text-ink/75 lg:grid-cols-2 lg:gap-x-10">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { proficiency } from "@/lib/data";
import { Counter } from "./Motion";

export default function SkillBars() {
  return (
    <div className="grid gap-x-16 border-t border-ink/15 md:grid-cols-2">
      {proficiency.map((s, i) => (
        <div key={s.name} className="border-b border-ink/15 py-7">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <span className="font-serif text-2xl md:text-3xl">{s.name}</span>
            <span className="font-mono text-sm text-accent">
              <Counter to={s.level} suffix="%" />
            </span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-ink/10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: s.level / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left rounded-full bg-ink"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

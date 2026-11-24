"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const fallbacks = ["#FF5A1F", "#121212", "#C8B89A", "#2F4A3A", "#5B4BDB"];

/* Hover a row → a preview card follows the cursor (desktop). */
export default function ProjectList() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const p = active !== null ? projects[active] : null;

  return (
    <div
      className="relative border-t border-ink/15"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseLeave={() => setActive(null)}
    >
      {projects.map((proj, i) => (
        <Link
          key={proj.title}
          href={proj.url ?? "/projects"}
          target={proj.url ? "_blank" : undefined}
          rel="noreferrer"
          onMouseEnter={() => setActive(i)}
          className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden border-b border-ink/15 py-8 md:gap-10 md:py-10"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
          <span className="relative font-mono text-xs text-muted transition-colors group-hover:text-paper/50 md:pl-4">
            0{i + 1}
          </span>
          <span className="relative">
            <span className="block font-serif text-3xl leading-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-paper sm:text-5xl md:text-6xl">
              {proj.title}
            </span>
            <span className="mt-2 block text-sm text-muted transition-colors group-hover:text-paper/60">
              {proj.category}
            </span>
          </span>
          <span className="relative grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:mr-4">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      ))}

      {/* Floating preview */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {p && active !== null && (
            <motion.div
              key="preview"
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -4 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ width: 340, height: 220 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {p.image && !broken[active] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.image}
                      alt=""
                      onError={() => setBroken((b) => ({ ...b, [active]: true }))}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full flex-col justify-between p-6 text-paper"
                      style={{ background: fallbacks[active % fallbacks.length] }}
                    >
                      <span className="font-mono text-xs uppercase tracking-widest opacity-70">{p.category}</span>
                      <span className="font-serif text-3xl leading-tight">{p.title}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

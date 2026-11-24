"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { TiltCard } from "./Motion";

const fallbacks = ["#FF5A1F", "#121212", "#C8B89A", "#2F4A3A", "#5B4BDB"];

/* Browser-window mockup with the site screenshot; coloured poster if there's no image */
function ProjectVisual({ p, index }: { p: Project; index: number }) {
  const [broken, setBroken] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // The image can fail before React hydrates (so onError never fires) — check on mount too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setBroken(true);
  }, []);
  const hasImage = p.image && !broken;
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] bg-paper-2">
      {hasImage ? (
        <div className="px-6 pt-6">
          <div className="overflow-hidden rounded-t-xl border border-b-0 border-ink/10 bg-white shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-ink/20" />
              <span className="h-2 w-2 rounded-full bg-ink/20" />
              <span className="h-2 w-2 rounded-full bg-ink/20" />
              <span className="ml-2 truncate font-mono text-[10px] text-muted">
                {p.url?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </div>
            <div className="h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={p.image}
                alt={`${p.title} website screenshot`}
                onError={() => setBroken(true)}
                loading="lazy"
                className="w-full object-cover object-top transition-transform duration-[2500ms] ease-in-out group-hover:-translate-y-[35%]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative flex h-[17rem] flex-col justify-between p-7 text-paper"
          style={{ background: fallbacks[index % fallbacks.length] }}
        >
          <span className="font-mono text-xs uppercase tracking-widest opacity-70">Case 0{index + 1}</span>
          <span className="max-w-xs font-serif text-4xl leading-tight transition-transform duration-500 group-hover:-translate-y-2">
            {p.title}
          </span>
        </div>
      )}
      <span className="absolute right-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">
        {p.category}
      </span>
    </div>
  );
}

const filters = ["All", "WordPress", "Python"] as const;

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) =>
    filter === "All" ? true : filter === "Python" ? p.tags.includes("Python") : !p.tags.includes("Python")
  );

  return (
    <>
      <div className="mb-12 inline-flex rounded-full border border-ink/15 p-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
              filter === f ? "text-paper" : "text-ink/60 hover:text-ink"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => {
            const index = projects.indexOf(p);
            return (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={index % 2 === 1 ? "md:mt-24" : ""}
              >
                <TiltCard className="rounded-[1.25rem]">
                  <ProjectVisual p={p} index={index} />
                </TiltCard>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl leading-tight md:text-4xl">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/65">{p.description}</p>
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${p.title}`}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition-all duration-300 hover:rotate-45 hover:bg-accent"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/70">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="text-accent">✳</span> {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

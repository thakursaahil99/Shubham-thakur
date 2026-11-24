"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { Magnetic, SplitText } from "./Motion";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-medium text-ink"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Circular text badge that spins with page scroll */
function SpinBadge() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2000], [0, 360]);
  const text = "AVAILABLE FOR FREELANCE • UPWORK • REMOTE • ";
  return (
    <Link href="/contact" aria-label="Hire me" className="group relative grid h-36 w-36 place-items-center sm:h-44 sm:w-44">
      <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ rotate }}>
        <defs>
          <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-ink font-mono text-[13px] uppercase tracking-[0.3em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </motion.svg>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-paper transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 sm:h-20 sm:w-20">
        <ArrowUpRight size={28} />
      </span>
    </Link>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);

  return (
    <section className="container-x relative flex min-h-[min(100svh,1000px)] flex-col justify-end pb-12 pt-28 sm:pt-32">
      <motion.div style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="eyebrow">{profile.location}</span>
          <span className="text-sm text-muted">
            Currently: <RotatingRole />
          </span>
        </motion.div>

        <h1 className="font-serif text-[11.5vw] leading-[0.92] tracking-[-0.02em] sm:text-[10vw] lg:text-[7.5rem] xl:text-[9rem]">
          <SplitText text="Backend developer" delay={0.35} />
          <br />
          <SplitText text="who makes the web" delay={0.5} />
          <br />
          <SplitText text="*fast* & *secure.*" delay={0.65} />
        </h1>
      </motion.div>

      <div className="mt-14 grid items-end gap-10 border-t border-ink/15 pt-8 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-lg leading-relaxed text-ink/70">
            I&apos;m <span className="font-medium text-ink">{profile.name}</span> — {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/projects" className="btn-primary group">
                See my work
                <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:-rotate-90" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/resume" className="btn-ghost">
                Resume
              </Link>
            </Magnetic>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -60 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <SpinBadge />
        </motion.div>
      </div>
    </section>
  );
}

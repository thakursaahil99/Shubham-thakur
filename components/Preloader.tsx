"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Build", "Secure", "Optimize", "Ship"];

/* Intro screen, shown once per browser session */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || window.location.search.includes("nointro")) return;
    setShow(true);
    const c = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setShow(false), 200),
    });
    return () => c.stop();
  }, []);

  const word = words[Math.min(words.length - 1, Math.floor(count / 26))];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="no-print fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">Shubham Thakur — Portfolio</p>
          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={word}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-5xl italic text-accent sm:text-7xl"
                >
                  {word}.
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-serif text-7xl leading-none tabular-nums sm:text-[10rem]">{count}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-accent" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

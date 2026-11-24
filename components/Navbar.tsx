"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="no-print fixed inset-x-0 top-0 z-50 pt-4"
      >
        <nav
          className={`container-x flex items-center justify-between transition-all duration-500 ${
            scrolled ? "max-w-5xl" : ""
          }`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-full transition-all duration-500 ${
              scrolled ? "border border-ink/10 bg-paper/95 py-2 pl-5 pr-2 shadow-[0_12px_40px_-20px_rgba(18,18,18,0.35)]" : "py-2"
            }`}
          >
            <Link
              href="/"
              className={`group relative z-[80] flex items-baseline gap-1 font-serif text-2xl leading-none transition-colors ${
                open && !scrolled ? "text-paper" : ""
              }`}
            >
              {profile.shortName}
              <span className="text-accent transition-transform duration-300 group-hover:rotate-90">✳</span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href} className="relative">
                    <Link
                      href={l.href}
                      className={`relative z-10 block px-4 py-2 text-sm transition-colors ${
                        active ? "text-paper" : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link href="/contact" className="btn-primary hidden !py-2.5 sm:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Hire me
              </Link>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
                className="relative z-[80] grid h-11 w-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
              >
                <span className="relative h-3 w-5">
                  <motion.span
                    className="absolute left-0 top-0 h-[1.5px] w-5 bg-current"
                    animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] w-5 bg-current"
                    animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="no-print fixed inset-0 z-[45] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-paper lg:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-baseline gap-4 font-serif text-5xl ${
                        pathname === l.href ? "italic text-accent" : ""
                      }`}
                    >
                      <span className="font-mono text-xs text-paper/40">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-paper/60"
            >
              <p>{profile.email}</p>
              <p className="mt-1">{profile.phone}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

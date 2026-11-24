"use client";

import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import type { ReactNode } from "react";

// `?static` in the URL jumps every animation to its end state — used for layout screenshots.
if (typeof window !== "undefined" && window.location.search.includes("static")) {
  MotionGlobalConfig.skipAnimations = true;
}

/* Honour the OS "reduce motion" setting for every framer-motion animation */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

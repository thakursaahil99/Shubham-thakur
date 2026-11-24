"use client";

import { useEffect, useRef, useState } from "react";

/* Scales a single line of text so it exactly fills its container's width — never cut off. */
export default function FitText({ children, className = "" }: { children: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;
    // Scale from whatever size is rendered now (no DOM mutation, so React state stays in sync).
    const fit = () => {
      const current = parseFloat(getComputedStyle(text).fontSize);
      // inline-block → getBoundingClientRect gives the text's own width, not the container's
      const width = text.getBoundingClientRect().width;
      if (!current || !width) return;
      setSize(Math.floor(current * (box.clientWidth / width) * 0.98));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    // Re-fit once web fonts finish loading (glyph widths change)
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={boxRef} className="w-full overflow-hidden text-center">
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${className}`}
        style={{ fontSize: size ? `${size}px` : "12vw", visibility: size ? "visible" : "hidden" }}
      >
        {children}
      </span>
    </div>
  );
}

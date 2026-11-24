"use client";

import { motion } from "framer-motion";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "Upwork", href: profile.socials.upwork, icon: Briefcase },
  { label: "GitHub", href: profile.socials.github, icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export default function Socials({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      {links.map(({ label, href, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 ${
            dark
              ? "border-paper/15 text-paper/70 hover:border-accent hover:bg-accent hover:text-paper"
              : "border-ink/15 text-ink/70 hover:border-ink hover:bg-ink hover:text-paper"
          }`}
        >
          <Icon size={17} />
        </motion.a>
      ))}
    </div>
  );
}

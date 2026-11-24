import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import Socials from "./Socials";
import { Reveal, SplitText } from "./Motion";
import LocalTime from "./LocalTime";
import FitText from "./FitText";

export default function Footer() {
  return (
    <footer className="no-print mt-32 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-paper sm:rounded-[2.5rem]">
        <div className="container-x pt-20 md:pt-28">
          <p className="eyebrow !text-paper/50">Have a project in mind?</p>
          <h2 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
            <SplitText text="Let's build something *fast,* secure & scalable." inView />
          </h2>
          <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary !bg-accent hover:!bg-paper hover:!text-ink">
              Start a project <ArrowUpRight size={16} />
            </Link>
            <a href={`mailto:${profile.email}`} className="link-u text-lg text-paper/80 hover:text-paper">
              {profile.email}
            </a>
          </Reveal>

          <div className="mt-24 grid gap-10 border-t border-paper/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">Pages</p>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-u text-paper/70 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-paper/70">
                <li>{profile.phone}</li>
                <li>{profile.location}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">Local time</p>
              <p className="mt-4 text-sm text-paper/70">
                <LocalTime /> · IST
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">Follow</p>
              <Socials className="mt-4" dark />
            </div>
          </div>
        </div>

        <div className="container-x mt-16 flex flex-wrap justify-between gap-2 pb-6 text-xs text-paper/40">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Next.js & Framer Motion</span>
        </div>

        <div aria-hidden className="pointer-events-none select-none px-4 pb-4 sm:px-8">
          <FitText className="font-serif leading-[0.85] text-paper/[0.12]">{profile.name}</FitText>
        </div>
      </div>
    </footer>
  );
}

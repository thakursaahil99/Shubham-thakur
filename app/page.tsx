import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";
import ProjectList from "@/components/ProjectList";
import LocalTime from "@/components/LocalTime";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { profile, services, stats, workProcess } from "@/lib/data";
import { clientProjects } from "@/lib/clientProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="my-10">
        <Marquee />
      </div>

      {/* Bento: about + numbers */}
      <section className="container-x mt-28">
        <Stagger className="grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-4">
          <StaggerItem className="card flex flex-col justify-between p-8 md:col-span-2 md:row-span-2 md:p-10">
            <p className="eyebrow">About</p>
            <div>
              <p className="font-serif text-3xl leading-snug md:text-[2.6rem] md:leading-[1.15]">
                I build the parts of a website you don&apos;t see — and make sure they&apos;re{" "}
                <em className="text-accent">fast</em>, <em className="text-accent">secure</em> and{" "}
                <em className="text-accent">reliable</em>.
              </p>
              <Link href="/about" className="link-u mt-8 inline-flex items-center gap-1 text-sm font-medium">
                More about me <ArrowUpRight size={14} />
              </Link>
            </div>
          </StaggerItem>

          {stats.slice(0, 2).map((s) => (
            <StaggerItem key={s.label} className="card flex flex-col justify-between p-7">
              <p className="font-serif text-6xl leading-none md:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </StaggerItem>
          ))}

          <StaggerItem className="flex flex-col justify-between rounded-3xl bg-accent p-7 text-paper">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">Now · Oops InfoSolution</p>
            <p className="font-serif text-4xl leading-tight">
              Learning <em>Python</em>
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col justify-between rounded-3xl bg-ink p-7 text-paper">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">Mandi, India</p>
            <p className="font-serif text-5xl leading-none tabular-nums">
              <LocalTime />
            </p>
          </StaggerItem>

          <StaggerItem className="card flex flex-col justify-between p-7">
            <p className="font-serif text-6xl leading-none md:text-7xl">
              <Counter to={clientProjects.length} suffix="+" />
            </p>
            <p className="text-sm text-muted">Client projects delivered with Creative Web Services</p>
          </StaggerItem>

          {stats.slice(2, 3).map((s) => (
            <StaggerItem key={s.label} className="card flex flex-col justify-between p-7">
              <p className="font-serif text-6xl leading-none md:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </StaggerItem>
          ))}

          <StaggerItem className="card flex flex-col justify-between p-7 md:col-span-2">
            <p className="eyebrow">Available</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="font-serif text-3xl leading-tight">Taking new projects on Upwork</p>
              <a href={profile.socials.upwork} target="_blank" rel="noreferrer" className="btn-primary">
                Upwork <ArrowUpRight size={16} />
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Services — dark band */}
      <section className="mt-32 px-3 sm:px-4">
        <div className="rounded-[2rem] bg-ink py-24 text-paper sm:rounded-[2.5rem] md:py-32">
          <div className="container-x">
            <SectionTitle eyebrow="Services" title="What I can *do* for you" light />
            <div className="border-t border-paper/15">
              {services.map((s, i) => (
                <Reveal key={s.title} y={30}>
                  <div className="group grid items-baseline gap-4 border-b border-paper/15 py-8 transition-colors duration-500 hover:border-accent md:grid-cols-[80px_1fr_1fr] md:py-10">
                    <span className="font-mono text-xs text-paper/40">0{i + 1}</span>
                    <h3 className="font-serif text-4xl leading-tight transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-accent md:text-5xl">
                      {s.title}
                    </h3>
                    <p className="max-w-md text-paper/60">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="container-x mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Selected work" title="Projects I'm *proud* of" className="!mb-0" />
          <Reveal>
            <Link href="/projects" className="btn-ghost">
              All projects <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProjectList />
        </div>
      </section>

      {/* Process */}
      <section className="container-x mt-32">
        <SectionTitle eyebrow="Process" title="How we'll *work* together" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((p) => (
            <StaggerItem key={p.step} className="card group p-7 transition-colors duration-500 hover:bg-ink hover:text-paper">
              <span className="font-serif text-7xl leading-none text-accent">{p.step}</span>
              <h3 className="mt-10 font-serif text-3xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-paper/65">
                {p.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Journey */}
      <section className="container-x mt-32">
        <SectionTitle eyebrow="Journey" title="Six years of *backend* work" />
        <Timeline />
      </section>
    </>
  );
}

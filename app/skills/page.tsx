import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import SkillBars from "@/components/SkillBars";
import { Stagger, StaggerItem } from "@/components/Motion";
import { skillGroups } from "@/lib/data";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The *toolkit.*"
        text="Deep WordPress & PHP expertise, security and performance know-how, and the DevOps to ship it — plus Python, which I'm currently learning."
      />
      <section className="container-x">
        <SkillBars />
      </section>
      <section className="container-x mt-32">
        <SectionTitle eyebrow="Stack" title="Technologies I *use*" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <StaggerItem
              key={g.title}
              className="card group p-7 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-3xl">{g.title}</h3>
                <span className="font-mono text-xs text-muted group-hover:text-paper/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70 transition-colors duration-500 group-hover:border-paper/20 group-hover:text-paper/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

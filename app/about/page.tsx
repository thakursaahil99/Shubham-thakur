import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { education, interests, profile } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

const chapters = [
  { year: "2018", title: "BCA, Panjab University", text: "Built my foundation in programming, databases and the web." },
  { year: "2019", title: "First role at Baseline IT", text: "Started shipping custom WordPress plugins and themes in PHP." },
  { year: "2020", title: "Remote with Creative Web Services", text: "Five years as a senior backend dev for eCommerce & SaaS clients." },
  { year: "2025", title: "Freelancing on Upwork", text: "Working directly with global clients on WordPress, security and speed." },
  { year: "2026", title: "Python at Oops InfoSolution", text: "Learning Python and working on live Python projects with the team." },
];

const interestEmoji: Record<string, string> = {
  Cooking: "🍳",
  Reading: "📚",
  "Playing Football": "⚽",
  Trekking: "🏔️",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="A developer who cares about the *details.*"
        text="I turn business requirements into reliable, high-performance backends — and rescue the ones that got hacked."
      />

      <section className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <div className="sticky top-28 space-y-4">
            <div className="flex aspect-[4/3] flex-col sm:aspect-[16/9] lg:aspect-[4/5] justify-end overflow-hidden rounded-3xl bg-ink p-8 text-paper">
              <span className="font-serif text-[6rem] leading-[0.8] text-accent lg:text-[9rem]">ST</span>
              <p className="mt-6 font-serif text-3xl">{profile.name}</p>
              <p className="mt-1 text-sm text-paper/60">{profile.location}</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="font-serif text-2xl leading-snug sm:text-3xl md:text-4xl md:leading-snug">{profile.summary}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-14 grid gap-4 sm:grid-cols-2">
            <div className="card p-7">
              <p className="eyebrow">Education</p>
              <p className="mt-6 font-serif text-2xl leading-tight">{education.degree}</p>
              <p className="mt-2 text-sm text-muted">
                {education.school} · {education.year}
              </p>
            </div>
            <div className="card p-7">
              <p className="eyebrow">Contact</p>
              <p className="mt-6 break-all font-serif text-2xl leading-tight">{profile.email}</p>
              <p className="mt-2 text-sm text-muted">{profile.phone}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-32">
        <SectionTitle eyebrow="Story" title="How I got *here*" />
        <Stagger className="grid border-t border-ink/15 md:grid-cols-3 lg:grid-cols-5">
          {chapters.map((c) => (
            <StaggerItem
              key={c.year}
              className="group border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-serif text-7xl leading-none transition-colors duration-500 group-hover:text-accent">
                {c.year}
              </span>
              <h3 className="mt-8 text-lg font-medium">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x mt-32">
        <SectionTitle eyebrow="Off the keyboard" title="When I'm *not* coding" />
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {interests.map((it) => (
            <StaggerItem
              key={it}
              className="card group flex aspect-square flex-col justify-between p-6 transition-colors duration-500 hover:bg-accent hover:text-paper"
            >
              <span className="text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
                {interestEmoji[it] ?? "✳"}
              </span>
              <span className="font-serif text-2xl md:text-3xl">{it}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

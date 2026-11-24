import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ResumeActions from "@/components/ResumeActions";
import { Reveal } from "@/components/Motion";
import { education, experience, interests, profile, projects, skillGroups } from "@/lib/data";

export const metadata: Metadata = { title: "Resume" };

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-8 print:mb-2 print:mt-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900">
      <span className="h-2 w-2 rounded-full bg-accent" />
      {children}
      <span className="h-px flex-1 bg-neutral-200" />
    </h2>
  );
}

export default function ResumePage() {
  return (
    <>
      <div className="no-print">
        <PageHeader eyebrow="Resume" title="The *one-pager.*" text="Read it here, print it, or download the PDF." />
        <div className="container-x mb-12">
          <ResumeActions />
        </div>
      </div>

      <section className="container-x">
        <Reveal>
          <article className="print-sheet mx-auto max-w-4xl rounded-3xl bg-white p-6 text-neutral-700 sm:p-8 shadow-[0_40px_100px_-40px_rgba(18,18,18,0.45)] md:p-14">
            <header className="border-b-2 border-neutral-900 pb-6">
              <h1 className="font-serif text-5xl leading-none text-neutral-900">{profile.name}</h1>
              <p className="mt-3 font-medium text-accent-deep">{profile.role}</p>
              <p className="mt-2 text-sm">
                {profile.phone} · {profile.email} · {profile.location}
              </p>
            </header>

            <H>Professional Summary</H>
            <p className="text-sm leading-relaxed">{profile.summary}</p>

            <H>Technical Skills</H>
            <ul className="space-y-1 text-sm">
              {skillGroups.map((g) => (
                <li key={g.title}>
                  <span className="font-semibold text-neutral-900">{g.title}:</span> {g.items.join(", ")}
                </li>
              ))}
            </ul>

            <H>Professional Experience</H>
            <div className="space-y-5 print:space-y-3">
              {experience.map((e) => (
                <div key={e.company}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="font-semibold text-neutral-900">{e.role}</p>
                    <p className="text-sm font-medium text-accent-deep">{e.period}</p>
                  </div>
                  <p className="text-sm italic">
                    {e.company} · {e.type}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm marker:text-accent">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <H>Project Highlights</H>
            <div className="space-y-3 text-sm">
              {projects.map((p) => (
                <div key={p.title}>
                  <p className="font-semibold text-neutral-900">
                    {p.title}
                    {p.url && (
                      <span className="font-normal text-neutral-500"> — {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    )}
                  </p>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              <div>
                <H>Education</H>
                <p className="font-semibold text-neutral-900">{education.degree}</p>
                <p className="text-sm">
                  {education.school} · {education.year}
                </p>
              </div>
              <div>
                <H>Interests</H>
                <p className="text-sm">{interests.join(" · ")}</p>
              </div>
            </div>
          </article>
        </Reveal>
      </section>
    </>
  );
}

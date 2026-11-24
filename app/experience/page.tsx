import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="6+ years of shipping *backend* code."
        text="From an in-house PHP role, to five years of remote freelance work, to running my own Upwork practice — and in 2026, learning and working with Python at Oops InfoSolution."
      />
      <section className="container-x">
        <Timeline />
      </section>
    </>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ClientWork from "@/components/ClientWork";
import SectionTitle from "@/components/SectionTitle";
import { Reveal } from "@/components/Motion";
import { clientProjects } from "@/lib/clientProjects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected *work.*"
        text="Plugins, commerce systems and platforms built for real clients — plus hundreds of sites delivered with the Creative Web Services team."
      />
      <section className="container-x">
        <ProjectGrid />
      </section>
      <section className="container-x mt-40">
        <SectionTitle
          eyebrow="Client work"
          title={`${clientProjects.length} projects with *Creative Web Services*`}
        />
        <Reveal>
          <p className="-mt-6 mb-14 max-w-2xl text-lg text-ink/65">
            Websites, branding and web apps delivered for healthcare, ABA therapy, real estate, e-commerce and B2B
            clients as part of the Creative Web Services team.
          </p>
        </Reveal>
        <ClientWork />
      </section>
    </>
  );
}

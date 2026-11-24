import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import LocalTime from "@/components/LocalTime";
import Socials from "@/components/Socials";
import { Reveal } from "@/components/Motion";
import { profile } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's *talk.*"
        text="Open to freelance WordPress, WooCommerce, security and speed optimization projects. I usually reply within a day."
      />
      <section className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-10">
            <div>
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="link-u mt-3 inline-block break-all font-serif text-2xl leading-tight transition-colors hover:text-accent min-[400px]:text-3xl sm:text-4xl"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Phone</p>
              <a href={`tel:${profile.phoneRaw}`} className="link-u mt-3 inline-block font-serif text-3xl hover:text-accent">
                {profile.phone}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="eyebrow">Based in</p>
                <p className="mt-3 text-ink/70">{profile.location}</p>
              </div>
              <div>
                <p className="eyebrow">Local time</p>
                <p className="mt-3 text-ink/70">
                  <LocalTime /> IST
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Elsewhere</p>
              <Socials className="mt-4" />
            </div>
          </div>
        </Reveal>
        <div className="card p-7 md:p-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

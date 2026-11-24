"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { caseStudyUrl, clientProjects, projectImage, type ClientProject } from "@/lib/clientProjects";

/*
 * 255 client projects — deliberately animation-free so it stays smooth on low-end PCs:
 * plain <img loading="lazy">, CSS-only hover, `content-visibility` and paged rendering.
 */

const PAGE = 24;

const types = ["All", "Website", "Branding", "Web App"] as const;

const industries = (() => {
  const counts = new Map<string, number>();
  for (const p of clientProjects) counts.set(p.industry, (counts.get(p.industry) ?? 0) + 1);
  return ["All", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k)];
})();

function Card({ p }: { p: ClientProject }) {
  return (
    <a href={caseStudyUrl(p.slug)} target="_blank" rel="noreferrer" className="cw-card group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={projectImage(p.slug)}
          alt={`${p.name} — ${p.type.toLowerCase()} project`}
          width={480}
          height={270}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {p.type !== "Website" && (
          <span className="absolute left-3 top-3 rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink">
            {p.type}
          </span>
        )}
        <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-accent text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl leading-snug">{p.name}</h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">{p.industry}</span>
      </div>
      {p.blurb && <p className="mt-1 line-clamp-2 text-sm text-ink/60">{p.blurb}</p>}
    </a>
  );
}

export default function ClientWork() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [industry, setIndustry] = useState("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const q = useDeferredValue(query.trim().toLowerCase());

  const list = useMemo(
    () =>
      clientProjects.filter(
        (p) =>
          (type === "All" || p.type === type) &&
          (industry === "All" || p.industry === industry) &&
          (!q || p.name.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q))
      ),
    [type, industry, q]
  );

  const reset = () => setShown(PAGE);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex w-fit flex-wrap rounded-full border border-ink/15 p-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                reset();
              }}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                type === t ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-72">
          <Search size={16} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder="Search projects…"
            className="w-full border-0 border-b border-ink/20 bg-transparent py-2 pl-7 pr-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
          />
        </label>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {industries.map((i) => (
          <button
            key={i}
            onClick={() => {
              setIndustry(i);
              reset();
            }}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              industry === i ? "border-accent bg-accent text-paper" : "border-ink/15 text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-muted">
        Showing {Math.min(shown, list.length)} of {list.length} projects
      </p>

      {list.length === 0 ? (
        <p className="py-16 text-center text-muted">No projects match that search.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.slice(0, shown).map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      )}

      {shown < list.length && (
        <div className="mt-14 text-center">
          <button onClick={() => setShown((s) => s + PAGE)} className="btn-ghost">
            Load more ({list.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
}

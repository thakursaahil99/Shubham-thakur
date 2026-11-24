import { Reveal, SplitText } from "./Motion";

/* Section heading. Wrap words in *asterisks* for orange italics. */
export default function SectionTitle({
  eyebrow,
  title,
  className,
  light = false,
}: {
  eyebrow: string;
  title: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`mb-14 ${className ?? ""}`}>
      <Reveal>
        <p className={`eyebrow mb-5 ${light ? "!text-paper/50" : ""}`}>{eyebrow}</p>
      </Reveal>
      <h2 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.01em] md:text-7xl">
        <SplitText text={title} inView />
      </h2>
    </div>
  );
}

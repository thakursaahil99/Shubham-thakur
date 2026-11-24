const items = [
  "WordPress", "WooCommerce", "Malware Removal", "PHP", "Speed Optimization", "ACF",
  "Hacked Site Recovery", "MySQL", "Core Web Vitals", "REST APIs", "Security Hardening", "WP-CLI",
];

export default function Marquee() {
  return (
    <div className="relative -rotate-1 overflow-hidden bg-ink py-5 text-paper">
      <div className="flex w-max animate-marquee items-center gap-8">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-serif text-3xl sm:text-4xl">
            <span className={i % 2 ? "italic text-accent" : ""}>{t}</span>
            <span className="text-xl text-accent">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

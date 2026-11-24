// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

// Change this to your real domain after deploying (used for SEO / sitemap)
export const siteUrl = "https://shubhamthakur.dev";

export const workProcess = [
  { step: "01", title: "Discover", text: "We talk through goals, scope and constraints. You get a clear plan and estimate." },
  { step: "02", title: "Build", text: "Clean, documented code with regular progress updates and staging previews." },
  { step: "03", title: "Ship", text: "Tested, optimized and deployed — Git-based releases, zero-drama launches." },
  { step: "04", title: "Support", text: "Ongoing maintenance, performance tuning and new features as you grow." },
];

export const profile = {
  name: "Shubham Thakur",
  shortName: "Shubham",
  role: "WordPress Backend Developer → Python Developer",
  roles: [
    "WordPress Backend Developer",
    "Hacked Site Recovery Expert",
    "Speed Optimization Specialist",
    "Upwork Freelancer",
    "Python Developer",
  ],
  tagline:
    "5+ years building fast, secure, scalable WordPress backends — now learning and working with Python at Oops InfoSolution.",
  summary:
    "Skilled and detail-oriented backend developer with over 5 years of experience developing and maintaining high-performance websites, custom plugins and themes. Strong command of PHP, MySQL, REST API integration and WordPress core internals. Proven ability to translate business requirements into scalable backend solutions, optimize site performance and deliver on-time releases in fast-paced environments. I also specialise in recovering hacked websites — malware removal, backdoor cleanup, blacklist removal and security hardening. Today I freelance on Upwork, and in 2026 I joined Oops InfoSolution, where I'm learning Python and working on real Python projects.",
  phone: "+91 82645 95876",
  phoneRaw: "+918264595876",
  email: "shubhamthakur437@gmail.com",
  location: "Mandi, Himachal Pradesh, India",
  resumePdf: "/Shubham_Thakur_Resume.pdf",
  // Fill these in with your real links
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    upwork: "https://www.upwork.com/",
  },
};

export const stats = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 30, suffix: "%", label: "Faster DB load times" },
  { value: 20, suffix: "+", label: "Multisite subsites shipped" },
  { value: 4, suffix: "", label: "Companies & freelance roles" },
];

export type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Python Developer (Learning & Working)",
    company: "Oops InfoSolution",
    type: "Learning & working",
    period: "2026 – Present",
    current: true,
    points: [
      "Learning Python professionally while working on live projects with the Oops InfoSolution team.",
      "Building Python scripts, REST APIs and automation tasks alongside senior developers.",
      "Bringing 5+ years of backend experience (PHP, MySQL, APIs) to Python development.",
    ],
    tags: ["Python", "REST APIs", "Automation", "Git"],
  },
  {
    role: "Freelance WordPress Developer",
    company: "Upwork",
    type: "Freelance · Remote",
    period: "March 2025 – Present",
    current: true,
    points: [
      "Delivering backend projects for international clients through Upwork.",
      "Supporting WordPress / WooCommerce clients with custom plugins, integrations and performance fixes.",
      "Recovering hacked WordPress websites — malware removal, backdoor cleanup, blacklist removal and security hardening.",
      "Speed optimization: Core Web Vitals, caching, database cleanup and image/asset optimization.",
    ],
    tags: ["WordPress", "WooCommerce", "PHP", "Security", "REST APIs"],
  },
  {
    role: "Senior WordPress Backend Developer",
    company: "Creative Web Services",
    type: "Freelance · Remote",
    period: "May 2020 – March 2025",
    points: [
      "Developed and maintained custom WordPress plugins and themes for eCommerce and SaaS clients.",
      "Optimized backend performance, reducing database load times by 30% using efficient queries and caching.",
      "Integrated third-party APIs — payment gateways, CRMs and analytics.",
      "Managed version control and deployments with Git and GitHub Actions.",
      "Mentored junior developers and conducted code reviews.",
    ],
    tags: ["PHP", "WooCommerce", "MySQL", "GitHub Actions", "Caching"],
  },
  {
    role: "WordPress Backend Developer | PHP",
    company: "Baseline IT Development",
    type: "Full-time",
    period: "March 2019 – May 2020",
    points: [
      "Developed and maintained custom WordPress plugins and themes.",
      "Worked with PHP and MySQL to build scalable backend solutions.",
      "Assisted in API integrations and performance optimization.",
    ],
    tags: ["PHP", "WordPress", "MySQL", "APIs"],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  url?: string; // live site link
  image?: string; // screenshot in /public, e.g. "/projects/site.png"
};

export const projects: Project[] = [
  {
    title: "Candibots",
    category: "Live Website",
    description:
      "Client website built and maintained by me — backend development, performance optimization and security hardening.",
    highlights: ["Backend development", "Speed optimization", "Security & malware protection"],
    tags: ["WordPress", "PHP", "Optimization", "Security"],
    url: "https://candibots.com/",
    image: "/projects/candibots.png",
  },
  {
    title: "Custom CRM Plugin for a Legal Firm",
    category: "WordPress Plugin",
    description:
      "A GDPR-compliant CRM plugin that centralises client records and automates scheduling and outreach for a legal practice.",
    highlights: ["GDPR-compliant data handling", "Google Calendar integration", "Mailchimp sync"],
    tags: ["PHP", "WP REST API", "Google API", "Mailchimp"],
  },
  {
    title: "E-Commerce Subscription System",
    category: "WooCommerce · SaaS",
    description:
      "Recurring billing engine and self-service account tools built on WooCommerce for a SaaS platform.",
    highlights: ["Recurring billing", "User account dashboard", "Payment gateway integration"],
    tags: ["WooCommerce", "PHP", "MySQL", "Payments"],
  },
  {
    title: "Enterprise Multisite Network",
    category: "WordPress Multisite",
    description:
      "A WordPress multisite network for a university, with 20+ subsites, custom roles and shared governance.",
    highlights: ["20+ subsites", "Custom roles & capabilities", "Centralised management"],
    tags: ["Multisite", "PHP", "Security", "WP-CLI"],
  },
  {
    title: "Python Automation & API Toolkit",
    category: "Python · Learning",
    description:
      "Personal learning project: practising Python with REST APIs, scrapers and small automation scripts.",
    highlights: ["FastAPI / Django REST", "Task automation", "Data processing"],
    tags: ["Python", "FastAPI", "Django", "Pandas"],
  },
];

export const skillGroups = [
  { title: "Languages", items: ["PHP", "Python", "JavaScript", "HTML5", "CSS3", "SQL"] },
  { title: "CMS / Frameworks", items: ["WordPress Core", "Themes", "Plugins", "WooCommerce", "ACF"] },
  { title: "Python Stack", items: ["Django", "FastAPI", "Flask", "Pandas", "Automation"] },
  { title: "Databases", items: ["MySQL", "MariaDB", "PostgreSQL"] },
  { title: "APIs", items: ["RESTful APIs", "WP REST API", "GraphQL (basic)"] },
  { title: "Tools", items: ["Git", "Docker", "Composer", "WP-CLI", "Postman"] },
  {
    title: "Hosting / DevOps",
    items: ["cPanel", "Cloudways", "Kinsta", "DigitalOcean", "AWS EC2", "AWS S3", "GoDaddy", "GitHub Actions"],
  },
  {
    title: "Security & Recovery",
    items: ["Hacked Site Recovery", "Malware Removal", "Backdoor Cleanup", "Blacklist Removal", "Security Hardening", "Firewall / WAF"],
  },
  { title: "Optimization", items: ["Speed Optimization", "Core Web Vitals", "Caching / CDN", "Database Optimization"] },
  { title: "Other", items: ["SEO", "CI/CD"] },
];

export const proficiency = [
  { name: "WordPress / PHP", level: 95 },
  { name: "MySQL / MariaDB", level: 88 },
  { name: "WooCommerce", level: 90 },
  { name: "REST API Integration", level: 90 },
  { name: "Python", level: 70 },
  { name: "DevOps / Hosting", level: 78 },
  { name: "Hacked Site Recovery & Malware Removal", level: 90 },
  { name: "Speed Optimization", level: 90 },
];

export const services = [
  {
    title: "Custom WordPress Plugins",
    text: "Purpose-built plugins that extend WordPress cleanly, securely and without bloat.",
  },
  {
    title: "WooCommerce & Subscriptions",
    text: "Stores, recurring billing, payment gateways and custom checkout flows.",
  },
  {
    title: "Speed Optimization",
    text: "Core Web Vitals, caching, CDN and database tuning — measurably faster sites.",
  },
  {
    title: "Hacked Site Recovery",
    text: "Site hacked? I clean malware and backdoors, restore the site and get it off blacklists — fast.",
  },
  {
    title: "Malware Removal & Security",
    text: "Malware scans, firewall setup and security hardening so it doesn't happen again.",
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Panjab University, Chandigarh",
  year: "Graduated 2018",
};

export const interests = ["Cooking", "Reading", "Playing Football", "Trekking"];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

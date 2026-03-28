import Link from "next/link";
import { Sora } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  FileText,
  Globe2,
  LayoutDashboard,
  Mail,
  Megaphone,
  Search,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import DigiGrowOrbitalScene from "@/components/marketing/DigiGrowOrbitalScene";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ValueCard = {
  title: string;
  description: string;
};

type DigiGrowDetail = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type PricingPlan = {
  name: string;
  price: string;
  summary: string;
  features: string[];
};

const services: Service[] = [
  {
    title: "Search visibility",
    description:
      "SEO foundations, local search optimization, and structured content that help the right people find you sooner.",
    icon: Search,
  },
  {
    title: "Paid campaigns",
    description:
      "Google and paid social campaigns built around sharper offers, tighter targeting, and clearer reporting.",
    icon: Target,
  },
  {
    title: "Social content",
    description:
      "Platform-aware creative and messaging systems that help your brand stay active, credible, and recognizable.",
    icon: Megaphone,
  },
  {
    title: "Website strategy",
    description:
      "Conversion-minded websites and landing pages that make DigiGrow clients look more established online.",
    icon: Globe2,
  },
  {
    title: "Reporting clarity",
    description:
      "Simple dashboards and recurring updates so the work feels visible, accountable, and easy to explain.",
    icon: BarChart3,
  },
  {
    title: "Retention support",
    description:
      "Email touchpoints, remarketing, and follow-up systems that keep your brand top of mind after the first click.",
    icon: Mail,
  },
];

const valueCards: ValueCard[] = [
  {
    title: "Business-first clarity",
    description:
      "DigiGrow is built to make your offer easier to understand, buy from, and trust before a proposal is even opened.",
  },
  {
    title: "Execution with proof",
    description:
      "Websites, campaigns, content, and reporting live in the same growth rhythm so results do not feel disconnected.",
  },
  {
    title: "Systems, not chaos",
    description:
      "Client portal access, invoicing, mobile visibility, and cleaner workflows make the experience feel premium end to end.",
  },
];

const digigrowDetails: DigiGrowDetail[] = [
  {
    title: "Public-facing presence",
    description:
      "A polished brand website, service pages, and landing pages that help DigiGrow clients look more established online.",
    icon: Globe2,
  },
  {
    title: "Client portal and billing",
    description:
      "Updates, invoices, and progress stay visible in one place so communication feels proactive instead of reactive.",
    icon: LayoutDashboard,
  },
  {
    title: "AI-assisted proposals",
    description:
      "Discovery and proposal support can move faster without reducing the quality of the conversation.",
    icon: FileText,
  },
  {
    title: "Mobile-ready visibility",
    description:
      "DigiGrow is not limited to desktop. The experience can travel with the team and the client as the work moves.",
    icon: Smartphone,
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Visibility",
    price: "From $799/mo",
    summary:
      "For local businesses that need a stronger first impression, website polish, and more visible monthly progress.",
    features: [
      "Website refresh and conversion cleanup",
      "Local SEO and Google Business support",
      "Monthly reporting and action planning",
    ],
  },
  {
    name: "Lead Engine",
    price: "From $1,500/mo",
    summary:
      "For teams that want more inquiries through landing pages, paid campaigns, and a clearer lead-generation system.",
    features: [
      "Landing page and funnel support",
      "Paid campaign setup and optimization",
      "Lead tracking with shared client visibility",
    ],
  },
  {
    name: "Growth Operating System",
    price: "From $2,500/mo",
    summary:
      "For ambitious brands ready to combine SEO, content, campaigns, reporting, and client visibility in one rhythm.",
    features: [
      "SEO, content, paid media, and reporting",
      "Monthly strategy and priority planning",
      "Portal access, invoicing, and delivery visibility",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Clarify the offer",
    description:
      "We tighten what the business is selling, who it is for, and what a stronger online first impression should feel like.",
  },
  {
    step: "02",
    title: "Build the growth system",
    description:
      "Website updates, campaigns, reporting, and content get aligned before spend and effort scatter in different directions.",
  },
  {
    step: "03",
    title: "Launch with visibility",
    description:
      "DigiGrow clients can see what is shipping, what is working, and what is next instead of guessing behind the scenes.",
  },
  {
    step: "04",
    title: "Refine and scale",
    description:
      "We review patterns, improve offers, and keep compounding the channels that are actually moving the business.",
  },
];

const industries = [
  "Local services",
  "Professional firms",
  "Health and wellness",
  "Real estate teams",
  "Hospitality brands",
  "Modern ecommerce",
];

const platformPillars = [
  "Websites",
  "Search",
  "Paid media",
  "Content",
  "Reporting",
  "Client portal",
  "AI proposals",
  "Mobile access",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,210,255,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,143,77,0.14),transparent_20%),linear-gradient(180deg,#050814_0%,#091121_40%,#050916_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      <div className="pointer-events-none absolute left-1/4 top-24 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-sm font-semibold tracking-[0.3em] text-cyan-200">
              DG
            </div>
            <div>
              <p className={`${sora.className} text-sm font-semibold tracking-[0.28em] text-white`}>
                DIGIGROW SOLUTIONS
              </p>
              <p className="text-xs text-slate-400">Business-first digital marketing and client visibility.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <Link href="/pricing" className="transition hover:text-white">
              Pricing
            </Link>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#process" className="transition hover:text-white">
              Process
            </a>
            <a href="#platform" className="transition hover:text-white">
              DigiGrow
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white sm:inline-flex"
            >
              Client login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-18 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="grid gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="animate-fade-in space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Built for businesses that want their marketing to feel sharper and more organized
            </span>

            <div className="space-y-6">
              <h1 className={`${sora.className} max-w-[11ch] text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-[5.15rem]`}>
                DigiGrow turns digital marketing into one clear growth system.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                We combine strategy, websites, search, paid campaigns, content, reporting, client
                visibility, and mobile access so the business feels stronger at every touchpoint.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Start with DigiGrow
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/35 hover:bg-white/5"
              >
                See pricing
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Core stack</p>
                <p className="mt-3 text-lg font-semibold text-white">Web, search, paid, content, reporting</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Client layer</p>
                <p className="mt-3 text-lg font-semibold text-white">Portal, invoices, and visible progress</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Delivery edge</p>
                <p className="mt-3 text-lg font-semibold text-white">AI proposals and mobile-ready access</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <DigiGrowOrbitalScene />
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-slate-950/35">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6 py-6 lg:px-10">
          {platformPillars.map((pillar) => (
            <span
              key={pillar}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200"
            >
              {pillar}
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">About DigiGrow</p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              A more proper digital presence starts with better positioning and better systems.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              DigiGrow Solutions is for businesses that are done with random marketing tasks. The
              goal is not just to post more or spend more, but to create a sharper public presence
              and a cleaner operating system behind it.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              That means your website, campaigns, reporting, billing, and client communication all
              feel connected. The business looks more premium because the delivery feels more
              intentional.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {valueCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-7"
              >
                <p className={`${sora.className} text-2xl font-semibold text-white`}>{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Services</p>
          <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
            Everything DigiGrow needs to make a brand look stronger and perform better.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            The service mix is designed to improve how a business is discovered, evaluated, and
            chosen. That keeps the strategy practical and the website easier to sell from.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"
            >
              <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className={`${sora.className} mt-6 text-2xl font-semibold text-white`}>
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-cyan-300/20 bg-cyan-300/8 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Inside DigiGrow</p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              More than a website. A client-facing growth experience.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              DigiGrow is designed so the public site and the operating layer support each other.
              Visitors see a sharper business. Clients feel a smoother delivery process once they
              come in.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Public-facing positioning that looks more premium",
                "Portal access for updates, invoices, and clarity",
                "AI-assisted proposal flow for cleaner early conversations",
                "Mobile access that keeps the experience available beyond desktop",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {digigrowDetails.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className={`${sora.className} mt-5 text-2xl font-semibold text-white`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Pricing</p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              DigiGrow offers built the way businesses actually buy marketing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Clear entry points make the business feel easier to understand. They also make the site
              feel more proper because visitors can see how the work is structured without guessing.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/35 hover:bg-white/5 sm:self-auto"
          >
            View pricing details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-[30px] border p-7 transition duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-cyan-300/35 bg-cyan-300/10 shadow-[0_18px_70px_rgba(0,210,255,0.08)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {plan.name}
              </p>
              <p className={`${sora.className} mt-4 text-4xl font-semibold text-white`}>
                {plan.price}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.summary}</p>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                    <p className="text-sm leading-7 text-slate-200">{feature}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Process</p>
          <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
            A clearer DigiGrow process means the brand sells better and the work feels easier to trust.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className={`${sora.className} text-4xl font-semibold text-cyan-200`}>{step.step}</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-4 lg:px-10">
        <div className="rounded-[36px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(0,210,255,0.12),rgba(255,255,255,0.05),rgba(255,143,77,0.12))] p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            Build the brand and the operating layer together
          </p>
          <h2 className={`${sora.className} mt-5 text-4xl font-semibold text-white sm:text-5xl`}>
            DigiGrow should look premium before the first call and feel organized after it.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            This version of the site pushes DigiGrow closer to that standard with sharper messaging,
            more detail about the platform, clearer offers, and a stronger visual identity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Start with DigiGrow
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Review pricing
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className={`${sora.className} text-white`}>DigiGrow Solutions</p>
            <p className="mt-1">
              Business-first digital marketing, client visibility, and a sharper online presence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <Link href="/pricing" className="transition hover:text-white">
              Pricing
            </Link>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#platform" className="transition hover:text-white">
              DigiGrow
            </a>
            <Link href="/login" className="transition hover:text-white">
              Login
            </Link>
            <Link href="/register" className="transition hover:text-white">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

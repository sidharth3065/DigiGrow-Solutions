import Link from "next/link";
import { Sora } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Globe2,
  LayoutDashboard,
  Mail,
  Megaphone,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Highlight = {
  eyebrow: string;
  title: string;
  description: string;
};

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  audience: string;
  features: string[];
};

const services: Service[] = [
  {
    title: "Search visibility",
    description:
      "SEO foundations, local search optimization, and content structures that help the right people find you first.",
    icon: Search,
  },
  {
    title: "Paid campaigns",
    description:
      "Google and paid social campaigns built around clear offers, tighter targeting, and better lead quality.",
    icon: Target,
  },
  {
    title: "Social content",
    description:
      "Platform-aware creative, posting systems, and messaging that keeps your brand active and recognizable.",
    icon: Megaphone,
  },
  {
    title: "Website strategy",
    description:
      "Fast, conversion-minded websites and landing pages that turn attention into inquiries and booked calls.",
    icon: Globe2,
  },
  {
    title: "Reporting clarity",
    description:
      "Simple dashboards and recurring updates so you always know what is shipping, what is working, and what is next.",
    icon: BarChart3,
  },
  {
    title: "Retention support",
    description:
      "Email touchpoints, remarketing, and follow-up systems that help you stay top of mind after the first click.",
    icon: Mail,
  },
];

const highlights: Highlight[] = [
  {
    eyebrow: "Built for clarity",
    title: "Marketing should feel accountable, not mysterious.",
    description:
      "We combine strategy, execution, and reporting in one rhythm so clients are never left wondering what is being worked on.",
  },
  {
    eyebrow: "Built for momentum",
    title: "Small improvements across every channel compound fast.",
    description:
      "From campaigns and content to landing pages and analytics, we tighten each part of the customer journey instead of treating growth like a one-off tactic.",
  },
  {
    eyebrow: "Built for partnership",
    title: "You get a team that can explain the work, not just ship it.",
    description:
      "We care about education and trust. That means direct communication, cleaner decisions, and fewer handoff gaps.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover the real growth constraint",
    description:
      "We look at your offer, audience, funnel, and current traffic sources to find the first meaningful leverage point.",
  },
  {
    step: "02",
    title: "Build the message and channel plan",
    description:
      "We shape the positioning, campaign priorities, content angles, and landing page direction before spend starts.",
  },
  {
    step: "03",
    title: "Launch with feedback loops",
    description:
      "Creative, campaigns, tracking, and website updates ship in a shared system so the work is visible and measurable.",
  },
  {
    step: "04",
    title: "Refine every month",
    description:
      "We review patterns, adjust the plan, and keep compounding what the market is actually responding to.",
  },
];

const industries = [
  "Local service businesses",
  "Professional firms",
  "Health and wellness brands",
  "Real estate and property teams",
  "Hospitality and food",
  "Modern ecommerce brands",
];

const faqs = [
  {
    question: "Do you only run ads?",
    answer:
      "No. We work across websites, SEO, social content, paid campaigns, reporting, and retention so your marketing feels connected.",
  },
  {
    question: "Can clients track progress?",
    answer:
      "Yes. The portal already built into this platform gives clients visibility into updates, invoices, and account activity.",
  },
  {
    question: "Is this a fit for smaller businesses?",
    answer:
      "Yes. The operating style is especially strong for local brands and growing teams that need structure without hiring a full in-house department.",
  },
  {
    question: "What makes DigiGrow different?",
    answer:
      "We focus on clarity, consistency, and conversion. The goal is not to overwhelm you with jargon, but to make progress obvious.",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Visibility",
    price: "From $799/mo",
    audience: "For local businesses that need a stronger first impression and a clearer online presence.",
    description:
      "A focused engagement for brands that need website polish, local search visibility, and consistent monthly reporting.",
    features: [
      "Website refresh and conversion cleanup",
      "Google Business Profile and local SEO basics",
      "Monthly reporting and action plan",
    ],
  },
  {
    name: "Lead Engine",
    price: "From $1,500/mo",
    audience: "For teams that want steady inquiries through landing pages, ads, and follow-up visibility.",
    description:
      "A growth package built around generating better leads and turning paid traffic into booked conversations.",
    features: [
      "Landing page and funnel support",
      "Paid campaign setup and optimization",
      "Lead tracking with shared client visibility",
    ],
  },
  {
    name: "Growth Operating System",
    price: "From $2,500/mo",
    audience: "For ambitious brands that need SEO, campaigns, content, reporting, and a stronger operating rhythm.",
    description:
      "A higher-touch partnership for businesses ready to compound growth across multiple channels instead of relying on one tactic.",
    features: [
      "SEO, content, paid media, and reporting",
      "Monthly strategy and priority planning",
      "Portal access for updates, invoices, and delivery visibility",
    ],
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,210,255,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,143,77,0.16),transparent_24%),linear-gradient(180deg,#04070f_0%,#0b1020_44%,#070b16_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-sm font-semibold tracking-[0.3em] text-cyan-200">
              DG
            </div>
            <div>
              <p className={`${sora.className} text-sm font-semibold tracking-[0.28em] text-white`}>
                DIGIGROW SOLUTIONS
              </p>
              <p className="text-xs text-slate-400">Digital marketing, websites, and client visibility.</p>
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
            <a href="#portal" className="transition hover:text-white">
              Portal
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

      <section className="relative mx-auto max-w-7xl px-6 pb-18 pt-16 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="animate-fade-in space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Sparkles className="h-4 w-4" />
              For brands that want sharper growth and cleaner communication
            </span>

            <div className="space-y-6">
              <h1 className={`${sora.className} max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl`}>
                We build digital marketing systems people can actually trust.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                DigiGrow Solutions helps businesses look sharper online, attract better leads, and
                stay aligned through strategy, websites, content, campaigns, and transparent
                reporting.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/5"
              >
                Learn how we work
              </a>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-semibold text-white">5</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  connected growth channels under one roof
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-semibold text-white">1</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  shared portal for updates, invoices, and visibility
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-semibold text-white">Weekly</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  communication rhythms that keep decisions moving
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in lg:justify-self-end">
            <div className="absolute -left-8 top-12 h-32 w-32 rounded-full bg-orange-400/20 blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/75 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Growth stack</p>
                  <p className={`${sora.className} mt-2 text-2xl font-semibold text-white`}>
                    Strategy with execution attached
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Always visible
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {services.slice(0, 4).map((service) => (
                  <div
                    key={service.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]"
                  >
                    <service.icon className="h-5 w-5 text-cyan-200" />
                    <h2 className="mt-4 text-lg font-semibold text-white">{service.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-300/12 via-white/6 to-orange-300/12 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Client experience included</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Your website, campaigns, and communication can all point back to one clear operating system.
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
                  >
                    Open portal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Services</p>
          <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
            Everything people need to understand your brand and choose you faster.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            We do not treat your marketing like disconnected tasks. We build the system around how
            prospects discover you, evaluate you, and finally reach out.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"
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

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Pricing</p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              Offers built the way businesses actually buy marketing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Instead of vague custom retainers from day one, we position the work through clear
              entry points. That makes the site easier to understand and the sales conversation much
              easier to start.
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
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.audience}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.description}</p>

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

      <section id="about" className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
              About us
            </p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              We help ambitious brands look more established than their size.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              DigiGrow Solutions exists for companies that need a stronger online presence without
              being buried under agency jargon. We focus on practical strategy, clean creative, and
              reporting that makes the work legible.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The goal is simple: make your digital presence feel more intentional, more credible,
              and more likely to convert the right visitor into a real conversation.
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

          <div className="grid gap-5">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  {item.eyebrow}
                </p>
                <h3 className={`${sora.className} mt-3 text-2xl font-semibold text-white`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Process</p>
          <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
            A growth process that keeps strategy, execution, and communication tied together.
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

      <section id="portal" className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[32px] border border-cyan-300/20 bg-cyan-300/8 p-8">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              Built into the platform
            </div>
            <h2 className={`${sora.className} mt-5 text-4xl font-semibold text-white sm:text-5xl`}>
              Clients do not just get deliverables. They get visibility.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              This website now leads into the same ecosystem your team already uses. That means
              prospects can learn about the company publicly, then move into a structured portal
              experience once they become clients.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <LayoutDashboard className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-lg font-semibold text-white">Account visibility</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Project status, service updates, and billing in one place.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <Workflow className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-lg font-semibold text-white">Cleaner handoffs</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Your team and your clients stay aligned on what is happening next.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <Users className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-lg font-semibold text-white">Stronger trust</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Visibility makes the relationship feel proactive instead of reactive.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
                  Why teams choose us
                </p>
                <h3 className={`${sora.className} mt-3 text-3xl font-semibold text-white`}>
                  Clear enough for clients, sharp enough for growth teams
                </h3>
              </div>
              <BadgeCheck className="hidden h-8 w-8 text-cyan-200 sm:block" />
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Messaging, campaigns, and website experience are planned together instead of in isolation.",
                "The public site can now explain your value before prospects ever touch the portal.",
                "Existing login and registration flows remain available for active clients and your internal team.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-white/10 bg-slate-950/75 p-4"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Become a client
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/35 hover:bg-white/5"
              >
                Open client portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-cyan-300/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">FAQ</p>
              <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
                A website people can browse, and a platform clients can keep using.
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[28px] border border-white/10 bg-slate-950/75 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4 lg:px-10">
        <div className="rounded-[36px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(0,210,255,0.12),rgba(255,255,255,0.05),rgba(255,143,77,0.12))] p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            Ready for the public-facing version of your company?
          </p>
          <h2 className={`${sora.className} mt-5 text-4xl font-semibold text-white sm:text-5xl`}>
            Your website should explain the value before the sales call even starts.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            DigiGrow Solutions now has a homepage designed for visitors, while your existing portal
            routes stay available for active clients and internal operations.
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
              href="/login"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Existing client login
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className={`${sora.className} text-white`}>DigiGrow Solutions</p>
            <p className="mt-1">Digital marketing, websites, and client-ready visibility.</p>
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
            <a href="#process" className="transition hover:text-white">
              Process
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

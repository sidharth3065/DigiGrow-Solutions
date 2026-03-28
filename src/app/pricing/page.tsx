import type { Metadata } from "next";
import Link from "next/link";
import { Sora } from "next/font/google";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pricing | DigiGrow Solutions",
  description:
    "Explore DigiGrow Solutions pricing for website growth, lead generation, and full-service digital marketing support.",
};

const plans = [
  {
    name: "Starter Visibility",
    price: "$799/mo",
    badge: "Entry point",
    description:
      "For businesses that need a stronger online presence before they spend heavily on growth.",
    features: [
      "Website cleanup and conversion tuning",
      "Local SEO and Google Business Profile support",
      "Monthly reporting and next-step recommendations",
      "Portal access for delivery visibility",
    ],
  },
  {
    name: "Lead Engine",
    price: "$1,500/mo",
    badge: "Most practical",
    description:
      "For teams that want a repeatable flow of inquiries through landing pages, paid campaigns, and tighter messaging.",
    features: [
      "Landing page and funnel support",
      "Google or paid social campaign management",
      "Lead tracking and reporting visibility",
      "Monthly optimization and offer testing",
    ],
  },
  {
    name: "Growth Operating System",
    price: "$2,500+/mo",
    badge: "Highest touch",
    description:
      "For brands ready to grow across SEO, content, paid media, and reporting with a more strategic operating rhythm.",
    features: [
      "SEO, content, paid media, and reporting",
      "Priority planning and monthly strategy sessions",
      "Portal access for projects, billing, and visibility",
      "Deeper channel coordination and campaign refinement",
    ],
  },
];

const addOns = [
  "Additional landing pages or microsites",
  "Email nurture and retention campaigns",
  "AI proposal and audit support",
  "Extra locations or multi-branch campaigns",
  "White-label client portal setup",
  "Mobile access for client teams",
];

const faqs = [
  {
    question: "Are these prices fixed?",
    answer:
      "These are starting prices designed to make the offer easy to understand. Final scope can move based on channel count, ad spend, and turnaround expectations.",
  },
  {
    question: "Is ad spend included?",
    answer:
      "No. Media spend is usually separate from management and strategy so campaign budgets stay transparent.",
  },
  {
    question: "Do clients get portal access on every plan?",
    answer:
      "Yes. Visibility is part of the value. Clients should be able to see updates, invoices, and progress without chasing your team for answers.",
  },
  {
    question: "Can this expand into a custom plan later?",
    answer:
      "Yes. These packages are meant to make the first buying decision easier, not box the relationship in forever.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,210,255,0.2),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,143,77,0.15),transparent_24%),linear-gradient(180deg,#050812_0%,#0a1120_44%,#060a13_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

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
              <p className="text-xs text-slate-400">Business-focused digital marketing offers.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/#services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/pricing" className="text-white">
              Pricing
            </Link>
            <Link href="/#portal" className="transition hover:text-white">
              Portal
            </Link>
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

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-18 lg:px-10 lg:pb-22 lg:pt-22">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Clear offers convert better than vague retainers
          </span>
          <h1 className={`${sora.className} mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl`}>
            Pricing designed to make your business easier to buy from.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            These plans frame DigiGrow Solutions as a real business with clear starting points,
            visible delivery, and room to scale up once the relationship proves itself.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-[32px] border p-8 transition duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-cyan-300/35 bg-cyan-300/10 shadow-[0_18px_70px_rgba(0,210,255,0.08)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  {plan.name}
                </p>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {plan.badge}
                </span>
              </div>

              <p className={`${sora.className} mt-6 text-5xl font-semibold text-white`}>
                {plan.price}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-300">{plan.description}</p>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                    <p className="text-sm leading-7 text-slate-200">{feature}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Start with this plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Add-ons</p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              The upsells that increase revenue without muddying the core offer.
            </h2>
            <div className="mt-8 grid gap-3">
              {addOns.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-4 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
              How deals start
            </p>
            <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
              A simple business flow beats a confusing proposal every time.
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Choose the nearest-fit package so the budget conversation starts clearly.",
                "Use discovery to adjust scope, not to invent the entire offer from zero.",
                "Move accepted clients into the portal so delivery looks premium from day one.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/75 p-4"
                >
                  <div className={`${sora.className} text-2xl font-semibold text-cyan-200`}>
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="rounded-[36px] border border-white/10 bg-slate-950/70 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">FAQ</p>
              <h2 className={`${sora.className} mt-4 text-4xl font-semibold text-white sm:text-5xl`}>
                Pricing is clearer when expectations are visible.
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
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
            Build the business side and the operations side together
          </p>
          <h2 className={`${sora.className} mt-5 text-4xl font-semibold text-white sm:text-5xl`}>
            A better public offer makes the whole app easier to monetize.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            When visitors understand the offer quickly, your portal stops feeling like an internal
            tool and starts becoming part of the business experience you sell.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className={`${sora.className} text-white`}>DigiGrow Solutions</p>
            <p className="mt-1">Business-ready digital marketing offers with client visibility built in.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/pricing" className="transition hover:text-white">
              Pricing
            </Link>
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

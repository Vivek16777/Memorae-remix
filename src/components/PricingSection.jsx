import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const PLANS = [
  {
    key: "pro",
    name: "Pro",
    monthly: 4.99,
    annual: 2.99,
    note: "12 months for 35.88 $ (59.92 $)",
    badge: null,
    cta: "Try for Free",
    features: ["Basic reminders", "Calendar sync", "WhatsApp capture"],
  },
  {
    key: "supernova",
    name: "Supernova",
    monthly: 14.99,
    annual: 8.99,
    note: "12 months for 107.88 $ (180.16 $)",
    badge: "Most popular",
    cta: "Try for Free",
    features: ["Unlimited reminders", "Priority support", "Advanced AI"],
  },
  {
    key: "lifetime",
    name: "Lifetime",
    monthly: 0,
    annual: 199.0,
    note: "Save over 900 $ in 5 years",
    badge: "One-time payment",
    cta: "Activate Now",
    features: ["All features", "Lifetime access", "VIP support"],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("annual");
  const plans = useMemo(
    () =>
      PLANS.map((p) => {
        if (p.key === "lifetime") {
          return { ...p, display: p.annual, unit: "$" };
        }
        return {
          ...p,
          display: billing === "monthly" ? p.monthly : p.annual,
          unit: "$",
        };
      }),
    [billing]
  );

  const handleToggle = (mode) => setBilling(mode);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500" />

      <div className="pointer-events-none hidden lg:block absolute right-8 top-8 z-10 transform hover:rotate-6 transition-transform"></div>

      <div className="container mx-auto px-6 pt-24 pb-20 relative z-20">
        <header className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Your chaos, your plan
          </h2>
          <p className="mt-3 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Choose how you want Memorae to help you — monthly flexibility or the
            best value with annual billing.
          </p>
        </header>

        <div className="flex items-center justify-center mb-10">
          <div
            role="tablist"
            aria-label="Billing period"
            className="inline-flex items-center bg-white/6 rounded-full p-1"
          >
            <button
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => handleToggle("monthly")}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors focus:outline-none ${
                billing === "monthly"
                  ? "bg-white text-slate-900 font-medium"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              Monthly
            </button>

            <button
              role="tab"
              aria-selected={billing === "annual"}
              onClick={() => handleToggle("annual")}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors flex items-center gap-2 focus:outline-none ${
                billing === "annual"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              Annual
              <span className="ml-1 inline-block rounded-full bg-emerald-400 text-slate-900 text-xs font-semibold px-2 py-0.5">
                -40%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 items-stretch">
          {plans.map((p) => {
            const isPopular =
              p.badge === "Most popular" ||
              p.badge === "Most popular" ||
              p.badge === "Most popular";
            return (
              <motion.article
                key={p.key}
                initial={{ y: 8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={`relative overflow-hidden rounded-2xl p-6 md:p-8 shadow-2xl
                  ${isPopular ? "bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-black/80 border border-white/6" : "bg-slate-900/60 border border-white/6"}
                  `}
                aria-labelledby={`plan-${p.key}`}
              >
                {p.badge && (
                  <div
                    className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${isPopular ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-amber-300 text-slate-900"}`}
                  >
                    {p.badge}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 id={`plan-${p.key}`} className="text-xl font-semibold">
                      {p.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 hidden md:block">
                      {p.note}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-4">
                  <div className="text-4xl md:text-5xl font-extrabold leading-none flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl">$</span>
                    <motion.span
                      key={`${p.key}-${billing}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="tabular-nums"
                    >
                      {p.display.toFixed(2)}
                    </motion.span>
                    <span className="text-sm text-slate-400 ml-1">
                      {" "}
                      {p.key === "lifetime"
                        ? ""
                        : billing === "monthly"
                          ? " / month"
                          : " / month"}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-300">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 text-amber-400">★</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 md:mt-8">
                  <button
                    className={`w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-full font-semibold transition-shadow ${
                      isPopular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                        : "bg-white/8 hover:bg-white/12 text-white"
                    }`}
                    aria-label={`${p.cta} for ${p.name}`}
                  >
                    {p.cta}
                  </button>

                  <div className="mt-3 text-xs text-slate-400 hidden md:block">
                    {p.note}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-300">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))",
        }}
      />
    </section>
  );
}

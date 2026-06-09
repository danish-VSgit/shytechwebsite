"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, ArrowRight, Zap } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { pricingPlans } from "@/lib/data/pricing";

export default function PricingSection() {
  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container-width">
        <SectionHeader
          badge="Investment"
          title="Clear, Honest"
          titleHighlight="Pricing"
          subtitle="Choose the plan that matches your event scale. All plans include a dedicated coordinator and full transparency."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-500 ${
                plan.isPopular
                  ? "border-2 border-[#2563EB] bg-white shadow-[0_20px_60px_rgba(37,99,235,0.15)]"
                  : "border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 hover:shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] flex items-center gap-1.5 shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
                  <Zap className="w-3 h-3 text-white fill-white" />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.isPopular && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#eff6ff]/60 to-transparent pointer-events-none" />
              )}

              <div className="mb-6 relative">
                <h3 className="text-lg font-bold text-[#0f172a] mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{plan.name}</h3>
                <p className="text-xs text-[#64748b]">{plan.tagline}</p>
              </div>

              <div className="mb-7 relative">
                <div className="text-xs text-[#94a3b8] mb-1">{plan.priceNote}</div>
                <div className="text-4xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-base font-normal text-[#64748b]">/event</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8 relative">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#10B981] stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-[#cbd5e1] stroke-[2.5]" />
                      </div>
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-[#334155]" : "text-[#94a3b8]"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`relative w-full text-center py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.isPopular
                    ? "btn-primary"
                    : "border border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]/50 hover:text-[#2563EB] hover:bg-[#eff6ff]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#94a3b8] mt-8"
        >
          All prices are starting points. Final pricing depends on event scale, location, and requirements.{" "}
          <Link href="/contact" className="text-[#2563EB] hover:underline font-medium">
            Get a custom quote.
          </Link>
        </motion.p>
      </div>
    </section>
  );
}

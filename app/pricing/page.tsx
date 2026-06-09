import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, MessageCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { pricingPlans } from "@/lib/data/pricing";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, honest pricing for every scale of event. Starter, Professional, and Enterprise plans with no hidden charges.",
};

export default function PricingPage() {
  const pricingFaqs = faqs.filter((f) => f.category === "Pricing" || f.category === "Booking");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Investment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Honest, Transparent{" "}
            <span className="accent-text">Pricing</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            No surprises. No hidden fees. Just clear packages that deliver exceptional value at every level.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 bg-[#f8fafc]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-500 ${
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#eff6ff]/50 to-transparent pointer-events-none" />
                )}

                <div className="mb-6 relative">
                  <h3 className="text-xl font-bold text-[#0f172a] mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{plan.name}</h3>
                  <p className="text-sm text-[#64748b]">{plan.tagline}</p>
                </div>

                <div className="mb-8 relative">
                  <div className="text-xs text-[#94a3b8] mb-1">{plan.priceNote}</div>
                  <div className="text-5xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-lg font-normal text-[#64748b]">/event</span>
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
                        className={`text-sm ${feature.included ? "text-[#334155]" : "text-[#94a3b8]"}`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`relative w-full text-center py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? "btn-primary"
                      : "border border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]/50 hover:text-[#2563EB] hover:bg-[#eff6ff]"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom / Enterprise CTA */}
      <section className="py-16 border-y border-[#E2E8F0] bg-white">
        <div className="container-width flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Need something completely <span className="accent-text">custom?</span>
            </h2>
            <p className="text-[#475569]">
              Multi-day festivals, destination events, international productions — we build bespoke packages for every scale.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20bd5c] transition-colors shadow-[0_4px_14px_rgba(37,211,102,0.25)]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <Link href="/contact" className="btn-primary text-sm">
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-width">
          <SectionHeader
            badge="Questions"
            title="Pricing"
            titleHighlight="FAQs"
            subtitle="Common questions about our pricing, cancellation policy, and how we handle custom scopes."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {pricingFaqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl p-6 border border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-base font-semibold text-[#0f172a] mb-3">{faq.question}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

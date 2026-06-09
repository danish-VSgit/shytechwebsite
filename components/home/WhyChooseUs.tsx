"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2, Users, Palette, Clock, DollarSign, UserCheck,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const benefits = [
  {
    icon: CheckCircle2,
    title: "End-to-End Management",
    description:
      "We handle every detail from venue sourcing and vendor management to on-day coordination and post-event wrap-up. You focus on the moment.",
  },
  {
    icon: Users,
    title: "Professional Team",
    description:
      "A curated team of event specialists, cinematographers, editors, and digital strategists — each an expert in their domain.",
  },
  {
    icon: Palette,
    title: "Creative Storytelling",
    description:
      "We don't just document events. We craft narratives that stir emotions, build brands, and leave audiences wanting more.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We respect your timeline as much as you do. All deliverables — from edited films to social content — are delivered on schedule.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden costs. No surprise invoices. Every quote is itemized and every additional request is approved before action.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Project Manager",
    description:
      "One point of contact for everything. Your project manager ensures seamless coordination across all services and vendors.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#06B6D4]/6 blur-[80px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-60 h-60 rounded-full bg-[#2563EB]/5 blur-[80px] pointer-events-none" />

      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Header + Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">
                Why SHYTECH
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              The Standard Others{" "}
              <span className="accent-text">Aspire to Reach</span>
            </h2>
            <p className="text-[#475569] leading-relaxed mb-8 text-lg">
              In an industry where mediocre is common, we operate on a different
              standard. Every project we take is treated as if our reputation
              depends on it — because it does.
            </p>

            {/* Visual stats card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              <div className="grid grid-cols-3 gap-4 divide-x divide-[#f1f5f9]">
                {[
                  { value: "98%", label: "Client satisfaction" },
                  { value: "500+", label: "Events delivered" },
                  { value: "0", label: "Missed deadlines" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center px-2">
                    <div className="text-2xl font-bold accent-text" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{stat.value}</div>
                    <div className="text-xs text-[#64748b] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0f172a] mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-[#64748b] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

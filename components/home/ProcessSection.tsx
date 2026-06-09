"use client";

import { motion } from "framer-motion";
import {
  MessageSquare, ClipboardList, Clapperboard, Film, PartyPopper,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We begin with a deep-dive discovery session to understand your vision, goals, audience, and budget. No templates — just listening.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Planning",
    description:
      "We build a comprehensive project blueprint: timeline, vendor selection, logistics, creative direction, and budget allocation.",
  },
  {
    number: "03",
    icon: Clapperboard,
    title: "Execution",
    description:
      "On the day, our team orchestrates every element with military precision — so you can enjoy the moment, not manage it.",
  },
  {
    number: "04",
    icon: Film,
    title: "Production",
    description:
      "Our media team captures every detail with cinematic quality, while our editors craft your story in post-production.",
  },
  {
    number: "05",
    icon: PartyPopper,
    title: "Delivery",
    description:
      "We deliver all final assets — edited films, photos, social content — on time and with full handover documentation.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container-width">
        <SectionHeader
          badge="How We Work"
          title="Our Proven"
          titleHighlight="Process"
          subtitle="A transparent, client-first workflow refined across 500+ successful projects."
        />

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#2563EB]/25 to-transparent" />

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon with number */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#E2E8F0] flex items-center justify-center relative z-10 group-hover:border-[#2563EB]/40 group-hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center shadow-[0_4px_10px_rgba(37,99,235,0.4)]">
                      <span className="text-[10px] font-bold text-white">{i + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#0f172a] mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 pb-10 relative last:pb-0"
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-7 top-14 w-px h-full bg-gradient-to-b from-[#2563EB]/25 to-transparent" />
                )}

                {/* Icon */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#E2E8F0] flex items-center justify-center shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shadow-[0_4px_10px_rgba(37,99,235,0.4)]">
                    <span className="text-[9px] font-bold text-white">{i + 1}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-base font-semibold text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { faqs } from "@/lib/data/faqs";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <SectionHeader
          badge="FAQ"
          title="Common"
          titleHighlight="Questions"
          subtitle="Everything you need to know before working with SHYTECH."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 ${
                openId === faq.id
                  ? "border-[#2563EB]/30 bg-[#eff6ff]/50 shadow-[0_8px_24px_rgba(37,99,235,0.06)]"
                  : "border-[#E2E8F0] bg-white hover:border-[#2563EB]/20 hover:shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
              }`}
            >
              <button
                className="w-full flex items-start justify-between gap-4 p-5 text-left"
                onClick={() => toggle(faq.id)}
              >
                <span className="text-sm font-semibold text-[#0f172a] flex-1 leading-relaxed">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    openId === faq.id ? "bg-[#2563EB] text-white" : "bg-[#f1f5f9] text-[#64748b]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className="h-px bg-[#E2E8F0] mb-4" />
                      <p className="text-sm text-[#475569] leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

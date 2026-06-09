"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-16`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/8 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {title}{" "}
        {titleHighlight && <span className="accent-text">{titleHighlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-[#475569] leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div
                className="text-5xl md:text-6xl font-bold accent-text"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
              </div>
              <div className="text-sm text-[#64748b] mt-2 tracking-wide">{stat.label}</div>
              <div className="mt-2 h-px w-8 bg-[#2563EB]/25 mx-auto group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

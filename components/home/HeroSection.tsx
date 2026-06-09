"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eff6ff]/60 via-white to-white" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Soft glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-[#2563EB]/8 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/8 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[120px]"
        />

        {/* Background event image with very light overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80')] bg-cover bg-center opacity-[0.04]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">
            Premium Event Management & Media Production
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-[#0f172a]"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Creating Experiences
          <br />
          <span className="accent-text">People Never Forget</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed"
        >
          From corporate events and weddings to professional videography and AI
          content production, we manage everything under one roof with
          uncompromising excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary flex items-center gap-2 text-sm">
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/portfolio" className="btn-secondary flex items-center gap-2 text-sm">
            <Play className="w-4 h-4 fill-current" />
            View Portfolio
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold accent-text" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <div className="text-sm text-[#64748b] mt-1 tracking-wide">{stat.label}</div>
              <div className="mt-2 h-px w-8 bg-[#2563EB]/25 mx-auto group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[#94a3b8]"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

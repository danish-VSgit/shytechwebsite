"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { portfolioItems as hardcodedPortfolio, portfolioCategories, type PortfolioCategory, type PortfolioItem } from "@/lib/data/portfolio";

interface Props {
  portfolioItems?: PortfolioItem[];
}

export default function PortfolioSection({ portfolioItems = hardcodedPortfolio }: Props) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const filtered =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <SectionHeader
          badge="Our Work"
          title="Portfolio of"
          titleHighlight="Excellence"
          subtitle="A curated selection of our finest events, productions, and creative campaigns."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PortfolioCategory)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                  : "bg-[#f8fafc] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] border border-[#E2E8F0]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white cursor-pointer hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2563EB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                      <ExternalLink className="w-4 h-4 text-[#2563EB]" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold tracking-widest uppercase text-[#2563EB]">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-[#0f172a] group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#94a3b8] shrink-0">{item.year}</span>
                  </div>
                  <p className="text-xs text-[#64748b] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#f1f5f9] text-[#64748b] border border-[#E2E8F0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/portfolio" className="btn-secondary inline-flex items-center gap-2">
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

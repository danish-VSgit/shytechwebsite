"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolioCategories, type PortfolioCategory, type PortfolioItem } from "@/lib/data/portfolio";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {portfolioCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as PortfolioCategory)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                : "bg-[#f8fafc] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] border border-[#E2E8F0]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(15,23,42,0.1)]"
            >
              <Link href={`/portfolio/${item.id}`} className="block">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/15 to-transparent" />
                  <div className="absolute inset-0 bg-[#2563EB]/0 group-hover:bg-[#2563EB]/8 transition-colors duration-500" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold tracking-widest uppercase text-[#2563EB]">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                      <ExternalLink className="w-4 h-4 text-[#2563EB]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-white/70 mb-1">{item.client} · {item.year}</p>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-[#f1f5f9] text-[#64748b] border border-[#E2E8F0]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

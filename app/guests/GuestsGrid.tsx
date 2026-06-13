"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ChevronRight, Search, Sparkles, Users } from "lucide-react";
import type { ComponentGuest as Guest } from "@/sanity/lib/adapters";

const PAGE_SIZE = 9;

export default function GuestsGrid({ guests }: { guests: Guest[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(guests.map((g) => g.category).filter(Boolean)));
    return ["all", ...unique];
  }, [guests]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return guests.filter((g) => {
      const matchesCategory = activeCategory === "all" || g.category === activeCategory;
      const matchesSearch = !query || g.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [guests, search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (guests.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[#64748b]">Guest profiles are coming soon. Check back shortly.</p>
      </div>
    );
  }

  return (
    <>
      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search guests by name..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E2E8F0] bg-[#f8fafc] text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]/40 transition-all"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                : "bg-[#f8fafc] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] border border-[#E2E8F0]"
            }`}
          >
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-[#94a3b8] mb-8 flex items-center justify-center gap-1.5">
        <Users className="w-3.5 h-3.5" />
        {filtered.length} {filtered.length === 1 ? "guest" : "guests"} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((guest) => (
            <motion.div
              key={guest.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <Link href={`/guests/${guest.slug}`} className="group block">
                <div
                  className={`relative rounded-[24px] overflow-hidden bg-white transition-all duration-300 ${
                    guest.featured
                      ? "border-2 border-transparent bg-gradient-to-b from-[#2563EB] to-[#06B6D4] shadow-[0_12px_40px_rgba(37,99,235,0.2)] p-[2px] group-hover:shadow-[0_24px_60px_rgba(37,99,235,0.32)]"
                      : "border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.06)] group-hover:border-[#2563EB]/40 group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                  } group-hover:-translate-y-1.5`}
                >
                  <div className={guest.featured ? "rounded-[22px] overflow-hidden bg-white" : ""}>
                    <div className="relative h-72 overflow-hidden bg-[#f1f5f9]">
                      <Image
                        src={guest.image}
                        alt={guest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#2563EB]">
                          {guest.category}
                        </span>
                      </div>

                      {guest.featured && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-md">
                          <Sparkles className="w-3 h-3 text-white" />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-white">Featured</span>
                        </div>
                      )}
                      {guest.verified && !guest.featured && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md">
                          <BadgeCheck className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg font-bold text-white leading-tight truncate" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                            {guest.name}
                          </h3>
                          {guest.verified && <BadgeCheck className="w-4 h-4 text-white shrink-0" />}
                        </div>
                        <p className="text-sm text-white/80 mt-0.5 truncate leading-snug">{guest.title}</p>
                      </div>
                    </div>

                    <div className="px-4 py-3.5 bg-white flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        {guest.company && (
                          <p className="text-[12px] text-[#2563EB] font-semibold truncate tracking-wide">{guest.company}</p>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#94a3b8] shrink-0 transition-colors duration-300 group-hover:text-[#2563EB]">
                        View Profile
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-[#64748b]">No guests match your search. Try a different name or category.</p>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="btn-secondary"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

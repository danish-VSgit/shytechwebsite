"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck, ArrowRight, ChevronRight, Users, Sparkles,
} from "lucide-react";

import SectionHeader from "@/components/shared/SectionHeader";
import type { ComponentGuest as Guest } from "@/sanity/lib/adapters";

interface Props {
  guests?: Guest[];
}

// ─── Guest Carousel Card ────────────────────────────────────────────────────

function GuestCard({ guest }: { guest: Guest }) {
  return (
    <Link href={`/guests/${guest.slug}`} className="group flex-shrink-0 w-[230px] sm:w-[260px] md:w-[280px]">
      <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`relative cursor-pointer rounded-[24px] overflow-hidden bg-white transition-shadow duration-300 ${
          guest.featured
            ? "border-2 border-transparent bg-gradient-to-b from-[#2563EB] to-[#06B6D4] shadow-[0_12px_40px_rgba(37,99,235,0.25)] p-[2px] group-hover:shadow-[0_24px_60px_rgba(37,99,235,0.35)]"
            : "border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.07)] group-hover:border-[#2563EB]/40 group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
        }`}
      >
        <div className={guest.featured ? "rounded-[22px] overflow-hidden bg-white" : ""}>
          {/* Photo */}
          <div className="relative h-[260px] sm:h-[290px] md:h-[320px] overflow-hidden bg-[#f1f5f9]">
            <Image
              src={guest.image}
              alt={guest.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 230px, (max-width: 768px) 260px, 280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent" />

            {/* Category chip */}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#2563EB]">
                {guest.category}
              </span>
            </div>

            {/* Featured badge */}
            {guest.featured && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-md">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">Featured</span>
              </div>
            )}

            {/* Verified badge */}
            {guest.verified && !guest.featured && (
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md">
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Name overlay on photo */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white leading-tight truncate" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {guest.name}
                </h3>
                {guest.verified && <BadgeCheck className="w-4 h-4 text-white shrink-0" />}
              </div>
              <p className="text-xs text-white/80 mt-0.5 truncate leading-snug">{guest.title}</p>
            </div>
          </div>

          {/* Info */}
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
      </motion.div>
    </Link>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function GuestsSection({ guests }: Props) {
  const [isPaused, setIsPaused] = useState(false);

  if (!guests || guests.length === 0) return null;

  return (
    <section id="guests" className="py-20 md:py-28 bg-white overflow-x-hidden">
      {/* ── Section header ── */}
      <div className="container-width">
        <SectionHeader
          badge="Featured Guests & Speakers"
          title="Featured"
          titleHighlight="Personalities"
          subtitle="Meet the industry leaders, founders, creators, speakers and influential voices who have been part of QueueCap events and productions."
        />
      </div>

      {/* ── Auto-scroll carousel ── */}
      <div
        className="relative mt-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Guest carousel — click a card to view full profile page"
      >
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex gap-6 md:gap-8 py-5 pl-6 md:pl-10"
          style={{
            width: "max-content",
            willChange: "transform",
            animation: `scroll-marquee ${Math.max(guests.length * 7, 30)}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* Triplicate array for seamless infinite loop on wide screens */}
          {[...guests, ...guests, ...guests].map((guest, i) => (
            <GuestCard key={`${guest.id}-${i}`} guest={guest} />
          ))}
        </div>
      </div>

      {/* ── View all CTA ── */}
      <div className="container-width mt-12 flex flex-col items-center text-center gap-3">
        <p className="text-sm text-[#94a3b8] flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          Click any card to view their full profile
        </p>
        <Link href="/guests" className="btn-primary inline-flex items-center gap-2">
          View All Personalities
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

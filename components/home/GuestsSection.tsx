"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck, Globe,
  PlayCircle, ArrowRight, Calendar, Star, ChevronRight,
  Users, X,
} from "lucide-react";

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

import SectionHeader from "@/components/shared/SectionHeader";
import { guests as hardcodedGuests, type Guest } from "@/lib/data/guests";

interface Props {
  guests?: Guest[];
}

// ─── Guest Carousel Card ────────────────────────────────────────────────────

function GuestCard({
  guest,
  isActive,
  onClick,
}: {
  guest: Guest;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      onClick={onClick}
      className={`relative flex-shrink-0 w-[200px] cursor-pointer rounded-[24px] overflow-hidden bg-white transition-all duration-300 ${
        isActive
          ? "border-2 border-[#2563EB] shadow-[0_12px_40px_rgba(37,99,235,0.22)]"
          : "border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.07)] hover:border-[#2563EB]/35 hover:shadow-[0_16px_48px_rgba(15,23,42,0.13)]"
      }`}
    >
      {/* Photo */}
      <div className="relative h-[220px] overflow-hidden bg-[#f1f5f9]">
        <Image
          src={guest.image}
          alt={guest.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/65 via-[#0f172a]/10 to-transparent" />

        {/* Category chip */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#2563EB]">
            {guest.category}
          </span>
        </div>

        {/* Verified badge */}
        {guest.verified && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md">
            <BadgeCheck className="w-3.5 h-3.5 text-white" />
          </div>
        )}

        {/* Active glow ring */}
        {isActive && (
          <div className="absolute inset-0 ring-2 ring-inset ring-[#2563EB]/40 rounded-[24px]" />
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3.5 bg-white">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#0f172a] leading-tight truncate" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {guest.name}
            </h3>
            <p className="text-[11px] text-[#64748b] mt-0.5 truncate leading-snug">{guest.title}</p>
            {guest.company && (
              <p className="text-[11px] text-[#2563EB] font-semibold mt-0.5 truncate">{guest.company}</p>
            )}
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] shrink-0 mt-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Guest Profile Detail Card ───────────────────────────────────────────────

function GuestProfileCard({
  guest,
  isHighlighted,
  isActive,
}: {
  guest: Guest;
  isHighlighted: boolean;
  isActive: boolean;
}) {
  return (
    <motion.div
      id={`guest-profile-${guest.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[28px] border overflow-hidden transition-all duration-700 ${
        isHighlighted
          ? "border-[#2563EB]/35 shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_24px_70px_rgba(37,99,235,0.12)]"
          : isActive
          ? "border-[#2563EB]/20 shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
          : "border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.05)]"
      } bg-white`}
      style={isHighlighted ? { animation: "highlight-pulse 0.8s ease-out" } : undefined}
    >
      {/* Active indicator strip */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[28px] transition-all duration-500 ${
          isActive || isHighlighted ? "bg-[#2563EB]" : "bg-transparent"
        }`}
      />

      <div className="flex flex-col md:flex-row gap-0">
        {/* Left: Photo column */}
        <div className="relative md:w-64 shrink-0">
          <div className="relative h-72 md:h-full min-h-[280px] overflow-hidden">
            <Image
              src={guest.image}
              alt={guest.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />

            {/* Mobile-only name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {guest.name}
                </h3>
                {guest.verified && <BadgeCheck className="w-4 h-4 text-[#2563EB] bg-white rounded-full" />}
              </div>
              <p className="text-sm text-white/80">{guest.title}</p>
            </div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase text-[#2563EB] shadow-sm">
                {guest.category}
              </span>
            </div>
          </div>

          {/* Social links — below photo on desktop */}
          <div className="hidden md:flex flex-wrap gap-2 p-5 bg-[#f8fafc] border-t border-[#E2E8F0]">
            {guest.socialLinks.instagram && (
              <a
                href={guest.socialLinks.instagram}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-all shadow-sm"
              >
                <IconInstagram />
              </a>
            )}
            {guest.socialLinks.linkedin && (
              <a
                href={guest.socialLinks.linkedin}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all shadow-sm"
              >
                <IconLinkedin />
              </a>
            )}
            {guest.socialLinks.twitter && (
              <a
                href={guest.socialLinks.twitter}
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a]/40 transition-all shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
              </a>
            )}
            {guest.socialLinks.youtube && (
              <a
                href={guest.socialLinks.youtube}
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-all shadow-sm"
              >
                <PlayCircle className="w-3.5 h-3.5" />
              </a>
            )}
            {guest.socialLinks.website && (
              <a
                href={guest.socialLinks.website}
                aria-label="Website"
                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-6 md:p-8">
          {/* Header — desktop */}
          <div className="hidden md:flex items-start gap-3 mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-1">
                <h3
                  className="text-2xl font-bold text-[#0f172a]"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {guest.name}
                </h3>
                {guest.verified && (
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shadow-sm">
                    <BadgeCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <p className="text-[#475569] font-medium">{guest.title}</p>
              {guest.company && (
                <p className="text-[#2563EB] text-sm font-semibold mt-0.5">{guest.company}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-[#64748b] leading-relaxed mb-6">{guest.bio}</p>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-3 flex items-center gap-2">
              <Star className="w-3 h-3 text-[#2563EB]" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {guest.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  </div>
                  <span className="text-sm text-[#334155] leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Past Events */}
          <div className="mb-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-3 flex items-center gap-2">
              <Calendar className="w-3 h-3 text-[#2563EB]" />
              SHYTECH Appearances
            </h4>
            <div className="flex flex-wrap gap-2">
              {guest.pastEvents.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8fafc] border border-[#E2E8F0]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                  <span className="text-xs text-[#334155] font-medium">{event.eventName}</span>
                  <span className="text-xs text-[#94a3b8]">·</span>
                  <span className="text-xs text-[#94a3b8]">{event.year}</span>
                  <span className="text-[10px] text-[#2563EB] font-semibold bg-[#eff6ff] px-1.5 py-0.5 rounded-full">
                    {event.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile social links */}
          <div className="flex md:hidden gap-2 mb-5">
            {guest.socialLinks.instagram && (
              <a href={guest.socialLinks.instagram} aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#E1306C] transition-all">
                <IconInstagram />
              </a>
            )}
            {guest.socialLinks.linkedin && (
              <a href={guest.socialLinks.linkedin} aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0A66C2] transition-all">
                <IconLinkedin />
              </a>
            )}
            {guest.socialLinks.twitter && (
              <a href={guest.socialLinks.twitter} aria-label="X" className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] transition-all">
                <X className="w-3.5 h-3.5" />
              </a>
            )}
            {guest.socialLinks.youtube && (
              <a href={guest.socialLinks.youtube} aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#FF0000] transition-all">
                <PlayCircle className="w-3.5 h-3.5" />
              </a>
            )}
            {guest.socialLinks.website && (
              <a href={guest.socialLinks.website} aria-label="Website" className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] transition-all">
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* CTA */}
          <Link href="/contact" className="btn-primary text-sm inline-flex items-center gap-2 w-fit">
            Invite Similar Guests
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quick Navigation Dots ────────────────────────────────────────────────────

function ProfileNav({
  guests,
  activeId,
  onSelect,
}: {
  guests: Guest[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hidden xl:flex flex-col gap-3 sticky top-28 self-start">
      {guests.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          title={g.name}
          className={`group flex items-center gap-2.5 transition-all duration-300 ${
            activeId === g.id ? "opacity-100" : "opacity-45 hover:opacity-80"
          }`}
        >
          <div
            className={`h-5 rounded-full transition-all duration-300 ${
              activeId === g.id ? "w-1.5 bg-[#2563EB]" : "w-1 bg-[#cbd5e1] group-hover:bg-[#94a3b8]"
            }`}
          />
          <span
            className={`text-xs font-medium truncate max-w-[120px] transition-all ${
              activeId === g.id ? "text-[#0f172a]" : "text-[#94a3b8]"
            }`}
          >
            {g.name.split(" ")[0]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function GuestsSection({ guests = hardcodedGuests }: Props) {
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer — track which profile is currently in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rawId = entry.target.id.replace("guest-profile-", "");
            setActiveId(rawId);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
    );

    guests.forEach((g) => {
      const el = document.getElementById(`guest-profile-${g.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToProfile = useCallback((guestId: string) => {
    const el = document.getElementById(`guest-profile-${guestId}`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    setHighlightedId(guestId);
    highlightTimerRef.current = setTimeout(() => setHighlightedId(null), 2600);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white overflow-x-hidden">
      {/* ── Section header ── */}
      <div className="container-width">
        <SectionHeader
          badge="Featured Guests & Speakers"
          title="Distinguished"
          titleHighlight="Personalities"
          subtitle="Meet the industry experts, entrepreneurs, influencers, and special guests who have been part of our landmark events."
        />
      </div>

      {/* ── Auto-scroll carousel ── */}
      <div
        className="relative mt-2 mb-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Guest carousel — click a card to view full profile"
      >
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 bottom-0 w-28 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 bottom-0 w-28 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex gap-5 py-5 pl-10"
          style={{
            width: "max-content",
            willChange: "transform",
            animation: `scroll-marquee ${guests.length * 5.5}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* Duplicate array for seamless infinite loop */}
          {[...guests, ...guests].map((guest, i) => (
            <GuestCard
              key={`${guest.id}-${i}`}
              guest={guest}
              isActive={activeId === guest.id}
              onClick={() => scrollToProfile(guest.id)}
            />
          ))}
        </div>

        {/* Hint label */}
        <p className="text-center text-xs text-[#94a3b8] mt-3 flex items-center justify-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          Click any card to view full profile below
        </p>
      </div>

      {/* ── Profile sections ── */}
      <div className="container-width">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-[#E2E8F0]" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#f8fafc]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
              Guest Profiles
            </span>
          </div>
          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>

        {/* Two-column: nav dots + profile cards */}
        <div className="flex gap-8">
          {/* Sticky nav (desktop only) */}
          <ProfileNav guests={guests} activeId={activeId} onSelect={scrollToProfile} />

          {/* Profile cards stack */}
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {guests.map((guest) => (
                <GuestProfileCard
                  key={guest.id}
                  guest={guest}
                  isHighlighted={highlightedId === guest.id}
                  isActive={activeId === guest.id}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

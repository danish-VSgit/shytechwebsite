import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Globe, Briefcase, Calendar,
  Award, Trophy, PlayCircle, Image as ImageIcon, ExternalLink,
  Mic, X as XIcon, Sparkles,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { guestBySlugQuery, guestSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { adaptGuestProfile, type GuestProfile } from "@/sanity/lib/adapters";
import type { Guest as SanityGuest, GuestEventAppearance } from "@/sanity/lib/types";
import PersonJsonLd from "@/components/shared/PersonJsonLd";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

async function getGuestProfile(slug: string): Promise<GuestProfile | null> {
  try {
    const sanityGuest = await client.fetch<SanityGuest | null>(guestBySlugQuery, { slug });
    if (!sanityGuest) return null;

    const profile = adaptGuestProfile(sanityGuest);
    if (profile.eventAppearances.length === 0 && profile.pastEvents.length > 0) {
      profile.eventAppearances = profile.pastEvents.map((eventName) => ({ eventName }));
    }
    return profile;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const sanitySlugs = await client.fetch<string[]>(guestSlugsQuery);
    return sanitySlugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guest = await getGuestProfile(slug);
  if (!guest) return { title: "Guest Not Found | SHYTECH" };

  const title = guest.seo?.metaTitle ?? `${guest.name} | Guest Profile | SHYTECH`;
  const descriptionParts = [guest.bio, guest.title, guest.company].filter(Boolean);
  const description = guest.seo?.metaDescription ?? descriptionParts.join(" — ").slice(0, 160);
  const ogImage = guest.seo?.ogImage ? urlFor(guest.seo.ogImage).width(1200).height(630).url() : guest.image;

  return {
    title,
    description,
    keywords: guest.seo?.keywords,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    robots: guest.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

function formatEventDate(date?: string): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (date.length > 4 && !isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }
  return date;
}

function EventAppearanceRow({ event }: { event: GuestEventAppearance }) {
  const date = formatEventDate(event.date);
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0]">
      <div className="w-9 h-9 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
        <Mic className="w-4 h-4 text-[#2563EB]" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[#0f172a]">{event.eventName}</p>
        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[#64748b]">
          {event.role && <span>{event.role}</span>}
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
              {date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function GuestProfilePage({ params }: Props) {
  const { slug } = await params;
  const guest = await getGuestProfile(slug);
  if (!guest) notFound();

  const hasBiography = guest.fullBiography && guest.fullBiography.length > 0;
  const hasAchievements = guest.achievements.length > 0;
  const hasAwards = guest.awards.length > 0;
  const hasEvents = guest.eventAppearances.length > 0;
  const hasGallery = guest.galleryImages.length > 0;
  const hasVideos = Boolean(guest.featuredVideo || guest.interviewVideo);
  const social = guest.socialLinks;
  const hasSocial = Boolean(
    social.instagram || social.linkedin || social.twitter || social.youtube || social.facebook || social.website
  );

  const profileUrl = `https://shytech.agency/guests/${guest.slug}`;
  const sameAs = [social.instagram, social.linkedin, social.twitter, social.youtube, social.facebook, social.website].filter(
    (url): url is string => Boolean(url) && url !== "#"
  );

  return (
    <main className="min-h-screen bg-white">
      <PersonJsonLd
        name={guest.name}
        jobTitle={guest.title}
        company={guest.company}
        description={guest.bio}
        image={guest.image}
        url={profileUrl}
        sameAs={sameAs}
      />

      {/* Back nav */}
      <div className="pt-28 pb-6 container-width">
        <Link href="/guests" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#2563EB] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to All Personalities
        </Link>
      </div>

      {/* Top section */}
      <section className="container-width mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* Profile image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-lg">
            <Image
              src={guest.image}
              alt={guest.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            {guest.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold tracking-widest uppercase text-white">Featured Guest</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center pt-2">
            <span className="w-fit px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563EB] text-xs font-bold uppercase tracking-widest border border-[#bfdbfe] mb-4">
              {guest.category}
            </span>

            <h1 className="flex items-center gap-2.5 text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {guest.name}
              {guest.verified && <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-[#2563EB] shrink-0" />}
            </h1>

            <p className="text-lg md:text-xl text-[#2563EB] font-semibold mb-1">{guest.title}</p>

            <div className="flex flex-wrap items-center gap-4 text-[#64748b] mb-6">
              {guest.company && (
                <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                  <Briefcase className="w-4 h-4 text-[#94a3b8]" />
                  {guest.company}
                </span>
              )}
              {typeof guest.experienceYears === "number" && (
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#94a3b8]" />
                  {guest.experienceYears}+ years of experience
                </span>
              )}
            </div>

            {/* Social icons */}
            {hasSocial && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-all">
                    <IconInstagram />
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all">
                    <IconLinkedin />
                  </a>
                )}
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] transition-all">
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-all">
                    <PlayCircle className="w-4 h-4" />
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all">
                    <IconFacebook />
                  </a>
                )}
                {social.website && (
                  <a href={social.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            {/* Website button */}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 w-fit">
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      {guest.bio && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>About</h2>
          <p className="text-lg text-[#475569] leading-relaxed">{guest.bio}</p>
        </section>
      )}

      {/* Biography */}
      {hasBiography && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Biography</h2>
          <div className="prose-content">
            <PortableText
              value={guest.fullBiography!}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-[#475569] leading-relaxed mb-4 text-[1.05rem]">{children}</p>,
                },
              }}
            />
          </div>
        </section>
      )}

      {/* Key Achievements */}
      {hasAchievements && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <Trophy className="w-6 h-6 text-[#2563EB]" />
            Key Achievements
          </h2>
          <ul className="space-y-3">
            {guest.achievements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#475569]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {hasAwards && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <Award className="w-6 h-6 text-[#2563EB]" />
            Awards &amp; Recognitions
          </h2>
          <ul className="space-y-3">
            {guest.awards.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#475569]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Event Appearances */}
      {hasEvents && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <Mic className="w-6 h-6 text-[#2563EB]" />
            Event Appearances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guest.eventAppearances.map((event, i) => (
              <EventAppearanceRow key={i} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Media Gallery */}
      {hasGallery && (
        <section className="container-width mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <ImageIcon className="w-6 h-6 text-[#2563EB]" />
            Media Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guest.galleryImages.map((img, i) => (
              <div key={i} className="relative h-56 rounded-xl overflow-hidden border border-[#E2E8F0] group">
                <Image
                  src={img}
                  alt={`${guest.name} gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {hasVideos && (
        <section className="container-width max-w-3xl mb-14">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            <PlayCircle className="w-6 h-6 text-[#2563EB]" />
            Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guest.featuredVideo && (
              <a href={guest.featuredVideo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">Featured Video</p>
                  <p className="text-sm text-[#64748b]">Watch on the original platform</p>
                </div>
              </a>
            )}
            {guest.interviewVideo && (
              <a href={guest.interviewVideo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-full bg-[#06B6D4] flex items-center justify-center shrink-0">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">Interview</p>
                  <p className="text-sm text-[#64748b]">Watch on the original platform</p>
                </div>
              </a>
            )}
          </div>
        </section>
      )}

      {/* Social Profiles */}
      {hasSocial && (
        <section className="container-width max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Social Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#E1306C]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><IconInstagram /> Instagram</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#0A66C2]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><IconLinkedin /> LinkedIn</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#0f172a]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><XIcon className="w-4 h-4" /> X (Twitter)</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#FF0000]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><PlayCircle className="w-4 h-4" /> YouTube</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#1877F2]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><IconFacebook /> Facebook</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all">
                <span className="flex items-center gap-2.5 text-[#334155] font-medium"><Globe className="w-4 h-4" /> Website</span>
                <ExternalLink className="w-4 h-4 text-[#94a3b8]" />
              </a>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-width mb-20">
        <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Want a personality like {guest.name.split(" ")[0]} at your next event?
          </h2>
          <p className="text-white/80 mb-6">Let&apos;s talk about bringing the right voices to your stage.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
              Invite Similar Guests
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guests" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              More Personalities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

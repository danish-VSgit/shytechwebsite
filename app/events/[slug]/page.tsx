import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { eventBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { EventDoc } from "@/sanity/lib/types";
import { ArrowLeft, Calendar, MapPin, Users, BadgeCheck, ArrowRight } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) return {};
  const { slug } = await params;
  let event: EventDoc | null = null;
  try {
    event = await client.fetch<EventDoc | null>(eventBySlugQuery, { slug });
  } catch { return {}; }
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.seo?.metaTitle ?? `${event.title} | QueueCap Events`,
    description: event.seo?.metaDescription ?? event.description,
    openGraph: {
      title: event.seo?.metaTitle ?? event.title,
      description: event.seo?.metaDescription ?? event.description ?? "",
      images: event.coverImage ? [urlFor(event.coverImage).width(1200).height(630).url()] : [],
    },
    alternates: { canonical: `/events/${slug}` },
    robots: event.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

const statusColors: Record<string, string> = {
  upcoming: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
  ongoing: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  completed: "bg-[#f1f5f9] text-[#475569] border-[#E2E8F0]",
  cancelled: "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]",
};

export default async function EventDetailPage({ params }: Props) {
  if (!isSanityConfigured) notFound();
  const { slug } = await params;
  let event: EventDoc | null = null;
  try {
    event = await client.fetch<EventDoc | null>(eventBySlugQuery, { slug });
  } catch { notFound(); }
  if (!event) notFound();

  const coverUrl = event.coverImage ? urlFor(event.coverImage).width(1200).height(600).url() : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-28 pb-6 container-width">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#2563EB] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>

      {/* Cover */}
      {coverUrl && (
        <div className="container-width mb-8">
          <div className="relative h-72 md:h-[460px] rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <Image src={coverUrl} alt={event.title} fill className="object-cover" priority sizes="(max-width: 1280px) 100vw, 1280px" />
          </div>
        </div>
      )}

      <div className="container-width pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors[event.status] ?? statusColors.completed}`}>
                {event.status}
              </span>
              {event.category && (
                <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563EB] text-xs font-bold uppercase tracking-wider border border-[#bfdbfe]">
                  {event.category.replace(/-/g, " ")}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {event.title}
            </h1>

            {event.description && (
              <p className="text-lg text-[#475569] leading-relaxed mb-8">{event.description}</p>
            )}

            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Event Highlights</h2>
                <ul className="space-y-2.5">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      </div>
                      <span className="text-[#475569]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.gallery.map((img, i) => (
                    <div key={i} className="relative h-44 rounded-xl overflow-hidden border border-[#E2E8F0]">
                      <Image src={urlFor(img).width(400).height(300).url()} alt={img.alt ?? `Gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guest Speakers */}
            {event.guests && event.guests.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Guest Speakers</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {event.guests.map((g) => (
                    <div key={g._id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0] bg-[#f8fafc]">
                      {g.photo && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E2E8F0] shrink-0">
                          <Image src={urlFor(g.photo).width(80).height(80).url()} alt={g.name} fill className="object-cover" sizes="40px" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-semibold text-[#0f172a] truncate">{g.name}</p>
                          {g.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                        </div>
                        {g.title && <p className="text-xs text-[#64748b] truncate">{g.title}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-[#E2E8F0] p-6 bg-[#f8fafc] sticky top-28">
              <h3 className="font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Event Details</h3>
              <div className="space-y-4 text-sm">
                {event.date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-[#334155] font-medium">{formatDate(event.date)}</p>
                      {event.endDate && <p className="text-[#64748b]">to {formatDate(event.endDate)}</p>}
                    </div>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-0.5">Venue</p>
                      <p className="text-[#334155] font-medium">{event.venue}</p>
                      {event.location && <p className="text-[#64748b]">{event.location}</p>}
                    </div>
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-0.5">Capacity</p>
                      <p className="text-[#334155] font-medium">{event.capacity.toLocaleString()} guests</p>
                    </div>
                  </div>
                )}
                {event.client && (
                  <div className="pt-4 border-t border-[#E2E8F0]">
                    <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Client</p>
                    <p className="text-[#334155] font-medium">{event.client}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
                <Link href="/contact" className="btn-primary w-full text-center flex items-center justify-center gap-2">
                  Plan a Similar Event <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

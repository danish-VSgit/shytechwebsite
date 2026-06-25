import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { EventDoc } from "@/sanity/lib/types";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events | QueueCap",
  description: "Explore QueueCap's portfolio of corporate events, conferences, summits, and brand activations.",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const statusColors: Record<string, string> = {
  upcoming: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
  ongoing: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  completed: "bg-[#f1f5f9] text-[#475569] border-[#E2E8F0]",
  cancelled: "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]",
};

export default async function EventsPage() {
  let events: EventDoc[] = [];
  if (isSanityConfigured) {
    try {
      events = await client.fetch<EventDoc[]>(eventsQuery);
    } catch {
      events = [];
    }
  }

  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "completed" || e.status === "cancelled");
  const ongoing = events.filter((e) => e.status === "ongoing");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Events</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Our <span className="accent-text">Events</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Discover the extraordinary events we&apos;ve crafted — from intimate brand activations to massive corporate summits.
          </p>
        </div>
      </section>

      {events.length === 0 ? (
        <section className="container-width text-center py-24">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-[#334155] mb-2">No events yet</h2>
          <p className="text-[#64748b] mb-8">Events will appear here once added via the admin panel.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Plan Your Event <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      ) : (
        <div className="container-width pb-20">
          {/* Ongoing */}
          {ongoing.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Happening Now</h2>
              <EventGrid events={ongoing} />
            </section>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Upcoming Events</h2>
              <EventGrid events={upcoming} />
            </section>
          )}

          {/* Past */}
          {past.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Past Events</h2>
              <EventGrid events={past} />
            </section>
          )}
        </div>
      )}

      {/* CTA */}
      <section className="container-width mb-20">
        <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Planning an event?</h2>
          <p className="text-white/80 mb-6">Let QueueCap turn your vision into an unforgettable experience.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
            Get a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function EventGrid({ events }: { events: EventDoc[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const imageUrl = event.coverImage ? urlFor(event.coverImage).width(600).height(360).url() : null;
        return (
          <Link
            key={event._id}
            href={`/events/${event.slug.current}`}
            className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-52 overflow-hidden bg-[#f1f5f9]">
              {imageUrl ? (
                <Image src={imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">📅</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[event.status] ?? statusColors.completed}`}>
                  {event.status}
                </span>
              </div>
              {event.category && (
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                    {event.category.replace(/-/g, " ")}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[#0f172a] mb-2 group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {event.title}
              </h3>
              {event.description && <p className="text-sm text-[#64748b] mb-3 line-clamp-2">{event.description}</p>}
              <div className="flex flex-col gap-1.5 text-xs text-[#94a3b8]">
                {event.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                    {formatDate(event.date)}
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    {event.venue}{event.location ? `, ${event.location}` : ""}
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                    {event.capacity.toLocaleString()} guests
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

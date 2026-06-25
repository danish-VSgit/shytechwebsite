import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { guestsQuery } from "@/sanity/lib/queries";
import { adaptGuest, type ComponentGuest } from "@/sanity/lib/adapters";
import type { Guest as SanityGuest } from "@/sanity/lib/types";
import GuestsGrid from "./GuestsGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Featured Guests & Speakers | QueueCap",
  description:
    "Meet the industry leaders, founders, creators, and influential voices who have appeared at QueueCap events — corporate summits, conferences, and brand experiences.",
  openGraph: {
    title: "Featured Guests & Speakers | QueueCap",
    description:
      "Meet the industry leaders, founders, creators, and influential voices who have appeared at QueueCap events — corporate summits, conferences, and brand experiences.",
  },
};

export default async function GuestsPage() {
  let guests: ComponentGuest[] = [];
  try {
    const sanityGuests = await client.fetch<SanityGuest[]>(guestsQuery);
    guests = (sanityGuests ?? []).map(adaptGuest);
  } catch {
    guests = [];
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-36 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/4 via-transparent to-transparent" />
        <div className="container-width relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Personalities</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Featured <span className="accent-text">Guests & Speakers</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Industry leaders, founders, creators, and influential voices who have brought their energy to QueueCap stages and productions.
          </p>
        </div>
      </section>

      {/* Search + Filter + Grid */}
      <section className="pb-24">
        <div className="container-width">
          <GuestsGrid guests={guests} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#E2E8F0] bg-[#f8fafc]">
        <div className="container-width text-center">
          <h2 className="text-4xl font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Want to bring a personality like this to <span className="accent-text">your event?</span>
          </h2>
          <p className="text-[#475569] mb-8">Let&apos;s talk about curating the right voices for your stage.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Request Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

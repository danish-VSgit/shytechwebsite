import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/lib/queries";
import { adaptPortfolio } from "@/sanity/lib/adapters";
import { portfolioItems as hardcodedPortfolio } from "@/lib/data/portfolio";
import type { Portfolio } from "@/sanity/lib/types";
import type { PortfolioItem } from "@/lib/data/portfolio";
import PortfolioGrid from "./PortfolioGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio | QueueCap",
  description:
    "Explore QueueCap's portfolio of premium corporate events, conferences, summits, media productions, and brand campaigns.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  let items: PortfolioItem[] = hardcodedPortfolio;
  if (isSanityConfigured) {
    try {
      const sanityProjects = await client.fetch<Portfolio[]>(portfolioQuery);
      if (sanityProjects?.length) {
        items = sanityProjects.map(adaptPortfolio);
      }
    } catch {
      // fallback to hardcoded data
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/4 via-transparent to-transparent" />
        <div className="container-width relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Our Work</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Portfolio of <span className="accent-text">Excellence</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Every project here represents a promise kept, a vision realized, and a memory created that will last a lifetime.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-32">
        <div className="container-width">
          <PortfolioGrid items={items} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#E2E8F0] bg-[#f8fafc]">
        <div className="container-width text-center">
          <h2 className="text-4xl font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Ready to be our next <span className="accent-text">success story?</span>
          </h2>
          <p className="text-[#475569] mb-8">Let&apos;s create something extraordinary together.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

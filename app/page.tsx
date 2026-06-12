import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import GuestsSection from "@/components/home/GuestsSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import {
  featuredGuestsQuery,
  featuredTestimonialsQuery,
  featuredPortfolioQuery,
  servicesQuery,
  featuredGalleryQuery,
} from "@/sanity/lib/queries";
import {
  adaptGuest,
  adaptTestimonial,
  adaptPortfolio,
  adaptServiceToCategory,
  adaptGalleryImage,
} from "@/sanity/lib/adapters";
import type { Guest, Testimonial, Portfolio, Service, GalleryImage } from "@/sanity/lib/types";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata: Metadata = {
  title: "SHYTECH | Premium Event Management & Media Production",
  description:
    "SHYTECH delivers world-class event management, corporate events, weddings, professional videography, AI video generation, and media production. Creating experiences people never forget.",
};

async function fetchSanityData() {
  const [guests, testimonials, portfolio, services, gallery] = await Promise.allSettled([
    client.fetch<Guest[]>(featuredGuestsQuery),
    client.fetch<Testimonial[]>(featuredTestimonialsQuery),
    client.fetch<Portfolio[]>(featuredPortfolioQuery),
    client.fetch<Service[]>(servicesQuery),
    client.fetch<GalleryImage[]>(featuredGalleryQuery),
  ]);

  // TEMP DEBUG — remove after verifying Sanity guest data flow
  console.log("Sanity client config:", client.config());
  console.log("Sanity guest query:", featuredGuestsQuery);
  if (guests.status === "fulfilled") {
    console.log("Raw guest response:", guests.value);
    console.log("Guest count:", guests.value?.length);
  } else {
    console.error("Guest query rejected:", guests.reason);
  }

  let guestAdaptError: unknown = null;
  let adaptedGuests: ReturnType<typeof adaptGuest>[] | undefined;
  if (guests.status === "fulfilled" && guests.value?.length) {
    try {
      adaptedGuests = guests.value.map(adaptGuest);
    } catch (err) {
      guestAdaptError = err;
      console.error("adaptGuest threw:", err);
    }
  }

  return {
    guests: adaptedGuests,
    guestDebug: {
      status: guests.status,
      reason: guests.status === "rejected" ? String(guests.reason) : null,
      rawCount: guests.status === "fulfilled" ? guests.value?.length ?? 0 : null,
      adaptError: guestAdaptError ? String(guestAdaptError) : null,
    },
    testimonials: testimonials.status === "fulfilled" && testimonials.value?.length
      ? testimonials.value.map(adaptTestimonial)
      : undefined,
    portfolio: portfolio.status === "fulfilled" && portfolio.value?.length
      ? portfolio.value.map(adaptPortfolio)
      : undefined,
    serviceCategories: services.status === "fulfilled" && services.value?.length
      ? adaptServiceToCategory(services.value)
      : undefined,
    gallery: gallery.status === "fulfilled" && gallery.value?.length
      ? gallery.value.map(adaptGalleryImage)
      : undefined,
  };
}

export default async function HomePage() {
  const { guests, guestDebug, testimonials, portfolio, serviceCategories, gallery } = await fetchSanityData();

  // TEMP DEBUG — remove after verifying Sanity guest data flow
  console.log("Guests from Sanity (adapted):", guests);
  console.log("isSanityConfigured:", isSanityConfigured);
  console.log("Guest debug:", guestDebug);

  return (
    <>
      {/* TEMP DEBUG — remove after verifying Sanity guest data flow */}
      <div style={{ background: "#111", color: "#0f0", padding: "8px 16px", fontFamily: "monospace", fontSize: "12px", wordBreak: "break-all" }}>
        DEBUG: projectId={client.config().projectId} dataset={client.config().dataset} useCdn={String(client.config().useCdn)} |
        query status={guestDebug.status} | raw count={String(guestDebug.rawCount)} |
        rejection={guestDebug.reason ?? "none"} | adaptError={guestDebug.adaptError ?? "none"} |
        final guests={guests ? guests.length : "undefined (hardcoded fallback)"}
      </div>
      <HeroSection />
      <ServicesSection serviceCategories={serviceCategories} />
      <GuestsSection guests={guests} />
      <PortfolioSection portfolioItems={portfolio} />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection />
      <GallerySection images={gallery} />
      <FAQSection />
      <ContactSection />
    </>
  );
}

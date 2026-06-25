import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import GuestsSection from "@/components/home/GuestsSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import ContactSection from "@/components/home/ContactSection";
import { client } from "@/sanity/lib/client";
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
  title: "QueueCap | Premium Event Management & Media Production",
  description:
    "QueueCap delivers world-class corporate event management, conferences, summits, professional videography, AI video generation, and media production. Creating experiences people never forget.",
};

async function fetchSanityData() {
  const [guests, testimonials, portfolio, services, gallery] = await Promise.allSettled([
    client.fetch<Guest[]>(featuredGuestsQuery),
    client.fetch<Testimonial[]>(featuredTestimonialsQuery),
    client.fetch<Portfolio[]>(featuredPortfolioQuery),
    client.fetch<Service[]>(servicesQuery),
    client.fetch<GalleryImage[]>(featuredGalleryQuery),
  ]);

  return {
    guests: guests.status === "fulfilled" && guests.value?.length
      ? guests.value.map(adaptGuest)
      : undefined,
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
  const { guests, testimonials, portfolio, serviceCategories, gallery } = await fetchSanityData();

  return (
    <>
      <HeroSection />
      <GuestsSection guests={guests} />
      <ServicesSection serviceCategories={serviceCategories} />
      <PortfolioSection portfolioItems={portfolio} />
      <TestimonialsSection testimonials={testimonials} />
      <GallerySection images={gallery} />
      <ContactSection />
    </>
  );
}

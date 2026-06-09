/**
 * Adapter functions that convert Sanity document types into the shapes
 * expected by the existing client components. This keeps component changes
 * minimal while adding full CMS support.
 */

import { urlFor } from "./image";
import type { Guest, Testimonial, Portfolio, Service, GalleryImage } from "./types";
import type { Guest as ComponentGuest } from "@/lib/data/guests";
import type { Testimonial as ComponentTestimonial } from "@/lib/data/testimonials";
import type { PortfolioItem } from "@/lib/data/portfolio";
import type { GalleryImage as ComponentGallery } from "@/lib/data/gallery";

// ServiceCategory type defined inline since services.ts doesn't export it
type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: Array<{ title: string; description: string; icon: string }>;
};

export function adaptGuest(g: Guest): ComponentGuest {
  return {
    id: g._id,
    name: g.name,
    title: g.title ?? "",
    company: g.company,
    image: g.photo ? urlFor(g.photo).width(400).height(400).url() : "",
    bio: g.bio ?? "",
    achievements: g.achievements ?? [],
    verified: g.verified ?? false,
    category: g.category ?? "Other",
    socialLinks: {
      instagram: g.socialLinks?.instagram,
      linkedin: g.socialLinks?.linkedin,
      twitter: g.socialLinks?.twitter,
      youtube: g.socialLinks?.youtube,
      website: g.socialLinks?.website,
    },
    pastEvents: (g.pastEvents ?? []).map((event) => ({
      eventName: event,
      year: "",
      role: "",
    })),
  };
}

export function adaptTestimonial(t: Testimonial): ComponentTestimonial {
  return {
    id: t._id,
    name: t.name,
    role: t.role ?? "",
    company: t.company ?? "",
    image: t.photo ? urlFor(t.photo).width(200).height(200).url() : "",
    rating: t.rating,
    review: t.review,
    eventType: t.eventType ?? "",
  };
}

export function adaptPortfolio(p: Portfolio): PortfolioItem {
  return {
    id: p._id,
    title: p.title,
    category: p.category as PortfolioItem["category"],
    tags: p.tags ?? [],
    description: p.description ?? "",
    image: p.coverImage ? urlFor(p.coverImage).width(600).height(400).url() : "",
    year: p.year?.toString() ?? new Date().getFullYear().toString(),
    client: p.client ?? "",
  };
}

export function adaptServiceToCategory(services: Service[]): ServiceCategory[] {
  const grouped: Record<string, ServiceCategory> = {};

  for (const svc of services) {
    const cat = svc.category;
    if (!grouped[cat]) {
      grouped[cat] = {
        id: cat,
        title: svc.title,
        description: svc.shortDescription,
        icon: svc.icon ?? "Calendar",
        services: [],
      };
    }
    for (const sub of svc.subServices ?? []) {
      grouped[cat].services.push({
        title: sub.title,
        description: sub.description ?? "",
        icon: sub.icon ?? svc.icon ?? "Calendar",
      });
    }
    if (!svc.subServices?.length) {
      grouped[cat].services.push({
        title: svc.title,
        description: svc.shortDescription,
        icon: svc.icon ?? "Calendar",
      });
    }
  }

  return Object.values(grouped);
}

export function adaptGalleryImage(img: GalleryImage): ComponentGallery {
  return {
    id: img._id,
    src: urlFor(img.image).width(600).url(),
    alt: img.alt,
    category: img.category ?? "Events",
    width: 600,
    height: 400,
  };
}

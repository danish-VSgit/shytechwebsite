/**
 * Adapter functions that convert Sanity document types into the shapes
 * expected by the existing client components. This keeps component changes
 * minimal while adding full CMS support.
 */

import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "./image";
import type { Guest, GuestEventAppearance, Testimonial, Portfolio, Service, GalleryImage, SEO } from "./types";
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

export interface GuestSocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  website?: string;
}

export interface GuestPastEvent {
  eventName: string;
  year: string;
  role: string;
}

export interface ComponentGuest {
  id: string;
  slug: string;
  name: string;
  title: string;
  company?: string;
  image: string;
  bio: string;
  achievements: string[];
  socialLinks: GuestSocialLinks;
  pastEvents: GuestPastEvent[];
  verified: boolean;
  category: string;
  featured?: boolean;
}

export interface GuestProfile {
  id: string;
  slug: string;
  name: string;
  title: string;
  company?: string;
  category: string;
  image: string;
  bio: string;
  fullBiography?: PortableTextBlock[];
  experienceYears?: number;
  achievements: string[];
  awards: string[];
  pastEvents: string[];
  eventAppearances: GuestEventAppearance[];
  galleryImages: string[];
  featuredVideo?: string;
  interviewVideo?: string;
  verified: boolean;
  featured: boolean;
  socialLinks: GuestSocialLinks;
  seo?: SEO;
}

export function adaptGuest(g: Guest): ComponentGuest {
  return {
    id: g._id,
    slug: g.slug.current,
    name: g.name,
    title: g.title ?? "",
    company: g.company,
    image: g.photo ? urlFor(g.photo).width(400).height(400).url() : "",
    bio: g.bio ?? "",
    achievements: g.achievements ?? [],
    verified: g.verified ?? false,
    featured: g.featured ?? false,
    category: g.category ?? "Other",
    socialLinks: {
      instagram: g.socialLinks?.instagram,
      linkedin: g.socialLinks?.linkedin,
      twitter: g.socialLinks?.twitter,
      youtube: g.socialLinks?.youtube,
      facebook: g.socialLinks?.facebook,
      website: g.socialLinks?.website,
    },
    pastEvents: (g.pastEvents ?? []).map((event) => ({
      eventName: event,
      year: "",
      role: "",
    })),
  };
}

export function adaptGuestProfile(g: Guest): GuestProfile {
  return {
    id: g._id,
    slug: g.slug.current,
    name: g.name,
    title: g.title ?? "",
    company: g.company,
    category: g.category ?? "Other",
    image: g.photo ? urlFor(g.photo).width(800).height(800).url() : "",
    bio: g.bio ?? "",
    fullBiography: g.fullBiography,
    experienceYears: g.experienceYears,
    achievements: g.achievements ?? [],
    awards: g.awards ?? [],
    pastEvents: g.pastEvents ?? [],
    eventAppearances: g.eventAppearances ?? [],
    galleryImages: (g.galleryImages ?? []).map((img) => urlFor(img).width(600).height(450).url()),
    featuredVideo: g.featuredVideo,
    interviewVideo: g.interviewVideo,
    verified: g.verified ?? false,
    featured: g.featured ?? false,
    socialLinks: {
      instagram: g.socialLinks?.instagram,
      linkedin: g.socialLinks?.linkedin,
      twitter: g.socialLinks?.twitter,
      youtube: g.socialLinks?.youtube,
      facebook: g.socialLinks?.facebook,
      website: g.socialLinks?.website,
    },
    seo: g.seo,
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

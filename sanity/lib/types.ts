import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
  caption?: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  keywords?: string[];
  noIndex?: boolean;
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface Guest {
  _id: string;
  _type: "guest";
  name: string;
  slug: { current: string };
  title?: string;
  company?: string;
  category?: string;
  photo?: SanityImage;
  bio?: string;
  achievements?: string[];
  pastEvents?: string[];
  verified?: boolean;
  socialLinks?: SocialLinks;
  order?: number;
  featured?: boolean;
  seo?: SEO;
}

export interface EventDoc {
  _id: string;
  _type: "event";
  title: string;
  slug: { current: string };
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category?: string;
  date?: string;
  endDate?: string;
  venue?: string;
  location?: string;
  description?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  capacity?: number;
  client?: string;
  guests?: Guest[];
  featured?: boolean;
  highlights?: string[];
  seo?: SEO;
}

export interface Portfolio {
  _id: string;
  _type: "portfolio";
  title: string;
  slug: { current: string };
  category: string;
  client?: string;
  year?: number;
  description?: string;
  fullDescription?: PortableTextBlock[];
  coverImage: SanityImage;
  images?: SanityImage[];
  tags?: string[];
  services?: string[];
  videoUrl?: string;
  testimonial?: Testimonial;
  featured?: boolean;
  order?: number;
  seo?: SEO;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  slug: { current: string };
  role: string;
  department?: string;
  photo?: SanityImage;
  bio?: string;
  skills?: string[];
  socialLinks?: SocialLinks;
  email?: string;
  order?: number;
  featured?: boolean;
  seo?: SEO;
}

export interface Blog {
  _id: string;
  _type: "blog";
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: SanityImage;
  content?: PortableTextBlock[];
  author?: TeamMember;
  publishedAt?: string;
  categories?: string[];
  readingTime?: number;
  featured?: boolean;
  relatedPosts?: Blog[];
  seo?: SEO;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  role?: string;
  company?: string;
  photo?: SanityImage;
  rating: number;
  review: string;
  eventType?: string;
  featured?: boolean;
  order?: number;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: { current: string };
  category: string;
  icon?: string;
  shortDescription: string;
  description?: PortableTextBlock[];
  coverImage?: SanityImage;
  features?: string[];
  subServices?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  startingPrice?: string;
  order?: number;
  featured?: boolean;
  seo?: SEO;
}

export interface GalleryImage {
  _id: string;
  _type: "galleryImage";
  image: SanityImage;
  alt: string;
  title?: string;
  category?: string;
  order?: number;
  featured?: boolean;
}

export interface Video {
  _id: string;
  _type: "video";
  title: string;
  slug: { current: string };
  description?: string;
  thumbnail?: SanityImage;
  videoType: "url" | "file";
  videoUrl?: string;
  videoFile?: { asset: { url: string } };
  category?: string;
  duration?: string;
  event?: EventDoc;
  publishedAt?: string;
  featured?: boolean;
  order?: number;
  seo?: SEO;
}

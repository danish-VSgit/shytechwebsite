import { groq } from "next-sanity";

// ── Fragments ──────────────────────────────────────────────────────────────────

const seoFragment = groq`seo {
  metaTitle,
  metaDescription,
  ogImage,
  keywords,
  noIndex
}`;

const imageFragment = groq`{
  asset,
  hotspot,
  alt,
  caption
}`;

// ── Guests ─────────────────────────────────────────────────────────────────────

export const guestsQuery = groq`
  *[_type == "guest"] | order(featured desc, order asc, name asc) {
    _id, name, slug, title, company, category, photo ${imageFragment},
    bio, achievements, pastEvents, verified, socialLinks, order, featured
  }
`;

export const featuredGuestsQuery = groq`
  *[_type == "guest" && featured == true] | order(order asc) [0...8] {
    _id, name, slug, title, company, category, photo ${imageFragment},
    bio, achievements, pastEvents, verified, socialLinks, featured
  }
`;

export const guestSlugsQuery = groq`
  *[_type == "guest" && defined(slug.current)][].slug.current
`;

export const guestBySlugQuery = groq`
  *[_type == "guest" && slug.current == $slug][0] {
    _id, name, slug, title, company, category, photo ${imageFragment},
    bio, fullBiography, experienceYears, achievements, awards,
    pastEvents, eventAppearances, galleryImages[] ${imageFragment},
    featuredVideo, interviewVideo, verified, socialLinks, featured,
    ${seoFragment}
  }
`;

// ── Events ─────────────────────────────────────────────────────────────────────

export const eventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id, title, slug, status, category, date, endDate, venue, location,
    description, coverImage ${imageFragment}, capacity, client, featured,
    "guestNames": guests[]->name
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true] | order(date desc) [0...6] {
    _id, title, slug, status, category, date, venue, location,
    description, coverImage ${imageFragment}, capacity, client
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id, title, slug, status, category, date, endDate, venue, location,
    description, coverImage ${imageFragment},
    gallery[] ${imageFragment},
    capacity, client, highlights,
    guests[]-> { _id, name, title, company, photo ${imageFragment} },
    ${seoFragment}
  }
`;

// ── Portfolio ──────────────────────────────────────────────────────────────────

export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc, year desc) {
    _id, title, slug, category, client, year, description,
    coverImage ${imageFragment}, tags, services, videoUrl, featured, order
  }
`;

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc) [0...9] {
    _id, title, slug, category, client, year, description,
    coverImage ${imageFragment}, tags
  }
`;

export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id, title, slug, category, client, year, description, fullDescription,
    coverImage ${imageFragment},
    images[] ${imageFragment},
    tags, services, videoUrl, featured,
    testimonial-> { _id, name, role, company, photo ${imageFragment}, rating, review },
    ${seoFragment}
  }
`;

// ── Blog ───────────────────────────────────────────────────────────────────────

export const blogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage ${imageFragment},
    author-> { _id, name, role, photo ${imageFragment} },
    publishedAt, categories, readingTime, featured
  }
`;

export const featuredBlogsQuery = groq`
  *[_type == "blog" && featured == true] | order(publishedAt desc) [0...6] {
    _id, title, slug, excerpt, coverImage ${imageFragment},
    author-> { _id, name, role, photo ${imageFragment} },
    publishedAt, categories, readingTime
  }
`;

export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id, title, slug, excerpt, coverImage ${imageFragment}, content,
    author-> { _id, name, role, bio, photo ${imageFragment}, socialLinks },
    publishedAt, categories, readingTime, featured,
    relatedPosts[]-> {
      _id, title, slug, excerpt, coverImage ${imageFragment}, publishedAt, categories
    },
    ${seoFragment}
  }
`;

// ── Testimonials ───────────────────────────────────────────────────────────────

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, name, role, company, photo ${imageFragment}, rating, review, eventType, featured, order
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) [0...6] {
    _id, name, role, company, photo ${imageFragment}, rating, review, eventType
  }
`;

// ── Team Members ───────────────────────────────────────────────────────────────

export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, slug, role, department, photo ${imageFragment},
    bio, skills, socialLinks, email, order, featured
  }
`;

export const featuredTeamQuery = groq`
  *[_type == "teamMember" && featured == true] | order(order asc) {
    _id, name, slug, role, department, photo ${imageFragment}, bio, skills, socialLinks
  }
`;

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id, name, slug, role, department, photo ${imageFragment},
    bio, skills, socialLinks, email, ${seoFragment}
  }
`;

// ── Services ───────────────────────────────────────────────────────────────────

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, category, icon, shortDescription, description,
    coverImage ${imageFragment}, features, subServices, startingPrice, order, featured
  }
`;

export const servicesByCategoryQuery = groq`
  *[_type == "service" && category == $category] | order(order asc) {
    _id, title, slug, category, icon, shortDescription, coverImage ${imageFragment},
    features, subServices, startingPrice
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, category, icon, shortDescription, description,
    coverImage ${imageFragment}, features, subServices, startingPrice, ${seoFragment}
  }
`;

// ── Gallery ────────────────────────────────────────────────────────────────────

export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc, _createdAt desc) {
    _id, image ${imageFragment}, alt, title, category, order, featured
  }
`;

export const featuredGalleryQuery = groq`
  *[_type == "galleryImage" && featured == true] | order(order asc) [0...12] {
    _id, image ${imageFragment}, alt, title, category
  }
`;

// ── Videos ─────────────────────────────────────────────────────────────────────

export const videosQuery = groq`
  *[_type == "video"] | order(order asc, publishedAt desc) {
    _id, title, slug, description, thumbnail ${imageFragment},
    videoType, videoUrl, "videoFileUrl": videoFile.asset->url,
    category, duration, publishedAt, featured, order
  }
`;

export const featuredVideosQuery = groq`
  *[_type == "video" && featured == true] | order(order asc) [0...6] {
    _id, title, slug, description, thumbnail ${imageFragment},
    videoType, videoUrl, "videoFileUrl": videoFile.asset->url,
    category, duration, publishedAt
  }
`;

export const videoBySlugQuery = groq`
  *[_type == "video" && slug.current == $slug][0] {
    _id, title, slug, description, thumbnail ${imageFragment},
    videoType, videoUrl, "videoFileUrl": videoFile.asset->url,
    category, duration, publishedAt,
    event-> { _id, title, slug },
    ${seoFragment}
  }
`;

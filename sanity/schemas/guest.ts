import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const guest = defineType({
  name: "guest",
  title: "Guests",
  type: "document",
  icon: () => "🎤",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      description: "e.g. Founder & CEO, Motivational Speaker",
    }),
    defineField({
      name: "company",
      title: "Company / Organisation",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Entrepreneur", value: "entrepreneur" },
          { title: "Celebrity", value: "celebrity" },
          { title: "Speaker", value: "speaker" },
          { title: "Influencer", value: "influencer" },
          { title: "Politician", value: "politician" },
          { title: "Sports Person", value: "sports" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 4,
      description: "Brief summary shown on guest cards and the About section of the profile",
    }),
    defineField({
      name: "fullBiography",
      title: "Full Biography",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed, rich-text biography shown on the guest's profile page",
    }),
    defineField({
      name: "experienceYears",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      description: "List notable achievements, e.g. 'Forbes 30 Under 30'",
    }),
    defineField({
      name: "awards",
      title: "Awards & Recognitions",
      type: "array",
      of: [{ type: "string" }],
      description: "List awards, recognitions and honours",
    }),
    defineField({
      name: "pastEvents",
      title: "Past Events",
      type: "array",
      of: [{ type: "string" }],
      description: "Events this guest has spoken at or attended",
    }),
    defineField({
      name: "eventAppearances",
      title: "Event Appearances",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "eventName", title: "Event Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", title: "Role", type: "string", description: "e.g. Keynote Speaker, Chief Guest" }),
            defineField({ name: "date", title: "Appearance Date", type: "date" }),
          ],
          preview: {
            select: { title: "eventName", subtitle: "role" },
          },
        },
      ],
      description: "Structured record of speaking sessions and appearance dates",
    }),
    defineField({
      name: "galleryImages",
      title: "Media Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Event photos and gallery images for this guest's profile",
    }),
    defineField({
      name: "featuredVideo",
      title: "Featured Video URL",
      type: "url",
      description: "YouTube or Vimeo link — primary highlight video",
    }),
    defineField({
      name: "interviewVideo",
      title: "Interview Video URL",
      type: "url",
      description: "YouTube or Vimeo link — interview video",
    }),
    defineField({
      name: "verified",
      title: "Verified Guest",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "website", title: "Website URL", type: "url" }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "featured",
      title: "Featured Guest",
      type: "boolean",
      initialValue: false,
      description: "Featured guests appear first on the homepage and receive a special highlight",
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Featured First", name: "featuredFirst", by: [{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }] },
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Name A→Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});

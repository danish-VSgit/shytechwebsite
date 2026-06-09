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
      title: "Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      description: "List notable achievements, e.g. 'Forbes 30 Under 30'",
    }),
    defineField({
      name: "pastEvents",
      title: "Past Events",
      type: "array",
      of: [{ type: "string" }],
      description: "Events this guest has spoken at or attended",
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
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Name A→Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});

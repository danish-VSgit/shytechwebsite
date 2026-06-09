import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: () => "⚡",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Event Management", value: "event-management" },
          { title: "Media Production", value: "media-production" },
          { title: "Post Production", value: "post-production" },
          { title: "Guest Management", value: "guest-management" },
          { title: "Brand & Digital", value: "brand-digital" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide React icon name (e.g. Calendar, Camera, Film, Users, TrendingUp)",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description shown in cards (under 120 characters)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "Key Features / Inclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "List what is included in this service",
    }),
    defineField({
      name: "subServices",
      title: "Sub-Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Sub-Service Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "string",
      description: "e.g. ₹50,000 or Contact for pricing",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
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
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

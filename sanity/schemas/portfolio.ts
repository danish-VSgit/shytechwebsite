import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const portfolio = defineType({
  name: "portfolio",
  title: "Portfolio Projects",
  type: "document",
  icon: () => "🎬",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
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
          { title: "Events", value: "events" },
          { title: "Weddings", value: "weddings" },
          { title: "Corporate", value: "corporate" },
          { title: "Video Production", value: "video" },
          { title: "Commercial", value: "commercial" },
          { title: "Brand Activation", value: "brand" },
          { title: "Photography", value: "photography" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Full Project Story",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed description with rich text formatting",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", type: "string", title: "Caption" }),
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "services",
      title: "Services Provided",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "videoUrl",
      title: "Project Video URL",
      type: "url",
      description: "YouTube or Vimeo link for this project",
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Newest First", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage", category: "category" },
    prepare({ title, subtitle, media, category }) {
      return { title, subtitle: `${category ?? ""} · ${subtitle ?? ""}`, media };
    },
  },
});

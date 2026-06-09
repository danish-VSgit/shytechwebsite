import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  icon: () => "👤",
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
      name: "role",
      title: "Role / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Event Management", value: "event-management" },
          { title: "Production", value: "production" },
          { title: "Creative", value: "creative" },
          { title: "Technology", value: "technology" },
          { title: "Sales & Marketing", value: "sales-marketing" },
          { title: "Operations", value: "operations" },
        ],
      },
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
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
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "website", title: "Website URL", type: "url" }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email (optional)",
      type: "email",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "featured",
      title: "Show on About Page",
      type: "boolean",
      initialValue: true,
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});

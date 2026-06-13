import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Images",
  type: "document",
  icon: () => "🖼️",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Corporate", value: "corporate" },
          { title: "Brand Activation", value: "brand-activation" },
          { title: "Events", value: "events" },
          { title: "Production", value: "production" },
          { title: "Behind the Scenes", value: "bts" },
          { title: "Venue", value: "venue" },
        ],
      },
    }),
    defineField({
      name: "event",
      title: "Related Event",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Newest First", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "alt", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title ?? "Gallery Image", subtitle: subtitle ?? "", media };
    },
  },
});

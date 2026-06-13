import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: () => "⭐",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Client Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Corporate Event", value: "corporate-event" },
          { title: "Summit", value: "summit" },
          { title: "Product Launch", value: "product-launch" },
          { title: "Conference", value: "conference" },
          { title: "Brand Activation", value: "brand-activation" },
          { title: "Video Production", value: "video-production" },
          { title: "Photography", value: "photography" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "photo", rating: "rating" },
    prepare({ title, subtitle, media, rating }) {
      const stars = "★".repeat(rating ?? 5);
      return { title, subtitle: `${stars} · ${subtitle ?? ""}`, media };
    },
  },
});

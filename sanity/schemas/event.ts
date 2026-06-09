import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",
  icon: () => "📅",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Event Category",
      type: "string",
      options: {
        list: [
          { title: "Corporate", value: "corporate" },
          { title: "Wedding", value: "wedding" },
          { title: "Conference", value: "conference" },
          { title: "Product Launch", value: "product-launch" },
          { title: "Brand Activation", value: "brand-activation" },
          { title: "Fashion Show", value: "fashion-show" },
          { title: "Concert", value: "concert" },
          { title: "Award Ceremony", value: "award-ceremony" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Start Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "City / Location",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Event Gallery",
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
      name: "capacity",
      title: "Capacity (guests)",
      type: "number",
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "guests",
      title: "Guest Speakers / Celebrities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "guest" }] }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "highlights",
      title: "Event Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Newest First", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Oldest First", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "venue",
      media: "coverImage",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${status?.toUpperCase() ?? ""} · ${subtitle ?? ""}`,
        media,
      };
    },
  },
});

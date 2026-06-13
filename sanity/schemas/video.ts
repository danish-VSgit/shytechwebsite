import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const video = defineType({
  name: "video",
  title: "Videos",
  type: "document",
  icon: () => "🎥",
  fields: [
    defineField({
      name: "title",
      title: "Video Title",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoType",
      title: "Video Source",
      type: "string",
      options: {
        list: [
          { title: "YouTube / Vimeo URL", value: "url" },
          { title: "Uploaded File (Sanity Asset)", value: "file" },
        ],
        layout: "radio",
      },
      initialValue: "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or other video URL",
      hidden: ({ document }) => document?.videoType !== "url",
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4/WebM file directly",
      hidden: ({ document }) => document?.videoType !== "file",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Event Highlights", value: "event-highlights" },
          { title: "Podcast", value: "podcast" },
          { title: "Corporate", value: "corporate" },
          { title: "Commercial", value: "commercial" },
          { title: "AI Generated", value: "ai-generated" },
          { title: "Behind the Scenes", value: "bts" },
          { title: "Showreel", value: "showreel" },
          { title: "Client Testimonial", value: "testimonial" },
        ],
      },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 3:24 or 1:05:30",
    }),
    defineField({
      name: "event",
      title: "Related Event",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
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
    { title: "Newest First", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
  },
});

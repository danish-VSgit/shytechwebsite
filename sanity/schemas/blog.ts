import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const blog = defineType({
  name: "blog",
  title: "Blog Posts",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in blog listing (150-200 characters)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Post Content",
      type: "array",
      of: [
        { type: "block" },
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Event Planning", value: "event-planning" },
          { title: "Conferences & Summits", value: "conferences-summits" },
          { title: "Corporate Events", value: "corporate-events" },
          { title: "Videography", value: "videography" },
          { title: "Photography", value: "photography" },
          { title: "AI & Technology", value: "ai-technology" },
          { title: "Brand & Marketing", value: "brand-marketing" },
          { title: "Behind the Scenes", value: "behind-the-scenes" },
          { title: "Industry News", value: "industry-news" },
        ],
        layout: "tags",
      },
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
      validation: (Rule) => Rule.max(3),
    }),
    ...seoFields,
  ],
  orderings: [
    { title: "Newest First", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Oldest First", name: "publishedAsc", by: [{ field: "publishedAt", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN") : "Unpublished";
      return { title, subtitle: `${author ?? "Unknown"} · ${date}`, media };
    },
  },
});

import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
      defineField({
        name: "metaTitle",
        title: "Meta Title",
        type: "string",
        description: "Page title for search engines (50-60 characters recommended)",
        validation: (Rule) => Rule.max(60).warning("Keep meta title under 60 characters"),
      }),
      defineField({
        name: "metaDescription",
        title: "Meta Description",
        type: "text",
        rows: 3,
        description: "Page description for search engines (150-160 characters recommended)",
        validation: (Rule) => Rule.max(160).warning("Keep meta description under 160 characters"),
      }),
      defineField({
        name: "ogImage",
        title: "Social Share Image",
        type: "image",
        description: "Image shown when sharing on social media (1200×630px recommended)",
        options: { hotspot: true },
      }),
      defineField({
        name: "keywords",
        title: "Keywords",
        type: "array",
        of: [{ type: "string" }],
        options: { layout: "tags" },
        description: "Keywords that describe this content",
      }),
      defineField({
        name: "noIndex",
        title: "Hide from Search Engines",
        type: "boolean",
        initialValue: false,
        description: "Enable to prevent this page from appearing in search results",
      }),
    ],
  }),
];

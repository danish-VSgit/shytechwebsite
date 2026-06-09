import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "shytech-studio",
  title: "SHYTECH Admin",
  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("SHYTECH Content")
          .items([
            S.listItem()
              .title("Events")
              .icon(() => "📅")
              .child(S.documentTypeList("event").title("Events")),
            S.listItem()
              .title("Portfolio Projects")
              .icon(() => "🎬")
              .child(S.documentTypeList("portfolio").title("Portfolio")),
            S.listItem()
              .title("Blog Posts")
              .icon(() => "📝")
              .child(S.documentTypeList("blog").title("Blog Posts")),
            S.listItem()
              .title("Guests")
              .icon(() => "🎤")
              .child(S.documentTypeList("guest").title("Guests")),
            S.listItem()
              .title("Testimonials")
              .icon(() => "⭐")
              .child(S.documentTypeList("testimonial").title("Testimonials")),
            S.listItem()
              .title("Team Members")
              .icon(() => "👤")
              .child(S.documentTypeList("teamMember").title("Team Members")),
            S.listItem()
              .title("Services")
              .icon(() => "⚡")
              .child(S.documentTypeList("service").title("Services")),
            S.listItem()
              .title("Gallery Images")
              .icon(() => "🖼️")
              .child(S.documentTypeList("galleryImage").title("Gallery Images")),
            S.listItem()
              .title("Videos")
              .icon(() => "🎥")
              .child(S.documentTypeList("video").title("Videos")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

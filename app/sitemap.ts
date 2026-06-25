import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://queuecap.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/guests",
    "/portfolio",
    "/blog",
    "/contact",
    "/careers",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" || route === "/contact" ? 0.9 : 0.7,
  }));
}

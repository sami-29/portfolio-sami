import type { MetadataRoute } from "next";
import { portfolioConfig } from "../utils/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolioConfig.seo.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

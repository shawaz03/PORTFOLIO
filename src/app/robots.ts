import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Bytespider",
          "CCBot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://shawaz.vercel.app/sitemap.xml",
  };
}


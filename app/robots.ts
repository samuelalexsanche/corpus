import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // GEO: se permite explícitamente el rastreo por motores generativos.
      // El contenido está escrito para ser citable y verificable.
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${SITIO.url}/sitemap.xml`,
    host: SITIO.url,
  };
}

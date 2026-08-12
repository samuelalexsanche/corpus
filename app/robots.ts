import type { MetadataRoute } from "next";
import { SITIO, urlAbs } from "@/lib/seo";

// `output: export` exige que las rutas de metadatos sean estáticas explícitamente.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // GEO: se permite explícitamente el rastreo por motores generativos.
      // El contenido está escrito para ser citable y verificable.
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${urlAbs("/")}sitemap.xml`,
    host: new URL(SITIO.url).host,
  };
}

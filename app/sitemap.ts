import type { MetadataRoute } from "next";
import { BLOQUES } from "@/content/curriculum";
import { TEMAS } from "@/content/temas";
import { CASOS } from "@/content/casos";
import { urlAbs } from "@/lib/seo";

// `output: export` exige que las rutas de metadatos sean estáticas explícitamente.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const fijas = ["/", "/curriculum", "/practicar", "/practicar/tarjetas", "/practicar/recall",
    "/practicar/casos", "/practicar/terminologia", "/practicar/perturbaciones",
    "/metodo", "/recursos", "/progreso", "/sobre"];

  return [
    ...fijas.map((r) => ({
      url: urlAbs(r), lastModified: ahora,
      changeFrequency: "weekly" as const, priority: r === "/" ? 1 : 0.8,
    })),
    ...BLOQUES.map((b) => ({
      url: urlAbs(`/bloque/${b.slug}`), lastModified: ahora,
      changeFrequency: "monthly" as const, priority: 0.75,
    })),
    ...TEMAS.map((t) => ({
      url: urlAbs(`/tema/${t.slug}`), lastModified: ahora,
      changeFrequency: "monthly" as const, priority: 0.9,
    })),
    ...CASOS.map((c) => ({
      url: urlAbs(`/practicar/casos/${c.slug}`), lastModified: ahora,
      changeFrequency: "monthly" as const, priority: 0.7,
    })),
  ];
}

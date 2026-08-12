import type { Metadata } from "next";

export const SITIO = {
  nombre: "Corpus",
  tagline: "Aprende medicina por mecanismo, no por memoria",
  descripcion:
    "Plataforma abierta y gratuita para estudiar medicina con recuperación activa, repetición espaciada y razonamiento clínico. Currículum completo, tarjetas, casos y calibración honesta.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://corpus.study",
  locale: "es_MX",
  idioma: "es",
  autor: "Proyecto Corpus",
  repo: "https://github.com/corpus-med/corpus",
};

export function metaPagina({
  titulo, descripcion, ruta, tipo = "website", keywords = [],
}: { titulo: string; descripcion: string; ruta: string; tipo?: "website" | "article"; keywords?: string[] }): Metadata {
  const url = `${SITIO.url}${ruta}`;
  const tituloCompleto = ruta === "/" ? `${SITIO.nombre} — ${SITIO.tagline}` : `${titulo} · ${SITIO.nombre}`;
  return {
    title: tituloCompleto,
    description: descripcion,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: tituloCompleto, description: descripcion, url, siteName: SITIO.nombre,
      locale: SITIO.locale, type: tipo,
      images: [{ url: `${SITIO.url}/og?titulo=${encodeURIComponent(titulo)}`, width: 1200, height: 630, alt: titulo }],
    },
    twitter: { card: "summary_large_image", title: tituloCompleto, description: descripcion },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  };
}

/* ---------- JSON-LD ---------- */

export const ldOrganizacion = () => ({
  "@context": "https://schema.org", "@type": "EducationalOrganization",
  name: SITIO.nombre, url: SITIO.url, description: SITIO.descripcion,
  inLanguage: SITIO.idioma, sameAs: [SITIO.repo],
});

export const ldCurso = (b: { titulo: string; subtitulo: string; slug: string; porQue: string }) => ({
  "@context": "https://schema.org", "@type": "Course",
  name: b.titulo, description: b.porQue, url: `${SITIO.url}/bloque/${b.slug}`,
  inLanguage: SITIO.idioma, isAccessibleForFree: true,
  provider: { "@type": "EducationalOrganization", name: SITIO.nombre, url: SITIO.url },
  hasCourseInstance: {
    "@type": "CourseInstance", courseMode: "online",
    courseWorkload: "PT10H", inLanguage: SITIO.idioma,
  },
});

export const ldArticulo = (t: { titulo: string; resumen: string; slug: string; minutos: number }) => ({
  "@context": "https://schema.org", "@type": "ScholarlyArticle",
  headline: t.titulo, description: t.resumen, url: `${SITIO.url}/tema/${t.slug}`,
  inLanguage: SITIO.idioma, isAccessibleForFree: true,
  timeRequired: `PT${t.minutos}M`,
  author: { "@type": "Organization", name: SITIO.autor },
  publisher: { "@type": "Organization", name: SITIO.nombre, url: SITIO.url },
  about: { "@type": "MedicalEntity", name: t.titulo },
});

export const ldFAQ = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const ldMigas = (items: { nombre: string; ruta: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem", position: i + 1, name: it.nombre, item: `${SITIO.url}${it.ruta}`,
  })),
});

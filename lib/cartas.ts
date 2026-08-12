/**
 * La baraja completa de la plataforma, en un solo sitio.
 *
 * Vivía duplicada en la página de tarjetas; ahora la comparten todos los modos
 * que barajan cartas —repetición espaciada, mezcla y calibración— para que
 * añadir un tema las alimente a las tres a la vez.
 */
import type { CartaBase } from "@/components/flashcard-session";
import { TEMAS } from "@/content/temas";
import { MORFEMAS, DISTINCIONES, DESCOMPOSICIONES } from "@/content/morfemas";

export const TODAS_LAS_CARTAS: CartaBase[] = [
  ...MORFEMAS.map((m, i) => ({
    id: `morf-${i}`,
    front: `¿Qué significa el morfema ${m.m}?`,
    back: `${m.sig}.<br><em>Ej.: ${m.ej}</em>`,
    mazo: "Terminología · morfemas",
  })),
  ...DISTINCIONES.map((d, i) => ({ id: `dist-${i}`, front: d.q, back: d.a, mazo: "Terminología · distinciones" })),
  ...DESCOMPOSICIONES.map((d, i) => ({
    id: `desc-${i}`,
    front: `Descompón el término: <strong>${d.t}</strong>`,
    back: d.d,
    mazo: "Terminología · descomposición",
  })),
  ...TEMAS.flatMap((t) =>
    t.tarjetas.map((c, i) => ({ id: `${t.slug}-${i}`, front: c.front, back: c.back, mazo: t.titulo }))
  ),
];

/** Tarjetas de un tema concreto, para la descarga por tema. */
export const cartasDeTema = (slug: string): CartaBase[] =>
  TODAS_LAS_CARTAS.filter((c) => c.id.startsWith(`${slug}-`));

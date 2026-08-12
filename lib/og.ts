/**
 * Mapa ruta → archivo Open Graph estático.
 *
 * Las imágenes se generan con `npm run og` (ver `scripts/generar-og.mts`) y se
 * sirven desde `public/og/`. Las páginas con entidad propia —bloques, temas y
 * casos— tienen imagen con su título; el resto comparte la portada.
 */
export function archivoOg(ruta: string): string {
  const limpia = ruta.replace(/\/+$/, "");
  const entidad =
    /^\/(?:bloque|tema)\/[a-z0-9-]+$/.test(limpia) ||
    /^\/practicar\/casos\/[a-z0-9-]+$/.test(limpia);
  if (!entidad) return "/og/portada.png";
  return `/og/${limpia.replace(/^\//, "").replace(/\//g, "-")}.png`;
}

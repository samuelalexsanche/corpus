/**
 * Dos modos de build:
 *
 *   npm run dev / npm run build   → servidor Next normal. `/og` funciona.
 *   EXPORT=1 npm run build        → sitio estático en `out/` para GitHub Pages.
 *
 * En modo export no hay runtime, así que `/og` se excluye del árbol de rutas y
 * la imagen Open Graph se sirve como archivo (`public/og.png`, generada por
 * `npm run og`). Ver CLAUDE.md → Gotchas.
 *
 * `BASE_PATH` es el subdirectorio bajo el que se sirve el sitio. En un Pages de
 * proyecto (usuario.github.io/corpus) vale "/corpus"; con dominio propio, "".
 *
 * @type {import('next').NextConfig}
 */
const esExport = process.env.EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  // Sin esto Turbopack sube la raíz buscando lockfiles fuera del repo.
  turbopack: { root: import.meta.dirname },
  images: { unoptimized: true },
  ...(esExport
    ? {
        output: "export",
        // GitHub Pages no reescribe /ruta → /ruta.html. Con trailingSlash cada
        // página se emite como ruta/index.html, que sí resuelve.
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
};
export default nextConfig;

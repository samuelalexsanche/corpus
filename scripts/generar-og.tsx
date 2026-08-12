/**
 * Genera las imágenes Open Graph como archivos estáticos en `public/og/`.
 *
 * Existe porque `output: 'export'` no admite rutas con runtime, así que la
 * antigua ruta `/og` no sobrevive al build estático. En vez de renderizar por
 * petición, se renderiza una vez por entidad y el resultado se versiona como
 * cualquier otro asset.
 *
 *   npm run og
 *
 * `lib/og.ts` decide qué archivo le toca a cada ruta. Si cambias el nombrado
 * aquí, cámbialo allá: son las dos mitades del mismo contrato.
 */
import { ImageResponse } from "next/og";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { BLOQUES } from "../content/curriculum";
import { TEMAS } from "../content/temas";
import { CASOS } from "../content/casos";
import { SITIO } from "../lib/seo";
import { archivoOg } from "../lib/og";

const SALIDA = join(process.cwd(), "public");

function tarjeta(titulo: string, pie: string) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0f1719",
        color: "#e6eeef",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#2aa9a5" }} />
        <div style={{ fontSize: 30, fontWeight: 600 }}>Corpus</div>
      </div>
      <div style={{ fontSize: 62, fontWeight: 600, lineHeight: 1.12, letterSpacing: -1.5, maxWidth: 980 }}>
        {titulo.slice(0, 110)}
      </div>
      <div style={{ fontSize: 25, color: "#8fa3a6" }}>{pie}</div>
    </div>
  );
}

async function escribir(rutaRelativa: string, titulo: string, pie: string) {
  const img = new ImageResponse(tarjeta(titulo, pie), { width: 1200, height: 630 });
  const bytes = Buffer.from(await img.arrayBuffer());
  const destino = join(SALIDA, rutaRelativa);
  await mkdir(join(destino, ".."), { recursive: true });
  await writeFile(destino, bytes);
  return rutaRelativa;
}

const dominio = new URL(SITIO.url).host;
const PIE = `Plataforma abierta de estudio médico · ${dominio}`;

const trabajos: { ruta: string; titulo: string }[] = [
  { ruta: "/", titulo: SITIO.tagline },
  ...BLOQUES.map((b) => ({ ruta: `/bloque/${b.slug}`, titulo: b.titulo })),
  ...TEMAS.map((t) => ({ ruta: `/tema/${t.slug}`, titulo: t.titulo })),
  ...CASOS.map((c) => ({ ruta: `/practicar/casos/${c.slug}`, titulo: c.titulo })),
];

async function main() {
  for (const t of trabajos) {
    console.log(`og  ${await escribir(archivoOg(t.ruta), t.titulo, PIE)}`);
  }
  console.log(`\n${trabajos.length} imágenes en public/og/`);
}

main();

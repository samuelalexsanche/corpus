import { describe, expect, it } from "vitest";
import { FIGURAS, getFigura } from "@/content/figuras";
import { LIBROS, CATALOGO } from "@/content/catalogo";
import { TEMAS } from "@/content/temas";

it("hay figuras y sus slugs son únicos", () => {
  expect(FIGURAS.length).toBeGreaterThan(0);
  const slugs = FIGURAS.map((f) => f.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});

it("toda figura referida desde un tema o del catálogo existe", () => {
  const usados = [
    ...TEMAS.map((t) => t.figura),
    ...CATALOGO.map((c) => c.figura),
  ].filter(Boolean) as string[];
  expect(usados.length, "ninguna figura está en uso").toBeGreaterThan(0);
  for (const slug of usados) {
    expect(getFigura(slug), `figura inexistente: ${slug}`).toBeDefined();
  }
});

describe.each(FIGURAS.map((f) => [f.slug, f] as const))("figura «%s»", (_slug, f) => {
  it("tiene título y un viewBox utilizable", () => {
    expect(f.titulo.trim().length).toBeGreaterThan(0);
    const nums = f.viewBox.split(/\s+/).map(Number);
    expect(nums).toHaveLength(4);
    expect(nums.every((n) => Number.isFinite(n))).toBe(true);
    expect(nums[2]).toBeGreaterThan(0);
    expect(nums[3]).toBeGreaterThan(0);
  });

  it("tiene partes suficientes para que valga la pena preguntarlas", () => {
    expect(f.partes.length).toBeGreaterThanOrEqual(3);
    const ids = f.partes.map((p) => p.id);
    expect(new Set(ids).size, "ids repetidos").toBe(ids.length);
  });

  it("cada parte se dibuja, se nombra y se explica", () => {
    for (const p of f.partes) {
      expect(p.trazos.length, `«${p.nombre}» no dibuja nada`).toBeGreaterThan(0);
      for (const t of p.trazos) expect(t.d.trim()).toMatch(/^M/);
      expect(p.nombre.trim().length).toBeGreaterThan(0);
      expect(p.explicacion.trim().length,
        `«${p.nombre}» se rotula pero no se explica`).toBeGreaterThan(80);
    }
  });

  it("los rótulos caen dentro del lienzo", () => {
    const [, , ancho, alto] = f.viewBox.split(/\s+/).map(Number);
    for (const p of f.partes) {
      const { x, y, haciaX, haciaY } = p.rotulo;
      for (const [cx, cy] of [[x, y], [haciaX, haciaY]]) {
        expect(cx, `«${p.nombre}» se sale por el eje X`).toBeGreaterThanOrEqual(0);
        expect(cx).toBeLessThanOrEqual(ancho);
        expect(cy, `«${p.nombre}» se sale por el eje Y`).toBeGreaterThanOrEqual(0);
        expect(cy).toBeLessThanOrEqual(alto);
      }
    }
  });

  it("los números no se amontonan unos sobre otros", () => {
    for (let i = 0; i < f.partes.length; i++) {
      for (let j = i + 1; j < f.partes.length; j++) {
        const a = f.partes[i].rotulo, b = f.partes[j].rotulo;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        expect(dist, `los números de «${f.partes[i].nombre}» y «${f.partes[j].nombre}» se solapan`)
          .toBeGreaterThan(28);
      }
    }
  });

  // Un esquema no es un atlas, y la figura tiene que decirlo ella misma.
  it("declara qué no muestra y contra qué se comprobó", () => {
    expect(f.advertencia.trim().length).toBeGreaterThan(60);
    expect(f.referencias.length).toBeGreaterThan(0);
    for (const r of f.referencias) {
      expect(LIBROS[r.libro], `libro desconocido: ${r.libro}`).toBeDefined();
      expect(r.donde.trim().length).toBeGreaterThan(8);
    }
  });
});

import { describe, expect, it } from "vitest";
import { CATALOGO, LIBROS } from "@/content/catalogo";
import { TEMAS } from "@/content/temas";
import { unidadesDelCurriculum } from "@/lib/indice";

const claves = new Set(unidadesDelCurriculum().map(({ unidad }) => unidad.clave));
const escritos = new Set(TEMAS.map((t) => t.slug));
const enCatalogo = new Set(CATALOGO.map((c) => c.slug));

it("el catálogo no está vacío", () => {
  expect(CATALOGO.length).toBeGreaterThan(50);
});

it("ningún slug del catálogo choca con un tema ya escrito", () => {
  // Comparten espacio de URL: /tema/<slug>. Si coincidieran, la entrada de
  // catálogo taparía al tema desarrollado o al revés.
  const choques = CATALOGO.filter((c) => escritos.has(c.slug)).map((c) => c.slug);
  expect(choques, `duplicados: ${choques.join(", ")}`).toEqual([]);
});

it("los slugs son únicos y válidos como URL", () => {
  const slugs = CATALOGO.map((c) => c.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
  for (const s of slugs) expect(s, `slug inválido: ${s}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
});

describe.each(CATALOGO.map((c) => [c.slug, c] as const))("«%s»", (_slug, c) => {
  // El error que este test existe para atrapar ya ocurrió una vez: se escribió
  // I8560 (Administración de la calidad) donde iba I8577 (Bioquímica).
  it("pertenece a una unidad que existe en el currículum", () => {
    expect(claves.has(c.unidad), `unidad desconocida: ${c.unidad}`).toBe(true);
  });

  it("describe qué es en un par de frases, ni menos ni de más", () => {
    expect(c.nombre.trim().length).toBeGreaterThan(0);
    expect(c.que.trim().length, "descripción demasiado corta para orientar").toBeGreaterThan(100);
    expect(c.que.trim().length, "si necesita tanto texto, pide un tema desarrollado").toBeLessThan(600);
  });

  it("dice dónde estudiarlo, con capítulo concreto", () => {
    expect(c.referencias.length, "sin referencias").toBeGreaterThan(0);
    for (const r of c.referencias) {
      expect(LIBROS[r.libro], `libro desconocido: ${r.libro}`).toBeDefined();
      expect(r.donde.trim().length, "referencia sin capítulo").toBeGreaterThan(8);
    }
  });

  it("sus vecinos existen, y no se enlaza a sí mismo", () => {
    for (const v of c.vecinos ?? []) {
      expect(enCatalogo.has(v) || escritos.has(v), `vecino inexistente: ${v}`).toBe(true);
    }
    expect(c.vecinos ?? []).not.toContain(c.slug);
  });

  it("no repite el nombre entre los sinónimos", () => {
    const n = c.nombre.toLowerCase();
    for (const s of c.sinonimos ?? []) expect(s.toLowerCase()).not.toBe(n);
  });
});

it("cubre las materias que un estudiante busca de verdad", () => {
  // Comprobación de cordura: si estas no están, el catálogo no cumple su
  // propósito por muchas entradas que tenga.
  for (const s of ["glucolisis", "ciclo-de-krebs", "potencial-de-accion", "inflamacion",
    "neoplasia", "huesos-del-craneo", "farmacocinetica", "nefrona"]) {
    expect(enCatalogo.has(s) || escritos.has(s), `falta un tema básico: ${s}`).toBe(true);
  }
});

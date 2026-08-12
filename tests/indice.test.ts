import { describe, expect, it } from "vitest";
import { buscar, claveASlug, construirIndice, temasDeUnidad, unidadesDelCurriculum } from "@/lib/indice";
import { BLOQUES, TOTAL_UNIDADES } from "@/content/curriculum";
import { TEMAS } from "@/content/temas";

const indice = construirIndice();
const titulos = (q: string) => buscar(indice, q).map((e) => e.titulo);

describe("cobertura del índice", () => {
  it("incluye todas las unidades del currículum, tengan tema o no", () => {
    const unidades = indice.filter((e) => e.tipo === "unidad");
    expect(unidades).toHaveLength(TOTAL_UNIDADES);
  });

  it("incluye todos los temas, bloques y casos", () => {
    expect(indice.filter((e) => e.tipo === "tema")).toHaveLength(TEMAS.length);
    expect(indice.filter((e) => e.tipo === "bloque")).toHaveLength(BLOQUES.length);
    expect(indice.filter((e) => e.tipo === "caso").length).toBeGreaterThan(0);
  });

  it("ninguna entrada se queda sin enlace ni sin texto buscable", () => {
    for (const e of indice) {
      expect(e.href.startsWith("/"), `href inválido en «${e.titulo}»`).toBe(true);
      expect(e.busqueda.length, `«${e.titulo}» no se puede buscar`).toBeGreaterThan(0);
      expect(e.titulo.trim().length).toBeGreaterThan(0);
    }
  });

  it("marca qué unidades ya tienen tema desarrollado", () => {
    const unidades = indice.filter((e) => e.tipo === "unidad");
    expect(unidades.some((u) => u.desarrollado)).toBe(true);
    expect(unidades.some((u) => !u.desarrollado)).toBe(true);
  });
});

describe("claves y slugs de unidad", () => {
  it("convierte la clave en un segmento de URL válido", () => {
    expect(claveASlug("B0.1")).toBe("b0-1");
    expect(claveASlug("I8568")).toBe("i8568");
  });

  it("no hay dos unidades que colisionen en el mismo slug", () => {
    const slugs = unidadesDelCurriculum().map(({ unidad }) => claveASlug(unidad.clave));
    expect(new Set(slugs).size, `colisión entre ${slugs.length} unidades`).toBe(slugs.length);
  });

  it("cada tema apunta a una unidad que existe en el currículum", () => {
    const claves = unidadesDelCurriculum().map(({ unidad }) => unidad.clave);
    for (const t of TEMAS) {
      const encaja = claves.some((c) => t.unidad.startsWith(c));
      expect(encaja, `«${t.slug}» dice pertenecer a «${t.unidad}», que no está en el currículum`).toBe(true);
    }
  });

  it("temasDeUnidad encuentra el tema por la clave", () => {
    const conTema = unidadesDelCurriculum()
      .map(({ unidad }) => unidad.clave)
      .find((c) => temasDeUnidad(c).length > 0);
    expect(conTema).toBeDefined();
  });
});

describe("buscar", () => {
  it("no devuelve nada con una consulta vacía o de una letra", () => {
    expect(buscar(indice, "")).toEqual([]);
    expect(buscar(indice, "a")).toEqual([]);
  });

  it("encuentra un tema por una palabra de su título", () => {
    expect(titulos("quiralidad").length).toBeGreaterThan(0);
  });

  it("no exige acentos ni mayúsculas", () => {
    expect(titulos("QUIRALIDAD").length).toBeGreaterThan(0);
    expect(titulos("ionizacion").length).toBeGreaterThan(0);
  });

  it("exige que aparezcan todas las palabras, no cualquiera de ellas", () => {
    // «zzzz» no está en ningún sitio, así que la consulta entera no debe acertar
    // aunque «fiebre» sí exista.
    expect(buscar(indice, "fiebre zzzz")).toEqual([]);
  });

  it("encuentra por palabras sueltas que no aparecen juntas en el texto", () => {
    expect(titulos("fiebre hipertermia").length).toBeGreaterThan(0);
  });

  it("prioriza el acierto en el título sobre el acierto en el cuerpo", () => {
    const r = buscar(indice, "quiralidad");
    expect(r[0].titulo.toLowerCase()).toContain("quiralidad");
  });

  it("encuentra una unidad sin tema desarrollado", () => {
    const sinTema = indice.find((e) => e.tipo === "unidad" && !e.desarrollado)!;
    const palabra = sinTema.titulo.split(/[\s:,]+/).find((p) => p.length > 5)!;
    expect(buscar(indice, palabra).some((e) => e.href === sinTema.href)).toBe(true);
  });

  it("encuentra morfemas por su significado", () => {
    expect(buscar(indice, "inflamacion").some((e) => e.tipo === "morfema")).toBe(true);
  });

  it("respeta el límite de resultados", () => {
    expect(buscar(indice, "de", 5).length).toBeLessThanOrEqual(5);
  });
});

import { describe, expect, it } from "vitest";
import { aAnki, mazosDe, type CartaExportable } from "@/lib/anki";

const carta = (p: Partial<CartaExportable> = {}): CartaExportable => ({
  front: "¿Qué mide el estrés de pared?",
  back: "Presión por radio sobre dos veces el grosor.",
  mazo: "Ley de Laplace",
  ...p,
});

const cuerpo = (texto: string) => texto.trim().split("\n").filter((l) => !l.startsWith("#"));

describe("cabeceras", () => {
  it("declara el separador, el HTML y qué columna es el mazo", () => {
    const salida = aAnki([carta()]);
    for (const h of ["#separator:tab", "#html:true", "#notetype:Basic",
      "#deck column:3", "#tags column:4"]) {
      expect(salida).toContain(h);
    }
  });

  it("las cabeceras van antes que cualquier tarjeta", () => {
    const lineas = aAnki([carta()]).split("\n");
    const ultimaCabecera = lineas.findLastIndex((l) => l.startsWith("#"));
    const primeraCarta = lineas.findIndex((l) => l.includes("\t"));
    expect(ultimaCabecera).toBeLessThan(primeraCarta);
  });
});

describe("estructura de cada fila", () => {
  it("saca cuatro columnas: anverso, reverso, mazo y etiqueta", () => {
    const [fila] = cuerpo(aAnki([carta()]));
    const cols = fila.split("\t");
    expect(cols).toHaveLength(4);
    expect(cols[0]).toBe("¿Qué mide el estrés de pared?");
    expect(cols[1]).toBe("Presión por radio sobre dos veces el grosor.");
  });

  it("anida todo bajo un mazo raíz para no ensuciar la colección", () => {
    const [fila] = cuerpo(aAnki([carta()]));
    expect(fila.split("\t")[2]).toBe("Corpus::Ley de Laplace");
  });

  it("la etiqueta no lleva espacios ni acentos: Anki separa etiquetas por espacio", () => {
    const [fila] = cuerpo(aAnki([carta({ mazo: "Terminología · morfemas" })]));
    const tag = fila.split("\t")[3];
    expect(tag).not.toMatch(/\s/);
    expect(tag).toMatch(/^[a-z0-9-]+$/);
  });

  it("emite una fila por tarjeta", () => {
    expect(cuerpo(aAnki([carta(), carta({ front: "otra" }), carta({ front: "y otra" })]))).toHaveLength(3);
  });

  it("no produce filas con una lista vacía, pero sí las cabeceras", () => {
    expect(cuerpo(aAnki([]))).toHaveLength(0);
    expect(aAnki([])).toContain("#separator:tab");
  });
});

describe("contenido que rompería el archivo", () => {
  it("una coma en el texto no parte la fila: por eso el separador es tabulador", () => {
    const [fila] = cuerpo(aAnki([carta({ front: "sensor, controlador, efector" })]));
    expect(fila.split("\t")).toHaveLength(4);
    expect(fila).toContain("sensor, controlador, efector");
  });

  it("un tabulador dentro del texto no inventa una columna", () => {
    const [fila] = cuerpo(aAnki([carta({ back: "uno\tdos" })]));
    expect(fila.split("\t")).toHaveLength(4);
  });

  it("un salto de línea se convierte en <br> en vez de partir la tarjeta en dos", () => {
    const salida = aAnki([carta({ back: "primera\nsegunda" })]);
    expect(cuerpo(salida)).toHaveLength(1);
    expect(salida).toContain("primera<br>segunda");
  });

  it("conserva el HTML del reverso, que es la razón de #html:true", () => {
    const [fila] = cuerpo(aAnki([carta({ back: "sin orina.<br><em>anuria</em>" })]));
    expect(fila).toContain("<em>anuria</em>");
  });

  it("un mazo con :: no crea una jerarquía que nadie pidió", () => {
    const [fila] = cuerpo(aAnki([carta({ mazo: "A::B" })]));
    expect(fila.split("\t")[2]).toBe("Corpus::A-B");
  });
});

describe("mazosDe", () => {
  it("cuenta las tarjetas de cada mazo sin repetir el mazo", () => {
    const m = mazosDe([carta({ mazo: "A" }), carta({ mazo: "B" }), carta({ mazo: "A" })]);
    expect(m).toHaveLength(2);
    expect(m.find((x) => x.mazo === "A")?.total).toBe(2);
    expect(m.find((x) => x.mazo === "B")?.total).toBe(1);
  });
});

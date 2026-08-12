import { describe, expect, it } from "vitest";
import { aciertaPieza } from "@/lib/circuito";
import { TEMAS } from "@/content/temas";

const ACEPTADAS = ["hipotálamo", "centro termorregulador"];

describe("calificar la pieza que falta", () => {
  it("acepta la respuesta exacta", () => {
    expect(aciertaPieza("hipotálamo", ACEPTADAS)).toBe(true);
  });

  it("no exige acentos ni mayúsculas", () => {
    expect(aciertaPieza("HIPOTALAMO", ACEPTADAS)).toBe(true);
  });

  it("no castiga el artículo ni el titubeo alrededor del término", () => {
    expect(aciertaPieza("el hipotálamo", ACEPTADAS)).toBe(true);
    expect(aciertaPieza("creo que el hipotálamo.", ACEPTADAS)).toBe(true);
  });

  it("acepta cualquiera de los sinónimos declarados", () => {
    expect(aciertaPieza("centro termorregulador", ACEPTADAS)).toBe(true);
  });

  it("rechaza una pieza distinta", () => {
    expect(aciertaPieza("páncreas", ACEPTADAS)).toBe(false);
    expect(aciertaPieza("hipófisis", ACEPTADAS)).toBe(false);
  });

  it("una respuesta vacía no cuenta como acierto", () => {
    expect(aciertaPieza("", ACEPTADAS)).toBe(false);
    expect(aciertaPieza("   ", ACEPTADAS)).toBe(false);
    // Ni siquiera con una lista de aceptadas mal construida.
    expect(aciertaPieza("cualquier cosa", [""])).toBe(false);
  });
});

describe("los diagramas del contenido", () => {
  const conDiagrama = TEMAS.filter((t) => t.diagrama);

  it("hay al menos uno", () => {
    expect(conDiagrama.length).toBeGreaterThan(0);
  });

  it.each(conDiagrama.map((t) => [t.slug, t.diagrama!] as const))(
    "«%s» declara respuestas que su propio valor satisface", (_slug, d) => {
      const valor = { sensor: d.sensor, centroIntegrador: d.centroIntegrador, efector: d.efector, setPoint: d.setPoint };
      expect(d.aceptadas.length, "sin respuestas aceptadas").toBeGreaterThan(0);
      // El texto que revela la caja tiene que contar como acierto; si no, quien
      // responde bien lee «era X» habiendo escrito X.
      expect(aciertaPieza(valor[d.incognita], d.aceptadas),
        `revelar muestra «${valor[d.incognita]}», que no coincide con las aceptadas`).toBe(true);
    }
  );
});

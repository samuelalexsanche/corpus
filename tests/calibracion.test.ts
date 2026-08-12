import { describe, expect, it } from "vitest";
import { MINIMO_PARA_VEREDICTO, porTramos, resumir, type Intento } from "@/lib/calibracion";

const hacer = (confianza: number, acierto: boolean, n = 1): Intento[] =>
  Array.from({ length: n }, () => ({ confianza, acierto, fecha: 0 }));

describe("reparto en tramos", () => {
  it("siempre devuelve los cinco tramos, aunque estén vacíos", () => {
    const t = porTramos([]);
    expect(t).toHaveLength(5);
    expect(t.every((x) => x.intentos === 0 && x.observado === null)).toBe(true);
  });

  it("coloca cada intento en su tramo, incluidos los extremos", () => {
    const t = porTramos([...hacer(0, true), ...hacer(100, true), ...hacer(80, true)]);
    expect(t[0].intentos).toBe(1);
    expect(t[4].intentos).toBe(2);
  });

  it("calcula el acierto observado de cada tramo", () => {
    const t = porTramos([...hacer(90, true, 3), ...hacer(90, false, 1)]);
    expect(t[4].observado).toBe(75);
    expect(t[4].desvio).toBe(-15); // dijo 90, acertó 75: exceso de confianza
  });
});

describe("veredicto", () => {
  it("no juzga con pocos intentos: el ruido dominaría", () => {
    expect(resumir(hacer(90, false, MINIMO_PARA_VEREDICTO - 1)).veredicto).toBe("insuficiente");
  });

  it("detecta exceso de confianza", () => {
    // Dice 90 y acierta la mitad.
    const r = resumir([...hacer(90, true, 10), ...hacer(90, false, 10)]);
    expect(r.veredicto).toBe("exceso");
    expect(r.confianzaMedia).toBeGreaterThan(r.aciertoReal);
  });

  it("detecta falta de confianza", () => {
    const r = resumir([...hacer(20, true, 18), ...hacer(20, false, 2)]);
    expect(r.veredicto).toBe("defecto");
  });

  it("reconoce una calibración correcta aunque el acierto sea bajo", () => {
    // Dice 30 y acierta el 30 %: mal preparado pero bien calibrado, que es
    // justo la distinción que este modo existe para hacer.
    const r = resumir([...hacer(30, true, 6), ...hacer(30, false, 14)]);
    expect(r.veredicto).toBe("calibrado");
    expect(r.aciertoReal).toBe(30);
  });

  it("no se rompe sin intentos", () => {
    const r = resumir([]);
    expect(r.intentos).toBe(0);
    expect(r.veredicto).toBe("insuficiente");
    expect(Number.isNaN(r.errorCalibracion)).toBe(false);
  });
});

describe("error de calibración", () => {
  it("vale cero cuando la confianza declarada coincide con el acierto", () => {
    // Tramo 80–100, centro 90: 9 de cada 10 aciertos.
    const r = resumir([...hacer(90, true, 9), ...hacer(90, false, 1)]);
    expect(r.errorCalibracion).toBeCloseTo(0, 5);
  });

  it("crece cuanto más se aleja la confianza del acierto real", () => {
    const bien = resumir([...hacer(90, true, 9), ...hacer(90, false, 1)]);
    const mal = resumir(hacer(90, false, 10));
    expect(mal.errorCalibracion).toBeGreaterThan(bien.errorCalibracion);
  });
});

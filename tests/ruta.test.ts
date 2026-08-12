import { describe, expect, it } from "vitest";
import { BLOQUES } from "@/content/curriculum";
import { duracionLegible, horasDeBloque, planificar, SUPUESTOS_POR_DEFECTO } from "@/lib/ruta";

const INICIO = new Date(Date.UTC(2026, 0, 1));

describe("leer las horas del currículum", () => {
  it("entiende un rango explícito en horas", () => {
    expect(horasDeBloque("60–90 h", 18)).toEqual([60, 90]);
  });

  it("convierte créditos con el supuesto declarado y añade margen por lo alto", () => {
    const [min, max] = horasDeBloque("10 créditos", 18);
    expect(min).toBe(180);
    expect(max).toBeGreaterThan(min);
  });

  it("no revienta con un texto que no reconoce", () => {
    expect(horasDeBloque("por determinar", 18)).toEqual([0, 0]);
  });

  it("lee todos los bloques reales del currículum", () => {
    for (const b of BLOQUES) {
      const [min, max] = horasDeBloque(b.horas, 18);
      expect(min, `«${b.horas}» de ${b.slug} no se pudo leer`).toBeGreaterThan(0);
      expect(max).toBeGreaterThanOrEqual(min);
    }
  });
});

describe("el plan es conservador por construcción", () => {
  const ruta = planificar(BLOQUES, SUPUESTOS_POR_DEFECTO, INICIO);

  it("emite un tramo por bloque, en orden", () => {
    expect(ruta.tramos).toHaveLength(BLOQUES.length);
    expect(ruta.tramos.map((t) => t.slug)).toEqual(BLOQUES.map((b) => b.slug));
  });

  it("las fechas de fin solo avanzan", () => {
    const fechas = ruta.tramos.map((t) => t.finMax.getTime());
    expect(fechas).toEqual([...fechas].sort((a, b) => a - b));
  });

  it("el escenario conservador nunca termina antes que el optimista", () => {
    for (const t of ruta.tramos) {
      expect(t.semanasMax).toBeGreaterThanOrEqual(t.semanasMin);
      expect(t.finMax.getTime()).toBeGreaterThanOrEqual(t.finMin.getTime());
    }
  });

  it("la carga de repaso crece con los bloques y luego se estabiliza", () => {
    const cargas = ruta.tramos.map((t) => t.fraccionRepaso);
    expect(cargas[0]).toBe(0);
    expect(cargas).toEqual([...cargas].sort((a, b) => a - b));
    expect(Math.max(...cargas)).toBeLessThanOrEqual(0.4);
  });

  it("el primer bloque tarda más que las 5 semanas del plan optimista original", () => {
    // El plan escrito a mano estimaba ~5 semanas a 10 h/semana para 60–90 h de
    // trabajo. Ese cálculo no deja semanas muertas. Este planificador sí, y por
    // eso tiene que salir por encima: es la diferencia entera del componente.
    expect(ruta.tramos[0].semanasMax).toBeGreaterThan(5);
  });

  it("declarar más horas semanales acorta el plan", () => {
    const pocas = planificar(BLOQUES, { ...SUPUESTOS_POR_DEFECTO, horasSemana: 5 }, INICIO);
    const muchas = planificar(BLOQUES, { ...SUPUESTOS_POR_DEFECTO, horasSemana: 20 }, INICIO);
    expect(muchas.semanasTotalMax).toBeLessThan(pocas.semanasTotalMax);
  });

  it("dejar menos semanas activas al año alarga el plan", () => {
    const sinDescanso = planificar(BLOQUES, { ...SUPUESTOS_POR_DEFECTO, semanasActivas: 52 }, INICIO);
    const conDescanso = planificar(BLOQUES, { ...SUPUESTOS_POR_DEFECTO, semanasActivas: 40 }, INICIO);
    expect(conDescanso.semanasTotalMax).toBeGreaterThan(sinDescanso.semanasTotalMax);
  });

  it("no divide por cero aunque se declaren cero horas semanales", () => {
    const r = planificar(BLOQUES, { ...SUPUESTOS_POR_DEFECTO, horasSemana: 0 }, INICIO);
    expect(Number.isFinite(r.semanasTotalMax)).toBe(true);
  });
});

describe("duracionLegible", () => {
  it("usa semanas cuando son pocas", () => {
    expect(duracionLegible(1)).toBe("1 semana");
    expect(duracionLegible(8)).toBe("8 semanas");
  });

  it("pasa a meses y luego a años, sin decimales", () => {
    expect(duracionLegible(26)).toBe("6 meses");
    expect(duracionLegible(104)).toBe("2 años");
    expect(duracionLegible(117)).toMatch(/^2 años y \d+ mes/);
  });
});

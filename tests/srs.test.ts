import { describe, expect, it } from "vitest";
import { nuevaTarjeta, revisar, estaVencida, proyectarIntervalos, type Calidad } from "@/lib/srs";

const DIA = 86_400_000;
const T0 = Date.UTC(2026, 0, 1);

/** Aplica una secuencia de calificaciones desde una tarjeta nueva. */
function correr(calidades: Calidad[]) {
  let e = nuevaTarjeta("x");
  for (const c of calidades) e = revisar(e, c, T0);
  return e;
}

describe("escalera de intervalos", () => {
  it("las dos primeras repeticiones correctas son fijas: 1 día y 6 días", () => {
    expect(correr([4]).intervalo).toBe(1);
    expect(correr([4, 4]).intervalo).toBe(6);
  });

  it("a partir de la tercera el intervalo se multiplica por la facilidad", () => {
    const dos = correr([4, 4]);
    const tres = revisar(dos, 4, T0);
    expect(tres.intervalo).toBe(Math.round(dos.intervalo * dos.facilidad));
    expect(tres.intervalo).toBeGreaterThan(dos.intervalo);
  });

  it("programa la próxima revisión a intervalo días del momento de revisar", () => {
    const e = revisar(nuevaTarjeta("x"), 4, T0);
    expect(e.proximaRevision).toBe(T0 + 1 * DIA);
  });
});

describe("fallar una tarjeta", () => {
  it("reinicia las repeticiones y la manda a mañana", () => {
    const maduro = correr([4, 4, 4, 4]);
    expect(maduro.repeticiones).toBe(4);

    const fallado = revisar(maduro, 1, T0);
    expect(fallado.repeticiones).toBe(0);
    expect(fallado.intervalo).toBe(1);
    expect(fallado.lapsos).toBe(1);
  });

  it("calidad 3 cuenta como acierto y 2 como fallo: el umbral está en 3", () => {
    expect(revisar(nuevaTarjeta("x"), 3, T0).repeticiones).toBe(1);
    expect(revisar(nuevaTarjeta("x"), 2, T0).repeticiones).toBe(0);
  });

  it("un lapso no borra la facilidad acumulada, solo la penaliza", () => {
    const maduro = correr([5, 5, 5]);
    const fallado = revisar(maduro, 0, T0);
    expect(fallado.facilidad).toBeLessThan(maduro.facilidad);
    expect(fallado.facilidad).toBeGreaterThan(1.3);
  });
});

describe("factor de facilidad", () => {
  it("«fácil» lo sube y «difícil» lo baja", () => {
    const base = nuevaTarjeta("x").facilidad;
    expect(revisar(nuevaTarjeta("x"), 5, T0).facilidad).toBeGreaterThan(base);
    expect(revisar(nuevaTarjeta("x"), 3, T0).facilidad).toBeLessThan(base);
    // Calidad 4 es el punto neutro de SM-2.
    expect(revisar(nuevaTarjeta("x"), 4, T0).facilidad).toBeCloseTo(base, 10);
  });

  it("nunca baja de 1.3 por muchos fallos que acumule", () => {
    let e = nuevaTarjeta("x");
    for (let i = 0; i < 50; i++) e = revisar(e, 0, T0);
    expect(e.facilidad).toBe(1.3);
  });

  it("no crece sin límite práctico: 1.3 es piso, no hay techo, pero el paso es acotado", () => {
    const uno = revisar(nuevaTarjeta("x"), 5, T0);
    expect(uno.facilidad - 2.5).toBeCloseTo(0.1, 10);
  });
});

describe("vencimiento", () => {
  it("está vencida cuando la fecha de revisión ya pasó, e incluye el instante exacto", () => {
    const e = revisar(nuevaTarjeta("x"), 4, T0);
    expect(estaVencida(e, T0)).toBe(false);
    expect(estaVencida(e, T0 + DIA - 1)).toBe(false);
    expect(estaVencida(e, T0 + DIA)).toBe(true);
  });

  it("una tarjeta nueva está vencida de entrada", () => {
    expect(estaVencida(nuevaTarjeta("x"))).toBe(true);
  });
});

describe("proyección mostrada en los botones", () => {
  it("da un intervalo por cada botón y son monótonos crecientes con la calidad", () => {
    const maduro = correr([4, 4, 4]);
    const p = proyectarIntervalos(maduro);
    expect(p.map((x) => x.calidad)).toEqual([0, 3, 4, 5]);
    const dias = p.map((x) => x.dias);
    expect(dias).toEqual([...dias].sort((a, b) => a - b));
  });

  it("no muta el estado que proyecta", () => {
    const e = correr([4, 4]);
    const copia = { ...e };
    proyectarIntervalos(e);
    expect(e).toEqual(copia);
  });
});

import { describe, expect, it } from "vitest";
import { intercalar, repeticionesSeguidas } from "@/lib/intercalar";

const g = (x: string) => x[0];
const cuenta = (xs: string[]) => xs.slice().sort().join("");

describe("intercalar", () => {
  it("no pierde ni duplica elementos", () => {
    const items = ["a1", "a2", "a3", "b1", "b2", "c1"];
    expect(cuenta(intercalar(items, g))).toBe(cuenta(items));
  });

  it("evita que dos seguidos compartan grupo cuando se puede", () => {
    const items = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
    expect(repeticionesSeguidas(intercalar(items, g), g)).toBe(0);
  });

  it("mejora una lista que venía agrupada por tema", () => {
    const agrupada = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4"];
    const antes = repeticionesSeguidas(agrupada, g);
    const despues = repeticionesSeguidas(intercalar(agrupada, g), g);
    expect(antes).toBe(6);
    expect(despues).toBeLessThan(antes);
  });

  it("cuando un grupo domina, reparte sus elementos en vez de amontonarlos al final", () => {
    // Siete de «a» y dos de «b»: es imposible evitar toda repetición, pero las
    // dos de «b» deben quedar separadas dentro de la secuencia, no pegadas.
    const items = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "b1", "b2"];
    const r = intercalar(items, g);
    const posiciones = r.map((x, i) => (g(x) === "b" ? i : -1)).filter((i) => i >= 0);
    expect(posiciones[1] - posiciones[0]).toBeGreaterThan(1);
  });

  it("da variedad desde el principio, no solo repartida sobre el total", () => {
    // Un mazo enorme y varios pequeños: en las primeras posiciones tienen que
    // aparecer todos los grupos, porque una sesión real son treinta tarjetas y
    // no la baraja entera.
    const items = [
      ...Array.from({ length: 200 }, (_, i) => `a${i}`),
      ...Array.from({ length: 10 }, (_, i) => `b${i}`),
      ...Array.from({ length: 10 }, (_, i) => `c${i}`),
      ...Array.from({ length: 10 }, (_, i) => `d${i}`),
    ];
    const primeras = intercalar(items, g).slice(0, 12);
    expect(new Set(primeras.map(g)).size).toBe(4);
  });

  it("no toca listas de dos o menos", () => {
    expect(intercalar(["a1"], g)).toEqual(["a1"]);
    expect(intercalar(["a1", "a2"], g)).toEqual(["a1", "a2"]);
    expect(intercalar([], g)).toEqual([]);
  });

  it("aguanta que todo sea del mismo grupo", () => {
    const items = ["a1", "a2", "a3"];
    expect(cuenta(intercalar(items, g))).toBe(cuenta(items));
  });
});

describe("repeticionesSeguidas", () => {
  it("cuenta los pares consecutivos del mismo grupo", () => {
    expect(repeticionesSeguidas(["a1", "a2", "b1", "b2", "b3"], g)).toBe(3);
    expect(repeticionesSeguidas(["a1", "b1", "a2"], g)).toBe(0);
    expect(repeticionesSeguidas([], g)).toBe(0);
  });
});

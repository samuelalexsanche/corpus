import { describe, expect, it } from "vitest";
import { descomponer, normalizar, variantes, MIN_TERMINO } from "@/lib/decodificar";
import { DESCOMPOSICIONES } from "@/content/morfemas";

const claves = (t: string) => descomponer(t).map((p) => p.clave);

describe("normalizar", () => {
  it("quita acentos, mayúsculas y todo lo que no sea letra", () => {
    expect(normalizar("Glucogenólisis")).toBe("glucogenolisis");
    expect(normalizar("hepato-megalia")).toBe("hepatomegalia");
    expect(normalizar("  Ñandú 123 ")).toBe("nandu");
  });
});

describe("variantes de un morfema", () => {
  it("separa las alternativas del dataset y las deja en letras puras", () => {
    expect(variantes("hem(o)- / hemat(o)-").sort()).toEqual(["hem", "hemat", "hemato", "hemo"]);
  });

  it("expande la vocal de unión opcional en sus dos formas", () => {
    // Sin esto, «carditis» no encuentra su raíz porque solo existiría «cardio».
    expect(variantes("cardi(o)-").sort()).toEqual(["cardi", "cardio"]);
  });

  it("descarta las variantes de una o dos letras: emparejarían con todo", () => {
    expect(variantes("hepat/o")).toEqual(["hepat"]);
    expect(variantes("a- / an-")).toEqual([]);
  });
});

describe("cobertura sin solapamiento", () => {
  it("dos piezas comparten como mucho la vocal de unión, y solo en el borde", () => {
    for (const { t } of DESCOMPOSICIONES) {
      const limpio = normalizar(t);
      const ocupado = new Array(limpio.length).fill(false);
      for (const p of descomponer(t)) {
        const fin = p.pos + p.len - 1;
        const chocadas = [];
        for (let i = p.pos; i <= fin; i++) if (ocupado[i]) chocadas.push(i);
        expect(chocadas.length, `«${t}»: «${p.clave}» pisa ${chocadas.length} letras ya cubiertas`)
          .toBeLessThanOrEqual(1);
        if (chocadas.length === 1) {
          expect([p.pos, fin], `«${t}»: «${p.clave}» se solapa por dentro, no por el borde`)
            .toContain(chocadas[0]);
        }
        for (let i = p.pos; i <= fin; i++) ocupado[i] = true;
      }
    }
  });

  it("prefiere la coincidencia larga a la corta que cae dentro", () => {
    // La raíz completa tiene que ganarle a cualquier morfema breve contenido
    // en ella; si no, el término se parte en piezas que no significan nada.
    expect(claves("hepatomegalia")).toEqual(["hepato", "megalia"]);
    expect(claves("pericarditis")).toEqual(["peri", "cardi", "itis"]);
  });

  it("devuelve las piezas en orden de lectura", () => {
    for (const { t } of DESCOMPOSICIONES) {
      const pos = descomponer(t).map((p) => p.pos);
      expect(pos, `«${t}» salió desordenado`).toEqual([...pos].sort((a, b) => a - b));
    }
  });
});

describe("términos que no debe intentar descomponer", () => {
  it("ignora lo más corto que el mínimo", () => {
    expect(descomponer("")).toEqual([]);
    expect(descomponer("a".repeat(MIN_TERMINO - 1))).toEqual([]);
  });

  it("devuelve vacío ante un término sin morfemas clásicos", () => {
    // Un epónimo no se compone de piezas; no reconocerlo es la respuesta correcta.
    expect(descomponer("zzzqqqxxx")).toEqual([]);
  });
});

describe("utilidad real del decodificador", () => {
  it("reconoce al menos una pieza en cada término de ejemplo del dataset", () => {
    for (const { t } of DESCOMPOSICIONES) {
      expect(descomponer(t).length, `«${t}» no produjo ninguna pieza`).toBeGreaterThan(0);
    }
  });
});

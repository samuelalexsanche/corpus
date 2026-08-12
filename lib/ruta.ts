/**
 * Planificador de ruta: horas semanales disponibles → fechas realistas.
 *
 * La única regla que gobierna este archivo: **los planes optimistas producen
 * abandono.** Un plan que promete lo que no se cumple no se corrige a mitad de
 * camino; se abandona entero. Así que aquí se estima por lo alto, se descuenta
 * el repaso acumulado y se dejan semanas muertas al año.
 *
 * Cada supuesto es explícito y se enseña en la interfaz. Un plan cuyos supuestos
 * están escondidos es indistinguible de una promesa.
 */
import type { Bloque } from "@/content/curriculum";

export interface SupuestosRuta {
  /** Horas de estudio realmente disponibles por semana. */
  horasSemana: number;
  /**
   * Horas de trabajo del estudiante por crédito. El currículum está en
   * créditos, no en horas, y la conversión es un supuesto, no un dato del plan
   * de estudios: SATCA suele contar en torno a 20 h por crédito.
   */
  horasPorCredito: number;
  /**
   * Semanas al año en las que uno estudia de verdad. Enfermedad, exámenes,
   * trabajo y vida. 52 es la respuesta de un plan que no se va a cumplir.
   */
  semanasActivas: number;
}

export const SUPUESTOS_POR_DEFECTO: SupuestosRuta = {
  horasSemana: 10,
  horasPorCredito: 18,
  semanasActivas: 44,
};

/** Techo de la fracción del tiempo que se va en repasar lo ya visto. */
const REPASO_MAXIMO = 0.4;
/** Cuánto crece esa fracción por cada bloque ya terminado. */
const REPASO_POR_BLOQUE = 0.05;
/** Margen por el que las estimaciones se quedan cortas en los bloques en créditos. */
const MARGEN_SUBESTIMACION = 1.25;

export interface TramoRuta {
  slug: string;
  numero: string;
  titulo: string;
  horasMin: number;
  horasMax: number;
  /** Fracción del tiempo semanal que a esta altura se va en repasar. */
  fraccionRepaso: number;
  semanasMin: number;
  semanasMax: number;
  /** Fecha en que termina este bloque en el escenario optimista y en el conservador. */
  finMin: Date;
  finMax: Date;
}

export interface Ruta {
  tramos: TramoRuta[];
  semanasTotalMin: number;
  semanasTotalMax: number;
  finMin: Date;
  finMax: Date;
  horasTotales: number;
}

/**
 * Convierte el campo `horas` del currículum en un rango de horas.
 *
 * Acepta las dos formas que usa `content/curriculum.ts`: un rango explícito en
 * horas («60–90 h») y una carga en créditos («38 créditos»). Los créditos dan
 * un único número, así que el extremo alto se construye añadiendo el margen por
 * el que las estimaciones se quedan cortas.
 */
export function horasDeBloque(texto: string, horasPorCredito: number): [number, number] {
  const rango = texto.match(/(\d+)\s*[–-]\s*(\d+)\s*h/);
  if (rango) return [Number(rango[1]), Number(rango[2])];

  const creditos = texto.match(/(\d+)\s*crédito/);
  if (creditos) {
    const base = Number(creditos[1]) * horasPorCredito;
    return [base, Math.round(base * MARGEN_SUBESTIMACION)];
  }

  const sueltas = texto.match(/(\d+)\s*h/);
  if (sueltas) {
    const base = Number(sueltas[1]);
    return [base, Math.round(base * MARGEN_SUBESTIMACION)];
  }
  return [0, 0];
}

const sumarSemanas = (desde: Date, semanas: number) =>
  new Date(desde.getTime() + Math.round(semanas * 7) * 86_400_000);

/**
 * Construye la ruta completa.
 *
 * Para cada bloque: las horas disponibles esa semana son las declaradas menos
 * la fracción que a esa altura se va en repasar lo anterior, y las semanas de
 * calendario se estiran respecto a las semanas de estudio porque no todas las
 * semanas del año se estudia.
 */
export function planificar(
  bloques: Bloque[],
  supuestos: SupuestosRuta = SUPUESTOS_POR_DEFECTO,
  inicio: Date = new Date()
): Ruta {
  const { horasSemana, horasPorCredito, semanasActivas } = supuestos;
  const estiramiento = 52 / Math.max(1, semanasActivas);

  let acumuladoMin = 0;
  let acumuladoMax = 0;
  let horasTotales = 0;

  const tramos = bloques.map((b, i) => {
    const [horasMin, horasMax] = horasDeBloque(b.horas, horasPorCredito);
    const fraccionRepaso = Math.min(REPASO_MAXIMO, REPASO_POR_BLOQUE * i);
    const efectivas = Math.max(0.5, horasSemana * (1 - fraccionRepaso));

    const semanasMin = (horasMin / efectivas) * estiramiento;
    const semanasMax = (horasMax / efectivas) * estiramiento;

    acumuladoMin += semanasMin;
    acumuladoMax += semanasMax;
    horasTotales += horasMax;

    return {
      slug: b.slug,
      numero: b.numero,
      titulo: b.titulo,
      horasMin,
      horasMax,
      fraccionRepaso,
      semanasMin: Math.ceil(semanasMin),
      semanasMax: Math.ceil(semanasMax),
      finMin: sumarSemanas(inicio, acumuladoMin),
      finMax: sumarSemanas(inicio, acumuladoMax),
    };
  });

  return {
    tramos,
    semanasTotalMin: Math.ceil(acumuladoMin),
    semanasTotalMax: Math.ceil(acumuladoMax),
    finMin: sumarSemanas(inicio, acumuladoMin),
    finMax: sumarSemanas(inicio, acumuladoMax),
    horasTotales,
  };
}

/** «11 semanas», «1 año y 3 meses». Sin decimales que fingen precisión. */
export function duracionLegible(semanas: number): string {
  if (semanas < 9) return `${semanas} semana${semanas === 1 ? "" : "s"}`;
  const meses = Math.round(semanas / 4.345);
  if (meses < 18) return `${meses} meses`;
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  const base = `${anos} año${anos === 1 ? "" : "s"}`;
  return resto === 0 ? base : `${base} y ${resto} mes${resto === 1 ? "" : "es"}`;
}

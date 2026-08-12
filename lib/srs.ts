/**
 * Repetición espaciada — variante de SM-2.
 *
 * El objetivo del algoritmo no es "recordarte cosas": es programar cada revisión
 * para el momento en que estás a punto de olvidar. Preguntar antes es desperdicio;
 * preguntar después es empezar de cero. El intervalo ES el mecanismo de aprendizaje.
 */

export type Calidad = 0 | 1 | 2 | 3 | 4 | 5;

export interface EstadoTarjeta {
  id: string;
  facilidad: number;   // ease factor, mínimo 1.3
  intervalo: number;   // días
  repeticiones: number;
  proximaRevision: number; // epoch ms
  lapsos: number;
}

export const nuevaTarjeta = (id: string): EstadoTarjeta => ({
  id, facilidad: 2.5, intervalo: 0, repeticiones: 0, proximaRevision: Date.now(), lapsos: 0,
});

const DIA = 86_400_000;

export function revisar(estado: EstadoTarjeta, calidad: Calidad, ahora = Date.now()): EstadoTarjeta {
  let { facilidad, intervalo, repeticiones, lapsos } = estado;

  if (calidad < 3) {
    // No la produjo. Vuelve al principio: reconocerla no cuenta.
    repeticiones = 0;
    intervalo = 1;
    lapsos += 1;
  } else {
    repeticiones += 1;
    if (repeticiones === 1) intervalo = 1;
    else if (repeticiones === 2) intervalo = 6;
    else intervalo = Math.round(intervalo * facilidad);
  }

  facilidad = facilidad + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02));
  if (facilidad < 1.3) facilidad = 1.3;

  return { ...estado, facilidad, intervalo, repeticiones, lapsos, proximaRevision: ahora + intervalo * DIA };
}

export const estaVencida = (e: EstadoTarjeta, ahora = Date.now()) => e.proximaRevision <= ahora;

export function proyectarIntervalos(estado: EstadoTarjeta) {
  return ([0, 3, 4, 5] as Calidad[]).map((c) => ({
    calidad: c,
    dias: revisar(estado, c).intervalo,
  }));
}

/** Etiquetas honestas para autocalificación. La ambigüedad aquí arruina el algoritmo. */
export const BOTONES: { calidad: Calidad; etiqueta: string; ayuda: string }[] = [
  { calidad: 0, etiqueta: "Otra vez", ayuda: "No la produje" },
  { calidad: 3, etiqueta: "Difícil", ayuda: "La saqué a duras penas" },
  { calidad: 4, etiqueta: "Bien", ayuda: "La saqué con esfuerzo normal" },
  { calidad: 5, etiqueta: "Fácil", ayuda: "Salió sola" },
];

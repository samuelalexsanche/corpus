/**
 * Calibración: ¿tu confianza predice tus aciertos?
 *
 * El modo de falla que esta plataforma existe para combatir no es saber poco.
 * Es **creer que sabes**. Un estudiante que falla y lo sabe estudia; uno que
 * falla y se siente seguro no vuelve a mirar el tema. En medicina esa segunda
 * situación es la peligrosa, y no la detecta ningún examen que solo cuente
 * respuestas correctas.
 *
 * Aquí se pide la confianza *antes* de ver la respuesta y después se compara
 * con el acierto real. Bien calibrado significa que cuando dices 70 % aciertas
 * cerca del 70 % de las veces: ni más ni menos.
 */

export interface Intento {
  /** Confianza declarada antes de ver la respuesta, de 0 a 100. */
  confianza: number;
  acierto: boolean;
  fecha: number;
}

export interface Tramo {
  /** Etiqueta legible del tramo, p. ej. «70–79 %». */
  etiqueta: string;
  centro: number;
  intentos: number;
  aciertos: number;
  /** Porcentaje real de acierto en el tramo, o null si no hay intentos. */
  observado: number | null;
  /** Diferencia entre lo observado y lo declarado. Negativa = exceso de confianza. */
  desvio: number | null;
}

const LIMITES = [0, 20, 40, 60, 80, 101];
const ETIQUETAS = ["0–19 %", "20–39 %", "40–59 %", "60–79 %", "80–100 %"];
const CENTROS = [10, 30, 50, 70, 90];

/** Reparte los intentos en tramos de confianza y mide el acierto real de cada uno. */
export function porTramos(intentos: Intento[]): Tramo[] {
  return ETIQUETAS.map((etiqueta, i) => {
    const dentro = intentos.filter(
      (t) => t.confianza >= LIMITES[i] && t.confianza < LIMITES[i + 1]
    );
    const aciertos = dentro.filter((t) => t.acierto).length;
    const observado = dentro.length ? (aciertos / dentro.length) * 100 : null;
    return {
      etiqueta,
      centro: CENTROS[i],
      intentos: dentro.length,
      aciertos,
      observado,
      desvio: observado === null ? null : observado - CENTROS[i],
    };
  });
}

export interface Resumen {
  intentos: number;
  aciertos: number;
  /** Confianza media declarada. */
  confianzaMedia: number;
  /** Porcentaje de acierto real. */
  aciertoReal: number;
  /**
   * Error de calibración: media de |confianza − acierto| ponderada por tramo.
   * Cero sería una calibración perfecta. Es la cifra que hay que bajar.
   */
  errorCalibracion: number;
  veredicto: "exceso" | "defecto" | "calibrado" | "insuficiente";
}

/** Intentos por debajo de los cuales no se emite veredicto: el ruido dominaría. */
export const MINIMO_PARA_VEREDICTO = 12;
/** Margen en puntos porcentuales dentro del cual se considera bien calibrado. */
const MARGEN = 10;

export function resumir(intentos: Intento[]): Resumen {
  const n = intentos.length;
  if (n === 0) {
    return {
      intentos: 0, aciertos: 0, confianzaMedia: 0, aciertoReal: 0,
      errorCalibracion: 0, veredicto: "insuficiente",
    };
  }

  const aciertos = intentos.filter((t) => t.acierto).length;
  const confianzaMedia = intentos.reduce((s, t) => s + t.confianza, 0) / n;
  const aciertoReal = (aciertos / n) * 100;

  const tramos = porTramos(intentos).filter((t) => t.intentos > 0);
  const errorCalibracion =
    tramos.reduce((s, t) => s + Math.abs(t.desvio!) * t.intentos, 0) / n;

  let veredicto: Resumen["veredicto"] = "calibrado";
  if (n < MINIMO_PARA_VEREDICTO) veredicto = "insuficiente";
  else if (confianzaMedia - aciertoReal > MARGEN) veredicto = "exceso";
  else if (aciertoReal - confianzaMedia > MARGEN) veredicto = "defecto";

  return { intentos: n, aciertos, confianzaMedia, aciertoReal, errorCalibracion, veredicto };
}

/** Lo que se le dice al usuario según su veredicto. Sin adornos ni ánimos vacíos. */
export const LECTURA: Record<Resumen["veredicto"], string> = {
  insuficiente:
    "Todavía no hay intentos suficientes para decirte nada honesto. Sigue un rato y vuelve.",
  exceso:
    "Te sobra confianza: crees saber más de lo que sabes. Es el patrón peligroso, porque los temas en los que te sientes seguro y fallas son justo los que dejas de repasar. Baja el listón de lo que consideras «lo sé».",
  defecto:
    "Te falta confianza: sabes más de lo que crees. El coste es distinto y menor —repasas de más y vas más lento de lo necesario—, pero también significa que no te fías de tu propio criterio cuando deberías.",
  calibrado:
    "Estás bien calibrado: tu confianza predice tus aciertos. Eso vale más que un porcentaje alto, porque significa que puedes decidir en qué gastar el tiempo de estudio.",
};

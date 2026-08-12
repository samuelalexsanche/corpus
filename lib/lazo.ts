/**
 * Datos de un lazo de control. Viven aquí y no en el componente para que
 * `content/temas.ts` pueda tipar el campo `diagrama` sin arrastrar un
 * componente cliente al módulo de contenido.
 */

export type PiezaLazo = "sensor" | "controlador" | "efector" | "setPoint";

export interface LazoDatos {
  /** Qué se está regulando. Es el nodo del que sale y al que vuelve el lazo. */
  variable: string;
  setPoint: string;
  sensor: string;
  controlador: string;
  efector: string;
  /** Etiqueta de la flecha de vuelta: qué le hace el efector a la variable. */
  correccion: string;
  /** Lo que empuja al sistema fuera de su set point. */
  perturbacion?: string;
  /** La pieza que se tapa y hay que nombrar. */
  incognita: PiezaLazo;
  /**
   * Respuestas que cuentan como acierto. Se comparan sin acentos ni
   * mayúsculas. Conviene incluir sinónimos reales: quien escribe «centro
   * termorregulador» sabe lo mismo que quien escribe «hipotálamo».
   */
  aceptadas: string[];
}

const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/**
 * ¿La respuesta escrita cuenta como acierto?
 *
 * Compara sin acentos ni puntuación, y acepta que la respuesta contenga el
 * término esperado: quien escribe «el hipotálamo» o «creo que el hipotálamo»
 * sabe lo mismo que quien escribe «hipotálamo», y castigar el artículo
 * convertiría un ejercicio de mecanismo en uno de ortografía.
 */
export function aciertaLazo(respuesta: string, aceptadas: string[]): boolean {
  const dada = normalizar(respuesta);
  if (!dada) return false;
  return aceptadas.some((a) => {
    const esperada = normalizar(a);
    return esperada.length > 0 && dada.includes(esperada);
  });
}

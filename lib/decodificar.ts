/**
 * Decodificador de términos médicos: parte una palabra en los morfemas que la
 * componen.
 *
 * Vive fuera del componente porque es la única lógica no trivial del
 * decodificador y merece tests. La regla que la define está en `descomponer`:
 * cobertura sin solapamiento, priorizando la coincidencia más larga.
 */
import { MORFEMAS } from "@/content/morfemas";

/** Minúsculas sin acentos y sin nada que no sea una letra a–z. */
export function normalizar(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");
}

/**
 * Variantes buscables de un morfema del dataset.
 *
 * El dataset escribe las piezas como se leen en un libro: «-emia», «hepat/o»,
 * «cardi(o)-». La barra separa alternativas y **el paréntesis marca una vocal
 * de unión opcional**, que es la que aparece o no según lo que venga detrás:
 * «cardiología» la lleva, «carditis» no. Borrar el paréntesis sin más deja solo
 * la forma larga, y entonces la raíz de «pericarditis» no se reconoce. Por eso
 * cada grupo opcional se expande en sus dos formas.
 */
export function variantes(m: string): string[] {
  const salida = new Set<string>();
  for (const alternativa of m.split("/")) {
    for (const forma of expandirOpcionales(alternativa)) {
      const limpia = normalizar(forma);
      // Una o dos letras emparejarían con media lista de términos.
      if (limpia.length >= 3) salida.add(limpia);
    }
  }
  return Array.from(salida);
}

/** «cardi(o)-» → ["cardi(o)-", "cardi-"]. Con varios grupos, todas las combinaciones. */
function expandirOpcionales(s: string): string[] {
  const grupo = /\(([^)]*)\)/;
  const encontrado = s.match(grupo);
  if (!encontrado) return [s];
  const con = s.replace(grupo, encontrado[1]);
  const sin = s.replace(grupo, "");
  return [...expandirOpcionales(con), ...expandirOpcionales(sin)];
}

export interface Pieza {
  m: string;
  sig: string;
  ej?: string;
  /** Variante concreta que coincidió dentro del término. */
  clave: string;
  /** Índice donde empieza, sobre el término ya normalizado. */
  pos: number;
  len: number;
}

const INDICE = MORFEMAS.map((m) => ({ ...m, claves: variantes(m.m) }));

/** Longitud mínima de término para intentar descomponer. Menos es ruido. */
export const MIN_TERMINO = 3;

/**
 * Descompone un término en piezas que no se pisan entre sí.
 *
 * Prioriza las coincidencias largas: en «hepatomegalia», «hepato» debe ganarle
 * a cualquier morfema breve que caiga dentro. Una vez cubierto un tramo, ningún
 * otro morfema puede reclamarlo. El resultado sale ordenado por posición, que
 * es como se lee.
 *
 * Con una excepción, y es morfología, no un parche: **la vocal de unión se
 * comparte**. En «pericarditis» la «i» es a la vez el final de «cardi-» y el
 * principio de «-itis»; exigir tramos disjuntos obligaría a descartar uno de
 * los dos y devolver una lectura mutilada. Por eso una pieza puede reutilizar
 * una sola letra, y solo si es la primera o la última — justo la posición donde
 * dos morfemas se sueldan.
 */
export function descomponer(termino: string): Pieza[] {
  const limpio = normalizar(termino);
  if (limpio.length < MIN_TERMINO) return [];

  const candidatos: Pieza[] = [];
  for (const m of INDICE) {
    const clave = m.claves.find((c) => limpio.includes(c));
    if (clave) {
      candidatos.push({ m: m.m, sig: m.sig, ej: m.ej, clave, pos: limpio.indexOf(clave), len: clave.length });
    }
  }

  const usado = new Array(limpio.length).fill(false);
  const elegidas: Pieza[] = [];
  for (const c of [...candidatos].sort((a, b) => b.len - a.len)) {
    const fin = c.pos + c.len - 1;
    const chocadas: number[] = [];
    for (let i = c.pos; i <= fin; i++) if (usado[i]) chocadas.push(i);

    const soloLaSoldadura =
      chocadas.length === 1 && (chocadas[0] === c.pos || chocadas[0] === fin);
    if (chocadas.length > 0 && !soloLaSoldadura) continue;

    for (let i = c.pos; i <= fin; i++) usado[i] = true;
    elegidas.push(c);
  }
  return elegidas.sort((a, b) => a.pos - b.pos);
}

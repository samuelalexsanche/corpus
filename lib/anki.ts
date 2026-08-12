/**
 * Exportación de tarjetas al formato de importación de Anki.
 *
 * Corpus no pretende reemplazar a Anki. Quien ya lleva años con su colección no
 * la va a abandonar, y pedirle que mantenga dos sistemas es pedirle que
 * abandone uno. Esto conecta con la herramienta que ya usa.
 *
 * El formato es texto separado por tabuladores con las cabeceras `#` que Anki
 * reconoce desde 2.1.55. **Tabulador y no coma** a propósito: los anversos
 * llevan comas constantemente y cada una sería una columna falsa. Las cabeceras
 * son lo que permite que el archivo traiga sus propios mazos y etiquetas en vez
 * de aterrizar todo en un montón indistinguible.
 */

export interface CartaExportable {
  front: string;
  back: string;
  /** Nombre del mazo. Se anida bajo «Corpus» al exportar. */
  mazo: string;
}

const SEP = "\t";
export const NOMBRE_ARCHIVO = "corpus-tarjetas.txt";
/** Anki usa `::` para anidar. Todo cuelga de un mazo raíz para no ensuciar la colección. */
const RAIZ = "Corpus";

/**
 * Deja un campo apto para una celda separada por tabuladores.
 *
 * El tabulador y el salto de línea son los dos caracteres que romperían el
 * archivo. El salto se convierte en `<br>` en vez de descartarse porque el
 * contenido ya viene con HTML y la importación va con `#html:true`.
 */
function celda(s: string): string {
  return s
    .replace(/\r\n?|\n/g, "<br>")
    .replace(/\t/g, " ")
    .trim();
}

/** Anki interpreta espacios como separador de etiquetas, así que no puede haber. */
function etiqueta(s: string): string {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Construye el archivo que Anki importa.
 *
 * Columnas: anverso, reverso, mazo, etiquetas. Las cabeceras le dicen a Anki
 * cuál es cuál, de modo que la importación no necesita que el usuario configure
 * nada a mano.
 */
export function aAnki(cartas: CartaExportable[]): string {
  const lineas = cartas.map((c) =>
    [
      celda(c.front),
      celda(c.back),
      `${RAIZ}::${celda(c.mazo).replace(/::/g, "-")}`,
      etiqueta(c.mazo),
    ].join(SEP)
  );

  return [
    "#separator:tab",
    "#html:true",
    "#notetype:Basic",
    "#deck column:3",
    "#tags column:4",
    ...lineas,
    "",
  ].join("\n");
}

/** Mazos presentes en una lista, con cuántas tarjetas trae cada uno. */
export function mazosDe(cartas: CartaExportable[]): { mazo: string; total: number }[] {
  const cuenta = new Map<string, number>();
  for (const c of cartas) cuenta.set(c.mazo, (cuenta.get(c.mazo) ?? 0) + 1);
  return Array.from(cuenta, ([mazo, total]) => ({ mazo, total }));
}

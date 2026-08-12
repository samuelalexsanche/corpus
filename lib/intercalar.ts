/**
 * Repaso intercalado: mezclar temas en vez de agruparlos.
 *
 * Estudiar veinte tarjetas seguidas del mismo tema se siente mejor y funciona
 * peor. Al repetir dentro de un bloque, el cerebro no tiene que decidir **qué
 * clase de problema** tiene delante, porque ya lo sabe: es el mismo de antes.
 * Y esa decisión es justo la que hay que entrenar, porque un paciente no llega
 * etiquetado con el capítulo al que pertenece.
 *
 * El coste es real y conviene decirlo: intercalar hace que la sesión se sienta
 * más difícil y que se falle más durante el estudio. Ese empeoramiento aparente
 * es la señal de que está funcionando, no de que no.
 */

/** Reordena de modo que dos elementos seguidos no compartan grupo, si es posible. */
export function intercalar<T>(items: T[], grupoDe: (x: T) => string): T[] {
  if (items.length <= 2) return [...items];

  const grupos = new Map<string, T[]>();
  for (const x of items) {
    const g = grupoDe(x);
    if (!grupos.has(g)) grupos.set(g, []);
    grupos.get(g)!.push(x);
  }

  // Ronda: una carta de cada tema, luego otra vuelta, y así.
  //
  // La alternativa —servir siempre al grupo con más pendientes— reparte igual
  // de bien sobre el total, pero en la práctica alterna solo entre los dos
  // mazos más grandes durante las primeras decenas de tarjetas. Como una sesión
  // real son treinta tarjetas y no la baraja entera, lo que importa es la
  // variedad **al principio**, y eso lo da la ronda.
  const salida: T[] = [];
  while (salida.length < items.length) {
    let servido = false;
    for (const cola of grupos.values()) {
      const x = cola.shift();
      if (x !== undefined) { salida.push(x); servido = true; }
    }
    // Ninguna cola tenía nada: no queda material y hay que salir o el bucle
    // no termina nunca.
    if (!servido) break;
  }

  return salida;
}

/** Cuántos pares consecutivos comparten grupo. Cero es el ideal. */
export function repeticionesSeguidas<T>(items: T[], grupoDe: (x: T) => string): number {
  let n = 0;
  for (let i = 1; i < items.length; i++) {
    if (grupoDe(items[i]) === grupoDe(items[i - 1])) n++;
  }
  return n;
}

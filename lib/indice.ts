/**
 * Índice de búsqueda: todo lo que la plataforma tiene, en una sola lista plana.
 *
 * Se construye en tiempo de build a partir del contenido tipado, así que no hay
 * servidor ni servicio de búsqueda detrás. Cada entrada guarda solo lo que hace
 * falta para encontrarla y presentarla; el texto completo de un tema no viaja
 * al navegador porque haría el índice pesado sin mejorar los resultados.
 *
 * Incluye **todas las unidades del currículum**, tengan tema escrito o no. Ese
 * es el punto: buscar un tema de la carrera y no encontrar ni la entrada es
 * peor que encontrarla y que te diga honestamente qué hay y qué falta.
 */
import { BLOQUES, type Unidad } from "@/content/curriculum";
import { TEMAS } from "@/content/temas";
import { CASOS } from "@/content/casos";
import { MORFEMAS } from "@/content/morfemas";
import { CATALOGO, LIBROS } from "@/content/catalogo";

export type TipoEntrada = "tema" | "catalogo" | "unidad" | "caso" | "bloque" | "morfema";

export interface Entrada {
  tipo: TipoEntrada;
  titulo: string;
  /** Línea de contexto: el bloque al que pertenece, la clave de la unidad… */
  contexto: string;
  descripcion: string;
  href: string;
  /** Texto ya normalizado sobre el que se busca. */
  busqueda: string;
  /** Si es una unidad, indica si ya tiene un tema desarrollado. */
  desarrollado?: boolean;
}

export const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** «B0.1» → «b0-1». Se usa como segmento de URL de la unidad. */
export const claveASlug = (clave: string) => normalizar(clave).replace(/\s+/g, "-");

export const unidadesDelCurriculum = (): { unidad: Unidad; bloqueSlug: string; bloqueTitulo: string }[] =>
  BLOQUES.flatMap((b) =>
    b.unidades.map((unidad) => ({ unidad, bloqueSlug: b.slug, bloqueTitulo: b.titulo }))
  );

/** Temas que desarrollan una unidad concreta, emparejados por su clave. */
export const temasDeUnidad = (clave: string) =>
  TEMAS.filter((t) => t.unidad.startsWith(clave));

export function construirIndice(): Entrada[] {
  const entradas: Entrada[] = [];

  for (const b of BLOQUES) {
    entradas.push({
      tipo: "bloque",
      titulo: b.titulo,
      contexto: `Bloque ${b.numero}`,
      descripcion: b.subtitulo,
      href: `/bloque/${b.slug}`,
      busqueda: normalizar([b.titulo, b.subtitulo, b.temasClave.join(" ")].join(" ")),
    });
  }

  for (const { unidad, bloqueTitulo } of unidadesDelCurriculum()) {
    const temas = temasDeUnidad(unidad.clave);
    entradas.push({
      tipo: "unidad",
      titulo: unidad.nombre,
      contexto: `${unidad.clave} · ${bloqueTitulo}`,
      descripcion: unidad.nota ?? bloqueTitulo,
      href: `/unidad/${claveASlug(unidad.clave)}`,
      busqueda: normalizar([unidad.clave, unidad.nombre, unidad.nota ?? "", bloqueTitulo].join(" ")),
      desarrollado: temas.length > 0,
    });
  }

  for (const t of TEMAS) {
    entradas.push({
      tipo: "tema",
      titulo: t.titulo,
      contexto: t.unidad,
      descripcion: t.resumen,
      href: `/tema/${t.slug}`,
      // Se indexan los títulos de sección, las preguntas frecuentes y los
      // anversos de las tarjetas: es donde está la variedad de formulaciones
      // con que alguien puede buscar el mismo concepto.
      busqueda: normalizar([
        t.titulo, t.tituloSEO, t.resumen, t.unidad,
        t.secciones.map((s) => s.titulo).join(" "),
        t.faq.map((f) => f.q).join(" "),
        t.tarjetas.map((c) => c.front).join(" "),
      ].join(" ")),
    });
  }

  // El catálogo es lo que hace que buscar «glucólisis» devuelva algo. Va con
  // peso alto porque es el nombre por el que la gente busca de verdad.
  for (const c of CATALOGO) {
    entradas.push({
      tipo: "catalogo",
      titulo: c.nombre,
      contexto: c.referencias.map((r) => LIBROS[r.libro].titulo.split(",")[0]).join(" · "),
      descripcion: c.que,
      href: `/tema/${c.slug}`,
      busqueda: normalizar([c.nombre, (c.sinonimos ?? []).join(" "), c.que, c.unidad].join(" ")),
    });
  }

  for (const c of CASOS) {
    entradas.push({
      tipo: "caso",
      titulo: c.titulo,
      contexto: `Caso clínico · ${c.dificultad}`,
      descripcion: c.resumen,
      href: `/practicar/casos/${c.slug}`,
      busqueda: normalizar([c.titulo, c.resumen, c.etapas.map((e) => e.titulo).join(" ")].join(" ")),
    });
  }

  for (const m of MORFEMAS) {
    entradas.push({
      tipo: "morfema",
      titulo: m.m,
      contexto: "Morfema",
      descripcion: `${m.sig}. Ej.: ${m.ej}`,
      href: "/practicar/terminologia",
      busqueda: normalizar([m.m, m.sig, m.ej].join(" ")),
    });
  }

  return entradas;
}

/** Los tipos se ordenan así en los resultados cuando empatan en puntuación. */
const PESO_TIPO: Record<TipoEntrada, number> = {
  tema: 0, catalogo: 1, unidad: 2, caso: 3, bloque: 4, morfema: 5,
};

/**
 * Busca por palabras sueltas, no por la cadena entera.
 *
 * Quien escribe «acido base riñon» espera encontrar el tema de pH aunque esas
 * tres palabras no aparezcan juntas en ningún sitio. Exigir la frase literal
 * haría que la mayoría de las búsquedas reales no devolvieran nada.
 */
export function buscar(indice: Entrada[], consulta: string, limite = 40): Entrada[] {
  const terminos = normalizar(consulta).split(" ").filter((t) => t.length >= 2);
  if (terminos.length === 0) return [];

  const puntuadas: { e: Entrada; punto: number }[] = [];
  for (const e of indice) {
    const titulo = normalizar(e.titulo);
    let punto = 0;
    let todos = true;

    for (const t of terminos) {
      if (!e.busqueda.includes(t)) { todos = false; break; }
      // Acertar en el título vale más que acertar en cualquier otro campo, y
      // que el título empiece por el término vale más todavía.
      if (titulo.startsWith(t)) punto += 6;
      else if (titulo.includes(t)) punto += 4;
      else punto += 1;
    }
    if (!todos) continue;

    if (titulo === normalizar(consulta)) punto += 10;
    punto -= PESO_TIPO[e.tipo] * 0.5;
    puntuadas.push({ e, punto });
  }

  return puntuadas
    .sort((a, b) => b.punto - a.punto || a.e.titulo.localeCompare(b.e.titulo))
    .slice(0, limite)
    .map((p) => p.e);
}

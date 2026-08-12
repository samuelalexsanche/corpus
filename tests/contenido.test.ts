/**
 * El estándar editorial, ejecutable.
 *
 * `CONTENIDO.md` describe cómo debe ser un tema y el tipo `Tema` obliga a que
 * los campos existan. Lo que ninguno de los dos puede hacer es comprobar que un
 * campo obligatorio no venga vacío, que una analogía traiga su `dondeSeRompe`,
 * o que los `relacionados` apunten a algo. Eso se comprueba aquí.
 *
 * Este archivo no juzga el contenido médico: eso lo hace una persona con las
 * fuentes delante. Solo impide que se publique un tema incompleto.
 */
import { describe, expect, it } from "vitest";
import { TEMAS } from "@/content/temas";
import { CASOS } from "@/content/casos";
import { BLOQUES } from "@/content/curriculum";

const slugsBloque = new Set(BLOQUES.map((b) => b.slug));
const slugsTema = new Set(TEMAS.map((t) => t.slug));

/**
 * Marcas de que el texto quedó a medias. Ninguna debe llegar a producción.
 *
 * Los marcadores en inglés se buscan en mayúsculas y sin la bandera `i` a
 * propósito: en español «todo» es una palabra corriente («sobre todo», «del
 * todo») y sin distinguir mayúsculas el test se dispararía en cada tema bien
 * escrito. Las frases en español van aparte, esas sí sin distinguir.
 */
const MARCADORES = /\b(TODO|TBD|FIXME|XXX)\b/;
const FRASES = /lorem ipsum|pendiente de escribir|por completar|falta redactar/i;
const estaAMedias = (s: string) => MARCADORES.test(s) || FRASES.test(s);

it("hay al menos un tema y un caso", () => {
  expect(TEMAS.length).toBeGreaterThan(0);
  expect(CASOS.length).toBeGreaterThan(0);
});

it("los slugs son únicos y en kebab-case: son URLs públicas", () => {
  for (const lista of [TEMAS, CASOS]) {
    const slugs = lista.map((x) => x.slug);
    expect(new Set(slugs).size, `slugs duplicados en ${slugs.join(", ")}`).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  }
});

describe.each(TEMAS.map((t) => [t.slug, t] as const))("tema «%s»", (_slug, t) => {
  it("cuelga de un bloque que existe", () => {
    expect(slugsBloque.has(t.bloque), `bloque desconocido: ${t.bloque}`).toBe(true);
  });

  it("tiene título, resumen y una razón para existir", () => {
    for (const [campo, valor] of [["titulo", t.titulo], ["tituloSEO", t.tituloSEO],
      ["resumen", t.resumen], ["porQueImporta", t.porQueImporta]] as const) {
      expect(valor.trim().length, `${campo} vacío`).toBeGreaterThan(0);
    }
    expect(t.minutos).toBeGreaterThan(0);
  });

  it("explica en prosa, no en párrafos vacíos", () => {
    expect(t.secciones.length).toBeGreaterThan(0);
    for (const s of t.secciones) {
      expect(s.titulo.trim().length).toBeGreaterThan(0);
      expect(s.cuerpo.length, `sección «${s.titulo}» sin cuerpo`).toBeGreaterThan(0);
      for (const p of s.cuerpo) expect(p.trim().length).toBeGreaterThan(0);
    }
  });

  // La regla que más daño evita: un andamio que no se retira se queda como
  // error conceptual. El tipo permite `analogia` sin más, el test no.
  it("si trae analogía, dice dónde se rompe", () => {
    if (!t.analogia) return;
    expect(t.analogia.texto.trim().length).toBeGreaterThan(0);
    expect(t.analogia.dondeSeRompe.trim().length,
      "analogía sin dondeSeRompe").toBeGreaterThan(0);
  });

  it("termina en algo que el lector tiene que producir", () => {
    expect(t.recall.length, "sin prompts de recall").toBeGreaterThan(0);
    for (const r of t.recall) {
      expect(r.pregunta.trim().length).toBeGreaterThan(0);
      // La referencia debe permitir autocalificarse con honestidad: si es de
      // una línea, no da para eso.
      expect(r.referencia.trim().length,
        `referencia demasiado corta en «${r.pregunta}»`).toBeGreaterThan(80);
      expect(r.pistas.length).toBeGreaterThan(0);
    }
  });

  it("nombra errores reales y los corrige con precisión", () => {
    expect(t.errores.length).toBeGreaterThan(0);
    for (const e of t.errores) {
      expect(e.error.trim().length).toBeGreaterThan(0);
      expect(e.correccion.trim().length,
        `corrección demasiado vaga para «${e.error}»`).toBeGreaterThan(40);
    }
  });

  it("tiene tarjetas con anverso y reverso", () => {
    expect(t.tarjetas.length).toBeGreaterThan(0);
    for (const c of t.tarjetas) {
      expect(c.front.trim().length).toBeGreaterThan(0);
      expect(c.back.trim().length).toBeGreaterThan(0);
    }
  });

  it("no tiene tarjetas duplicadas", () => {
    const fronts = t.tarjetas.map((c) => c.front.trim().toLowerCase());
    expect(new Set(fronts).size).toBe(fronts.length);
  });

  it("tiene FAQ con respuestas autocontenidas", () => {
    expect(t.faq.length).toBeGreaterThan(0);
    for (const f of t.faq) {
      expect(f.q.trim().endsWith("?"), `«${f.q}» no es una pregunta`).toBe(true);
      expect(f.a.trim().length,
        `respuesta a «${f.q}» no se sostiene sola`).toBeGreaterThan(80);
    }
  });

  // Sin fuentes no hay forma de que nadie verifique el dato, y el usuario de
  // esta plataforma estudia sin profesor que lo corrija.
  it("cita fuentes", () => {
    expect(t.fuentes.length, "tema sin fuentes").toBeGreaterThan(0);
    for (const f of t.fuentes) expect(f.trim().length).toBeGreaterThan(10);
  });

  it("sus relacionados apuntan a temas que existen", () => {
    for (const r of t.relacionados) {
      expect(slugsTema.has(r), `relacionado inexistente: ${r}`).toBe(true);
    }
    expect(t.relacionados).not.toContain(t.slug);
  });

  it("no quedó texto a medio escribir", () => {
    expect(estaAMedias(JSON.stringify(t)), `marca de pendiente en «${t.slug}»`).toBe(false);
  });
});

describe.each(CASOS.map((c) => [c.slug, c] as const))("caso «%s»", (_slug, c) => {
  it("cuelga de un bloque que existe", () => {
    expect(slugsBloque.has(c.bloque)).toBe(true);
  });

  it("lleva la advertencia de que no es una guía de manejo", () => {
    expect(c.advertencia.trim().length).toBeGreaterThan(40);
  });

  it("avanza por etapas y cada una pide una respuesta", () => {
    expect(c.etapas.length).toBeGreaterThan(1);
    for (const e of c.etapas) {
      expect(e.informacion.length).toBeGreaterThan(0);
      expect(e.pregunta.trim().length).toBeGreaterThan(0);
      expect(e.respuestaEsperada.trim().length,
        `etapa «${e.titulo}» sin respuesta que permita autocalificarse`).toBeGreaterThan(80);
      expect(e.puntosClave.length).toBeGreaterThan(0);
    }
  });

  it("sus temas relacionados existen", () => {
    for (const r of c.temasRelacionados) expect(slugsTema.has(r), `tema inexistente: ${r}`).toBe(true);
  });
});

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LIBROS, getCatalogo, type TemaCatalogo } from "@/content/catalogo";
import { getTema } from "@/content/temas";
import { getBloque } from "@/content/curriculum";
import { claveASlug, unidadesDelCurriculum } from "@/lib/indice";
import { getFigura } from "@/content/figuras";
import { FiguraAnotada } from "@/components/figura-anotada";

/**
 * Un tema que existe en el catálogo pero que nadie ha escrito todavía.
 *
 * Comparte URL con los temas desarrollados —`/tema/<slug>`— para que el día que
 * alguien lo escriba no cambie la dirección ni se rompa ningún enlace. Lo que
 * ofrece mientras tanto no es un resumen inventado: es qué es el tema en dos
 * frases, en qué capítulo de qué libro estudiarlo, y con qué otros temas va.
 *
 * Escribir aquí un texto que parezca un tema sería lo peor que puede hacer esta
 * página. En medicina, un contenido sin verificar y con tono seguro hace más
 * daño que la ausencia de contenido.
 */
export function TemaDeCatalogo({ t }: { t: TemaCatalogo }) {
  const figura = t.figura ? getFigura(t.figura) : undefined;
  const entrada = unidadesDelCurriculum().find(({ unidad }) => unidad.clave === t.unidad);
  const bloque = entrada ? getBloque(entrada.bloqueSlug) : undefined;

  const vecinos = (t.vecinos ?? []).map((slug) => {
    const escrito = getTema(slug);
    const catalogo = getCatalogo(slug);
    return {
      slug,
      nombre: escrito?.titulo ?? catalogo?.nombre ?? slug,
      desarrollado: Boolean(escrito),
    };
  });

  return (
    <>
      <header className="border-b border-border grain">
        <div className="container py-14">
          {entrada && (
            <Link
              href={`/unidad/${claveASlug(t.unidad)}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {entrada.unidad.nombre}
            </Link>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge>{t.unidad}</Badge>
            {bloque && <Badge variant="secondary">{bloque.titulo}</Badge>}
            <Badge variant="accent">Sin desarrollar</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            {t.nombre}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.que}</p>
        </div>
      </header>

      <div className="container grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <section className="rounded-xl border-l-2 border-accent bg-accent/[0.05] p-6">
            <h2 className="text-lg font-semibold tracking-tight">Este tema todavía no está escrito</h2>
            <p className="mt-3 leading-relaxed">
              Lo que has leído arriba es la descripción del catálogo, no una explicación. Corpus
              prefiere decírtelo antes que rellenar la página con un texto que suene bien: un
              contenido médico sin verificar y con tono seguro hace más daño que su ausencia, sobre
              todo para quien estudia sin nadie que lo corrija.
            </p>
            <p className="mt-3 leading-relaxed">
              Para estudiarlo ahora, ve a los capítulos de la derecha. Cuando lo tengas entendido,
              vuelve: puedes escribir el tema tú y quedará aquí, en esta misma dirección.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link href="/practicar" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Cómo practicar lo que leas <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://github.com/samuelalexsanche/corpus"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <PenLine className="h-3.5 w-3.5" /> Escribirlo
              </a>
            </div>
          </section>

          {figura && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Esquema para orientarte</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                No sustituye al tema ni al atlas, pero sirve para situar las piezas y para
                comprobar si puedes nombrarlas sin verlas.
              </p>
              <div className="mt-6">
                <FiguraAnotada figura={figura} />
              </div>
            </section>
          )}

          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight">Dónde estudiarlo</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Capítulos concretos, no libros enteros. Con uno basta: leer el mismo tema en tres
              fuentes distintas es la forma más elegante de sentir que avanzas sin avanzar.
            </p>
            <ul className="mt-6 space-y-3">
              {t.referencias.map((r) => (
                <li key={`${r.libro}-${r.donde}`} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-medium leading-snug">{LIBROS[r.libro].titulo}</p>
                  <p className="mt-1.5 text-[15px] text-primary">{r.donde}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{LIBROS[r.libro].nota}</p>
                </li>
              ))}
            </ul>
          </section>

          {vecinos.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Se estudia junto con</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {vecinos.map((v) => (
                  <li key={v.slug}>
                    <Link
                      href={`/tema/${v.slug}`}
                      className="block rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary"
                    >
                      <span className="leading-snug">{v.nombre}</span>
                      {v.desarrollado && (
                        <span className="mt-1 block text-xs text-primary">tema desarrollado</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {t.sinonimos && t.sinonimos.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">También se le llama</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.sinonimos.map((s) => (
                  <li key={s} className="rounded-lg bg-secondary/60 px-2.5 py-1 text-xs">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {bloque && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4" /> Por qué va en este bloque
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{bloque.porQue}</p>
              <Link href={`/bloque/${bloque.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Ver el bloque <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

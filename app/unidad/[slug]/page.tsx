import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Layers, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBloque } from "@/content/curriculum";
import { RECURSOS } from "@/content/recursos";
import { claveASlug, temasDeUnidad, unidadesDelCurriculum } from "@/lib/indice";
import { JsonLd } from "@/components/jsonld";
import { ldMigas, metaPagina } from "@/lib/seo";

/**
 * Página por unidad del currículum. Existen las 74, tengan tema escrito o no.
 *
 * Una unidad sin tema no es un callejón sin salida: dice a qué bloque pertenece,
 * qué hay que saber antes, qué se espera producir al terminarla y con qué
 * bibliografía estudiarla mientras el tema no exista. Pero **no se indexa** en
 * buscadores hasta que tenga contenido propio: anunciar en Google una página
 * que aún no enseña nada es exactamente el tipo de promesa que este proyecto
 * evita.
 */

export const dynamicParams = false;

const TODAS = unidadesDelCurriculum();
const buscarUnidad = (slug: string) => TODAS.find(({ unidad }) => claveASlug(unidad.clave) === slug);

export function generateStaticParams() {
  return TODAS.map(({ unidad }) => ({ slug: claveASlug(unidad.clave) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const encontrada = buscarUnidad(slug);
  if (!encontrada) return {};
  const { unidad, bloqueTitulo } = encontrada;
  const temas = temasDeUnidad(unidad.clave);

  return metaPagina({
    titulo: unidad.nombre,
    descripcion: temas.length
      ? `${unidad.nombre}, del bloque ${bloqueTitulo}. ${temas.length} tema${temas.length === 1 ? "" : "s"} desarrollado${temas.length === 1 ? "" : "s"}, con tarjetas y preguntas de recuperación.`
      : `${unidad.nombre}, del bloque ${bloqueTitulo}. Qué necesitas saber antes, qué se espera que sepas producir al terminarla y con qué material estudiarla.`,
    ruta: `/unidad/${slug}`,
    indexable: temas.length > 0,
  });
}

export default async function UnidadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const encontrada = buscarUnidad(slug);
  if (!encontrada) notFound();

  const { unidad, bloqueSlug, bloqueTitulo } = encontrada;
  const bloque = getBloque(bloqueSlug);
  const temas = temasDeUnidad(unidad.clave);
  const recursos = RECURSOS.filter((r) => r.bloques.includes(bloqueSlug));
  const hermanas = bloque?.unidades.filter((u) => u.clave !== unidad.clave) ?? [];

  return (
    <>
      <JsonLd data={ldMigas([
        { nombre: "Inicio", ruta: "/" },
        { nombre: "Currículum", ruta: "/curriculum" },
        { nombre: bloqueTitulo, ruta: `/bloque/${bloqueSlug}` },
        { nombre: unidad.nombre, ruta: `/unidad/${slug}` },
      ])} />

      <header className="border-b border-border grain">
        <div className="container py-14">
          <Link href={`/bloque/${bloqueSlug}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> {bloqueTitulo}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge>{unidad.clave}</Badge>
            {unidad.creditos > 0 && <Badge variant="secondary">{unidad.creditos} créditos</Badge>}
            <Badge variant={temas.length ? "accent" : "secondary"}>
              {temas.length ? `${temas.length} tema${temas.length === 1 ? "" : "s"}` : "Sin tema escrito"}
            </Badge>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            {unidad.nombre}
          </h1>
          {unidad.nota && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{unidad.nota}</p>
          )}
        </div>
      </header>

      <div className="container grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {temas.length > 0 ? (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Temas de esta unidad</h2>
              <ul className="mt-6 space-y-3">
                {temas.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tema/${t.slug}`} className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
                      <p className="font-medium leading-snug">{t.titulo}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.resumen}</p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {t.minutos} min · {t.tarjetas.length} tarjetas · {t.recall.length} preguntas de recuperación
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="rounded-xl border-l-2 border-accent bg-accent/[0.05] p-6">
              <h2 className="text-lg font-semibold tracking-tight">Todavía no hay tema escrito para esta unidad</h2>
              <p className="mt-3 leading-relaxed">
                Está en el currículum y aparece en el buscador, pero nadie ha escrito aún su tema. Corpus
                prefiere decírtelo a fabricar una página que parezca contenido sin serlo: en medicina, un
                texto escrito sin verificar hace más daño que la ausencia de texto.
              </p>
              <p className="mt-3 leading-relaxed">
                Mientras tanto, esta unidad se estudia con la bibliografía del bloque que tienes a la
                derecha, y todo lo que aprendas de ella se puede practicar con los modos de la
                plataforma: escribe tus propias tarjetas, explícalo en voz alta y contrástalo.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/practicar" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Ver formas de practicar <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="https://github.com/samuelalexsanche/corpus"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <PenLine className="h-3.5 w-3.5" /> Escribir este tema
                </a>
              </div>
            </section>
          )}

          {bloque && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Por qué esta unidad va aquí</h2>
              <p className="prose-medical mt-4 max-w-2xl">{bloque.porQue}</p>

              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Qué deberías saber producir al terminar el bloque
                </p>
                <p className="mt-2 leading-relaxed">{bloque.entregable}</p>
              </div>

              {bloque.prerequisitos.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold">Antes de esta unidad conviene tener</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {bloque.prerequisitos.map((p) => (
                      <li key={p} className="rounded-lg bg-secondary/60 px-3 py-1.5 text-sm">{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {hermanas.length > 0 && (
            <section className="mt-14">
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <Layers className="h-5 w-5 text-primary" /> Otras unidades del bloque
              </h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {hermanas.map((u) => (
                  <li key={u.clave}>
                    <Link
                      href={`/unidad/${claveASlug(u.clave)}`}
                      className="block rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary"
                    >
                      <span className="text-xs text-muted-foreground">{u.clave}</span>
                      <span className="mt-0.5 block leading-snug">{u.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4" /> Con qué estudiarla
            </p>
            {recursos.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {recursos.map((r) => (
                  <li key={r.titulo} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium leading-snug">
                      {r.titulo}
                      {r.autor && <span className="font-normal text-muted-foreground"> · {r.autor}</span>}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.nota}</p>
                    {r.gratuito && <span className="mt-1.5 inline-block text-xs text-primary">Gratuito</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Este bloque todavía no tiene bibliografía propia en la plataforma.
              </p>
            )}
            <Link href="/recursos" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Todos los recursos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold">Buscar otra cosa</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Todas las unidades de la carrera están indexadas, con tema o sin él.
            </p>
            <Link href="/buscar" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Ir al buscador <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

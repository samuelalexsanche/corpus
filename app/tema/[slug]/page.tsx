import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, AlertTriangle, Zap, XCircle, BookOpen, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TEMAS, getTema } from "@/content/temas";
import { CATALOGO, getCatalogo } from "@/content/catalogo";
import { TemaDeCatalogo } from "@/components/tema-de-catalogo";
import { getBloque } from "@/content/curriculum";
import { RecallCard } from "@/components/recall-card";
import { DiagramaCircuito } from "@/components/diagrama-circuito";
import { ExportarAnki } from "@/components/exportar-anki";
import { JsonLd } from "@/components/jsonld";
import { ldArticulo, ldFAQ, ldMigas, metaPagina } from "@/lib/seo";

export const dynamicParams = false;
// Los temas escritos y los del catálogo comparten espacio de URL a propósito:
// el día que alguien desarrolle un tema del catálogo, la dirección no cambia.
export function generateStaticParams() {
  return [...TEMAS.map((t) => t.slug), ...CATALOGO.map((c) => c.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTema(slug);
  if (!t) {
    const c = getCatalogo(slug);
    if (!c) return {};
    return metaPagina({
      titulo: c.nombre,
      descripcion: `${c.que} Corpus todavía no tiene este tema desarrollado; aquí encontrarás en qué capítulo de qué libro estudiarlo.`,
      ruta: `/tema/${c.slug}`,
      // Sin contenido propio no compite en buscadores. Ver app/unidad/[slug].
      indexable: false,
    });
  }
  return metaPagina({
    titulo: t.tituloSEO,
    descripcion: t.resumen,
    ruta: `/tema/${t.slug}`,
    tipo: "article",
    keywords: t.faq.map((f) => f.q.toLowerCase().replace(/[¿?]/g, "").trim()),
  });
}

function Parrafo({ texto }: { texto: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="mb-4">
      {partes.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </p>
  );
}

export default async function TemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTema(slug);
  if (!t) {
    const c = getCatalogo(slug);
    if (!c) notFound();
    return <TemaDeCatalogo t={c} />;
  }
  const bloque = getBloque(t.bloque);

  return (
    <>
      <JsonLd data={[
        ldArticulo(t),
        ldFAQ(t.faq),
        ldMigas([
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Currículum", ruta: "/curriculum" },
          { nombre: bloque?.titulo ?? "Bloque", ruta: `/bloque/${t.bloque}` },
          { nombre: t.titulo, ruta: `/tema/${t.slug}` },
        ]),
      ]} />

      <article>
        <header className="border-b border-border grain">
          <div className="container py-14">
            <Link href={`/bloque/${t.bloque}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> {bloque?.titulo}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge>{t.unidad}</Badge>
              <Badge variant="secondary">{t.nivel}</Badge>
              <span className="text-sm text-muted-foreground">{t.minutos} min de lectura activa</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
              {t.titulo}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.resumen}</p>
          </div>
        </header>

        <div className="container grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section className="rounded-xl border-l-2 border-primary bg-primary/[0.04] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Por qué importa</h2>
              <p className="mt-2 leading-relaxed">{t.porQueImporta}</p>
            </section>

            {t.secciones.map((s) => (
              <section key={s.titulo} className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight">{s.titulo}</h2>
                <div className="prose-medical mt-4 max-w-2xl">
                  {s.cuerpo.map((c, i) => <Parrafo key={i} texto={c} />)}
                </div>
              </section>
            ))}

            {t.diagrama && (
              <section className="mt-12">
                <DiagramaCircuito datos={t.diagrama} titulo="El circuito, con una pieza tapada" />
              </section>
            )}

            {t.analogia && (
              <section className="mt-12 rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold tracking-tight">Andamio desde {t.analogia.campo}</h2>
                <p className="prose-medical mt-3">{t.analogia.texto}</p>
                <div className="mt-4 rounded-lg border-l-2 border-destructive bg-destructive/5 px-4 py-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" /> Dónde se rompe la analogía
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">{t.analogia.dondeSeRompe}</p>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Las analogías son andamios, no verdades. Un andamio que no se retira se convierte en error conceptual permanente.
                </p>
              </section>
            )}

            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Ahora reconstrúyelo tú</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Cierra lo de arriba. Si no puedes producirlo sin verlo, no lo aprendiste todavía: lo reconociste.
              </p>
              <div className="mt-6 space-y-5">
                {t.recall.map((r, i) => <RecallCard key={i} {...r} />)}
              </div>
            </section>

            {t.predicciones && t.predicciones.length > 0 && (
              <section className="mt-14">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <Zap className="h-5 w-5 text-accent" /> Predice qué pasa
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Entender un mecanismo significa poder predecir qué ocurre si cambias una de sus piezas.
                </p>
                <div className="mt-6 space-y-4">
                  {t.predicciones.map((p, i) => (
                    <details key={i} className="group rounded-xl border border-border bg-card p-5">
                      <summary className="cursor-pointer list-none">
                        <span className="block text-sm text-muted-foreground">{p.escenario}</span>
                        <span className="mt-2 block font-medium">{p.pregunta}</span>
                        <span className="mt-3 inline-block text-sm font-medium text-primary group-open:hidden">
                          Responde en tu cabeza, luego abre →
                        </span>
                      </summary>
                      <p className="prose-medical mt-4 border-t border-border pt-4">{p.respuesta}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14">
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <XCircle className="h-5 w-5 text-destructive" /> Errores que casi todo el mundo comete
              </h2>
              <ul className="mt-6 space-y-4">
                {t.errores.map((e, i) => (
                  <li key={i} className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-destructive">{e.error}</p>
                    <p className="mt-2 text-[15px] leading-relaxed">{e.correccion}</p>
                  </li>
                ))}
              </ul>
            </section>

            {t.deudaPractica && (
              <section className="mt-14 rounded-xl border-l-2 border-accent bg-accent/5 p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
                  <Hand className="h-4 w-4" /> Deuda práctica de este tema
                </h2>
                <p className="mt-2 leading-relaxed">{t.deudaPractica}</p>
              </section>
            )}

            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Preguntas frecuentes</h2>
              <div className="mt-6 space-y-5">
                {t.faq.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-semibold tracking-tight">{f.q}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">Tarjetas de este tema</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.tarjetas.length} tarjetas de recuperación</p>
              <ul className="mt-3 space-y-2">
                {t.tarjetas.map((c, i) => (
                  <li key={i} className="rounded-lg bg-secondary/50 p-3 text-xs leading-relaxed">{c.front}</li>
                ))}
              </ul>
              <Link href="/practicar/tarjetas" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Practicarlas <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="mt-4 border-t border-border pt-4">
                <ExportarAnki
                  cartas={t.tarjetas.map((c) => ({ front: c.front, back: c.back, mazo: t.titulo }))}
                  compacto
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold"><BookOpen className="h-4 w-4" /> Fuentes</p>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                {t.fuentes.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>

            {t.relacionados.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold">Temas relacionados</p>
                <ul className="mt-3 space-y-2">
                  {t.relacionados.map((r) => {
                    const rel = getTema(r);
                    return rel ? (
                      <li key={r}>
                        <Link href={`/tema/${r}`} className="text-sm text-primary hover:underline">{rel.titulo}</Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}

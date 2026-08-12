import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BLOQUES, getBloque } from "@/content/curriculum";
import { temasPorBloque } from "@/content/temas";
import { CASOS } from "@/content/casos";
import { RECURSOS } from "@/content/recursos";
import { JsonLd } from "@/components/jsonld";
import { ldCurso, ldMigas, metaPagina } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return BLOQUES.map((b) => ({ slug: b.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBloque(slug);
  if (!b) return {};
  return metaPagina({
    titulo: `Bloque ${b.numero}: ${b.titulo}`,
    descripcion: b.porQue.slice(0, 175),
    ruta: `/bloque/${b.slug}`,
    tipo: "article",
    keywords: b.temasClave,
  });
}

export default async function BloquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBloque(slug);
  if (!b) notFound();

  const temas = temasPorBloque(b.slug);
  const casos = CASOS.filter((c) => c.bloque === b.slug);
  const recursos = RECURSOS.filter((r) => r.bloques.includes(b.slug));
  const idx = BLOQUES.findIndex((x) => x.slug === b.slug);
  const siguiente = BLOQUES[idx + 1];

  return (
    <>
      <JsonLd data={[ldCurso(b), ldMigas([
        { nombre: "Inicio", ruta: "/" },
        { nombre: "Currículum", ruta: "/curriculum" },
        { nombre: b.titulo, ruta: `/bloque/${b.slug}` },
      ])]} />

      <section className="border-b border-border grain">
        <div className="container py-14 md:py-16">
          <Link href="/curriculum" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Currículum
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground">{b.numero}</span>
            <Badge variant="secondary">{b.horas}</Badge>
            <Badge variant="outline">{b.unidades.length} unidades</Badge>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">{b.titulo}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{b.subtitulo}</p>
        </div>
      </section>

      <div className="container grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <div>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Por qué este bloque va aquí</h2>
            <p className="prose-medical mt-4 max-w-2xl">{b.porQue}</p>
          </section>

          <section className="mt-10 rounded-xl border-l-2 border-accent bg-accent/5 p-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
              <Target className="h-3.5 w-3.5" /> Entregable del bloque
            </p>
            <p className="mt-2 leading-relaxed">{b.entregable}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              No se considera terminado por debajo de dominio 3: poder resolver problemas nuevos con ello.
            </p>
          </section>

          {temas.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Temas disponibles</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {temas.map((t) => (
                  <Link key={t.slug} href={`/tema/${t.slug}`} className="group">
                    <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{t.nivel}</Badge>
                          <span className="text-xs text-muted-foreground">{t.minutos} min</span>
                        </div>
                        <h3 className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-primary">{t.titulo}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t.resumen}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {casos.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">Casos clínicos</h2>
              <ul className="mt-6 space-y-3">
                {casos.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/practicar/casos/${c.slug}`}
                      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                      <span>
                        <span className="block font-medium">{c.titulo}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{c.dificultad} · {c.minutos} min</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight">Unidades de aprendizaje</h2>
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
              {b.unidades.map((u) => (
                <li key={u.clave} className="px-5 py-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">{u.clave}</code>
                    <span className="font-medium">{u.nombre}</span>
                    {u.creditos > 0 && <span className="ml-auto text-sm text-muted-foreground">{u.creditos} cr.</span>}
                  </div>
                  {u.nota && <p className="mt-1.5 text-sm italic text-muted-foreground">{u.nota}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {b.prerequisitos.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold"><Lock className="h-4 w-4" /> Prerrequisitos</p>
              <ul className="mt-3 space-y-2">
                {b.prerequisitos.map((p) => (
                  <li key={p}>
                    <Link href={`/bloque/${p}`} className="text-sm text-primary hover:underline">
                      {BLOQUES.find((x) => x.slug === p)?.titulo ?? p}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Entrar sin esto convierte el bloque en memorización sin comprensión.
              </p>
            </div>
          )}

          {recursos.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">Recursos para este bloque</p>
              <ul className="mt-3 space-y-3">
                {recursos.map((r) => (
                  <li key={r.titulo}>
                    <p className="text-sm font-medium">{r.titulo} {r.gratuito && <Badge variant="success" className="ml-1">gratis</Badge>}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.nota}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold">Conceptos clave</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {b.temasClave.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          </div>

          {siguiente && (
            <Link href={`/bloque/${siguiente.slug}`} className="block rounded-xl border border-border bg-secondary/40 p-5 transition-colors hover:border-primary/40">
              <p className="text-xs text-muted-foreground">Siguiente bloque</p>
              <p className="mt-1 font-medium">{siguiente.titulo}</p>
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}

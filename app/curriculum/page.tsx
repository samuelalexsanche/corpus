import Link from "next/link";
import { ArrowRight, Lock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BLOQUES, TOTAL_UNIDADES, TOTAL_CREDITOS, DEUDAS_PRACTICAS } from "@/content/curriculum";
import { temasPorBloque } from "@/content/temas";
import { JsonLd } from "@/components/jsonld";
import { ldCurso, ldMigas, metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Currículum de medicina ordenado por dependencia conceptual",
  descripcion:
    "Las 74 unidades de la carrera de medicina reorganizadas en 11 bloques según lo que cada tema necesita del anterior. Con prerrequisitos explícitos, entregables por bloque y deudas prácticas declaradas.",
  ruta: "/curriculum",
  keywords: ["plan de estudios medicina", "currículum medicina", "orden para estudiar medicina", "prerrequisitos medicina"],
});

export default function CurriculumPage() {
  return (
    <>
      <JsonLd data={[
        ldMigas([{ nombre: "Inicio", ruta: "/" }, { nombre: "Currículum", ruta: "/curriculum" }]),
        ...BLOQUES.map((b) => ldCurso(b)),
      ]} />

      <section className="border-b border-border grain">
        <div className="container py-16 md:py-20">
          <p className="text-sm font-medium text-primary">Itinerario</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            El currículum, ordenado por lo que cada tema necesita del anterior
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {TOTAL_UNIDADES} unidades y {TOTAL_CREDITOS} créditos reorganizados en 11 bloques. La regla de oro es
            una sola: <strong className="text-foreground">nunca estudies un tema cuyo «por qué» vive en un tema
            que aún no viste.</strong>
          </p>
        </div>
      </section>

      <section className="container py-16">
        <ol className="space-y-5">
          {BLOQUES.map((b) => {
            const temas = temasPorBloque(b.slug);
            return (
              <li key={b.slug} className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-wrap items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                    {b.numero}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold tracking-tight">
                        <Link href={`/bloque/${b.slug}`} className="hover:text-primary">{b.titulo}</Link>
                      </h2>
                      <Badge variant="secondary">{b.horas}</Badge>
                      {temas.length > 0 && <Badge variant="success">{temas.length} temas listos</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{b.subtitulo}</p>
                    <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{b.porQue}</p>

                    {b.prerequisitos.length > 0 && (
                      <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Requiere antes:</span>
                        {b.prerequisitos.map((p) => (
                          <Link key={p} href={`/bloque/${p}`} className="rounded bg-secondary px-2 py-0.5 font-medium hover:text-foreground">
                            {BLOQUES.find((x) => x.slug === p)?.titulo ?? p}
                          </Link>
                        ))}
                      </p>
                    )}

                    <details className="group mt-5">
                      <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                        Ver las {b.unidades.length} unidades
                      </summary>
                      <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
                        {b.unidades.map((u) => (
                          <li key={u.clave} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 text-sm">
                            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">{u.clave}</code>
                            <span className="font-medium">{u.nombre}</span>
                            {u.creditos > 0 && <span className="text-xs text-muted-foreground">{u.creditos} cr.</span>}
                            {u.nota && <span className="w-full text-xs italic text-muted-foreground">{u.nota}</span>}
                          </li>
                        ))}
                      </ul>
                    </details>

                    <div className="mt-5 rounded-lg border-l-2 border-accent bg-accent/5 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Entregable</p>
                      <p className="mt-1 text-sm leading-relaxed">{b.entregable}</p>
                    </div>

                    <Link href={`/bloque/${b.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      Entrar al bloque <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-border bg-destructive/[0.04]">
        <div className="container py-16">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-2xl font-semibold tracking-tight">Lo que este currículum no puede darte</h2>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Esta lista está aquí a propósito y no se esconde. El riesgo real de estudiar medicina en pantalla no es
            aprender poco: es confundir dominio teórico con competencia clínica.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DEUDAS_PRACTICAS.map((d) => (
              <li key={d.titulo} className="rounded-xl border border-border bg-card p-5">
                <p className="font-semibold tracking-tight">{d.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

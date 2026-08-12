import Link from "next/link";
import { ArrowRight, Brain, Gauge, Layers, Mic, Shuffle, Stethoscope, RefreshCw, ScanSearch, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOQUES, TOTAL_UNIDADES, TOTAL_CREDITOS } from "@/content/curriculum";
import { TOTAL_MORFEMAS } from "@/content/morfemas";
import { TEMAS } from "@/content/temas";
import { JsonLd } from "@/components/jsonld";
import { ldFAQ, metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Aprende medicina por mecanismo, no por memoria",
  descripcion:
    "Plataforma abierta y gratuita para estudiar medicina: currículum de 74 unidades ordenado por dependencia conceptual, repetición espaciada, recall activo y casos clínicos. Sin cuentas ni publicidad.",
  ruta: "/",
  keywords: ["estudiar medicina", "medicina autodidacta", "repetición espaciada medicina", "recall activo", "fisiología", "plataforma gratuita medicina"],
});

const FAQ = [
  { q: "¿Corpus es gratis?", a: "Sí. El código es MIT y el contenido CC BY-SA 4.0. No hay cuentas, ni suscripciones, ni publicidad, ni rastreo. El progreso se guarda solo en tu navegador." },
  { q: "¿Sirve si ya estoy en la facultad de medicina?", a: "Sí. Puedes entrar directamente a un tema para repasarlo o practicarlo sin seguir el itinerario completo. Cada tema es autocontenido y termina en preguntas de producción activa." },
  { q: "¿Puedo aprender medicina completa aquí?", a: "No, y la plataforma lo dice explícitamente. La exploración física, los procedimientos, el juicio clínico bajo incertidumbre real y la comunicación con pacientes no se aprenden en pantalla. Corpus cubre la parte teórica y lleva un registro visible de lo que no puede enseñar." },
  { q: "¿Por qué el currículum está reordenado?", a: "Porque está ordenado por dependencia conceptual y no por semestre administrativo. La regla es no estudiar un tema cuyo porqué vive en un tema que aún no viste: histología antes que embriología, embriología antes que anatomía, fisiología antes que fisiopatología, y farmacología después de ambas." },
];

const MODOS = [
  { icon: RefreshCw, titulo: "Repetición espaciada", texto: "Tarjetas que reaparecen justo cuando estás por olvidarlas, ni antes ni después. Nunca de reconocimiento: siempre tienes que producir la respuesta.", href: "/practicar/tarjetas" },
  { icon: Brain, titulo: "Recall en frío", texto: "Papel en blanco, sin apuntes. Reconstruyes el mecanismo y después comparas contra la referencia y te calificas honesto del 0 al 4.", href: "/practicar/recall" },
  { icon: Gauge, titulo: "Calibración", texto: "Dices tu confianza antes de ver la respuesta y al final se compara con lo que acertaste. Lo que mide no es cuánto sabes, sino si sabes cuándo lo sabes.", href: "/practicar/calibracion" },
  { icon: Mic, titulo: "Explícalo en voz alta", texto: "Tres minutos hablando, sin apuntes, a alguien que no estudia medicina. Es donde aparecen los huecos que la lectura tapa.", href: "/practicar/explicar" },
  { icon: Shuffle, titulo: "Repaso mezclado", texto: "Temas alternados en vez de agrupados. Se siente más difícil que estudiar por bloques, y por eso mismo funciona mejor.", href: "/practicar/mezcla" },
  { icon: Stethoscope, titulo: "Casos clínicos por etapas", texto: "El caso se revela por partes. Comprometes un diferencial antes de recibir más datos, como en la consulta real.", href: "/practicar/casos" },
  { icon: ScanSearch, titulo: "Decodificador de términos", texto: "Descompón cualquier término médico en sus morfemas. 249 piezas que abren miles de palabras.", href: "/practicar/terminologia" },
  { icon: GitBranch, titulo: "Predice qué pasa", texto: "«¿Qué le pasa al cuerpo si cambio esto?». El formato que separa entender un mecanismo de haberlo memorizado.", href: "/practicar/predicciones" },
  { icon: Layers, titulo: "Mapa de dependencias", texto: "Ves qué prerrequisitos te faltan antes de entrar a un bloque, para que nada se estudie fuera de orden.", href: "/curriculum" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={ldFAQ(FAQ)} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border grain">
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl animate-fade-up">
            <Badge variant="accent" className="mb-6">Abierto · gratuito · sin cuentas</Badge>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
              Aprende medicina por{" "}
              <span className="text-primary">mecanismo</span>, no por memoria.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              El currículum completo de medicina reordenado por dependencia conceptual, con
              recuperación activa en cada página. No te dejamos leer y sentir que entendiste:
              te obligamos a reconstruirlo.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/curriculum"><Button size="lg">Ver el currículum <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/practicar"><Button size="lg" variant="outline">Empezar a practicar</Button></Link>
            </div>

            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {[
                { n: "11", l: "bloques" },
                { n: String(TOTAL_UNIDADES), l: "unidades" },
                { n: String(TOTAL_CREDITOS), l: "créditos" },
                { n: String(TOTAL_MORFEMAS), l: "morfemas" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-3xl font-semibold tabular-nums tracking-tight">{s.n}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Tesis */}
      <section className="border-b border-border bg-secondary/25">
        <div className="container grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {[
            { t: "La familiaridad no es dominio", d: "Releer un capítulo lo hace sentir conocido sin hacerlo estar aprendido. Es el modo de falla que más rutas de estudio ha matado. Por eso aquí cada tema termina en producción, no en resumen." },
            { t: "El orden no es negociable", d: "Nunca estudies un tema cuyo porqué vive en un tema que aún no viste. Anatomía sin embriología es memorizar datos arbitrarios; con embriología, es deducción." },
            { t: "Lo que no podemos enseñarte", d: "Auscultar, palpar, suturar, decidir a las tres de la mañana con información incompleta. Llevamos una lista explícita de esas deudas, visible en todo momento. Confundir teoría con competencia clínica es el riesgo real." },
          ].map((c) => (
            <div key={c.t}>
              <h2 className="text-lg font-semibold tracking-tight">{c.t}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modos */}
      <section className="container py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Seis formas de estudiar que exigen que produzcas</h2>
          <p className="mt-4 text-muted-foreground">
            Ningún modo de Corpus te deja pasar solo leyendo. Todos terminan con algo que tienes que generar tú.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODOS.map((m) => (
            <Link key={m.titulo} href={m.href} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <CardContent className="p-6">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold tracking-tight">{m.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.texto}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Bloques */}
      <section className="border-y border-border bg-secondary/25">
        <div className="container py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">El itinerario completo</h2>
              <p className="mt-4 text-muted-foreground">
                Once bloques ordenados por lo que cada uno necesita del anterior. Puedes entrar por donde quieras,
                pero el mapa te dice qué te vas a perder si te lo saltas.
              </p>
            </div>
            <Link href="/curriculum"><Button variant="outline">Ver mapa completo <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          <ol className="mt-12 grid gap-3 md:grid-cols-2">
            {BLOQUES.map((b) => (
              <li key={b.slug}>
                <Link href={`/bloque/${b.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {b.numero}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold tracking-tight">{b.titulo}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{b.subtitulo}</span>
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {b.unidades.length} unidades · {b.horas}
                    </span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Temas destacados */}
      <section className="container py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Temas para empezar hoy</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TEMAS.slice(0, 6).map((t) => (
            <Link key={t.slug} href={`/tema/${t.slug}`} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{t.minutos} min</Badge>
                  <h3 className="font-semibold leading-snug tracking-tight group-hover:text-primary">{t.titulo}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{t.resumen}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/25">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

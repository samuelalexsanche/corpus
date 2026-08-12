import { JsonLd } from "@/components/jsonld";
import { ldFAQ, metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Cómo estudiar medicina sin engañarte a ti mismo",
  descripcion: "El método detrás de Corpus: recuperación activa, repetición espaciada, escala honesta de dominio 0-4 y calibración con métrica externa. Con los errores más comunes y cómo evitarlos.",
  ruta: "/metodo",
  keywords: ["cómo estudiar medicina", "método de estudio medicina", "repetición espaciada", "recuperación activa", "técnicas de estudio medicina"],
});

const FAQ = [
  { q: "¿Cuántas horas al día hay que estudiar medicina?", a: "Importa mucho más la consistencia que el total. Diez horas semanales sostenidas durante años rinden más que cuarenta horas en ráfagas seguidas de abandono. Lo que no se negocia es el repaso espaciado diario, aunque sean quince minutos." },
  { q: "¿Por qué releer no funciona?", a: "Porque releer produce familiaridad, y la familiaridad se siente igual que el conocimiento sin serlo. El texto se vuelve reconocible sin volverse recuperable. La única forma de saber si sabes algo es intentar producirlo sin verlo." },
  { q: "¿Qué es la escala de dominio 0 a 4?", a: "0 no visto; 1 leído, lo reconozco si lo veo; 2 explicable, puedo explicarlo sin ver nada; 3 aplicable, resuelvo problemas nuevos con ello; 4 integrado, lo conecto con otros sistemas. Un tema no cuenta como terminado por debajo de 3, y la mayoría de la gente se detiene en 1 creyendo que va en 3." },
];

const CICLO = [
  { n: "1", t: "Repaso vencido", m: "15–30 min", d: "Siempre primero y siempre completo. Si un día falta tiempo, se sacrifica lo nuevo, nunca lo vencido." },
  { n: "2", t: "Recall en frío del tema previo", m: "5 min", d: "Papel en blanco, sin ver nada. Mide de verdad, a diferencia de la sensación de familiaridad." },
  { n: "3", t: "Contenido nuevo", m: "40–60 min", d: "Lectura o video, con notas mínimas. Reescribir bonito es pasivo y da la ilusión de haber trabajado." },
  { n: "4", t: "Producción activa", m: "20–30 min", d: "Explicarlo en voz alta como a alguien de secundaria, dibujar el mecanismo de memoria o resolver una viñeta. Este es el paso que hace el aprendizaje y es el que todo el mundo se salta." },
  { n: "5", t: "Fabricación de tarjetas", m: "10 min", d: "Del material de hoy, mientras está fresco. Nunca de algo que no entendiste: memorizar sin comprender genera tarjetas que fallas para siempre." },
  { n: "6", t: "Bitácora", m: "2 min", d: "Qué se atoró y qué queda pendiente. Sin memoria del sistema, cada sesión empieza de cero." },
];

const ERRORES = [
  { t: "Coleccionismo de recursos", d: "Seis libros abiertos, cero terminados. Un libro columna por materia, uno de consulta, un recurso visual y un banco de preguntas. Más que eso es procrastinación disfrazada de rigor." },
  { t: "Notas bonitas", d: "Reescribir es pasivo. La sensación de productividad es real; el aprendizaje no. Notas mínimas, tarjetas máximas." },
  { t: "Saltarse el repaso en semanas pesadas", d: "Es exactamente cuando más se necesita. Dos semanas sin repasar no te dejan donde estabas: te dejan con una avalancha de tarjetas vencidas, y ahí es donde la gente abandona el sistema." },
  { t: "Confundir video con estudio", d: "El video es input. Sin producción no hubo aprendizaje, por muy claro que fuera el video." },
  { t: "Perfeccionismo de bloque", d: "Buscar el 100 % de bioquímica antes de tocar histología. Se avanza al 85 % y se deja que el repaso espaciado haga el resto." },
  { t: "Ignorar las deudas prácticas", d: "El riesgo real no es aprender poco: es confundir dominio teórico con competencia clínica. Llevar la lista explícita es parte del método." },
];

export default function MetodoPage() {
  return (
    <>
      <JsonLd data={ldFAQ(FAQ)} />
      <section className="border-b border-border grain">
        <div className="container py-16">
          <p className="text-sm font-medium text-primary">Método</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Cómo estudiar medicina sin engañarte a ti mismo
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Un plan largo no falla por falta de material. Falla por olvido y por autoengaño. Todo lo que sigue
            existe para atacar esas dos cosas.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-16">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">El problema central</h2>
          <div className="prose-medical mt-4">
            <p>
              Sin exámenes, la única señal disponible es la sensación de familiaridad. Y la familiaridad es un
              pésimo predictor de dominio: releer un capítulo lo hace <em>sentir</em> conocido sin hacerlo
              <em> estar</em> aprendido. Ese es el modo de falla que más rutas de estudio ha matado.
            </p>
            <p>
              La defensa es doble. <strong>Recuperación activa</strong>: siempre producir, nunca reconocer.
              Y <strong>métrica externa</strong>: un puntaje comparable que no dependa de tu propia impresión.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">La escala de dominio</h2>
          <p className="mt-3 text-muted-foreground">Un tema no cuenta como terminado por debajo de 3.</p>
          <ol className="mt-6 space-y-3">
            {[
              ["0", "No visto", ""],
              ["1", "Leído", "Lo reconozco si lo veo"],
              ["2", "Explicable", "Puedo explicarlo sin ver nada"],
              ["3", "Aplicable", "Resuelvo problemas nuevos con ello"],
              ["4", "Integrado", "Lo conecto con otros sistemas y lo uso en casos"],
            ].map(([n, t, d]) => (
              <li key={n} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">{n}</span>
                <span><span className="font-medium">{t}</span>{d && <span className="ml-2 text-sm text-muted-foreground">{d}</span>}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">El ciclo de una sesión</h2>
          <p className="mt-3 text-muted-foreground">90 a 120 minutos. El orden importa.</p>
          <ol className="mt-6 space-y-3">
            {CICLO.map((c) => (
              <li key={c.n} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-xs font-semibold">{c.n}</span>
                  <span className="font-medium">{c.t}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{c.m}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Repetición espaciada</h2>
          <div className="prose-medical mt-4">
            <p>
              Un mazo completo de medicina ronda las 25,000 a 35,000 tarjetas. A 30 o 40 nuevas por día son unos
              dos años y medio de siembra, con 100 a 250 repasos diarios en régimen.
            </p>
            <p>Tres reglas que deciden si el sistema funciona:</p>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              ["Nunca una tarjeta de solo reconocimiento", "«¿Qué es la glucólisis?» es mala. «¿Qué enzima cataliza el paso irreversible que consume el primer ATP y qué la inhibe?» es buena."],
              ["Una tarjeta, un hecho", "Si la respuesta lleva comas, son varias tarjetas."],
              ["Nunca una tarjeta de algo que no entendiste", "Memorizar sin comprender genera tarjetas que fallas para siempre."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border-l-2 border-accent bg-accent/5 p-4">
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Errores a vigilar</h2>
          <ul className="mt-6 space-y-4">
            {ERRORES.map((e) => (
              <li key={e.t} className="rounded-xl border border-border bg-card p-5">
                <p className="font-medium">{e.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

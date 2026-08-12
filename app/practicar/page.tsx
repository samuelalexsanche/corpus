import Link from "next/link";
import { RefreshCw, Brain, Stethoscope, ScanSearch, GitBranch, Gauge, Mic, Shuffle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { metaPagina } from "@/lib/seo";
import { TEMAS } from "@/content/temas";
import { MORFEMAS } from "@/content/morfemas";
import { TODAS_LAS_CARTAS } from "@/lib/cartas";
import { CASOS } from "@/content/casos";

export const metadata = metaPagina({
  titulo: "Modos de práctica",
  descripcion: "Ocho formas de estudiar medicina con recuperación activa: repetición espaciada, repaso mezclado, calibración de confianza, explicación en voz alta, recuperación en frío, casos clínicos por etapas, decodificación de términos y predicción de consecuencias.",
  ruta: "/practicar",
  keywords: ["practicar medicina", "flashcards medicina", "casos clínicos para estudiar", "recall activo medicina"],
});

const nTarjetas = TODAS_LAS_CARTAS.length;
const nRecall = TEMAS.reduce((n, t) => n + t.recall.length, 0);
const nPredic = TEMAS.reduce((n, t) => n + (t.predicciones?.length ?? 0), 0);

const MODOS = [
  { icon: RefreshCw, titulo: "Repetición espaciada", href: "/practicar/tarjetas", cuenta: `${nTarjetas} tarjetas`,
    texto: "Cada tarjeta reaparece justo cuando estás a punto de olvidarla, ni antes ni después. Los repasos vencidos siempre van primero.",
    regla: "Nunca de reconocimiento: siempre tienes que producir." },
  { icon: Brain, titulo: "Recall en frío", href: "/practicar/recall", cuenta: `${nRecall} preguntas`,
    texto: "Campo en blanco, sin apuntes ni pistas salvo que las pidas. Escribes el mecanismo completo, después comparas con la referencia y te calificas del 0 al 4.",
    regla: "Por debajo de 3 el tema no está terminado." },
  { icon: Shuffle, titulo: "Repaso mezclado", href: "/practicar/mezcla", cuenta: "mismas tarjetas",
    texto: "Las mismas tarjetas pero alternando temas en vez de agruparlos por materia. Nunca dos seguidas de lo mismo mientras haya alternativa.",
    regla: "Se siente peor y funciona mejor. La dificultad es la señal." },
  { icon: Gauge, titulo: "Calibración", href: "/practicar/calibracion", cuenta: "¿sabes cuándo sabes?",
    texto: "Declaras tu confianza antes de ver la respuesta y al final se compara con lo que acertaste de verdad. Mide si te fías de ti mismo con motivo.",
    regla: "Fallar sintiéndose seguro es el modo de falla peligroso." },
  { icon: Mic, titulo: "Explícalo en voz alta", href: "/practicar/explicar", cuenta: `${nRecall} preguntas`,
    texto: "Tres minutos, hablando, sin apuntes y a alguien que no estudia medicina. Después comparas con la referencia.",
    regla: "Si necesitas la palabra técnica para explicarlo, no lo entendiste." },
  { icon: Stethoscope, titulo: "Casos clínicos", href: "/practicar/casos", cuenta: `${CASOS.length} casos`,
    texto: "El caso se revela por etapas. Comprometes tu razonamiento antes de recibir el siguiente dato, igual que en la consulta real.",
    regla: "Un caso bien trabajado vale por diez páginas leídas." },
  { icon: ScanSearch, titulo: "Decodificador de términos", href: "/practicar/terminologia", cuenta: `${MORFEMAS.length} morfemas`,
    texto: "Escribe cualquier término médico y descomponlo en sus piezas. También puedes practicar los morfemas por familia.",
    regla: "400 piezas abren 10,000 palabras." },
  { icon: GitBranch, titulo: "Predice qué pasa", href: "/practicar/predicciones", cuenta: `${nPredic} escenarios`,
    texto: "«¿Qué le pasa al cuerpo si cambio esto?». El formato que distingue haber entendido un mecanismo de haberlo memorizado.",
    regla: "Si no puedes predecir, no entendiste." },
];

export default function PracticarPage() {
  return (
    <>
      <section className="border-b border-border grain">
        <div className="container py-16">
          <p className="text-sm font-medium text-primary">Práctica</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Ningún modo te deja pasar solo leyendo
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Sin exámenes, la única señal disponible es la sensación de familiaridad, y la familiaridad es un pésimo
            predictor de dominio. Todo lo que hay aquí está diseñado para obligarte a producir.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {MODOS.map((m) => (
            <Link key={m.titulo} href={m.href} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <CardContent className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <m.icon className="h-5 w-5" />
                    </span>
                    <Badge variant="secondary">{m.cuenta}</Badge>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold tracking-tight group-hover:text-primary">{m.titulo}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{m.texto}</p>
                  <p className="mt-4 border-l-2 border-accent pl-3 text-sm italic text-muted-foreground">{m.regla}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Empezar <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

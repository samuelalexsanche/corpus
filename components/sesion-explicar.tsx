"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PromptExplicar {
  pregunta: string;
  referencia: string;
  tema: string;
  temaSlug: string;
}

const DURACION = 180; // 3 minutos
const reloj = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * Explicar en voz alta, con reloj y sin apuntes.
 *
 * Se diferencia de la recuperación escrita en tres cosas, y las tres importan:
 * es **hablado**, así que no se puede volver atrás a arreglar la frase; va
 * **contra reloj**, así que no hay tiempo de rodear lo que no se sabe; y se
 * dirige a **alguien que no estudia medicina**, que es lo que impide esconderse
 * detrás del vocabulario. Decir «hipertrofia concéntrica» no demuestra nada;
 * explicárselo a tu hermano, sí.
 */
export function SesionExplicar({ prompts }: { prompts: PromptExplicar[] }) {
  const [i, setI] = useState(0);
  const [restante, setRestante] = useState(DURACION);
  const [corriendo, setCorriendo] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const intervalo = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!corriendo) return;
    intervalo.current = setInterval(() => {
      setRestante((r) => {
        if (r <= 1) { setCorriendo(false); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => { if (intervalo.current) clearInterval(intervalo.current); };
  }, [corriendo]);

  if (prompts.length === 0) return null;
  const p = prompts[i % prompts.length];

  const reiniciar = () => { setCorriendo(false); setRestante(DURACION); setRevelado(false); };
  const siguiente = () => { setI((n) => n + 1); reiniciar(); };

  const agotado = restante === 0;
  const pct = ((DURACION - restante) / DURACION) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{p.tema}</p>
      <p className="mt-3 text-xl leading-snug">{p.pregunta}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        En voz alta, sin apuntes y como si se lo explicaras a alguien que no estudia medicina. Si
        necesitas un término técnico, defínelo al usarlo: ahí es donde se nota si lo entiendes.
      </p>

      <div className="mt-7">
        <div className="flex items-baseline justify-between">
          <span className={cn("text-4xl font-semibold tabular-nums tracking-tight",
            agotado && "text-accent")}>
            {reloj(restante)}
          </span>
          <span className="text-xs text-muted-foreground">
            {agotado ? "Tiempo" : corriendo ? "Explicando" : "En pausa"}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary" role="presentation">
          <div className="h-full bg-primary transition-[width] duration-1000 ease-linear" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!agotado && (
          <Button onClick={() => setCorriendo((c) => !c)}>
            {corriendo ? <><Pause className="mr-2 h-4 w-4" /> Pausa</> : <><Play className="mr-2 h-4 w-4" /> {restante === DURACION ? "Empezar" : "Seguir"}</>}
          </Button>
        )}
        <Button variant="outline" onClick={() => setRevelado(true)} disabled={revelado}>
          <Mic className="mr-2 h-4 w-4" /> Ya lo expliqué
        </Button>
        <Button variant="outline" onClick={reiniciar}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
        </Button>
        <Button variant="outline" onClick={siguiente}>
          <SkipForward className="mr-2 h-4 w-4" /> Otra pregunta
        </Button>
      </div>

      {revelado && (
        <div className="mt-7 border-t border-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Compara con esto
          </p>
          <p className="prose-medical mt-3">{p.referencia}</p>
          <p className="mt-4 rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed">
            Lo que te saltaste no es «un detalle que ya sabías»: es exactamente el hueco. Si tuviste
            que decir «y entonces, por razones complejas…», ahí está el tema que te toca repasar.
          </p>
        </div>
      )}
    </div>
  );
}

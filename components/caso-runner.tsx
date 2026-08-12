"use client";
import { useState } from "react";
import { ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Caso } from "@/content/casos";

export function CasoRunner({ caso }: { caso: Caso }) {
  const [etapa, setEtapa] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [revelado, setRevelado] = useState(false);
  const [terminado, setTerminado] = useState(false);

  const e = caso.etapas[etapa];
  const pct = (etapa / caso.etapas.length) * 100;

  const avanzar = () => {
    if (etapa + 1 < caso.etapas.length) { setEtapa(etapa + 1); setRespuesta(""); setRevelado(false); }
    else setTerminado(true);
  };

  if (terminado) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight">Caso completado</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{caso.cierre}</p>
        <Button variant="outline" className="mt-6" onClick={() => { setEtapa(0); setTerminado(false); setRespuesta(""); setRevelado(false); }}>
          Repetir el caso
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Progress value={pct} label="Progreso del caso" className="flex-1" />
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">Etapa {etapa + 1} / {caso.etapas.length}</span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{e.titulo}</p>
        <div className="mt-4 space-y-2">
          {e.informacion.map((i, k) => <p key={k} className="text-[15px] leading-relaxed">{i}</p>)}
        </div>

        <div className="mt-7 rounded-xl border-l-2 border-accent bg-accent/5 p-5">
          <p className="font-medium leading-snug">{e.pregunta}</p>
        </div>

        <textarea
          value={respuesta}
          onChange={(ev) => setRespuesta(ev.target.value)}
          disabled={revelado}
          rows={5}
          placeholder="Comprométete con una respuesta antes de ver la siguiente parte. Un caso solo enseña si te obliga a decidir con información incompleta."
          aria-label="Tu razonamiento"
          className="mt-5 w-full resize-y rounded-lg border border-input bg-background p-4 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary disabled:opacity-60"
        />

        {!revelado ? (
          <Button className="mt-5" onClick={() => setRevelado(true)} disabled={respuesta.trim().length < 15}>
            {respuesta.trim().length < 15 ? "Escribe tu razonamiento primero" : "Ver el razonamiento esperado"}
          </Button>
        ) : (
          <div className="mt-6 animate-flip-in border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Razonamiento esperado</p>
            <p className="mt-2 text-[15px] leading-relaxed">{e.respuestaEsperada}</p>
            <ul className="mt-5 space-y-1.5">
              {e.puntosClave.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{p}
                </li>
              ))}
            </ul>
            <Button className="mt-6" onClick={avanzar}>
              {etapa + 1 < caso.etapas.length ? "Siguiente etapa" : "Terminar caso"} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <p className="mt-6 flex gap-2 rounded-lg border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {caso.advertencia}
      </p>
    </div>
  );
}

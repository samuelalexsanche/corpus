"use client";
import { useState } from "react";
import { Eye, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ESCALA = [
  { n: 0, l: "No visto", d: "Ni idea" },
  { n: 1, l: "Leído", d: "Lo reconozco si lo veo" },
  { n: 2, l: "Explicable", d: "Puedo explicarlo sin ver nada" },
  { n: 3, l: "Aplicable", d: "Resuelvo problemas nuevos con ello" },
  { n: 4, l: "Integrado", d: "Lo conecto con otros sistemas" },
];

export function RecallCard({
  pregunta, referencia, pistas, onCalificar,
}: { pregunta: string; referencia: string; pistas: string[]; onCalificar?: (n: number) => void }) {
  const [respuesta, setRespuesta] = useState("");
  const [revelado, setRevelado] = useState(false);
  const [pistaVisible, setPistaVisible] = useState(-1);
  const [nota, setNota] = useState<number | null>(null);

  const reiniciar = () => { setRespuesta(""); setRevelado(false); setPistaVisible(-1); setNota(null); };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Recall en frío</p>
      <p className="mt-2 text-lg font-medium leading-snug">{pregunta}</p>

      <textarea
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        disabled={revelado}
        rows={6}
        placeholder="Reconstrúyelo aquí sin ver nada. Escribir la respuesta completa es el paso que hace el aprendizaje; leerla no."
        aria-label="Tu respuesta"
        className="mt-5 w-full resize-y rounded-lg border border-input bg-background p-4 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary disabled:opacity-60"
      />

      {pistas.length > 0 && !revelado && (
        <div className="mt-4">
          {pistaVisible >= 0 && (
            <p className="mb-3 rounded-lg border-l-2 border-accent bg-accent/5 px-4 py-2.5 text-sm">
              {pistas[pistaVisible]}
            </p>
          )}
          {pistaVisible < pistas.length - 1 && (
            <Button variant="ghost" size="sm" onClick={() => setPistaVisible((p) => p + 1)}>
              <Lightbulb className="h-4 w-4" /> {pistaVisible < 0 ? "Necesito una pista" : "Otra pista"}
            </Button>
          )}
        </div>
      )}

      {!revelado ? (
        <Button className="mt-5" onClick={() => setRevelado(true)} disabled={respuesta.trim().length < 10}>
          <Eye className="h-4 w-4" />
          {respuesta.trim().length < 10 ? "Escribe tu respuesta primero" : "Comparar con la referencia"}
        </Button>
      ) : (
        <div className="mt-6 animate-flip-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Referencia</p>
          <p className="mt-2 rounded-lg bg-secondary/60 p-4 text-[15px] leading-relaxed">{referencia}</p>

          <p className="mt-6 text-sm font-medium">Califícate honesto. Nadie más ve esto.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-5">
            {ESCALA.map((e) => (
              <button
                key={e.n}
                onClick={() => { setNota(e.n); onCalificar?.(e.n); }}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors",
                  nota === e.n ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-secondary"
                )}
              >
                <span className="block text-sm font-semibold tabular-nums">{e.n}</span>
                <span className="mt-0.5 block text-xs font-medium">{e.l}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{e.d}</span>
              </button>
            ))}
          </div>

          {nota !== null && nota < 3 && (
            <p className="mt-4 rounded-lg border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
              Por debajo de 3 el tema no cuenta como terminado. Eso no es un fracaso: es información que no tenías
              hace un minuto. Vuelve al mecanismo y repite este recall en dos o tres días, no hoy.
            </p>
          )}
          {nota !== null && nota >= 3 && (
            <p className="mt-4 rounded-lg border-l-2 border-success bg-success/5 px-4 py-3 text-sm">
              Registrado. Programa el siguiente repaso con espaciado: si lo repites hoy no mides nada, porque
              todavía lo tienes en memoria de trabajo.
            </p>
          )}

          <Button variant="ghost" size="sm" className="mt-4" onClick={reiniciar}>
            <RotateCcw className="h-4 w-4" /> Intentar de nuevo
          </Button>
        </div>
      )}
    </div>
  );
}

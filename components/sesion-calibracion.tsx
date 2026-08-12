"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, Gauge, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartaBase } from "@/components/flashcard-session";
import { LECTURA, porTramos, resumir, type Intento } from "@/lib/calibracion";
import { actualizar, leer, marcarDiaActivo } from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Baraja sin sesgo, para que el orden no dependa del orden del contenido. */
function barajar<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SesionCalibracion({ cartas }: { cartas: CartaBase[] }) {
  const [montado, setMontado] = useState(false);
  const [historial, setHistorial] = useState<Intento[]>([]);
  const [orden, setOrden] = useState<CartaBase[]>([]);
  const [i, setI] = useState(0);
  const [confianza, setConfianza] = useState(50);
  const [fase, setFase] = useState<"apostar" | "calificar">("apostar");

  useEffect(() => {
    setHistorial(leer().calibracion ?? []);
    setOrden(barajar(cartas).slice(0, 60));
    marcarDiaActivo();
    setMontado(true);
  }, [cartas]);

  const resumen = useMemo(() => resumir(historial), [historial]);
  const tramos = useMemo(() => porTramos(historial), [historial]);

  if (!montado) {
    return <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">Cargando…</div>;
  }

  const carta = orden[i];

  const registrar = (acierto: boolean) => {
    const intento: Intento = { confianza, acierto, fecha: Date.now() };
    setHistorial((h) => [...h, intento]);
    actualizar((e) => ({ ...e, calibracion: [...(e.calibracion ?? []), intento] }));
    setI((n) => n + 1);
    setConfianza(50);
    setFase("apostar");
  };

  const reiniciarHistorial = () => {
    setHistorial([]);
    actualizar((e) => ({ ...e, calibracion: [] }));
  };

  return (
    <div className="space-y-8">
      {carta ? (
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{carta.mazo}</p>
          <p className="mt-3 text-xl leading-snug" dangerouslySetInnerHTML={{ __html: carta.front }} />

          {fase === "apostar" ? (
            <div className="mt-8">
              <label htmlFor="confianza" className="flex items-baseline justify-between text-sm font-medium">
                <span>Antes de ver la respuesta: ¿qué probabilidad tienes de acertar?</span>
                <span className="tabular-nums text-primary">{confianza} %</span>
              </label>
              <input
                id="confianza" type="range" min={0} max={100} step={5}
                value={confianza} onChange={(e) => setConfianza(Number(e.target.value))}
                className="mt-3 w-full accent-[hsl(var(--primary))]"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Sé honesto. Apostar alto en todo no mejora el resultado: lo empeora, porque lo que se
                mide aquí no es cuánto aciertas sino si sabes cuándo aciertas.
              </p>
              <Button className="mt-5" onClick={() => setFase("calificar")}>Ver la respuesta</Button>
            </div>
          ) : (
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Respuesta</p>
              <p className="mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: carta.back }} />
              <p className="mt-5 text-sm">Dijiste <strong>{confianza} %</strong>. ¿Acertaste?</p>
              <div className="mt-3 flex gap-3">
                <Button onClick={() => registrar(true)}>
                  <Check className="mr-2 h-4 w-4" /> Sí
                </Button>
                <Button variant="outline" onClick={() => registrar(false)}>
                  <X className="mr-2 h-4 w-4" /> No
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <p className="font-medium">Tanda terminada.</p>
          <Button className="mt-4" variant="outline" onClick={() => { setOrden(barajar(cartas).slice(0, 60)); setI(0); }}>
            <RotateCcw className="mr-2 h-4 w-4" /> Otra tanda
          </Button>
        </div>
      )}

      <section aria-labelledby="tu-calibracion" className="rounded-xl border border-border bg-card p-6">
        <h2 id="tu-calibracion" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Gauge className="h-5 w-5 text-primary" /> Tu calibración
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Dato n={resumen.intentos} l="intentos" />
          <Dato n={`${Math.round(resumen.confianzaMedia)} %`} l="confianza media" />
          <Dato n={`${Math.round(resumen.aciertoReal)} %`} l="acierto real" />
        </div>

        <p className="mt-5 rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed">
          {LECTURA[resumen.veredicto]}
        </p>

        <table className="mt-6 w-full border-collapse text-sm">
          <caption className="sr-only">Acierto real por tramo de confianza declarada</caption>
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-semibold">Cuando dijiste</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Acertaste</th>
              <th scope="col" className="py-2 text-right font-semibold">Intentos</th>
            </tr>
          </thead>
          <tbody>
            {tramos.map((t) => (
              <tr key={t.etiqueta} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4">{t.etiqueta}</td>
                <td className={cn("py-2.5 pr-4 text-right tabular-nums",
                  t.desvio !== null && Math.abs(t.desvio) > 15 ? "text-accent" : "")}>
                  {t.observado === null ? "—" : `${Math.round(t.observado)} %`}
                </td>
                <td className="py-2.5 text-right tabular-nums text-muted-foreground">{t.intentos}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {historial.length > 0 && (
          <button onClick={reiniciarHistorial} className="mt-5 text-xs text-muted-foreground underline hover:text-foreground">
            Borrar mi historial de calibración
          </button>
        )}
      </section>
    </div>
  );
}

function Dato({ n, l }: { n: number | string; l: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-2xl font-semibold tabular-nums tracking-tight">{n}</p>
      <p className="mt-1 text-xs text-muted-foreground">{l}</p>
    </div>
  );
}

"use client";
import { useMemo, useState, useEffect } from "react";
import { Check, RotateCcw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BOTONES, Calidad, EstadoTarjeta, nuevaTarjeta, revisar, estaVencida } from "@/lib/srs";
import { leer, actualizar, marcarDiaActivo } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { intercalar } from "@/lib/intercalar";

export interface CartaBase { id: string; front: string; back: string; mazo: string }

export function FlashcardSession({
  cartas, nuevasPorDia = 30, intercalado = false,
}: {
  cartas: CartaBase[];
  nuevasPorDia?: number;
  /** Mezcla temas en vez de agruparlos. Ver `lib/intercalar.ts`. */
  intercalado?: boolean;
}) {
  const [montado, setMontado] = useState(false);
  const [estados, setEstados] = useState<Record<string, EstadoTarjeta>>({});
  const [i, setI] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [hechas, setHechas] = useState(0);

  useEffect(() => { setEstados(leer().tarjetas); marcarDiaActivo(); setMontado(true); }, []);

  const cola = useMemo(() => {
    if (!montado) return [];
    const vencidas: CartaBase[] = [];
    const nuevas: CartaBase[] = [];
    for (const c of cartas) {
      const e = estados[c.id];
      if (!e) nuevas.push(c);
      else if (estaVencida(e)) vencidas.push(c);
    }
    // Repasos vencidos SIEMPRE primero. Es la regla que sostiene el sistema, y
    // el intercalado no la rompe: mezcla temas dentro de cada grupo, no entre
    // ellos. Un repaso vencido que se retrasa se pierde.
    //
    // El orden importa: hay que intercalar **antes** de recortar la tanda del
    // día. La baraja empieza con 249 morfemas, así que quedarse con las
    // primeras 30 y mezclarlas después da 30 tarjetas del mismo mazo, que es
    // exactamente lo contrario de lo que este modo persigue.
    if (!intercalado) return [...vencidas, ...nuevas.slice(0, nuevasPorDia)];
    return [
      ...intercalar(vencidas, (c) => c.mazo),
      ...intercalar(nuevas, (c) => c.mazo).slice(0, nuevasPorDia),
    ];
  }, [cartas, estados, montado, nuevasPorDia, intercalado]);

  if (!montado) return <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">Cargando…</div>;

  const carta = cola[i];

  if (!carta) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <Check className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight">No hay nada vencido hoy</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Terminaste {hechas} tarjetas. Volver a repasarlas hoy no mediría nada: seguirían en tu memoria de trabajo.
          El intervalo es el mecanismo, no un obstáculo.
        </p>
      </div>
    );
  }

  const calificar = (q: Calidad) => {
    const previo = estados[carta.id] ?? nuevaTarjeta(carta.id);
    const nuevo = revisar(previo, q);
    const mapa = { ...estados, [carta.id]: nuevo };
    setEstados(mapa);
    actualizar((e) => ({ ...e, tarjetas: mapa }));
    setRevelado(false);
    setHechas((h) => h + 1);
    setI((x) => x + 1);
  };

  const pct = cola.length ? (i / cola.length) * 100 : 0;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Progress value={pct} label="Progreso de la sesión" className="flex-1" />
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{i} / {cola.length}</span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> {carta.mazo}
        </p>
        <p className="mt-5 text-xl font-medium leading-snug md:text-2xl">{carta.front}</p>

        {!revelado ? (
          <>
            <p className="mt-8 text-sm text-muted-foreground">
              Produce la respuesta completa en voz alta o por escrito <strong className="text-foreground">antes</strong> de
              voltear. Si volteas y piensas «ah sí, claro», eso fue reconocimiento y no aprendiste nada.
            </p>
            <Button size="lg" className="mt-5" onClick={() => setRevelado(true)}>Voltear</Button>
          </>
        ) : (
          <div className="animate-flip-in">
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: carta.back }} />
            </div>
            <div className="mt-8 grid gap-2 sm:grid-cols-4">
              {BOTONES.map((b) => (
                <button key={b.calidad} onClick={() => calificar(b.calidad)}
                  className={cn(
                    "rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/50 hover:bg-secondary",
                    b.calidad === 0 && "hover:border-destructive/50"
                  )}>
                  <span className="block text-sm font-semibold">{b.etiqueta}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{b.ayuda}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={() => { setI(0); setRevelado(false); }} className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <RotateCcw className="h-3.5 w-3.5" /> Reiniciar sesión
      </button>
    </div>
  );
}

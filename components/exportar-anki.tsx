"use client";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aAnki, mazosDe, NOMBRE_ARCHIVO, type CartaExportable } from "@/lib/anki";

export function ExportarAnki({ cartas }: { cartas: CartaExportable[] }) {
  const mazos = useMemo(() => mazosDe(cartas), [cartas]);
  // Sin selección explícita se entiende «todo»: es lo que quiere quien llega
  // aquí por primera vez, y evita un estado inicial de cero tarjetas.
  const [excluidos, setExcluidos] = useState<Set<string>>(new Set());

  const alternar = (mazo: string) =>
    setExcluidos((prev) => {
      const s = new Set(prev);
      if (s.has(mazo)) s.delete(mazo); else s.add(mazo);
      return s;
    });

  const seleccionadas = cartas.filter((c) => !excluidos.has(c.mazo));

  const descargar = () => {
    const blob = new Blob([aAnki(seleccionadas)], { type: "text/tab-separated-values;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = NOMBRE_ARCHIVO;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="exportar-anki" className="rounded-xl border border-border bg-card p-6">
      <h2 id="exportar-anki" className="text-lg font-semibold tracking-tight">Llevártelas a Anki</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Si ya llevas tu colección en Anki, no tiene sentido que mantengas dos sistemas. El archivo trae
        sus propios mazos anidados bajo <code className="rounded bg-secondary px-1 py-0.5 text-xs">Corpus</code>,
        así que se importa sin configurar nada.
      </p>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wide text-primary">Qué incluir</legend>
        <ul className="mt-3 space-y-2">
          {mazos.map(({ mazo, total }) => (
            <li key={mazo}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={!excluidos.has(mazo)}
                  onChange={() => alternar(mazo)}
                  className="h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span className="flex-1">{mazo}</span>
                <span className="tabular-nums text-xs text-muted-foreground">{total}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button onClick={descargar} disabled={seleccionadas.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Descargar {seleccionadas.length} tarjetas
        </Button>
        <p className="text-xs text-muted-foreground">
          En Anki: <strong>Archivo → Importar</strong> y elige el archivo. No hace falta tocar las opciones.
        </p>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        Se exportan las tarjetas, no tu progreso: Anki las programará como nuevas y llevará sus propios
        intervalos. Si repasas en los dos sitios, vas a ver la misma tarjeta dos veces.
      </p>
    </section>
  );
}

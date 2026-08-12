"use client";
import { useEffect, useState } from "react";
import { Download, Upload, Trash2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { leer, exportar, importar, borrarTodo, type Estado } from "@/lib/storage";
import { estaVencida } from "@/lib/srs";

export function ProgresoPanel({ totalCartas }: { totalCartas: number }) {
  const [e, setE] = useState<Estado | null>(null);
  useEffect(() => { setE(leer()); }, []);

  if (!e) return <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">Cargando…</div>;

  const vistas = Object.values(e.tarjetas);
  const vencidas = vistas.filter((t) => estaVencida(t)).length;
  const maduras = vistas.filter((t) => t.intervalo >= 21).length;
  const pct = totalCartas ? (vistas.length / totalCartas) * 100 : 0;

  const descargar = () => {
    const blob = new Blob([exportar()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `corpus-progreso-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const subir = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0]; if (!f) return;
    f.text().then((txt) => { if (importar(txt)) setE(leer()); });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { n: vistas.length, l: "tarjetas vistas" },
          { n: vencidas, l: "vencidas hoy" },
          { n: maduras, l: "maduras (≥21 d)" },
          { n: e.racha.dias, l: "días de racha", icon: true },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="flex items-center gap-1.5 text-3xl font-semibold tabular-nums tracking-tight">
              {s.icon && s.n > 0 && <Flame className="h-6 w-6 text-accent" />}{s.n}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between">
          <p className="font-medium">Cobertura del mazo</p>
          <p className="text-sm tabular-nums text-muted-foreground">{vistas.length} / {totalCartas}</p>
        </div>
        <Progress value={pct} className="mt-3" label="Cobertura del mazo" />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Cobertura no es dominio. Una tarjeta cuenta como aprendida cuando su intervalo supera las tres semanas,
          no cuando la viste una vez.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="font-medium">Tus datos son tuyos</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Todo se guarda en este navegador. No hay servidor, cuenta ni telemetría. Si cambias de equipo o limpias
          el navegador, exporta antes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={descargar}><Download className="h-4 w-4" /> Exportar</Button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm font-medium hover:bg-secondary">
            <Upload className="h-4 w-4" /> Importar
            <input type="file" accept="application/json" className="sr-only" onChange={subir} />
          </label>
          <Button variant="ghost" size="sm" onClick={() => { if (confirm("¿Borrar todo tu progreso? No se puede deshacer.")) { borrarTodo(); setE(leer()); } }}>
            <Trash2 className="h-4 w-4" /> Borrar todo
          </Button>
        </div>
      </div>
    </div>
  );
}

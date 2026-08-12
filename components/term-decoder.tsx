"use client";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { MORFEMAS, DESCOMPOSICIONES } from "@/content/morfemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/** Normaliza un morfema del dataset a sus variantes buscables. */
function variantes(m: string): string[] {
  return m
    .split("/")
    .map((p) => p.trim().replace(/-/g, "").replace(/\(([^)]*)\)/g, "$1"))
    .flatMap((p) => {
      const sinParen = m.split("/").map((x) => x.trim());
      return [p, ...sinParen.map((x) => x.replace(/[-()]/g, ""))];
    })
    .map((p) => p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
    .filter((p) => p.length >= 2);
}

const INDICE = MORFEMAS.map((m) => ({ ...m, claves: Array.from(new Set(variantes(m.m))) }));

export function TermDecoder() {
  const [q, setQ] = useState("");

  const limpio = q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");

  const piezas = useMemo(() => {
    if (limpio.length < 3) return [];
    const hits = INDICE
      .map((m) => {
        const clave = m.claves.find((c) => limpio.includes(c));
        return clave ? { ...m, clave, pos: limpio.indexOf(clave), len: clave.length } : null;
      })
      .filter(Boolean) as (typeof INDICE[number] & { clave: string; pos: number; len: number })[];

    // Cobertura sin solapamiento, priorizando coincidencias largas.
    const ordenadas = hits.sort((a, b) => b.len - a.len);
    const usado = new Array(limpio.length).fill(false);
    const elegidas: typeof ordenadas = [];
    for (const h of ordenadas) {
      let libre = true;
      for (let i = h.pos; i < h.pos + h.len; i++) if (usado[i]) { libre = false; break; }
      if (libre) { for (let i = h.pos; i < h.pos + h.len; i++) usado[i] = true; elegidas.push(h); }
    }
    return elegidas.sort((a, b) => a.pos - b.pos);
  }, [limpio]);

  const ejemplos = DESCOMPOSICIONES.slice(0, 8);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Escribe un término: pericarditis, hepatomegalia, glucogenólisis…"
          aria-label="Término médico a descomponer"
          className="w-full rounded-xl border border-input bg-background py-4 pl-11 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
        />
      </div>

      {limpio.length >= 3 && (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          {piezas.length > 0 ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Piezas reconocidas</p>
              <ul className="mt-4 space-y-3">
                {piezas.map((p) => (
                  <li key={p.m} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-3 last:border-0">
                    <code className="rounded bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary">{p.m}</code>
                    <span className="text-[15px]">{p.sig}</span>
                    {p.ej && <span className="w-full text-xs italic text-muted-foreground">Ej.: {p.ej}</span>}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-secondary/60 p-4 text-sm leading-relaxed">
                Recuerda el orden de lectura: <strong>primero el sufijo</strong> (qué pasa), luego el prefijo
                (cómo o dónde) y al final la raíz (a qué órgano).
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No reconocí piezas en «{q}». Puede que sea un epónimo (nombre propio, como «enfermedad de Crohn»),
              un nombre comercial o un término que no se compone de morfemas clásicos.
            </p>
          )}
        </div>
      )}

      {limpio.length < 3 && (
        <div className="mt-8">
          <p className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-accent" /> Prueba con uno de estos</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ejemplos.map((e) => (
              <Button key={e.t} variant="outline" size="sm" onClick={() => setQ(e.t)}>{e.t}</Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MorfemaExplorer() {
  const [filtro, setFiltro] = useState("");
  const lista = MORFEMAS.filter((m) =>
    !filtro || m.m.toLowerCase().includes(filtro.toLowerCase()) || m.sig.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <div>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Filtrar morfemas por pieza o significado…"
        aria-label="Filtrar morfemas"
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <p className="mt-3 text-sm text-muted-foreground">{lista.length} morfemas</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {lista.map((m) => (
          <li key={m.m} className="rounded-lg border border-border bg-card p-4">
            <code className="text-sm font-semibold text-primary">{m.m}</code>
            <p className="mt-1 text-sm">{m.sig}</p>
            {m.ej && <p className="mt-1 text-xs italic text-muted-foreground">{m.ej}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

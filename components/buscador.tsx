"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { buscar, type Entrada, type TipoEntrada } from "@/lib/indice";
import { cn } from "@/lib/utils";

const ETIQUETA: Record<TipoEntrada, string> = {
  tema: "Tema",
  catalogo: "Tema",
  unidad: "Unidad",
  caso: "Caso",
  bloque: "Bloque",
  morfema: "Morfema",
};

const FILTROS: { valor: TipoEntrada | "todo"; texto: string }[] = [
  { valor: "todo", texto: "Todo" },
  { valor: "tema", texto: "Desarrollados" },
  { valor: "catalogo", texto: "Por desarrollar" },
  { valor: "unidad", texto: "Unidades" },
  { valor: "caso", texto: "Casos" },
  { valor: "morfema", texto: "Morfemas" },
];

const SUGERENCIAS = ["glucólisis", "ciclo de Krebs", "potencial de acción", "inflamación", "cráneo", "nefrona", "ECG", "itis"];

export function Buscador({ indice }: { indice: Entrada[] }) {
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<TipoEntrada | "todo">("todo");

  const resultados = useMemo(() => {
    const todos = buscar(indice, q, 60);
    return tipo === "todo" ? todos : todos.filter((e) => e.tipo === tipo);
  }, [indice, q, tipo]);

  const buscando = q.trim().length >= 2;

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          type="search"
          placeholder="Busca un tema, una materia, un término…"
          aria-label="Buscar en Corpus"
          className="w-full rounded-xl border border-input bg-background py-4 pl-11 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        {FILTROS.map((f) => (
          <button
            key={f.valor}
            onClick={() => setTipo(f.valor)}
            aria-pressed={tipo === f.valor}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              tipo === f.valor
                ? "border-primary bg-primary/10 font-medium text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {f.texto}
          </button>
        ))}
      </div>

      {!buscando && (
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">Prueba con</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGERENCIAS.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {buscando && (
        <div className="mt-8" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {resultados.length === 0
              ? "Nada encontrado. Prueba con menos palabras o con la raíz del término."
              : `${resultados.length} resultado${resultados.length === 1 ? "" : "s"}`}
          </p>
          <ul className="mt-4 space-y-2">
            {resultados.map((e) => (
              <li key={`${e.tipo}-${e.href}-${e.titulo}`}>
                <Link
                  href={e.href}
                  className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
                      {ETIQUETA[e.tipo]}
                    </span>
                    <span className="text-xs text-muted-foreground">{e.contexto}</span>
                    {e.tipo === "unidad" && !e.desarrollado && (
                      <span className="text-xs text-accent">sin tema escrito todavía</span>
                    )}
                  </div>
                  <p className="mt-1.5 font-medium leading-snug">{e.titulo}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {e.descripcion}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

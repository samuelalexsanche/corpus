"use client";
import { useMemo, useState } from "react";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LIBROS } from "@/content/catalogo";
import type { Figura, Trazo } from "@/content/figuras";
import { cn } from "@/lib/utils";

/**
 * Figura con las partes numeradas, explicadas y ocultables.
 *
 * Dos modos. En **explorar**, se pincha una parte y aparece su nombre y su
 * explicación: sirve para la primera pasada. En **repasar**, los nombres
 * desaparecen y quedan solo los números: hay que decir cada uno antes de
 * destaparlo.
 *
 * El segundo modo es el que justifica el componente. Una figura entera rotulada
 * se lee, se entiende y no deja nada que producir, que es exactamente el modo
 * de falla que esta plataforma combate. Reconocer un rótulo no es saber nombrar
 * la estructura.
 */

const color = (token: string | undefined, porDefecto: string) =>
  `hsl(var(--${token ?? porDefecto}))`;

function Trazos({ trazos, activo, atenuado }: { trazos: Trazo[]; activo: boolean; atenuado: boolean }) {
  return (
    <>
      {trazos.map((t, i) => (
        <path
          key={i}
          d={t.d}
          fill={t.relleno ? color(t.relleno, "muted") : "none"}
          stroke={color(t.borde, "foreground")}
          strokeWidth={t.grosor ?? 1.5}
          strokeLinecap="round"
          className="transition-opacity"
          opacity={atenuado ? 0.28 : activo ? 1 : 0.85}
          fillOpacity={t.relleno ? (activo ? 0.35 : 0.16) : 0}
        />
      ))}
    </>
  );
}

export function FiguraAnotada({ figura }: { figura: Figura }) {
  const [modo, setModo] = useState<"explorar" | "repasar">("explorar");
  const [activa, setActiva] = useState<string | null>(null);
  const [destapadas, setDestapadas] = useState<Set<string>>(new Set());

  const parte = useMemo(
    () => figura.partes.find((p) => p.id === activa) ?? null,
    [figura.partes, activa]
  );

  const repasando = modo === "repasar";
  const nombreVisible = (id: string) => !repasando || destapadas.has(id);

  const seleccionar = (id: string) => {
    setActiva(id);
    if (repasando) setDestapadas((s) => new Set(s).add(id));
  };

  const reiniciar = () => { setDestapadas(new Set()); setActiva(null); };

  const cambiarModo = () => {
    setModo((m) => (m === "explorar" ? "repasar" : "explorar"));
    reiniciar();
  };

  return (
    <figure className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <figcaption className="text-lg font-semibold tracking-tight">{figura.titulo}</figcaption>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {repasando
              ? "Los nombres están tapados. Di cada uno en voz alta antes de tocar el número."
              : "Toca cualquier parte para ver qué es. Cuando creas que la tienes, pasa a repasar."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={cambiarModo}>
            {repasando ? <><Eye className="mr-2 h-4 w-4" /> Explorar</> : <><EyeOff className="mr-2 h-4 w-4" /> Repasar</>}
          </Button>
          {repasando && destapadas.size > 0 && (
            <Button variant="outline" size="sm" onClick={reiniciar} aria-label="Volver a tapar los nombres">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={figura.viewBox}
          className="h-auto w-full min-w-[520px]"
          role="img"
          aria-label={`${figura.titulo}. Esquema con ${figura.partes.length} partes numeradas. La lista completa con sus explicaciones está debajo de la figura.`}
        >
          {figura.fondo?.map((t, i) => (
            <path key={`f${i}`} d={t.d} fill="none" stroke={color(t.borde, "border")}
              strokeWidth={t.grosor ?? 1} strokeDasharray={t.discontinuo ? "4 4" : undefined} />
          ))}

          {figura.textos?.map((t, i) => (
            <text
              key={`t${i}`} x={t.x} y={t.y} fontSize={t.tam ?? 12}
              textAnchor={t.anclaje ?? "middle"}
              fontWeight={t.negrita ? 600 : 400}
              fill={color(t.color, "muted-foreground")}
              className="pointer-events-none select-none"
            >
              {t.texto}
            </text>
          ))}

          {figura.partes.map((p) => {
            const activo = activa === p.id;
            const atenuado = activa !== null && !activo;
            return (
              <g
                key={p.id}
                onClick={() => seleccionar(p.id)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={nombreVisible(p.id) ? p.nombre : `Parte sin nombrar número ${figura.partes.indexOf(p) + 1}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); seleccionar(p.id); } }}
              >
                <Trazos trazos={p.trazos} activo={activo} atenuado={atenuado} />
                <line
                  x1={p.rotulo.x} y1={p.rotulo.y} x2={p.rotulo.haciaX} y2={p.rotulo.haciaY}
                  stroke={color(activo ? "primary" : "muted-foreground", "muted-foreground")}
                  strokeWidth={1} opacity={atenuado ? 0.3 : 0.7}
                />
                <circle
                  cx={p.rotulo.x} cy={p.rotulo.y} r={13}
                  fill={activo ? color("primary", "primary") : color("card", "card")}
                  stroke={color(activo ? "primary" : "border", "border")}
                  strokeWidth={1.5}
                  opacity={atenuado ? 0.4 : 1}
                />
                <text
                  x={p.rotulo.x} y={p.rotulo.y + 5} textAnchor="middle" fontSize={14} fontWeight={600}
                  fill={activo ? color("primary-foreground", "background") : color("foreground", "foreground")}
                  opacity={atenuado ? 0.4 : 1}
                  className="pointer-events-none select-none"
                >
                  {figura.partes.indexOf(p) + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ol className="mt-6 grid gap-2 sm:grid-cols-2">
        {figura.partes.map((p, i) => (
          <li key={p.id}>
            <button
              onClick={() => seleccionar(p.id)}
              aria-pressed={activa === p.id}
              className={cn(
                "flex w-full items-baseline gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                activa === p.id ? "border-primary bg-primary/[0.06]" : "border-border hover:border-primary/50"
              )}
            >
              <span className="tabular-nums text-xs text-muted-foreground">{i + 1}</span>
              <span className={cn(!nombreVisible(p.id) && "italic text-muted-foreground")}>
                {nombreVisible(p.id) ? p.nombre : "¿?"}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {parte && nombreVisible(parte.id) && (
        <div className="mt-5 rounded-lg border-l-2 border-primary bg-primary/[0.05] p-4" aria-live="polite">
          <p className="font-medium">{parte.nombre}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed">{parte.explicacion}</p>
        </div>
      )}

      <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {figura.advertencia}
        {" "}Dibujo propio de Corpus, no reproducido de ningún libro. Contenido contrastado con{" "}
        {figura.referencias.map((r, i) => (
          <span key={r.libro}>
            {i > 0 && " y "}
            {LIBROS[r.libro].titulo}, {r.donde}
          </span>
        ))}.
      </p>
    </figure>
  );
}

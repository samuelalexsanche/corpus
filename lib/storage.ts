"use client";

import { EstadoTarjeta } from "./srs";

/**
 * Persistencia local. Sin cuentas, sin servidor, sin telemetría.
 * Los datos de estudio son del estudiante y no salen de su navegador.
 */

const KEY = "corpus.v1";

export interface RegistroDominio { temaSlug: string; nivel: 0 | 1 | 2 | 3 | 4; fecha: number; nota?: string }

export interface Estado {
  tarjetas: Record<string, EstadoTarjeta>;
  dominio: RegistroDominio[];
  racha: { ultimoDia: string | null; dias: number };
  ajustes: { nuevasPorDia: number };
}

const inicial: Estado = { tarjetas: {}, dominio: [], racha: { ultimoDia: null, dias: 0 }, ajustes: { nuevasPorDia: 30 } };

export function leer(): Estado {
  if (typeof window === "undefined") return inicial;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...inicial, ...JSON.parse(raw) } : inicial;
  } catch { return inicial; }
}

export function escribir(e: Estado) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(KEY, JSON.stringify(e)); } catch {}
}

export function actualizar(fn: (e: Estado) => Estado) {
  const nuevo = fn(leer());
  escribir(nuevo);
  return nuevo;
}

export function marcarDiaActivo() {
  const hoy = new Date().toISOString().slice(0, 10);
  return actualizar((e) => {
    if (e.racha.ultimoDia === hoy) return e;
    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const dias = e.racha.ultimoDia === ayer ? e.racha.dias + 1 : 1;
    return { ...e, racha: { ultimoDia: hoy, dias } };
  });
}

export function exportar(): string { return JSON.stringify(leer(), null, 2); }

export function importar(json: string): boolean {
  try { escribir({ ...inicial, ...JSON.parse(json) }); return true; } catch { return false; }
}

export function borrarTodo() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}

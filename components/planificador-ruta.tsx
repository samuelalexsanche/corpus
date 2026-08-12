"use client";
import { useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";
import type { Bloque } from "@/content/curriculum";
import { duracionLegible, planificar, SUPUESTOS_POR_DEFECTO } from "@/lib/ruta";

const fecha = (d: Date) =>
  d.toLocaleDateString("es-MX", { month: "short", year: "numeric" }).replace(".", "");

export function PlanificadorRuta({ bloques }: { bloques: Bloque[] }) {
  const [horasSemana, setHorasSemana] = useState(SUPUESTOS_POR_DEFECTO.horasSemana);
  const [semanasActivas, setSemanasActivas] = useState(SUPUESTOS_POR_DEFECTO.semanasActivas);
  const [horasPorCredito, setHorasPorCredito] = useState(SUPUESTOS_POR_DEFECTO.horasPorCredito);

  // El inicio se fija una vez por montaje: recalcularlo en cada tecla movería
  // las fechas mientras el usuario arrastra el control.
  const [inicio] = useState(() => new Date());

  const ruta = useMemo(
    () => planificar(bloques, { horasSemana, horasPorCredito, semanasActivas }, inicio),
    [bloques, horasSemana, horasPorCredito, semanasActivas, inicio]
  );

  const anosMax = ruta.semanasTotalMax / 52;

  return (
    <section aria-labelledby="planificador" className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <h2 id="planificador" className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
        <CalendarClock className="h-5 w-5 text-primary" /> Cuánto te va a llevar de verdad
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Di cuántas horas tienes de verdad a la semana. El plan que sale es conservador a
        propósito: estima por lo alto, descuenta el tiempo que se irá en repasar lo ya visto y
        no supone que estudies las 52 semanas del año.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <Control
          id="horas-semana" etiqueta="Horas por semana" valor={horasSemana}
          min={1} max={50} onChange={setHorasSemana}
          ayuda="Las que realmente vas a poner, no las que te gustaría."
        />
        <Control
          id="semanas-activas" etiqueta="Semanas activas al año" valor={semanasActivas}
          min={20} max={52} onChange={setSemanasActivas}
          ayuda="52 es la respuesta de un plan que no se va a cumplir."
        />
        <Control
          id="horas-credito" etiqueta="Horas por crédito" valor={horasPorCredito}
          min={10} max={30} onChange={setHorasPorCredito}
          ayuda="Supuesto, no dato del plan de estudios. SATCA suele contar cerca de 20."
        />
      </div>

      <div className="mt-8 rounded-lg border-l-2 border-primary bg-primary/[0.05] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Currículum completo</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          {duracionLegible(ruta.semanasTotalMin)} a {duracionLegible(ruta.semanasTotalMax)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Son unas {ruta.horasTotales.toLocaleString("es-MX")} horas de trabajo. A {horasSemana} h por
          semana, eso es lo que da la aritmética.{" "}
          {anosMax > 12
            ? "Si esa cifra parece imposible, es que lo es: la palanca son las horas semanales, no una estimación más amable. Vale más saberlo ahora que descubrirlo en el bloque cuatro."
            : "El plan aguanta a este ritmo. Ojo con los bloques del final, donde el repaso acumulado ya se come parte de cada semana."}
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">
            Duración estimada y fecha de finalización de cada bloque del currículum
          </caption>
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2.5 pr-4 font-semibold">Bloque</th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold">Horas</th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold">Repaso</th>
              <th scope="col" className="py-2.5 pr-4 text-right font-semibold">Semanas</th>
              <th scope="col" className="py-2.5 text-right font-semibold">Terminas hacia</th>
            </tr>
          </thead>
          <tbody>
            {ruta.tramos.map((t) => (
              <tr key={t.slug} className="border-b border-border last:border-0">
                <td className="py-3 pr-4">
                  <span className="text-muted-foreground">{t.numero}</span>{" "}
                  <span className="font-medium">{t.titulo}</span>
                </td>
                <td className="py-3 pr-4 text-right tabular-nums text-muted-foreground">
                  {t.horasMin}–{t.horasMax}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums text-muted-foreground">
                  {Math.round(t.fraccionRepaso * 100)} %
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">
                  {t.semanasMin}–{t.semanasMax}
                </td>
                <td className="py-3 text-right tabular-nums text-muted-foreground">
                  {fecha(t.finMax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
        La columna «repaso» es la fracción de cada semana que a esa altura se irá en sostener lo
        ya aprendido, y crece porque la base de tarjetas crece. Las fechas usan el extremo
        conservador de cada bloque. Nada de esto se guarda ni sale de tu navegador.
      </p>
    </section>
  );
}

function Control({
  id, etiqueta, valor, min, max, onChange, ayuda,
}: {
  id: string; etiqueta: string; valor: number; min: number; max: number;
  onChange: (n: number) => void; ayuda: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium">
        <span>{etiqueta}</span>
        <span className="tabular-nums text-primary">{valor}</span>
      </label>
      <input
        id={id} type="range" min={min} max={max} value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[hsl(var(--primary))]"
        aria-describedby={`${id}-ayuda`}
      />
      <p id={`${id}-ayuda`} className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{ayuda}</p>
    </div>
  );
}

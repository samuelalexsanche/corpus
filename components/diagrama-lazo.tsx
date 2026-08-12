"use client";
import { useState } from "react";
import { Check, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { aciertaLazo, type LazoDatos, type PiezaLazo } from "@/lib/lazo";

/**
 * Diagrama de un lazo de control, con una pieza tapada.
 *
 * La regla de diseño que lo gobierna: **un diagrama del mecanismo completo es
 * la respuesta disfrazada.** Si el lector ve el lazo entero, lo lee y siente
 * que lo entiende, que es justo el modo de falla que esta plataforma existe
 * para combatir. Así que el diagrama muestra la relación —quién alimenta a
 * quién— y tapa una pieza para que el lector la produzca.
 *
 * Sirve para cualquier lazo: termorregulación, glucemia, presión arterial.
 * Solo cambian los datos.
 */

const ETIQUETA: Record<PiezaLazo, string> = {
  sensor: "el sensor",
  controlador: "el controlador",
  efector: "el efector",
  setPoint: "el set point",
};

/**
 * Parte un texto en líneas que caben en `ancho`.
 *
 * SVG no ajusta texto solo, y aquí las etiquetas son frases —«tiritona y
 * vasoconstricción»— no palabras sueltas. El ancho de carácter es una
 * estimación para la pila del sistema; basta porque las cajas tienen holgura.
 */
function enLineas(texto: string, ancho: number, tam: number, maximo = 2): string[] {
  const porLinea = Math.max(1, Math.floor(ancho / (tam * 0.6)));
  const lineas: string[] = [];
  let actual = "";
  for (const palabra of texto.split(/\s+/)) {
    const tentativa = actual ? `${actual} ${palabra}` : palabra;
    if (tentativa.length <= porLinea) { actual = tentativa; continue; }
    if (actual) lineas.push(actual);
    actual = palabra;
    if (lineas.length === maximo) break;
  }
  if (actual && lineas.length < maximo) lineas.push(actual);
  if (lineas.length === maximo) {
    const sobra = texto.split(/\s+/).join(" ").length > lineas.join(" ").length;
    if (sobra) lineas[maximo - 1] = `${lineas[maximo - 1].replace(/[.,]$/, "")}…`;
  }
  return lineas;
}

const ANCHO_CAJA = 164;
const ALTO_CAJA = 72;

/** Caja del diagrama. Cuando es la incógnita se dibuja hueca y con un signo. */
function Caja({
  x, y, titulo, texto, oculta, resuelta,
}: {
  x: number; y: number; titulo: string; texto: string; oculta: boolean; resuelta: boolean;
}) {
  const acento = oculta && !resuelta;
  const lineas = acento ? ["?"] : enLineas(texto, ANCHO_CAJA - 26, 12.5);
  return (
    <g>
      <rect
        x={x} y={y} width={ANCHO_CAJA} height={ALTO_CAJA} rx={10}
        fill={acento ? "transparent" : "hsl(var(--card))"}
        stroke={acento ? "hsl(var(--accent))" : "hsl(var(--border))"}
        strokeWidth={acento ? 2 : 1}
        strokeDasharray={acento ? "5 4" : undefined}
      />
      <text x={x + 13} y={y + 21} fontSize={9.5} fontWeight={600} letterSpacing={0.7}
        fill={acento ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"}>
        {titulo.toUpperCase()}
      </text>
      <text x={x + 13} y={y + 41} fontSize={12.5} fill="hsl(var(--foreground))">
        {lineas.map((l, i) => (
          <tspan key={i} x={x + 13} dy={i === 0 ? 0 : 15}>{l}</tspan>
        ))}
      </text>
    </g>
  );
}

function Flecha({ d, etiqueta, ex, ey }: { d: string; etiqueta?: string; ex?: number; ey?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} markerEnd="url(#punta)" />
      {etiqueta && (
        <text x={ex} y={ey} fontSize={11} textAnchor="middle" fill="hsl(var(--muted-foreground))">
          {etiqueta}
        </text>
      )}
    </g>
  );
}

export function DiagramaLazo({ datos, titulo }: { datos: LazoDatos; titulo?: string }) {
  const [respuesta, setRespuesta] = useState("");
  const [veredicto, setVeredicto] = useState<"pendiente" | "acierto" | "fallo" | "revelado">("pendiente");
  const resuelta = veredicto === "acierto" || veredicto === "revelado";

  const comprobar = () => {
    if (!respuesta.trim()) return;
    setVeredicto(aciertaLazo(respuesta, datos.aceptadas) ? "acierto" : "fallo");
  };

  const reiniciar = () => { setRespuesta(""); setVeredicto("pendiente"); };

  const esc = (p: PiezaLazo) => datos.incognita === p;
  const valor: Record<PiezaLazo, string> = {
    sensor: datos.sensor, controlador: datos.controlador,
    efector: datos.efector, setPoint: datos.setPoint,
  };

  return (
    <figure className="rounded-xl border border-border bg-card p-5 sm:p-6">
      {titulo && <figcaption className="text-lg font-semibold tracking-tight">{titulo}</figcaption>}
      <p className="mt-1.5 text-sm text-muted-foreground">
        Falta una pieza. Nómbrala antes de revelarla — reconocerla en una lista no cuenta.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox="0 0 880 360" className="h-auto w-full min-w-[680px]"
          role="img"
          aria-label={
            `Diagrama de bloques del lazo que regula ${datos.variable}. ` +
            `El set point (${esc("setPoint") ? "una pieza sin nombrar" : datos.setPoint}) entra a un ` +
            `comparador, que le resta la medición y produce el error. ` +
            `El error va a ${esc("controlador") ? "una pieza sin nombrar" : datos.controlador}, ` +
            `que ordena a ${esc("efector") ? "una pieza sin nombrar" : datos.efector}; ` +
            `este ${datos.correccion} sobre ${datos.variable}. ` +
            `${datos.perturbacion ? `Una perturbación (${datos.perturbacion}) empuja la variable desde fuera. ` : ""}` +
            `${esc("sensor") ? "Una pieza sin nombrar" : datos.sensor} mide la variable y devuelve la ` +
            `medición al comparador, cerrando el lazo.`
          }
        >
          <defs>
            <marker id="punta" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
            </marker>
          </defs>

          {/*
            Diagrama de bloques clásico, de izquierda a derecha:
            set point → comparador → controlador → efector → variable, y el
            sensor devolviendo la medición al comparador.

            El set point entra por el comparador y no es una etapa de la
            cadena: es la referencia contra la que se resta la medición. Ponerlo
            en serie entre controlador y efector sería dibujar mal el mecanismo,
            y el error de dibujo se aprende igual que el texto.
          */}
          <Caja x={10} y={116} titulo="Set point" texto={datos.setPoint}
            oculta={esc("setPoint")} resuelta={resuelta} />

          {/* Comparador: aquí nace el error, que es lo único que el lazo ve. */}
          <circle cx={222} cy={152} r={19} fill="hsl(var(--card))" stroke="hsl(var(--border))" />
          <text x={222} y={158} fontSize={18} textAnchor="middle" fill="hsl(var(--foreground))">−</text>
          <Flecha d="M 174 152 H 197" />

          <Caja x={272} y={116} titulo="Controlador" texto={datos.controlador}
            oculta={esc("controlador")} resuelta={resuelta} />
          <Flecha d="M 241 152 H 266" etiqueta="error" ex={253} ey={138} />

          <Caja x={496} y={116} titulo="Efector" texto={datos.efector}
            oculta={esc("efector")} resuelta={resuelta} />
          <Flecha d="M 436 152 H 490" etiqueta="ordena" ex={463} ey={138} />

          {/* Variable regulada: la salida del lazo, resaltada. */}
          <rect x={706} y={116} width={160} height={ALTO_CAJA} rx={10}
            fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth={1.5} />
          <text x={719} y={137} fontSize={9.5} fontWeight={600} letterSpacing={0.7} fill="hsl(var(--primary))">
            VARIABLE REGULADA
          </text>
          <text x={719} y={157} fontSize={12.5} fill="hsl(var(--foreground))">
            {enLineas(datos.variable, 134, 12.5).map((l, i) => (
              <tspan key={i} x={719} dy={i === 0 ? 0 : 15}>{l}</tspan>
            ))}
          </text>
          <Flecha d="M 660 152 H 700" etiqueta={datos.correccion} ex={680} ey={104} />

          {datos.perturbacion && (
            <>
              <text x={719} y={38} fontSize={9.5} fontWeight={600} letterSpacing={0.7} fill="hsl(var(--destructive))">
                PERTURBACIÓN
              </text>
              <text x={719} y={56} fontSize={12} fill="hsl(var(--muted-foreground))">
                {enLineas(datos.perturbacion, 145, 12).map((l, i) => (
                  <tspan key={i} x={719} dy={i === 0 ? 0 : 14}>{l}</tspan>
                ))}
              </text>
              <path d="M 786 66 V 110" fill="none" stroke="hsl(var(--destructive))"
                strokeWidth={1.5} markerEnd="url(#punta)" />
            </>
          )}

          {/* Rama de vuelta: la variable se mide y la medición se resta en el comparador. */}
          <Caja x={430} y={252} titulo="Sensor" texto={datos.sensor}
            oculta={esc("sensor")} resuelta={resuelta} />
          <Flecha d="M 786 188 V 288 H 600" etiqueta="mide" ex={690} ey={278} />
          <Flecha d="M 430 288 H 222 V 177" />
          <text x={246} y={215} fontSize={11} fill="hsl(var(--muted-foreground))">medición</text>
        </svg>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <label htmlFor="lazo-respuesta" className="text-sm font-medium">
          ¿Qué va en el hueco? Nombra {ETIQUETA[datos.incognita]}.
        </label>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <input
            id="lazo-respuesta"
            value={respuesta}
            onChange={(e) => { setRespuesta(e.target.value); setVeredicto("pendiente"); }}
            onKeyDown={(e) => { if (e.key === "Enter") comprobar(); }}
            disabled={resuelta}
            placeholder="Escríbelo de memoria"
            className="min-w-[220px] flex-1 rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-60"
          />
          {!resuelta ? (
            <>
              <Button onClick={comprobar} disabled={!respuesta.trim()}>Comprobar</Button>
              <Button variant="outline" onClick={() => setVeredicto("revelado")}>
                <Eye className="mr-2 h-4 w-4" /> Revelar
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={reiniciar}>
              <RotateCcw className="mr-2 h-4 w-4" /> Otra vez
            </Button>
          )}
        </div>

        {veredicto === "fallo" && (
          <p className="mt-3 text-sm text-muted-foreground">
            No coincide con lo que esperaba. Vuelve a intentarlo antes de revelar: el intento fallido es
            parte de lo que fija el recuerdo.
          </p>
        )}
        {resuelta && (
          <p className={cn("mt-3 flex items-start gap-2 text-sm",
            veredicto === "acierto" ? "text-[hsl(var(--success))]" : "text-muted-foreground")}>
            {veredicto === "acierto" && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
            <span>
              {veredicto === "acierto" ? "Correcto: " : "Era: "}
              <strong className="font-semibold text-foreground">{valor[datos.incognita]}</strong>
            </span>
          </p>
        )}
      </div>
    </figure>
  );
}

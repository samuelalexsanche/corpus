/**
 * Figuras anotadas: esquemas con las partes numeradas y explicadas.
 *
 * **Todo el dibujo es propio.** No se reproduce ninguna ilustración de los
 * libros de referencia: están protegidas por derechos de autor y Corpus se
 * publica con licencia abierta. Lo que se cita de esos libros es el capítulo
 * donde comprobar el contenido, no su figura.
 *
 * ## La regla que gobierna estas figuras
 *
 * La misma que el resto de la plataforma: **una figura completamente rotulada
 * es la respuesta disfrazada.** Por eso el componente puede ocultar los nombres
 * y pedir que el lector los produzca. Una figura que solo se mira no enseña.
 *
 * ## Y una limitación que hay que declarar en cada figura
 *
 * Un esquema no es un atlas. Aquí se dibuja **la posición relativa y la
 * vecindad** de las estructuras, no su forma real. Quien tenga que reconocer
 * una estructura en una preparación, en una imagen o en un cadáver necesita un
 * atlas y, en su caso, el laboratorio. El campo `advertencia` de cada figura lo
 * dice, y no se quita.
 */
import type { Referencia } from "./catalogo";

export interface Trazo {
  d: string;
  /** Línea discontinua. Para ejes y referencias que no son la estructura. */
  discontinuo?: boolean;
  /** Token de color, sin `hsl(...)`: el componente lo envuelve. */
  relleno?: string;
  borde?: string;
  grosor?: number;
}

export interface ParteFigura {
  id: string;
  nombre: string;
  explicacion: string;
  trazos: Trazo[];
  /** Dónde se coloca el número y hacia qué punto de la figura apunta la guía. */
  rotulo: { x: number; y: number; haciaX: number; haciaY: number };
}

export interface Figura {
  slug: string;
  titulo: string;
  viewBox: string;
  /** Trazos de contexto que no son parte identificable ni se preguntan. */
  fondo?: Trazo[];
  partes: ParteFigura[];
  /** Qué muestra el esquema y, sobre todo, qué no muestra. */
  advertencia: string;
  referencias: Referencia[];
}

/* ------------------------------------------------------------------ */

const SARCOMERO: Figura = {
  slug: "sarcomero",
  titulo: "El sarcómero y sus bandas",
  viewBox: "0 0 720 300",
  fondo: [
    // Eje de la miofibrilla, solo para dar contexto espacial.
    { d: "M 40 150 H 680", borde: "border", grosor: 1, discontinuo: true },
  ],
  partes: [
    {
      id: "disco-z",
      nombre: "Disco Z",
      explicacion:
        "Línea que delimita el sarcómero por sus dos extremos y donde se anclan los filamentos delgados. Cuando el músculo se contrae, los discos Z de un mismo sarcómero se acercan entre sí: esa es la definición operativa de que el sarcómero se acortó.",
      trazos: [
        { d: "M 120 70 V 230", borde: "primary", grosor: 4 },
        { d: "M 600 70 V 230", borde: "primary", grosor: 4 },
      ],
      rotulo: { x: 120, y: 52, haciaX: 120, haciaY: 68 },
    },
    {
      id: "filamento-delgado",
      nombre: "Filamento delgado (actina)",
      explicacion:
        "Parte del disco Z hacia el centro del sarcómero. Además de actina lleva tropomiosina y el complejo de troponina, que en reposo tapan los sitios donde la miosina se uniría. El calcio actúa justamente aquí, no sobre la miosina.",
      trazos: [
        { d: "M 122 105 H 330", borde: "accent", grosor: 3 },
        { d: "M 122 150 H 330", borde: "accent", grosor: 3 },
        { d: "M 122 195 H 330", borde: "accent", grosor: 3 },
        { d: "M 598 105 H 390", borde: "accent", grosor: 3 },
        { d: "M 598 150 H 390", borde: "accent", grosor: 3 },
        { d: "M 598 195 H 390", borde: "accent", grosor: 3 },
      ],
      rotulo: { x: 200, y: 248, haciaX: 200, haciaY: 200 },
    },
    {
      id: "filamento-grueso",
      nombre: "Filamento grueso (miosina)",
      explicacion:
        "Ocupa la zona central del sarcómero. Sus cabezas se proyectan hacia los filamentos delgados y forman los puentes cruzados que producen fuerza. Su longitud no cambia durante la contracción: lo que cambia es cuánto se solapa con los delgados.",
      trazos: [
        { d: "M 250 128 H 470", borde: "foreground", grosor: 7 },
        { d: "M 250 172 H 470", borde: "foreground", grosor: 7 },
      ],
      rotulo: { x: 470, y: 248, haciaX: 430, haciaY: 176 },
    },
    {
      id: "banda-a",
      nombre: "Banda A",
      explicacion:
        "Corresponde a toda la longitud del filamento grueso, se solape o no con los delgados. Como el filamento grueso no cambia de longitud, **la banda A no se acorta durante la contracción**: es la comprobación más rápida de si alguien entendió el deslizamiento de filamentos o solo lo recitó.",
      trazos: [{ d: "M 250 75 H 470", borde: "primary", grosor: 2 }],
      rotulo: { x: 360, y: 60, haciaX: 360, haciaY: 73 },
    },
    {
      id: "banda-i",
      nombre: "Banda I",
      explicacion:
        "Zona donde solo hay filamento delgado, a ambos lados del disco Z. Sí se acorta al contraerse, porque los delgados se deslizan hacia el centro y entran en la zona ocupada por los gruesos.",
      trazos: [
        { d: "M 122 75 H 248", borde: "accent", grosor: 2 },
        { d: "M 472 75 H 598", borde: "accent", grosor: 2 },
      ],
      rotulo: { x: 185, y: 60, haciaX: 185, haciaY: 73 },
    },
    {
      id: "zona-h",
      nombre: "Zona H",
      explicacion:
        "Parte central de la banda A donde solo hay filamento grueso, sin solapamiento. También se estrecha al contraerse, y puede desaparecer en una contracción máxima.",
      trazos: [{ d: "M 332 225 H 388", borde: "primary", grosor: 2 }],
      rotulo: { x: 360, y: 268, haciaX: 360, haciaY: 227 },
    },
    {
      id: "linea-m",
      nombre: "Línea M",
      explicacion:
        "Centro del sarcómero, donde los filamentos gruesos se unen entre sí y quedan alineados. Es la referencia estructural que mantiene el orden del conjunto.",
      trazos: [{ d: "M 360 110 V 190", borde: "primary", grosor: 3 }],
      rotulo: { x: 420, y: 100, haciaX: 362, haciaY: 128 },
    },
  ],
  advertencia:
    "Esquema de la organización de las bandas, no de la forma ni de la escala reales. Reconocer un sarcómero en una preparación al microscopio es una habilidad distinta que requiere el laboratorio.",
  referencias: [
    { libro: "ross", donde: "cap. 11, Tejido muscular" },
    { libro: "guyton", donde: "cap. 6, Contracción del músculo esquelético" },
  ],
};

/* ------------------------------------------------------------------ */

const CRANEO_LATERAL: Figura = {
  slug: "craneo-lateral",
  titulo: "Huesos del cráneo, vista lateral",
  viewBox: "0 0 520 400",
  partes: [
    {
      id: "frontal",
      nombre: "Hueso frontal",
      explicacion:
        "Forma la frente y el techo de las órbitas. Por detrás se articula con los dos parietales en la sutura coronal, y contiene el seno frontal.",
      trazos: [{ d: "M 120 160 L 130 118 L 162 86 L 208 67 L 255 62 L 248 170 L 205 182 L 150 180 Z", relleno: "primary", borde: "primary", grosor: 1.5 }],
      rotulo: { x: 150, y: 45, haciaX: 178, haciaY: 100 },
    },
    {
      id: "parietal",
      nombre: "Hueso parietal",
      explicacion:
        "Par, aporta la mayor parte de la bóveda. Limita por delante con el frontal en la sutura coronal, por detrás con el occipital en la lambdoidea, por debajo con el temporal en la escamosa, y con el parietal del otro lado en la sagital.",
      trazos: [{ d: "M 255 62 L 330 70 L 395 105 L 368 168 L 300 178 L 248 170 Z", relleno: "accent", borde: "accent", grosor: 1.5 }],
      rotulo: { x: 310, y: 30, haciaX: 300, haciaY: 72 },
    },
    {
      id: "occipital",
      nombre: "Hueso occipital",
      explicacion:
        "Cierra el cráneo por detrás y por abajo, y contiene el agujero magno, por donde el tronco del encéfalo se continúa con la médula espinal. Es la pieza clave de la base posterior.",
      trazos: [{ d: "M 395 105 L 430 150 L 432 196 L 390 222 L 368 168 Z", relleno: "success", borde: "success", grosor: 1.5 }],
      rotulo: { x: 472, y: 112, haciaX: 418, haciaY: 150 },
    },
    {
      id: "temporal",
      nombre: "Hueso temporal",
      explicacion:
        "Aloja el oído medio y el interno, y forma con la mandíbula la única articulación móvil del cráneo. Su porción petrosa es de las zonas más densas del esqueleto y protege estructuras que no se regeneran.",
      trazos: [{ d: "M 250 172 L 300 178 L 368 168 L 390 222 L 330 240 L 285 235 L 258 205 Z", relleno: "muted", borde: "muted-foreground", grosor: 1.5 }],
      rotulo: { x: 434, y: 288, haciaX: 336, haciaY: 224 },
    },
    {
      id: "esfenoides",
      nombre: "Ala mayor del esfenoides",
      explicacion:
        "En la vista lateral solo asoma esta porción; el resto del hueso está en la base del cráneo. Es el hueso que se articula con casi todos los demás, y por sus agujeros salen varios pares craneales.",
      trazos: [{ d: "M 205 182 L 250 172 L 258 205 L 228 208 Z", relleno: "destructive", borde: "destructive", grosor: 1.5 }],
      rotulo: { x: 196, y: 122, haciaX: 230, haciaY: 186 },
    },
    {
      id: "pterion",
      nombre: "Pterion",
      explicacion:
        "No es un hueso: es el punto donde confluyen frontal, parietal, temporal y ala mayor del esfenoides. Importa porque ahí la pared es delgada y por dentro pasa la arteria meníngea media, de modo que un traumatismo en esa zona puede producir un hematoma epidural.",
      trazos: [{ d: "M 252 174 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0", relleno: "background", borde: "foreground", grosor: 2 }],
      rotulo: { x: 342, y: 122, haciaX: 261, haciaY: 170 },
    },
    {
      id: "cigomatico",
      nombre: "Hueso cigomático y arco cigomático",
      explicacion:
        "El pómulo. Junto con la apófisis del temporal forma el arco cigomático, que se palpa con facilidad y es una de las referencias más útiles de la cara.",
      trazos: [
        { d: "M 168 196 L 215 200 L 222 225 L 172 222 Z", relleno: "primary", borde: "primary", grosor: 1.5 },
        { d: "M 222 212 L 292 216", borde: "primary", grosor: 4 },
      ],
      rotulo: { x: 62, y: 214, haciaX: 168, haciaY: 208 },
    },
    {
      id: "maxilar",
      nombre: "Maxilar",
      explicacion:
        "Forma el suelo de la órbita, la mayor parte del paladar y la arcada dentaria superior. Aloja el seno maxilar, el mayor de los senos paranasales.",
      trazos: [{ d: "M 128 178 L 168 196 L 172 222 L 185 255 L 128 258 Z", relleno: "accent", borde: "accent", grosor: 1.5 }],
      rotulo: { x: 58, y: 280, haciaX: 148, haciaY: 238 },
    },
    {
      id: "nasal",
      nombre: "Hueso nasal",
      explicacion:
        "Par y pequeño, forma el puente de la nariz. Es de los huesos que con más frecuencia se fracturan de toda la cara, precisamente por lo prominente de su posición.",
      trazos: [{ d: "M 122 150 L 146 146 L 150 172 L 126 175 Z", relleno: "success", borde: "success", grosor: 1.5 }],
      rotulo: { x: 60, y: 140, haciaX: 122, haciaY: 158 },
    },
    {
      id: "mandibula",
      nombre: "Mandíbula",
      explicacion:
        "El único hueso móvil del cráneo. Su rama ascendente termina en dos salientes: el cóndilo, que forma la articulación con el temporal, y la apófisis coronoides, donde se inserta un músculo masticador.",
      trazos: [{ d: "M 120 262 L 190 268 L 255 262 L 280 250 L 300 228 L 306 240 L 292 282 L 240 300 L 150 298 L 118 285 Z", relleno: "muted", borde: "muted-foreground", grosor: 1.5 }],
      rotulo: { x: 215, y: 356, haciaX: 215, haciaY: 294 },
    },
  ],
  advertencia:
    "Esquema de posición y vecindad entre los huesos, no de su forma real. Sirve para aprender qué hueso limita con cuál y dónde queda el pterion; para los relieves, los agujeros y el aspecto real hacen falta un atlas y, si es posible, un cráneo en la mano.",
  referencias: [
    { libro: "netter", donde: "láminas de cráneo, vista lateral" },
    { libro: "moore", donde: "capítulo de cabeza, osteología del cráneo" },
  ],
};

export const FIGURAS: Figura[] = [SARCOMERO, CRANEO_LATERAL];

export const getFigura = (slug: string) => FIGURAS.find((f) => f.slug === slug);

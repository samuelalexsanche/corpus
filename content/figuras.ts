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

/** Texto dentro del lienzo: nombres de metabolitos, ejes, fases. */
export interface Etiqueta {
  x: number;
  y: number;
  texto: string;
  tam?: number;
  anclaje?: "start" | "middle" | "end";
  color?: string;
  negrita?: boolean;
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
  /**
   * Texto de contexto. No se tapa en el modo repaso: son los nombres que el
   * esquema necesita para leerse (metabolitos, ejes), no las respuestas.
   */
  textos?: Etiqueta[];
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

/* ------------------------------------------------------------------ */

const caja = (x: number, y: number, w = 150, h = 34) =>
  `M ${x} ${y} h ${w} a 6 6 0 0 1 6 6 v ${h - 12} a 6 6 0 0 1 -6 6 h -${w} a 6 6 0 0 1 -6 -6 v -${h - 12} a 6 6 0 0 1 6 -6 Z`;

const GLUCOLISIS: Figura = {
  slug: "glucolisis",
  titulo: "Glucólisis: las dos fases y los tres pasos sin retorno",
  viewBox: "0 0 620 640",
  fondo: [
    // Cadena de metabolitos. El eje vertical es el avance de la vía.
    { d: caja(160, 20) }, { d: caja(160, 100) }, { d: caja(160, 172) },
    { d: caja(160, 244) }, { d: caja(160, 330) }, { d: caja(160, 410) },
    { d: caja(160, 490) }, { d: caja(160, 566) },
    { d: "M 235 54 V 96", borde: "muted-foreground" },
    { d: "M 235 134 V 168", borde: "muted-foreground" },
    { d: "M 235 206 V 240", borde: "muted-foreground" },
    { d: "M 235 278 V 326", borde: "muted-foreground" },
    { d: "M 235 364 V 406", borde: "muted-foreground" },
    { d: "M 235 444 V 486", borde: "muted-foreground" },
    { d: "M 235 524 V 562", borde: "muted-foreground" },
  ],
  textos: [
    { x: 235, y: 42, texto: "Glucosa", negrita: true, color: "foreground" },
    { x: 235, y: 122, texto: "Glucosa-6-fosfato", color: "foreground" },
    { x: 235, y: 194, texto: "Fructosa-6-fosfato", color: "foreground" },
    { x: 235, y: 266, texto: "Fructosa-1,6-bisfosfato", tam: 11, color: "foreground" },
    { x: 235, y: 352, texto: "2 × gliceraldehído-3-P", tam: 11, color: "foreground" },
    { x: 235, y: 432, texto: "2 × 1,3-bisfosfoglicerato", tam: 10.5, color: "foreground" },
    { x: 235, y: 512, texto: "2 × fosfoenolpiruvato", tam: 11, color: "foreground" },
    { x: 235, y: 588, texto: "2 × Piruvato", negrita: true, color: "foreground" },
    { x: 60, y: 150, texto: "FASE DE", tam: 10, negrita: true, color: "destructive" },
    { x: 60, y: 164, texto: "INVERSIÓN", tam: 10, negrita: true, color: "destructive" },
    { x: 60, y: 178, texto: "gasta 2 ATP", tam: 10, color: "muted-foreground" },
    { x: 60, y: 430, texto: "FASE DE", tam: 10, negrita: true, color: "success" },
    { x: 60, y: 444, texto: "BENEFICIO", tam: 10, negrita: true, color: "success" },
    { x: 60, y: 458, texto: "rinde 4 ATP", tam: 10, color: "muted-foreground" },
    { x: 60, y: 472, texto: "y 2 NADH", tam: 10, color: "muted-foreground" },
  ],
  partes: [
    {
      id: "hexocinasa",
      nombre: "Hexocinasa / glucocinasa (paso irreversible 1)",
      explicacion:
        "Fosforila la glucosa nada más entrar y gasta un ATP para hacerlo. La ganancia inmediata no es energética sino de retención: la glucosa fosforilada lleva carga y ya no puede salir por el transportador por el que entró. En el hígado la isoenzima es la glucocinasa, con menos afinidad, de modo que solo trabaja de verdad cuando la glucemia es alta.",
      trazos: [{ d: "M 250 60 h 90", borde: "destructive", grosor: 3 }],
      rotulo: { x: 372, y: 60, haciaX: 344, haciaY: 60 },
    },
    {
      id: "pfk1",
      nombre: "Fosfofructocinasa-1 (paso irreversible 2)",
      explicacion:
        "El punto de control más importante de la vía y el que fija su velocidad. Gasta el segundo ATP. La inhibe el propio ATP y el citrato —señales de que sobra energía— y la activa el AMP. Es aquí donde la célula decide de verdad si va a degradar glucosa o no.",
      trazos: [{ d: "M 250 224 h 90", borde: "destructive", grosor: 3 }],
      rotulo: { x: 372, y: 224, haciaX: 344, haciaY: 224 },
    },
    {
      id: "aldolasa",
      nombre: "Escisión en dos triosas (aldolasa)",
      explicacion:
        "Parte la molécula de seis carbonos en dos de tres. A partir de aquí todo ocurre por duplicado, y ese detalle es la causa del error de balance más frecuente: cada paso posterior rinde el doble de lo que aparenta al leerlo una sola vez.",
      trazos: [{ d: "M 250 302 h 90", borde: "primary", grosor: 3 }],
      rotulo: { x: 372, y: 302, haciaX: 344, haciaY: 302 },
    },
    {
      id: "gapdh",
      nombre: "Gliceraldehído-3-fosfato deshidrogenasa",
      explicacion:
        "El único paso de oxidación de toda la glucólisis: aquí se produce el NADH. Como la vía necesita NAD⁺ para seguir funcionando, este es el punto que obliga a regenerarlo, sea en la mitocondria con oxígeno o convirtiendo piruvato en lactato sin él.",
      trazos: [{ d: "M 250 386 h 90", borde: "success", grosor: 3 }],
      rotulo: { x: 372, y: 386, haciaX: 344, haciaY: 386 },
    },
    {
      id: "piruvato-cinasa",
      nombre: "Piruvato cinasa (paso irreversible 3)",
      explicacion:
        "Último paso y segundo que produce ATP. Junto con la hexocinasa y la fosfofructocinasa-1 forma el trío de reacciones que la gluconeogénesis no puede recorrer al revés, y por eso esa vía necesita enzimas propias para rodearlas.",
      trazos: [{ d: "M 250 544 h 90", borde: "destructive", grosor: 3 }],
      rotulo: { x: 372, y: 544, haciaX: 344, haciaY: 544 },
    },
    {
      id: "balance",
      nombre: "Balance neto por glucosa",
      explicacion:
        "Se gastan 2 ATP en la fase de inversión y se producen 4 en la de beneficio, así que la ganancia neta es de 2 ATP, más 2 NADH y 2 piruvatos. Sin oxígeno eso es todo lo que se obtiene; con oxígeno, el piruvato y el NADH siguen hacia la mitocondria y el rendimiento se multiplica.",
      trazos: [{ d: caja(430, 566, 150, 34), relleno: "primary", borde: "primary", grosor: 1.5 }],
      rotulo: { x: 505, y: 540, haciaX: 505, haciaY: 562 },
    },
  ],
  advertencia:
    "Esquema del orden de la vía y de sus puntos de control, no de las estructuras químicas ni de todos los intermediarios. Los pasos entre 1,3-bisfosfoglicerato y fosfoenolpiruvato se han agrupado por claridad.",
  referencias: [
    { libro: "guyton", donde: "cap. 68, Metabolismo de los hidratos de carbono y formación del ATP" },
    { libro: "lippincott", donde: "capítulo de glucólisis" },
  ],
};

/* ------------------------------------------------------------------ */

const KREBS: Figura = {
  slug: "ciclo-de-krebs",
  titulo: "Ciclo de Krebs: dónde se pierde carbono y dónde se gana electrón",
  viewBox: "0 0 620 560",
  fondo: [
    { d: "M 310 280 m -170 0 a 170 170 0 1 0 340 0 a 170 170 0 1 0 -340 0", borde: "border", grosor: 1.5 },
    { d: "M 310 60 V 100", borde: "accent", grosor: 3 },
  ],
  textos: [
    { x: 310, y: 48, texto: "Acetil-CoA (2 C)", negrita: true, color: "accent" },
    { x: 310, y: 152, texto: "Citrato (6 C)", color: "foreground" },
    { x: 470, y: 205, texto: "Isocitrato", color: "foreground", anclaje: "start" },
    { x: 470, y: 300, texto: "α-cetoglutarato (5 C)", color: "foreground", anclaje: "start" },
    { x: 440, y: 395, texto: "Succinil-CoA (4 C)", color: "foreground", anclaje: "start" },
    { x: 310, y: 462, texto: "Succinato", color: "foreground" },
    { x: 150, y: 395, texto: "Fumarato", color: "foreground", anclaje: "end" },
    { x: 150, y: 300, texto: "Malato", color: "foreground", anclaje: "end" },
    { x: 150, y: 205, texto: "Oxalacetato (4 C)", color: "foreground", anclaje: "end" },
    { x: 310, y: 276, texto: "Por cada vuelta", tam: 11, negrita: true, color: "foreground" },
    { x: 310, y: 296, texto: "3 NADH · 1 FADH₂ · 1 GTP", tam: 11, color: "muted-foreground" },
    { x: 310, y: 314, texto: "2 CO₂", tam: 11, color: "muted-foreground" },
  ],
  partes: [
    {
      id: "citrato-sintasa",
      nombre: "Citrato sintasa: la entrada",
      explicacion:
        "Une el acetil-CoA de dos carbonos con el oxalacetato de cuatro y forma citrato de seis. Aquí es donde el ciclo acepta combustible, venga de glucosa, de ácidos grasos o de aminoácidos: todos convergen en acetil-CoA.",
      trazos: [{ d: "M 310 108 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "primary", borde: "primary", grosor: 2 }],
      rotulo: { x: 200, y: 96, haciaX: 290, haciaY: 106 },
    },
    {
      id: "primera-descarboxilacion",
      nombre: "Primera descarboxilación (isocitrato deshidrogenasa)",
      explicacion:
        "Sale el primer CO₂ y se produce el primer NADH. Esta enzima es el principal punto de regulación del ciclo: la frena el NADH y el ATP, y la activa el ADP. El ciclo no corre a velocidad fija, corre según cuánta energía falte.",
      trazos: [{ d: "M 447 245 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "destructive", borde: "destructive", grosor: 2 }],
      rotulo: { x: 556, y: 232, haciaX: 466, haciaY: 242 },
    },
    {
      id: "segunda-descarboxilacion",
      nombre: "Segunda descarboxilación (α-cetoglutarato deshidrogenasa)",
      explicacion:
        "Sale el segundo CO₂ y el segundo NADH. Con estas dos salidas el ciclo ya ha liberado tantos carbonos como entraron, y ese es el detalle que suele perderse: los carbonos que salen como CO₂ no son los mismos que acaban de entrar con el acetil-CoA.",
      trazos: [{ d: "M 430 345 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "destructive", borde: "destructive", grosor: 2 }],
      rotulo: { x: 540, y: 356, haciaX: 448, haciaY: 348 },
    },
    {
      id: "fosforilacion-a-nivel-sustrato",
      nombre: "El único ATP directo del ciclo",
      explicacion:
        "El paso de succinil-CoA a succinato produce GTP —o ATP, según el tejido— sin pasar por la cadena respiratoria. Es el único de todo el ciclo que rinde energía directamente; el resto la entrega en forma de electrones.",
      trazos: [{ d: "M 372 425 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "success", borde: "success", grosor: 2 }],
      rotulo: { x: 470, y: 470, haciaX: 388, haciaY: 438 },
    },
    {
      id: "succinato-deshidrogenasa",
      nombre: "Succinato deshidrogenasa: el paso que está en la membrana",
      explicacion:
        "Es la única enzima del ciclo anclada a la membrana mitocondrial interna, y también forma parte de la cadena respiratoria como complejo II. Por eso produce FADH₂ en vez de NADH, y por eso sus electrones entran a la cadena más adelante y rinden menos ATP.",
      trazos: [{ d: "M 232 428 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "accent", borde: "accent", grosor: 2 }],
      rotulo: { x: 132, y: 470, haciaX: 218, haciaY: 440 },
    },
    {
      id: "regeneracion",
      nombre: "Regeneración del oxalacetato",
      explicacion:
        "Los últimos pasos devuelven el oxalacetato para que pueda aceptar otro acetil-CoA, y de ahí que sea un ciclo y no una cadena. Si el oxalacetato se retira para fabricar glucosa, el ciclo se frena aunque haya acetil-CoA de sobra: es lo que ocurre en el ayuno y lo que empuja hacia los cuerpos cetónicos.",
      trazos: [{ d: "M 172 245 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0", relleno: "primary", borde: "primary", grosor: 2 }],
      rotulo: { x: 64, y: 232, haciaX: 154, haciaY: 242 },
    },
  ],
  advertencia:
    "Esquema del orden del ciclo y del rendimiento por vuelta, no de las estructuras químicas. Recuerda que por cada glucosa el ciclo da dos vueltas, porque la glucólisis produce dos piruvatos.",
  referencias: [
    { libro: "guyton", donde: "cap. 68, Metabolismo de los hidratos de carbono y formación del ATP" },
    { libro: "lippincott", donde: "capítulo del ciclo de los ácidos tricarboxílicos" },
  ],
};

/* ------------------------------------------------------------------ */

const CADENA_RESPIRATORIA: Figura = {
  slug: "cadena-respiratoria",
  titulo: "Cadena respiratoria y ATP sintasa en la membrana interna",
  viewBox: "0 0 700 420",
  fondo: [
    { d: "M 40 150 H 660", borde: "border", grosor: 2 },
    { d: "M 40 230 H 660", borde: "border", grosor: 2 },
  ],
  textos: [
    { x: 350, y: 40, texto: "ESPACIO INTERMEMBRANA  ·  se acumulan H⁺", tam: 11, negrita: true, color: "accent" },
    { x: 350, y: 196, texto: "membrana mitocondrial interna", tam: 10, color: "muted-foreground" },
    { x: 350, y: 400, texto: "MATRIZ  ·  aquí ocurre el ciclo de Krebs", tam: 11, negrita: true, color: "primary" },
    { x: 120, y: 300, texto: "NADH → NAD⁺", tam: 11, color: "foreground" },
    { x: 258, y: 300, texto: "FADH₂ → FAD", tam: 11, color: "foreground" },
    { x: 470, y: 300, texto: "½O₂ + 2H⁺ → H₂O", tam: 11, color: "foreground" },
    { x: 600, y: 330, texto: "ADP + Pi → ATP", tam: 11, negrita: true, color: "success" },
  ],
  partes: [
    {
      id: "complejo-i",
      nombre: "Complejo I",
      explicacion:
        "Recoge los electrones del NADH y bombea protones a través de la membrana. Es la puerta de entrada de la mayor parte de los electrones que llegan del ciclo de Krebs.",
      trazos: [{ d: "M 90 145 h 70 v 90 h -70 Z", relleno: "primary", borde: "primary", grosor: 2 }],
      rotulo: { x: 125, y: 110, haciaX: 125, haciaY: 143 },
    },
    {
      id: "complejo-ii",
      nombre: "Complejo II",
      explicacion:
        "Es la succinato deshidrogenasa del ciclo de Krebs vista desde la membrana. Entrega los electrones del FADH₂, pero **no bombea protones**: por eso el FADH₂ rinde menos ATP que el NADH, y no porque lleve menos electrones.",
      trazos: [{ d: "M 225 152 h 66 v 78 h -66 Z", relleno: "accent", borde: "accent", grosor: 2 }],
      rotulo: { x: 258, y: 110, haciaX: 258, haciaY: 150 },
    },
    {
      id: "complejo-iii",
      nombre: "Complejo III",
      explicacion:
        "Recibe los electrones de la coenzima Q y los pasa al citocromo c, bombeando protones en el proceso. Es un punto de paso obligado para los electrones que vienen tanto del complejo I como del II.",
      trazos: [{ d: "M 345 145 h 66 v 90 h -66 Z", relleno: "primary", borde: "primary", grosor: 2 }],
      rotulo: { x: 378, y: 110, haciaX: 378, haciaY: 143 },
    },
    {
      id: "complejo-iv",
      nombre: "Complejo IV",
      explicacion:
        "Entrega los electrones al oxígeno, que se reduce a agua. Aquí está la razón de que sin oxígeno se pare todo: si nadie recoge los electrones al final, la cadena se llena y ningún complejo puede seguir bombeando.",
      trazos: [{ d: "M 462 145 h 66 v 90 h -66 Z", relleno: "primary", borde: "primary", grosor: 2 }],
      rotulo: { x: 495, y: 110, haciaX: 495, haciaY: 143 },
    },
    {
      id: "gradiente",
      nombre: "Gradiente de protones",
      explicacion:
        "Lo que la cadena fabrica no es ATP sino un desequilibrio: más protones fuera que dentro. Ese gradiente es una forma de energía almacenada, y es lo que conecta la oxidación con la síntesis de ATP sin que las dos reacciones se toquen.",
      trazos: [
        { d: "M 125 138 V 96", borde: "accent", grosor: 2 },
        { d: "M 378 138 V 96", borde: "accent", grosor: 2 },
        { d: "M 495 138 V 96", borde: "accent", grosor: 2 },
      ],
      rotulo: { x: 60, y: 70, haciaX: 116, haciaY: 100 },
    },
    {
      id: "atp-sintasa",
      nombre: "ATP sintasa",
      explicacion:
        "Deja volver a los protones hacia la matriz y aprovecha ese paso para unir ADP y fosfato. No forma parte de la cadena de electrones: es el motor que cobra el gradiente que la cadena creó, y por eso las dos cosas pueden desacoplarse.",
      trazos: [
        { d: "M 590 128 h 44 v 108 h -44 Z", relleno: "success", borde: "success", grosor: 2 },
        { d: "M 612 236 v 46", borde: "success", grosor: 4 },
        { d: "M 590 282 h 44", borde: "success", grosor: 4 },
      ],
      rotulo: { x: 612, y: 92, haciaX: 612, haciaY: 126 },
    },
  ],
  advertencia:
    "Esquema del orden de los complejos y del sentido del flujo de protones. No representa la estructura molecular, ni la coenzima Q y el citocromo c como transportadores móviles, ni la estequiometría exacta de protones por complejo.",
  referencias: [
    { libro: "guyton", donde: "cap. 68, formación de ATP; y cap. 73, Energética y metabolismo" },
    { libro: "lehninger", donde: "capítulo de fosforilación oxidativa" },
  ],
};

/* ------------------------------------------------------------------ */

const POTENCIAL_ACCION: Figura = {
  slug: "potencial-de-accion",
  titulo: "Potencial de acción: la curva y qué canal manda en cada tramo",
  viewBox: "0 0 680 420",
  fondo: [
    { d: "M 80 40 V 340", borde: "border", grosor: 1.5 },
    { d: "M 80 340 H 640", borde: "border", grosor: 1.5 },
    { d: "M 80 250 H 640", borde: "border", grosor: 1, discontinuo: true },
    { d: "M 80 120 H 640", borde: "border", grosor: 1, discontinuo: true },
  ],
  textos: [
    { x: 70, y: 124, texto: "+30", tam: 11, anclaje: "end" },
    { x: 70, y: 254, texto: "−55", tam: 11, anclaje: "end" },
    { x: 70, y: 300, texto: "−70", tam: 11, anclaje: "end" },
    { x: 40, y: 190, texto: "mV", tam: 11, anclaje: "middle", negrita: true },
    { x: 620, y: 362, texto: "tiempo", tam: 11 },
    { x: 260, y: 268, texto: "umbral", tam: 10, color: "destructive" },
  ],
  partes: [
    {
      id: "reposo",
      nombre: "Reposo",
      explicacion:
        "La membrana se mantiene alrededor de −70 mV porque es mucho más permeable al potasio que al sodio, y porque la bomba de sodio y potasio sostiene el desequilibrio de fondo. Nada de esto es pasivo: mantener el reposo cuesta energía continuamente.",
      trazos: [{ d: "M 90 300 H 210", borde: "muted-foreground", grosor: 3 }],
      rotulo: { x: 140, y: 336, haciaX: 150, haciaY: 304 },
    },
    {
      id: "despolarizacion",
      nombre: "Despolarización",
      explicacion:
        "Al alcanzarse el umbral se abren de golpe los canales de sodio dependientes de voltaje y el sodio entra a favor de su gradiente. Cuanto más entra, más se despolariza la membrana y más canales se abren: es el único tramo del proceso que se amplifica a sí mismo, y por eso es todo o nada.",
      trazos: [{ d: "M 210 300 C 240 300, 250 160, 272 118", borde: "destructive", grosor: 3.5 }],
      rotulo: { x: 196, y: 172, haciaX: 244, haciaY: 208 },
    },
    {
      id: "pico",
      nombre: "Pico e inactivación del sodio",
      explicacion:
        "Cerca de +30 mV los canales de sodio se inactivan, que no es lo mismo que cerrarse: quedan bloqueados y no pueden reabrirse hasta que la membrana se repolarice. Esa inactivación es la que crea el período refractario y la que impide que el impulso vuelva hacia atrás.",
      trazos: [{ d: "M 272 118 C 284 108, 300 110, 312 126", borde: "destructive", grosor: 3.5 }],
      rotulo: { x: 292, y: 74, haciaX: 292, haciaY: 110 },
    },
    {
      id: "repolarizacion",
      nombre: "Repolarización",
      explicacion:
        "Los canales de potasio, más lentos, terminan de abrirse justo cuando los de sodio se inactivan. El potasio sale y la membrana vuelve hacia valores negativos. El retraso de estos canales es lo que da al potencial de acción su forma de pico y no de meseta.",
      trazos: [{ d: "M 312 126 C 330 160, 348 268, 372 306", borde: "primary", grosor: 3.5 }],
      rotulo: { x: 410, y: 172, haciaX: 350, haciaY: 226 },
    },
    {
      id: "hiperpolarizacion",
      nombre: "Hiperpolarización posterior",
      explicacion:
        "Los canales de potasio tardan en cerrarse y la membrana se pasa de largo, quedando más negativa que en reposo. Durante ese tramo hace falta un estímulo mayor de lo normal para disparar otra vez: es el período refractario relativo.",
      trazos: [{ d: "M 372 306 C 396 322, 420 322, 460 302", borde: "primary", grosor: 3.5 }],
      rotulo: { x: 420, y: 366, haciaX: 414, haciaY: 320 },
    },
    {
      id: "refractario",
      nombre: "Período refractario absoluto",
      explicacion:
        "Mientras los canales de sodio están inactivados, ningún estímulo consigue disparar otro potencial de acción, por intenso que sea. Esto fija la frecuencia máxima a la que una célula puede disparar y, en el corazón, es lo que impide que el músculo entre en tetania.",
      trazos: [{ d: "M 214 62 H 340", borde: "accent", grosor: 3 }],
      rotulo: { x: 158, y: 62, haciaX: 208, haciaY: 62 },
    },
    {
      id: "subumbral",
      nombre: "Estímulo por debajo del umbral",
      explicacion:
        "Un estímulo que no llega al umbral produce una desviación local que se apaga sola, sin disparar nada. Esa es la diferencia entre una señal graduada y un potencial de acción: la primera puede ser de cualquier tamaño, el segundo o es completo o no existe.",
      trazos: [{ d: "M 500 300 C 516 290, 526 288, 540 300", borde: "muted-foreground", grosor: 2.5 }],
      rotulo: { x: 566, y: 268, haciaX: 534, haciaY: 292 },
    },
  ],
  advertencia:
    "Esquema de la forma de la curva y de qué canal domina en cada tramo. Los valores de los ejes son los de una neurona típica y varían entre tejidos; el potencial de acción cardíaco, por ejemplo, tiene una meseta que aquí no aparece.",
  referencias: [
    { libro: "guyton", donde: "cap. 5, Potenciales de membrana y potenciales de acción" },
    { libro: "ganong", donde: "sección de fisiología celular y neurofisiología" },
  ],
};

/* ------------------------------------------------------------------ */

const GLUCONEOGENESIS: Figura = {
  slug: "gluconeogenesis",
  titulo: "Gluconeogénesis: los tres rodeos que la separan de la glucólisis",
  viewBox: "0 0 660 600",
  fondo: [
    { d: "M 330 40 V 560", borde: "border", grosor: 1, discontinuo: true },
    { d: "M 175 70 V 530", borde: "destructive", grosor: 2 },
    { d: "M 485 530 V 70", borde: "success", grosor: 2 },
  ],
  textos: [
    { x: 175, y: 34, texto: "GLUCÓLISIS", tam: 11, negrita: true, color: "destructive" },
    { x: 175, y: 50, texto: "glucosa → piruvato", tam: 10, color: "muted-foreground" },
    { x: 485, y: 34, texto: "GLUCONEOGÉNESIS", tam: 11, negrita: true, color: "success" },
    { x: 485, y: 50, texto: "piruvato → glucosa", tam: 10, color: "muted-foreground" },
    { x: 330, y: 90, texto: "Glucosa", negrita: true, color: "foreground" },
    { x: 330, y: 250, texto: "Fructosa-6-P", color: "foreground" },
    { x: 330, y: 300, texto: "Fructosa-1,6-bisP", tam: 11, color: "foreground" },
    { x: 330, y: 470, texto: "Fosfoenolpiruvato", tam: 11, color: "foreground" },
    { x: 330, y: 560, texto: "Piruvato", negrita: true, color: "foreground" },
    { x: 330, y: 380, texto: "7 pasos reversibles", tam: 10, color: "muted-foreground" },
    { x: 330, y: 396, texto: "compartidos por las dos vías", tam: 10, color: "muted-foreground" },
  ],
  partes: [
    {
      id: "rodeo-1",
      nombre: "Rodeo 1: glucosa-6-fosfatasa",
      explicacion:
        "La hexocinasa fosforiló la glucosa y ese paso no se puede deshacer, así que la vuelta necesita una enzima distinta que retire el fosfato. **Solo el hígado y el riñón tienen esta enzima**, y por eso solo ellos pueden liberar glucosa a la sangre. El músculo almacena glucógeno pero no puede compartirlo: le falta este paso.",
      trazos: [
        { d: "M 430 120 h 110 v 44 h -110 Z", relleno: "success", borde: "success", grosor: 2 },
      ],
      rotulo: { x: 596, y: 108, haciaX: 540, haciaY: 130 },
    },
    {
      id: "rodeo-2",
      nombre: "Rodeo 2: fructosa-1,6-bisfosfatasa",
      explicacion:
        "Deshace lo que hizo la fosfofructocinasa-1, y es el punto de control principal de la gluconeogénesis igual que aquella lo era de la glucólisis. Las dos enzimas responden en sentidos opuestos a las mismas señales, de modo que cuando una se activa la otra se apaga y la célula nunca corre las dos vías a la vez.",
      trazos: [
        { d: "M 430 272 h 110 v 44 h -110 Z", relleno: "success", borde: "success", grosor: 2 },
      ],
      rotulo: { x: 596, y: 262, haciaX: 540, haciaY: 282 },
    },
    {
      id: "rodeo-3",
      nombre: "Rodeo 3: dos enzimas y un desvío por la mitocondria",
      explicacion:
        "Volver de piruvato a fosfoenolpiruvato cuesta dos reacciones y dos enlaces de alta energía. La piruvato carboxilasa lo convierte primero en oxalacetato **dentro de la mitocondria** y necesita biotina; después la fosfoenolpiruvato carboxicinasa lo transforma en fosfoenolpiruvato. Es el paso más caro de toda la vía.",
      trazos: [
        { d: "M 430 480 h 110 v 44 h -110 Z", relleno: "success", borde: "success", grosor: 2 },
        { d: "M 430 430 h 110 v 40 h -110 Z", relleno: "primary", borde: "primary", grosor: 2 },
      ],
      rotulo: { x: 596, y: 502, haciaX: 540, haciaY: 502 },
    },
    {
      id: "pasos-irreversibles",
      nombre: "Los tres pasos que la glucólisis no puede desandar",
      explicacion:
        "Hexocinasa, fosfofructocinasa-1 y piruvato cinasa. Son irreversibles y por eso la gluconeogénesis no es la glucólisis al revés. Si lo fuera, las dos vías compartirían enzimas, cualquier señal activaría ambas y la célula solo conseguiría gastar ATP dando vueltas sin producir nada: eso se llama ciclo fútil.",
      trazos: [
        { d: "M 120 120 h 110 v 44 h -110 Z", relleno: "destructive", borde: "destructive", grosor: 2 },
        { d: "M 120 272 h 110 v 44 h -110 Z", relleno: "destructive", borde: "destructive", grosor: 2 },
        { d: "M 120 480 h 110 v 44 h -110 Z", relleno: "destructive", borde: "destructive", grosor: 2 },
      ],
      rotulo: { x: 64, y: 300, haciaX: 114, haciaY: 294 },
    },
    {
      id: "coste",
      nombre: "El coste: seis enlaces de alta energía",
      explicacion:
        "Fabricar una glucosa desde dos piruvatos consume cuatro ATP y dos GTP, mientras que la glucólisis solo había rendido dos ATP netos. Volver atrás cuesta bastante más que lo que se ganó al bajar, y esa asimetría es la razón de que el organismo solo fabrique glucosa cuando de verdad hace falta.",
      trazos: [{ d: "M 250 570 h 160 v 26 h -160 Z", relleno: "accent", borde: "accent", grosor: 1.5 }],
      rotulo: { x: 140, y: 583, haciaX: 244, haciaY: 583 },
    },
  ],
  advertencia:
    "Esquema de la relación entre las dos vías y de dónde están los rodeos, no de todos los intermediarios ni de la compartimentación completa. El paso por oxalacetato mitocondrial se muestra simplificado.",
  referencias: [
    { libro: "guyton", donde: "cap. 68, formación de hidratos de carbono a partir de proteínas y grasas" },
    { libro: "lippincott", donde: "capítulo de gluconeogénesis" },
  ],
};

/* ------------------------------------------------------------------ */

const BETA_OXIDACION: Figura = {
  slug: "beta-oxidacion",
  titulo: "Beta-oxidación: una vuelta, dos carbonos menos",
  viewBox: "0 0 660 540",
  fondo: [
    { d: "M 40 150 H 620", borde: "border", grosor: 2 },
    { d: "M 40 176 H 620", borde: "border", grosor: 2 },
    { d: "M 300 200 V 240", borde: "muted-foreground" },
    { d: "M 300 292 V 330", borde: "muted-foreground" },
    { d: "M 300 382 V 420", borde: "muted-foreground" },
  ],
  textos: [
    { x: 330, y: 40, texto: "CITOSOL", tam: 11, negrita: true, color: "muted-foreground" },
    { x: 330, y: 70, texto: "Ácido graso → acil-CoA", color: "foreground" },
    { x: 330, y: 166, texto: "membrana mitocondrial interna", tam: 10, color: "muted-foreground" },
    { x: 330, y: 216, texto: "Acil-CoA (n carbonos)", negrita: true, color: "foreground" },
    { x: 330, y: 268, texto: "Enoil-CoA", color: "foreground" },
    { x: 330, y: 358, texto: "3-hidroxiacil-CoA", color: "foreground" },
    { x: 330, y: 446, texto: "3-cetoacil-CoA", color: "foreground" },
    { x: 610, y: 500, texto: "MATRIZ", tam: 11, negrita: true, color: "primary", anclaje: "end" },
  ],
  partes: [
    {
      id: "lanzadera-carnitina",
      nombre: "Lanzadera de carnitina",
      explicacion:
        "Los ácidos grasos de cadena larga no atraviesan la membrana mitocondrial interna por sí solos: necesitan unirse a carnitina para entrar. Es el paso limitante de toda la vía y su punto de control, y lo inhibe el malonil-CoA, que es la señal de que la célula está fabricando grasa en vez de quemarla. Las dos cosas no ocurren a la vez.",
      trazos: [{ d: "M 268 140 h 64 v 46 h -64 Z", relleno: "accent", borde: "accent", grosor: 2 }],
      rotulo: { x: 180, y: 120, haciaX: 268, haciaY: 152 },
    },
    {
      id: "paso-1",
      nombre: "1. Oxidación → FADH₂",
      explicacion:
        "Se forma un doble enlace entre los carbonos alfa y beta, y los electrones retirados cargan un FAD. Es la primera de las dos oxidaciones de cada vuelta, y por eso cada ciclo entrega un FADH₂.",
      trazos: [{ d: "M 350 222 h 130 v 14 h -130 Z", relleno: "primary", borde: "primary", grosor: 1.5 }],
      rotulo: { x: 528, y: 229, haciaX: 484, haciaY: 229 },
    },
    {
      id: "paso-2",
      nombre: "2. Hidratación",
      explicacion:
        "Se añade agua al doble enlace y aparece un grupo hidroxilo en el carbono beta. No produce ni consume transportadores de electrones: prepara la molécula para la oxidación siguiente.",
      trazos: [{ d: "M 350 300 h 130 v 14 h -130 Z", relleno: "muted", borde: "muted-foreground", grosor: 1.5 }],
      rotulo: { x: 528, y: 307, haciaX: 484, haciaY: 307 },
    },
    {
      id: "paso-3",
      nombre: "3. Oxidación → NADH",
      explicacion:
        "El hidroxilo del carbono beta se oxida a cetona y los electrones cargan un NAD⁺. De ahí viene el nombre de la vía: la acción ocurre sobre el carbono beta, el segundo contando desde el grupo carboxilo.",
      trazos: [{ d: "M 350 390 h 130 v 14 h -130 Z", relleno: "primary", borde: "primary", grosor: 1.5 }],
      rotulo: { x: 528, y: 397, haciaX: 484, haciaY: 397 },
    },
    {
      id: "paso-4",
      nombre: "4. Tiólisis → acetil-CoA",
      explicacion:
        "Se corta la cadena y se libera un acetil-CoA de dos carbonos, dejando un acil-CoA dos carbonos más corto que vuelve a entrar al ciclo. La vía no termina hasta que la cadena se agota, y de ahí que un ácido graso largo rinda tanto: repite la vuelta muchas veces.",
      trazos: [{ d: "M 350 466 h 130 v 14 h -130 Z", relleno: "success", borde: "success", grosor: 2 }],
      rotulo: { x: 528, y: 473, haciaX: 484, haciaY: 473 },
    },
    {
      id: "vuelta",
      nombre: "El acil-CoA acortado vuelve a empezar",
      explicacion:
        "Cada vuelta rinde un FADH₂, un NADH y un acetil-CoA, y devuelve una cadena dos carbonos más corta. Por eso el rendimiento de una grasa es tan alto comparado con el de la glucosa: no es que cada paso rinda más, es que hay muchas más vueltas.",
      trazos: [{ d: "M 240 473 H 160 V 216 h 60", borde: "success", grosor: 2.5 }],
      rotulo: { x: 116, y: 340, haciaX: 158, haciaY: 340 },
    },
  ],
  advertencia:
    "Esquema del orden de los cuatro pasos y de su rendimiento por vuelta. No representa las estructuras químicas, ni el manejo de los ácidos grasos insaturados y de cadena impar, que requieren enzimas adicionales.",
  referencias: [
    { libro: "guyton", donde: "cap. 69, Metabolismo de los lípidos" },
    { libro: "lippincott", donde: "capítulo de metabolismo de los ácidos grasos" },
  ],
};

/* ------------------------------------------------------------------ */

const CETOGENESIS: Figura = {
  slug: "cetogenesis",
  titulo: "Por qué el ayuno produce cuerpos cetónicos",
  viewBox: "0 0 700 480",
  fondo: [
    { d: "M 30 60 h 330 v 380 h -330 Z", borde: "border", grosor: 1.5 },
    { d: "M 420 190 h 250 v 110 h -250 Z", borde: "border", grosor: 1.5 },
  ],
  textos: [
    { x: 195, y: 44, texto: "HÍGADO", tam: 12, negrita: true, color: "primary" },
    { x: 545, y: 174, texto: "CEREBRO Y MÚSCULO", tam: 12, negrita: true, color: "accent" },
    { x: 545, y: 232, texto: "Usan cuerpos cetónicos", tam: 11, color: "foreground" },
    { x: 545, y: 252, texto: "como combustible cuando", tam: 11, color: "foreground" },
    { x: 545, y: 272, texto: "escasea la glucosa", tam: 11, color: "foreground" },
    { x: 120, y: 112, texto: "Grasa movilizada", tam: 11, color: "muted-foreground" },
    { x: 120, y: 200, texto: "Acetil-CoA", negrita: true, color: "foreground" },
    { x: 285, y: 200, texto: "Oxalacetato", color: "foreground" },
    { x: 285, y: 300, texto: "GLUCOSA", tam: 11, negrita: true, color: "success" },
    { x: 120, y: 396, texto: "Cuerpos cetónicos", tam: 11, negrita: true, color: "accent" },
  ],
  partes: [
    {
      id: "lipolisis",
      nombre: "La grasa se moviliza y llega acetil-CoA de sobra",
      explicacion:
        "En el ayuno cae la insulina y sube el glucagón, así que el tejido adiposo libera ácidos grasos y el hígado los degrada por beta-oxidación. El resultado es acetil-CoA en abundancia, mucho más del que el ciclo de Krebs va a poder procesar.",
      trazos: [{ d: "M 120 124 V 182", borde: "accent", grosor: 3 }],
      rotulo: { x: 62, y: 152, haciaX: 112, haciaY: 152 },
    },
    {
      id: "oxalacetato-desviado",
      nombre: "El oxalacetato se desvía a fabricar glucosa",
      explicacion:
        "Aquí está el nudo del tema. El hígado necesita mantener la glucemia, así que retira oxalacetato del ciclo de Krebs para alimentar la gluconeogénesis. Es la misma molécula que hace falta para que el acetil-CoA pueda entrar al ciclo, de modo que las dos demandas compiten.",
      trazos: [{ d: "M 285 214 V 284", borde: "success", grosor: 3 }],
      rotulo: { x: 340, y: 250, haciaX: 297, haciaY: 250 },
    },
    {
      id: "krebs-frenado",
      nombre: "Sin aceptor, el ciclo de Krebs se frena",
      explicacion:
        "El acetil-CoA solo entra al ciclo condensándose con oxalacetato. Con poco oxalacetato disponible, el acetil-CoA se acumula por muy abundante que sea: lo que limita no es el combustible sino el aceptor. Tampoco puede convertirse en glucosa, porque el paso de piruvato a acetil-CoA es irreversible.",
      trazos: [
        { d: "M 152 200 H 246", borde: "muted-foreground", grosor: 2, discontinuo: true },
        { d: "M 186 184 L 212 216 M 212 184 L 186 216", borde: "destructive", grosor: 3 },
      ],
      rotulo: { x: 199, y: 148, haciaX: 199, haciaY: 178 },
    },
    {
      id: "cetogenesis",
      nombre: "El hígado convierte el exceso en cuerpos cetónicos",
      explicacion:
        "Ante un acetil-CoA que no puede quemar ni convertir en glucosa, el hígado lo transforma en acetoacetato y beta-hidroxibutirato. Son hidrosolubles, viajan por la sangre sin transportador y atraviesan la barrera hematoencefálica, cosa que los ácidos grasos no hacen.",
      trazos: [{ d: "M 120 214 V 380", borde: "accent", grosor: 3 }],
      rotulo: { x: 62, y: 300, haciaX: 112, haciaY: 300 },
    },
    {
      id: "exportacion",
      nombre: "El hígado los fabrica pero no los usa",
      explicacion:
        "Al hepatocito le falta la enzima que reactiva el acetoacetato, así que no puede consumir lo que produce. Eso no es un defecto: garantiza que todo lo fabricado se exporte a los tejidos que lo necesitan, sobre todo al cerebro, que no puede usar ácidos grasos.",
      trazos: [{ d: "M 200 396 H 545 V 316", borde: "accent", grosor: 3 }],
      rotulo: { x: 620, y: 396, haciaX: 545, haciaY: 380 },
    },
  ],
  advertencia:
    "Esquema del mecanismo fisiológico del ayuno. No representa el cuadro patológico que aparece cuando la producción se descontrola, que tiene causas y consecuencias distintas y se estudia aparte.",
  referencias: [
    { libro: "guyton", donde: "cap. 69, Metabolismo de los lípidos; y cap. 72, obesidad y ayuno" },
    { libro: "lippincott", donde: "capítulo de cuerpos cetónicos" },
  ],
};

/* ------------------------------------------------------------------ */

const CICLO_UREA: Figura = {
  slug: "ciclo-de-la-urea",
  titulo: "Ciclo de la urea: a caballo entre la mitocondria y el citosol",
  viewBox: "0 0 660 520",
  fondo: [
    { d: "M 60 60 h 540 v 180 h -540 Z", borde: "border", grosor: 1.5 },
    { d: "M 60 240 h 540 v 220 h -540 Z", borde: "border", grosor: 1, discontinuo: true },
  ],
  textos: [
    { x: 330, y: 44, texto: "MATRIZ MITOCONDRIAL", tam: 11, negrita: true, color: "primary" },
    { x: 330, y: 484, texto: "CITOSOL", tam: 11, negrita: true, color: "muted-foreground" },
    { x: 140, y: 120, texto: "NH₄⁺ + CO₂", negrita: true, color: "destructive" },
    { x: 330, y: 120, texto: "Carbamoil fosfato", tam: 11, color: "foreground" },
    { x: 520, y: 120, texto: "Citrulina", color: "foreground" },
    { x: 520, y: 300, texto: "Argininosuccinato", tam: 11, color: "foreground" },
    { x: 520, y: 400, texto: "Arginina", color: "foreground" },
    { x: 200, y: 400, texto: "Ornitina", color: "foreground" },
    { x: 200, y: 320, texto: "UREA", negrita: true, tam: 13, color: "success" },
    { x: 330, y: 258, texto: "la citrulina sale · la ornitina entra", tam: 10, color: "muted-foreground" },
  ],
  partes: [
    {
      id: "cps1",
      nombre: "Carbamoil fosfato sintetasa I: la puerta y el freno",
      explicacion:
        "Fija el amonio libre con CO₂ y gasta dos ATP en hacerlo. Es el paso limitante del ciclo y solo funciona en presencia de N-acetilglutamato, que actúa como señal de que hay muchos aminoácidos que degradar. Su déficit hereditario es una de las causas de acumulación de amonio en el recién nacido.",
      trazos: [{ d: "M 196 108 h 66 v 24 h -66 Z", relleno: "destructive", borde: "destructive", grosor: 2 }],
      rotulo: { x: 229, y: 76, haciaX: 229, haciaY: 106 },
    },
    {
      id: "reparto",
      nombre: "Los dos nitrógenos vienen de sitios distintos",
      explicacion:
        "Uno entra como amonio libre en la mitocondria, y el otro lo aporta el aspartato ya en el citosol. Que la urea lleve dos nitrógenos de procedencia distinta es lo que conecta este ciclo con la transaminación, que es de donde sale el aspartato.",
      trazos: [{ d: "M 596 300 h 30 V 180 h -30", borde: "accent", grosor: 2.5 }],
      rotulo: { x: 626, y: 232, haciaX: 610, haciaY: 240 },
    },
    {
      id: "membrana",
      nombre: "El ciclo cruza la membrana dos veces",
      explicacion:
        "Los dos primeros pasos ocurren en la matriz mitocondrial y el resto en el citosol, así que la citrulina tiene que salir y la ornitina volver a entrar. Es de los pocos ciclos metabólicos repartidos entre dos compartimentos, y esa partición aparece en muchas preguntas.",
      trazos: [{ d: "M 60 240 H 600", borde: "primary", grosor: 3 }],
      rotulo: { x: 92, y: 212, haciaX: 92, haciaY: 238 },
    },
    {
      id: "arginasa",
      nombre: "Arginasa: donde nace la urea",
      explicacion:
        "Corta la arginina y libera urea y ornitina. La ornitina vuelve a la mitocondria y el ciclo puede empezar otra vez, igual que el oxalacetato en el ciclo de Krebs: es el transportador que se recupera, no un sustrato que se gasta.",
      trazos: [{ d: "M 268 388 h 66 v 24 h -66 Z", relleno: "success", borde: "success", grosor: 2 }],
      rotulo: { x: 301, y: 448, haciaX: 301, haciaY: 414 },
    },
    {
      id: "amonio",
      nombre: "Por qué importa: el amonio es neurotóxico",
      explicacion:
        "El amonio libre atraviesa la barrera hematoencefálica y altera el funcionamiento del sistema nervioso. Convertirlo en urea, que es atóxica e hidrosoluble, es lo que permite excretarlo por el riñón. Si el hígado falla o falta una enzima del ciclo, el amonio se acumula y aparece afectación neurológica.",
      trazos: [{ d: "M 108 108 h 70 v 24 h -70 Z", relleno: "destructive", borde: "destructive", grosor: 2 }],
      rotulo: { x: 84, y: 168, haciaX: 120, haciaY: 136 },
    },
  ],
  advertencia:
    "Esquema del recorrido y de la compartimentación, no de las estructuras ni del balance energético completo. Los transportadores de membrana concretos que mueven citrulina y ornitina no se representan.",
  referencias: [
    { libro: "guyton", donde: "cap. 70, Metabolismo de las proteínas; y cap. 71, El hígado como órgano" },
    { libro: "lippincott", donde: "capítulo de eliminación del nitrógeno de los aminoácidos" },
  ],
};

/* ------------------------------------------------------------------ */

const CINETICA: Figura = {
  slug: "cinetica-enzimatica",
  titulo: "Cinética enzimática: qué mueve cada tipo de inhibidor",
  viewBox: "0 0 660 420",
  fondo: [
    { d: "M 90 50 V 350", borde: "border", grosor: 1.5 },
    { d: "M 90 350 H 620", borde: "border", grosor: 1.5 },
    { d: "M 90 96 H 620", borde: "border", grosor: 1, discontinuo: true },
    { d: "M 90 223 H 400", borde: "border", grosor: 1, discontinuo: true },
  ],
  textos: [
    { x: 80, y: 100, texto: "Vmáx", tam: 11, anclaje: "end", negrita: true },
    { x: 80, y: 227, texto: "Vmáx/2", tam: 11, anclaje: "end" },
    { x: 46, y: 200, texto: "velocidad", tam: 11, anclaje: "middle" },
    { x: 560, y: 378, texto: "[sustrato]", tam: 11 },
    { x: 165, y: 372, texto: "Km", tam: 11, negrita: true, color: "primary" },
  ],
  partes: [
    {
      id: "curva-normal",
      nombre: "La curva sin inhibidor",
      explicacion:
        "Al principio la velocidad sube casi en proporción al sustrato, porque hay enzima libre de sobra. Después se aplana: con toda la enzima ocupada, añadir más sustrato ya no acelera nada. Esa saturación es lo que distingue una reacción enzimática de una química corriente.",
      trazos: [{ d: "M 90 350 C 150 190, 250 118, 610 100", borde: "primary", grosor: 3 }],
      rotulo: { x: 330, y: 132, haciaX: 330, haciaY: 112 },
    },
    {
      id: "vmax",
      nombre: "Vmáx: velocidad máxima",
      explicacion:
        "La velocidad a la que se acerca la curva cuando toda la enzima está saturada. Depende de cuánta enzima haya y de lo rápido que trabaje cada molécula, no de la afinidad. Nunca se alcanza del todo: es una asíntota.",
      trazos: [{ d: "M 430 90 h 180", borde: "primary", grosor: 3 }],
      rotulo: { x: 620, y: 68, haciaX: 560, haciaY: 88 },
    },
    {
      id: "km",
      nombre: "Km: la concentración que da media velocidad",
      explicacion:
        "Es la concentración de sustrato a la que la enzima trabaja a la mitad de su Vmáx, y se usa como medida inversa de afinidad: **Km bajo significa afinidad alta**, porque basta poco sustrato para llegar a media velocidad. Es la relación que más se invierte al estudiarla.",
      trazos: [{ d: "M 165 350 V 223", borde: "primary", grosor: 3 }],
      rotulo: { x: 232, y: 262, haciaX: 176, haciaY: 262 },
    },
    {
      id: "competitiva",
      nombre: "Inhibición competitiva: sube el Km, la Vmáx no cambia",
      explicacion:
        "El inhibidor se parece al sustrato y compite por el mismo sitio activo. Hace falta más sustrato para llegar a media velocidad, así que el Km aparente sube. Pero con sustrato suficiente el inhibidor queda desplazado y la Vmáx se alcanza igual: **la competitiva se puede vencer subiendo el sustrato**.",
      trazos: [{ d: "M 90 350 C 190 245, 330 140, 610 104", borde: "accent", grosor: 3 }],
      rotulo: { x: 452, y: 176, haciaX: 452, haciaY: 128 },
    },
    {
      id: "no-competitiva",
      nombre: "Inhibición no competitiva: baja la Vmáx, el Km no cambia",
      explicacion:
        "El inhibidor se une en otro sitio y estropea la enzima la esté usando o no. Añadir sustrato no sirve de nada, porque no compiten por el mismo lugar: es como tener menos enzima. Por eso baja la Vmáx y la afinidad de la que queda funcionando sigue igual.",
      trazos: [{ d: "M 90 350 C 140 268, 230 218, 610 208", borde: "destructive", grosor: 3 }],
      rotulo: { x: 452, y: 246, haciaX: 452, haciaY: 212 },
    },
  ],
  advertencia:
    "Esquema cualitativo de la forma de las curvas y de qué parámetro mueve cada inhibidor. Los valores de los ejes son arbitrarios y no representan ninguna enzima concreta; tampoco se incluye la inhibición acompetitiva, que desplaza los dos parámetros a la vez.",
  referencias: [
    { libro: "lehninger", donde: "capítulo de enzimas y cinética enzimática" },
    { libro: "lippincott", donde: "capítulo de enzimas" },
  ],
};

export const FIGURAS: Figura[] = [
  GLUCONEOGENESIS, BETA_OXIDACION, CETOGENESIS, CICLO_UREA, CINETICA,
  SARCOMERO, CRANEO_LATERAL, GLUCOLISIS, KREBS, CADENA_RESPIRATORIA, POTENCIAL_ACCION,
];

export const getFigura = (slug: string) => FIGURAS.find((f) => f.slug === slug);

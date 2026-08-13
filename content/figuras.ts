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

export const FIGURAS: Figura[] = [
  SARCOMERO, CRANEO_LATERAL, GLUCOLISIS, KREBS, CADENA_RESPIRATORIA, POTENCIAL_ACCION,
];

export const getFigura = (slug: string) => FIGURAS.find((f) => f.slug === slug);

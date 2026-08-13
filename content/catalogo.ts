/**
 * Catálogo de temas de la carrera.
 *
 * El currículum lista 81 **unidades** —«Bioquímica», «Fisiología médica»—, y
 * nadie estudia a ese nivel. Se estudia «glucólisis», «ciclo de Krebs», «huesos
 * del cráneo». Este archivo es esa capa: los temas con el nombre por el que la
 * gente los busca.
 *
 * Una entrada de catálogo **no es un tema desarrollado**. Dice qué es el tema en
 * dos frases, a qué unidad pertenece y en qué capítulo de qué libro estudiarlo.
 * Cuando alguien escribe el tema completo en `temas.ts`, la entrada del catálogo
 * desaparece de la vista y la URL sigue siendo la misma: `/tema/<slug>`.
 *
 * ## Reglas para añadir entradas
 *
 * - **`que` describe, no enseña.** Dos frases correctas y verificables. Si hace
 *   falta más, es que ese tema pide un tema desarrollado, no una entrada mejor.
 * - **Las referencias se comprueban.** Capítulo y edición concretos, de un libro
 *   que alguien tenga delante. Una referencia inventada es peor que ninguna,
 *   porque manda al lector a buscar algo que no está.
 * - **Los sinónimos son los que la gente escribe**, incluidos los que llevan
 *   falta de ortografía o vienen del inglés. El buscador existe para encontrar,
 *   no para corregir.
 * - Nada de dosis ni de pautas de tratamiento, aquí tampoco.
 */

export type Libro =
  | "guyton"
  | "ganong"
  | "ross"
  | "robbins"
  | "lehninger"
  | "lippincott"
  | "alberts"
  | "katzung"
  | "netter"
  | "moore"
  | "langman"
  | "abbas"
  | "levinson"
  | "gordis";

export interface Referencia {
  libro: Libro;
  /** Capítulo o sección concreta. Se muestra tal cual. */
  donde: string;
}

export interface TemaCatalogo {
  slug: string;
  nombre: string;
  /** Cómo lo escribe la gente: variantes, siglas, nombres en inglés. */
  sinonimos?: string[];
  /** Clave de la unidad del currículum a la que pertenece. */
  unidad: string;
  /** Qué es, en dos frases. Descriptivo, no explicativo. */
  que: string;
  referencias: Referencia[];
  /** Otros temas del catálogo con los que se estudia junto. */
  vecinos?: string[];
  /** Slug de una figura de `figuras.ts`. Una entrada sin tema sí puede tener esquema. */
  figura?: string;
}

export const LIBROS: Record<Libro, { titulo: string; nota: string }> = {
  guyton: { titulo: "Guyton y Hall, Tratado de fisiología médica, 13.ª ed.", nota: "Fisiología. La narrativa más clara que existe." },
  ganong: { titulo: "Ganong, Fisiología médica", nota: "Fisiología, para consulta puntual." },
  ross: { titulo: "Ross, Histología: texto y atlas, 8.ª ed.", nota: "Histología, texto y atlas en el mismo libro." },
  robbins: { titulo: "Robbins y Cotran, Patología estructural y funcional", nota: "Patología. No hay sustituto." },
  lehninger: { titulo: "Lehninger, Principios de bioquímica (Nelson y Cox)", nota: "Bioquímica en profundidad." },
  lippincott: { titulo: "Lippincott Illustrated Reviews: Bioquímica", nota: "Bioquímica. La mejor relación aprendizaje por hora." },
  alberts: { titulo: "Alberts, Essential Cell Biology", nota: "Biología celular." },
  katzung: { titulo: "Katzung, Farmacología básica y clínica", nota: "Farmacología." },
  netter: { titulo: "Netter, Atlas de anatomía humana", nota: "Atlas ilustrado de anatomía." },
  moore: { titulo: "Moore, Anatomía con orientación clínica", nota: "Anatomía con el porqué clínico." },
  langman: { titulo: "Langman (Sadler), Embriología médica", nota: "Embriología, esquemática y corta." },
  abbas: { titulo: "Abbas, Inmunología celular y molecular", nota: "Inmunología." },
  levinson: { titulo: "Levinson, Microbiología médica e inmunología", nota: "Microbiología." },
  gordis: { titulo: "Gordis, Epidemiología", nota: "Epidemiología, sorprendentemente legible." },
};

/* ------------------------------------------------------------------ *
 * Bloque 1 · Nivel molecular (bioquímica y biología molecular)
 * ------------------------------------------------------------------ */

const MOLECULAR: TemaCatalogo[] = [
  {
    slug: "gluconeogenesis",
    nombre: "Gluconeogénesis",
    sinonimos: ["neoglucogenesis", "síntesis de glucosa"],
    unidad: "I8577",
    que: "Síntesis de glucosa a partir de precursores que no son hidratos de carbono —lactato, glicerol y aminoácidos glucogénicos—, sobre todo en el hígado. No es la glucólisis al revés: rodea sus tres pasos irreversibles con enzimas propias, y esa diferencia es lo que permite regular las dos direcciones por separado.",
    referencias: [
      { libro: "guyton", donde: "cap. 68, formación de hidratos de carbono a partir de proteínas y grasas" },
      { libro: "lippincott", donde: "capítulo de gluconeogénesis" },
    ],
    vecinos: ["glucolisis", "glucogenolisis", "ciclo-de-cori"],
  },
  {
    slug: "ciclo-de-cori",
    nombre: "Ciclo de Cori",
    sinonimos: ["ciclo del ácido láctico", "cori cycle"],
    unidad: "I8577",
    que: "El lactato que produce el músculo en anaerobiosis viaja al hígado, que lo reconvierte en glucosa y la devuelve a la circulación. Traslada la carga metabólica del músculo al hígado y tiene un coste neto de ATP para el organismo.",
    referencias: [
      { libro: "guyton", donde: "cap. 68; y cap. 85, Fisiología del deporte" },
      { libro: "lippincott", donde: "capítulo de gluconeogénesis" },
    ],
    vecinos: ["gluconeogenesis", "fermentacion-lactica"],
  },
  {
    slug: "fermentacion-lactica",
    nombre: "Fermentación láctica y metabolismo anaerobio",
    sinonimos: ["glucólisis anaerobia", "lactato deshidrogenasa", "ácido láctico"],
    unidad: "I8577",
    que: "Cuando no hay oxígeno suficiente, el piruvato se reduce a lactato para regenerar el NAD⁺ que la glucólisis necesita para seguir funcionando. El objetivo no es fabricar lactato sino reciclar el transportador de electrones; el lactato es la consecuencia.",
    referencias: [
      { libro: "guyton", donde: "cap. 68, glucólisis anaerobia" },
      { libro: "lippincott", donde: "capítulo de glucólisis" },
    ],
    vecinos: ["glucolisis", "ciclo-de-cori"],
  },
  {
    slug: "via-pentosas-fosfato",
    nombre: "Vía de las pentosas fosfato",
    sinonimos: ["shunt de las hexosas monofosfato", "ruta del fosfogluconato", "G6PD"],
    unidad: "I8577",
    que: "Ruta paralela a la glucólisis que no produce ATP: genera NADPH y ribosa-5-fosfato. El NADPH sostiene las rutas de síntesis y la defensa frente al daño oxidativo, y la ribosa es el esqueleto de los nucleótidos.",
    referencias: [
      { libro: "lippincott", donde: "capítulo de la vía de las pentosas fosfato" },
      { libro: "lehninger", donde: "capítulo de rutas del metabolismo de hexosas" },
    ],
    vecinos: ["glucolisis", "reacciones-del-metabolismo"],
  },
  {
    slug: "glucogenolisis",
    nombre: "Glucogenólisis y glucogenogénesis",
    sinonimos: ["metabolismo del glucógeno", "glucogeno", "glucógeno fosforilasa"],
    unidad: "I8577",
    que: "Almacenamiento y movilización de glucosa en forma de glucógeno, sobre todo en hígado y músculo. La diferencia entre los dos órganos es decisiva: el hígado puede liberar glucosa a la sangre y el músculo no, porque le falta la enzima que retira el fosfato.",
    referencias: [
      { libro: "guyton", donde: "cap. 68, almacenamiento del glucógeno" },
      { libro: "lippincott", donde: "capítulo de metabolismo del glucógeno" },
    ],
    vecinos: ["gluconeogenesis", "glucolisis"],
  },
  {
    slug: "beta-oxidacion",
    nombre: "Beta-oxidación de los ácidos grasos",
    sinonimos: ["oxidacion de acidos grasos", "carnitina", "lipólisis mitocondrial"],
    unidad: "I8577",
    que: "Degradación de los ácidos grasos en la matriz mitocondrial, recortando dos carbonos por vuelta y liberando acetil-CoA, NADH y FADH₂. Los ácidos grasos de cadena larga necesitan el transporte por carnitina para entrar en la mitocondria, y ese paso es un punto de regulación y de enfermedad.",
    referencias: [
      { libro: "guyton", donde: "cap. 69, Metabolismo de los lípidos" },
      { libro: "lippincott", donde: "capítulo de metabolismo de ácidos grasos" },
    ],
    vecinos: ["cetogenesis", "ciclo-de-krebs", "lipoproteinas"],
  },
  {
    slug: "cetogenesis",
    nombre: "Cuerpos cetónicos y cetogénesis",
    sinonimos: ["cetosis", "acetoacetato", "beta-hidroxibutirato", "cuerpos cetonicos"],
    unidad: "I8577",
    que: "En el ayuno prolongado el hígado convierte el exceso de acetil-CoA en cuerpos cetónicos, que sirven de combustible alternativo a cerebro y músculo. Son un mecanismo fisiológico de adaptación, y conviene distinguirlo del cuadro patológico que aparece cuando su producción se descontrola.",
    referencias: [
      { libro: "guyton", donde: "cap. 69, Metabolismo de los lípidos; y cap. 79, sobre diabetes" },
      { libro: "lippincott", donde: "capítulo de cuerpos cetónicos" },
    ],
    vecinos: ["beta-oxidacion", "ayuno-metabolico"],
  },
  {
    slug: "lipoproteinas",
    nombre: "Lipoproteínas y transporte de lípidos",
    sinonimos: ["LDL", "HDL", "VLDL", "quilomicrones", "colesterol"],
    unidad: "I8577",
    que: "Los lípidos no viajan sueltos en un medio acuoso: circulan en partículas con una envoltura de proteínas y fosfolípidos. Cada clase de partícula tiene un origen, una carga y un destino distintos, y esa logística explica la relación entre lípidos plasmáticos y enfermedad vascular.",
    referencias: [
      { libro: "guyton", donde: "cap. 69, transporte de los lípidos en los líquidos corporales" },
      { libro: "lippincott", donde: "capítulo de metabolismo del colesterol y las lipoproteínas" },
      { libro: "robbins", donde: "cap. 11, Vasos sanguíneos" },
    ],
    vecinos: ["beta-oxidacion", "ateroesclerosis"],
  },
  {
    slug: "ciclo-de-la-urea",
    nombre: "Ciclo de la urea",
    sinonimos: ["ureagenesis", "amonio", "hiperamonemia"],
    unidad: "I8577",
    que: "Ruta hepática que convierte el amonio, tóxico para el sistema nervioso, en urea, que el riñón puede excretar. Su fallo —hereditario o por enfermedad hepática— produce acumulación de amonio y afectación neurológica.",
    referencias: [
      { libro: "guyton", donde: "cap. 70, Metabolismo de las proteínas; y cap. 71, El hígado como órgano" },
      { libro: "lippincott", donde: "capítulo de eliminación del nitrógeno de los aminoácidos" },
    ],
    vecinos: ["transaminacion", "aminoacidos"],
  },
  {
    slug: "transaminacion",
    nombre: "Transaminación y desaminación",
    sinonimos: ["ALT", "AST", "transaminasas", "GPT", "GOT", "piridoxal fosfato"],
    unidad: "I8577",
    que: "Reacciones que trasladan o retiran el grupo amino de un aminoácido, con el fosfato de piridoxal como cofactor. Son el punto de entrada del esqueleto de carbono de los aminoácidos al metabolismo energético, y las enzimas que las catalizan se miden en sangre como marcadores de daño hepático.",
    referencias: [
      { libro: "guyton", donde: "cap. 70, Metabolismo de las proteínas" },
      { libro: "lippincott", donde: "capítulo de eliminación del nitrógeno de los aminoácidos" },
    ],
    vecinos: ["ciclo-de-la-urea", "aminoacidos"],
  },
  {
    slug: "aminoacidos",
    nombre: "Aminoácidos: estructura y clasificación",
    sinonimos: ["aminoacidos esenciales", "cadena lateral", "aminoacido"],
    unidad: "I8577",
    que: "Los veinte aminoácidos que la traducción incorpora a las proteínas, agrupados por lo que hace su cadena lateral: cargada, polar, hidrófoba o especial. Esa clasificación predice dónde queda cada residuo en la proteína plegada y qué papel puede jugar en un sitio activo.",
    referencias: [
      { libro: "lehninger", donde: "capítulo de aminoácidos, péptidos y proteínas" },
      { libro: "lippincott", donde: "capítulo de estructura de aminoácidos" },
    ],
    vecinos: ["ph-pka-ionizacion", "estructura-de-proteinas", "transaminacion"],
  },
  {
    slug: "estructura-de-proteinas",
    nombre: "Estructura de las proteínas y plegamiento",
    sinonimos: ["estructura primaria secundaria terciaria cuaternaria", "hélice alfa", "lámina beta", "chaperonas", "desnaturalizacion"],
    unidad: "I8577",
    que: "Los cuatro niveles de organización de una proteína y las interacciones que sostienen cada uno. El plegamiento correcto es lo que crea la función, y su fallo está detrás de un grupo entero de enfermedades por proteínas mal plegadas.",
    referencias: [
      { libro: "lehninger", donde: "capítulos de estructura tridimensional de las proteínas" },
      { libro: "lippincott", donde: "capítulo de estructura de las proteínas" },
      { libro: "alberts", donde: "capítulo de proteínas" },
    ],
    vecinos: ["aminoacidos", "enzimas-cinetica", "amiloidosis"],
  },
  {
    slug: "enzimas-cinetica",
    nombre: "Enzimas y cinética enzimática",
    sinonimos: ["Michaelis-Menten", "Km", "Vmax", "inhibicion competitiva", "cinetica enzimatica", "Lineweaver-Burk"],
    unidad: "I8577",
    que: "Cómo una enzima acelera una reacción bajando la energía de activación, y cómo se describe cuantitativamente su comportamiento con la constante de Michaelis y la velocidad máxima. Los tipos de inhibición se distinguen por cuál de esos dos parámetros modifican.",
    referencias: [
      { libro: "lehninger", donde: "capítulo de enzimas" },
      { libro: "lippincott", donde: "capítulo de enzimas" },
    ],
    vecinos: ["reacciones-del-metabolismo", "estructura-de-proteinas"],
  },
  {
    slug: "replicacion-del-adn",
    nombre: "Replicación del ADN",
    sinonimos: ["ADN polimerasa", "horquilla de replicacion", "Okazaki", "telomeros", "replicacion"],
    unidad: "I8577",
    que: "Duplicación semiconservadora del ADN antes de la división celular, con una hebra que se sintetiza de forma continua y otra en fragmentos. Los mecanismos de corrección de errores durante y después de la copia son los que mantienen baja la tasa de mutación.",
    referencias: [
      { libro: "alberts", donde: "capítulo de replicación, reparación y recombinación del ADN" },
      { libro: "guyton", donde: "cap. 3, Control genético de la síntesis proteica" },
      { libro: "robbins", donde: "cap. 5, Trastornos genéticos" },
    ],
    vecinos: ["transcripcion", "ciclo-celular", "reparacion-del-adn"],
  },
  {
    slug: "transcripcion",
    nombre: "Transcripción y procesamiento del ARN",
    sinonimos: ["ARN polimerasa", "splicing", "intrones", "exones", "ARNm", "maduracion del ARN"],
    unidad: "I8577",
    que: "Copia de un gen a ARN mensajero y las modificaciones que ese ARN sufre antes de salir del núcleo: caperuza, cola de poli-A y eliminación de intrones. El corte y empalme alternativo permite que un mismo gen dé lugar a varias proteínas distintas.",
    referencias: [
      { libro: "alberts", donde: "capítulo de del ADN a la proteína" },
      { libro: "guyton", donde: "cap. 3, Control genético de la síntesis proteica" },
    ],
    vecinos: ["traduccion", "replicacion-del-adn", "regulacion-genica"],
  },
  {
    slug: "traduccion",
    nombre: "Traducción y síntesis de proteínas",
    sinonimos: ["ribosoma", "codigo genetico", "ARNt", "codon", "sintesis proteica"],
    unidad: "I8577",
    que: "Lectura del ARN mensajero de tres en tres bases para ensamblar una cadena de aminoácidos en el ribosoma. El código genético es degenerado y casi universal, y esas dos propiedades explican por qué unas mutaciones puntuales cambian la proteína y otras no.",
    referencias: [
      { libro: "alberts", donde: "capítulo de del ADN a la proteína" },
      { libro: "guyton", donde: "cap. 3, Control genético de la síntesis proteica" },
    ],
    vecinos: ["transcripcion", "biologia-celular", "mutaciones"],
  },
  {
    slug: "regulacion-genica",
    nombre: "Regulación de la expresión génica",
    sinonimos: ["promotor", "factores de transcripcion", "epigenetica", "metilacion", "operon"],
    unidad: "I8577",
    que: "Los mecanismos que deciden qué genes se expresan, cuándo y cuánto: factores de transcripción, accesibilidad de la cromatina, metilación del ADN y control después de la transcripción. Es lo que permite que células con el mismo genoma sean tan distintas entre sí.",
    referencias: [
      { libro: "alberts", donde: "capítulo de control de la expresión génica" },
      { libro: "robbins", donde: "cap. 7, Neoplasias" },
    ],
    vecinos: ["transcripcion", "neoplasia"],
  },
  {
    slug: "mutaciones",
    nombre: "Mutaciones y tipos de variantes",
    sinonimos: ["mutacion puntual", "sin sentido", "cambio de sentido", "frameshift", "corrimiento del marco de lectura"],
    unidad: "I8577",
    que: "Clasificación de los cambios en la secuencia del ADN según cómo afectan a la proteína resultante: silenciosa, de cambio de sentido, sin sentido o con corrimiento del marco de lectura. La consecuencia funcional depende más del tipo de cambio y de dónde cae que de su tamaño.",
    referencias: [
      { libro: "robbins", donde: "cap. 5, Trastornos genéticos" },
      { libro: "alberts", donde: "capítulo de replicación, reparación y recombinación del ADN" },
    ],
    vecinos: ["traduccion", "reparacion-del-adn", "herencia-mendeliana"],
  },
  {
    slug: "reparacion-del-adn",
    nombre: "Reparación del ADN",
    sinonimos: ["reparacion por escision", "mismatch repair", "reparacion de errores de apareamiento"],
    unidad: "I8577",
    que: "Sistemas que detectan y corrigen el daño en el ADN, cada uno especializado en un tipo de lesión. Su fallo hereditario produce síndromes con predisposición al cáncer, lo que muestra hasta qué punto la estabilidad del genoma depende de ellos.",
    referencias: [
      { libro: "alberts", donde: "capítulo de replicación, reparación y recombinación del ADN" },
      { libro: "robbins", donde: "cap. 7, Neoplasias" },
    ],
    vecinos: ["replicacion-del-adn", "neoplasia", "ciclo-celular"],
  },
  {
    slug: "ayuno-metabolico",
    nombre: "Metabolismo en ayuno y tras la comida",
    sinonimos: ["estado posprandial", "ayuno prolongado", "integracion metabolica"],
    unidad: "I8577",
    que: "Cómo cambian las rutas metabólicas según el tiempo transcurrido desde la última comida y qué órgano sostiene la glucemia en cada fase. Es el tema que integra glucólisis, glucógeno, gluconeogénesis, lipólisis y cuerpos cetónicos en una sola historia.",
    referencias: [
      { libro: "guyton", donde: "cap. 72, Equilibrio energético; regulación prandial; obesidad y ayuno" },
      { libro: "lippincott", donde: "capítulo de integración del metabolismo" },
    ],
    vecinos: ["cetogenesis", "gluconeogenesis", "insulina-glucagon"],
  },
  {
    slug: "vitaminas-y-cofactores",
    nombre: "Vitaminas y cofactores enzimáticos",
    sinonimos: ["vitaminas hidrosolubles", "vitaminas liposolubles", "tiamina", "biotina", "vitamina B12", "cofactor"],
    unidad: "I8577",
    que: "Cada vitamina habilita un tipo concreto de reacción enzimática, y su carencia detiene ese tipo de reacción en todas las rutas donde aparece. Es el puente entre la bioquímica y la nutrición clínica.",
    referencias: [
      { libro: "guyton", donde: "cap. 72, vitaminas y minerales" },
      { libro: "lippincott", donde: "capítulo de vitaminas" },
      { libro: "robbins", donde: "cap. 9, Enfermedades ambientales y nutricionales" },
    ],
    vecinos: ["reacciones-del-metabolismo", "enzimas-cinetica"],
  },
];

/* ------------------------------------------------------------------ *
 * Bloque 2 · Estructura (histología, embriología, anatomía)
 * ------------------------------------------------------------------ */

const ESTRUCTURA: TemaCatalogo[] = [
  {
    slug: "tejido-epitelial",
    nombre: "Tejido epitelial",
    sinonimos: ["epitelio", "epitelios", "union estrecha", "desmosoma", "polaridad celular"],
    unidad: "I8555",
    que: "Tejido de células muy juntas que reviste superficies y forma glándulas, apoyado siempre sobre una membrana basal. Se clasifica por el número de capas y la forma de las células superficiales, y su polaridad —una cara apical distinta de la basolateral— es lo que le permite transportar en una dirección.",
    referencias: [
      { libro: "ross", donde: "cap. 5, Tejido epitelial" },
      { libro: "robbins", donde: "cap. 3, Inflamación y reparación" },
    ],
    vecinos: ["tejido-conjuntivo", "membrana-basal", "glandulas"],
  },
  {
    slug: "tejido-conjuntivo",
    nombre: "Tejido conjuntivo",
    sinonimos: ["conectivo", "matriz extracelular", "fibroblasto", "colageno", "elastina"],
    unidad: "I8555",
    que: "Tejido en el que las células son escasas y lo que predomina es la matriz extracelular que ellas fabrican. Sus propiedades mecánicas dependen de la proporción entre colágeno, fibras elásticas y sustancia fundamental.",
    referencias: [
      { libro: "ross", donde: "cap. 6, Tejido conjuntivo" },
      { libro: "robbins", donde: "cap. 3, Inflamación y reparación" },
    ],
    vecinos: ["tejido-epitelial", "cartilago", "hueso-tejido"],
  },
  {
    slug: "tejido-muscular",
    nombre: "Tejido muscular",
    sinonimos: ["musculo esqueletico", "musculo liso", "musculo cardiaco", "miocito"],
    unidad: "I8555",
    que: "Los tres tipos de músculo —esquelético, cardíaco y liso— y qué los distingue al microscopio: estriación, número y posición de los núcleos, y presencia de discos intercalares. Cada rasgo estructural corresponde a una diferencia funcional concreta.",
    referencias: [
      { libro: "ross", donde: "cap. 11, Tejido muscular" },
      { libro: "guyton", donde: "cap. 6 a 8, sobre músculo esquelético, liso y su excitación" },
    ],
    vecinos: ["sarcomero", "contraccion-muscular", "tejido-nervioso"],
  },
  {
    slug: "tejido-nervioso",
    nombre: "Tejido nervioso",
    sinonimos: ["neurona", "glia", "astrocito", "oligodendrocito", "celula de Schwann", "mielina"],
    unidad: "I8555",
    que: "Neuronas y células de sostén, con la mielina como rasgo que más condiciona la velocidad de conducción. Qué célula fabrica la mielina cambia según se esté en el sistema nervioso central o en el periférico, y esa diferencia tiene consecuencias en enfermedad y en regeneración.",
    referencias: [
      { libro: "ross", donde: "cap. 12, Tejido nervioso" },
      { libro: "guyton", donde: "cap. 46, Organización del sistema nervioso" },
    ],
    vecinos: ["potencial-de-accion", "sinapsis", "tejido-muscular"],
  },
  {
    slug: "sangre-tejido",
    nombre: "Sangre y hematopoyesis",
    sinonimos: ["frotis sanguineo", "eritrocito", "leucocito", "plaqueta", "medula osea", "hematopoyesis"],
    unidad: "I8555",
    que: "Componentes celulares de la sangre, cómo se reconocen en un frotis y de qué precursor derivan en la médula ósea. Saber leer un frotis es una habilidad de laboratorio; saber de qué línea viene cada célula es lo que permite entender las citopenias.",
    referencias: [
      { libro: "ross", donde: "cap. 10, Tejido sanguíneo" },
      { libro: "guyton", donde: "cap. 33, Eritrocitos, anemia y policitemia" },
      { libro: "robbins", donde: "cap. 13 y 14, sobre leucocitos y eritrocitos" },
    ],
    vecinos: ["anemia", "hemostasia", "inflamacion"],
  },
  {
    slug: "cartilago",
    nombre: "Cartílago",
    sinonimos: ["condrocito", "cartilago hialino", "fibrocartilago", "pericondrio"],
    unidad: "I8555",
    que: "Tejido de sostén sin vasos, cuyas células viven en lagunas dentro de una matriz que ellas mismas producen. Su avascularidad explica lo mal que cicatriza y por qué se nutre por difusión desde el pericondrio o el líquido articular.",
    referencias: [{ libro: "ross", donde: "cap. 7, Cartílago" }],
    vecinos: ["hueso-tejido", "tejido-conjuntivo", "osificacion"],
  },
  {
    slug: "hueso-tejido",
    nombre: "Hueso como tejido",
    sinonimos: ["osteoblasto", "osteoclasto", "osteocito", "osteona", "sistema de Havers", "remodelado oseo"],
    unidad: "I8555",
    que: "Tejido conjuntivo mineralizado en remodelación permanente, con tres estirpes celulares que construyen, mantienen y reabsorben. El equilibrio entre formación y resorción es lo que determina la masa ósea, y su desajuste es la base de la patología del hueso.",
    referencias: [
      { libro: "ross", donde: "cap. 8, Tejido óseo" },
      { libro: "guyton", donde: "cap. 80, metabolismo del calcio y el fosfato, huesos y dientes" },
      { libro: "robbins", donde: "cap. 26, Huesos, articulaciones y tumores de partes blandas" },
    ],
    vecinos: ["osificacion", "cartilago", "calcio-fosforo"],
  },
  {
    slug: "osificacion",
    nombre: "Osificación y crecimiento óseo",
    sinonimos: ["osificacion endocondral", "osificacion intramembranosa", "placa de crecimiento", "fisis"],
    unidad: "I8555",
    que: "Los dos modos de formar hueso —directamente sobre tejido conjuntivo o sustituyendo un molde de cartílago— y cómo el hueso crece en longitud por la placa epifisaria. Qué huesos se forman por cada vía explica diferencias en su patología y en su reparación.",
    referencias: [
      { libro: "ross", donde: "cap. 8, Tejido óseo" },
      { libro: "langman", donde: "capítulo de sistema esquelético" },
    ],
    vecinos: ["hueso-tejido", "cartilago"],
  },
  {
    slug: "membrana-basal",
    nombre: "Membrana basal y lámina basal",
    sinonimos: ["lamina basal", "laminina", "colageno IV"],
    unidad: "I8555",
    que: "Capa de matriz especializada sobre la que se apoya todo epitelio y que rodea a músculo, adipocitos y células de Schwann. Sirve de anclaje, de filtro y de guía en la reparación, y su integridad es uno de los criterios que separan un tumor in situ de uno invasor.",
    referencias: [
      { libro: "ross", donde: "cap. 5, Tejido epitelial" },
      { libro: "robbins", donde: "cap. 7, Neoplasias" },
    ],
    vecinos: ["tejido-epitelial", "neoplasia", "nefrona"],
  },
  {
    slug: "glandulas",
    nombre: "Glándulas exocrinas y endocrinas",
    sinonimos: ["glandula", "secrecion merocrina", "holocrina", "apocrina", "acino"],
    unidad: "I8555",
    que: "Los epitelios glandulares se clasifican por si vierten su producto a un conducto o a la sangre, y por el mecanismo con que lo liberan. Esa clasificación anticipa qué aspecto tendrán al microscopio y qué tipo de tumor pueden originar.",
    referencias: [{ libro: "ross", donde: "cap. 5, Tejido epitelial" }],
    vecinos: ["tejido-epitelial", "hormonas-mecanismos"],
  },
  {
    slug: "gametogenesis",
    nombre: "Gametogénesis",
    sinonimos: ["espermatogenesis", "ovogenesis", "meiosis", "gametos"],
    unidad: "I8553",
    que: "Formación de los gametos por meiosis, con diferencias importantes entre los dos sexos en cronología, número de células producidas y momento en que se completa la división. Los errores en la separación de los cromosomas durante la meiosis originan las aneuploidías.",
    referencias: [
      { libro: "langman", donde: "capítulo de gametogénesis" },
      { libro: "ross", donde: "cap. 22 y 23, aparatos reproductores" },
      { libro: "guyton", donde: "cap. 81 y 82, funciones reproductoras" },
    ],
    vecinos: ["fecundacion", "meiosis-mitosis", "aneuploidias"],
  },
  {
    slug: "fecundacion",
    nombre: "Fecundación e implantación",
    sinonimos: ["blastocisto", "implantacion", "primera semana", "segmentacion"],
    unidad: "I8553",
    que: "Desde la unión de los gametos hasta la implantación del blastocisto en el endometrio, durante la primera semana del desarrollo. Los bloqueos a la poliespermia y el momento exacto de la implantación son las dos piezas que más se preguntan y peor se recuerdan.",
    referencias: [
      { libro: "langman", donde: "capítulos de la primera y segunda semana del desarrollo" },
      { libro: "guyton", donde: "cap. 83, Embarazo y lactancia" },
    ],
    vecinos: ["gametogenesis", "gastrulacion", "placenta"],
  },
  {
    slug: "gastrulacion",
    nombre: "Gastrulación y hojas embrionarias",
    sinonimos: ["ectodermo", "mesodermo", "endodermo", "tercera semana", "linea primitiva"],
    unidad: "I8553",
    que: "Formación de las tres hojas embrionarias durante la tercera semana, de las que deriva todo el organismo. Saber qué hoja da origen a cada órgano es la clave que ordena buena parte de la embriología y explica malformaciones que aparecen agrupadas.",
    referencias: [{ libro: "langman", donde: "capítulo de la tercera semana del desarrollo" }],
    vecinos: ["fecundacion", "neurulacion", "arcos-faringeos"],
  },
  {
    slug: "neurulacion",
    nombre: "Neurulación y desarrollo del sistema nervioso",
    sinonimos: ["tubo neural", "cresta neural", "defectos del tubo neural", "espina bifida"],
    unidad: "I8553",
    que: "Plegamiento del ectodermo para formar el tubo neural y la cresta neural, y cierre de sus extremos. El fallo del cierre produce defectos cuya localización depende de qué extremo no se cerró, y la cresta neural origina una lista de estructuras sorprendentemente amplia.",
    referencias: [
      { libro: "langman", donde: "capítulo de sistema nervioso central" },
      { libro: "robbins", donde: "cap. 28, Sistema nervioso central" },
    ],
    vecinos: ["gastrulacion", "arcos-faringeos"],
  },
  {
    slug: "arcos-faringeos",
    nombre: "Arcos faríngeos y desarrollo de cabeza y cuello",
    sinonimos: ["arcos branquiales", "bolsas faringeas", "hendiduras"],
    unidad: "I8553",
    que: "Estructuras transitorias del embrión que dan origen a huesos, músculos, nervios y vasos concretos de la cabeza y el cuello. La correspondencia entre cada arco y su nervio explica patrones de inervación que de otro modo parecen arbitrarios.",
    referencias: [
      { libro: "langman", donde: "capítulo de cabeza y cuello" },
      { libro: "moore", donde: "capítulo de cabeza y cuello" },
    ],
    vecinos: ["neurulacion", "huesos-del-craneo"],
  },
  {
    slug: "placenta",
    nombre: "Placenta y anexos embrionarios",
    sinonimos: ["cordon umbilical", "amnios", "corion", "circulacion fetal"],
    unidad: "I8553",
    que: "Órgano de intercambio entre madre y feto, con función respiratoria, nutritiva, excretora y endocrina. La circulación fetal tiene tres cortocircuitos que se cierran al nacer, y su persistencia es causa de cardiopatía congénita.",
    referencias: [
      { libro: "langman", donde: "capítulo de placenta y membranas fetales" },
      { libro: "guyton", donde: "cap. 83, Embarazo y lactancia; y cap. 84, Fisiología fetal y neonatal" },
    ],
    vecinos: ["fecundacion", "cardiopatias-congenitas"],
  },
  {
    slug: "huesos-del-craneo",
    nombre: "Huesos del cráneo",
    sinonimos: ["craneo", "calvaria", "suturas", "neurocraneo", "viscerocraneo", "esfenoides", "temporal"],
    unidad: "I8554",
    que: "Los huesos que forman la bóveda y la base del cráneo y el macizo facial, con sus suturas y los agujeros por los que pasan nervios y vasos. Lo que hace útil este tema no es la lista de huesos sino saber qué atraviesa cada agujero, porque de ahí salen los síndromes por lesión de la base.",
    referencias: [
      { libro: "netter", donde: "láminas de cabeza y cuello" },
      { libro: "moore", donde: "capítulo de cabeza" },
    ],
    vecinos: ["arcos-faringeos", "pares-craneales", "columna-vertebral"],
    figura: "craneo-lateral",
  },
  {
    slug: "columna-vertebral",
    nombre: "Columna vertebral",
    sinonimos: ["vertebras", "raquis", "disco intervertebral", "curvaturas"],
    unidad: "I8554",
    que: "Organización de las vértebras por regiones y qué rasgos distinguen a una cervical de una torácica o una lumbar. Las diferencias regionales no son un detalle descriptivo: determinan el rango de movimiento y dónde se producen las lesiones típicas.",
    referencias: [
      { libro: "moore", donde: "capítulo de dorso" },
      { libro: "netter", donde: "láminas de dorso y médula espinal" },
    ],
    vecinos: ["huesos-del-craneo", "medula-espinal", "plexos-nerviosos"],
  },
  {
    slug: "plexos-nerviosos",
    nombre: "Plexos nerviosos y nervios periféricos",
    sinonimos: ["plexo braquial", "plexo lumbosacro", "nervio mediano", "nervio ciatico", "dermatomas"],
    unidad: "I8554",
    que: "Cómo las raíces espinales se reorganizan en plexos antes de formar los nervios periféricos, y qué territorio motor y sensitivo cubre cada uno. La diferencia entre una lesión de raíz y una de nervio periférico se deduce de esta organización.",
    referencias: [
      { libro: "moore", donde: "capítulos de miembro superior e inferior" },
      { libro: "netter", donde: "láminas de miembros" },
    ],
    vecinos: ["columna-vertebral", "medula-espinal"],
  },
  {
    slug: "pares-craneales",
    nombre: "Pares craneales",
    sinonimos: ["nervios craneales", "XII pares", "nervio facial", "nervio trigemino", "nervio vago"],
    unidad: "I8554",
    que: "Los doce nervios craneales, por dónde salen del cráneo y qué función motora, sensitiva o autónoma lleva cada uno. Su exploración ordenada es una de las herramientas de localización más potentes de la neurología.",
    referencias: [
      { libro: "netter", donde: "láminas de cabeza y cuello" },
      { libro: "moore", donde: "capítulo de cabeza" },
      { libro: "guyton", donde: "unidades IX a XI, sistema nervioso" },
    ],
    vecinos: ["huesos-del-craneo", "tronco-encefalico"],
  },
];

import { FUNCION, AGRESION, CLINICA, COMPLEMENTOS } from "./catalogo-2";

export const CATALOGO: TemaCatalogo[] = [
  ...MOLECULAR, ...ESTRUCTURA, ...FUNCION, ...AGRESION, ...CLINICA, ...COMPLEMENTOS,
];

export const getCatalogo = (slug: string) => CATALOGO.find((t) => t.slug === slug);
export const catalogoDeUnidad = (clave: string) => CATALOGO.filter((t) => t.unidad === clave);

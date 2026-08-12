/**
 * Segunda mitad del catálogo: función, agresión, farmacología y clínica.
 *
 * Se separa de `catalogo.ts` solo por tamaño. Las reglas de autoría son las
 * mismas y están documentadas allí: dos frases descriptivas, referencias
 * comprobadas con capítulo concreto, sinónimos tal como la gente los escribe y
 * ninguna pauta de tratamiento.
 */
import type { TemaCatalogo } from "./catalogo";

/* ------------------------------------------------------------------ *
 * Bloque 3 · Función (fisiología e inmunología)
 * ------------------------------------------------------------------ */

export const FUNCION: TemaCatalogo[] = [
  {
    slug: "potencial-de-membrana",
    nombre: "Potencial de membrana en reposo",
    sinonimos: ["potencial de reposo", "Nernst", "Goldman", "bomba sodio potasio", "NaK ATPasa"],
    unidad: "I8568",
    que: "Diferencia de carga entre el interior y el exterior de la célula, sostenida por la distribución desigual de iones y por la permeabilidad selectiva de la membrana. La ecuación de Nernst da el potencial de equilibrio de un ion y la de Goldman combina varios según cuánto permea cada uno.",
    referencias: [
      { libro: "guyton", donde: "cap. 5, Potenciales de membrana y potenciales de acción" },
      { libro: "ganong", donde: "sección de fisiología celular" },
    ],
    vecinos: ["potencial-de-accion", "transporte-de-membrana"],
  },
  {
    slug: "potencial-de-accion",
    nombre: "Potencial de acción",
    sinonimos: ["despolarizacion", "repolarizacion", "periodo refractario", "canales de sodio", "conduccion saltatoria"],
    unidad: "I8568",
    que: "Cambio rápido y todo o nada del potencial de membrana, producido por la apertura secuencial de canales de sodio y potasio dependientes de voltaje. Los períodos refractarios impiden que la señal vuelva hacia atrás y limitan la frecuencia máxima de disparo.",
    referencias: [
      { libro: "guyton", donde: "cap. 5, Potenciales de membrana y potenciales de acción" },
      { libro: "ganong", donde: "sección de neurofisiología" },
    ],
    vecinos: ["potencial-de-membrana", "sinapsis", "tejido-nervioso"],
  },
  {
    slug: "transporte-de-membrana",
    nombre: "Transporte a través de la membrana",
    sinonimos: ["difusion facilitada", "transporte activo", "osmosis", "canales", "transportadores", "GLUT"],
    unidad: "I8568",
    que: "Las formas en que una sustancia atraviesa la membrana: difusión simple, difusión facilitada por canales o transportadores, y transporte activo con gasto de energía. Qué mecanismo usa cada molécula depende de su tamaño, su carga y su solubilidad en lípidos.",
    referencias: [
      { libro: "guyton", donde: "cap. 4, Transporte de sustancias a través de las membranas celulares" },
      { libro: "alberts", donde: "capítulo de transporte a través de membranas" },
    ],
    vecinos: ["potencial-de-membrana", "biologia-celular", "ph-pka-ionizacion"],
  },
  {
    slug: "sinapsis",
    nombre: "Sinapsis y neurotransmisión",
    sinonimos: ["neurotransmisor", "sinapsis quimica", "union neuromuscular", "acetilcolina", "receptor postsinaptico"],
    unidad: "I8568",
    que: "Transmisión de la señal de una neurona a la siguiente, casi siempre química, con liberación de neurotransmisor disparada por la entrada de calcio. La suma de potenciales excitadores e inhibidores en el soma decide si la neurona siguiente dispara.",
    referencias: [
      { libro: "guyton", donde: "cap. 46, funciones básicas de las sinapsis y neurotransmisores" },
      { libro: "ganong", donde: "sección de neurofisiología" },
    ],
    vecinos: ["potencial-de-accion", "contraccion-muscular", "sistema-nervioso-autonomo"],
  },
  {
    slug: "contraccion-muscular",
    nombre: "Contracción muscular y acoplamiento excitación-contracción",
    sinonimos: ["deslizamiento de filamentos", "puentes cruzados", "calcio troponina", "acoplamiento excitacion contraccion", "rigor mortis"],
    unidad: "I8568",
    que: "Cómo un potencial de acción en la membrana del miocito acaba produciendo fuerza: el calcio liberado del retículo sarcoplásmico desplaza la troponina y deja libres los sitios de unión de la actina. El ATP no solo produce el golpe de fuerza, también hace falta para soltar la miosina, y de ahí la rigidez tras la muerte.",
    referencias: [
      { libro: "guyton", donde: "cap. 6, Contracción del músculo esquelético; y cap. 7, excitación del músculo" },
      { libro: "ross", donde: "cap. 11, Tejido muscular" },
    ],
    vecinos: ["sarcomero", "sinapsis", "tejido-muscular"],
    figura: "sarcomero",
  },
  {
    slug: "ciclo-cardiaco",
    nombre: "Ciclo cardíaco",
    sinonimos: ["sistole", "diastole", "curva presion volumen", "ruidos cardiacos", "Wiggers"],
    unidad: "I8568",
    que: "Secuencia de presiones, volúmenes y flujos en aurículas, ventrículos y grandes vasos durante un latido. Los ruidos cardíacos marcan el cierre de las válvulas, y las cuatro fases del asa presión-volumen explican qué le hace cada valvulopatía al ventrículo.",
    referencias: [
      { libro: "guyton", donde: "cap. 9, El músculo cardíaco; el corazón como bomba" },
      { libro: "ganong", donde: "sección cardiovascular" },
    ],
    vecinos: ["gasto-cardiaco", "electrocardiograma", "ley-de-laplace"],
  },
  {
    slug: "gasto-cardiaco",
    nombre: "Gasto cardíaco, precarga, poscarga y contractilidad",
    sinonimos: ["Frank-Starling", "volumen sistolico", "retorno venoso", "fraccion de eyeccion"],
    unidad: "I8568",
    que: "El volumen que el corazón expulsa por minuto y las tres variables que lo determinan: cuánto se llena, contra cuánta resistencia expulsa y con cuánta fuerza se contrae. La relación de Frank-Starling explica por qué un ventrículo más lleno expulsa más sin necesidad de ninguna señal externa.",
    referencias: [
      { libro: "guyton", donde: "cap. 9 y cap. 20, Gasto cardíaco, retorno venoso y su regulación" },
    ],
    vecinos: ["ciclo-cardiaco", "presion-arterial", "insuficiencia-cardiaca"],
  },
  {
    slug: "electrocardiograma",
    nombre: "Electrocardiograma normal",
    sinonimos: ["ECG", "EKG", "onda P", "complejo QRS", "eje electrico", "derivaciones"],
    unidad: "I8568",
    que: "Registro en la superficie del cuerpo de la actividad eléctrica del corazón: cada onda corresponde a la despolarización o repolarización de una parte del miocardio. Leerlo empieza por saber qué mira cada derivación, no por memorizar patrones.",
    referencias: [
      { libro: "guyton", donde: "cap. 11 a 13, sobre el electrocardiograma normal y las arritmias" },
    ],
    vecinos: ["ciclo-cardiaco", "arritmias", "sistema-de-conduccion"],
  },
  {
    slug: "sistema-de-conduccion",
    nombre: "Sistema de conducción cardíaco y automatismo",
    sinonimos: ["nodo sinusal", "nodo AV", "haz de His", "Purkinje", "automatismo"],
    unidad: "I8568",
    que: "Estructuras que generan y propagan el impulso cardíaco, con el nodo sinusal como marcapasos normal por ser el de frecuencia intrínseca más alta. El retraso en el nodo auriculoventricular es lo que permite que las aurículas terminen de llenar los ventrículos antes de que estos se contraigan.",
    referencias: [
      { libro: "guyton", donde: "cap. 10, Excitación rítmica del corazón" },
    ],
    vecinos: ["electrocardiograma", "arritmias", "ciclo-cardiaco"],
  },
  {
    slug: "presion-arterial",
    nombre: "Regulación de la presión arterial",
    sinonimos: ["barorreceptores", "renina angiotensina aldosterona", "SRAA", "resistencia periferica", "hipertension fisiologia"],
    unidad: "I8568",
    que: "Mecanismos que mantienen la presión arterial en distintas escalas de tiempo: los barorreceptores en segundos, los sistemas hormonales en horas y el manejo renal del sodio y el agua a largo plazo. El control a largo plazo es renal, y esa es la idea que ordena toda la fisiopatología de la hipertensión.",
    referencias: [
      { libro: "guyton", donde: "cap. 17 a 19, sobre control de la circulación y de la presión arterial" },
    ],
    vecinos: ["gasto-cardiaco", "filtracion-glomerular", "hipertension-arterial"],
  },
  {
    slug: "microcirculacion",
    nombre: "Microcirculación, intercambio capilar y edema",
    sinonimos: ["Starling capilar", "presion oncotica", "linfa", "edema fisiopatologia"],
    unidad: "I8568",
    que: "Intercambio de líquido entre el capilar y el intersticio, gobernado por el equilibrio entre presiones hidrostáticas y oncóticas a ambos lados. El edema aparece cuando ese equilibrio se desplaza o cuando el drenaje linfático falla, y sus causas se ordenan según qué término de la ecuación se alteró.",
    referencias: [
      { libro: "guyton", donde: "cap. 16, La microcirculación y el sistema linfático; y cap. 25, edema" },
      { libro: "robbins", donde: "cap. 4, Trastornos hemodinámicos" },
    ],
    vecinos: ["presion-arterial", "trastornos-hemodinamicos"],
  },
  {
    slug: "ventilacion-pulmonar",
    nombre: "Ventilación pulmonar y mecánica respiratoria",
    sinonimos: ["volumenes pulmonares", "distensibilidad", "surfactante", "espirometria", "capacidad vital"],
    unidad: "I8568",
    que: "Cómo entra y sale el aire de los pulmones, y qué determina el trabajo que cuesta hacerlo: distensibilidad del pulmón, resistencia de la vía aérea y tensión superficial alveolar. El surfactante existe porque, sin él, los alvéolos pequeños se vaciarían dentro de los grandes.",
    referencias: [
      { libro: "guyton", donde: "cap. 38, Ventilación pulmonar" },
      { libro: "ganong", donde: "cap. 34, Introducción a la estructura y la mecánica pulmonar" },
    ],
    vecinos: ["intercambio-gaseoso", "ley-de-laplace", "transporte-de-gases"],
  },
  {
    slug: "intercambio-gaseoso",
    nombre: "Intercambio gaseoso y relación ventilación-perfusión",
    sinonimos: ["V/Q", "difusion alveolo capilar", "shunt", "espacio muerto", "gradiente alveolo arterial"],
    unidad: "I8568",
    que: "Paso de oxígeno y dióxido de carbono entre el alvéolo y el capilar, y por qué la eficacia del pulmón depende de que ventilación y perfusión coincidan en las mismas zonas. Los dos extremos del desajuste —espacio muerto y cortocircuito— explican la mayoría de las causas de hipoxemia.",
    referencias: [
      { libro: "guyton", donde: "cap. 39 y 40, sobre circulación pulmonar e intercambio gaseoso" },
    ],
    vecinos: ["ventilacion-pulmonar", "transporte-de-gases", "insuficiencia-respiratoria"],
  },
  {
    slug: "transporte-de-gases",
    nombre: "Transporte de oxígeno y CO₂ en la sangre",
    sinonimos: ["curva de disociacion", "hemoglobina", "efecto Bohr", "2,3-BPG", "saturacion"],
    unidad: "I8568",
    que: "El oxígeno viaja casi todo unido a la hemoglobina y el CO₂ sobre todo como bicarbonato. La forma sigmoidea de la curva de disociación y sus desplazamientos explican por qué la hemoglobina carga bien en el pulmón y suelta bien en el tejido que más lo necesita.",
    referencias: [
      { libro: "guyton", donde: "cap. 41, Transporte de oxígeno y dióxido de carbono en la sangre" },
    ],
    vecinos: ["intercambio-gaseoso", "equilibrio-acido-base", "anemia"],
  },
  {
    slug: "filtracion-glomerular",
    nombre: "Filtración glomerular y flujo sanguíneo renal",
    sinonimos: ["FG", "TFG", "aclaramiento", "creatinina", "autorregulacion renal", "feedback tubuloglomerular"],
    unidad: "I8568",
    que: "Formación del filtrado en el glomérulo y los mecanismos que mantienen constante ese ritmo pese a los cambios de presión arterial. El aclaramiento de una sustancia que se filtra y no se reabsorbe ni se secreta permite estimar la función renal.",
    referencias: [
      { libro: "guyton", donde: "cap. 27, Filtración glomerular, flujo sanguíneo renal y su control" },
    ],
    vecinos: ["nefrona", "reabsorcion-tubular", "presion-arterial"],
  },
  {
    slug: "nefrona",
    nombre: "Nefrona: anatomía funcional",
    sinonimos: ["glomerulo", "tubulo proximal", "asa de Henle", "tubulo colector", "aparato yuxtaglomerular"],
    unidad: "I8568",
    que: "Unidad funcional del riñón y qué hace cada uno de sus segmentos, del glomérulo al conducto colector. Cada segmento transporta cosas distintas, y ahí es donde actúan tanto las hormonas como los diuréticos.",
    referencias: [
      { libro: "guyton", donde: "cap. 26, El sistema urinario: anatomía funcional y formación de orina" },
      { libro: "ross", donde: "cap. 20, Sistema urinario" },
    ],
    vecinos: ["filtracion-glomerular", "reabsorcion-tubular", "concentracion-de-orina"],
  },
  {
    slug: "reabsorcion-tubular",
    nombre: "Reabsorción y secreción tubular",
    sinonimos: ["transporte tubular", "glucosuria", "transporte maximo", "umbral renal"],
    unidad: "I8568",
    que: "Recuperación selectiva de agua y solutos del filtrado y secreción activa de otras sustancias hacia la orina. Los transportadores tienen un máximo, y superarlo es lo que hace aparecer glucosa en la orina cuando la glucemia sube lo suficiente.",
    referencias: [
      { libro: "guyton", donde: "cap. 28, Reabsorción y secreción tubular renal" },
    ],
    vecinos: ["nefrona", "concentracion-de-orina", "equilibrio-acido-base"],
  },
  {
    slug: "concentracion-de-orina",
    nombre: "Concentración y dilución de la orina",
    sinonimos: ["multiplicador contracorriente", "ADH", "vasopresina", "osmolaridad", "gradiente medular"],
    unidad: "I8568",
    que: "Cómo el riñón produce orina más concentrada o más diluida que el plasma según convenga, apoyándose en el gradiente osmótico de la médula renal y en la acción de la hormona antidiurética. Es el mecanismo que sostiene el equilibrio del agua corporal.",
    referencias: [
      { libro: "guyton", donde: "cap. 29, Concentración y dilución de orina" },
    ],
    vecinos: ["nefrona", "reabsorcion-tubular", "hormonas-mecanismos"],
  },
  {
    slug: "equilibrio-acido-base",
    nombre: "Equilibrio ácido-base y gasometría",
    sinonimos: ["acidosis", "alcalosis", "gasometria", "anion gap", "hueco anionico", "compensacion"],
    unidad: "I8568",
    que: "Mantenimiento del pH del líquido extracelular mediante amortiguadores químicos, ajuste respiratorio del CO₂ y manejo renal del bicarbonato. Interpretar una gasometría consiste en identificar el trastorno primario, comprobar si la compensación es la esperada y buscar trastornos añadidos.",
    referencias: [
      { libro: "guyton", donde: "cap. 31, Regulación acidobásica" },
    ],
    vecinos: ["ph-pka-ionizacion", "reabsorcion-tubular", "transporte-de-gases"],
  },
  {
    slug: "digestion-y-absorcion",
    nombre: "Digestión y absorción",
    sinonimos: ["absorcion intestinal", "enzimas digestivas", "bilis", "malabsorcion"],
    unidad: "I8568",
    que: "Dónde y con qué enzimas se degradan hidratos de carbono, proteínas y grasas, y por qué mecanismo se absorbe cada producto final. Las grasas necesitan además la emulsión por las sales biliares, y por eso su absorción falla por causas distintas a las demás.",
    referencias: [
      { libro: "guyton", donde: "cap. 66, Digestión y absorción en el tubo digestivo" },
    ],
    vecinos: ["secrecion-digestiva", "motilidad-digestiva", "lipoproteinas"],
  },
  {
    slug: "secrecion-digestiva",
    nombre: "Secreciones del tubo digestivo",
    sinonimos: ["jugo gastrico", "acido clorhidrico", "celula parietal", "pepsina", "secrecion pancreatica"],
    unidad: "I8568",
    que: "Qué secreta cada tramo del tubo digestivo, qué célula lo produce y qué señal lo estimula. La bomba de protones de la célula parietal y su regulación es la pieza que después explica buena parte de la patología gástrica.",
    referencias: [
      { libro: "guyton", donde: "cap. 65, Funciones secretoras del tubo digestivo" },
      { libro: "ross", donde: "cap. 17, Aparato digestivo" },
    ],
    vecinos: ["digestion-y-absorcion", "motilidad-digestiva"],
  },
  {
    slug: "motilidad-digestiva",
    nombre: "Motilidad gastrointestinal",
    sinonimos: ["peristaltismo", "plexo mienterico", "vaciamiento gastrico", "sistema nervioso enterico"],
    unidad: "I8568",
    que: "Movimientos de propulsión y mezcla del tubo digestivo, coordinados por un sistema nervioso propio de la pared intestinal y modulados por el autónomo. Ese sistema entérico puede funcionar con bastante autonomía respecto del sistema nervioso central.",
    referencias: [
      { libro: "guyton", donde: "cap. 63 y 64, sobre principios generales y propulsión en el tubo digestivo" },
    ],
    vecinos: ["secrecion-digestiva", "sistema-nervioso-autonomo"],
  },
  {
    slug: "hormonas-mecanismos",
    nombre: "Hormonas: mecanismos de acción",
    sinonimos: ["receptor hormonal", "segundo mensajero", "AMPc", "receptor nuclear", "endocrinologia general"],
    unidad: "I8568",
    que: "Cómo actúa una hormona según su naturaleza química: las hidrosolubles se unen a receptores de membrana y usan segundos mensajeros, las liposolubles atraviesan la membrana y actúan sobre receptores intracelulares. Esa diferencia predice la latencia y la duración del efecto.",
    referencias: [
      { libro: "guyton", donde: "cap. 75, Introducción a la endocrinología" },
    ],
    vecinos: ["eje-hipotalamo-hipofisis", "insulina-glucagon", "quiralidad"],
  },
  {
    slug: "eje-hipotalamo-hipofisis",
    nombre: "Eje hipotálamo-hipófisis",
    sinonimos: ["adenohipofisis", "neurohipofisis", "hormona de crecimiento", "prolactina", "retroalimentacion hormonal"],
    unidad: "I8568",
    que: "Organización jerárquica del control endocrino, con el hipotálamo mandando sobre la hipófisis y esta sobre las glándulas periféricas, todo ello con retroalimentación negativa. Saber en qué nivel está la lesión es lo que distingue un trastorno primario de uno secundario o terciario.",
    referencias: [
      { libro: "guyton", donde: "cap. 76, Hormonas hipofisarias y su control por el hipotálamo" },
      { libro: "ross", donde: "cap. 21, Sistema endocrino" },
    ],
    vecinos: ["hormonas-mecanismos", "tiroides", "corticosuprarrenal"],
  },
  {
    slug: "tiroides",
    nombre: "Hormonas tiroideas",
    sinonimos: ["T3", "T4", "TSH", "hipotiroidismo fisiologia", "hipertiroidismo fisiologia", "yodo"],
    unidad: "I8568",
    que: "Síntesis de hormona tiroidea a partir de yodo y tirosina, su transporte unida a proteínas y su efecto general sobre el metabolismo basal. Casi todos los síntomas del exceso y del defecto se deducen de acelerar o frenar el metabolismo de todos los tejidos a la vez.",
    referencias: [
      { libro: "guyton", donde: "cap. 77, Hormonas metabólicas tiroideas" },
      { libro: "robbins", donde: "cap. 24, Sistema endocrino" },
    ],
    vecinos: ["eje-hipotalamo-hipofisis", "hormonas-mecanismos"],
  },
  {
    slug: "corticosuprarrenal",
    nombre: "Hormonas corticosuprarrenales",
    sinonimos: ["cortisol", "aldosterona", "glucocorticoides", "mineralocorticoides", "eje HHA"],
    unidad: "I8568",
    que: "Las tres capas de la corteza suprarrenal producen mineralocorticoides, glucocorticoides y andrógenos, cada una bajo un control distinto. La aldosterona responde sobre todo al sistema renina-angiotensina y el cortisol a la hipófisis, y esa diferencia importa al interpretar una insuficiencia suprarrenal.",
    referencias: [
      { libro: "guyton", donde: "cap. 78, Hormonas corticosuprarrenales" },
      { libro: "robbins", donde: "cap. 24, Sistema endocrino" },
    ],
    vecinos: ["eje-hipotalamo-hipofisis", "presion-arterial"],
  },
  {
    slug: "insulina-glucagon",
    nombre: "Insulina, glucagón y regulación de la glucemia",
    sinonimos: ["celula beta", "resistencia a la insulina", "glucemia", "diabetes fisiologia"],
    unidad: "I8568",
    que: "Las dos hormonas pancreáticas que sostienen la glucemia en direcciones opuestas y cómo se reparten el trabajo según el estado de ayuno o de saciedad. Entender qué hace la insulina en hígado, músculo y tejido adiposo es lo que después hace legible la diabetes.",
    referencias: [
      { libro: "guyton", donde: "cap. 79, Insulina, glucagón y diabetes mellitus" },
      { libro: "robbins", donde: "cap. 24, Sistema endocrino" },
    ],
    vecinos: ["ayuno-metabolico", "glucolisis", "diabetes-mellitus"],
  },
  {
    slug: "calcio-fosforo",
    nombre: "Metabolismo del calcio, fósforo y vitamina D",
    sinonimos: ["PTH", "paratohormona", "calcitonina", "vitamina D", "hipocalcemia"],
    unidad: "I8568",
    que: "Regulación del calcio plasmático por la hormona paratiroidea, la vitamina D y la calcitonina, actuando sobre hueso, riñón e intestino. El calcio libre es el que importa funcionalmente, y su relación con el pH y con la albúmina explica discordancias frecuentes en el laboratorio.",
    referencias: [
      { libro: "guyton", donde: "cap. 80, Hormona paratiroidea, calcitonina, metabolismo del calcio y el fosfato" },
    ],
    vecinos: ["hueso-tejido", "eje-hipotalamo-hipofisis"],
  },
  {
    slug: "sistema-nervioso-autonomo",
    nombre: "Sistema nervioso autónomo",
    sinonimos: ["simpatico", "parasimpatico", "receptores adrenergicos", "colinergico", "SNA"],
    unidad: "I8568",
    que: "Las dos divisiones del sistema autónomo, sus neurotransmisores y sus receptores, y el efecto de cada una sobre los órganos. El mapa de receptores es lo que después convierte la farmacología cardiovascular y respiratoria en algo deducible.",
    referencias: [
      { libro: "guyton", donde: "cap. 61, El sistema nervioso autónomo y la médula suprarrenal" },
      { libro: "katzung", donde: "sección de farmacología autonómica" },
    ],
    vecinos: ["sinapsis", "presion-arterial", "farmacodinamia"],
  },
  {
    slug: "medula-espinal",
    nombre: "Médula espinal y reflejos medulares",
    sinonimos: ["reflejo miotatico", "arco reflejo", "vias ascendentes", "via corticoespinal", "sindrome medular"],
    unidad: "I8568",
    que: "Organización de la médula en sustancia gris y blanca, las vías que suben y bajan por ella y los reflejos que se cierran a su nivel. Saber por dónde pasa y dónde se cruza cada vía es lo que permite localizar una lesión a partir de la exploración.",
    referencias: [
      { libro: "guyton", donde: "cap. 55, Funciones motoras de la médula espinal: los reflejos medulares" },
      { libro: "moore", donde: "capítulo de dorso" },
    ],
    vecinos: ["columna-vertebral", "tronco-encefalico", "plexos-nerviosos"],
  },
  {
    slug: "tronco-encefalico",
    nombre: "Tronco del encéfalo y control motor",
    sinonimos: ["bulbo", "protuberancia", "mesencefalo", "cerebelo", "ganglios basales"],
    unidad: "I8568",
    que: "Estructuras del tronco y su papel en el control postural, los reflejos vitales y el paso de todas las vías entre médula y encéfalo. La coincidencia de núcleos de pares craneales con vías largas es lo que hace tan localizadores los síndromes del tronco.",
    referencias: [
      { libro: "guyton", donde: "cap. 56 y 57, sobre control motor por corteza, tronco y cerebelo" },
    ],
    vecinos: ["pares-craneales", "medula-espinal"],
  },
  {
    slug: "inmunidad-innata",
    nombre: "Inmunidad innata",
    sinonimos: ["complemento", "fagocitosis", "receptores tipo Toll", "barreras", "respuesta inespecifica"],
    unidad: "I8571",
    que: "Primera línea de defensa, presente desde antes del contacto con el microorganismo: barreras, fagocitos, complemento y receptores que reconocen patrones comunes a familias enteras de patógenos. Es rápida y no genera memoria.",
    referencias: [
      { libro: "abbas", donde: "capítulo de inmunidad innata" },
      { libro: "levinson", donde: "sección de inmunología" },
    ],
    vecinos: ["inmunidad-adaptativa", "inflamacion"],
  },
  {
    slug: "inmunidad-adaptativa",
    nombre: "Inmunidad adaptativa: linfocitos T y B",
    sinonimos: ["linfocito T", "linfocito B", "anticuerpos", "MHC", "presentacion antigenica", "memoria inmunologica"],
    unidad: "I8571",
    que: "Respuesta específica frente a un antígeno concreto, con selección clonal, maduración y memoria. La presentación del antígeno por moléculas del complejo mayor de histocompatibilidad es el paso que decide qué tipo de linfocito responde.",
    referencias: [
      { libro: "abbas", donde: "capítulos de inmunidad celular y humoral" },
      { libro: "guyton", donde: "cap. 35, Resistencia del organismo a la infección: II" },
    ],
    vecinos: ["inmunidad-innata", "hipersensibilidad", "vacunas"],
  },
  {
    slug: "hipersensibilidad",
    nombre: "Reacciones de hipersensibilidad",
    sinonimos: ["alergia", "tipo I II III IV", "anafilaxia", "autoinmunidad"],
    unidad: "I8571",
    que: "Los cuatro tipos clásicos de respuesta inmunitaria dañina, clasificados por el mecanismo y no por la enfermedad. Distinguirlos permite predecir la latencia de la reacción y qué prueba diagnóstica tiene sentido.",
    referencias: [
      { libro: "abbas", donde: "capítulo de hipersensibilidad" },
      { libro: "robbins", donde: "cap. 6, Enfermedades del sistema inmunitario" },
    ],
    vecinos: ["inmunidad-adaptativa", "inflamacion"],
  },
];

/* ------------------------------------------------------------------ *
 * Bloque 4 · Agresión (patología general, microbiología)
 * ------------------------------------------------------------------ */

export const AGRESION: TemaCatalogo[] = [
  {
    slug: "lesion-celular",
    nombre: "Lesión celular reversible e irreversible",
    sinonimos: ["dano celular", "hipoxia", "isquemia", "radicales libres", "estres oxidativo"],
    unidad: "I8583",
    que: "Cómo responde la célula a una agresión y en qué punto el daño deja de poder revertirse. La pérdida de integridad de la membrana y el daño mitocondrial marcan el paso al terreno irreversible.",
    referencias: [
      { libro: "robbins", donde: "cap. 2, Respuestas celulares al estrés y las agresiones tóxicas" },
    ],
    vecinos: ["necrosis-apoptosis", "adaptaciones-celulares"],
  },
  {
    slug: "necrosis-apoptosis",
    nombre: "Necrosis y apoptosis",
    sinonimos: ["muerte celular", "patrones de necrosis", "caspasas", "necrosis coagulativa"],
    unidad: "I8583",
    que: "Las dos formas principales de muerte celular: una desordenada, con salida del contenido celular e inflamación, y otra programada y silenciosa. Los patrones de necrosis se reconocen al microscopio y orientan sobre la causa y el órgano.",
    referencias: [
      { libro: "robbins", donde: "cap. 2, Respuestas celulares al estrés y las agresiones tóxicas" },
      { libro: "ross", donde: "cap. 3, Núcleo celular: muerte celular" },
    ],
    vecinos: ["lesion-celular", "inflamacion"],
  },
  {
    slug: "adaptaciones-celulares",
    nombre: "Adaptaciones celulares",
    sinonimos: ["atrofia", "metaplasia", "displasia", "hiperplasia", "hipertrofia"],
    unidad: "I8583",
    que: "Cambios reversibles de tamaño, número o tipo celular con los que un tejido responde a una demanda mantenida. La displasia se sale de la lista porque ya no es una adaptación ordenada, y ahí empieza el camino hacia la neoplasia.",
    referencias: [
      { libro: "robbins", donde: "cap. 2, Respuestas celulares al estrés y las agresiones tóxicas" },
    ],
    vecinos: ["hipertrofia-vs-hiperplasia", "neoplasia", "lesion-celular"],
  },
  {
    slug: "inflamacion",
    nombre: "Inflamación aguda y crónica",
    sinonimos: ["inflamacion", "mediadores inflamatorios", "exudado", "granuloma", "signos cardinales"],
    unidad: "I8583",
    que: "Respuesta del tejido vascularizado a la agresión, con cambios de calibre y permeabilidad vascular y llegada de leucocitos. La aguda es rápida y dominada por neutrófilos; la crónica se prolonga, la protagonizan macrófagos y linfocitos, y coexiste con la reparación.",
    referencias: [
      { libro: "robbins", donde: "cap. 3, Inflamación y reparación" },
    ],
    vecinos: ["reparacion-tisular", "inmunidad-innata", "necrosis-apoptosis"],
  },
  {
    slug: "reparacion-tisular",
    nombre: "Reparación, cicatrización y fibrosis",
    sinonimos: ["cicatrizacion", "tejido de granulacion", "fibrosis", "regeneracion", "queloide"],
    unidad: "I8583",
    que: "Restitución del tejido dañado por regeneración o por sustitución con tejido fibroso. Cuál de las dos ocurre depende de la capacidad proliferativa del tejido y de si la matriz de sostén quedó intacta.",
    referencias: [
      { libro: "robbins", donde: "cap. 3, Inflamación y reparación" },
    ],
    vecinos: ["inflamacion", "tejido-conjuntivo", "hipertrofia-vs-hiperplasia"],
  },
  {
    slug: "trastornos-hemodinamicos",
    nombre: "Trastornos hemodinámicos, trombosis y embolia",
    sinonimos: ["trombosis", "embolia", "infarto", "triada de Virchow", "congestion", "shock"],
    unidad: "I8583",
    que: "Alteraciones del flujo, la coagulación y el volumen: trombosis, embolia, infarto y choque. La tríada de Virchow ordena las causas de trombosis en tres grupos y sigue siendo el esquema más útil para razonar el riesgo.",
    referencias: [
      { libro: "robbins", donde: "cap. 4, Trastornos hemodinámicos, enfermedad tromboembólica y shock" },
      { libro: "guyton", donde: "cap. 24, Shock circulatorio" },
    ],
    vecinos: ["hemostasia", "microcirculacion", "ateroesclerosis"],
  },
  {
    slug: "hemostasia",
    nombre: "Hemostasia y coagulación",
    sinonimos: ["cascada de la coagulacion", "plaquetas", "TP", "TTPa", "fibrinolisis", "hemostasia primaria"],
    unidad: "I8568",
    que: "Detención de una hemorragia en dos fases: el tapón plaquetario y su consolidación por la red de fibrina. Las pruebas de laboratorio exploran ramas distintas de la cascada, y por eso su alteración orienta hacia el factor deficitario.",
    referencias: [
      { libro: "guyton", donde: "cap. 37, Hemostasia y coagulación sanguínea" },
      { libro: "robbins", donde: "cap. 4 y cap. 14, sobre hemostasia y trastornos hemorrágicos" },
    ],
    vecinos: ["trastornos-hemodinamicos", "sangre-tejido"],
  },
  {
    slug: "neoplasia",
    nombre: "Neoplasia: bases de la oncología",
    sinonimos: ["cancer", "tumor", "oncogen", "gen supresor", "metastasis", "carcinogenesis", "benigno maligno"],
    unidad: "I8583",
    que: "Proliferación celular autónoma y sus bases moleculares: activación de oncogenes, pérdida de supresores, inmortalización y capacidad de invadir. Los criterios que separan un tumor benigno de uno maligno son morfológicos y de comportamiento, no una sola característica.",
    referencias: [
      { libro: "robbins", donde: "cap. 7, Neoplasias" },
    ],
    vecinos: ["ciclo-celular", "adaptaciones-celulares", "reparacion-del-adn"],
  },
  {
    slug: "ateroesclerosis",
    nombre: "Ateroesclerosis",
    sinonimos: ["aterosclerosis", "placa de ateroma", "arteriosclerosis", "disfuncion endotelial"],
    unidad: "I8583",
    que: "Enfermedad de la íntima arterial en la que se acumulan lípidos, células inflamatorias y tejido fibroso hasta formar una placa. Lo que produce el evento agudo no suele ser el grado de estenosis sino la rotura de la placa y la trombosis que la sigue.",
    referencias: [
      { libro: "robbins", donde: "cap. 11, Vasos sanguíneos" },
      { libro: "ross", donde: "cap. 13, Sistema cardiovascular" },
    ],
    vecinos: ["lipoproteinas", "trastornos-hemodinamicos", "hipertension-arterial"],
  },
  {
    slug: "bacterias-generalidades",
    nombre: "Bacterias: estructura y clasificación",
    sinonimos: ["gram positivo", "gram negativo", "pared bacteriana", "tincion de Gram", "endotoxina"],
    unidad: "I8581",
    que: "Organización de la célula bacteriana y qué explica su tinción, su resistencia y su patogenicidad. La diferencia en la pared entre grampositivas y gramnegativas condiciona desde el resultado de la tinción hasta la sensibilidad a los antibióticos.",
    referencias: [
      { libro: "levinson", donde: "sección de bacteriología básica" },
    ],
    vecinos: ["antibioticos", "inmunidad-innata"],
  },
  {
    slug: "virus-generalidades",
    nombre: "Virus: estructura y replicación",
    sinonimos: ["virion", "capside", "ciclo de replicacion viral", "ADN virus", "ARN virus"],
    unidad: "I8582",
    que: "Los virus no tienen metabolismo propio y dependen por completo de la maquinaria de la célula que infectan. Su clasificación por tipo de ácido nucleico y por presencia de envoltura predice cómo se replican y qué antivirales pueden actuar.",
    referencias: [
      { libro: "levinson", donde: "sección de virología básica" },
    ],
    vecinos: ["bacterias-generalidades", "inmunidad-adaptativa"],
  },
];

/* ------------------------------------------------------------------ *
 * Bloques 5 a 9 · Farmacología, salud pública y clínica
 * ------------------------------------------------------------------ */

export const CLINICA: TemaCatalogo[] = [
  {
    slug: "farmacocinetica",
    nombre: "Farmacocinética",
    sinonimos: ["absorcion distribucion metabolismo excrecion", "ADME", "vida media", "primer paso", "biodisponibilidad", "citocromo P450"],
    unidad: "I8570",
    que: "Lo que el organismo le hace al fármaco: cómo se absorbe, dónde se distribuye, cómo se transforma y cómo se elimina. La vida media y el aclaramiento son los dos parámetros que gobiernan el intervalo entre tomas y el tiempo hasta el estado estacionario.",
    referencias: [
      { libro: "katzung", donde: "capítulos de farmacocinética y biotransformación" },
    ],
    vecinos: ["farmacodinamia", "ph-pka-ionizacion", "quiralidad"],
  },
  {
    slug: "farmacodinamia",
    nombre: "Farmacodinamia",
    sinonimos: ["agonista", "antagonista", "curva dosis respuesta", "afinidad", "eficacia", "receptores"],
    unidad: "I8570",
    que: "Lo que el fármaco le hace al organismo: unión a su diana, relación entre dosis y efecto, y diferencia entre afinidad y eficacia. Los conceptos de agonista parcial y antagonista competitivo se entienden como desplazamientos de la curva dosis-respuesta.",
    referencias: [
      { libro: "katzung", donde: "capítulo de receptores farmacológicos y farmacodinámica" },
    ],
    vecinos: ["farmacocinetica", "sistema-nervioso-autonomo", "enzimas-cinetica"],
  },
  {
    slug: "antibioticos",
    nombre: "Antibióticos: mecanismos y resistencia",
    sinonimos: ["betalactamicos", "resistencia antibiotica", "espectro", "antimicrobianos"],
    unidad: "I8570",
    que: "Clasificación de los antimicrobianos por la estructura bacteriana que atacan y mecanismos por los que las bacterias dejan de responder a ellos. Corpus explica el mecanismo; qué antibiótico usar en cada caso se decide con guías vigentes y no con un texto de estudio.",
    referencias: [
      { libro: "katzung", donde: "sección de quimioterapia antimicrobiana" },
      { libro: "levinson", donde: "sección de fármacos antimicrobianos" },
    ],
    vecinos: ["bacterias-generalidades", "farmacodinamia"],
  },
  {
    slug: "medidas-epidemiologicas",
    nombre: "Medidas de frecuencia y de asociación",
    sinonimos: ["incidencia", "prevalencia", "riesgo relativo", "odds ratio", "epidemiologia"],
    unidad: "I8556",
    que: "Cómo se cuenta la enfermedad en una población y cómo se mide la fuerza de la relación entre una exposición y un resultado. Confundir incidencia con prevalencia o riesgo relativo con razón de momios cambia por completo la conclusión de un estudio.",
    referencias: [{ libro: "gordis", donde: "capítulos de medición de la enfermedad y de la asociación" }],
    vecinos: ["disenos-de-estudio", "pruebas-diagnosticas"],
  },
  {
    slug: "disenos-de-estudio",
    nombre: "Diseños de estudio epidemiológico",
    sinonimos: ["cohortes", "casos y controles", "ensayo clinico", "transversal", "sesgos", "confusion"],
    unidad: "I8556",
    que: "Los tipos de estudio ordenados por qué pregunta pueden responder y qué sesgos les amenazan. El diseño determina qué medidas de asociación se pueden calcular y hasta dónde llega la inferencia causal.",
    referencias: [{ libro: "gordis", donde: "capítulos de diseños de estudio y sesgos" }],
    vecinos: ["medidas-epidemiologicas", "pruebas-diagnosticas"],
  },
  {
    slug: "pruebas-diagnosticas",
    nombre: "Validez de una prueba diagnóstica",
    sinonimos: ["sensibilidad", "especificidad", "valor predictivo", "curva ROC", "razon de verosimilitud", "likelihood ratio"],
    unidad: "I8556",
    que: "Sensibilidad y especificidad describen la prueba; los valores predictivos describen lo que le pasa a un paciente concreto y dependen de la prevalencia. Esa dependencia es la razón por la que una prueba excelente puede ser inútil en una población de bajo riesgo.",
    referencias: [
      { libro: "gordis", donde: "capítulo de validez y fiabilidad de las pruebas diagnósticas" },
    ],
    vecinos: ["medidas-epidemiologicas", "disenos-de-estudio"],
  },
  {
    slug: "hipertension-arterial",
    nombre: "Hipertensión arterial",
    sinonimos: ["HTA", "presion alta", "hipertension esencial", "dano de organo blanco"],
    unidad: "I8595",
    que: "Elevación mantenida de la presión arterial y el daño que produce a largo plazo en corazón, riñón, cerebro y retina. Su fisiopatología se razona desde el control renal del volumen y desde la resistencia periférica; el manejo se rige por guías vigentes que hay que consultar en su fuente.",
    referencias: [
      { libro: "guyton", donde: "cap. 19, Función integrada de los sistemas de control de la presión arterial" },
      { libro: "robbins", donde: "cap. 11, Vasos sanguíneos" },
    ],
    vecinos: ["presion-arterial", "ley-de-laplace", "ateroesclerosis"],
  },
  {
    slug: "insuficiencia-cardiaca",
    nombre: "Insuficiencia cardíaca",
    sinonimos: ["IC", "fallo cardiaco", "fraccion de eyeccion reducida", "disfuncion diastolica", "congestion"],
    unidad: "I8594",
    que: "Incapacidad del corazón para mantener un gasto suficiente o para hacerlo sin elevar las presiones de llenado. Distinguir el fallo de vaciado del de llenado ordena la clínica, la exploración y las pruebas.",
    referencias: [
      { libro: "guyton", donde: "cap. 22, Insuficiencia cardíaca" },
      { libro: "robbins", donde: "cap. 12, Corazón" },
    ],
    vecinos: ["gasto-cardiaco", "ley-de-laplace", "hipertrofia-vs-hiperplasia"],
  },
  {
    slug: "arritmias",
    nombre: "Arritmias cardíacas",
    sinonimos: ["fibrilacion auricular", "bloqueo AV", "taquicardia", "bradicardia", "reentrada"],
    unidad: "I8594",
    que: "Alteraciones del ritmo por fallo en la generación del impulso o en su conducción. Los mecanismos —automatismo anómalo, reentrada y actividad desencadenada— explican por qué unas arritmias responden a unas maniobras y otras no.",
    referencias: [
      { libro: "guyton", donde: "cap. 13, Arritmias cardíacas y su interpretación electrocardiográfica" },
    ],
    vecinos: ["electrocardiograma", "sistema-de-conduccion"],
  },
  {
    slug: "diabetes-mellitus",
    nombre: "Diabetes mellitus",
    sinonimos: ["diabetes tipo 1", "diabetes tipo 2", "hiperglucemia", "complicaciones cronicas", "cetoacidosis"],
    unidad: "I8598",
    que: "Grupo de trastornos con hiperglucemia mantenida por déficit de insulina, resistencia a su acción, o ambos. Las complicaciones crónicas se agrupan en microvasculares y macrovasculares, y su mecanismo se apoya en el daño que produce la glucosa elevada de forma sostenida.",
    referencias: [
      { libro: "guyton", donde: "cap. 79, Insulina, glucagón y diabetes mellitus" },
      { libro: "robbins", donde: "cap. 24, Sistema endocrino" },
    ],
    vecinos: ["insulina-glucagon", "ayuno-metabolico", "cetogenesis"],
  },
  {
    slug: "anemia",
    nombre: "Anemias: clasificación y enfoque",
    sinonimos: ["anemia ferropenica", "anemia megaloblastica", "VCM", "hemolisis", "reticulocitos"],
    unidad: "I8601",
    que: "Descenso de la masa de hemoglobina, clasificado por el tamaño del eritrocito y por si la médula responde o no. Ese doble eje —volumen corpuscular y recuento de reticulocitos— reduce un diagnóstico diferencial enorme a unas pocas ramas.",
    referencias: [
      { libro: "guyton", donde: "cap. 33, Eritrocitos, anemia y policitemia" },
      { libro: "robbins", donde: "cap. 14, Trastornos de los eritrocitos" },
    ],
    vecinos: ["sangre-tejido", "transporte-de-gases", "vitaminas-y-cofactores"],
  },
  {
    slug: "insuficiencia-respiratoria",
    nombre: "Insuficiencia respiratoria",
    sinonimos: ["hipoxemia", "hipercapnia", "tipo 1 tipo 2", "gasometria arterial"],
    unidad: "I8592",
    que: "Fallo del sistema respiratorio para oxigenar la sangre, para eliminar CO₂, o para ambas cosas. Separar los dos problemas es el primer paso, porque sus causas y sus mecanismos son distintos.",
    referencias: [
      { libro: "guyton", donde: "cap. 43, Insuficiencia respiratoria: fisiopatología, diagnóstico, oxigenoterapia" },
    ],
    vecinos: ["intercambio-gaseoso", "equilibrio-acido-base", "ventilacion-pulmonar"],
  },
  {
    slug: "semiologia-general",
    nombre: "Semiología: la exploración como método",
    sinonimos: ["propedeutica", "anamnesis", "exploracion fisica", "inspeccion palpacion percusion auscultacion"],
    unidad: "I8585",
    que: "El método de obtener información del paciente mediante la entrevista y la exploración, y cómo se convierte en hipótesis diagnósticas. Es la unidad de la carrera que menos se puede aprender en pantalla: cada maniobra requiere manos y pacientes reales.",
    referencias: [
      { libro: "moore", donde: "apartados de anatomía de superficie de cada región" },
    ],
    vecinos: ["pruebas-diagnosticas", "pares-craneales"],
  },
];

/* Entradas que cierran los enlaces cruzados del resto del catálogo. */
export const COMPLEMENTOS: TemaCatalogo[] = [
  {
    slug: "mitocondria",
    nombre: "Mitocondria",
    sinonimos: ["crestas mitocondriales", "ADN mitocondrial", "herencia materna", "enfermedades mitocondriales"],
    unidad: "I8555",
    que: "Orgánulo de doble membrana donde ocurre la fosforilación oxidativa, con la membrana interna plegada en crestas para ampliar la superficie disponible. Conserva ADN propio de herencia materna y en muchas copias por célula, lo que explica la variabilidad de las enfermedades mitocondriales.",
    referencias: [
      { libro: "ross", donde: "cap. 2, Citoplasma celular: orgánulos membranosos" },
      { libro: "alberts", donde: "capítulo de conversión de energía: mitocondrias" },
    ],
    vecinos: ["fosforilacion-oxidativa", "biologia-celular", "beta-oxidacion"],
  },
  {
    slug: "ciclo-celular",
    nombre: "Ciclo celular y sus puntos de control",
    sinonimos: ["mitosis", "fase S", "ciclinas", "CDK", "G0", "puntos de control"],
    unidad: "I8555",
    que: "Secuencia ordenada por la que una célula duplica su contenido y se divide, con puntos de control que impiden avanzar si hay daño o la fase previa no se completó. El motor son las ciclinas y sus quinasas dependientes, y el fallo de los frenos es una de las vías centrales hacia el cáncer.",
    referencias: [
      { libro: "ross", donde: "cap. 3, Núcleo celular: ciclo celular" },
      { libro: "alberts", donde: "capítulo de ciclo de división celular" },
      { libro: "robbins", donde: "cap. 7, Neoplasias" },
    ],
    vecinos: ["biologia-celular", "neoplasia", "meiosis-mitosis", "reparacion-del-adn"],
  },
  {
    slug: "meiosis-mitosis",
    nombre: "Mitosis y meiosis",
    sinonimos: ["division celular", "profase", "metafase", "anafase", "entrecruzamiento", "crossing over"],
    unidad: "I8555",
    que: "Las dos formas de división: una que produce dos células idénticas a la original y otra que reduce a la mitad el número de cromosomas y genera variabilidad. El entrecruzamiento y la separación al azar de los homólogos ocurren solo en la meiosis y son la fuente de esa variabilidad.",
    referencias: [
      { libro: "ross", donde: "cap. 3, Núcleo celular: ciclo celular y división" },
      { libro: "alberts", donde: "capítulos de división celular y meiosis" },
    ],
    vecinos: ["ciclo-celular", "gametogenesis", "aneuploidias"],
  },
  {
    slug: "aneuploidias",
    nombre: "Aneuploidías y alteraciones cromosómicas",
    sinonimos: ["trisomia", "monosomia", "cariotipo", "no disyuncion", "sindrome de Down", "translocacion"],
    unidad: "I8579",
    que: "Alteraciones en el número o la estructura de los cromosomas, la mayoría por fallo en la separación durante la meiosis. El cariotipo sigue siendo la prueba que las muestra, y el tipo de alteración condiciona el riesgo de recurrencia familiar.",
    referencias: [
      { libro: "robbins", donde: "cap. 5, Trastornos genéticos" },
      { libro: "langman", donde: "capítulo de defectos congénitos" },
    ],
    vecinos: ["meiosis-mitosis", "herencia-mendeliana", "gametogenesis"],
  },
  {
    slug: "herencia-mendeliana",
    nombre: "Patrones de herencia",
    sinonimos: ["autosomica dominante", "autosomica recesiva", "ligada al X", "penetrancia", "expresividad", "arbol genealogico"],
    unidad: "I8579",
    que: "Los modos en que una característica o una enfermedad se transmite en una familia, y cómo se reconocen en un árbol genealógico. Penetrancia incompleta y expresividad variable son las dos razones por las que un patrón claro puede parecer irregular.",
    referencias: [
      { libro: "robbins", donde: "cap. 5, Trastornos genéticos" },
    ],
    vecinos: ["mutaciones", "aneuploidias"],
  },
  {
    slug: "amiloidosis",
    nombre: "Amiloidosis y enfermedades por plegamiento",
    sinonimos: ["amiloide", "rojo Congo", "birrefringencia verde manzana", "proteinas mal plegadas"],
    unidad: "I8583",
    que: "Depósito extracelular de proteínas mal plegadas en forma de fibrillas que alteran la función del órgano donde se acumulan. Se identifica por su afinidad por el rojo Congo y su birrefringencia característica bajo luz polarizada.",
    referencias: [
      { libro: "robbins", donde: "cap. 6, Enfermedades del sistema inmunitario" },
    ],
    vecinos: ["estructura-de-proteinas", "lesion-celular"],
  },
  {
    slug: "cardiopatias-congenitas",
    nombre: "Cardiopatías congénitas",
    sinonimos: ["comunicacion interventricular", "CIA", "CIV", "ductus", "tetralogia de Fallot", "cortocircuito"],
    unidad: "I8594",
    que: "Malformaciones del corazón y los grandes vasos presentes al nacer, agrupadas según produzcan un cortocircuito de izquierda a derecha, de derecha a izquierda, o una obstrucción. La dirección del cortocircuito es lo que decide si hay cianosis, y se deduce de las presiones.",
    referencias: [
      { libro: "robbins", donde: "cap. 12, Corazón" },
      { libro: "langman", donde: "capítulo de sistema cardiovascular" },
      { libro: "guyton", donde: "cap. 23, cardiopatías valvulares y congénitas" },
    ],
    vecinos: ["placenta", "ciclo-cardiaco", "gasto-cardiaco"],
  },
  {
    slug: "vacunas",
    nombre: "Vacunas y memoria inmunitaria",
    sinonimos: ["inmunizacion", "vacuna", "inmunidad de rebano", "adyuvante", "respuesta secundaria"],
    unidad: "I8571",
    que: "Cómo una exposición controlada a un antígeno genera memoria capaz de responder más rápido y con más fuerza en el encuentro real. Los esquemas y las indicaciones concretas se rigen por los programas de vacunación vigentes, que hay que consultar en su fuente oficial.",
    referencias: [
      { libro: "abbas", donde: "capítulo de inmunidad frente a microorganismos y vacunación" },
      { libro: "levinson", donde: "sección de inmunología: vacunas" },
    ],
    vecinos: ["inmunidad-adaptativa", "inmunidad-innata"],
  },
];

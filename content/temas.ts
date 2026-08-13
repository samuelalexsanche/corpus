export interface RecallPrompt { pregunta: string; referencia: string; pistas: string[] }
export interface Prediccion { escenario: string; pregunta: string; respuesta: string }
export interface ErrorComun { error: string; correccion: string }
export interface Tarjeta { front: string; back: string }
export interface FAQ { q: string; a: string }
export interface Seccion { titulo: string; cuerpo: string[] }

import type { CircuitoDatos } from "@/lib/circuito";

export interface Tema {
  slug: string;
  titulo: string;
  tituloSEO: string;
  bloque: string;
  unidad: string;
  nivel: "fundamento" | "mecanismo" | "clinico";
  minutos: number;
  resumen: string;
  porQueImporta: string;
  secciones: Seccion[];
  analogia?: { campo: string; texto: string; dondeSeRompe: string };
  /**
   * Circuito de regulación del tema. Se dibuja con una pieza tapada: un diagrama del
   * mecanismo completo sería la respuesta disfrazada.
   */
  diagrama?: CircuitoDatos;
  /** Slug de una figura anotada de `figuras.ts`. */
  figura?: string;
  recall: RecallPrompt[];
  predicciones?: Prediccion[];
  errores: ErrorComun[];
  tarjetas: Tarjeta[];
  faq: FAQ[];
  fuentes: string[];
  relacionados: string[];
  deudaPractica?: string;
}

export const TEMAS: Tema[] = [
  {
    slug: "retroalimentacion-negativa",
    titulo: "Retroalimentación negativa: el circuito que sostiene la fisiología",
    tituloSEO: "Retroalimentación negativa en fisiología: receptor, centro integrador, punto de ajuste y efector",
    bloque: "andamiaje",
    unidad: "B0.5 · Cómo el cuerpo se corrige a sí mismo",
    nivel: "fundamento",
    minutos: 18,
    resumen:
      "Las cuatro piezas de un circuito de regulación —receptor, centro integrador, punto de ajuste y efector— y por qué el error, no la medición, es la única señal que el sistema realmente ve. Es el andamio sobre el que se apoya toda la fisiología.",
    porQueImporta:
      "Casi todo lo que un cuerpo hace para mantenerse vivo es un circuito de regulación. Temperatura, glucosa, presión arterial, pH, osmolaridad, calcio, hormonas tiroideas: todos funcionan igual. Aprender el patrón una vez ahorra memorizar veinte veces lo mismo con nombres distintos. Y en patología, la pregunta que más rendimiento da es siempre la misma: ¿se rompió una pieza, o alguien movió el objetivo?",
    secciones: [
      {
        titulo: "Las cuatro piezas",
        cuerpo: [
          "Piensa en un termostato. Le pones 22 °C, hace calor, arranca el aire; el cuarto se enfría, se apaga; sube la temperatura, vuelve a arrancar. Se queda oscilando alrededor de 22 indefinidamente. Para que eso funcione tienen que existir cuatro elementos, y son los mismos cuatro en cualquier sistema fisiológico.",
          "El **sensor** mide la variable. El termómetro; en el cuerpo, los barorreceptores del seno carotídeo, los quimiorreceptores centrales, las células beta del páncreas que leen la glucosa.",
          "El **centro integrador** decide qué hacer. La placa del termostato; en el cuerpo, casi siempre un núcleo del hipotálamo o del tronco encefálico.",
          "El **punto de ajuste** —el *punto de ajuste* de los libros— es el valor al que el cuerpo apunta. El 22. No es parte del centro integrador aunque viva dentro de él: es un parámetro separado, y en cuanto lo separas puedes hacer la pregunta que importa —¿quién lo fija y puede moverse?",
          "El **efector** ejecuta la corrección. El compresor y los ventiladores; en el cuerpo, un músculo, una glándula, un vaso que se contrae.",
        ],
      },
      {
        titulo: "El error es lo único que el sistema ve",
        cuerpo: [
          "Aquí está el paso que casi todo el mundo salta. El centro integrador no actúa sobre la medición. Actúa sobre la **diferencia entre la medición y el punto de ajuste**, y esa diferencia se llama error.",
          "La distinción no es cosmética. Si programas el termostato como «si la temperatura es igual a 22, enciende», enciendes exactamente cuando ya llegaste. Lo correcto es comparar: si la temperatura está *por encima* del objetivo, enfría; si está por debajo, calienta; si el error es cero, no hagas nada.",
          "Se llama retroalimentación **negativa** precisamente por eso: la respuesta va siempre en dirección contraria al error, con el fin de anularlo. Un sistema con retroalimentación positiva hace lo opuesto —amplifica su propia desviación— y por eso en el cuerpo es raro y casi siempre transitorio: la coagulación, el pico de LH que dispara la ovulación, las contracciones del parto. Una retroalimentación positiva sin freno se dispara sola hasta que algo la detiene.",
        ],
      },
      {
        titulo: "Fuerza de la respuesta, retraso y por qué el cuerpo a veces oscila",
        cuerpo: [
          "Dos rasgos deciden cómo se comporta un circuito de regulación. La **fuerza de la respuesta** es cuánto reacciona el efector por cada unidad de error: una respuesta fuerte corrige de forma enérgica. El **retraso** es cuánto tarda el cuerpo en enterarse del efecto de su propia corrección.",
          "Una respuesta fuerte con un retraso largo produce oscilación. El cuerpo corrige de más porque todavía no ve el resultado de lo que ya hizo, luego corrige de más en sentido contrario, y así. Esto no es teoría abstracta: la respiración de Cheyne-Stokes en la insuficiencia cardíaca es exactamente eso —el tiempo de circulación se alarga, el control respiratorio se entera tarde de la PCO₂ real y la ventilación empieza a oscilar en ciclos de crescendo y decrescendo.",
          "Cuando veas algo que oscila en el cuerpo, sospecha antes de una respuesta demasiado fuerte con retraso que de una pieza rota.",
        ],
      },
    ],
    analogia: {
      campo: "El termostato de una casa",
      texto:
        "Un termostato mide la temperatura del cuarto, la compara con la que le pusiste y enciende o apaga el aire según la diferencia. Las cuatro piezas están todas ahí: el termómetro que mide, la placa que decide, el número que le fijaste y el aparato que enfría. Un circuito fisiológico hace lo mismo con otras piezas.",
      dondeSeRompe:
        "Un termostato lo diseñó alguien de una pieza y el cuerpo no. Aquí un mismo efector sirve a varios circuitos que quieren cosas distintas —la vasoconstricción de la piel sirve a la temperatura y a la presión arterial a la vez, y a veces no puede satisfacer a las dos—, el punto de ajuste no es fijo sino que se mueve con el contexto, y hay circuitos enlazados entre sí de formas que nadie habría elegido a propósito. La analogía te da la estructura; no te promete que el resultado sea ordenado."
    },
    diagrama: {
      variable: "Temperatura central",
      setPoint: "37 °C",
      sensor: "Termorreceptores",
      centroIntegrador: "Hipotálamo",
      efector: "Músculo, piel, vasos",
      correccion: "genera o disipa calor",
      estimulo: "Ambiente frío",
      incognita: "centroIntegrador",
      aceptadas: ["hipotálamo", "area preoptica del hipotalamo", "centro termorregulador", "nucleo hipotalamico"],
    },
    recall: [
      {
        pregunta: "Reconstruye de memoria las cuatro piezas de un circuito de retroalimentación negativa y explica qué señal conecta al centro integrador con el efector.",
        referencia:
          "Sensor (mide la variable), centro integrador (decide), punto de ajuste (el valor de referencia) y efector (ejecuta la corrección). La señal que las conecta es el ERROR = medición − punto de ajuste. El centro integrador nunca actúa sobre la medición sola, siempre sobre la diferencia. Se llama negativa porque la respuesta se opone al error para anularlo.",
        pistas: ["Empieza por lo que mide y termina por lo que actúa", "¿El centro integrador ve el valor absoluto o una diferencia?"],
      },
      {
        pregunta: "Explica sin ver nada por qué un circuito de regulación puede oscilar aunque todas sus piezas funcionen bien.",
        referencia:
          "Por la combinación de una respuesta muy enérgica y un retraso. El cuerpo corrige con fuerza antes de poder observar el efecto de su corrección previa, se pasa, y luego se pasa en sentido contrario. Ninguna pieza está rota: el problema es dinámico. Ejemplo clínico: respiración de Cheyne-Stokes por tiempo de circulación prolongado.",
        pistas: ["¿Qué pasa si actúas fuerte y te enteras tarde?"],
      },
    ],
    predicciones: [
      {
        escenario: "Un fármaco bloquea el sensor de un circuito de regulación sin tocar nada más.",
        pregunta: "¿Qué le pasa a la variable regulada?",
        respuesta:
          "El controlador deja de recibir información y calcula el error contra un dato falso o ausente. La variable queda sin regular y deriva libremente hacia donde la empujen las predicciones externas. No es que el efector falle: es que el sistema quedó operando a ciegas, en lazo abierto.",
      },
      {
        escenario: "La respuesta de un circuito se vuelve el doble de enérgica y además ese circuito ya venía con un retraso importante.",
        pregunta: "¿Mejora o empeora el control?",
        respuesta:
          "Empeora. Más ganancia sobre un retraso existente aumenta la sobrecorrección y puede llevar el sistema de una oscilación amortiguada a una sostenida o creciente. La intuición de que 'corregir más fuerte es corregir mejor' es falsa en cualquier sistema con retraso.",
      },
    ],
    errores: [
      {
        error: "Creer que el centro integrador responde al valor de la variable.",
        correccion: "Responde al error: la diferencia contra el punto de ajuste. Un mismo valor de glucosa produce respuestas opuestas según cuál sea el objetivo en ese momento.",
      },
      {
        error: "Asumir que si una variable está anormal, algo está roto.",
        correccion: "Puede que el punto de ajuste se haya movido a propósito. La fiebre es el ejemplo canónico: nada falla, el objetivo cambió.",
      },
      {
        error: "Tratar retroalimentación positiva como sinónimo de 'buena'.",
        correccion: "En control, positivo y negativo describen la dirección de la respuesta, no si es deseable. La retroalimentación negativa es la que estabiliza.",
      },
    ],
    tarjetas: [
      { front: "¿Sobre qué señal actúa el centro integrador de un circuito de regulación?", back: "Sobre el error = medición − punto de ajuste. Nunca sobre la medición sola." },
      { front: "¿Por qué se llama negativa la retroalimentación negativa?", back: "Porque la respuesta va en dirección opuesta al error, para anularlo." },
      { front: "¿Qué combinación de parámetros hace oscilar un circuito de regulación?", back: "Una respuesta fuerte con un retraso largo: se sobrecorrige porque aún no se ve el efecto de la corrección previa." },
      { front: "Nombra tres ejemplos de retroalimentación POSITIVA en fisiología humana.", back: "Cascada de la coagulación, pico de LH que dispara la ovulación, y contracciones uterinas en el parto. Todas transitorias y con un freno definido." },
    ],
    faq: [
      { q: "¿Qué es la retroalimentación negativa en fisiología?", a: "Es el mecanismo por el cual un sistema corporal mide una variable, la compara con un valor de referencia (punto de ajuste) y actúa en dirección opuesta a la desviación para devolverla al objetivo. Es el principio que sostiene la homeostasis." },
      { q: "¿Cuál es la diferencia entre retroalimentación positiva y negativa?", a: "La negativa se opone al cambio y estabiliza el sistema; es la regla en fisiología. La positiva amplifica el cambio y es rara, transitoria y siempre con un mecanismo de terminación: coagulación, ovulación y parto son los tres ejemplos clásicos." },
      { q: "¿Qué es un punto de ajuste en el cuerpo humano?", a: "Es el valor de referencia que el organismo intenta mantener para una variable dada. No es fijo: puede desplazarse deliberadamente, como ocurre con la temperatura durante la fiebre." },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, cap. 1: «Organización funcional del cuerpo humano y control del medio interno»",
      "Ganong, Fisiología médica, sección de principios generales",
    ],
    relacionados: ["fiebre-vs-hipertermia", "hipertrofia-vs-hiperplasia"],
  },

  {
    slug: "fiebre-vs-hipertermia",
    titulo: "Fiebre e hipertermia: el mismo número, mecanismos opuestos",
    tituloSEO: "Diferencia entre fiebre e hipertermia: mecanismo, punto de ajuste y por qué el antipirético no sirve en golpe de calor",
    bloque: "funcion",
    unidad: "I8568 · Fisiología médica",
    nivel: "mecanismo",
    minutos: 15,
    resumen:
      "Dos pacientes con 39 °C pueden tener problemas opuestos. En la fiebre el punto de ajuste subió y la regulación está intacta; en la hipertermia el punto de ajuste es normal y el efector está rebasado. La distinción cambia por completo el tratamiento.",
    porQueImporta:
      "Es el ejemplo más limpio de una regla que se aplica a toda la fisiopatología: antes de asumir que un sistema falló, pregunta si el objetivo se movió. Además tiene consecuencia terapéutica inmediata y potencialmente letal: dar paracetamol a un golpe de calor y esperar retrasa el único tratamiento que funciona, que es el enfriamiento físico.",
    secciones: [
      {
        titulo: "La fiebre no es una falla",
        cuerpo: [
          "Cuando hay una infección, unas moléculas llamadas pirógenos —algunas provienen del microorganismo, otras las produce el propio sistema inmune— llegan al hipotálamo y **elevan el punto de ajuste térmico** de forma deliberada, digamos de 37 a 39 °C.",
          "A partir de ese instante el cuerpo está a 37 con un objetivo de 39. El error es negativo, o sea: hace frío. Y el sistema hace exactamente lo que debe hacer un circuito de retroalimentación negativa bien construido —tirita para generar calor, contrae los vasos de la piel para no perderlo, y produce la sensación subjetiva de frío para que el individuo se tape.",
          "Por eso alguien con 39 °C de fiebre tirita bajo tres cobijas. No es el cuerpo descompuesto: es el cuerpo obedeciendo. El termostato no se rompió, alguien le movió la perilla.",
        ],
      },
      {
        titulo: "La hipertermia sí es una falla",
        cuerpo: [
          "Ahora un obrero bajo el sol durante horas, sin sombra ni agua. También llega con 39 °C. Pero su punto de ajuste sigue en 37: el hipotálamo quiere enfriarlo y está mandando todas las órdenes correctas.",
          "El problema está en el efector, y conviene ser preciso con la palabra: no está **roto**, está **saturado**. Sudar y vasodilatar funcionan al máximo y aun así no alcanzan, porque la carga térmica externa supera la capacidad de disipación. Un componente roto no responde; uno saturado responde a tope y pierde igual.",
          "De ahí la consecuencia terapéutica. Un antipirético actúa bajando el punto de ajuste. En la fiebre eso tiene sentido porque el punto de ajuste está elevado. En el golpe de calor el punto de ajuste ya es normal, así que el fármaco no tiene nada que corregir: hay que enfriar por fuera —hielo, agua, sombra, retirar ropa— y hacerlo rápido.",
        ],
      },
    ],
    analogia: {
      campo: "Sistemas de control",
      texto: "En la fiebre alguien movió el número al que apunta el termostato y el resto del circuito funciona. En la hipertermia el número sigue igual y lo que falla es que el aparato de enfriar, trabajando al máximo, no da abasto contra el calor que entra.",
      dondeSeRompe:
        "La analogía sugiere que basta con distinguir dos casos limpios, y la clínica es más sucia: la hipertermia maligna por anestésicos y el síndrome neuroléptico maligno son cuadros de producción descontrolada de calor a nivel muscular, no encajan del todo en ninguna de las dos casillas y tienen tratamiento propio.",
    },
    diagrama: {
      variable: "Temperatura central",
      setPoint: "Elevado a 39 °C",
      sensor: "Termorreceptores",
      centroIntegrador: "Hipotálamo",
      efector: "Tiritona y vasoconstricción",
      correccion: "genera y retiene calor",
      estimulo: "Pirógenos",
      incognita: "setPoint",
      aceptadas: ["elevado", "subido", "mas alto", "39"],
    },
    recall: [
      {
        pregunta: "Explica en frío, sin ver nada, por qué un paciente con 39 °C de fiebre siente frío y tirita.",
        referencia:
          "Los pirógenos elevaron el punto de ajuste hipotalámico por encima de la temperatura corporal actual. Eso genera un error negativo: el cuerpo interpreta que está por debajo de su objetivo. La respuesta correcta de un circuito de retroalimentación negativa ante ese error es generar calor (tiritar), conservarlo (vasoconstricción cutánea) y motivar conducta de abrigo (sensación de frío). El sistema no está fallando: está persiguiendo un objetivo nuevo.",
        pistas: ["¿Cuál es el signo del error si el objetivo subió y la temperatura no?"],
      },
      {
        pregunta: "Un paciente llega con 39 °C. Enumera qué preguntarías para distinguir fiebre de hipertermia y justifica cada pregunta por el mecanismo.",
        referencia:
          "Contexto de exposición (calor ambiental, ejercicio, encierro en vehículo) porque apunta a carga térmica externa; estado de la piel (sudoración presente y piel húmeda apunta a esfuerzo del efector; piel seca y caliente sugiere efector agotado en golpe de calor clásico); presencia de escalofríos y sensación de frío, que indican punto de ajuste elevado; datos de infección; fármacos y anestésicos recientes por hipertermia maligna y síndrome neuroléptico maligno; y estado neurológico, porque la alteración del sensorio marca gravedad en golpe de calor.",
        pistas: ["Piensa en qué pieza del circuito interroga cada pregunta"],
      },
    ],
    predicciones: [
      {
        escenario: "Se administra un antipirético a un paciente con golpe de calor.",
        pregunta: "¿Qué se espera que ocurra con la temperatura?",
        respuesta:
          "Prácticamente nada. El antipirético baja el punto de ajuste, y en el golpe de calor el punto de ajuste ya está en su valor normal: no hay nada que bajar. La temperatura sigue elevada porque la causa es carga térmica externa sobre un efector saturado. El riesgo real no es la ineficacia sino la demora del enfriamiento físico, que es tiempo-dependiente.",
      },
      {
        escenario: "Un paciente con fiebre alta se cubre con más cobijas durante la fase de escalofrío.",
        pregunta: "¿Está empeorando su cuadro?",
        respuesta:
          "Está colaborando con lo que su sistema pidió: mientras el punto de ajuste esté por encima de la temperatura actual, el organismo busca ganar calor y la conducta de abrigo forma parte de la respuesta. Cuando el punto de ajuste vuelva a bajar —espontáneamente o por antipirético— se invertirá el error, aparecerá sudoración y el paciente se destapará solo.",
      },
    ],
    errores: [
      { error: "Decir que en la fiebre «el termostato está descompuesto».", correccion: "Está intacto y funcionando con precisión. Lo que cambió es su valor de referencia." },
      { error: "Tratar toda temperatura elevada con antipirético.", correccion: "El antipirético solo actúa si el punto de ajuste está elevado. En hipertermia el tratamiento es enfriamiento físico." },
      { error: "Llamar «roto» al efector en la hipertermia.", correccion: "Está saturado: trabajando al máximo y aun así insuficiente. Roto es no responder; saturado es responder a tope y perder." },
    ],
    tarjetas: [
      { front: "¿En qué se diferencian fiebre e hipertermia?", back: "Fiebre: punto de ajuste elevado, regulación intacta. Hipertermia: punto de ajuste normal, efector rebasado. Mismo número en el termómetro, mecanismos y tratamientos opuestos." },
      { front: "¿Por qué un antipirético no sirve en el golpe de calor?", back: "Porque baja el punto de ajuste, y en el golpe de calor el punto de ajuste ya está normal. El tratamiento es enfriamiento físico externo." },
      { front: "¿Qué diferencia hay entre un efector roto y uno saturado?", back: "Roto: no responde. Saturado: responde al máximo y aun así no alcanza. La distinción cambia el tratamiento." },
    ],
    faq: [
      { q: "¿Cuál es la diferencia entre fiebre e hipertermia?", a: "En la fiebre el hipotálamo eleva deliberadamente el punto de ajuste térmico en respuesta a pirógenos, y la termorregulación permanece intacta. En la hipertermia el punto de ajuste es normal, pero los mecanismos de disipación de calor están rebasados por carga térmica externa o producción excesiva. Se ven igual en el termómetro y requieren tratamientos distintos." },
      { q: "¿Por qué tiemblo si tengo fiebre alta?", a: "Porque el punto de ajuste subió por encima de tu temperatura actual. Tu cuerpo interpreta que está frío respecto a su nuevo objetivo, así que tirita para generar calor y contrae los vasos de la piel para conservarlo." },
      { q: "¿Sirve el paracetamol para el golpe de calor?", a: "No. Los antipiréticos actúan bajando un punto de ajuste elevado, y en el golpe de calor el punto de ajuste ya es normal. El tratamiento es enfriamiento físico rápido. Es una urgencia médica: se requiere atención inmediata." },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, capítulo de regulación de la temperatura corporal",
      "Robbins y Cotran, Patología estructural y funcional, sección de lesión por agentes físicos",
    ],
    relacionados: ["retroalimentacion-negativa", "hipertrofia-vs-hiperplasia"],
    deudaPractica:
      "Reconocer un golpe de calor en la vida real implica valorar estado de conciencia, perfusión y piel con las manos y los ojos. Eso no se aprende en pantalla.",
  },

  {
    slug: "hipertrofia-vs-hiperplasia",
    titulo: "Hipertrofia e hiperplasia: por qué el tejido no elige",
    tituloSEO: "Diferencia entre hipertrofia e hiperplasia: mecanismo, capacidad proliferativa y ejemplos clínicos",
    bloque: "agresion",
    unidad: "I8583 · Patología",
    nivel: "mecanismo",
    minutos: 16,
    resumen:
      "Hipertrofia es aumento del tamaño de cada célula; hiperplasia es aumento del número de células. Cuál de las dos ocurre no lo decide el estímulo: lo decide si las células de ese tejido todavía pueden dividirse.",
    porQueImporta:
      "Es una de las distinciones que más se confunden y que más rinde cuando se entiende, porque convierte una lista de ejemplos memorizados en una sola regla deducible. Además explica por qué el corazón cicatriza tras un infarto y el músculo entrenado no, y por qué las secuelas neurológicas son permanentes.",
    secciones: [
      {
        titulo: "Los morfemas ya lo dicen",
        cuerpo: [
          "Comparten el prefijo *hiper-*, exceso. Difieren en el sufijo, y ahí está toda la información. *-trofia* viene del griego **trophḗ**, nutrición, y habla del **tamaño** de la célula. *-plasia* viene de **plássein**, formar o moldear, y habla de la **formación** de células nuevas, es decir del número.",
          "Desde fuera ambos procesos producen lo mismo: un órgano más grande. La diferencia está en el mecanismo, y el mecanismo tiene consecuencias distintas.",
        ],
      },
      {
        titulo: "La regla que lo ordena todo",
        cuerpo: [
          "Un músculo esquelético entrenado se hipertrofia y nunca hace hiperplasia. La razón no es que el músculo «prefiera» engordar sus fibras: es que **no tiene la otra opción disponible**.",
          "La fibra de músculo esquelético es post-mitótica: salió del ciclo celular de forma permanente. Y hay una razón arquitectónica preciosa detrás: la fibra se formó durante el desarrollo por fusión de muchas células precursoras, de modo que es una sola célula gigante con cientos de núcleos. La mitosis exige que **un** núcleo duplique sus cromosomas y los reparta en dos células hijas. Con cientos de núcleos, esa operación sencillamente no tiene cómo ejecutarse.",
          "De ahí la regla general: **la capacidad proliferativa del tejido determina qué respuesta de crecimiento está siquiera disponible.** Si las células se pueden dividir, la hiperplasia es posible. Si no, solo queda la hipertrofia. No son dos fenómenos que compiten: son dos ramas de un árbol donde la biología del tejido ya escogió.",
        ],
      },
      {
        titulo: "El disparador es la carga, no el daño",
        cuerpo: [
          "El mito de gimnasio dice que el músculo crece porque se desgarra y se repara con exceso. La señal causal es otra: **la tensión mecánica**. Sensores en la membrana y el citoesqueleto convierten la fuerza física en señal química, esa señal activa una cascada cuyo nodo central es mTOR —regulador maestro de la síntesis proteica— y la fibra fabrica más actina y miosina, que se ensamblan como unidades contráctiles nuevas dentro de la misma célula.",
          "Fuerza física → señal química → más síntesis de proteínas → más maquinaria contráctil. El microdaño ocurre y contribuye activando reparación e inflamación, pero no es el requisito. Es un área de investigación activa, no un hecho cerrado, y conviene decirlo así.",
          "Un matiz honesto sobre el andamio: la fibra no se divide, pero tiene vecinas. Las **células satélite** son células madre adyacentes que sí se dividen y pueden fusionarse a la fibra donándole núcleos. La fibra sigue siendo una sola célula que nunca se dividió; simplemente adquiere más núcleos para sostener tanto material.",
        ],
      },
      {
        titulo: "Cuando no hay células satélite: el corazón y el cerebro",
        cuerpo: [
          "El miocardio también es post-mitótico, pero carece de una población de células satélite equivalente. Cuando un infarto mata un territorio de músculo cardíaco, el hueco no se regenera: lo rellenan fibroblastos depositando colágeno, es decir, **cicatriz**. Tejido resistente que no se contrae y no conduce electricidad. Esa porción de pared deja de participar en el bombeo de forma permanente.",
          "En el sistema nervioso central pasa lo mismo con distinto albañil: la cicatriz la construyen los astrocitos y se llama gliosis. Misma lógica, distinto material.",
          "Y aquí un matiz que impide sacar la conclusión fácil: lo irreversible es el **tejido**, no necesariamente la **función**. Tras un infarto cerebral suele haber recuperación parcial, no porque crezcan neuronas nuevas sino por **plasticidad**: los circuitos supervivientes se reorganizan y asumen parte del trabajo. Pérdida de tejido irreversible, pérdida de función negociable. Es la base de por qué la rehabilitación funciona.",
        ],
      },
    ],
    analogia: {
      campo: "Sistemas distribuidos",
      texto: "Ante más carga puedes escalar verticalmente (nodos más potentes: hipertrofia) u horizontalmente (más nodos: hiperplasia). Qué opción tienes disponible depende de si la arquitectura permite instanciar nodos nuevos.",
      dondeSeRompe:
        "En un sistema informático puedes cambiar la arquitectura; un tejido no. Y a diferencia de un clúster, escalar verticalmente en biología degrada la relación entre volumen celular y superficie de intercambio, lo que empeora la difusión de oxígeno hacia el interior de la célula.",
    },
    recall: [
      {
        pregunta: "Explica sin ver nada qué determina si un tejido responde con hipertrofia o con hiperplasia, y da un ejemplo de cada uno.",
        referencia:
          "Lo determina la capacidad proliferativa del tejido: si sus células conservan capacidad de dividirse, la hiperplasia es posible; si son post-mitóticas, solo queda hipertrofia. Ejemplos: músculo esquelético entrenado y miocardio hipertenso hipertrofian porque son post-mitóticos; el endometrio bajo estímulo estrogénico y el hígado tras hepatectomía parcial hacen hiperplasia porque conservan capacidad de división.",
        pistas: ["¿Es una propiedad del estímulo o del tejido?"],
      },
      {
        pregunta: "Reconstruye la cadena completa desde levantar peso hasta una fibra muscular más gruesa.",
        referencia:
          "Tensión mecánica sobre la fibra → sensores mecánicos en membrana y citoesqueleto transducen fuerza en señal química → activación de la vía cuyo nodo central es mTOR → aumento de la síntesis de proteínas contráctiles (actina y miosina) → ensamblaje de nuevas unidades contráctiles en paralelo dentro de la misma fibra → fibra más gruesa. Las células satélite pueden aportar núcleos adicionales, pero la fibra nunca se divide.",
        pistas: ["Empieza por una fuerza física y termina por una proteína ensamblada"],
      },
    ],
    predicciones: [
      {
        escenario: "Hipertensión arterial crónica no tratada durante años.",
        pregunta: "¿Qué le ocurre al ventrículo izquierdo y por qué eso no es una adaptación gratuita?",
        respuesta:
          "Hipertrofia, porque el cardiomiocito es post-mitótico. Según la ley de Laplace, el estrés de pared es proporcional a presión por radio y dividido entre dos veces el grosor, así que engrosar la pared efectivamente reduce el estrés: la hipertrofia resuelve el problema que se le planteó. El costo aparece en otro lado. Primero, la masa muscular crece pero la red capilar no escala con ella, de modo que aumenta la distancia de difusión y baja la densidad capilar por gramo: hay isquemia relativa incluso con coronarias limpias. Segundo, el engrosamiento es hacia la cavidad, que se reduce, y un músculo más grueso es más rígido: se compromete el llenado —la diástole— antes que la expulsión.",
      },
      {
        escenario: "Un infarto destruye una porción del miocardio.",
        pregunta: "¿Qué induce la hipertrofia del tejido superviviente?",
        respuesta:
          "No la isquemia, que lo que hace es matar. Lo que induce hipertrofia es la carga mecánica transferida: los miocitos que quedaron vivos asumen el trabajo de los muertos. Es el mismo disparador que en el bíceps —tensión— en un contexto opuesto. Como la masa que crece sigue mal irrigada, se establece una espiral: más masa mal perfundida, más isquemia, más muerte celular, más carga sobre los supervivientes. Eso es la remodelación ventricular.",
      },
    ],
    errores: [
      { error: "Usar hipertrofia e hiperplasia como sinónimos porque «el órgano crece».", correccion: "Uno cambia el tamaño celular y el otro el número de células. La consecuencia funcional y el potencial de reversión son distintos." },
      { error: "Atribuir el crecimiento muscular al microdesgarro.", correccion: "La señal causal primaria es la tensión mecánica vía síntesis proteica. El daño contribuye pero no es el requisito." },
      { error: "Decir que la hipertrofia ventricular «causa estrés» en el corazón.", correccion: "Es al revés: según Laplace, engrosar la pared reduce el estrés de pared. La hipertrofia es la solución al estrés; su costo es la perfusión y la rigidez." },
      { error: "Concluir que si el tejido no se regenera, la función se pierde por completo.", correccion: "La plasticidad permite recuperación funcional sin recuperación de tejido. Es la base de la rehabilitación." },
    ],
    tarjetas: [
      { front: "¿Qué propiedad del tejido determina si puede responder con hiperplasia o solo con hipertrofia?", back: "Si sus células conservan capacidad de dividirse. Sin división posible, solo queda hipertrofia." },
      { front: "¿Por qué una fibra de músculo esquelético no puede dividirse, arquitectónicamente?", back: "Porque es multinucleada: se formó por fusión de células precursoras. La mitosis requiere que UN núcleo reparta sus cromosomas en dos." },
      { front: "Tras un infarto, ¿con qué se rellena la zona de miocardio muerto?", back: "Con cicatriz: fibroblastos que depositan colágeno. No se contrae ni conduce electricidad." },
      { front: "¿Qué induce la hipertrofia del miocardio superviviente tras un infarto?", back: "La carga mecánica transferida, no la isquemia. Mismo disparador que en el músculo entrenado." },
    ],
    faq: [
      { q: "¿Cuál es la diferencia entre hipertrofia e hiperplasia?", a: "La hipertrofia es el aumento del tamaño de cada célula sin que cambie su número; la hiperplasia es el aumento del número de células. Cuál ocurre depende de si el tejido conserva capacidad de división: los tejidos post-mitóticos como el músculo esquelético, el miocardio y las neuronas solo pueden hipertrofiar." },
      { q: "¿El músculo crece por microdesgarros?", a: "La evidencia actual apunta a que el estímulo primario es la tensión mecánica, que activa vías de señalización —con mTOR como nodo central— y aumenta la síntesis de proteínas contráctiles. El microdaño ocurre y contribuye a la respuesta, pero no parece ser el requisito causal." },
      { q: "¿Por qué el corazón no se regenera tras un infarto?", a: "Porque los cardiomiocitos son post-mitóticos y el miocardio carece de una población de células madre capaz de reponer las pérdidas. El tejido muerto se sustituye por cicatriz de colágeno, que no se contrae ni conduce electricidad." },
    ],
    fuentes: [
      "Robbins y Cotran, Patología estructural y funcional, cap. 1: adaptaciones celulares al estrés",
      "Guyton y Hall, Tratado de fisiología médica, capítulos de músculo y de insuficiencia cardíaca",
    ],
    relacionados: ["retroalimentacion-negativa", "fiebre-vs-hipertermia", "terminologia-medica"],
  },

  {
    slug: "terminologia-medica",
    titulo: "Terminología médica: el códec que convierte 10,000 términos en 400 piezas",
    tituloSEO: "Terminología médica: prefijos, raíces y sufijos griegos y latinos con ejemplos",
    bloque: "andamiaje",
    unidad: "B0.4 · Terminología médica",
    nivel: "fundamento",
    minutos: 12,
    resumen:
      "El vocabulario médico no es una lista que se memoriza: es un sistema de composición. Unos 400 morfemas griegos y latinos descomponen del orden de 10,000 términos. Aprender las piezas rinde interés compuesto sobre todo lo demás.",
    porQueImporta:
      "Es la pieza de mayor retorno de toda la etapa inicial y la que casi nadie hace de forma deliberada. Su rendimiento no es aditivo sino multiplicativo: cada semana que ya tienes el códec es una semana en la que toda tu lectura es más rápida y menos memorística. Empezarlo el mes uno y empezarlo el mes seis no cuestan lo mismo.",
    secciones: [
      {
        titulo: "Cómo se lee un término",
        cuerpo: [
          "Casi todo término médico se arma con tres tipos de pieza: un **prefijo** que indica posición, cantidad o grado; una **raíz** que nombra el órgano o la estructura; y un **sufijo** que dice qué le está pasando.",
          "Y se lee al revés de como se escribe: **primero el sufijo**, después el prefijo, y al final la raíz. *Peri-card-itis* → «itis» inflamación, «peri» alrededor, «card» corazón: inflamación de la envoltura del corazón.",
          "En cuanto interiorizas ese orden, un término que nunca viste deja de ser un obstáculo y se vuelve un ejercicio de tres segundos.",
        ],
      },
      {
        titulo: "Las distinciones que más rinden",
        cuerpo: [
          "No todos los morfemas valen igual. Los que más errores evitan son los que se parecen entre sí: *-itis* es inflamación y *-osis* es una condición o proceso frecuentemente degenerativo —artritis contra artrosis es la comparación canónica—. *-tomía* es cortar, *-ectomía* es cortar y quitar, *-stomía* es cortar y dejar una abertura permanente: gastrotomía, gastrectomía y gastrostomía son tres operaciones distintas. *-plejía* es parálisis completa y *-paresia* es debilidad o parálisis parcial, y confundirlas cambia el pronóstico.",
          "Hay también ambigüedades reales que conviene conocer desde el principio: *miel(o)-* puede significar médula ósea o médula espinal; *querat(o)-* puede referirse a la córnea o a la queratina; *cist(o)-* puede ser la vejiga o un saco.",
        ],
      },
      {
        titulo: "Por qué hay dos palabras para lo mismo",
        cuerpo: [
          "Riñón se dice *nefro-* y también *reno-*. Ojo es *oftalmo-* y también *óculo-*. Piel es *dermo-* y también *cutis*. No es redundancia caprichosa: una raíz viene del griego y la otra del latín.",
          "El patrón general —con excepciones— es que las raíces griegas dominan en enfermedad y procedimientos (nefritis, nefrectomía) mientras las latinas se quedan en anatomía descriptiva (arteria renal, insuficiencia renal). Saberlo evita creer que son términos distintos.",
        ],
      },
    ],
    recall: [
      {
        pregunta: "Descompón sin ayuda: colecistectomía, hemiparesia, osteomielitis y glucogenólisis.",
        referencia:
          "Colecistectomía = cole (bilis) + cist (saco) + ectomía (extirpación): extirpación de la vesícula biliar. Hemiparesia = hemi (mitad) + paresia (debilidad, parálisis parcial): debilidad de un lado del cuerpo. Osteomielitis = osteo (hueso) + miel (médula) + itis (inflamación): infección de hueso y médula ósea. Glucogenólisis = gluco (glucosa) + geno (que produce) + lisis (ruptura): ruptura del glucógeno para liberar glucosa.",
        pistas: ["Empieza siempre por el sufijo"],
      },
    ],
    errores: [
      { error: "Intentar aprender terminología solo por ósmosis, leyendo.", correccion: "Eso deja reconocimiento pasivo. Lo que rinde es poder descomponer un término que nunca viste, y eso requiere siembra deliberada más refuerzo en contexto." },
      { error: "Suponer que -oma siempre significa cáncer.", correccion: "-oma es masa o tumor sin especificar malignidad: un hematoma no es un cáncer. Aunque linfoma y melanoma sí son malignos pese al sufijo." },
    ],
    tarjetas: [
      { front: "¿Cómo se lee un término médico largo: de izquierda a derecha o al revés?", back: "Se empieza por el SUFIJO (qué pasa), luego el prefijo (cómo o dónde) y al final la raíz (a qué órgano)." },
      { front: "Distingue -tomía, -ectomía y -stomía.", back: "-tomía = cortar. -ectomía = cortar y QUITAR. -stomía = cortar y dejar una ABERTURA permanente." },
      { front: "Distingue -itis de -osis.", back: "-itis = inflamación activa. -osis = condición o proceso, con frecuencia degenerativo o de aumento. Artritis vs artrosis." },
    ],
    faq: [
      { q: "¿Cuántos prefijos y sufijos médicos hay que aprender?", a: "Con unos 300 a 400 morfemas de alta frecuencia se descompone la enorme mayoría del vocabulario médico. No es una lista infinita: es un sistema cerrado de piezas combinables." },
      { q: "¿Qué significa el sufijo -itis?", a: "Inflamación. Apendicitis es inflamación del apéndice, dermatitis de la piel, meningitis de las meninges." },
      { q: "¿Por qué riñón se dice nefro- y también reno-?", a: "Porque una raíz es griega y la otra latina. Como regla general, la griega se usa en enfermedad y procedimientos y la latina en anatomía descriptiva." },
    ],
    fuentes: ["Manuales estándar de raíces griegas y latinas aplicadas a ciencias de la salud"],
    relacionados: ["hipertrofia-vs-hiperplasia"],
  },

  {
    slug: "grupos-funcionales",
    titulo: "Grupos funcionales: por qué la bioquímica se siente imposible sin ellos",
    tituloSEO: "Grupos funcionales en bioquímica: hidroxilo, carbonilo, carboxilo, amino y fosfato",
    bloque: "andamiaje",
    unidad: "B0.2 · Química orgánica funcional",
    nivel: "fundamento",
    minutos: 20,
    resumen:
      "El esqueleto de carbonos es andamio inerte; la reactividad vive en los grupos funcionales. Una vía metabólica es una secuencia de transformaciones sobre esos grupos, y verlo así convierte la memorización en lectura.",
    porQueImporta:
      "Es la causa número uno de que bioquímica se sienta inaccesible. No es que la bioquímica sea difícil: es que es química orgánica aplicada, y las facultades asumen que la química ya está. Quien llega sin este andamio memoriza garabatos; quien llega con él, lee reacciones.",
    secciones: [
      {
        titulo: "El principio que ordena todo",
        cuerpo: [
          "Una molécula orgánica tiene dos partes con papeles muy distintos. El **esqueleto de carbonos** es sobre todo estructura: da forma, tamaño y carácter hidrofóbico. Los **grupos funcionales** son los sitios donde ocurre la química.",
          "Por eso una vía metabólica no es una lista de nombres que hay que memorizar: es una secuencia de transformaciones sobre grupos funcionales. Si sabes reconocerlos, puedes mirar dos moléculas consecutivas y decir qué cambió, aunque nunca hayas visto esa reacción.",
        ],
      },
      {
        titulo: "Los que hay que reconocer de vista",
        cuerpo: [
          "**Hidroxilo (−OH)**: polar, forma puentes de hidrógeno, aporta solubilidad en agua. Define a los alcoholes y está por todos lados en los azúcares.",
          "**Carbonilo (C=O)**: si está en el extremo de la cadena es un **aldehído**; si está en medio, una **cetona**. Esta distinción no es trivial: glucosa y fructosa tienen la misma fórmula molecular y difieren precisamente en eso, y el organismo las procesa por rutas distintas.",
          "**Carboxilo (−COOH)**: es un ácido. Al pH de la sangre está casi siempre ionizado como −COO⁻, es decir, con carga negativa.",
          "**Amino (−NH₂)**: es una base. Al pH fisiológico tiende a estar protonado como −NH₃⁺, con carga positiva. Un aminoácido tiene ambos grupos, y por eso a pH fisiológico lleva carga positiva y negativa a la vez.",
          "**Fosfato (−PO₄)**: carga negativa fuerte. Es la moneda energética y la marca de señalización más usada del organismo: fosforilar algo cambia su carga, su forma y su actividad.",
          "**Sulfhidrilo (−SH)**: dos de ellos pueden unirse formando un puente disulfuro, que estabiliza la estructura tridimensional de las proteínas.",
        ],
      },
      {
        titulo: "Las cuatro reacciones que explican casi todo el metabolismo",
        cuerpo: [
          "**Óxido-reducción**: transferencia de electrones. Regla práctica para detectarla: si una molécula gana hidrógenos o pierde oxígenos, se está reduciendo; lo contrario, oxidando. Las enzimas que lo hacen se llaman deshidrogenasas, y el nombre anuncia la reacción.",
          "**Hidrólisis y condensación**: romper un enlace usando agua, o formarlo liberándola. Es cómo se arman y desarman polímeros: proteínas, glucógeno, triglicéridos.",
          "**Fosforilación**: añadir un grupo fosfato. Cambia carga y conformación, y por eso sirve tanto para almacenar energía como para encender o apagar enzimas. Las enzimas que la ejecutan son las quinasas; las que quitan fosfato, las fosfatasas.",
          "**Isomerización**: reordenar los mismos átomos en otra disposición. Las enzimas se llaman isomerasas.",
          "Fíjate en el patrón: los nombres de las enzimas describen literalmente lo que hacen. El sufijo *-asa* significa enzima, y la raíz nombra la reacción. Aprender eso convierte cientos de nombres en algo deducible.",
        ],
      },
      {
        titulo: "Lo que NO necesitas",
        cuerpo: [
          "Nomenclatura IUPAC completa, mecanismos de síntesis orgánica, espectroscopía y química orgánica de segundo semestre. Un químico los necesita; alguien que va a leer bioquímica, no. El objetivo aquí es reconocer y leer, no sintetizar.",
        ],
      },
    ],
    analogia: {
      campo: "Programación",
      texto: "El esqueleto de carbonos es la estructura de datos; los grupos funcionales son la superficie de API donde se pueden invocar operaciones. Una vía metabólica es una secuencia de llamadas que transforman el objeto paso a paso.",
      dondeSeRompe:
        "En software la interfaz es explícita y estable. En química la reactividad depende del contexto: pH, solvente, grupos vecinos y la enzima presente pueden habilitar o bloquear una transformación que en abstracto parecía disponible.",
    },
    recall: [
      {
        pregunta: "Explica sin ver nada por qué un aminoácido tiene carga positiva y negativa simultáneamente al pH de la sangre.",
        referencia:
          "Porque tiene dos grupos ionizables con comportamiento opuesto. El grupo carboxilo (−COOH) es ácido y a pH fisiológico ya cedió su protón, quedando como −COO⁻ con carga negativa. El grupo amino (−NH₂) es básico y a ese mismo pH captó un protón, quedando como −NH₃⁺ con carga positiva. La molécula resultante tiene carga neta cero pero cargas separadas: es un zwitterión.",
        pistas: ["¿Qué le pasa a un ácido y a una base al mismo pH?"],
      },
      {
        pregunta: "Descompón el nombre «deshidrogenasa» y di qué hace esa enzima.",
        referencia:
          "Des- (quitar) + hidrógeno + -asa (enzima): enzima que retira hidrógenos de un sustrato. Como retirar hidrógenos equivale a retirar electrones, es una enzima de oxidación, y los hidrógenos retirados suelen transferirse a un transportador como NAD⁺ o FAD.",
        pistas: ["El sufijo -asa ya te dice que es enzima; el resto describe la reacción"],
      },
    ],
    errores: [
      { error: "Intentar memorizar las estructuras completas de las vías metabólicas.", correccion: "Lo que se memoriza son las transformaciones y los puntos de regulación. La estructura completa se lee, no se recita." },
      { error: "Tratar aldehído y cetona como equivalentes porque ambos son carbonilo.", correccion: "La posición del carbonilo distingue glucosa de fructosa y determina rutas metabólicas distintas." },
      { error: "Estudiar química orgánica completa antes de entrar a bioquímica.", correccion: "Se necesita un subconjunto pequeño y específico. El resto es coste sin retorno para este objetivo." },
    ],
    tarjetas: [
      { front: "¿Qué indican los sufijos -asa y -osa?", back: "-asa = enzima (lipasa, amilasa, proteasa). -osa = azúcar (glucosa, lactosa, fructosa)." },
      { front: "¿Qué distingue un aldehído de una cetona?", back: "La posición del grupo carbonilo (C=O): en el extremo de la cadena es aldehído; en medio, cetona. Glucosa vs fructosa." },
      { front: "¿En qué estado están el carboxilo y el amino a pH fisiológico?", back: "Carboxilo desprotonado (−COO⁻, negativo) y amino protonado (−NH₃⁺, positivo). Por eso un aminoácido es un zwitterión." },
      { front: "¿Qué hace una quinasa y qué hace una fosfatasa?", back: "La quinasa añade un grupo fosfato; la fosfatasa lo retira. Fosforilar cambia carga, conformación y actividad." },
    ],
    faq: [
      { q: "¿Qué grupos funcionales hay que saber para estudiar bioquímica?", a: "Hidroxilo, carbonilo (aldehído y cetona), carboxilo, amino, fosfato y sulfhidrilo cubren la mayor parte de lo que aparece en las vías metabólicas. Con esos seis se puede leer casi cualquier reacción del metabolismo intermedio." },
      { q: "¿Hay que estudiar química orgánica completa antes de bioquímica?", a: "No. Basta un subconjunto: grupos funcionales, polaridad y solubilidad, pH y pKa, quiralidad básica y los cuatro tipos de reacción del metabolismo. Nomenclatura IUPAC exhaustiva y mecanismos de síntesis no aportan a este objetivo." },
      { q: "¿Por qué las enzimas terminan en -asa?", a: "Porque el sufijo -asa designa enzima, y la raíz describe la reacción que cataliza. Una deshidrogenasa retira hidrógenos, una quinasa añade fosfato, una isomerasa reordena átomos. Los nombres son descriptivos, no arbitrarios." },
    ],
    fuentes: [
      "Lippincott Illustrated Reviews: Bioquímica, capítulos introductorios",
      "Klein, Organic Chemistry as a Second Language, secciones de grupos funcionales y ácido-base",
    ],
    relacionados: ["terminologia-medica", "retroalimentacion-negativa"],
  },

  {
    slug: "ley-de-laplace",
    titulo: "Ley de Laplace: por qué el corazón engorda su pared",
    tituloSEO: "Ley de Laplace en el corazón: estrés de pared, hipertrofia concéntrica y disfunción diastólica",
    bloque: "funcion",
    unidad: "I8568 · Fisiología médica",
    nivel: "mecanismo",
    minutos: 14,
    resumen:
      "El estrés de pared crece con la presión y el radio, y baja con el grosor. Esa sola relación explica por qué un ventrículo hipertenso se engrosa, por qué eso perjudica el llenado y por qué compromete su propia irrigación.",
    porQueImporta:
      "Es un caso donde una relación cuantitativa de una línea predice una cadena entera de consecuencias clínicas. Además ilustra algo que se repite en todo el cuerpo: un circuito puede corregir su variable objetivo y degradar otra que nadie estaba midiendo.",
    secciones: [
      {
        titulo: "La relación",
        cuerpo: [
          "Para una cámara aproximadamente esférica, el estrés que soporta la pared se describe como σ ≈ (P · r) / 2h, donde P es la presión interna, r el radio de la cavidad y h el grosor de la pared.",
          "Léela como ingeniero: si la presión sube, el estrés sube. Si la cámara se dilata, el estrés sube. Y si la pared engrosa, el estrés baja.",
        ],
      },
      {
        titulo: "Qué predice en hipertensión",
        cuerpo: [
          "En hipertensión crónica, P está permanentemente elevada, así que σ sube. El ventrículo responde aumentando h: hipertrofia concéntrica, con la pared engrosando hacia la cavidad. Y funciona —σ vuelve a bajar—. La hipertrofia no causa el estrés: **es la solución al estrés**.",
          "Pero cobra factura por dos vías independientes. La primera es geométrica: si la pared engrosa hacia adentro, el volumen de la cavidad disminuye; y un músculo más grueso es además más rígido. Llenarse no es un acto activo, es dejarse estirar, así que se compromete primero la **diástole** —el llenado— y no la expulsión.",
          "La segunda es de escalamiento. La masa muscular crece pero la red capilar no crece proporcionalmente: baja la densidad capilar por gramo de tejido y aumenta la distancia de difusión hasta el centro de cada miocito engrosado. Hay más tejido consumiendo oxígeno peor irrigado por unidad de masa, es decir, isquemia relativa incluso con arterias coronarias limpias.",
        ],
      },
      {
        titulo: "El patrón general",
        cuerpo: [
          "Un circuito de regulación puede corregir su variable objetivo y degradar otra que nadie estaba midiendo. La hipertrofia baja σ y rompe la perfusión y la distensibilidad. Es el mismo tipo de compromiso que aparece una y otra vez en fisiopatología, y buscarlo activamente es una de las preguntas más rentables frente a cualquier mecanismo compensador.",
        ],
      },
    ],
    recall: [
      {
        pregunta: "Escribe de memoria la relación de Laplace para una cámara y explica qué le pasa al estrés de pared si el ventrículo se dilata sin engrosar.",
        referencia:
          "σ ≈ (P · r) / 2h. Si el ventrículo se dilata, r aumenta y h no cambia, así que σ aumenta. Eso es exactamente lo que ocurre en la dilatación ventricular: cada fibra soporta más estrés, lo que aumenta el consumo de oxígeno y perpetúa la remodelación. Es la lógica opuesta a la hipertrofia concéntrica.",
        pistas: ["¿En qué parte de la fracción está el radio y en cuál el grosor?"],
      },
    ],
    predicciones: [
      {
        escenario: "Se reduce la poscarga de un paciente con hipertrofia ventricular mediante tratamiento antihipertensivo sostenido.",
        pregunta: "¿Qué se espera del estrés de pared y de la masa ventricular a largo plazo?",
        respuesta:
          "Al bajar P disminuye σ para el mismo radio y grosor. Al desaparecer el estímulo mecánico que sostenía la hipertrofia, la masa ventricular tiende a regresar parcialmente con el tiempo. Es un buen ejemplo de que la hipertrofia es una respuesta a una señal y no un cambio irreversible por definición: retirada la señal, la respuesta cede. El tejido ya sustituido por fibrosis, en cambio, no revierte.",
      },
    ],
    errores: [
      { error: "Decir que la hipertrofia ventricular somete al corazón a más estrés de pared.", correccion: "Lo reduce. Aumentar h baja σ. El costo está en la perfusión y en la rigidez, no en el estrés de pared." },
      { error: "Suponer que la hipertrofia compromete primero la expulsión de sangre.", correccion: "Compromete primero el llenado: cavidad más pequeña y músculo más rígido afectan la diástole antes que la sístole." },
    ],
    tarjetas: [
      { front: "Escribe la relación de Laplace para el estrés de pared ventricular.", back: "σ ≈ (P · r) / 2h — presión por radio, entre dos veces el grosor." },
      { front: "Según Laplace, ¿la hipertrofia ventricular aumenta o reduce el estrés de pared?", back: "Lo REDUCE, porque aumenta h. La hipertrofia es la solución al estrés, no su causa." },
      { front: "En la hipertrofia concéntrica, ¿qué fase del ciclo cardíaco se compromete primero?", back: "La diástole (llenado): la cavidad es menor y el músculo más rígido, y llenarse depende de dejarse estirar." },
    ],
    faq: [
      { q: "¿Qué dice la ley de Laplace aplicada al corazón?", a: "Que el estrés que soporta la pared ventricular es proporcional a la presión y al radio de la cavidad, e inversamente proporcional al grosor de la pared. Por eso una pared más gruesa soporta menos estrés para la misma presión." },
      { q: "¿Por qué la hipertensión produce hipertrofia del ventrículo izquierdo?", a: "Porque la presión elevada aumenta el estrés de pared, y engrosar la pared lo reduce. Es una respuesta adaptativa a una señal mecánica, con costos en perfusión y en distensibilidad." },
      { q: "¿Qué es la disfunción diastólica?", a: "Es la dificultad del ventrículo para llenarse durante la diástole, típicamente por una cavidad reducida y un músculo más grueso y rígido. La capacidad de expulsión puede estar conservada mientras el llenado ya está comprometido." },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, capítulos de mecánica cardíaca e insuficiencia cardíaca",
      "Ganong, Fisiología médica, sección cardiovascular",
    ],
    relacionados: ["hipertrofia-vs-hiperplasia", "retroalimentacion-negativa"],
    deudaPractica: "La hipertrofia ventricular se sospecha en la exploración por el desplazamiento y las características del choque de la punta. Palpar eso es una habilidad manual que no se adquiere en pantalla.",
  },
  {
    slug: "ph-pka-ionizacion",
    titulo: "pH, pKa e ionización: por qué las moléculas del cuerpo tienen carga",
    tituloSEO: "pH, pKa e ionización en bioquímica: Henderson-Hasselbalch, zwitteriones y buffers fisiológicos",
    bloque: "andamiaje",
    unidad: "B0.1 · Química general",
    nivel: "fundamento",
    minutos: 22,
    resumen:
      "El pKa dice a qué pH un grupo suelta su protón. Comparar el pKa de un grupo con el pH del medio predice si esa molécula está cargada o neutra, y esa carga decide si atraviesa una membrana, si se une a su receptor y si el riñón la retiene. Es también la base del equilibrio ácido-base.",
    porQueImporta:
      "Bioquímica se siente imposible cuando uno no sabe leer cargas. Por qué un aminoácido es un ion con dos cargas al pH de la sangre, por qué el sitio activo de una enzima necesita un residuo protonado, por qué un fármaco ácido se absorbe donde se absorbe: todo eso son la misma pregunta repetida. Y el equilibrio ácido-base, que es de lo más rentable de toda la medicina interna, no es más que este tema aplicado a un buffer concreto.",
    secciones: [
      {
        titulo: "Dos números que hay que dejar de confundir",
        cuerpo: [
          "El **pH** describe el medio: cuántos protones libres hay. El **pKa** describe la molécula: con cuánta fuerza retiene el suyo. Uno es una propiedad del entorno y el otro una propiedad química fija de cada grupo funcional. Confundirlos es el error que arruina el resto del tema.",
          "El pKa se define como el pH al que el grupo está exactamente mitad protonado y mitad desprotonado. Esa definición operativa es la que conviene retener, porque convierte el pKa en un punto de referencia contra el cual comparar cualquier medio.",
          "De ahí sale la única regla que hace falta memorizar: **si el pH está por debajo del pKa, el grupo conserva su protón; si el pH está por encima, lo suelta.** Un ácido protonado es neutro y desprotonado es negativo; una base protonada es positiva y desprotonada es neutra. Con eso ya se puede predecir la carga de casi cualquier molécula fisiológica.",
          "La versión cuantitativa es la ecuación de **Henderson-Hasselbalch**: pH = pKa + log([forma desprotonada]/[forma protonada]). No hay que derivarla; hay que ver que cuando las dos formas están igualadas el logaritmo vale cero y el pH iguala al pKa, y que cada unidad de pH de diferencia multiplica o divide por diez la proporción entre las dos formas.",
        ],
      },
      {
        titulo: "Por qué un aminoácido tiene dos cargas a la vez",
        cuerpo: [
          "Un aminoácido tiene, como mínimo, dos grupos ionizables. El **carboxilo** en posición alfa es un ácido fuerte para lo que se ve en biología: su pKa ronda 2. El **amino** alfa es una base, con un pKa alrededor de 9 a 10. Los valores exactos varían de un aminoácido a otro y se consultan en tabla, pero el orden de magnitud es el que importa.",
          "Ahora aplica la regla al pH de la sangre, que está entre 7.35 y 7.45. El pH está muy por encima de 2, así que el carboxilo ya soltó su protón y quedó como carboxilato, con carga negativa. El mismo pH está por debajo de 9, así que el amino conserva su protón y está como amonio, con carga positiva.",
          "El resultado es una molécula con una carga negativa y una positiva simultáneamente y carga neta cero: un **zwitterión**. No es una curiosidad de examen. Es la razón por la que los aminoácidos son sólidos con puntos de fusión altos y muy solubles en agua, y por la que no cruzan membranas por difusión simple sino que necesitan transportadores.",
          "Las cadenas laterales añaden su propio pKa y ahí está lo interesante. El imidazol de la **histidina** tiene un pKa cercano a 6, que es el único que cae lo bastante próximo al pH fisiológico como para que el residuo esté parcialmente protonado en condiciones normales. Por eso la histidina aparece una y otra vez en sitios activos de enzimas y por eso es el residuo que más contribuye al poder amortiguador de las proteínas.",
        ],
      },
      {
        titulo: "Buffers: por qué el pH de la sangre casi no se mueve",
        cuerpo: [
          "Un **buffer** es una mezcla de un ácido débil y su base conjugada. Cuando entran protones, la base los captura; cuando se pierden, el ácido los repone. La consecuencia es que el pH cambia mucho menos de lo que cambiaría en agua pura ante la misma carga de ácido.",
          "La capacidad de amortiguar es máxima cuando el pH del medio iguala al pKa del buffer, porque ahí hay reservas iguales de las dos formas y el sistema puede encajar golpes en las dos direcciones. Fuera de una unidad de pH a cada lado del pKa, la reserva de una de las dos formas se agota y el buffer deja de servir.",
          "Aquí aparece algo que a primera vista contradice lo anterior. El principal buffer del plasma es el par **dióxido de carbono y bicarbonato**, cuyo pKa aparente en plasma es 6.1, más de una unidad por debajo del pH sanguíneo. Por la regla que acabamos de dar debería ser un buffer mediocre, y sin embargo es el que más trabajo hace.",
          "La explicación es que no es un sistema cerrado. El pulmón elimina CO₂ tan rápido como haga falta y el riñón regula la reabsorción de bicarbonato. Un buffer abierto, con dos órganos ajustando sus dos componentes por separado, rinde mucho más que lo que su pKa sugiere sobre el papel. Los buffers intracelulares importantes —fosfato, con un pKa cercano a 6.8, y las proteínas a través de sus histidinas— sí están más cerca del pH que amortiguan.",
        ],
      },
      {
        titulo: "La carga decide a dónde va la molécula",
        cuerpo: [
          "Una membrana es una bicapa de lípidos: su interior es hidrófobo. Una molécula neutra la atraviesa por difusión simple; una molécula cargada, no. Ese solo hecho convierte la pregunta «¿a qué pH está este grupo?» en una pregunta sobre distribución en el organismo.",
          "De ahí sale el fenómeno del **atrapamiento iónico**. Si una molécula puede cruzar una membrana solo en su forma neutra, y del otro lado encuentra un pH que la ioniza, queda atrapada: entró neutra y no puede salir cargada. Así se acumulan compartimentos enteros de fármacos ácidos o básicos según el pH de cada compartimento, sin que exista ningún transportador activo de por medio.",
          "El mismo razonamiento explica el sitio activo de una enzima. Si la catálisis necesita que un residuo done un protón y otro lo acepte, el pH del medio tiene que dejar a esos residuos en el estado de protonación correcto. Por eso cada enzima tiene un pH óptimo y por eso la pepsina del estómago y la tripsina del intestino, que hacen un trabajo parecido, trabajan a pH radicalmente distintos.",
        ],
      },
    ],
    analogia: {
      campo: "Sistemas de referencia",
      texto:
        "El pKa funciona como el punto de congelación de una sustancia: es una constante propia de la molécula, y lo que decide su estado no es esa constante sino cómo se compara con la temperatura —aquí, el pH— del entorno en el que está.",
      dondeSeRompe:
        "La analogía sugiere un umbral limpio, y la ionización no lo es: es un equilibrio. A una unidad de pH del pKa todavía queda un 10 % de la molécula en la otra forma, y ese 10 % a veces es justo la fracción que hace el trabajo. El agua no está un 10 % congelada a un grado por encima de cero; una molécula sí está parcialmente ionizada cerca de su pKa.",
    },
    diagrama: {
      variable: "pH del líquido extracelular",
      setPoint: "7.35 a 7.45",
      sensor: "Quimiorreceptores centrales y periféricos",
      centroIntegrador: "Centro respiratorio del tronco",
      efector: "Ventilación pulmonar",
      correccion: "elimina o retiene CO₂",
      estimulo: "Carga ácida metabólica",
      incognita: "efector",
      aceptadas: ["ventilacion", "respiracion", "pulmon", "musculos respiratorios"],
    },
    recall: [
      {
        pregunta: "Explica, sin mirar, por qué un aminoácido está cargado dos veces al pH de la sangre y qué consecuencia tiene eso.",
        referencia:
          "Un aminoácido tiene un carboxilo alfa con pKa cercano a 2 y un amino alfa con pKa entre 9 y 10. Al pH de la sangre, que está entre 7.35 y 7.45, el pH está muy por encima del pKa del carboxilo, así que ese grupo ya soltó su protón y queda como carboxilato negativo. El mismo pH está por debajo del pKa del amino, así que ese grupo conserva su protón y queda como amonio positivo. La molécula resultante tiene una carga de cada signo y carga neta cero: es un zwitterión. La consecuencia es que se comporta como una sal —muy soluble en agua, punto de fusión alto— y que no atraviesa membranas por difusión simple, por lo que necesita transportadores específicos.",
        pistas: [
          "¿Cuántos grupos ionizables tiene como mínimo un aminoácido?",
          "Compara el pH de la sangre con cada uno de los dos pKa por separado.",
          "Si el pH está por encima del pKa, ¿el grupo conserva o suelta su protón?",
        ],
      },
      {
        pregunta: "El buffer bicarbonato tiene un pKa de 6.1 y la sangre está a 7.4. ¿Por qué no es un mal buffer, si está a más de una unidad de su pKa?",
        referencia:
          "Porque la regla de que un buffer solo sirve a menos de una unidad de su pKa se cumple en un sistema cerrado, y este no lo es. El componente ácido es CO₂, que el pulmón puede eliminar o retener ajustando la ventilación en segundos, y el componente básico es el bicarbonato, cuya reabsorción regula el riñón en horas o días. Al ser un sistema abierto con dos órganos controlando los dos componentes de forma independiente, la capacidad efectiva del par supera con mucho a la que predice su pKa sobre el papel. Los buffers cerrados del organismo, como el fosfato con pKa cercano a 6.8 y las proteínas a través de las histidinas, sí operan cerca del pH que amortiguan.",
        pistas: [
          "¿Qué supone la regla del «pKa ± 1» sobre las cantidades de las dos formas?",
          "¿De dónde sale y a dónde va el CO₂ del plasma?",
          "¿Qué órgano regula cada uno de los dos componentes del par?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Una persona hiperventila de forma sostenida por ansiedad.",
        pregunta: "¿Qué le pasa al pH de la sangre y por qué, razonándolo desde el par CO₂/bicarbonato?",
        respuesta:
          "Hiperventilar elimina CO₂ más rápido de lo que se produce, así que baja la concentración del componente ácido del par. En la ecuación de Henderson-Hasselbalch el cociente entre base y ácido sube, y con él sube el pH: aparece una alcalosis de origen respiratorio. Es la demostración de que el pulmón es un regulador de pH y no solo un órgano de oxigenación. Si la situación se prolonga, el riñón responde reduciendo la reabsorción de bicarbonato, con lo que baja también el numerador y el cociente vuelve a acercarse a su valor normal: eso es la compensación renal, y es lenta porque el riñón trabaja en horas mientras el pulmón trabaja en segundos.",
      },
      {
        escenario: "Una enzima con una histidina catalítica se traslada de un medio a pH 7.4 a un medio a pH 4.",
        pregunta: "¿Qué le pasa a esa histidina y por qué puede perderse la actividad?",
        respuesta:
          "El imidazol de la histidina tiene un pKa cercano a 6. A pH 7.4 el pH está por encima del pKa, así que una fracción apreciable del residuo está desprotonada y puede actuar aceptando un protón del sustrato. A pH 4 el pH está dos unidades por debajo del pKa, de modo que prácticamente todo el residuo está protonado y cargado positivamente: ya no puede aceptar nada. Si el mecanismo catalítico dependía de esa aceptación, la enzima deja de funcionar aunque su estructura siga intacta. Es la razón mecanicista de que cada enzima tenga un pH óptimo, y conviene distinguirla de la desnaturalización, que es un daño estructural y no un simple cambio de protonación.",
      },
    ],
    errores: [
      {
        error: "Creer que un pKa bajo significa que la molécula está poco ionizada.",
        correccion:
          "Es al revés en la mayoría de las situaciones fisiológicas. Un pKa bajo indica un ácido fuerte, que suelta su protón con facilidad; como el pH del cuerpo está muy por encima de ese pKa, el grupo está casi por completo desprotonado, es decir, casi por completo ionizado. Lo que decide la ionización nunca es el pKa solo, sino su comparación con el pH del medio.",
      },
      {
        error: "Usar «ácido» y «protonado» como sinónimos.",
        correccion:
          "Un ácido es una molécula capaz de ceder un protón, y una vez que lo cede queda desprotonada y con carga negativa. Al pH del cuerpo la mayoría de los ácidos biológicos están precisamente en su forma desprotonada, o sea aniónica. Por eso el lenguaje del laboratorio habla de lactato y no de ácido láctico, de piruvato y no de ácido pirúvico: los sufijos no son un capricho, describen la especie que realmente existe en el plasma.",
      },
      {
        error: "Pensar que un buffer impide que el pH cambie.",
        correccion:
          "Un buffer no fija el pH, solo amortigua su variación. Ante una carga de ácido el pH baja igualmente; lo que hace el buffer es que baje una fracción de lo que bajaría sin él. Además su capacidad es finita: cuando la reserva de la forma que captura protones se agota, el pH cae de golpe. Esa transición brusca es la razón de que un paciente pueda parecer estable y descompensarse en poco tiempo.",
      },
      {
        error: "Tratar la ecuación de Henderson-Hasselbalch como una fórmula que hay que memorizar y sustituir.",
        correccion:
          "Su valor no está en el cálculo sino en las dos lecturas cualitativas que permite: que cuando las dos formas se igualan el pH coincide con el pKa, y que cada unidad de diferencia entre pH y pKa cambia la proporción entre las dos formas por un factor de diez. Quien retiene esas dos lecturas predice cargas sin escribir la ecuación; quien solo memoriza la fórmula se queda sin nada cuando el examen pregunta por un mecanismo.",
      },
    ],
    tarjetas: [
      { front: "¿Qué significa exactamente el pKa de un grupo ionizable?", back: "El pH al que ese grupo está mitad protonado y mitad desprotonado." },
      { front: "Si el pH del medio está por encima del pKa de un grupo, ¿conserva o suelta su protón?", back: "Lo suelta: queda desprotonado." },
      { front: "¿Qué pKa aproximado tiene el carboxilo alfa de un aminoácido?", back: "Alrededor de 2." },
      { front: "¿Qué cadena lateral de aminoácido tiene un pKa cercano al pH fisiológico?", back: "El imidazol de la histidina, con pKa próximo a 6." },
      { front: "¿A qué pH es máxima la capacidad amortiguadora de un buffer?", back: "Cuando el pH del medio iguala al pKa del buffer." },
      { front: "¿Qué órgano regula el componente ácido del par CO₂/bicarbonato?", back: "El pulmón, ajustando la ventilación." },
      { front: "¿Por qué un zwitterión no atraviesa una membrana por difusión simple?", back: "Porque tiene cargas y el interior de la bicapa es hidrófobo." },
    ],
    faq: [
      {
        q: "¿Cuál es la diferencia entre pH y pKa?",
        a: "El pH es una propiedad del medio: mide cuántos protones libres hay en la disolución. El pKa es una propiedad fija de cada grupo ionizable de una molécula e indica el pH al que ese grupo está mitad protonado y mitad desprotonado. El pH cambia según dónde esté la molécula; el pKa no cambia. La ionización se predice comparando los dos: si el pH está por encima del pKa el grupo suelta su protón, y si está por debajo lo conserva.",
      },
      {
        q: "¿Por qué los aminoácidos son zwitteriones al pH fisiológico?",
        a: "Porque tienen dos grupos ionizables con pKa muy separados. El carboxilo alfa tiene un pKa cercano a 2, muy por debajo del pH de la sangre, así que está desprotonado y con carga negativa. El amino alfa tiene un pKa entre 9 y 10, por encima del pH de la sangre, así que está protonado y con carga positiva. La molécula lleva las dos cargas a la vez y su carga neta es cero, que es la definición de zwitterión.",
      },
      {
        q: "¿Para qué sirve la ecuación de Henderson-Hasselbalch?",
        a: "Relaciona el pH de una disolución con el pKa de un ácido débil y la proporción entre su forma desprotonada y su forma protonada: pH = pKa + log([A⁻]/[HA]). En la práctica sirve para dos cosas: saber en qué proporción está ionizada una molécula a un pH dado, y entender el equilibrio ácido-base, donde el par CO₂/bicarbonato se analiza con esta misma relación.",
      },
      {
        q: "¿Por qué la sangre mantiene un pH tan estrecho, entre 7.35 y 7.45?",
        a: "Porque el estado de protonación de las proteínas depende del pH, y de ese estado dependen su forma y su actividad catalítica. Un desplazamiento de unas décimas cambia la carga de residuos como la histidina en sitios activos de enzimas y en la hemoglobina, y con ello altera funciones que no toleran variación. El organismo lo sostiene combinando buffers químicos de acción inmediata con la regulación respiratoria del CO₂, en segundos, y la regulación renal del bicarbonato, en horas o días.",
      },
    ],
    fuentes: [
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo sobre el agua, la ionización y los sistemas amortiguadores",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo introductorio de aminoácidos y pH",
      "Guyton y Hall, Tratado de fisiología médica, capítulo de regulación del equilibrio ácido-base",
    ],
    relacionados: ["grupos-funcionales", "terminologia-medica"],
    deudaPractica:
      "Interpretar una gasometría real —decidir si un trastorno es respiratorio o metabólico, si hay compensación y si es aguda o crónica— exige practicar con casos y con el contexto clínico del paciente delante. Este tema da el mecanismo; la lectura de gasometrías es una habilidad aparte que se entrena con series de casos reales.",
  },

  {
    slug: "quiralidad",
    titulo: "Quiralidad: por qué una enzima acepta una forma y rechaza su espejo",
    tituloSEO: "Quiralidad en bioquímica: enantiómeros, aminoácidos L, azúcares D y por qué importa en farmacología",
    bloque: "andamiaje",
    unidad: "B0.2 · Química orgánica funcional",
    nivel: "fundamento",
    minutos: 18,
    resumen:
      "Dos moléculas con los mismos átomos y los mismos enlaces pueden ser imágenes especulares no superponibles. En un tubo de ensayo se comportan igual; dentro de un organismo, no, porque las enzimas y los receptores también son quirales. De ahí que la vida use aminoácidos L y azúcares D, y que dos formas del mismo fármaco puedan hacer cosas distintas.",
    porQueImporta:
      "Es el punto donde la química deja de ser una lista de fórmulas y pasa a explicar por qué la biología es selectiva. Sin quiralidad no se entiende por qué una enzima reconoce a su sustrato y no a algo casi idéntico, por qué la fórmula plana de un libro esconde información esencial, ni por qué en farmacología dos compuestos con la misma fórmula molecular pueden tener efectos diferentes.",
    secciones: [
      {
        titulo: "Qué hace quiral a una molécula",
        cuerpo: [
          "Un objeto es **quiral** cuando su imagen en el espejo no se puede superponer sobre él. Las manos son el ejemplo canónico, y de ahí viene la palabra: *cheir* es mano en griego. Una mano derecha y una izquierda tienen las mismas partes en la misma disposición relativa y aun así no encajan una sobre otra.",
          "En química orgánica el caso más frecuente es el **carbono asimétrico**: un carbono unido a cuatro sustituyentes distintos. Como los cuatro enlaces apuntan hacia los vértices de un tetraedro, hay dos formas de colocar cuatro grupos diferentes alrededor de él, y esas dos formas son imágenes especulares no superponibles.",
          "Cada una de esas dos formas es un **enantiómero**. Tienen exactamente los mismos átomos, los mismos enlaces y las mismas conexiones; lo único que difiere es la disposición en el espacio. Cuando una molécula tiene más de un centro quiral aparecen estereoisómeros que no son imágenes especulares entre sí, y a esos se les llama **diastereómeros**; a diferencia de los enantiómeros, sí tienen propiedades físicas distintas y por eso se pueden separar por métodos ordinarios.",
        ],
      },
      {
        titulo: "Idénticos, salvo en un entorno quiral",
        cuerpo: [
          "Dos enantiómeros tienen el mismo punto de fusión, la misma solubilidad, la misma densidad y el mismo espectro. En un entorno no quiral son indistinguibles, y esa es justamente la razón por la que separarlos es difícil y caro.",
          "Se distinguen en dos situaciones. La primera es la luz polarizada: cada enantiómero desvía el plano de polarización el mismo ángulo pero en sentidos opuestos, y de ahí vienen los signos (+) y (−). La segunda es un **entorno quiral**, y es la que importa en medicina.",
          "Aquí está el nudo del tema. Las proteínas están hechas de aminoácidos L, así que están construidas de una sola mano: el sitio activo de una enzima y el bolsillo de unión de un receptor son cavidades quirales. Una cavidad quiral distingue enantiómeros por la misma razón que un guante derecho distingue manos. No es una preferencia energética sutil, es geometría: si tres puntos de contacto tienen que coincidir a la vez, la imagen especular solo puede acertar dos.",
          "Por eso la vida es estereoespecífica de arriba abajo. Las proteínas usan **aminoácidos L**, los ácidos nucleicos y el metabolismo energético usan **azúcares D**, y las enzimas que procesan unos no tocan a los otros. Es una convención que la vida terrestre fijó una vez y de la que ya no se movió.",
        ],
      },
      {
        titulo: "Tres sistemas de nombres que no significan lo mismo",
        cuerpo: [
          "Esta es la parte que tropieza a todo el mundo, y merece decirse explícitamente: existen tres notaciones distintas y no son intercambiables.",
          "La notación **D/L** compara la configuración de la molécula con la del gliceraldehído, la molécula de referencia que se eligió históricamente. Es la que se usa en bioquímica para aminoácidos y azúcares, y es una clasificación por parentesco estructural, no por comportamiento óptico.",
          "La notación **R/S**, del sistema de Cahn-Ingold-Prelog, asigna prioridades a los cuatro sustituyentes según número atómico y mira si el orden gira en el sentido de las agujas del reloj o al contrario. Es rigurosa, describe cada centro por separado y es la que usa la química orgánica moderna.",
          "Los signos **(+) y (−)**, a veces escritos como *d* y *l* minúsculas, indican hacia dónde desvía la luz polarizada esa sustancia. Es un dato medido en el laboratorio, no deducible de la estructura.",
          "La consecuencia práctica: **saber que un aminoácido es L no permite deducir si es (+) o (−), ni tampoco si es R o S.** Son tres preguntas diferentes sobre la misma molécula. La mayoría de los aminoácidos L son S, pero la cisteína no lo es, y no por una excepción biológica sino porque el azufre cambia el orden de prioridades del sistema R/S.",
        ],
      },
      {
        titulo: "Qué cambia esto en farmacología",
        cuerpo: [
          "Muchos fármacos tienen al menos un centro quiral. Como su diana es una proteína, y una proteína es un entorno quiral, los dos enantiómeros pueden unirse con afinidades distintas: uno puede ser el activo mientras el otro es menos activo, inactivo, o activo sobre una diana diferente.",
          "Además el organismo entero es quiral, no solo la diana. Las enzimas que metabolizan un fármaco y los transportadores que lo mueven también distinguen enantiómeros, de modo que dos formas del mismo compuesto pueden absorberse, distribuirse y eliminarse a velocidades distintas.",
          "El caso más citado es el de la **talidomida**, y conviene contarlo bien porque la versión popular es engañosa. Es cierto que los dos enantiómeros no tienen la misma actividad. Pero también está documentado que en condiciones fisiológicas se interconvierten, es decir, que administrar solo el enantiómero considerado seguro no habría evitado la aparición del otro en el organismo. La lección correcta no es «bastaba con separar los enantiómeros», sino que la estereoquímica hay que evaluarla junto con lo que el cuerpo le hace a la molécula.",
        ],
      },
    ],
    analogia: {
      campo: "Objetos cotidianos",
      texto:
        "Una enzima frente a su sustrato funciona como un guante frente a una mano: el guante derecho no es «mejor» que el izquierdo, simplemente solo uno de los dos entra, y por pura geometría.",
      dondeSeRompe:
        "El guante sugiere un encaje rígido, y hace décadas que ese modelo se abandonó. La descripción vigente es la de ajuste inducido: la proteína cambia de conformación al unirse, y tanto ella como el ligando son flexibles. Además el guante insinúa que el enantiómero equivocado simplemente no se une, cuando lo habitual es que se una con menos afinidad, y a veces a otra diana, lo cual es una fuente real de efectos no buscados.",
    },
    recall: [
      {
        pregunta: "Explica por qué una enzima distingue entre dos enantiómeros si en un tubo de ensayo son químicamente idénticos.",
        referencia:
          "Dos enantiómeros tienen las mismas propiedades físicas y químicas mientras el entorno no sea quiral, porque solo difieren en la disposición espacial de sus sustituyentes. Una enzima no es un entorno neutro: está construida con aminoácidos L, de modo que su sitio activo es una cavidad con una mano definida. El reconocimiento exige que varios puntos de contacto —enlaces de hidrógeno, interacciones iónicas, contactos hidrófobos— coincidan simultáneamente en el espacio, y una imagen especular no puede satisfacerlos todos a la vez aunque tenga exactamente los mismos grupos. Es el mismo motivo por el que un guante derecho no admite una mano izquierda: no hay diferencia de composición, solo de geometría.",
        pistas: [
          "¿En qué se diferencian y en qué no se diferencian dos enantiómeros?",
          "¿De qué está hecho el sitio activo de una enzima y qué tienen de particular esos componentes?",
          "¿Cuántos puntos de contacto tienen que coincidir a la vez para que haya reconocimiento?",
        ],
      },
      {
        pregunta: "¿Qué significan D/L, R/S y (+)/(−), y por qué no se pueden deducir unos de otros?",
        referencia:
          "Son tres notaciones que responden a preguntas distintas sobre la misma molécula. D/L clasifica la configuración por comparación con el gliceraldehído de referencia y es la que se usa en bioquímica para aminoácidos y azúcares. R/S es el sistema de Cahn-Ingold-Prelog: ordena los cuatro sustituyentes por prioridad según número atómico y describe el sentido de giro de ese orden, centro por centro. Los signos (+) y (−) indican el sentido en que la sustancia desvía el plano de la luz polarizada, y son un dato experimental que se mide, no algo que se derive de la estructura. Por eso saber que un aminoácido es L no dice si es R o S ni si es (+) o (−): la mayoría de los aminoácidos L resultan ser S, pero la cisteína es R porque el azufre altera el orden de prioridades.",
        pistas: [
          "Una de las tres notaciones se mide en un aparato en vez de deducirse en el papel: ¿cuál?",
          "¿Con qué molécula de referencia se compara la notación D/L?",
          "¿Qué criterio usa el sistema R/S para ordenar los sustituyentes?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Se sintetiza en el laboratorio un aminoácido idéntico a uno natural pero en su forma D.",
        pregunta: "¿Qué le pasará cuando entre en contacto con la maquinaria de síntesis de proteínas de una célula?",
        respuesta:
          "No se incorporará a la proteína. La maquinaria de traducción está construida a partir de componentes quirales y selecciona aminoácidos L en varios pasos independientes: las enzimas que cargan cada aminoácido sobre su ARN de transferencia discriminan la configuración, y el propio ribosoma impone restricciones geométricas al sitio donde se forma el enlace peptídico. El aminoácido D es un compuesto perfectamente estable y con la misma fórmula, pero para ese sistema es una llave con la muesca al revés. Conviene añadir que los aminoácidos D existen en la naturaleza y no son un artefacto de laboratorio: aparecen, por ejemplo, en la pared celular de las bacterias, que los usa precisamente porque las enzimas que degradan proteínas normales no la reconocen.",
      },
      {
        escenario: "Un fármaco quiral se administra como mezcla de partes iguales de sus dos enantiómeros, es decir, como racémico.",
        pregunta: "¿Qué se puede y qué no se puede predecir sobre su comportamiento en el organismo?",
        respuesta:
          "Se puede predecir que los dos enantiómeros se enfrentarán a un entorno quiral en cada etapa: la diana, las enzimas que lo metabolizan y los transportadores que lo mueven, todos ellos hechos de proteína. Por tanto es esperable que difieran en afinidad por la diana y en velocidad de eliminación. Lo que no se puede predecir sin datos es cuál de las dos posibilidades ocurre: que el segundo enantiómero sea inerte, que sea menos potente sobre la misma diana, que actúe sobre otra distinta, o que se convierta en el primero dentro del organismo. Esa última posibilidad, la interconversión, es la que hace que separar enantiómeros no garantice nada por sí sola, y es lo que documenta el caso de la talidomida.",
      },
    ],
    errores: [
      {
        error: "Creer que la D de un azúcar y la L de un aminoácido indican hacia dónde desvían la luz polarizada.",
        correccion:
          "No lo indican. D y L son etiquetas de configuración, asignadas por comparación con el gliceraldehído de referencia, y describen parentesco estructural. El sentido de rotación de la luz se mide en un polarímetro y se escribe con (+) o (−). Existen azúcares D que son levorrotatorios y aminoácidos L que son dextrorrotatorios: la coincidencia de letras es histórica y no implica ninguna relación.",
      },
      {
        error: "Pensar que basta con que un carbono tenga cuatro sustituyentes para que la molécula sea quiral.",
        correccion:
          "Hacen falta cuatro sustituyentes distintos entre sí. Si dos son iguales, la imagen especular se superpone sobre el original girando la molécula y no hay quiralidad. Además la quiralidad es una propiedad de la molécula entera, no de un átomo: existen compuestos meso, que tienen centros quirales y aun así son aquirales porque un plano de simetría interno hace que un centro cancele al otro.",
      },
      {
        error: "Suponer que si un enantiómero es el activo, el otro simplemente no hace nada.",
        correccion:
          "Es una de las tres posibilidades y no la única. El segundo enantiómero puede ser inactivo, puede ser menos potente sobre la misma diana, puede unirse a una diana distinta y producir efectos no buscados, o puede convertirse en el primero dentro del organismo. Cuál de ellas ocurre es una cuestión empírica que se resuelve con datos de esa molécula concreta, no razonando desde la estructura.",
      },
      {
        error: "Leer una fórmula plana como si contuviera toda la información de la molécula.",
        correccion:
          "Una fórmula plana no distingue enantiómeros: los dos se dibujan igual sobre el papel. La información estereoquímica se representa con cuñas y líneas discontinuas, o con proyecciones específicas como la de Fischer. Ignorar esa capa es lo que hace que dos moléculas con comportamiento biológico muy distinto parezcan la misma en un apunte.",
      },
    ],
    tarjetas: [
      { front: "¿Qué condición debe cumplir un carbono para ser un centro quiral?", back: "Estar unido a cuatro sustituyentes distintos entre sí." },
      { front: "¿Qué son dos enantiómeros?", back: "Imágenes especulares no superponibles de la misma molécula." },
      { front: "¿En qué propiedad física medible se diferencian dos enantiómeros?", back: "En el sentido en que desvían el plano de la luz polarizada." },
      { front: "¿Qué configuración tienen los aminoácidos que la vida usa para construir proteínas?", back: "L." },
      { front: "¿Qué configuración tienen los azúcares del metabolismo energético y de los ácidos nucleicos?", back: "D." },
      { front: "¿Qué informa la notación (+)/(−) que no informa la notación D/L?", back: "El sentido real de rotación de la luz polarizada, que se mide experimentalmente." },
      { front: "¿Qué son dos diastereómeros?", back: "Estereoisómeros que no son imágenes especulares entre sí." },
      { front: "¿Por qué un compuesto meso es aquiral pese a tener centros quirales?", back: "Porque un plano de simetría interno hace que sus centros se cancelen." },
    ],
    faq: [
      {
        q: "¿Qué es la quiralidad en química?",
        a: "Una molécula es quiral cuando su imagen en el espejo no se puede superponer sobre ella, igual que ocurre con las manos. El caso más común es el de un carbono unido a cuatro sustituyentes distintos, que admite dos disposiciones espaciales diferentes. Cada una de esas dos formas se llama enantiómero, y aunque tienen los mismos átomos y los mismos enlaces, no son la misma molécula.",
      },
      {
        q: "¿Por qué las proteínas están hechas solo de aminoácidos L?",
        a: "Porque la maquinaria que las fabrica es ella misma quiral y selecciona la configuración L en varios pasos: las enzimas que cargan cada aminoácido sobre su ARN de transferencia discriminan la configuración, y el ribosoma impone restricciones geométricas adicionales. El origen de que la vida eligiera L y no D sigue siendo un problema abierto en el estudio del origen de la vida; lo que sí está establecido es que la elección, una vez hecha, quedó fijada en toda la biología conocida.",
      },
      {
        q: "¿Cuál es la diferencia entre D/L y R/S?",
        a: "D/L clasifica la configuración comparando la molécula con el gliceraldehído de referencia y es la notación habitual en bioquímica para aminoácidos y azúcares. R/S es el sistema de Cahn-Ingold-Prelog: ordena los cuatro sustituyentes de cada centro por prioridad según su número atómico y describe si ese orden gira a favor o en contra de las agujas del reloj. R/S es más riguroso y describe cada centro por separado, y no se puede deducir de D/L ni al revés.",
      },
      {
        q: "¿Por qué importa la quiralidad en los medicamentos?",
        a: "Porque la diana de un fármaco suele ser una proteína, y una proteína es un entorno quiral capaz de distinguir enantiómeros. Los dos enantiómeros de un mismo fármaco pueden diferir en afinidad por la diana, y también en cómo se absorben, se metabolizan y se eliminan, porque las enzimas y transportadores implicados también son quirales. Además algunos enantiómeros se interconvierten en el organismo, de modo que administrar uno solo no garantiza que el otro no aparezca.",
      },
    ],
    fuentes: [
      "Klein, Organic Chemistry as a Second Language, secciones de estereoquímica y configuración",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de aminoácidos y estereoquímica de biomoléculas",
      "Katzung, Farmacología básica y clínica, apartado sobre estereoisomería de los fármacos",
    ],
    relacionados: ["grupos-funcionales", "ph-pka-ionizacion"],
  },

  {
    slug: "biologia-celular",
    titulo: "Biología celular: la célula como sistema de compartimentos",
    tituloSEO: "Biología celular para medicina: organelos, membranas, tráfico vesicular y ciclo celular",
    bloque: "andamiaje",
    unidad: "B0.3 · Biología celular",
    nivel: "fundamento",
    minutos: 24,
    resumen:
      "Una célula no es una bolsa con orgánulos flotando: es un conjunto de compartimentos separados por membranas, cada uno con su propio ambiente químico, y un sistema de transporte que mueve material entre ellos con dirección. Entender esa lógica convierte histología y patología en consecuencias en lugar de listas.",
    porQueImporta:
      "Es el prerrequisito real de histología y de patología, y casi nadie lo revisa antes. Una célula que secreta mucho tiene un aspecto concreto al microscopio, y ese aspecto es una consecuencia directa de qué compartimento tiene hipertrofiado. Enfermedades enteras se explican como fallos de un compartimento o de una ruta de transporte, y el cáncer es en gran medida un trastorno del control del ciclo celular. Sin esta base, todo eso se memoriza; con ella, se deduce.",
    secciones: [
      {
        titulo: "La membrana es lo que crea el problema y la solución",
        cuerpo: [
          "La unidad de organización de la célula es la **bicapa lipídica**. Los fosfolípidos son anfipáticos: tienen una cabeza polar que busca el agua y dos colas hidrófobas que la evitan. En medio acuoso se ordenan solos en una doble capa con las colas hacia dentro, y esa estructura se forma sin gasto de energía ni instrucciones, por pura consecuencia de la geometría de la molécula.",
          "El interior hidrófobo de la bicapa es una barrera para todo lo que tenga carga o sea muy polar. Ahí está a la vez el problema y la solución: la membrana impide el paso libre, lo que obliga a que exista maquinaria de transporte, pero al impedirlo permite mantener a ambos lados composiciones distintas. Sin esa diferencia no habría potencial de membrana, ni gradientes que almacenen energía, ni compartimentos con químicas incompatibles conviviendo en la misma célula.",
          "La membrana no es una lámina rígida sino un mosaico fluido: las proteínas se desplazan lateralmente y el colesterol modula la fluidez. Y no es simétrica: la composición de la cara interna y la externa es distinta, y esa asimetría es información. La exposición de fosfatidilserina en la cara externa, por ejemplo, es una de las señales que marcan a una célula que está muriendo por apoptosis para que sea retirada.",
        ],
      },
      {
        titulo: "Cada orgánulo es un ambiente químico distinto",
        cuerpo: [
          "El **núcleo** guarda el ADN y lo separa del citoplasma. Esa separación es lo que permite que en eucariotas la transcripción y la traducción ocurran en momentos y lugares distintos, y que entre las dos quepa toda la regulación del procesamiento del ARN.",
          "El **retículo endoplásmico rugoso** debe su aspecto a los ribosomas adheridos a su cara citosólica. Ahí se sintetizan las proteínas destinadas a ser secretadas, a insertarse en membranas o a acabar en un lisosoma. Una célula plasmática, que produce anticuerpos a gran escala, tiene el retículo rugoso enormemente desarrollado, y por eso su citoplasma se tiñe intensamente con colorantes básicos.",
          "El **retículo endoplásmico liso** no tiene ribosomas y hace otras tres cosas: sintetiza lípidos y esteroides, participa en el metabolismo de compuestos exógenos en el hepatocito, y almacena calcio. En el músculo esa última función está tan especializada que el compartimento recibe nombre propio, retículo sarcoplásmico, y es la pieza que acopla la excitación con la contracción.",
          "El **aparato de Golgi** recibe lo que sale del retículo y lo procesa de forma direccional, desde su cara cis hacia la trans: modifica cadenas de azúcares, corta precursores y clasifica cada proteína hacia su destino. Es a la vez taller de acabado y oficina de correos.",
          "Los **lisosomas** contienen hidrolasas ácidas y mantienen en su interior un pH en torno a 5, mucho más ácido que el citosol. Esa acidez no es un detalle: es lo que hace que sus enzimas solo funcionen dentro, de modo que una fuga menor al citosol neutro no digiere la célula. Los **peroxisomas** son otro compartimento aparte, especializado en oxidaciones que generan peróxido de hidrógeno —que su propia catalasa descompone— y en la degradación de ácidos grasos de cadena muy larga que la mitocondria no procesa.",
          "Las **mitocondrias** tienen doble membrana, y la interna está muy plegada en crestas para aumentar la superficie donde ocurre la fosforilación oxidativa. Conservan ADN propio, se heredan por vía materna y una célula contiene muchas copias, de modo que puede coexistir ADN mitocondrial normal y mutado en la misma célula: esa mezcla se llama heteroplasmia y es la razón de que las enfermedades mitocondriales se expresen de forma tan variable.",
        ],
      },
      {
        titulo: "El tráfico vesicular tiene dirección y etiquetas",
        cuerpo: [
          "El material no se difunde entre compartimentos: viaja en vesículas que se desprenden de una membrana y se fusionan con otra. Y no viaja al azar. Cada vesícula lleva marcadores que determinan con qué membrana se fusiona, de modo que el sistema tiene una direccionalidad estricta.",
          "La ruta principal es la **vía secretora**: la proteína se sintetiza en el retículo rugoso, pasa al Golgi, lo recorre de cis a trans mientras se modifica, y desde la red trans se despacha hacia su destino, sea la membrana plasmática, el exterior de la célula o un lisosoma. En sentido contrario, la **endocitosis** introduce material desde fuera, que pasa por endosomas y termina con frecuencia en un lisosoma.",
          "El mecanismo de clasificación merece detenerse porque es el ejemplo más limpio de que aquí hay etiquetas y no azar. Las enzimas destinadas al lisosoma reciben en el Golgi una marca química, la **manosa-6-fosfato**, y un receptor la reconoce y las desvía a la ruta correcta. Si falla la enzima que coloca esa marca, las hidrolasas no se etiquetan, el receptor no las reconoce y la célula las secreta al exterior en lugar de enviarlas al lisosoma. El resultado es una enfermedad en la que los lisosomas están vacíos de enzimas mientras estas se acumulan en la sangre: es la enfermedad de células I o mucolipidosis tipo II.",
          "Ese caso enseña la lógica general de las **enfermedades por depósito lisosomal**. Si falta una hidrolasa concreta, su sustrato se acumula dentro del lisosoma; qué órgano sufre y con qué gravedad depende de dónde se produce más ese sustrato. La enfermedad de Tay-Sachs, por déficit de hexosaminidasa A, y la de Gaucher, por déficit de glucocerebrosidasa, son dos ejemplos del mismo patrón.",
        ],
      },
      {
        titulo: "El ciclo celular y sus puntos de control",
        cuerpo: [
          "Dividirse ordenadamente exige duplicar el ADN una sola vez y repartirlo con exactitud. El ciclo se divide en interfase —**G1**, **S** y **G2**— y **mitosis**. En G1 la célula crece y decide si va a dividirse; en S duplica el ADN; en G2 se prepara y verifica; en M se reparte el material y se divide.",
          "Muchas células del organismo no están en el ciclo sino en **G0**, un estado de reposo del que algunas pueden volver a entrar cuando reciben una señal y otras no vuelven nunca. Un hepatocito puede reincorporarse al ciclo tras una lesión; una neurona madura, en general, no. Esa diferencia decide qué tejidos se regeneran y cuáles reparan con cicatriz.",
          "El ciclo no avanza por inercia: avanza si pasa una serie de **puntos de control**. Antes de entrar en S hay un control que verifica tamaño, nutrientes, señales de crecimiento e integridad del ADN. Antes de mitosis hay otro que comprueba que la duplicación se completó y que no hay daño. Y durante la mitosis, el control del huso impide separar las cromátidas hasta que todos los cromosomas están correctamente anclados.",
          "El motor son las **ciclinas** y las **quinasas dependientes de ciclina**: la quinasa solo trabaja unida a su ciclina, y como la concentración de ciclinas sube y baja a lo largo del ciclo, la actividad aparece y desaparece en el momento justo. Los puntos de control funcionan frenando ese motor, y ahí es donde encaja la patología: **cuando el freno se pierde, la célula avanza con daño no reparado, y eso es una de las vías centrales hacia el cáncer.**",
        ],
      },
    ],
    analogia: {
      campo: "Logística industrial",
      texto:
        "La célula se parece a una fábrica con almacenes separados: el retículo rugoso es la línea de montaje, el Golgi el área de acabado y expedición que etiqueta cada paquete con su destino, los lisosomas la planta de reciclaje y las mitocondrias la central eléctrica.",
      dondeSeRompe:
        "La fábrica sugiere un plano fijo y una jerarquía que deciden desde arriba, y no hay nada de eso. Los compartimentos son dinámicos: se fusionan, se dividen y cambian de tamaño según la demanda, y la mitocondria no es un objeto sino una red que se remodela continuamente. Además no existe ningún gerente: la direccionalidad emerge de interacciones moleculares locales entre marcadores y receptores, no de una instrucción central.",
    },
    recall: [
      {
        pregunta: "Reconstruye el recorrido completo de una proteína destinada a ser secretada, desde su síntesis hasta el exterior de la célula.",
        referencia:
          "La síntesis empieza en un ribosoma libre en el citosol, pero la secuencia inicial de la proteína dirige el conjunto al retículo endoplásmico rugoso, donde la traducción continúa mientras la cadena entra en la luz del retículo. Allí se pliega y recibe modificaciones iniciales. Desde el retículo sale en vesículas hacia el aparato de Golgi, que recorre de la cara cis a la trans mientras se modifican sus cadenas de azúcares y, si procede, se cortan precursores. En la red trans del Golgi se clasifica según su destino y se empaqueta en vesículas de secreción. Esas vesículas se desplazan hasta la membrana plasmática y se fusionan con ella, vertiendo el contenido al exterior. La fusión puede ser continua o esperar una señal, y en este último caso es habitual que el disparo sea una entrada de calcio.",
        pistas: [
          "¿Dónde empieza la traducción y qué hace que continúe en otro sitio?",
          "¿En qué orden atraviesa el Golgi y qué le ocurre por el camino?",
          "¿Qué proceso final vierte el contenido de la vesícula al exterior?",
        ],
      },
      {
        pregunta: "Explica qué son los puntos de control del ciclo celular, dónde están y por qué su fallo se relaciona con el cáncer.",
        referencia:
          "Son mecanismos que impiden que el ciclo avance a la siguiente fase mientras no se cumplan ciertas condiciones. El control previo a la fase S verifica que la célula tenga tamaño y nutrientes suficientes, que haya recibido señales de crecimiento y que su ADN esté intacto. El control previo a la mitosis comprueba que la duplicación se completó y que no hay daño pendiente. El control del huso, ya dentro de la mitosis, impide separar las cromátidas hermanas hasta que todos los cromosomas están correctamente unidos al huso. El motor del ciclo son las ciclinas y sus quinasas dependientes, cuya actividad aparece y desaparece porque la concentración de ciclinas oscila; los puntos de control actúan frenando ese motor. Si un control falla, la célula progresa con ADN dañado o mal repartido y acumula alteraciones genéticas de división en división, que es uno de los mecanismos centrales de la transformación maligna.",
        pistas: [
          "Nombra los tres momentos del ciclo donde hay una verificación.",
          "¿Qué pareja de moléculas hace avanzar el ciclo y por qué su actividad es intermitente?",
          "¿Qué se acumula, división tras división, si un control deja de frenar?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Falla la enzima que añade la marca de manosa-6-fosfato a las hidrolasas en el Golgi.",
        pregunta: "¿Dónde terminan esas enzimas y qué le pasa a los lisosomas?",
        respuesta:
          "Sin la marca, el receptor que desvía las hidrolasas hacia la ruta lisosomal no las reconoce, así que siguen la ruta por defecto de la vía secretora y acaban vertidas al exterior de la célula. El resultado tiene dos caras simultáneas y aparentemente contradictorias: concentraciones elevadas de esas enzimas en la sangre y, al mismo tiempo, lisosomas incapaces de digerir su contenido, que se llenan de material sin degradar. Es la enfermedad de células I o mucolipidosis tipo II. El caso ilustra que en la célula el destino de una proteína no depende de lo que la proteína es, sino de la etiqueta que lleva.",
      },
      {
        escenario: "Una célula sufre daño en su ADN pero su punto de control previo a la fase S no funciona.",
        pregunta: "¿Qué ocurre en la división siguiente y en las posteriores?",
        respuesta:
          "La célula entra en fase S y duplica el ADN dañado en lugar de detenerse a repararlo o de activar su propia muerte. La lesión queda fijada en las dos células hijas y se transmite en cada división posterior. Como además el control que faltaba era el que habría dado tiempo a la reparación, cada ciclo añade alteraciones nuevas sobre las anteriores. Esa acumulación progresiva de daño genético en un clon que sigue dividiéndose es uno de los mecanismos centrales de la transformación maligna, y explica por qué los genes de los puntos de control son de los que aparecen mutados con más frecuencia en tumores.",
      },
    ],
    errores: [
      {
        error: "Imaginar la célula como una bolsa con orgánulos flotando sueltos.",
        correccion:
          "Los compartimentos están conectados por rutas de transporte con dirección definida, y su posición está organizada por el citoesqueleto, que además funciona como vía por la que se desplazan las vesículas. La imagen de la bolsa impide entender el tráfico vesicular, que es justamente donde se explican varias enfermedades.",
      },
      {
        error: "Creer que el retículo rugoso es rugoso por su forma.",
        correccion:
          "Lo es por los ribosomas adheridos a su cara citosólica, que le dan ese aspecto granular al microscopio electrónico. La distinción no es estética: define la función. Con ribosomas se fabrican proteínas destinadas a secreción, membrana o lisosoma; sin ellos, el retículo liso se ocupa de lípidos, esteroides, metabolismo de compuestos exógenos y almacenamiento de calcio.",
      },
      {
        error: "Pensar que el lisosoma es peligroso porque «podría digerir la célula».",
        correccion:
          "Sus hidrolasas son ácidas y necesitan el pH próximo a 5 que se mantiene dentro del lisosoma. En el citosol, que es prácticamente neutro, quedan muy poco activas. Esa dependencia del pH es una salvaguarda incorporada al propio diseño, no un accidente: una fuga pequeña no provoca autodigestión.",
      },
      {
        error: "Tratar G0 como una pausa breve dentro del ciclo.",
        correccion:
          "G0 no es una fase del ciclo sino una salida de él, y puede durar toda la vida de la célula. Lo decisivo es que unas células pueden reincorporarse al ciclo ante un estímulo y otras no: esa diferencia determina qué tejidos se regeneran tras una lesión y cuáles reparan formando cicatriz, que es una de las ideas más rentables de toda la patología.",
      },
      {
        error: "Asumir que toda la información genética de la célula está en el núcleo.",
        correccion:
          "Las mitocondrias tienen su propio ADN, se heredan por vía materna y están presentes en muchas copias por célula, de modo que pueden coexistir copias normales y mutadas en la misma célula. Esa mezcla, llamada heteroplasmia, explica por qué las enfermedades mitocondriales varían tanto en gravedad y en qué órganos afectan.",
      },
    ],
    tarjetas: [
      { front: "¿Qué propiedad de los fosfolípidos hace que formen bicapas solos en medio acuoso?", back: "Que son anfipáticos: cabeza polar y colas hidrófobas." },
      { front: "¿Qué tipo de proteínas se sintetizan en el retículo endoplásmico rugoso?", back: "Las destinadas a secreción, a membrana o a lisosoma." },
      { front: "¿Qué compartimento almacena el calcio que dispara la contracción del músculo?", back: "El retículo sarcoplásmico, que es retículo liso especializado." },
      { front: "¿En qué sentido recorre una proteína el aparato de Golgi?", back: "De la cara cis a la cara trans." },
      { front: "¿Qué marca química dirige una hidrolasa hacia el lisosoma?", back: "La manosa-6-fosfato." },
      { front: "¿Qué pH aproximado mantiene el interior del lisosoma?", back: "Alrededor de 5." },
      { front: "¿Qué degrada el peroxisoma que la mitocondria no procesa?", back: "Los ácidos grasos de cadena muy larga." },
      { front: "¿En qué fase del ciclo celular se duplica el ADN?", back: "En la fase S." },
      { front: "¿Qué impide el punto de control del huso mitótico?", back: "Que se separen las cromátidas antes de que todos los cromosomas estén anclados." },
      { front: "¿Por qué la actividad de una quinasa dependiente de ciclina es intermitente?", back: "Porque solo trabaja unida a su ciclina, y la concentración de ciclinas oscila durante el ciclo." },
    ],
    faq: [
      {
        q: "¿Cuál es la diferencia entre el retículo endoplásmico rugoso y el liso?",
        a: "El rugoso tiene ribosomas adheridos a su cara citosólica y sintetiza las proteínas destinadas a ser secretadas, insertadas en membranas o enviadas a lisosomas. El liso carece de ribosomas y se ocupa de sintetizar lípidos y esteroides, de metabolizar compuestos exógenos —función muy desarrollada en el hepatocito— y de almacenar calcio. En el músculo esta última función está tan especializada que ese compartimento recibe el nombre de retículo sarcoplásmico.",
      },
      {
        q: "¿Qué hace el aparato de Golgi?",
        a: "Recibe las proteínas que salen del retículo endoplásmico y las procesa de forma direccional, de su cara cis a su cara trans: modifica sus cadenas de azúcares, corta precursores cuando hace falta y las clasifica según su destino. Desde su red trans las despacha en vesículas hacia la membrana plasmática, hacia el exterior de la célula o hacia los lisosomas. Es a la vez el taller de acabado y el centro de clasificación de la vía secretora.",
      },
      {
        q: "¿Qué es el ciclo celular y cuáles son sus fases?",
        a: "Es la secuencia ordenada de acontecimientos por la que una célula duplica su contenido y se divide en dos. Se compone de la interfase, que incluye G1 —crecimiento y decisión de dividirse—, S —duplicación del ADN— y G2 —preparación y verificación—, y de la mitosis, en la que se reparte el material y la célula se divide. Muchas células del organismo están fuera del ciclo, en un estado de reposo llamado G0, del que algunas pueden reincorporarse y otras no.",
      },
      {
        q: "¿Por qué las mitocondrias tienen su propio ADN?",
        a: "La explicación aceptada es la teoría endosimbiótica: las mitocondrias descienden de bacterias que fueron incorporadas por una célula ancestral y conservaron parte de su genoma, lo que también encaja con su doble membrana. En la práctica clínica lo relevante son las consecuencias: ese ADN se hereda por vía materna, hay muchas copias por célula y pueden coexistir copias normales y mutadas —heteroplasmia—, lo que explica la enorme variabilidad de las enfermedades mitocondriales.",
      },
    ],
    fuentes: [
      "Alberts, Essential Cell Biology, capítulos de membranas, compartimentos intracelulares, tráfico vesicular y ciclo celular",
      "Robbins y Cotran, Patología estructural y funcional, capítulo de lesión y adaptación celular",
      "Lodish, Biología celular y molecular, secciones de tráfico de proteínas y control del ciclo celular",
    ],
    relacionados: ["ph-pka-ionizacion", "hipertrofia-vs-hiperplasia", "terminologia-medica"],
    deudaPractica:
      "Reconocer estas estructuras en una preparación real es una habilidad distinta de entenderlas. Identificar un citoplasma basófilo por retículo rugoso abundante, o distinguir una figura mitótica de un artefacto, requiere horas de microscopio con alguien que corrija lo que uno cree estar viendo.",
  },

  {
    slug: "reacciones-del-metabolismo",
    titulo: "Las reacciones del metabolismo: cinco patrones y los nombres que los delatan",
    tituloSEO: "Tipos de reacciones metabólicas: óxido-reducción, hidrólisis, fosforilación e isomerización, y cómo leer el nombre de una enzima",
    bloque: "andamiaje",
    unidad: "B0.2 · Química orgánica funcional",
    nivel: "fundamento",
    minutos: 22,
    resumen:
      "Una vía metabólica parece una lista de veinte pasos irrepetibles y en realidad es la misma media docena de reacciones aplicadas una y otra vez. Aprender los patrones —y aprender que el nombre de cada enzima describe la reacción que cataliza— convierte memorizar una vía en leerla.",
    porQueImporta:
      "Es el entregable del Bloque 0: poder mirar un paso de una vía metabólica y decir qué está cambiando y quién lo hace, sin haberlo visto antes. Quien no tiene esto memoriza glucólisis como una secuencia de nombres arbitrarios y la olvida; quien lo tiene la lee como una historia con muy pocos verbos. La diferencia entre las dos experiencias es la razón principal de que bioquímica se sienta imposible.",
    secciones: [
      {
        titulo: "Óxido-reducción: el patrón que mueve la energía",
        cuerpo: [
          "Oxidarse es perder electrones y reducirse es ganarlos, siempre a la vez y en la misma reacción: si algo se oxida, otra cosa se reduce. En bioquímica los electrones suelen viajar acompañados de protones, así que en la práctica **perder hidrógenos equivale a oxidarse y ganarlos a reducirse**, y ganar oxígeno también es oxidarse.",
          "Los electrones no van sueltos: los transportan coenzimas. El **NAD⁺** los recoge y se convierte en NADH, y esa es la moneda de las oxidaciones que van a terminar produciendo ATP. El **FAD** hace lo propio y queda como FADH₂. El **NADPH** es distinto en su función aunque se parezca en su química: es el que aporta poder reductor a las rutas de síntesis, y por eso una célula que fabrica lípidos u hormonas esteroideas necesita mucho.",
          "Esa separación entre NADH y NADPH es una de las ideas más rentables del metabolismo. La célula mantiene dos monedas de electrones distintas para no mezclar dos economías: la de obtener energía y la de construir moléculas. Confundirlas al estudiar hace que las vías anabólicas y catabólicas parezcan intercambiables cuando no lo son.",
          "El nombre de la enzima lo delata: una **deshidrogenasa** quita hidrógenos, es decir, oxida. Una **oxidasa** usa oxígeno como aceptor final de electrones. Una **reductasa** hace el camino inverso. Una **oxigenasa** incorpora oxígeno a la molécula, que no es lo mismo que usarlo como aceptor.",
        ],
      },
      {
        titulo: "Hidrólisis y condensación: romper y unir con agua de por medio",
        cuerpo: [
          "Una **hidrólisis** rompe un enlace usando una molécula de agua, que se reparte entre los dos fragmentos. Es lo que ocurre en la digestión: las proteasas hidrolizan enlaces peptídicos, las lipasas hidrolizan enlaces éster de los triglicéridos, las glucosidasas hidrolizan enlaces entre azúcares.",
          "La **condensación** es la operación inversa: dos moléculas se unen y se libera agua. Por eso también se llama síntesis por deshidratación. Todos los polímeros del organismo se construyen así —péptidos, glucógeno, ácidos nucleicos— y todos se degradan por hidrólisis.",
          "La asimetría entre las dos direcciones es la que conviene retener. La hidrólisis suele ser espontánea en términos energéticos, mientras que la condensación no lo es y necesita que la célula la pague. Ese es el motivo de que construir cueste energía y degradar la libere, y de que las rutas de síntesis y las de degradación de una misma molécula casi nunca sean el mismo camino recorrido al revés: si lo fueran, funcionarían en una sola dirección y no se podrían regular por separado.",
        ],
      },
      {
        titulo: "Fosforilación: la operación más frecuente de la célula",
        cuerpo: [
          "Añadir un grupo fosfato hace tres cosas a la vez, y por eso aparece en todas partes. Primero, **carga la molécula negativamente**, con lo que deja de atravesar membranas y queda atrapada dentro de la célula. Segundo, **eleva su contenido energético** y la vuelve más reactiva para el paso siguiente. Tercero, **cambia la forma de una proteína** y con ello la enciende o la apaga: eso es una señal.",
          "Las enzimas que transfieren un fosfato desde el ATP se llaman **quinasas**; las que lo retiran, **fosfatasas**. Ese par forma un interruptor reversible, y la mayor parte de la regulación rápida del metabolismo y de la señalización celular funciona con él. Conviene no confundirlas con las **mutasas**, que no añaden ni quitan nada: mueven un grupo de una posición a otra dentro de la misma molécula.",
          "El primer paso de la glucólisis es el ejemplo canónico y merece verse con este lente. La glucosa entra en la célula y una quinasa la fosforila. La consecuencia inmediata no es energética sino topológica: la glucosa fosforilada ya no puede salir por el transportador por el que entró, y queda comprometida con la célula. Fosforilar es, antes que nada, una forma de retener.",
        ],
      },
      {
        titulo: "Isomerización y transferencia de grupos: reordenar y mover",
        cuerpo: [
          "Una **isomerización** no añade ni quita átomos: reordena los que ya están. Parece un paso menor y rara vez lo es, porque suele servir para preparar la molécula para la reacción siguiente, colocando un grupo funcional donde hace falta. Las enzimas se llaman **isomerasas**, y las **mutasas** son un caso particular en el que lo que se traslada es un grupo dentro de la propia molécula.",
          "La **transferencia de grupos** mueve un fragmento de una molécula a otra, y las enzimas se llaman **transferasas**. Dentro de esta familia hay dos que aparecen constantemente: las **carboxilasas**, que añaden CO₂ y suelen necesitar biotina como cofactor, y las **descarboxilasas**, que lo eliminan y con frecuencia dependen de un derivado de la vitamina B6.",
          "Esa dependencia de cofactores no es un dato suelto que memorizar: es el puente entre el metabolismo y la nutrición clínica. Cuando falta una vitamina, lo que falla es un tipo concreto de reacción, y los síntomas siguen a las rutas donde ese tipo de reacción es imprescindible.",
        ],
      },
      {
        titulo: "El nombre de la enzima es la respuesta",
        cuerpo: [
          "La nomenclatura enzimática es descriptiva, y una vez que se ve deja de haber nombres que memorizar. La raíz dice sobre qué actúa y el final dice qué le hace. **Lactato deshidrogenasa** significa exactamente lo que dice: quita hidrógenos al lactato. **Glucógeno fosforilasa** rompe glucógeno introduciendo un fosfato. **Piruvato carboxilasa** añade CO₂ al piruvato.",
          "La clasificación formal ordena las enzimas por el tipo de reacción: oxidorreductasas, transferasas, hidrolasas, liasas, isomerasas y ligasas, a las que desde 2018 se añadió una séptima clase para las translocasas, que mueven sustancias a través de membranas. Vale la pena reconocer los seis primeros nombres porque son justamente los patrones de este tema con otra etiqueta.",
          "Hay una distinción que conviene manejar con cuidado. Se enseña que una **sintetasa** consume un nucleósido trifosfato como el ATP mientras que una **sintasa** no, y como regla mnemotécnica funciona. Pero la nomenclatura oficial ha ido dejando de sostener esa separación de forma estricta, y hay enzimas cuyo nombre consagrado no la respeta. Úsala para orientarte y no como una ley: aquí el nombre orienta, no demuestra.",
        ],
      },
    ],
    analogia: {
      campo: "Lenguaje",
      texto:
        "Una vía metabólica se lee como una frase: el sustrato es el sujeto, la enzima es el verbo y el nombre de la enzima dice qué verbo es. Aprender los patrones de reacción es aprender la media docena de verbos con los que está escrito todo el metabolismo.",
      dondeSeRompe:
        "En una frase el verbo determina el resultado por sí solo, y una reacción bioquímica no está determinada por su enzima: depende de las concentraciones a ambos lados, del estado energético de la célula y de la regulación que actúe sobre esa enzima en ese momento. Muchas reacciones son reversibles y su dirección real la fija el contexto, no el nombre. Y hay excepciones de nomenclatura, como la distinción entre sintasa y sintetasa, que la analogía haría parecer más fiables de lo que son.",
    },
    recall: [
      {
        pregunta: "Enumera los patrones de reacción del metabolismo y di cómo reconocer cada uno por el nombre de su enzima.",
        referencia:
          "Óxido-reducción: transferencia de electrones, que en bioquímica suele significar pérdida o ganancia de hidrógenos; las enzimas se llaman deshidrogenasas si quitan hidrógenos, oxidasas si usan oxígeno como aceptor final, oxigenasas si lo incorporan a la molécula y reductasas si añaden electrones. Hidrólisis y condensación: romper un enlace con agua o unir dos moléculas liberándola; hidrolasas, y dentro de ellas proteasas, lipasas y glucosidasas según el sustrato. Fosforilación: las quinasas transfieren un fosfato desde el ATP y las fosfatasas lo retiran. Isomerización: reordenar los átomos que ya están, con isomerasas, y mutasas cuando el grupo se traslada dentro de la misma molécula. Transferencia de grupos: transferasas, con las carboxilasas y descarboxilasas como casos frecuentes. La regla general es que la raíz del nombre indica el sustrato y la terminación indica la operación.",
        pistas: [
          "Son cinco patrones y el primero es el que mueve la energía.",
          "Dos de ellos son operaciones inversas la una de la otra.",
          "¿Qué añade una quinasa y de dónde lo saca?",
        ],
      },
      {
        pregunta: "Explica las tres cosas que consigue la célula al fosforilar una molécula, y por qué el primer paso de la glucólisis es el ejemplo típico.",
        referencia:
          "Primero, el fosfato aporta carga negativa, y una molécula cargada no atraviesa la bicapa lipídica: queda atrapada dentro de la célula. Segundo, eleva el contenido energético de la molécula y la hace más reactiva para el paso siguiente de la vía. Tercero, si lo que se fosforila es una proteína, el cambio de carga modifica su conformación y con ello su actividad, lo que convierte la fosforilación en un mecanismo de señalización reversible, ya que una fosfatasa puede revertirla. En la glucólisis, la glucosa que entra en la célula es fosforilada de inmediato por una quinasa; la consecuencia inmediata es que ya no puede salir por el transportador por el que entró. El paso retiene la glucosa y la compromete con la ruta, además de prepararla químicamente para los pasos siguientes.",
        pistas: [
          "Una de las tres consecuencias es puramente topológica: tiene que ver con dónde puede estar la molécula.",
          "¿Qué le ocurre a una molécula cargada frente a una bicapa lipídica?",
          "¿Qué enzima revierte una fosforilación y por qué eso convierte el par en un interruptor?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Una célula no consigue regenerar NADPH pero mantiene intacta su producción de NADH.",
        pregunta: "¿Qué tipo de procesos se verán afectados y cuáles seguirán funcionando?",
        respuesta:
          "Seguirán funcionando las rutas de obtención de energía, porque son las que usan NAD⁺ y NADH para transportar los electrones que acaban alimentando la fosforilación oxidativa. Se verán afectadas las rutas que necesitan poder reductor para construir: síntesis de ácidos grasos, síntesis de colesterol y de hormonas esteroideas, y también los sistemas que mantienen las defensas frente al daño oxidativo, que dependen de NADPH para regenerarse. El caso ilustra por qué la célula mantiene dos monedas de electrones separadas en lugar de una sola: son dos economías distintas, la de gastar y la de construir, y tenerlas separadas permite regularlas de forma independiente.",
      },
      {
        escenario: "Se bloquea la fosfatasa que revierte la fosforilación de una enzima reguladora, sin tocar la quinasa correspondiente.",
        pregunta: "¿En qué estado queda esa enzima y qué se pierde?",
        respuesta:
          "La enzima queda fosforilada de forma permanente, porque la quinasa sigue añadiendo fosfato y ya nada lo retira. Si la fosforilación la activaba, quedará encendida sin posibilidad de apagarse; si la inhibía, quedará apagada. Lo que se pierde no es solo un estado concreto sino la reversibilidad, que es lo que hacía útil el mecanismo: un interruptor que no se puede devolver a su posición deja de ser un interruptor y pasa a ser un ajuste fijo. La señal deja de poder responder al cambio de condiciones, que es justamente para lo que existía.",
      },
    ],
    errores: [
      {
        error: "Creer que oxidarse significa reaccionar con oxígeno.",
        correccion:
          "Oxidarse es perder electrones, y eso ocurre en muchísimas reacciones donde no interviene oxígeno alguno. El nombre es un accidente histórico procedente de las primeras reacciones estudiadas. En bioquímica el criterio práctico es la pérdida de hidrógenos, que es lo que hace una deshidrogenasa, y de ahí que muchas oxidaciones ocurran sin que el oxígeno aparezca en la ecuación.",
      },
      {
        error: "Usar NADH y NADPH como si fueran la misma coenzima con distinto nombre.",
        correccion:
          "Su química es casi idéntica pero su papel no lo es. El NADH transporta electrones hacia la producción de energía, mientras que el NADPH aporta poder reductor a las rutas de síntesis y a la defensa frente al daño oxidativo. La célula las mantiene separadas precisamente para poder regular por vías independientes lo que gasta y lo que construye.",
      },
      {
        error: "Pensar que una vía de síntesis es la vía de degradación recorrida al revés.",
        correccion:
          "Suelen compartir varios pasos, pero difieren siempre en los irreversibles, y esa diferencia es el punto entero. Si ambas usaran exactamente las mismas enzimas, cualquier señal que activara una activaría también la otra y la célula no podría decidir qué hacer. Al tener pasos propios, cada dirección se regula por separado y se evita un ciclo fútil que solo consumiría energía.",
      },
      {
        error: "Suponer que el sufijo -asa siempre indica lo mismo en cualquier enzima.",
        correccion:
          "El sufijo señala que es una enzima, pero lo informativo es la palabra completa. Una quinasa añade fosfato desde el ATP, una fosforilasa introduce un fosfato inorgánico al romper un enlace y una fosfatasa retira un fosfato: tres operaciones distintas con nombres parecidos. Y la distinción entre sintasa y sintetasa, útil como orientación, no la respeta rigurosamente la nomenclatura oficial.",
      },
      {
        error: "Tratar los cofactores vitamínicos como un dato de examen sin relación con la clínica.",
        correccion:
          "Cada cofactor habilita un tipo concreto de reacción: la biotina en las carboxilaciones, los derivados de la vitamina B6 en muchas descarboxilaciones y transaminaciones. Cuando falta el cofactor, lo que se detiene es ese tipo de reacción en todas las rutas donde aparece, y ahí es donde se origina el cuadro clínico. El cofactor es el nexo entre el metabolismo y la nutrición.",
      },
    ],
    tarjetas: [
      { front: "En bioquímica, ¿qué le ocurre a una molécula que pierde hidrógenos?", back: "Se oxida." },
      { front: "¿Qué operación cataliza una deshidrogenasa?", back: "Una oxidación: retira hidrógenos del sustrato." },
      { front: "¿Qué coenzima aporta poder reductor a las rutas de síntesis?", back: "El NADPH." },
      { front: "¿Qué coenzima recoge electrones destinados a producir energía?", back: "El NAD⁺, que queda como NADH." },
      { front: "¿Qué diferencia hay entre una quinasa y una fosfatasa?", back: "La quinasa añade un fosfato desde el ATP; la fosfatasa lo retira." },
      { front: "¿Qué hace una mutasa?", back: "Traslada un grupo de una posición a otra dentro de la misma molécula." },
      { front: "¿Qué reacción rompe un enlace consumiendo una molécula de agua?", back: "La hidrólisis." },
      { front: "¿Qué se libera cuando dos moléculas se unen por condensación?", back: "Una molécula de agua." },
      { front: "¿Qué cofactor necesitan habitualmente las carboxilasas?", back: "La biotina." },
      { front: "¿Por qué la glucosa fosforilada no puede salir de la célula?", back: "Porque el fosfato le da carga y no atraviesa la bicapa lipídica." },
    ],
    faq: [
      {
        q: "¿Cuáles son los tipos principales de reacciones del metabolismo?",
        a: "Cinco patrones cubren casi todo: óxido-reducción, que transfiere electrones y en bioquímica suele verse como pérdida o ganancia de hidrógenos; hidrólisis y condensación, que rompen o forman enlaces con agua de por medio; fosforilación, que añade o retira grupos fosfato; isomerización, que reordena los átomos sin añadir ni quitar ninguno; y transferencia de grupos, que mueve un fragmento de una molécula a otra. Una vía metabólica larga es en general estos mismos patrones repetidos sobre sustratos distintos.",
      },
      {
        q: "¿Qué diferencia hay entre NADH y NADPH?",
        a: "Químicamente son casi iguales y ambos transportan electrones, pero cumplen papeles distintos. El NADH lleva electrones hacia las rutas que producen energía y terminan en la fosforilación oxidativa. El NADPH aporta poder reductor a las rutas de síntesis, como la de ácidos grasos y la de esteroides, y a los sistemas que protegen frente al daño oxidativo. La célula mantiene las dos monedas separadas para poder regular de forma independiente lo que gasta y lo que construye.",
      },
      {
        q: "¿Qué hace una quinasa?",
        a: "Transfiere un grupo fosfato desde el ATP a otra molécula. Eso consigue tres cosas: aporta carga negativa, lo que impide que la molécula atraviese membranas y la retiene dentro de la célula; eleva su contenido energético y la hace más reactiva; y, cuando lo que se fosforila es una proteína, cambia su conformación y con ello su actividad. Como una fosfatasa puede retirar ese fosfato, el par forma un interruptor reversible que es la base de gran parte de la señalización celular.",
      },
      {
        q: "¿Cómo se leen los nombres de las enzimas?",
        a: "La raíz indica el sustrato sobre el que actúan y la terminación indica la operación que realizan. Lactato deshidrogenasa retira hidrógenos al lactato; piruvato carboxilasa añade CO₂ al piruvato; glucógeno fosforilasa rompe el glucógeno introduciendo un fosfato. Reconocer las terminaciones más frecuentes —quinasa, fosfatasa, deshidrogenasa, isomerasa, mutasa, transferasa, hidrolasa— permite deducir qué ocurre en un paso de una vía sin haberlo estudiado antes.",
      },
    ],
    fuentes: [
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulos de bioenergética y de introducción al metabolismo",
      "Lippincott Illustrated Reviews: Bioquímica, capítulos de enzimas y bioenergética",
      "Nomenclatura de enzimas del Comité de Nomenclatura de la IUBMB, incluida la clase 7 de translocasas añadida en 2018",
    ],
    relacionados: ["grupos-funcionales", "ph-pka-ionizacion", "biologia-celular"],
  },
  {
    slug: "glucolisis",
    titulo: "Glucólisis: la vía que funciona sin oxígeno",
    tituloSEO: "Glucólisis: pasos, enzimas reguladoras, balance de ATP y por qué funciona sin oxígeno",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 22,
    resumen:
      "Diez pasos que parten una glucosa en dos piruvatos, con ganancia neta de dos ATP y dos NADH. Lo que la hace especial no es cuánto rinde —rinde poco— sino que no necesita oxígeno ni mitocondrias, y por eso es lo único que le queda a un tejido isquémico y lo único que tiene un eritrocito.",
    porQueImporta:
      "Es la primera vía metabólica que se estudia y la que decide si bioquímica se vuelve legible o no. Además explica cosas que se ven en la clínica todos los días: por qué un tejido mal perfundido produce lactato, por qué el eritrocito depende de una sola ruta para vivir, y por qué el hígado y el resto del cuerpo responden distinto a la misma glucemia. Y la regulación de un solo paso, el de la fosfofructocinasa-1, es el modelo de cómo se controla cualquier vía.",
    secciones: [
      {
        titulo: "Dos fases, y la primera cuesta dinero",
        cuerpo: [
          "La glucólisis se divide en dos mitades con lógicas opuestas. En la **fase de inversión**, la célula gasta dos ATP para preparar la molécula; en la **fase de beneficio**, recupera cuatro. La ganancia neta son dos, y esa aritmética confunde a mucha gente porque el número que se recuerda —cuatro— no es el que cuenta.",
          "Gastar ATP para poder obtener ATP parece absurdo hasta que se ve para qué sirve. La glucosa es una molécula estable y neutra; fosforilarla la vuelve reactiva y, sobre todo, **le da carga**. Una molécula cargada no atraviesa la bicapa lipídica, así que la glucosa fosforilada queda atrapada dentro de la célula. El primer ATP no compra energía: compra retención.",
          "El punto de bisagra es la escisión: una molécula de seis carbonos se parte en dos de tres. A partir de ahí **todo ocurre por duplicado**, y ese detalle es la causa del error de balance más común. Cada paso posterior rinde el doble de lo que aparenta cuando se lee la vía una sola vez.",
        ],
      },
      {
        titulo: "Tres pasos por los que no se puede volver",
        cuerpo: [
          "De las diez reacciones, siete son reversibles y tres no. Las tres irreversibles son las catalizadas por la **hexocinasa**, la **fosfofructocinasa-1** y la **piruvato cinasa**, y son exactamente los tres puntos donde la vía se regula.",
          "No es casualidad. Una reacción reversible va en la dirección que marquen las concentraciones a cada lado, así que regularla no sirve de mucho. Una irreversible siempre va en el mismo sentido, y ahí sí tiene sentido poner un interruptor. **Donde una vía es irreversible, busca la regulación**; es una regla que se repite en todo el metabolismo.",
          "La consecuencia es que la gluconeogénesis, que fabrica glucosa, no puede ser la glucólisis recorrida al revés: tiene que rodear esos tres pasos con enzimas propias. Y esa diferencia es lo que permite que la célula active una vía y apague la otra en vez de tenerlas corriendo a la vez y gastando energía sin producir nada.",
        ],
      },
      {
        titulo: "La fosfofructocinasa-1 es la que manda",
        cuerpo: [
          "De los tres puntos de control, el que fija la velocidad de la vía es la **fosfofructocinasa-1**. La inhiben el ATP y el citrato, y la activa el AMP. Leído en voz alta suena a lista; leído como mecanismo dice algo simple: la enzima mide si a la célula le sobra o le falta energía y ajusta el flujo en consecuencia.",
          "El citrato merece atención aparte. Es un intermediario del ciclo de Krebs, y que su acumulación frene la glucólisis significa que **una vía posterior avisa hacia atrás de que está saturada**. Si el ciclo no da abasto, no tiene sentido seguir mandando piruvato.",
          "La hexocinasa tiene su propio matiz, y es clínico. En casi todos los tejidos la enzima es la hexocinasa, con mucha afinidad por la glucosa: trabaja al máximo incluso con glucemias bajas, porque esos tejidos necesitan glucosa siempre. En el hígado la isoenzima es la **glucocinasa**, con menos afinidad, de modo que solo se pone a trabajar de verdad cuando la glucosa abunda. El hígado no compite por la glucosa cuando escasea: la retira cuando sobra.",
        ],
      },
      {
        titulo: "El problema del NAD⁺, que es el que obliga a todo lo demás",
        cuerpo: [
          "Solo hay un paso de oxidación en toda la glucólisis, el de la gliceraldehído-3-fosfato deshidrogenasa, y ahí se produce el NADH. Ese paso necesita NAD⁺ para funcionar, y la célula tiene una cantidad limitada de NAD⁺ que va convirtiendo en NADH.",
          "De ahí sale la restricción que gobierna todo lo demás: **si el NADH no se vuelve a oxidar a NAD⁺, la glucólisis se detiene**, no por falta de glucosa sino por falta de transportador libre. Con oxígeno, el NADH cede sus electrones en la mitocondria y el NAD⁺ vuelve. Sin oxígeno, hace falta otra salida.",
          "Esa salida es reducir el piruvato a **lactato**. Conviene decirlo con precisión: el objetivo de la fermentación láctica no es fabricar lactato, es regenerar NAD⁺. El lactato es el residuo de haber resuelto un problema de contabilidad de electrones, no el producto que se buscaba.",
          "El eritrocito vive de forma permanente en esta situación porque no tiene mitocondrias, así que la glucólisis es literalmente su única fuente de ATP y produce lactato todo el tiempo en condiciones normales. No es un signo de que algo vaya mal en él.",
        ],
      },
    ],
    analogia: {
      campo: "Una caja registradora",
      texto:
        "La fase de inversión es el cambio que hay que poner en la caja antes de abrir, y la de beneficio es lo que entra durante el día. Al cerrar, lo que cuenta no es la recaudación bruta sino lo que queda después de descontar el fondo inicial.",
      dondeSeRompe:
        "La caja sugiere que el único objetivo es el saldo, y la glucólisis produce dos cosas más que a menudo importan más que el ATP: piruvato, que es materia prima para el ciclo de Krebs o para fabricar otras moléculas, y NADH, que lleva electrones. Además el fondo de caja se recupera intacto y aquí no: los dos ATP gastados se invirtieron en modificar la molécula, no se guardaron.",
    },
    figura: "glucolisis",
    recall: [
      {
        pregunta: "Explica de memoria el balance neto de la glucólisis y por qué el número que se recuerda suele estar mal.",
        referencia:
          "Por cada glucosa se gastan dos ATP en la fase de inversión, en los pasos de la hexocinasa y de la fosfofructocinasa-1, y se producen cuatro en la fase de beneficio. La ganancia neta es por tanto de dos ATP, más dos NADH y dos piruvatos. El error habitual viene de dos sitios: recordar el cuatro bruto en lugar del dos neto, y olvidar que a partir de la escisión en dos triosas todos los pasos ocurren por duplicado, de modo que las reacciones que rinden ATP lo hacen dos veces cada una. El rendimiento es bajo comparado con la oxidación completa, y esa es justamente la razón de que la vía sea un recurso de emergencia y no la fuente principal de energía cuando hay oxígeno.",
        pistas: [
          "¿Cuántos ATP se gastan antes de que la molécula se parta?",
          "¿Cuántas moléculas de tres carbonos hay a partir de la escisión?",
          "Bruto y neto no son lo mismo: ¿cuál te están preguntando?",
        ],
      },
      {
        pregunta: "¿Por qué una célula sin oxígeno produce lactato? Responde sin usar la palabra «energía».",
        referencia:
          "Porque necesita regenerar NAD⁺. El único paso de oxidación de la glucólisis, el de la gliceraldehído-3-fosfato deshidrogenasa, consume NAD⁺ y lo convierte en NADH. La cantidad de NAD⁺ de la célula es limitada, así que si el NADH no vuelve a oxidarse la vía se detiene por falta de transportador disponible, no por falta de sustrato. Con oxígeno, el NADH entrega sus electrones en la mitocondria y el NAD⁺ se recupera. Sin oxígeno esa salida no existe, y la célula usa el piruvato como aceptor de electrones: al reducirlo a lactato regenera el NAD⁺ y la glucólisis puede continuar. El lactato es la consecuencia de resolver ese problema, no el objetivo.",
        pistas: [
          "¿Cuántos pasos de oxidación tiene la glucólisis y qué consume ese paso?",
          "¿Qué pasa cuando se acaba la forma oxidada de un transportador?",
          "¿Qué molécula acepta los electrones cuando el oxígeno no está disponible?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Una célula tiene mucho ATP acumulado y también citrato elevado.",
        pregunta: "¿Qué le ocurre al flujo de la glucólisis y por dónde se ejerce el freno?",
        respuesta:
          "El flujo baja, y el freno se aplica sobre la fosfofructocinasa-1, que es la enzima que fija la velocidad de la vía. El ATP la inhibe porque señala que la célula ya tiene energía suficiente, y el citrato hace lo mismo por una razón distinta y más interesante: es un intermediario del ciclo de Krebs, así que su acumulación indica que la vía siguiente está saturada. Es un aviso hacia atrás. Seguir degradando glucosa cuando el ciclo no da abasto solo produciría acumulación de piruvato sin ninguna ganancia. Conviene notar que el freno no actúa sobre la hexocinasa: ese paso ya comprometió la glucosa con la célula, y la glucosa-6-fosfato puede desviarse hacia glucógeno o hacia la vía de las pentosas.",
      },
      {
        escenario: "Un fármaco bloquea de forma selectiva la enzima que convierte piruvato en lactato.",
        pregunta: "¿Qué tejido sufriría antes, y qué le ocurriría exactamente?",
        respuesta:
          "El eritrocito, y con diferencia. No tiene mitocondrias, así que no puede regenerar NAD⁺ por la vía respiratoria y depende por completo de reducir el piruvato a lactato para hacerlo. Bloqueado ese paso, el NADH se acumula, se agota el NAD⁺ libre, la gliceraldehído-3-fosfato deshidrogenasa se detiene y con ella toda la glucólisis. Como esa es su única fuente de ATP, el eritrocito se queda sin energía para mantener sus bombas de membrana y su forma. Cualquier tejido bien oxigenado apenas lo notaría, porque tiene la salida mitocondrial disponible; el músculo en ejercicio intenso sí lo notaría, porque en ese momento depende de la misma solución que el eritrocito.",
      },
    ],
    errores: [
      {
        error: "Decir que la glucólisis produce cuatro ATP.",
        correccion:
          "Produce cuatro en la fase de beneficio pero gasta dos en la de inversión, así que la ganancia neta es de dos. Dar el número bruto no es un descuido de cálculo: indica que se ha memorizado la vía como una lista de productos en lugar de entenderla como una inversión que hay que recuperar antes de empezar a ganar.",
      },
      {
        error: "Creer que la glucólisis solo ocurre cuando falta oxígeno.",
        correccion:
          "Ocurre siempre, haya oxígeno o no. Es la vía obligatoria de entrada del metabolismo de la glucosa, y lo que cambia con el oxígeno es el destino del piruvato y del NADH, no si la vía funciona. Con oxígeno el piruvato entra a la mitocondria; sin él se reduce a lactato. Llamarla «vía anaerobia» sin matizar es lo que produce esta confusión.",
      },
      {
        error: "Pensar que el lactato es un producto de desecho inútil o tóxico en sí mismo.",
        correccion:
          "El lactato es un combustible que otros tejidos aprovechan: el hígado lo reconvierte en glucosa mediante el ciclo de Cori, y el corazón y el músculo en reposo lo oxidan directamente. En los cuadros de hipoperfusión, lo que produce la acidez no es el lactato como tal sino la situación metabólica que lo genera; usar «lactato» y «acidosis» como sinónimos oculta el mecanismo.",
      },
      {
        error: "Suponer que la gluconeogénesis es la glucólisis en sentido inverso.",
        correccion:
          "Comparte las siete reacciones reversibles pero tiene que rodear las tres irreversibles con enzimas propias. Esa diferencia no es un detalle técnico: es lo que permite regular las dos direcciones por separado. Si fueran la misma vía, cualquier señal que activara una activaría también la otra y la célula solo conseguiría gastar ATP dando vueltas.",
      },
      {
        error: "Tratar la hexocinasa y la glucocinasa como la misma enzima con dos nombres.",
        correccion:
          "Difieren en afinidad, y eso les da papeles opuestos. La hexocinasa, presente en casi todos los tejidos, tiene alta afinidad y trabaja incluso con glucemias bajas, porque esos tejidos necesitan glucosa siempre. La glucocinasa del hígado tiene baja afinidad y solo se activa cuando la glucosa abunda, de modo que el hígado retira el exceso en vez de competir por lo poco que haya.",
      },
    ],
    tarjetas: [
      { front: "¿Cuál es la ganancia NETA de ATP por glucosa en la glucólisis?", back: "Dos ATP." },
      { front: "¿Cuántos NADH produce la glucólisis por cada glucosa?", back: "Dos." },
      { front: "¿Qué enzima de la glucólisis fija la velocidad de toda la vía?", back: "La fosfofructocinasa-1." },
      { front: "¿Qué dos moléculas inhiben la fosfofructocinasa-1?", back: "El ATP y el citrato." },
      { front: "¿Qué molécula activa la fosfofructocinasa-1?", back: "El AMP." },
      { front: "¿Cuál es el único paso de oxidación de la glucólisis?", back: "El de la gliceraldehído-3-fosfato deshidrogenasa." },
      { front: "¿Para qué sirve reducir el piruvato a lactato?", back: "Para regenerar NAD⁺ y que la glucólisis pueda continuar." },
      { front: "¿Por qué el eritrocito depende por completo de la glucólisis?", back: "Porque no tiene mitocondrias." },
      { front: "¿Qué isoenzima fosforila la glucosa en el hígado y qué la distingue?", back: "La glucocinasa: tiene menos afinidad, así que solo actúa cuando la glucosa abunda." },
      { front: "¿En qué se convierte la glucosa al final de la glucólisis?", back: "En dos moléculas de piruvato." },
    ],
    faq: [
      {
        q: "¿Qué es la glucólisis y para qué sirve?",
        a: "Es la vía que degrada una molécula de glucosa hasta dos de piruvato en el citosol de la célula, con una ganancia neta de dos ATP y dos NADH. Sirve para obtener energía de la glucosa y para generar piruvato, que es la materia prima del ciclo de Krebs. Su rasgo distintivo es que no necesita oxígeno ni mitocondrias, así que funciona en cualquier célula y en cualquier condición.",
      },
      {
        q: "¿Cuánto ATP produce la glucólisis?",
        a: "Produce cuatro ATP pero gasta dos en su primera mitad, de modo que la ganancia neta es de dos ATP por cada glucosa. Además genera dos NADH, que en presencia de oxígeno entregan sus electrones en la mitocondria y rinden bastante más ATP. Por eso el rendimiento total de la glucosa es mucho mayor cuando hay oxígeno que cuando no lo hay.",
      },
      {
        q: "¿Por qué la glucólisis produce lactato cuando no hay oxígeno?",
        a: "Porque necesita recuperar el NAD⁺ que consumió. La vía tiene un paso de oxidación que convierte NAD⁺ en NADH, y como la cantidad de NAD⁺ es limitada, si no se regenera la vía se detiene. Con oxígeno el NADH se oxida en la mitocondria; sin él, la célula usa el piruvato como aceptor de electrones y lo reduce a lactato. El lactato es el medio para regenerar NAD⁺, no el objetivo.",
      },
      {
        q: "¿Cuáles son los pasos irreversibles de la glucólisis?",
        a: "Los catalizados por la hexocinasa —o glucocinasa en el hígado—, por la fosfofructocinasa-1 y por la piruvato cinasa. Son irreversibles y son precisamente los tres puntos donde la vía se regula, porque solo tiene sentido poner un control donde la reacción va siempre en el mismo sentido. La gluconeogénesis tiene que rodear estos tres pasos con enzimas propias.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 68: «Metabolismo de los hidratos de carbono y formación del trifosfato de adenosina»",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de glucólisis",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de glucólisis y catabolismo de hexosas",
    ],
    relacionados: ["reacciones-del-metabolismo", "ph-pka-ionizacion", "biologia-celular"],
  },
  {
    slug: "ciclo-de-krebs",
    titulo: "Ciclo de Krebs: no es una vía para producir energía, es una para recogerla",
    tituloSEO: "Ciclo de Krebs: pasos, regulación, rendimiento por vuelta y por qué es anfibólico",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 22,
    resumen:
      "Ocho reacciones en la matriz mitocondrial que oxidan el acetil-CoA hasta CO₂. Produce un solo enlace de alta energía de forma directa; todo lo demás lo entrega como electrones en NADH y FADH₂, que es donde está el verdadero rendimiento. Y sus intermediarios sirven además de materia prima para fabricar otras moléculas.",
    porQueImporta:
      "Es el punto donde convergen los tres combustibles: hidratos de carbono, grasas y aminoácidos acaban todos en acetil-CoA. Entenderlo como un recolector de electrones y no como una fábrica de ATP es lo que hace que después la cadena respiratoria tenga sentido. Y su carácter anfibólico —que sirva a la vez para degradar y para construir— explica por qué el ciclo se frena en el ayuno y por qué eso empuja al hígado hacia los cuerpos cetónicos.",
    secciones: [
      {
        titulo: "Qué entra y qué sale",
        cuerpo: [
          "Entra **acetil-CoA**, con dos carbonos, y se une al **oxalacetato**, de cuatro, para formar citrato, de seis. A lo largo de la vuelta salen dos moléculas de CO₂ y se regenera el oxalacetato, listo para recibir el siguiente acetil-CoA. De ahí que sea un ciclo: el aceptor no se consume.",
          "Hay un detalle que casi nadie retiene y que conviene fijar: **los dos carbonos que salen como CO₂ no son los dos que acaban de entrar**. Los carbonos del acetil-CoA se quedan en la molécula y salen en vueltas posteriores. La contabilidad cuadra a nivel de números, no a nivel de átomos individuales.",
          "El otro detalle de contabilidad es que **por cada glucosa el ciclo da dos vueltas**, porque la glucólisis produjo dos piruvatos y cada uno da un acetil-CoA. Todos los rendimientos que se citan por vuelta hay que duplicarlos si la pregunta parte de una glucosa.",
        ],
      },
      {
        titulo: "El rendimiento real no está donde parece",
        cuerpo: [
          "Por cada vuelta el ciclo produce **tres NADH, un FADH₂ y un GTP** —o ATP, según el tejido—, además de dos CO₂. A primera vista el único producto energético directo es ese GTP, y es una cifra ridícula.",
          "Ahí está el malentendido que hay que deshacer. El ciclo de Krebs **no es una vía de producción de ATP**: es una vía de extracción de electrones. Su trabajo consiste en arrancar electrones al carbono y cargarlos en transportadores. El ATP se cobra después, en la cadena respiratoria, cuando esos transportadores entregan su carga.",
          "Visto así, la pregunta «¿cuánto ATP produce el ciclo de Krebs?» está mal planteada. Produce poco por sí mismo y muchísimo a través de lo que entrega. Quien retiene esta distinción entiende también por qué el ciclo se para en cuanto falta oxígeno, aunque el oxígeno no participe en ninguna de sus ocho reacciones: si la cadena respiratoria no consume NADH, el NAD⁺ no vuelve y el ciclo se queda sin aceptor de electrones.",
          "Hay además una asimetría entre los dos transportadores. El **FADH₂ rinde menos ATP que el NADH**, y no porque lleve menos electrones sino porque entra a la cadena en un punto posterior y su recorrido bombea menos protones. Es una diferencia de dónde entra, no de cuánto trae.",
        ],
      },
      {
        titulo: "Dónde se regula",
        cuerpo: [
          "El punto de control más importante es la **isocitrato deshidrogenasa**, la enzima de la primera descarboxilación. La frenan el NADH y el ATP, y la activa el ADP. La lógica es la misma que en la glucólisis: la vía mide el estado energético de la célula y ajusta su velocidad.",
          "Conviene fijarse en que el freno principal es el propio NADH. El ciclo se autolimita según lo lleno que esté el sistema de transportadores cargados, que es otra forma de decir que se regula por si la cadena respiratoria está dando abasto o no.",
          "Y hay un punto de control que no está dentro del ciclo pero decide cuánto entra en él: el complejo de la **piruvato deshidrogenasa**, que convierte piruvato en acetil-CoA. Ese paso es irreversible, y su irreversibilidad tiene una consecuencia importante: **de acetil-CoA no se puede volver a glucosa**. Por eso los ácidos grasos, que se degradan a acetil-CoA, no sirven para fabricar glucosa en el ayuno.",
        ],
      },
      {
        titulo: "Anfibólico: el ciclo también construye",
        cuerpo: [
          "Sus intermediarios no están ahí solo de paso. El **citrato** sale al citosol y aporta carbonos para fabricar ácidos grasos. El **α-cetoglutarato** y el **oxalacetato** se transaminan y se convierten en aminoácidos, o al revés. El **succinil-CoA** participa en la síntesis del grupo hemo.",
          "Que una vía sirva a la vez para degradar y para construir se llama ser **anfibólica**, y tiene una consecuencia práctica: si se retiran intermediarios para fabricar otras cosas, el ciclo se queda sin material y se frena. Por eso existen reacciones que los reponen, llamadas anapleróticas; la más importante convierte piruvato en oxalacetato.",
          "El caso clínico donde esto se ve es el **ayuno prolongado**. El hígado necesita oxalacetato para fabricar glucosa, así que lo retira del ciclo. Con menos oxalacetato disponible, el acetil-CoA que llega desde la degradación de las grasas no encuentra con quién condensarse, se acumula, y el hígado lo desvía hacia cuerpos cetónicos. La frase clásica «las grasas arden en el fuego de los hidratos de carbono» describe justamente esto.",
        ],
      },
    ],
    analogia: {
      campo: "Una cinta de reciclaje",
      texto:
        "El oxalacetato es la bandeja que vuelve vacía al principio de la cinta. Cada vuelta recoge un paquete de dos carbonos, le arranca los electrones aprovechables, tira los restos como CO₂ y devuelve la bandeja para la siguiente ronda.",
      dondeSeRompe:
        "La cinta sugiere un circuito cerrado donde nada entra ni sale salvo el material que se procesa, y el ciclo de Krebs no es así: sus intermediarios se retiran continuamente para fabricar aminoácidos, ácidos grasos o el grupo hemo, y hay que reponerlos con reacciones aparte. Una bandeja que desaparece a mitad de la cinta no encaja en la imagen, y en el ciclo ocurre todo el tiempo.",
    },
    figura: "ciclo-de-krebs",
    recall: [
      {
        pregunta: "Explica por qué el ciclo de Krebs se detiene sin oxígeno, si el oxígeno no interviene en ninguna de sus reacciones.",
        referencia:
          "Porque depende de que sus transportadores de electrones vuelvan a estar disponibles. Tres de sus reacciones reducen NAD⁺ a NADH y otra reduce FAD a FADH₂; la cantidad de esos transportadores es limitada, así que el ciclo solo puede seguir si algo los vuelve a oxidar. Quien lo hace es la cadena respiratoria, y la cadena solo funciona si hay oxígeno al final para recoger los electrones y formar agua. Sin oxígeno, la cadena se llena, el NADH no se reoxida, el NAD⁺ se agota y las deshidrogenasas del ciclo se detienen por falta de aceptor. Es una dependencia indirecta pero absoluta: el oxígeno no entra en ninguna ecuación del ciclo y aun así lo para.",
        pistas: [
          "¿Qué consumen las reacciones de oxidación del ciclo, y en qué se convierte?",
          "¿Quién devuelve esos transportadores a su forma oxidada?",
          "¿Qué necesita esa otra vía para funcionar?",
        ],
      },
      {
        pregunta: "¿Qué significa que el ciclo de Krebs sea anfibólico y qué consecuencia tiene en el ayuno prolongado?",
        referencia:
          "Significa que sirve a la vez para degradar y para construir: además de oxidar acetil-CoA, sus intermediarios son punto de partida de otras rutas. El citrato aporta carbonos para sintetizar ácidos grasos, el α-cetoglutarato y el oxalacetato se convierten en aminoácidos por transaminación, y el succinil-CoA participa en la síntesis del grupo hemo. La consecuencia es que retirar intermediarios frena el ciclo, y por eso existen reacciones anapleróticas que los reponen, sobre todo la que convierte piruvato en oxalacetato. En el ayuno prolongado el hígado retira oxalacetato para fabricar glucosa; con poco oxalacetato disponible, el acetil-CoA que llega de la degradación de las grasas no encuentra con quién condensarse, se acumula y se desvía a cuerpos cetónicos. Es el mecanismo detrás de la frase de que las grasas arden en el fuego de los hidratos de carbono.",
        pistas: [
          "Anfi- significa «ambos»: ¿ambos qué?",
          "Nombra dos intermediarios que sirvan de materia prima para otra cosa.",
          "En el ayuno, ¿para qué necesita el hígado el oxalacetato?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Se inhibe de forma selectiva la isocitrato deshidrogenasa.",
        pregunta: "¿Qué le pasa al ciclo y qué se acumula por delante del bloqueo?",
        respuesta:
          "El ciclo se detiene en ese punto y se acumulan los intermediarios anteriores, sobre todo citrato e isocitrato. Como la isocitrato deshidrogenasa es la enzima reguladora principal, bloquearla equivale a cerrar el grifo del ciclo entero. Pero el efecto no se queda ahí: el citrato acumulado sale al citosol e inhibe la fosfofructocinasa-1, así que la glucólisis también se frena. Es un buen ejemplo de que las vías no están aisladas, y de que el citrato funciona como la señal con la que el ciclo avisa hacia atrás de que no da abasto. Además, el citrato que sale al citosol es materia prima para sintetizar ácidos grasos, de modo que su exceso empuja hacia el almacenamiento.",
      },
      {
        escenario: "Una célula recibe abundante acetil-CoA procedente de la degradación de grasas, pero su oxalacetato está muy disminuido.",
        pregunta: "¿Puede el ciclo procesar ese acetil-CoA? ¿Y qué hará la célula con él?",
        respuesta:
          "No puede, o solo en muy pequeña medida. El acetil-CoA únicamente entra al ciclo condensándose con oxalacetato, así que sin aceptor disponible se queda fuera por muy abundante que sea. Tampoco puede convertirse en glucosa, porque el paso de piruvato a acetil-CoA es irreversible y no hay camino de vuelta. Lo que hace el hígado es desviarlo hacia la síntesis de cuerpos cetónicos, que sí puede exportar como combustible alternativo para el cerebro y el músculo. Es exactamente la situación del ayuno prolongado, y muestra que la disponibilidad del aceptor puede limitar una vía tanto o más que la del sustrato.",
      },
    ],
    errores: [
      {
        error: "Creer que el ciclo de Krebs es donde se produce la mayor parte del ATP.",
        correccion:
          "Por vuelta produce un solo GTP de forma directa. Su función real es extraer electrones y cargarlos en NADH y FADH₂; el ATP se obtiene después, en la cadena respiratoria, cuando esos transportadores los entregan. Confundir las dos cosas hace incomprensible por qué el ciclo se para sin oxígeno pese a que el oxígeno no aparece en ninguna de sus reacciones.",
      },
      {
        error: "Pensar que los dos CO₂ que salen son los dos carbonos que acaban de entrar con el acetil-CoA.",
        correccion:
          "No lo son. Los carbonos del acetil-CoA permanecen en la molécula durante esa vuelta y salen en vueltas posteriores; los que se liberan como CO₂ proceden del oxalacetato que ya estaba. El balance de números cuadra, el de átomos concretos no, y esa distinción importa cuando se interpretan experimentos con carbono marcado.",
      },
      {
        error: "Suponer que el FADH₂ rinde menos ATP porque transporta menos electrones.",
        correccion:
          "Transporta el mismo par de electrones. Rinde menos porque entra a la cadena respiratoria en un punto posterior, saltándose el primer complejo, y por tanto su recorrido bombea menos protones. Es una diferencia de por dónde entra, no de cuánto trae, y entenderlo así evita tener que memorizar las cifras.",
      },
      {
        error: "Decir que las grasas pueden convertirse en glucosa porque acaban en acetil-CoA.",
        correccion:
          "El paso de piruvato a acetil-CoA es irreversible, así que no hay camino de vuelta desde el acetil-CoA hasta el piruvato ni, por tanto, hasta la glucosa. Los ácidos grasos de cadena par no aportan carbonos netos a la gluconeogénesis; lo que sí puede hacerlo es el glicerol del triglicérido, que es otra parte de la molécula.",
      },
      {
        error: "Estudiar el ciclo memorizando los ocho intermediarios en orden.",
        correccion:
          "La lista se olvida en semanas y no permite responder nada que no sea la propia lista. Lo que se retiene y sirve es la estructura: dónde entran los dos carbonos, dónde salen los dos CO₂, en qué cuatro puntos se recogen electrones, dónde está el único enlace de alta energía directo y dónde se regula. Con eso se reconstruye el orden; con el orden solo no se reconstruye nada.",
      },
    ],
    tarjetas: [
      { front: "¿Con qué molécula se condensa el acetil-CoA para entrar al ciclo de Krebs?", back: "Con el oxalacetato." },
      { front: "¿Cuántos NADH produce el ciclo de Krebs por vuelta?", back: "Tres." },
      { front: "¿Cuál es el único producto de alta energía que el ciclo genera de forma directa?", back: "Un GTP (o ATP, según el tejido)." },
      { front: "¿Cuántas vueltas del ciclo corresponden a una molécula de glucosa?", back: "Dos, porque la glucólisis produce dos piruvatos." },
      { front: "¿Qué enzima es el principal punto de regulación del ciclo de Krebs?", back: "La isocitrato deshidrogenasa." },
      { front: "¿Qué enzima del ciclo también forma parte de la cadena respiratoria?", back: "La succinato deshidrogenasa, que es el complejo II." },
      { front: "¿Por qué el FADH₂ rinde menos ATP que el NADH?", back: "Porque entra a la cadena en un punto posterior y su recorrido bombea menos protones." },
      { front: "¿Qué significa que una vía sea anfibólica?", back: "Que sirve a la vez para degradar y para aportar precursores de síntesis." },
      { front: "¿Qué reacción anaplerótica repone el oxalacetato?", back: "La conversión de piruvato en oxalacetato por la piruvato carboxilasa." },
      { front: "¿Por qué los ácidos grasos de cadena par no sirven para fabricar glucosa?", back: "Porque el paso de piruvato a acetil-CoA es irreversible y no hay camino de vuelta." },
    ],
    faq: [
      {
        q: "¿Qué es el ciclo de Krebs y dónde ocurre?",
        a: "Es una secuencia de ocho reacciones que ocurre en la matriz mitocondrial y que oxida el acetil-CoA hasta dióxido de carbono. En cada vuelta produce tres NADH, un FADH₂, un GTP y dos CO₂, y regenera el oxalacetato con el que empezó. También se le llama ciclo del ácido cítrico o de los ácidos tricarboxílicos.",
      },
      {
        q: "¿Cuánto ATP produce el ciclo de Krebs?",
        a: "De forma directa, un solo GTP o ATP por vuelta, lo que es muy poco. Su verdadero rendimiento es indirecto: los tres NADH y el FADH₂ que genera entregan sus electrones a la cadena respiratoria, y ahí se produce la mayor parte del ATP. Por eso conviene pensar en el ciclo como una vía que recoge electrones y no como una que fabrica energía.",
      },
      {
        q: "¿Por qué el ciclo de Krebs necesita oxígeno si no lo usa en ninguna reacción?",
        a: "Porque necesita que sus transportadores vuelvan a estar disponibles. El ciclo convierte NAD⁺ en NADH y FAD en FADH₂, y solo puede seguir si algo los reoxida. Quien lo hace es la cadena respiratoria, que requiere oxígeno como aceptor final de electrones. Sin oxígeno, la cadena se detiene, el NAD⁺ no se recupera y el ciclo se para por falta de aceptor.",
      },
      {
        q: "¿Qué significa que el ciclo de Krebs sea anfibólico?",
        a: "Que participa tanto en el catabolismo como en el anabolismo. Además de degradar acetil-CoA, sus intermediarios sirven de materia prima para otras rutas: el citrato para sintetizar ácidos grasos, el α-cetoglutarato y el oxalacetato para fabricar aminoácidos, y el succinil-CoA para el grupo hemo. Como esas salidas vacían el ciclo, existen reacciones anapleróticas que reponen los intermediarios.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 68: «Metabolismo de los hidratos de carbono y formación del trifosfato de adenosina»",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo del ciclo de los ácidos tricarboxílicos",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo del ciclo del ácido cítrico",
    ],
    relacionados: ["glucolisis", "reacciones-del-metabolismo", "biologia-celular"],
  },
  {
    slug: "fosforilacion-oxidativa",
    titulo: "Fosforilación oxidativa: por qué el cuerpo fabrica un gradiente antes de fabricar ATP",
    tituloSEO: "Fosforilación oxidativa y cadena respiratoria: complejos, gradiente de protones, ATP sintasa y desacoplamiento",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 24,
    resumen:
      "Los electrones del NADH y el FADH₂ bajan por cuatro complejos hasta reducir el oxígeno a agua, y en el camino bombean protones fuera de la matriz. Ese gradiente, y no la oxidación, es lo que mueve la ATP sintasa. Separar las dos cosas es lo que hace comprensible el envenenamiento por cianuro, la fiebre del desacoplamiento y por qué morimos sin oxígeno en minutos.",
    porQueImporta:
      "Aquí se produce la mayor parte del ATP del organismo, y es el punto donde convergen la glucólisis, el ciclo de Krebs y la degradación de las grasas. Pero la razón más fuerte para entenderlo bien es otra: es el mejor ejemplo de un mecanismo indirecto en toda la fisiología. La célula no acopla la oxidación a la síntesis de ATP directamente, sino que fabrica una forma intermedia de energía. Ver por qué eso es mejor que lo directo cambia cómo se leen otros muchos sistemas.",
    secciones: [
      {
        titulo: "El problema que resuelve el gradiente",
        cuerpo: [
          "Oxidar carbono libera mucha energía de golpe. Sintetizar ATP consume una cantidad concreta y bastante menor. Acoplar las dos cosas de forma directa obligaría a que cada oxidación produjera exactamente lo que cuesta un ATP, lo cual es imposible con reacciones tan distintas.",
          "La solución es no acoplarlas. Los complejos de la cadena usan la energía de la oxidación para **bombear protones** desde la matriz hacia el espacio intermembrana, y el resultado es un desequilibrio: más protones fuera que dentro, y más carga positiva fuera. Ese desequilibrio es energía almacenada, igual que el agua embalsada.",
          "Después, una proteína distinta deja volver a los protones y aprovecha el paso para unir ADP y fosfato. Es la **hipótesis quimiosmótica**, y su idea central es que entre la oxidación y la síntesis de ATP no hay contacto químico: hay un gradiente de por medio. Cualquier proceso que sepa bombear protones puede alimentar el sistema, y cualquiera que sepa aprovecharlos puede cobrarlo.",
        ],
      },
      {
        titulo: "La cadena, complejo a complejo",
        cuerpo: [
          "El **complejo I** recoge los electrones del NADH y bombea protones. El **complejo II** es la succinato deshidrogenasa, la misma enzima del ciclo de Krebs vista desde la membrana: entrega los electrones del FADH₂ y **no bombea protones**. Ahí está la explicación de que el FADH₂ rinda menos ATP; no es que traiga menos electrones, es que su entrada se salta una estación de bombeo.",
          "Los electrones de ambos convergen en la coenzima Q, que los lleva al **complejo III**, y de ahí al citocromo c y al **complejo IV**. Este último se los entrega al oxígeno, que junto con protones forma agua.",
          "El oxígeno no hace nada más que eso, y sin embargo es imprescindible. Su papel es el de **aceptor final de electrones**: alguien tiene que recogerlos al salir. Si no hay quién los reciba, la cadena se llena, los complejos no pueden pasar más electrones y el bombeo se detiene. Es la razón mecanicista de que la falta de oxígeno mate en minutos.",
          "Ese mismo razonamiento explica el **cianuro**, que bloquea el complejo IV. No impide que llegue oxígeno al tejido; impide que el tejido pueda usarlo. El resultado es una célula rodeada de oxígeno y muriéndose por no poder pasarle los electrones, que es una situación muy distinta de la isquemia aunque el desenlace celular se parezca.",
        ],
      },
      {
        titulo: "La ATP sintasa cobra el gradiente",
        cuerpo: [
          "La **ATP sintasa** no forma parte de la cadena de electrones. Es un canal con un motor: deja pasar protones de vuelta hacia la matriz y usa ese flujo para girar y catalizar la unión de ADP y fosfato.",
          "Conviene insistir en la independencia de las dos piezas, porque de ella salen todas las consecuencias interesantes. La cadena crea el gradiente; la sintasa lo gasta. Están conectadas solo a través del gradiente, no por ninguna reacción compartida.",
          "De ahí sale el **desacoplamiento**. Si algo permite que los protones vuelvan a la matriz sin pasar por la ATP sintasa, el gradiente se disipa y su energía se libera como calor. La cadena entonces acelera, porque encuentra menos resistencia, y se consume más oxígeno sin producir más ATP.",
          "Eso no es solo un accidente tóxico: es un mecanismo fisiológico. El **tejido adiposo pardo** del recién nacido tiene una proteína desacopladora precisamente para generar calor sin temblar, y es una parte importante de cómo un neonato mantiene su temperatura. La misma física que produce fiebre por intoxicación produce calor útil cuando el cuerpo la usa a propósito.",
        ],
      },
      {
        titulo: "Cuánto ATP, y por qué la cifra ya no es un número redondo",
        cuerpo: [
          "Durante décadas se enseñó que un NADH rendía tres ATP y un FADH₂ dos, con un total de 38 por glucosa. Esos números salían de suponer una relación exacta entre protones bombeados y ATP producidos.",
          "Hoy se acepta que la relación **no es un número entero** y que los valores habituales están más cerca de 2,5 ATP por NADH y 1,5 por FADH₂, lo que deja el total en torno a 30 o 32 por glucosa. Conviene saber la cifra clásica porque sigue apareciendo en exámenes, y conviene saber por qué se corrigió.",
          "Merece la pena decir esto con precisión y sin adornos: el rendimiento **depende además de condiciones que varían**, como qué lanzadera use la célula para meter el NADH citosólico en la mitocondria y cuánto gradiente se pierda por fugas. Un número exacto y único no describe bien el sistema. Que un libro dé 38 y otro 30 no significa que uno esté equivocado: significa que la magnitud no es tan fija como sugiere una cifra cerrada.",
        ],
      },
    ],
    analogia: {
      campo: "Una presa hidroeléctrica",
      texto:
        "La cadena respiratoria es la bomba que sube agua al embalse, el gradiente de protones es el agua embalsada y la ATP sintasa es la turbina. Nadie conecta la bomba directamente a la turbina: entre las dos hay un embalse, y por eso pueden funcionar a ritmos distintos.",
      dondeSeRompe:
        "En la presa el agua solo baja por la turbina, y en la mitocondria los protones tienen otras salidas. Esas fugas son fisiológicas y no un defecto: el tejido adiposo pardo las usa a propósito para producir calor. Además, en la membrana el gradiente no es solo de concentración sino también de carga eléctrica, y en la mayoría de las células el componente eléctrico pesa más que el químico, cosa que ninguna presa refleja.",
    },
    figura: "cadena-respiratoria",
    recall: [
      {
        pregunta: "Explica por qué la célula fabrica un gradiente de protones en lugar de acoplar directamente la oxidación a la síntesis de ATP.",
        referencia:
          "Porque las dos reacciones tienen escalas de energía muy distintas y acoplarlas de forma directa exigiría que cada oxidación liberara exactamente lo que cuesta formar un ATP. El gradiente funciona como una forma intermedia y común de energía: los complejos de la cadena usan la energía de la oxidación para bombear protones fuera de la matriz, creando una diferencia de concentración y de carga a ambos lados de la membrana interna. La ATP sintasa deja después volver esos protones y aprovecha su paso para unir ADP y fosfato. Como entre las dos piezas no hay ninguna reacción compartida, cada una puede funcionar a su propio ritmo, cualquier proceso capaz de bombear protones puede alimentar el sistema y cualquiera capaz de aprovecharlos puede cobrarlo. Esa independencia es también lo que hace posible el desacoplamiento.",
        pistas: [
          "¿Qué problema plantea que dos reacciones liberen y consuman cantidades de energía muy distintas?",
          "¿Qué tienen en común una presa hidroeléctrica y esta membrana?",
          "¿Qué ganan la cadena y la sintasa por no estar químicamente conectadas?",
        ],
      },
      {
        pregunta: "Un desacoplante permite que los protones vuelvan a la matriz sin pasar por la ATP sintasa. Predice qué le ocurre al consumo de oxígeno, a la producción de ATP y a la temperatura, y explica por qué.",
        referencia:
          "El consumo de oxígeno aumenta, la producción de ATP baja y la temperatura sube. La razón es que el gradiente es lo que frena a la cadena: cuanto más protones acumulados fuera, más cuesta seguir bombeando contra ellos. Si los protones se escapan por otra vía, el gradiente se disipa, la cadena encuentra menos resistencia y acelera, consumiendo más oxígeno. Pero como esos protones no pasan por la ATP sintasa, su energía no se convierte en ATP sino que se libera como calor. Es exactamente lo que hace de forma fisiológica el tejido adiposo pardo del recién nacido para generar calor sin tiritar. El caso muestra que la cadena y la sintasa son piezas independientes conectadas solo por el gradiente, y que se pueden desacoplar sin romper ninguna de las dos.",
        pistas: [
          "¿Qué es lo que limita la velocidad de la cadena cuando el gradiente es grande?",
          "Si los protones no pasan por la turbina, ¿en qué se convierte su energía?",
          "¿Qué tejido hace esto a propósito y para qué?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Una intoxicación bloquea el complejo IV mientras el paciente respira con normalidad.",
        pregunta: "¿Qué diferencia hay entre esta situación y una isquemia, si en ambas la célula acaba sin ATP?",
        respuesta:
          "La diferencia está en dónde falla el sistema, y se nota. En la isquemia no llega oxígeno al tejido porque no llega sangre; en el bloqueo del complejo IV el oxígeno llega perfectamente pero la célula no puede usarlo, porque no tiene cómo entregarle los electrones. La consecuencia es que la sangre venosa mantiene una saturación de oxígeno anormalmente alta —el tejido no lo está extrayendo—, algo que en una isquemia no ocurre. En los dos casos la cadena se detiene, el NAD⁺ no se regenera, el ciclo de Krebs se para y la célula queda dependiendo de la glucólisis con producción de lactato. Pero el razonamiento diagnóstico es opuesto: en uno hay que restablecer el flujo y en el otro el flujo ya está.",
      },
      {
        escenario: "Una célula tiene la cadena respiratoria intacta pero se queda sin ADP disponible.",
        pregunta: "¿Sigue funcionando la cadena? ¿Qué le pasa al consumo de oxígeno?",
        respuesta:
          "Se frena, y el consumo de oxígeno baja. Sin ADP la ATP sintasa no tiene sustrato que fosforilar, así que deja de dejar pasar protones. Los protones se acumulan fuera, el gradiente crece y bombear contra él resulta cada vez más costoso, hasta que la cadena prácticamente se detiene. Esto se llama control respiratorio y es la razón de que el consumo de oxígeno de un tejido siga a su gasto de ATP: cuando la célula gasta ATP genera ADP, el ADP libera la sintasa, el gradiente cae y la cadena acelera. El sistema se autorregula por la demanda sin necesidad de ninguna señal externa.",
      },
    ],
    errores: [
      {
        error: "Creer que la ATP sintasa forma parte de la cadena de transporte de electrones.",
        correccion:
          "Son dos sistemas independientes que solo se comunican a través del gradiente de protones. La cadena crea el gradiente y la sintasa lo gasta, sin compartir ninguna reacción. Meterlos en el mismo saco hace incomprensible el desacoplamiento, que consiste precisamente en disipar el gradiente dejando ambas piezas intactas.",
      },
      {
        error: "Decir que el oxígeno «se usa para producir energía».",
        correccion:
          "El oxígeno no aporta energía: la recibe. Su único papel es aceptar los electrones al final del recorrido y formar agua con ellos. Es imprescindible porque sin alguien que los recoja la cadena se atasca, pero la energía venía de la oxidación del carbono, no del oxígeno.",
      },
      {
        error: "Explicar que el FADH₂ rinde menos ATP porque tiene menos energía.",
        correccion:
          "Transporta el mismo par de electrones que el NADH. Rinde menos porque entra a la cadena por el complejo II, que no bombea protones, de modo que su recorrido atraviesa una estación de bombeo menos. Es una diferencia de punto de entrada, no de contenido energético.",
      },
      {
        error: "Dar por definitiva la cifra de 38 ATP por glucosa.",
        correccion:
          "Esa cifra suponía una relación exacta y entera entre protones bombeados y ATP producidos, que no se sostiene. Los valores aceptados hoy rondan 2,5 ATP por NADH y 1,5 por FADH₂, con un total de unos 30 a 32, y además dependen de qué lanzadera use la célula y de cuánto gradiente se pierda. Conviene conocer el número clásico y saber por qué se corrigió.",
      },
      {
        error: "Pensar que el desacoplamiento es siempre patológico.",
        correccion:
          "Es un mecanismo fisiológico normal. El tejido adiposo pardo del recién nacido tiene una proteína desacopladora que disipa el gradiente a propósito para generar calor sin necesidad de tiritar, y es una parte importante de la termorregulación neonatal. La misma física puede resultar tóxica o útil según quién la controle.",
      },
    ],
    tarjetas: [
      { front: "¿Qué crean los complejos de la cadena respiratoria al transportar electrones?", back: "Un gradiente de protones a través de la membrana mitocondrial interna." },
      { front: "¿Qué complejo de la cadena respiratoria no bombea protones?", back: "El complejo II, la succinato deshidrogenasa." },
      { front: "¿Cuál es el papel del oxígeno en la fosforilación oxidativa?", back: "Ser el aceptor final de electrones, formando agua." },
      { front: "¿Qué mueve a la ATP sintasa?", back: "El regreso de los protones a la matriz a favor del gradiente." },
      { front: "¿Qué le pasa al consumo de oxígeno cuando un desacoplante disipa el gradiente?", back: "Aumenta, y sin embargo se produce menos ATP." },
      { front: "¿Qué tejido usa el desacoplamiento de forma fisiológica y para qué?", back: "El tejido adiposo pardo del recién nacido, para generar calor sin tiritar." },
      { front: "¿Qué complejo bloquea el cianuro?", back: "El complejo IV." },
      { front: "¿Por qué en el bloqueo del complejo IV la sangre venosa está más saturada de lo normal?", back: "Porque el oxígeno llega al tejido pero este no puede extraerlo." },
      { front: "¿Qué es el control respiratorio?", back: "Que la velocidad de la cadena depende de la disponibilidad de ADP, y por tanto del gasto de ATP." },
      { front: "¿Cuántos ATP por NADH se aceptan hoy, frente a la cifra clásica de 3?", back: "Alrededor de 2,5." },
    ],
    faq: [
      {
        q: "¿Qué es la fosforilación oxidativa?",
        a: "Es el proceso por el que la mitocondria produce la mayor parte del ATP del organismo. Los electrones del NADH y el FADH₂ recorren una cadena de complejos en la membrana mitocondrial interna hasta reducir el oxígeno a agua, y ese recorrido bombea protones fuera de la matriz. El gradiente de protones resultante mueve la ATP sintasa, que une ADP y fosfato.",
      },
      {
        q: "¿Por qué morimos sin oxígeno en pocos minutos?",
        a: "Porque el oxígeno es el aceptor final de los electrones de la cadena respiratoria. Sin alguien que los recoja al final, la cadena se llena, deja de bombear protones y la producción de ATP por esta vía se detiene. Solo queda la glucólisis, cuyo rendimiento es muy inferior y no basta para sostener tejidos de alta demanda como el cerebro y el corazón.",
      },
      {
        q: "¿Qué es el desacoplamiento mitocondrial?",
        a: "Ocurre cuando los protones vuelven a la matriz sin pasar por la ATP sintasa. El gradiente se disipa, su energía se libera como calor y la cadena acelera al encontrar menos resistencia, de modo que se consume más oxígeno pero se produce menos ATP. Puede ser tóxico, pero también es fisiológico: el tejido adiposo pardo del recién nacido lo usa a propósito para generar calor.",
      },
      {
        q: "¿Cuántos ATP se producen por cada molécula de glucosa?",
        a: "La cifra clásica de 38 procede de suponer una relación exacta entre protones bombeados y ATP formados, y hoy se considera una simplificación. Con los valores aceptados actualmente, en torno a 2,5 ATP por NADH y 1,5 por FADH₂, el total queda alrededor de 30 a 32. Además depende de qué lanzadera use la célula para el NADH citosólico y de cuánto gradiente se pierda por fugas, así que no es un número fijo.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 68 (formación de ATP) y cap. 73: «Energética y metabolismo»",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de fosforilación oxidativa",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de cadena de transporte de electrones y fosforilación oxidativa",
    ],
    relacionados: ["ciclo-de-krebs", "glucolisis", "biologia-celular"],
  },
  {
    slug: "potencial-de-accion",
    titulo: "Potencial de acción: por qué es todo o nada y por qué no puede volver hacia atrás",
    tituloSEO: "Potencial de acción: fases, canales de sodio y potasio, umbral, período refractario y conducción saltatoria",
    bloque: "funcion",
    unidad: "I8568 · Fisiología médica",
    nivel: "mecanismo",
    minutos: 22,
    resumen:
      "Dos tipos de canal con velocidades distintas bastan para explicar la forma entera de la curva. El de sodio es rápido y se amplifica a sí mismo, lo que produce el todo o nada; el de potasio es lento y devuelve la membrana a su sitio. Y la inactivación del sodio —que no es lo mismo que cerrarse— es lo que impide que la señal retroceda.",
    porQueImporta:
      "Es el lenguaje con el que se comunican el sistema nervioso, el músculo y el corazón, así que sin él no hay neurofisiología ni electrocardiograma ni comprensión de por qué un anestésico local funciona. Además contiene el único ejemplo importante de retroalimentación positiva en fisiología aguda, y verlo ahí ayuda a reconocerlo en los demás. Casi todo lo que hay que saber se deduce de dos propiedades: qué canal es rápido y cuál es lento.",
    secciones: [
      {
        titulo: "El punto de partida y el umbral",
        cuerpo: [
          "En reposo la membrana está alrededor de −70 mV, sobre todo porque es mucho más permeable al potasio que al sodio. Mantener ese estado no es gratuito: la bomba de sodio y potasio trabaja de forma continua para sostener los gradientes de fondo.",
          "Un estímulo pequeño produce una desviación local que se apaga sola. Solo cuando la despolarización alcanza el **umbral**, en torno a −55 mV, ocurre algo distinto: se abren de golpe suficientes canales de sodio dependientes de voltaje como para que el proceso se dispare solo.",
          "La diferencia entre esos dos casos es la diferencia entre una señal graduada y un potencial de acción. Una señal graduada puede ser de cualquier tamaño y se atenúa con la distancia; un potencial de acción **o es completo o no existe**, y se propaga sin perder amplitud. Un estímulo mayor no produce un potencial de acción mayor: produce más potenciales por segundo. La intensidad se codifica en frecuencia, no en tamaño.",
        ],
      },
      {
        titulo: "El sodio se amplifica a sí mismo",
        cuerpo: [
          "Al abrirse los canales de sodio, el sodio entra a favor de su gradiente y despolariza más la membrana. Esa despolarización abre más canales de sodio, que dejan entrar más sodio, que despolariza todavía más.",
          "Esto es **retroalimentación positiva**, y merece detenerse porque es rara en el cuerpo. Casi toda la fisiología funciona con retroalimentación negativa, que corrige las desviaciones; aquí el sistema las amplifica a propósito. Un mecanismo así solo es viable si tiene un freno definido, y lo tiene: la propia inactivación de los canales.",
          "Cerca de +30 mV los canales de sodio se **inactivan**. Conviene ser preciso con la palabra, porque inactivarse no es cerrarse. Un canal cerrado puede volver a abrirse si llega el estímulo adecuado; uno inactivado está bloqueado por un mecanismo distinto y **no puede reabrirse hasta que la membrana se repolarice**, por intenso que sea el estímulo.",
        ],
      },
      {
        titulo: "El potasio es lento, y esa lentitud da la forma",
        cuerpo: [
          "Los canales de potasio dependientes de voltaje responden al mismo cambio de voltaje que los de sodio, pero **tardan más en abrirse**. Ese retraso es lo que crea la secuencia entera.",
          "Cuando por fin están abiertos, los de sodio ya se han inactivado. El potasio sale, la membrana se repolariza y vuelve hacia valores negativos. Y como los canales de potasio también tardan en cerrarse, la membrana se pasa de largo y queda más negativa que en reposo: es la **hiperpolarización posterior**.",
          "Toda la forma de la curva —subida rápida, pico estrecho, bajada algo más lenta y una cola por debajo del reposo— sale de una sola cosa: **un canal rápido y otro lento respondiendo al mismo estímulo**. Si los dos fueran igual de rápidos no habría pico, habría un desplazamiento sin forma.",
        ],
      },
      {
        titulo: "Los períodos refractarios y la dirección de la señal",
        cuerpo: [
          "Mientras los canales de sodio están inactivados, ningún estímulo dispara otro potencial de acción. Es el **período refractario absoluto**, y tiene dos consecuencias importantes.",
          "La primera es que fija la **frecuencia máxima** a la que una célula puede disparar. La segunda es más elegante: como la zona que la señal acaba de recorrer está refractaria, el impulso **solo puede avanzar hacia delante**. La direccionalidad del axón no la impone ninguna estructura; la impone el tiempo.",
          "Después viene el **período refractario relativo**, durante la hiperpolarización, en el que sí se puede disparar pero hace falta un estímulo mayor de lo normal, porque la membrana parte de más lejos del umbral.",
          "En el corazón este mecanismo hace algo adicional y vital. El potencial de acción cardíaco tiene una meseta que alarga muchísimo el período refractario, y eso **impide que el músculo cardíaco entre en tetania**. Un músculo esquelético puede sumar contracciones hasta quedarse contraído; un corazón que hiciera eso dejaría de bombear.",
        ],
      },
      {
        titulo: "Mielina: ir más rápido gastando menos",
        cuerpo: [
          "La mielina es un aislante que envuelve el axón dejando huecos, los nodos de Ranvier, donde se concentran los canales de sodio. La señal se regenera solo en los nodos y salta entre ellos: es la **conducción saltatoria**.",
          "Gana en dos cosas a la vez. Va más rápido, porque no tiene que regenerar el potencial en cada punto de la membrana. Y gasta menos energía, porque entra menos sodio en total y la bomba tiene menos que devolver a su sitio.",
          "De ahí se deduce por qué las enfermedades desmielinizantes producen los síntomas que producen. Al perder el aislamiento, la conducción se enlentece o se bloquea, y los déficits aparecen antes en las vías donde la velocidad importa más. El axón puede estar intacto y aun así no conducir bien.",
        ],
      },
    ],
    analogia: {
      campo: "Una mecha encendida",
      texto:
        "Cada punto de la mecha prende al siguiente con la misma intensidad, así que la llama llega igual de viva al final que al principio, y no se puede prender «un poco». Además la parte ya quemada no puede volver a arder, y por eso el fuego solo avanza en un sentido.",
      dondeSeRompe:
        "La mecha se consume y el axón no: se recupera y puede volver a conducir en milisegundos. Y la analogía sugiere que la señal avanza siempre de forma continua, cuando en un axón mielinizado salta de nodo en nodo. También deja fuera lo esencial de la codificación: una mecha no puede transmitir intensidad, y una neurona sí, cambiando la frecuencia de disparo.",
    },
    figura: "potencial-de-accion",
    recall: [
      {
        pregunta: "Explica de memoria por qué el potencial de acción es todo o nada y por qué solo avanza en una dirección.",
        referencia:
          "Es todo o nada porque la despolarización inicial se amplifica a sí misma: al abrirse los canales de sodio dependientes de voltaje entra sodio, lo que despolariza más la membrana, lo que abre más canales. Es retroalimentación positiva, así que una vez alcanzado el umbral el proceso se completa entero con independencia de la intensidad del estímulo, y por debajo del umbral no ocurre nada más que una desviación local que se apaga. Por eso la intensidad del estímulo no se codifica en la amplitud sino en la frecuencia de disparo. Avanza en una sola dirección porque, tras el pico, los canales de sodio quedan inactivados, y un canal inactivado no puede reabrirse hasta que la membrana se repolarice, por intenso que sea el estímulo. La zona que la señal acaba de recorrer está por tanto refractaria y no puede volver a excitarse, de modo que la única salida es hacia delante. La direccionalidad la impone el tiempo, no la estructura.",
        pistas: [
          "¿Qué tipo de retroalimentación hay en la fase de subida?",
          "Si el estímulo no cambia la amplitud, ¿en qué se codifica su intensidad?",
          "¿En qué estado quedan los canales de sodio por detrás de la señal?",
        ],
      },
      {
        pregunta: "¿Qué diferencia hay entre un canal de sodio cerrado y uno inactivado, y por qué importa?",
        referencia:
          "Un canal cerrado está en reposo y puede abrirse en cuanto la membrana alcance el umbral. Un canal inactivado está bloqueado por un mecanismo distinto, que se activa tras la apertura y cerca del pico del potencial de acción, y no puede volver a abrirse por mucho estímulo que reciba: primero tiene que repolarizarse la membrana para que el canal recupere el estado cerrado disponible. Importa porque esa inactivación es la que crea el período refractario absoluto, y de él salen tres consecuencias: se fija la frecuencia máxima de disparo de la célula, el impulso no puede retroceder hacia la zona que acaba de recorrer, y en el corazón, donde el período refractario es muy largo por la meseta, se impide que el músculo entre en tetania. Confundir cerrado con inactivado hace que nada de eso se pueda deducir.",
        pistas: [
          "Los dos estados no conducen: ¿en qué se diferencian entonces?",
          "¿Qué hace falta para que un canal inactivado vuelva a estar disponible?",
          "¿Qué período refractario nace de esa diferencia?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Un fármaco bloquea los canales de sodio dependientes de voltaje en un nervio periférico.",
        pregunta: "¿Qué le ocurre a la conducción y por qué esos fármacos actúan mejor sobre fibras que están disparando mucho?",
        respuesta:
          "La conducción se bloquea, porque sin entrada de sodio la despolarización nunca alcanza el umbral y el potencial de acción no llega a dispararse. Es el mecanismo de los anestésicos locales. Lo interesante es lo segundo: muchos de estos fármacos se unen preferentemente al canal cuando está abierto o inactivado, no cuando está en reposo. Una fibra que dispara con frecuencia pasa más tiempo en esos estados, así que acumula más bloqueo que una fibra silenciosa. De ahí que el efecto sea dependiente del uso y que las fibras más activas, como las que transmiten dolor, se bloqueen antes que otras. El razonamiento sirve igual para entender por qué ciertos antiarrítmicos actúan más sobre un miocardio que va rápido que sobre uno a frecuencia normal.",
      },
      {
        escenario: "Se enlentecen de forma selectiva los canales de potasio dependientes de voltaje, sin tocar los de sodio.",
        pregunta: "¿Cómo cambia la forma del potencial de acción?",
        respuesta:
          "La repolarización se retrasa, así que el potencial de acción se ensancha: el pico se mantiene más tiempo en valores positivos antes de bajar. También se alarga el período refractario, porque los canales de sodio tardan más en recuperarse de la inactivación al depender esta de que la membrana se repolarice. La consecuencia funcional es que la célula puede disparar a menos frecuencia. Este escenario no es teórico: alargar la repolarización es lo que hace que en el electrocardiograma se prolongue el intervalo QT, y ese alargamiento se asocia a un riesgo de arritmias que es la razón por la que se vigila.",
      },
    ],
    errores: [
      {
        error: "Creer que un estímulo más fuerte produce un potencial de acción más grande.",
        correccion:
          "La amplitud es siempre la misma una vez superado el umbral, porque la determinan los gradientes iónicos y no el estímulo. Un estímulo más intenso produce más potenciales de acción por segundo. La intensidad se codifica en frecuencia, y perder esto de vista impide entender cómo el sistema nervioso transmite algo tan graduado como la intensidad de un dolor.",
      },
      {
        error: "Usar «cerrado» e «inactivado» como sinónimos al hablar de los canales de sodio.",
        correccion:
          "Un canal cerrado está disponible y puede abrirse en cuanto se alcance el umbral; uno inactivado está bloqueado y no puede reabrirse hasta que la membrana se repolarice. De esa diferencia dependen el período refractario absoluto, la imposibilidad de que la señal retroceda y el que el corazón no pueda entrar en tetania.",
      },
      {
        error: "Pensar que la bomba de sodio y potasio genera el potencial de acción.",
        correccion:
          "El potencial de acción lo generan los canales, que dejan pasar iones a favor de su gradiente sin gastar ATP en ese momento. La bomba mantiene los gradientes a largo plazo, y sin ella acabarían agotándose, pero durante el propio impulso mueve una cantidad de iones despreciable. Una célula envenenada en su bomba puede seguir disparando un rato antes de agotarse.",
      },
      {
        error: "Suponer que la mielina hace que la señal viaje por dentro del axón sin tocar la membrana.",
        correccion:
          "El potencial de acción se regenera en cada nodo de Ranvier, donde se concentran los canales de sodio; entre nodos la corriente sí circula de forma pasiva, y por eso el impulso salta. La ganancia es doble: más velocidad y menos gasto, porque entra menos sodio total y la bomba tiene menos trabajo posterior.",
      },
      {
        error: "Extrapolar la curva de la neurona a cualquier célula excitable.",
        correccion:
          "El potencial de acción cardíaco tiene una meseta sostenida por la entrada de calcio que la neurona no tiene, y esa meseta alarga enormemente el período refractario. Es justo lo que impide la tetania del miocardio. Aplicar la curva neuronal al corazón hace incomprensible tanto el electrocardiograma como buena parte de la farmacología antiarrítmica.",
      },
    ],
    tarjetas: [
      { front: "¿A qué voltaje aproximado está el potencial de membrana en reposo de una neurona típica?", back: "Alrededor de −70 mV." },
      { front: "¿Qué tipo de retroalimentación explica la fase de despolarización?", back: "Positiva: la entrada de sodio abre más canales de sodio." },
      { front: "¿Qué ocurre con los canales de sodio cerca del pico del potencial de acción?", back: "Se inactivan, que no es lo mismo que cerrarse." },
      { front: "¿Qué hace falta para que un canal de sodio inactivado vuelva a estar disponible?", back: "Que la membrana se repolarice." },
      { front: "¿Qué canal produce la repolarización y qué lo caracteriza?", back: "El de potasio dependiente de voltaje: es más lento que el de sodio." },
      { front: "¿Por qué la membrana queda más negativa que en reposo tras el potencial de acción?", back: "Porque los canales de potasio tardan en cerrarse y el potasio sigue saliendo." },
      { front: "¿Qué impide que el impulso nervioso retroceda?", back: "Que la zona recién recorrida está en período refractario absoluto." },
      { front: "¿En qué se codifica la intensidad de un estímulo, si la amplitud no cambia?", back: "En la frecuencia de disparo." },
      { front: "¿Cómo se llama la conducción entre nodos de Ranvier?", back: "Conducción saltatoria." },
      { front: "¿Qué impide que el músculo cardíaco entre en tetania?", back: "Su período refractario muy prolongado por la meseta del potencial de acción." },
    ],
    faq: [
      {
        q: "¿Qué es un potencial de acción?",
        a: "Es un cambio rápido y transitorio del voltaje de la membrana de una célula excitable, producido por la apertura secuencial de canales de sodio y de potasio dependientes de voltaje. Se dispara solo si la despolarización alcanza un umbral, y a partir de ahí se completa siempre igual, con la misma amplitud. Es la señal con la que se comunican las neuronas, el músculo y el corazón.",
      },
      {
        q: "¿Por qué se dice que el potencial de acción es «todo o nada»?",
        a: "Porque por debajo del umbral no ocurre y por encima ocurre completo, con una amplitud que no depende de la intensidad del estímulo. La razón es que la fase de subida se amplifica a sí misma: la entrada de sodio despolariza la membrana, lo que abre más canales de sodio. Un estímulo más intenso no produce un potencial mayor, sino más potenciales por segundo.",
      },
      {
        q: "¿Qué es el período refractario y para qué sirve?",
        a: "Es el intervalo tras un potencial de acción durante el cual la célula no puede disparar otro, o necesita un estímulo mayor. El absoluto se debe a la inactivación de los canales de sodio y hace tres cosas: limita la frecuencia máxima de disparo, impide que el impulso retroceda hacia la zona ya recorrida y, en el corazón, evita que el músculo entre en tetania. El relativo coincide con la hiperpolarización posterior.",
      },
      {
        q: "¿Para qué sirve la mielina?",
        a: "Aísla el axón dejando huecos, los nodos de Ranvier, donde se concentran los canales de sodio. El potencial de acción se regenera solo en esos nodos y salta entre ellos, lo que se llama conducción saltatoria. La ventaja es doble: la señal viaja mucho más rápido y consume menos energía, porque entra menos sodio y la bomba tiene menos que restituir.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 5: «Potenciales de membrana y potenciales de acción»",
      "Ganong, Fisiología médica, sección de fisiología celular y neurofisiología",
      "Guyton y Hall, cap. 10, sobre la excitación rítmica del corazón y el potencial de acción cardíaco",
    ],
    relacionados: ["retroalimentacion-negativa", "biologia-celular", "ph-pka-ionizacion"],
  },

  {
    slug: "sarcomero",
    titulo: "El sarcómero: qué se acorta de verdad cuando un músculo se contrae",
    tituloSEO: "Sarcómero: bandas A, I y H, disco Z, deslizamiento de filamentos y ciclo de puentes cruzados",
    bloque: "estructura",
    unidad: "I8555 · Histología",
    nivel: "mecanismo",
    minutos: 20,
    resumen:
      "Los filamentos no se encogen: se deslizan unos sobre otros. Esa sola frase decide qué bandas del sarcómero se estrechan y cuáles no, y saber distinguirlas es la comprobación más rápida de si alguien entendió la contracción o solo la recitó.",
    porQueImporta:
      "Es donde la estructura explica la función de la forma más limpia de toda la histología: el patrón de bandas que se ve al microscopio es una consecuencia directa de cómo se solapan dos tipos de filamento. Además el ciclo de los puentes cruzados explica hechos clínicos concretos, desde por qué el ATP hace falta para relajarse y no solo para contraerse hasta la rigidez que aparece tras la muerte.",
    secciones: [
      {
        titulo: "Las piezas y por qué se ven bandas",
        cuerpo: [
          "El sarcómero es el segmento comprendido **entre dos discos Z** y es la unidad que se repite a lo largo de la miofibrilla. Del disco Z parten hacia el centro los **filamentos delgados**, de actina, y en la zona central se sitúan los **filamentos gruesos**, de miosina.",
          "El patrón de bandas es puro efecto óptico del solapamiento. Donde solo hay filamento delgado, la zona se ve clara: es la **banda I**. Donde está el filamento grueso, se ve oscura en toda su longitud, haya o no delgados por medio: es la **banda A**. Y en el centro de la banda A, donde el grueso no tiene compañía, aparece la **zona H**, algo más clara, atravesada por la **línea M**.",
          "Los filamentos delgados llevan además **tropomiosina** y el complejo de **troponina**. En reposo la tropomiosina tapa los sitios de la actina donde la miosina se uniría. Esto merece subrayarse porque el error conceptual más común está aquí: el músculo en reposo no está inactivo por falta de energía, está **activamente bloqueado**.",
        ],
      },
      {
        titulo: "Qué se acorta y qué no",
        cuerpo: [
          "Al contraerse, ningún filamento cambia de longitud. Lo que ocurre es que los delgados **se deslizan hacia el centro**, aumentando su solapamiento con los gruesos.",
          "De ahí se deduce todo lo demás sin memorizar nada. Los discos Z se acercan, así que el sarcómero se acorta. La banda I, que es la zona sin filamento grueso, se estrecha. La zona H, que es la zona sin filamento delgado, también se estrecha y puede desaparecer.",
          "Y **la banda A no cambia**, porque mide la longitud del filamento grueso y el filamento grueso no se acorta. Esa es la pregunta que separa a quien entendió el mecanismo de quien memorizó una lista: si alguien dice que la banda A se acorta, es que sigue imaginando filamentos que se encogen.",
        ],
      },
      {
        titulo: "El ciclo de los puentes cruzados y el papel doble del ATP",
        cuerpo: [
          "Cuando llega el potencial de acción, el retículo sarcoplásmico libera **calcio**. El calcio se une a la troponina, la troponina desplaza a la tropomiosina y quedan libres los sitios de unión de la actina. El interruptor es el calcio y actúa sobre el filamento delgado, no sobre la miosina.",
          "Con los sitios libres, la cabeza de miosina se une, gira y arrastra el filamento delgado hacia el centro. Ese giro es el **golpe de fuerza**.",
          "Aquí está el punto que más se olvida: **hace falta ATP para que la miosina se suelte**. El ATP no solo alimenta el golpe de fuerza, también es lo que permite deshacer la unión. Una fibra sin ATP no se queda relajada: se queda enganchada.",
          "Eso es exactamente el **rigor mortis**. Al morir la célula, se agota el ATP y las cabezas de miosina no pueden soltarse de la actina, de modo que el músculo queda rígido. No es una contracción, porque no hay ni señal ni calcio regulado: es una imposibilidad de separación. Entenderlo así hace innecesario memorizarlo.",
        ],
      },
      {
        titulo: "La longitud de partida importa",
        cuerpo: [
          "La fuerza que un sarcómero puede generar depende de cuánto se solapan los filamentos antes de empezar, porque la fuerza es proporcional al número de puentes cruzados que pueden formarse.",
          "Si el sarcómero parte demasiado estirado, hay poco solapamiento y pocos puentes posibles. Si parte demasiado acortado, los filamentos delgados se estorban entre sí y los gruesos chocan con los discos Z. Existe por tanto una **longitud intermedia óptima**.",
          "Esta relación entre longitud y tensión es la base estructural de la ley de Frank-Starling en el corazón: un ventrículo que se llena más parte de una longitud más favorable y expulsa más, sin necesidad de ninguna señal externa. Conviene añadir que en el músculo cardíaco intacto intervienen además otros factores, como la sensibilidad al calcio, de modo que la explicación por solapamiento es una parte del cuadro y no el cuadro entero.",
        ],
      },
    ],
    analogia: {
      campo: "Dos peines que se entrelazan",
      texto:
        "Dos peines enfrentados que acercan sus mangos entrelazando más las púas: las púas no se acortan, solo se meten unas entre otras, y el conjunto ocupa menos espacio.",
      dondeSeRompe:
        "Los peines se deslizan pasivamente y aquí el movimiento lo genera una de las dos piezas: la miosina se agarra a la actina y tira, en ciclos repetidos que consumen ATP. La imagen tampoco recoge lo esencial de la regulación —que los sitios de unión están tapados hasta que llega el calcio— ni el hecho de que hace falta energía para soltarse, no solo para tirar.",
    },
    figura: "sarcomero",
    recall: [
      {
        pregunta: "Durante la contracción, ¿qué bandas del sarcómero se estrechan y cuál no cambia? Justifica cada una.",
        referencia:
          "Se estrechan la banda I y la zona H, y la banda A no cambia. El motivo común es que ningún filamento se acorta: los delgados se deslizan hacia el centro y aumentan su solapamiento con los gruesos. La banda I es la región donde solo hay filamento delgado, así que al entrar los delgados en la zona ocupada por los gruesos esa región se reduce. La zona H es la parte central donde solo hay filamento grueso, y se estrecha porque los delgados avanzan hacia ella; en una contracción máxima puede desaparecer. La banda A corresponde a toda la longitud del filamento grueso, y como ese filamento mantiene su longitud, la banda A permanece constante. Los discos Z, que delimitan el sarcómero, se acercan entre sí, y eso es lo que define que el sarcómero se acortó.",
        pistas: [
          "¿Cambia de longitud algún filamento?",
          "¿Qué hay exactamente en cada banda: solo delgados, solo gruesos, o ambos?",
          "Si la banda A mide el filamento grueso, ¿qué le tendría que pasar a ese filamento para que cambiara?",
        ],
      },
      {
        pregunta: "Explica por qué hace falta ATP para relajar un músculo y qué ocurre cuando se agota.",
        referencia:
          "El ATP interviene dos veces en el ciclo de los puentes cruzados. Su hidrólisis prepara y energiza la cabeza de miosina para el golpe de fuerza, pero además la unión de una nueva molécula de ATP a la cabeza es lo que hace que esta se suelte de la actina. Sin ATP, la cabeza queda unida y no puede separarse, de modo que la fibra no se relaja sino que se queda enganchada. Eso es el rigor mortis: al morir la célula se agota el ATP y las cabezas de miosina permanecen adheridas, dejando el músculo rígido. Conviene precisar que no es una contracción, porque no hay señal nerviosa ni liberación regulada de calcio; es una imposibilidad de separación. La relajación normal, en cambio, requiere además que el calcio vuelva al retículo sarcoplásmico, y ese transporte también consume ATP.",
        pistas: [
          "El ATP participa en dos momentos distintos del ciclo: ¿cuáles?",
          "¿Qué molécula tiene que unirse a la cabeza de miosina para que se suelte?",
          "¿Qué estado del cuerpo ilustra lo que pasa cuando falta?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Se impide que el calcio liberado vuelva al retículo sarcoplásmico, aunque siga habiendo ATP.",
        pregunta: "¿Qué le ocurre al músculo?",
        respuesta:
          "Permanece contraído. Mientras haya calcio unido a la troponina, la tropomiosina sigue apartada y los sitios de unión de la actina siguen accesibles, de modo que el ciclo de puentes cruzados continúa. La relajación no es un estado pasivo al que la fibra vuelve sola: exige retirar el calcio activamente, y ese transporte de vuelta al retículo consume ATP. El caso deja claro que hay dos requisitos distintos para relajarse —que haya ATP para soltar las cabezas y que el calcio se retire— y que fallar cualquiera de los dos deja el músculo contraído, aunque por mecanismos diferentes.",
      },
      {
        escenario: "Un sarcómero se estira mucho más allá de su longitud de reposo antes de estimularlo.",
        pregunta: "¿Genera más o menos fuerza, y por qué?",
        respuesta:
          "Menos. La fuerza depende de cuántos puentes cruzados pueden formarse, y eso depende de cuánto se solapan los filamentos gruesos y delgados. Estirado en exceso, el solapamiento disminuye, hay menos cabezas de miosina con actina disponible enfrente y la fuerza cae. En el extremo opuesto la fuerza también cae, porque los filamentos delgados de los dos lados se estorban entre sí y los gruesos topan con los discos Z. Existe por tanto una longitud intermedia en la que la fuerza es máxima. Esta relación es la base estructural de la ley de Frank-Starling en el corazón, aunque en el músculo cardíaco intacto intervienen además otros factores como la sensibilidad al calcio.",
      },
    ],
    errores: [
      {
        error: "Decir que los filamentos se acortan durante la contracción.",
        correccion:
          "Ni la actina ni la miosina cambian de longitud: se deslizan una sobre otra aumentando su solapamiento. De esta distinción se deduce directamente qué bandas se estrechan, así que quien la tiene clara no necesita memorizar la lista y quien no la tiene falla siempre en la banda A.",
      },
      {
        error: "Afirmar que la banda A se acorta al contraerse.",
        correccion:
          "La banda A corresponde a la longitud del filamento grueso, que no cambia, así que se mantiene constante. Es la comprobación más rápida de si alguien entendió el deslizamiento de filamentos: si cree que la banda A se acorta, sigue imaginando filamentos que se encogen.",
      },
      {
        error: "Pensar que el calcio actúa sobre la miosina.",
        correccion:
          "En el músculo estriado el calcio se une a la troponina, que está en el filamento delgado, y ese cambio desplaza a la tropomiosina y descubre los sitios de unión de la actina. La regulación está en el filamento delgado. En el músculo liso el mecanismo es distinto y sí pasa por la miosina, lo que explica que responda a fármacos diferentes.",
      },
      {
        error: "Creer que el ATP solo hace falta para contraerse.",
        correccion:
          "También hace falta para soltarse: la unión de una nueva molécula de ATP es lo que separa la cabeza de miosina de la actina. Y la relajación requiere además retirar el calcio al retículo sarcoplásmico, que es un transporte activo. Sin ATP el músculo no se relaja, se queda rígido, y eso es el rigor mortis.",
      },
      {
        error: "Llamar contracción al rigor mortis.",
        correccion:
          "No hay señal nerviosa ni liberación regulada de calcio: hay cabezas de miosina que no pueden soltarse porque no queda ATP. Es una imposibilidad de separación, no un proceso activo. La diferencia importa porque explica por qué el rigor aparece con retraso y por qué después desaparece al degradarse las proteínas.",
      },
    ],
    tarjetas: [
      { front: "¿Entre qué estructuras se define un sarcómero?", back: "Entre dos discos Z." },
      { front: "¿Qué contiene la banda I?", back: "Solo filamento delgado." },
      { front: "¿A qué corresponde exactamente la banda A?", back: "A toda la longitud del filamento grueso, se solape o no." },
      { front: "¿Qué le pasa a la banda A durante la contracción?", back: "No cambia." },
      { front: "¿Qué hay en la zona H?", back: "Solo filamento grueso, sin solapamiento con los delgados." },
      { front: "¿A qué proteína se une el calcio en el músculo estriado?", back: "A la troponina, en el filamento delgado." },
      { front: "¿Qué hace la tropomiosina en reposo?", back: "Tapa los sitios de unión de la actina para la miosina." },
      { front: "¿Qué molécula debe unirse a la cabeza de miosina para que se suelte de la actina?", back: "Una nueva molécula de ATP." },
      { front: "¿Por qué el músculo queda rígido tras la muerte?", back: "Porque sin ATP las cabezas de miosina no pueden soltarse de la actina." },
      { front: "¿De qué depende la fuerza que puede generar un sarcómero?", back: "Del solapamiento inicial, que determina cuántos puentes cruzados pueden formarse." },
    ],
    faq: [
      {
        q: "¿Qué es un sarcómero?",
        a: "Es la unidad funcional del músculo estriado, definida como el segmento comprendido entre dos discos Z. Contiene filamentos delgados de actina, que parten de los discos Z hacia el centro, y filamentos gruesos de miosina en la zona central. La forma en que ambos se solapan produce el patrón de bandas claras y oscuras que se ve al microscopio.",
      },
      {
        q: "¿Qué bandas del sarcómero se acortan durante la contracción?",
        a: "Se estrechan la banda I y la zona H, mientras que la banda A permanece constante. La razón es que los filamentos no cambian de longitud: se deslizan unos sobre otros. La banda I contiene solo filamento delgado y se reduce cuando este avanza hacia el centro; la zona H contiene solo filamento grueso y se estrecha por el mismo motivo; la banda A mide el filamento grueso, que no se acorta.",
      },
      {
        q: "¿Por qué se produce el rigor mortis?",
        a: "Porque se agota el ATP. La unión de una nueva molécula de ATP a la cabeza de miosina es lo que le permite soltarse de la actina, así que sin ATP las cabezas quedan adheridas y el músculo permanece rígido. No es una contracción, ya que no hay señal nerviosa ni liberación regulada de calcio, sino una imposibilidad de separación. Desaparece más tarde, al degradarse las proteínas.",
      },
      {
        q: "¿Qué papel tiene el calcio en la contracción muscular?",
        a: "En el músculo estriado, el calcio liberado por el retículo sarcoplásmico se une a la troponina del filamento delgado. Ese cambio desplaza a la tropomiosina, que en reposo tapaba los sitios donde la miosina se une a la actina, y permite que empiece el ciclo de puentes cruzados. El calcio es por tanto el interruptor, y actúa sobre el filamento delgado y no sobre la miosina.",
      },
    ],
    fuentes: [
      "Ross, Histología: texto y atlas, 8.ª ed., cap. 11: «Tejido muscular»",
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 6: «Contracción del músculo esquelético»",
      "Guyton y Hall, cap. 9, sobre el músculo cardíaco y la relación longitud-tensión",
    ],
    relacionados: ["ley-de-laplace", "hipertrofia-vs-hiperplasia", "biologia-celular"],
  },
  {
    slug: "gluconeogenesis",
    titulo: "Gluconeogénesis: fabricar glucosa cuesta más de lo que dio quemarla",
    tituloSEO: "Gluconeogénesis: los tres rodeos, precursores, regulación recíproca con la glucólisis y por qué el músculo no libera glucosa",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 22,
    resumen:
      "No es la glucólisis al revés: rodea sus tres pasos irreversibles con enzimas propias, y eso es justo lo que permite regular cada dirección por separado. Explica por qué el hígado sostiene la glucemia entre comidas y por qué el músculo, que también almacena glucógeno, no puede compartir ni un gramo.",
    porQueImporta:
      "El cerebro consume glucosa de forma constante y las reservas de glucógeno del hígado se agotan en menos de un día. A partir de ahí, quien mantiene viva a esa persona es esta vía. Además es el mejor ejemplo de regulación recíproca del metabolismo —dos vías opuestas que nunca corren a la vez—, y contiene la razón mecanicista de por qué las grasas no sirven para fabricar glucosa, que es de las confusiones más persistentes de toda la bioquímica.",
    secciones: [
      {
        titulo: "Por qué no basta con dar marcha atrás",
        cuerpo: [
          "De las diez reacciones de la glucólisis, siete son reversibles y la gluconeogénesis las usa tal cual, en sentido contrario. El problema son las otras tres: las de la **hexocinasa**, la **fosfofructocinasa-1** y la **piruvato cinasa**.",
          "Una reacción irreversible libera tanta energía que volver por el mismo camino sería como subir un agua que ya cayó. Así que la vía no lo intenta: **rodea cada una de las tres con enzimas distintas**. A esos desvíos se les llama rodeos o «bypass».",
          "Y aquí está lo importante, que no es química sino lógica de control. Si las dos vías compartieran todas sus enzimas, cualquier señal que activara una activaría también la otra, y la célula se limitaría a gastar ATP dando vueltas sin producir nada. Eso tiene nombre: **ciclo fútil**. Tener enzimas propias en los tres puntos clave es lo que permite encender una vía y apagar la otra.",
        ],
      },
      {
        titulo: "Los tres rodeos, y el que decide quién puede ceder glucosa",
        cuerpo: [
          "El **primer rodeo** deshace lo que hizo la hexocinasa: una **glucosa-6-fosfatasa** retira el fosfato y deja glucosa libre. Este paso decide algo que tiene consecuencias en todo el organismo, porque **solo el hígado y el riñón tienen esa enzima**.",
          "De ahí sale la respuesta a una pregunta que confunde a mucha gente: el músculo almacena glucógeno, y sin embargo no puede ceder glucosa a la sangre. No es que no quiera: le falta la enzima que retira el fosfato, y una glucosa fosforilada no puede salir de la célula. El glucógeno muscular es una despensa privada.",
          "El **segundo rodeo** es la **fructosa-1,6-bisfosfatasa**, que deshace el paso de la fosfofructocinasa-1. Es el punto de control principal de la vía, igual que aquella lo era de la glucólisis, y las dos responden en sentidos opuestos a las mismas señales.",
          "El **tercer rodeo** es el más caro y necesita dos enzimas. La **piruvato carboxilasa** convierte el piruvato en oxalacetato dentro de la mitocondria —con biotina como cofactor—, y después la **fosfoenolpiruvato carboxicinasa** lo transforma en fosfoenolpiruvato. Un paso de la glucólisis se ha convertido en dos reacciones y un viaje por la mitocondria.",
        ],
      },
      {
        titulo: "De dónde sale el carbono",
        cuerpo: [
          "Los precursores son tres y conviene tenerlos separados porque vienen de sitios distintos. El **lactato**, que llega del músculo y del eritrocito y que el hígado reconvierte en glucosa: eso es el ciclo de Cori. El **glicerol**, que se libera al romper los triglicéridos del tejido adiposo. Y los **aminoácidos glucogénicos**, sobre todo la alanina que el músculo exporta.",
          "Falta uno en la lista, y su ausencia es el punto que más importa: **los ácidos grasos no están**. La razón es concreta y no una regla que memorizar. El paso de piruvato a acetil-CoA, catalizado por la piruvato deshidrogenasa, es **irreversible**. Los ácidos grasos de cadena par se degradan a acetil-CoA, y desde ahí no hay camino de vuelta al piruvato ni, por tanto, a la glucosa.",
          "Merece decirse con precisión, porque la afirmación absoluta también sería falsa. El **glicerol** del triglicérido sí aporta carbonos, así que una grasa contribuye algo a la glucemia, pero por su esqueleto y no por sus cadenas. Y los ácidos grasos de cadena impar dejan un resto de tres carbonos que sí puede entrar. La regla útil es: **de las cadenas de carbono par, no sale glucosa**.",
        ],
      },
      {
        titulo: "Regulación recíproca: cuando una sube, la otra baja",
        cuerpo: [
          "Las señales que activan la glucólisis inhiben la gluconeogénesis, y al revés. El **glucagón**, que aparece en ayuno, activa la vía de fabricar glucosa y frena la de quemarla; la **insulina** hace lo contrario.",
          "Dentro de la célula el mensajero es una molécula que solo sirve para esto: la **fructosa-2,6-bisfosfato**. Activa la fosfofructocinasa-1 e inhibe la fructosa-1,6-bisfosfatasa a la vez, así que una sola señal empuja las dos enzimas en direcciones opuestas. Es un interruptor de dos posiciones, no dos interruptores independientes.",
          "El **acetil-CoA** añade otra capa que conecta las grasas con esto. Activa la piruvato carboxilasa, es decir, favorece la gluconeogénesis. Tiene sentido: si abunda el acetil-CoA es que se están quemando grasas, y eso ocurre en ayuno, que es justo cuando hay que fabricar glucosa. Las grasas no aportan carbonos, pero **dan la energía y la señal** para que otros los aporten.",
        ],
      },
      {
        titulo: "Lo que cuesta",
        cuerpo: [
          "Fabricar una glucosa a partir de dos piruvatos consume **cuatro ATP y dos GTP**, seis enlaces de alta energía en total. La glucólisis, al bajar, solo había rendido dos ATP netos.",
          "La asimetría no es un defecto de diseño: es lo que hace que la vía sea irreversible en la práctica y que solo se recorra cuando de verdad hace falta. Fabricar glucosa es caro, y el organismo lo paga porque el cerebro no negocia.",
          "Esa energía sale de la beta-oxidación de las grasas, que es lo que sostiene al hígado durante el ayuno. Otra vez: las grasas no se convierten en glucosa, pero pagan la factura de fabricarla.",
        ],
      },
    ],
    analogia: {
      campo: "Una calle de sentido único",
      texto:
        "Siete tramos de la ruta son de doble sentido y se recorren igual en las dos direcciones. Tres son de sentido único, y para volver hay que tomar desvíos distintos, más largos y con peaje.",
      dondeSeRompe:
        "En una ciudad los desvíos existen por conveniencia y aquí existen por termodinámica: no se puede circular en contra por el tramo directo aunque no haya nadie. Y la analogía sugiere que el desvío es un mero rodeo geográfico, cuando la diferencia importa por otra razón: tener carreteras separadas es lo que permite cerrar una dirección mientras la otra sigue abierta, y eso en una ciudad no haría falta.",
    },
    figura: "gluconeogenesis",
    recall: [
      {
        pregunta: "Explica por qué el músculo almacena glucógeno y aun así no puede aportar glucosa a la sangre.",
        referencia:
          "Porque le falta la glucosa-6-fosfatasa. Al degradar glucógeno, tanto el hígado como el músculo obtienen glucosa-6-fosfato, que lleva carga y por tanto no puede atravesar la membrana. Para liberarla a la sangre hay que retirarle el fosfato, y la enzima que lo hace solo está en el hígado y en el riñón. El músculo, sin ella, únicamente puede usar esa glucosa-6-fosfato para su propio consumo, entrando directamente en su glucólisis. Su glucógeno es por tanto una reserva privada. Lo que sí exporta el músculo son productos que el hígado puede reconvertir: lactato, por el ciclo de Cori, y alanina, que el hígado transamina y usa como precursor. Aporta materia prima, no producto terminado.",
        pistas: [
          "¿En qué forma sale la glucosa del glucógeno y qué problema tiene esa forma?",
          "¿Qué enzima hace falta para poder exportarla, y qué órganos la tienen?",
          "El músculo sí exporta algo al hígado: ¿qué?",
        ],
      },
      {
        pregunta: "¿Por qué los ácidos grasos no sirven para fabricar glucosa? Sé preciso, porque la respuesta absoluta también es incorrecta.",
        referencia:
          "Porque el paso de piruvato a acetil-CoA, catalizado por la piruvato deshidrogenasa, es irreversible. Los ácidos grasos de cadena par se degradan por beta-oxidación hasta acetil-CoA, y desde ahí no existe ninguna ruta de vuelta al piruvato, de modo que sus carbonos no pueden llegar a glucosa. Ahora la precisión: sí hay dos excepciones. El glicerol procedente de romper el triglicérido sí es precursor gluconeogénico, así que una grasa aporta algo de carbono a la glucemia, pero por su esqueleto y no por sus cadenas. Y los ácidos grasos de cadena impar dejan al final un resto de tres carbonos, el propionil-CoA, que sí puede incorporarse. La formulación correcta es que los carbonos de las cadenas de número par no llegan a glucosa. Aun así, las grasas son imprescindibles en el ayuno porque aportan el ATP que la gluconeogénesis consume.",
        pistas: [
          "¿Qué paso entre la glucólisis y el ciclo de Krebs no tiene vuelta atrás?",
          "Un triglicérido tiene cadenas y también otra cosa: ¿qué?",
          "Si no aportan carbono, ¿qué aportan las grasas durante el ayuno?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Sube la concentración de fructosa-2,6-bisfosfato en un hepatocito.",
        pregunta: "¿Qué le ocurre a cada una de las dos vías y qué situación fisiológica es esa?",
        respuesta:
          "La glucólisis se acelera y la gluconeogénesis se frena. La fructosa-2,6-bisfosfato activa la fosfofructocinasa-1 e inhibe la fructosa-1,6-bisfosfatasa, es decir, empuja a las dos enzimas opuestas en direcciones contrarias con una sola señal. Eso corresponde al estado posprandial: hay insulina alta, sobra glucosa y lo que toca es consumirla y almacenarla, no fabricarla. Lo elegante del mecanismo es que hace imposible que las dos vías corran a la vez, que es exactamente el ciclo fútil que hay que evitar. En ayuno el glucagón hace bajar esta molécula y el interruptor se invierte por completo.",
      },
      {
        escenario: "Un lactante presenta hipoglucemia grave en ayunas y un hígado aumentado de tamaño cargado de glucógeno.",
        pregunta: "¿Qué punto de la vía razonarías como afectado, y por qué encajan los dos hallazgos a la vez?",
        respuesta:
          "El primer rodeo: la glucosa-6-fosfatasa. Es el único paso que explica los dos hallazgos con un solo fallo. Sin esa enzima el hígado no puede retirar el fosfato, así que no puede liberar glucosa a la sangre ni desde el glucógeno ni desde la gluconeogénesis, y aparece hipoglucemia en cuanto se acaba la ingesta. Al mismo tiempo, la glucosa-6-fosfato que se acumula se reconvierte en glucógeno, que se deposita en el hígado y lo agranda. Un almacén lleno y un paciente hipoglucémico solo son compatibles si el problema está en la puerta de salida, no en la reserva. El razonamiento apunta al mecanismo; el diagnóstico concreto requiere estudio dirigido y confirmación.",
      },
    ],
    errores: [
      {
        error: "Decir que la gluconeogénesis es la glucólisis en sentido inverso.",
        correccion:
          "Comparte las siete reacciones reversibles pero rodea las tres irreversibles con enzimas propias. Esa diferencia no es un tecnicismo: es lo que permite regular cada dirección por separado. Si compartieran todas las enzimas, cualquier señal activaría ambas y la célula solo gastaría ATP en un ciclo fútil.",
      },
      {
        error: "Creer que las grasas se convierten en glucosa porque el organismo mantiene la glucemia durante el ayuno.",
        correccion:
          "Los carbonos de las cadenas de número par acaban en acetil-CoA, y el paso de piruvato a acetil-CoA es irreversible, así que no hay vuelta. Lo que sostiene la glucemia son el lactato, el glicerol y los aminoácidos. Las grasas aportan el ATP que la vía consume, y en el ayuno eso es imprescindible, pero no aportan el carbono.",
      },
      {
        error: "Suponer que cualquier célula puede fabricar glucosa y liberarla.",
        correccion:
          "La vía completa, con glucosa-6-fosfatasa incluida, está en el hígado y en el riñón. Otros tejidos pueden realizar algunos pasos, pero sin esa última enzima no consiguen glucosa libre y no pueden exportarla. Por eso el músculo no cede glucosa aunque tenga glucógeno.",
      },
      {
        error: "Pensar que fabricar glucosa recupera la energía que se obtuvo al degradarla.",
        correccion:
          "Cuesta seis enlaces de alta energía —cuatro ATP y dos GTP— frente a los dos ATP netos que rindió la glucólisis. El balance es claramente negativo, y esa asimetría es precisamente lo que hace que la vía solo se recorra cuando el organismo no tiene alternativa.",
      },
      {
        error: "Tratar el ciclo de Cori como si generase energía.",
        correccion:
          "Traslada la carga metabólica del músculo al hígado, no la crea. El músculo obtiene ATP con la glucólisis anaerobia y el hígado gasta bastante más para reconvertir ese lactato en glucosa. Para el organismo en conjunto el balance es negativo; lo que aporta es permitir que el músculo siga trabajando aunque no le llegue oxígeno suficiente.",
      },
    ],
    tarjetas: [
      { front: "¿Cuántos pasos de la glucólisis tiene que rodear la gluconeogénesis?", back: "Tres: hexocinasa, fosfofructocinasa-1 y piruvato cinasa." },
      { front: "¿Qué enzima permite liberar glucosa libre a la sangre?", back: "La glucosa-6-fosfatasa." },
      { front: "¿Qué órganos tienen glucosa-6-fosfatasa?", back: "El hígado y el riñón." },
      { front: "¿Por qué el músculo no puede ceder glucosa de su glucógeno?", back: "Porque carece de glucosa-6-fosfatasa y la glucosa fosforilada no sale de la célula." },
      { front: "¿Qué cofactor necesita la piruvato carboxilasa?", back: "Biotina." },
      { front: "¿En qué compartimento se forma el oxalacetato del tercer rodeo?", back: "En la matriz mitocondrial." },
      { front: "Nombra los tres precursores principales de la gluconeogénesis.", back: "Lactato, glicerol y aminoácidos glucogénicos." },
      { front: "¿Por qué los ácidos grasos de cadena par no aportan carbono a la glucosa?", back: "Porque el paso de piruvato a acetil-CoA es irreversible." },
      { front: "¿Qué molécula activa la glucólisis e inhibe la gluconeogénesis a la vez?", back: "La fructosa-2,6-bisfosfato." },
      { front: "¿Cuántos enlaces de alta energía cuesta fabricar una glucosa desde dos piruvatos?", back: "Seis: cuatro ATP y dos GTP." },
    ],
    faq: [
      {
        q: "¿Qué es la gluconeogénesis?",
        a: "Es la vía que fabrica glucosa a partir de precursores que no son hidratos de carbono, sobre todo lactato, glicerol y aminoácidos. Ocurre principalmente en el hígado y en menor medida en el riñón, y su función es mantener la glucemia cuando las reservas de glucógeno se agotan, algo que sucede en menos de un día de ayuno.",
      },
      {
        q: "¿Por qué la gluconeogénesis no es la glucólisis al revés?",
        a: "Porque tres reacciones de la glucólisis son irreversibles: las de la hexocinasa, la fosfofructocinasa-1 y la piruvato cinasa. La gluconeogénesis las rodea con enzimas propias. Además de ser necesario por termodinámica, tener enzimas distintas en esos puntos es lo que permite activar una vía y apagar la otra en lugar de correrlas a la vez y gastar energía sin resultado.",
      },
      {
        q: "¿Se puede fabricar glucosa a partir de la grasa?",
        a: "A partir de las cadenas de ácidos grasos de número par, no: se degradan a acetil-CoA y el paso que va de piruvato a acetil-CoA es irreversible, de modo que no hay camino de vuelta. Sí aportan carbono el glicerol del triglicérido y el resto final de los ácidos grasos de cadena impar. Además las grasas aportan el ATP que la gluconeogénesis consume, así que son imprescindibles en el ayuno aunque no den el carbono.",
      },
      {
        q: "¿Qué es el ciclo de Cori?",
        a: "Es el recorrido por el que el lactato producido por el músculo o el eritrocito viaja al hígado, que lo reconvierte en glucosa y la devuelve a la circulación. No genera energía para el organismo: el hígado gasta más de lo que el músculo obtuvo. Lo que aporta es permitir que el músculo siga funcionando cuando no le llega oxígeno suficiente, trasladando el coste al hígado.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 68: formación de hidratos de carbono a partir de proteínas y grasas",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de gluconeogénesis",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de gluconeogénesis y regulación recíproca",
    ],
    relacionados: ["glucolisis", "ciclo-de-krebs", "reacciones-del-metabolismo"],
  },

  {
    slug: "beta-oxidacion",
    titulo: "Beta-oxidación: por qué la grasa rinde tanto y por qué el cerebro no puede usarla",
    tituloSEO: "Beta-oxidación de ácidos grasos: lanzadera de carnitina, los cuatro pasos, rendimiento y regulación",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 22,
    resumen:
      "Cuatro reacciones que se repiten en bucle y recortan dos carbonos por vuelta. Su rendimiento no viene de que cada paso sea especial, sino de que una cadena larga da muchas vueltas. Y todo depende de un transporte previo —la lanzadera de carnitina— que es a la vez el freno de la vía y el punto donde se decide si el cuerpo quema grasa o la fabrica.",
    porQueImporta:
      "Es la fuente principal de energía en reposo y durante el ayuno, y el sustrato preferido del corazón incluso en condiciones normales. Entender su regulación explica por qué no se puede quemar y almacenar grasa a la vez, y por qué el cerebro depende de glucosa aunque el cuerpo esté lleno de reservas: no es que le falte combustible, es que ese combustible no llega adonde hace falta.",
    secciones: [
      {
        titulo: "El nombre dice dónde ocurre la acción",
        cuerpo: [
          "En una cadena de ácido graso, el carbono unido al grupo carboxilo es el **alfa** y el siguiente es el **beta**. Toda la vía consiste en oxidar ese segundo carbono hasta poder cortar la cadena por ahí, y de ahí el nombre.",
          "Antes de nada, el ácido graso se activa uniéndose a la coenzima A para formar **acil-CoA**. Ese paso cuesta el equivalente a dos ATP, y es un detalle que hay que descontar del balance final: la grasa rinde muchísimo, pero no gratis.",
          "La secuencia después es siempre la misma: **oxidación, hidratación, oxidación y corte**. Cada vuelta produce un FADH₂, un NADH y un acetil-CoA, y deja la cadena dos carbonos más corta para volver a empezar.",
        ],
      },
      {
        titulo: "La puerta: la lanzadera de carnitina",
        cuerpo: [
          "Los ácidos grasos de cadena larga **no atraviesan solos la membrana mitocondrial interna**. Necesitan intercambiar la coenzima A por **carnitina**, entrar como acilcarnitina y recuperar la coenzima A dentro.",
          "Ese transporte es el **paso limitante** de toda la vía, y por tanto su punto de control. Lo que lo regula es una sola molécula: el **malonil-CoA**, que inhibe la enzima que carga el ácido graso sobre la carnitina.",
          "El detalle es más elegante de lo que parece. El malonil-CoA es el primer intermediario de la **síntesis** de ácidos grasos. Cuando la célula está fabricando grasa, su presencia bloquea la entrada de grasa a la mitocondria. **La misma molécula que inicia una vía cierra la puerta de la contraria**, así que el cuerpo no puede quemar y almacenar a la vez. Y no hace falta memorizarlo como una regla: se deduce.",
          "Los ácidos grasos de cadena corta y media no necesitan la lanzadera y entran solos. Esa diferencia importa porque significa que su oxidación escapa a este control.",
        ],
      },
      {
        titulo: "Por qué rinde tanto",
        cuerpo: [
          "Comparar por vuelta lleva a error. Una vuelta de beta-oxidación da un FADH₂, un NADH y un acetil-CoA, lo cual no es espectacular. Lo que cambia el resultado es **cuántas vueltas hay**.",
          "Un ácido graso de dieciséis carbonos da siete vueltas y produce ocho acetil-CoA, que después entran al ciclo de Krebs y rinden por su cuenta. Frente a eso, una glucosa aporta dos piruvatos y por tanto dos acetil-CoA.",
          "Hay además una razón química de fondo: **los ácidos grasos están mucho menos oxidados que los hidratos de carbono**. Sus carbonos apenas llevan oxígeno unido, así que queda más camino por recorrer hasta CO₂, y ese camino son electrones. Por eso un gramo de grasa aporta más del doble de energía que un gramo de hidrato de carbono, y por eso el organismo almacena a largo plazo en grasa y no en glucógeno.",
        ],
      },
      {
        titulo: "Lo que la vía no puede hacer",
        cuerpo: [
          "El producto final es acetil-CoA, y eso impone dos límites que conviene tener claros.",
          "El primero ya se vio: como el paso de piruvato a acetil-CoA es irreversible, **de aquí no sale glucosa**. Los ácidos grasos de cadena par no aportan carbono a la gluconeogénesis por muchos que se quemen.",
          "El segundo es el que explica algo que se ve en la clínica: **el cerebro no usa ácidos grasos**. No atraviesan bien la barrera hematoencefálica y además viajan unidos a albúmina. Un cuerpo con reservas de grasa enormes puede tener un cerebro sin combustible si la glucosa cae, y esa es exactamente la situación que fuerza al hígado a fabricar cuerpos cetónicos: una forma de acetil-CoA que sí viaja y sí cruza.",
          "Y hay un tercer límite, de otro tipo. La beta-oxidación necesita que el ciclo de Krebs y la cadena respiratoria funcionen para reoxidar el NADH y el FADH₂ y para procesar el acetil-CoA. **Sin oxígeno esta vía no sirve de nada**, a diferencia de la glucólisis. Un tejido isquémico no puede recurrir a la grasa.",
        ],
      },
    ],
    analogia: {
      campo: "Cortar una barra de pan en rebanadas",
      texto:
        "Cada pasada del cuchillo separa una rebanada del mismo grosor y deja una barra un poco más corta, hasta que no queda barra. El rendimiento no depende de que cada corte sea especial, sino de lo larga que fuera la barra.",
      dondeSeRompe:
        "Cortar pan no produce nada más que rebanadas, y cada vuelta de la beta-oxidación entrega además dos transportadores cargados de electrones que son donde está la mayor parte de la energía. La imagen tampoco recoge lo esencial de la regulación: para empezar a cortar hay que entrar antes en la cocina, y esa puerta —la carnitina— está cerrada mientras el cuerpo esté fabricando pan en lugar de comérselo.",
    },
    figura: "beta-oxidacion",
    recall: [
      {
        pregunta: "Explica el papel de la lanzadera de carnitina y por qué su regulación impide quemar y fabricar grasa a la vez.",
        referencia:
          "Los ácidos grasos de cadena larga no atraviesan por sí solos la membrana mitocondrial interna. Para entrar, intercambian la coenzima A por carnitina, cruzan como acilcarnitina y recuperan la coenzima A en la matriz. Ese transporte es el paso limitante de la beta-oxidación y por tanto su punto de control. Lo regula el malonil-CoA, que inhibe la enzima encargada de cargar el ácido graso sobre la carnitina. Lo interesante es qué es el malonil-CoA: el primer intermediario de la síntesis de ácidos grasos. Así que cuando la célula está fabricando grasa, esa misma molécula cierra la puerta de entrada a la mitocondria y bloquea su degradación. Es un mecanismo recíproco que hace imposible que las dos vías funcionen a la vez, y no hay que memorizarlo como una regla porque se deduce de qué molécula hace de señal. Los ácidos grasos de cadena corta y media no usan la lanzadera y escapan a este control.",
        pistas: [
          "¿Qué problema tienen los ácidos grasos largos con la membrana interna?",
          "¿Qué molécula inhibe la entrada, y de qué vía es el primer intermediario?",
          "¿Qué ácidos grasos no necesitan la lanzadera?",
        ],
      },
      {
        pregunta: "¿Por qué el cerebro no puede usar ácidos grasos, y qué consecuencia tiene eso en el ayuno?",
        referencia:
          "Porque los ácidos grasos no atraviesan bien la barrera hematoencefálica y además circulan unidos a albúmina, que tampoco pasa. El resultado es que una persona con reservas de grasa abundantes puede tener el cerebro sin combustible si la glucosa disponible cae, ya que el cerebro depende de glucosa de forma casi exclusiva en condiciones normales. Esa es precisamente la situación que fuerza la respuesta del ayuno: el hígado degrada ácidos grasos, acumula acetil-CoA que no puede procesar en el ciclo de Krebs, y lo convierte en cuerpos cetónicos. Los cuerpos cetónicos son hidrosolubles, viajan libres en el plasma y sí cruzan la barrera, de modo que funcionan como una forma transportable de acetil-CoA. Es la manera que tiene el organismo de hacer llegar al cerebro la energía de la grasa sin enviar la grasa.",
        pistas: [
          "¿Cómo viajan los ácidos grasos por el plasma y qué implica eso?",
          "¿De qué depende el cerebro en condiciones normales?",
          "¿Qué molécula sí cruza y de dónde viene?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Falla el transportador que introduce los ácidos grasos de cadena larga en la mitocondria, pero los de cadena media entran con normalidad.",
        pregunta: "¿Qué esperarías que ocurriera durante un ayuno prolongado?",
        respuesta:
          "El paciente no podría obtener energía de la mayor parte de su grasa, que es de cadena larga, así que dependería mucho más de la glucosa y se quedaría sin ella antes de lo normal: aparecería hipoglucemia en ayunas. Y habría un dato llamativo: sin beta-oxidación hepática suficiente no se acumula acetil-CoA, de modo que tampoco se producen cuerpos cetónicos. Es decir, hipoglucemia sin la cetosis que cabría esperar, una combinación que orienta hacia un problema de oxidación de ácidos grasos y no hacia otra causa. Los de cadena media seguirían aportando algo, ya que no necesitan la lanzadera. El razonamiento identifica el mecanismo; confirmar la enfermedad concreta requiere estudio dirigido.",
      },
      {
        escenario: "Una célula tiene mucho malonil-CoA en el citosol.",
        pregunta: "¿En qué estado metabólico está y qué le pasa a la beta-oxidación?",
        respuesta:
          "Está en estado de abundancia, después de comer y con insulina alta: el malonil-CoA es el primer intermediario de la síntesis de ácidos grasos, así que su presencia indica que la célula está fabricando grasa. La beta-oxidación queda bloqueada, porque el malonil-CoA inhibe la enzima que carga los ácidos grasos sobre la carnitina y sin ese transporte no pueden entrar a la mitocondria. El resultado es que las dos vías no coinciden nunca. Conviene notar que el bloqueo actúa sobre el transporte y no sobre las enzimas de la vía: la maquinaria de degradación está intacta, simplemente no le llega sustrato.",
      },
    ],
    errores: [
      {
        error: "Creer que la beta-oxidación produce ATP directamente.",
        correccion:
          "No produce ninguno de forma directa. Entrega FADH₂, NADH y acetil-CoA; el ATP aparece después, cuando los transportadores ceden sus electrones en la cadena respiratoria y el acetil-CoA se procesa en el ciclo de Krebs. Es la misma distinción que con el ciclo de Krebs: son vías que recogen electrones, no que fabriquen energía.",
      },
      {
        error: "Pensar que la grasa rinde más porque cada paso de su degradación es más eficiente.",
        correccion:
          "Cada vuelta rinde algo modesto. Rinde más en total por dos motivos: una cadena larga da muchas vueltas, y los carbonos de un ácido graso están mucho menos oxidados que los de un azúcar, así que queda más camino por recorrer hasta CO₂ y más electrones que extraer.",
      },
      {
        error: "Suponer que la grasa puede sustituir a la glucosa en cualquier tejido.",
        correccion:
          "El cerebro no usa ácidos grasos, porque no cruzan bien la barrera hematoencefálica y viajan unidos a albúmina. El eritrocito tampoco puede usarlos, porque no tiene mitocondrias. Por eso el organismo mantiene la glucemia aunque le sobre grasa, y por eso el hígado fabrica cuerpos cetónicos como forma transportable de esa energía.",
      },
      {
        error: "Olvidar el coste de activar el ácido graso.",
        correccion:
          "Unirlo a coenzima A antes de empezar consume el equivalente a dos ATP, y ese gasto hay que descontarlo del balance. No cambia la conclusión de que la grasa rinde mucho, pero un cálculo que lo ignore da una cifra sistemáticamente alta.",
      },
      {
        error: "Creer que la beta-oxidación es una alternativa útil cuando falta oxígeno.",
        correccion:
          "Es lo contrario: depende por completo del oxígeno. Necesita que la cadena respiratoria reoxide el NADH y el FADH₂ y que el ciclo de Krebs procese el acetil-CoA, y ambas cosas se paran sin oxígeno. La única vía que produce ATP sin oxígeno es la glucólisis, y por eso un tejido isquémico no puede recurrir a la grasa.",
      },
    ],
    tarjetas: [
      { front: "¿Cuántos carbonos se retiran en cada vuelta de la beta-oxidación?", back: "Dos, que salen como acetil-CoA." },
      { front: "¿Qué produce cada vuelta de la beta-oxidación?", back: "Un FADH₂, un NADH y un acetil-CoA." },
      { front: "¿Cuál es el orden de los cuatro pasos de cada vuelta?", back: "Oxidación, hidratación, oxidación y tiólisis." },
      { front: "¿Qué molécula transporta los ácidos grasos largos al interior de la mitocondria?", back: "La carnitina." },
      { front: "¿Cuál es el paso limitante de la beta-oxidación?", back: "La entrada a la mitocondria por la lanzadera de carnitina." },
      { front: "¿Qué molécula inhibe la lanzadera de carnitina?", back: "El malonil-CoA." },
      { front: "¿De qué vía es el malonil-CoA el primer intermediario?", back: "De la síntesis de ácidos grasos." },
      { front: "¿Qué ácidos grasos entran a la mitocondria sin necesitar carnitina?", back: "Los de cadena corta y media." },
      { front: "¿Cuánto cuesta activar un ácido graso antes de empezar?", back: "El equivalente a dos ATP." },
      { front: "¿Por qué la beta-oxidación no funciona sin oxígeno?", back: "Porque necesita la cadena respiratoria para reoxidar NADH y FADH₂." },
    ],
    faq: [
      {
        q: "¿Qué es la beta-oxidación?",
        a: "Es la vía que degrada los ácidos grasos en la matriz mitocondrial. Repite un ciclo de cuatro reacciones —oxidación, hidratación, oxidación y corte— que retira dos carbonos en cada vuelta y produce un FADH₂, un NADH y un acetil-CoA. Se llama así porque la oxidación clave ocurre sobre el carbono beta, el segundo contando desde el grupo carboxilo.",
      },
      {
        q: "¿Para qué sirve la carnitina en el metabolismo de las grasas?",
        a: "Sirve para transportar los ácidos grasos de cadena larga al interior de la mitocondria, ya que no atraviesan solos la membrana interna. El ácido graso intercambia su coenzima A por carnitina, entra como acilcarnitina y recupera la coenzima A dentro. Ese transporte es el paso limitante de la beta-oxidación y su principal punto de regulación.",
      },
      {
        q: "¿Por qué la grasa aporta más energía que los hidratos de carbono?",
        a: "Por dos motivos. Sus cadenas son largas, así que dan muchas vueltas de beta-oxidación y producen muchos acetil-CoA. Y sus carbonos están mucho menos oxidados que los de un azúcar, es decir, llevan menos oxígeno unido, de modo que queda más camino que recorrer hasta CO₂ y más electrones que extraer. Por eso el organismo almacena a largo plazo en forma de grasa y no de glucógeno.",
      },
      {
        q: "¿Se pueden quemar y fabricar grasas al mismo tiempo?",
        a: "No, y el mecanismo que lo impide es directo. El malonil-CoA, que es el primer intermediario de la síntesis de ácidos grasos, inhibe la enzima que introduce los ácidos grasos en la mitocondria para degradarlos. Mientras la célula fabrica grasa, la puerta de entrada a la degradación está cerrada, de modo que una sola molécula garantiza que las dos vías no coincidan.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 69: «Metabolismo de los lípidos»",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de metabolismo de los ácidos grasos",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de oxidación de ácidos grasos",
    ],
    relacionados: ["ciclo-de-krebs", "fosforilacion-oxidativa", "gluconeogenesis"],
  },
  {
    slug: "cetogenesis",
    titulo: "Cuerpos cetónicos: cómo se le hace llegar al cerebro la energía de la grasa",
    tituloSEO: "Cetogénesis: por qué el ayuno produce cuerpos cetónicos, papel del oxalacetato y diferencia con la cetoacidosis",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 20,
    resumen:
      "En el ayuno el hígado retira oxalacetato para fabricar glucosa, y sin él el acetil-CoA que llega de las grasas no puede entrar al ciclo de Krebs. Lo convierte entonces en cuerpos cetónicos: una forma de acetil-CoA que viaja por la sangre y cruza al cerebro. Es una adaptación normal, y conviene no confundirla con el cuadro patológico que se le parece.",
    porQueImporta:
      "Es el tema que integra de golpe la beta-oxidación, el ciclo de Krebs y la gluconeogénesis, y donde se ve que una vía puede pararse por falta de aceptor y no de combustible. Además, distinguir la cetosis fisiológica del ayuno de la cetoacidosis es una diferencia que importa: la primera es una adaptación y la segunda un fallo de control, y confundirlas hace ilegible buena parte de la fisiopatología del metabolismo.",
    secciones: [
      {
        titulo: "El cuello de botella es el oxalacetato",
        cuerpo: [
          "En el ayuno pasan dos cosas a la vez en el hígado. Por un lado le llegan ácidos grasos en abundancia, que degrada por beta-oxidación y convierte en **mucho acetil-CoA**. Por otro, tiene que sostener la glucemia, así que **retira oxalacetato** del ciclo de Krebs para alimentar la gluconeogénesis.",
          "El problema es que el acetil-CoA solo entra al ciclo condensándose con oxalacetato. Y el oxalacetato se está yendo a otra parte.",
          "El resultado es que **el ciclo se frena por falta de aceptor, no de combustible**. Sobra acetil-CoA y falta con quién condensarlo. Esta idea vale más que el propio tema: una vía puede detenerse porque se agota lo que recibe al sustrato, aunque el sustrato abunde.",
          "Y tampoco hay salida por el otro lado: el acetil-CoA no puede convertirse en glucosa, porque el paso de piruvato a acetil-CoA es irreversible. Queda acorralado. La frase clásica «las grasas arden en el fuego de los hidratos de carbono» describe justamente esto: sin el aporte de oxalacetato, que en último término procede de los hidratos, la grasa no termina de quemarse.",
        ],
      },
      {
        titulo: "La solución: hacerlo transportable",
        cuerpo: [
          "El hígado condensa el acetil-CoA sobrante y forma **acetoacetato** y **beta-hidroxibutirato**, que son los dos cuerpos cetónicos que importan. Hay un tercero, la **acetona**, que se produce en menor cantidad, no se aprovecha como combustible y se elimina por el aliento.",
          "Lo que resuelve esta conversión es un problema de logística. Los ácidos grasos viajan unidos a albúmina y no cruzan bien la barrera hematoencefálica; los cuerpos cetónicos son **hidrosolubles, viajan libres y sí cruzan**. Son, en la práctica, acetil-CoA en formato exportable.",
          "Sus destinatarios son el cerebro y el músculo. El cerebro es el que justifica el mecanismo: no puede usar ácidos grasos y consume glucosa de forma constante, así que en un ayuno prolongado pasa a cubrir una parte importante de sus necesidades con cuerpos cetónicos. Eso reduce el consumo de glucosa y, con él, la cantidad de proteína muscular que habría que degradar para fabricarla. **La cetogénesis ahorra músculo.**",
        ],
      },
      {
        titulo: "El hígado fabrica lo que no puede usar",
        cuerpo: [
          "Al hepatocito le falta la enzima que reactiva el acetoacetato para volver a convertirlo en acetil-CoA. Es decir: **produce cuerpos cetónicos y no puede consumirlos**.",
          "Visto de fuera parece un despilfarro, y es lo contrario. Si el hígado pudiera usarlos, se los quedaría, porque es el órgano donde se están fabricando y donde la concentración es más alta. Al no poder, **todo lo que produce sale hacia los tejidos que lo necesitan**.",
          "Es un ejemplo bonito de una idea general: a veces la función de un sistema se garantiza quitándole una capacidad, no añadiéndosela.",
        ],
      },
      {
        titulo: "Cetosis fisiológica y cetoacidosis no son lo mismo",
        cuerpo: [
          "En el ayuno la producción de cuerpos cetónicos **está regulada**. La insulina, aunque baja, no es nula, y su presencia limita la lipólisis y por tanto el flujo de ácidos grasos al hígado. El sistema se autolimita: sube el nivel de cuerpos cetónicos, pero dentro de un rango que los amortiguadores del plasma toleran.",
          "El cuadro patológico aparece cuando ese freno desaparece. Sin insulina que limite la lipólisis, el flujo de ácidos grasos al hígado no tiene techo, la producción de cuerpos cetónicos se dispara, y como son ácidos, superan la capacidad amortiguadora y el pH baja. Eso es una **acidosis metabólica** y se estudia junto al equilibrio ácido-base.",
          "La diferencia, dicha con precisión, no es de tipo de molécula sino **de magnitud y de control**: la misma vía, con freno o sin él. Conviene también evitar el atajo de tratar todo aumento de cuerpos cetónicos como patológico, porque el ayuno normal produce cetosis y no es una enfermedad.",
          "El manejo clínico de la cetoacidosis se rige por guías vigentes y no se aborda aquí: Corpus explica el mecanismo.",
        ],
      },
    ],
    analogia: {
      campo: "Un almacén sin muelles de carga",
      texto:
        "El hígado tiene mercancía de sobra —acetil-CoA— pero se ha quedado sin palés, que son el oxalacetato. No puede sacar el producto por la vía habitual, así que lo reempaqueta en cajas pequeñas que sí caben por la puerta y las manda a otros almacenes.",
      dondeSeRompe:
        "Un almacén podría fabricar más palés, y el hígado en ayuno no puede: necesita ese oxalacetato para fabricar glucosa, que es una obligación que no puede saltarse. Y la analogía sugiere que el reempaquetado es una solución de emergencia, cuando en realidad los cuerpos cetónicos son un combustible perfectamente normal para el cerebro, no un producto de segunda.",
    },
    figura: "cetogenesis",
    recall: [
      {
        pregunta: "Explica por qué el ayuno produce cuerpos cetónicos, partiendo del oxalacetato.",
        referencia:
          "En el ayuno el hígado recibe muchos ácidos grasos movilizados desde el tejido adiposo y los degrada por beta-oxidación, con lo que genera abundante acetil-CoA. Al mismo tiempo tiene que mantener la glucemia, así que retira oxalacetato del ciclo de Krebs para alimentar la gluconeogénesis. El acetil-CoA solo puede entrar al ciclo condensándose con oxalacetato, de modo que al escasear el aceptor el ciclo se frena y el acetil-CoA se acumula, por muy abundante que sea. Tampoco puede convertirse en glucosa, porque el paso de piruvato a acetil-CoA es irreversible. Acorralado, el hígado lo condensa para formar acetoacetato y beta-hidroxibutirato, que son hidrosolubles, viajan libres por el plasma y atraviesan la barrera hematoencefálica. Funcionan así como una forma transportable de acetil-CoA que permite llevar al cerebro la energía de la grasa, ya que los ácidos grasos no llegan hasta allí.",
        pistas: [
          "¿Para qué necesita el hígado el oxalacetato en el ayuno?",
          "¿Qué hace falta para que el acetil-CoA entre al ciclo de Krebs?",
          "¿Por qué no puede convertirse en glucosa?",
        ],
      },
      {
        pregunta: "¿Qué separa la cetosis fisiológica del ayuno de la cetoacidosis? Responde en términos de mecanismo.",
        referencia:
          "La misma vía funcionando con freno o sin él. En el ayuno normal la insulina está baja pero no ausente, y esa insulina residual limita la lipólisis del tejido adiposo y por tanto el flujo de ácidos grasos que llega al hígado. La producción de cuerpos cetónicos sube pero se autolimita, y su concentración se mantiene dentro de lo que los sistemas amortiguadores del plasma toleran, sin que el pH se altere de forma significativa. En el cuadro patológico ese freno desaparece: sin insulina que contenga la lipólisis, la llegada de ácidos grasos al hígado no tiene techo y la producción se dispara. Como los cuerpos cetónicos son ácidos, al superar la capacidad amortiguadora consumen bicarbonato y el pH baja, apareciendo una acidosis metabólica. La diferencia no está en la molécula ni en la ruta, sino en la magnitud y en la presencia o ausencia de regulación.",
        pistas: [
          "¿Qué hormona limita la lipólisis, y en qué se diferencian las dos situaciones respecto a ella?",
          "¿Los cuerpos cetónicos son neutros o ácidos?",
          "¿Qué le pasa a los amortiguadores del plasma cuando la producción no tiene techo?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Una persona en ayuno recibe una pequeña cantidad de hidratos de carbono.",
        pregunta: "¿Qué le ocurre a la producción de cuerpos cetónicos y por qué?",
        respuesta:
          "Cae con rapidez, y por dos caminos que actúan a la vez. El primero es hormonal: los hidratos elevan la insulina, que frena la lipólisis, con lo que llegan menos ácidos grasos al hígado y se genera menos acetil-CoA. El segundo es el que explica de verdad el tema: al haber glucosa disponible el hígado deja de necesitar tanto oxalacetato para la gluconeogénesis, ese oxalacetato vuelve a estar disponible en el ciclo de Krebs y el acetil-CoA vuelve a tener con quién condensarse. En cuanto el ciclo puede procesarlo, deja de sobrar y no hay nada que desviar a cuerpos cetónicos. Es la demostración práctica de que el cuello de botella era el aceptor.",
      },
      {
        escenario: "Un fármaco hipotético permitiera al hepatocito consumir sus propios cuerpos cetónicos.",
        pregunta: "¿A quién perjudicaría eso y por qué?",
        respuesta:
          "Al cerebro, sobre todo. El hígado es el sitio donde los cuerpos cetónicos se fabrican y donde su concentración es más alta, así que si pudiera usarlos se quedaría con una parte importante antes de que salieran a la circulación. La razón de que el hepatocito carezca de la enzima que reactiva el acetoacetato no es un descuido evolutivo: garantiza que todo lo producido se exporte a los tejidos que no pueden fabricarlo. El cerebro, que no puede usar ácidos grasos, depende por completo de que ese envío llegue. El caso ilustra que a veces la función de un sistema se asegura quitándole una capacidad y no añadiéndosela.",
      },
    ],
    errores: [
      {
        error: "Creer que la cetosis es siempre patológica.",
        correccion:
          "El ayuno normal produce cuerpos cetónicos y eso es una adaptación, no una enfermedad. Permite que el cerebro use la energía de la grasa y reduce la cantidad de proteína muscular que habría que degradar para fabricar glucosa. Lo patológico es la producción sin freno, que es otra cosa en magnitud y en control.",
      },
      {
        error: "Decir que el ciclo de Krebs se frena en el ayuno por falta de acetil-CoA.",
        correccion:
          "Es justo al revés: sobra acetil-CoA. Lo que falta es oxalacetato, que el hígado está desviando a fabricar glucosa, y sin él el acetil-CoA no puede entrar al ciclo. La vía se detiene por falta de aceptor, no de sustrato, y esa distinción es el núcleo del tema.",
      },
      {
        error: "Contar la acetona entre los cuerpos cetónicos útiles.",
        correccion:
          "Se produce en cantidad mucho menor, no se aprovecha como combustible y se elimina por vía respiratoria. Los que funcionan como fuente de energía son el acetoacetato y el beta-hidroxibutirato. Meter los tres en el mismo saco hace pensar que la acetona tiene un papel metabólico que no tiene.",
      },
      {
        error: "Suponer que si el cuerpo fabrica cuerpos cetónicos es porque le falta energía.",
        correccion:
          "Le sobra energía en forma de grasa: lo que le falta es glucosa, y una forma de llevar esa energía al cerebro. Los cuerpos cetónicos no son un recurso de desesperación sino un sistema de transporte, y por eso aparecen justo cuando hay mucha grasa disponible y poca glucosa.",
      },
      {
        error: "Pensar que el hígado consume los cuerpos cetónicos que fabrica.",
        correccion:
          "No puede, porque carece de la enzima que reactiva el acetoacetato. Y eso es funcional: si pudiera usarlos se quedaría con ellos, ya que es donde más concentrados están. Al no poder, todo lo que produce se exporta a los tejidos que lo necesitan.",
      },
    ],
    tarjetas: [
      { front: "¿Cuáles son los dos cuerpos cetónicos que sirven de combustible?", back: "El acetoacetato y el beta-hidroxibutirato." },
      { front: "¿Qué cuerpo cetónico no se aprovecha y se elimina por el aliento?", back: "La acetona." },
      { front: "¿Qué molécula escasea en el hígado durante el ayuno y frena el ciclo de Krebs?", back: "El oxalacetato." },
      { front: "¿Por qué se desvía el oxalacetato en el ayuno?", back: "Porque el hígado lo usa para la gluconeogénesis." },
      { front: "¿Por qué los cuerpos cetónicos llegan al cerebro y los ácidos grasos no?", back: "Porque son hidrosolubles, viajan libres y cruzan la barrera hematoencefálica." },
      { front: "¿Por qué el hígado no puede usar los cuerpos cetónicos que fabrica?", back: "Porque carece de la enzima que reactiva el acetoacetato." },
      { front: "¿Qué ventaja aporta que el cerebro use cuerpos cetónicos en el ayuno prolongado?", back: "Reduce el consumo de glucosa y con ello la degradación de proteína muscular." },
      { front: "¿Qué hormona limita la lipólisis y mantiene la cetosis del ayuno dentro de un rango?", back: "La insulina, aunque esté baja." },
      { front: "¿Por qué la producción descontrolada de cuerpos cetónicos baja el pH?", back: "Porque son ácidos y superan la capacidad amortiguadora del plasma." },
      { front: "¿Qué significa que «las grasas arden en el fuego de los hidratos de carbono»?", back: "Que sin oxalacetato, que procede en último término de los hidratos, el acetil-CoA de las grasas no puede oxidarse por completo." },
    ],
    faq: [
      {
        q: "¿Qué son los cuerpos cetónicos y para qué sirven?",
        a: "Son el acetoacetato y el beta-hidroxibutirato, que el hígado fabrica a partir del acetil-CoA sobrante cuando escasea la glucosa. Sirven de combustible alternativo para el cerebro y el músculo. Su ventaja es que, a diferencia de los ácidos grasos, son hidrosolubles, viajan libres por el plasma y atraviesan la barrera hematoencefálica, de modo que llevan al cerebro la energía de la grasa.",
      },
      {
        q: "¿Por qué se producen cuerpos cetónicos durante el ayuno?",
        a: "Porque el hígado retira oxalacetato del ciclo de Krebs para fabricar glucosa, y sin oxalacetato el acetil-CoA que llega de degradar las grasas no puede entrar al ciclo. Ese acetil-CoA tampoco puede convertirse en glucosa, ya que el paso desde piruvato es irreversible. Al acumularse, el hígado lo transforma en cuerpos cetónicos, que sí puede exportar.",
      },
      {
        q: "¿La cetosis es lo mismo que la cetoacidosis?",
        a: "No. La cetosis del ayuno es una adaptación regulada: la insulina, aunque baja, limita la lipólisis, así que la producción se mantiene dentro de un rango que los amortiguadores del plasma toleran. La cetoacidosis aparece cuando ese freno desaparece y la producción se dispara; como los cuerpos cetónicos son ácidos, el pH baja y se produce una acidosis metabólica. La diferencia está en la magnitud y en el control, no en la vía.",
      },
      {
        q: "¿Por qué el cerebro no puede usar grasa directamente?",
        a: "Porque los ácidos grasos circulan unidos a albúmina y no atraviesan bien la barrera hematoencefálica. Por eso el cerebro depende de glucosa en condiciones normales, y por eso el organismo necesita convertir la energía de la grasa en una forma que sí pueda llegar hasta él. Esa forma son los cuerpos cetónicos.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 69 (Metabolismo de los lípidos) y cap. 72 (obesidad y ayuno)",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de cuerpos cetónicos",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de oxidación de ácidos grasos y cuerpos cetónicos",
    ],
    relacionados: ["beta-oxidacion", "gluconeogenesis", "ciclo-de-krebs"],
  },

  {
    slug: "ciclo-de-la-urea",
    titulo: "Ciclo de la urea: convertir un veneno en algo que el riñón pueda tirar",
    tituloSEO: "Ciclo de la urea: pasos, compartimentación mitocondria-citosol, regulación y por qué el amonio es neurotóxico",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "mecanismo",
    minutos: 20,
    resumen:
      "Degradar aminoácidos deja amonio libre, que es tóxico para el sistema nervioso y no se puede almacenar. El hígado lo fija en urea, atóxica e hidrosoluble, mediante un ciclo repartido entre la mitocondria y el citosol. Es la única salida importante que tiene el organismo para el nitrógeno.",
    porQueImporta:
      "Es lo que conecta el metabolismo de las proteínas con la neurología y con la insuficiencia hepática. Explica por qué un hígado que falla produce afectación del sistema nervioso, por qué existen enfermedades hereditarias que se manifiestan en los primeros días de vida, y por qué el nitrógeno no tiene una reserva como sí la tienen la glucosa y la grasa: lo que sobra hay que eliminarlo, no guardarlo.",
    secciones: [
      {
        titulo: "El problema: el nitrógeno no se puede almacenar",
        cuerpo: [
          "El organismo guarda el exceso de glucosa como glucógeno y el de energía como grasa. Con el nitrógeno no hay equivalente: **no existe una reserva de aminoácidos**. Lo que no se usa, se degrada.",
          "Al degradar un aminoácido se separan dos partes. El **esqueleto de carbono** entra al metabolismo energético y puede acabar en glucosa o en acetil-CoA. El **grupo amino** queda suelto, y ahí empieza el problema.",
          "El amonio libre es **neurotóxico**. Atraviesa la barrera hematoencefálica y altera el funcionamiento del sistema nervioso. Así que el organismo no puede permitirse acumularlo ni siquiera un poco, y necesita convertirlo continuamente en algo inofensivo.",
          "Esa conversión es la urea: **atóxica, muy hidrosoluble y fácil de excretar por el riñón**. Y solo el hígado tiene el ciclo completo, lo que convierte a este órgano en el único lugar donde el nitrógeno del cuerpo puede salir de circulación.",
        ],
      },
      {
        titulo: "Los dos nitrógenos vienen de sitios distintos",
        cuerpo: [
          "La molécula de urea lleva dos átomos de nitrógeno, y este es el detalle que más se olvida: **no proceden del mismo sitio**.",
          "El primero entra como **amonio libre** en la matriz mitocondrial, y en buena parte llega hasta allí transportado por la glutamina desde otros tejidos. El segundo lo aporta el **aspartato** ya en el citosol.",
          "Que uno venga del aspartato es lo que enlaza este ciclo con la transaminación. Los grupos amino de muchos aminoácidos se transfieren primero al glutamato y de ahí al aspartato, que actúa como mensajero. Sin transaminación no habría aspartato cargado y el ciclo se quedaría a medias.",
        ],
      },
      {
        titulo: "Un ciclo partido en dos compartimentos",
        cuerpo: [
          "Los dos primeros pasos ocurren en la **matriz mitocondrial** y los tres restantes en el **citosol**. Por eso la **citrulina** tiene que salir de la mitocondria y la **ornitina** volver a entrar.",
          "Es de los pocos ciclos metabólicos repartidos entre dos compartimentos, y esa partición aparece constantemente en las preguntas porque es una característica poco común.",
          "El primer paso lo cataliza la **carbamoil fosfato sintetasa I**, que fija el amonio con CO₂ gastando dos ATP. Es el **paso limitante** y su regulación es peculiar: solo funciona en presencia de **N-acetilglutamato**, una molécula que se produce cuando abundan los aminoácidos. Es decir, el ciclo se activa por la señal de que hay mucho nitrógeno que eliminar, no por el nitrógeno directamente.",
          "Al final, la **arginasa** corta la arginina y libera urea y ornitina. La ornitina vuelve a la mitocondria y el ciclo puede empezar otra vez. Igual que el oxalacetato en el ciclo de Krebs, **la ornitina es el transportador que se recupera**, no un sustrato que se consume.",
        ],
      },
      {
        titulo: "Cuando falla",
        cuerpo: [
          "Si el ciclo no funciona, el amonio se acumula y aparece afectación neurológica. Las causas se agrupan en dos familias.",
          "Las **hereditarias**: el déficit de una de las enzimas del ciclo. Como el ciclo es imprescindible desde el nacimiento, suelen manifestarse en los primeros días de vida, cuando el recién nacido empieza a degradar proteínas. El déficit de carbamoil fosfato sintetasa I es una de ellas.",
          "Las **adquiridas**: sobre todo la insuficiencia hepática. Un hígado dañado no consigue procesar el nitrógeno que le llega, el amonio sube y afecta al sistema nervioso. Ese es el vínculo mecanicista entre enfermedad hepática y alteración neurológica, y explica por qué en ese contexto una carga elevada de proteínas puede empeorar la situación.",
          "Aquí conviene una precisión honesta: **la afectación neurológica de la insuficiencia hepática no se explica solo por el amonio**. Se conoce su papel central y está bien documentado, pero se considera un cuadro con varios factores implicados, y no es exacto presentarlo como si el amonio fuera la única causa. El manejo se rige por guías vigentes que hay que consultar en su fuente.",
        ],
      },
    ],
    analogia: {
      campo: "Una planta de tratamiento de residuos",
      texto:
        "El nitrógeno sobrante es un residuo peligroso que no se puede almacenar ni verter tal cual. El hígado lo recoge, lo estabiliza en una forma inerte y soluble, y el riñón se encarga de sacarlo del sistema.",
      dondeSeRompe:
        "Una planta de residuos puede acumular material hasta procesarlo, y aquí no hay margen: el amonio es tóxico desde el primer momento y el organismo carece de depósito donde esperar. Además la analogía sugiere que la urea es basura, cuando en el riñón cumple un papel adicional importante, ya que contribuye al gradiente osmótico de la médula renal que permite concentrar la orina.",
    },
    figura: "ciclo-de-la-urea",
    recall: [
      {
        pregunta: "Explica por qué existe el ciclo de la urea, partiendo de una diferencia entre el nitrógeno y los otros nutrientes.",
        referencia:
          "Porque el nitrógeno es el único de los tres grandes nutrientes que no tiene forma de reserva. El exceso de glucosa se guarda como glucógeno y el exceso de energía como grasa, pero no existe un almacén de aminoácidos: lo que no se usa se degrada. Al degradar un aminoácido, el esqueleto de carbono entra al metabolismo energético y el grupo amino queda libre como amonio. Ese amonio es neurotóxico, atraviesa la barrera hematoencefálica y no puede acumularse ni siquiera en pequeña cantidad, así que el organismo necesita eliminarlo de forma continua. El ciclo de la urea lo fija en una molécula atóxica, muy hidrosoluble y fácil de excretar por el riñón. Solo el hígado tiene el ciclo completo, lo que lo convierte en el único punto por el que el nitrógeno del organismo puede salir de circulación, y explica por qué su fallo produce acumulación de amonio y afectación neurológica.",
        pistas: [
          "¿Dónde se guarda el exceso de glucosa? ¿Y el de nitrógeno?",
          "Al degradar un aminoácido quedan dos partes: ¿cuáles y qué destino tiene cada una?",
          "¿Qué propiedades hacen de la urea una buena forma de excreción?",
        ],
      },
      {
        pregunta: "Describe la compartimentación del ciclo y de dónde procede cada uno de los dos nitrógenos de la urea.",
        referencia:
          "El ciclo está repartido entre dos compartimentos: los dos primeros pasos ocurren en la matriz mitocondrial y los tres restantes en el citosol. Por eso la citrulina, formada dentro de la mitocondria, tiene que salir al citosol, y la ornitina, regenerada al final, tiene que volver a entrar. Es de los pocos ciclos metabólicos partidos entre dos compartimentos. En cuanto a los nitrógenos, no proceden del mismo sitio: el primero entra como amonio libre en la mitocondria, transportado en buena parte por glutamina desde otros tejidos, y se fija con CO₂ para formar carbamoil fosfato. El segundo lo aporta el aspartato, ya en el citosol, lo que enlaza el ciclo con la transaminación, porque el aspartato recibe su grupo amino de otros aminoácidos a través del glutamato. La ornitina, por su parte, no aporta nitrógeno a la urea: es el transportador que se recupera en cada vuelta, igual que el oxalacetato en el ciclo de Krebs.",
        pistas: [
          "¿Qué dos moléculas tienen que cruzar la membrana mitocondrial y en qué sentido?",
          "Uno de los nitrógenos entra como amonio libre; el otro llega en una molécula concreta: ¿cuál?",
          "¿Qué papel juega la ornitina, si no aporta nitrógeno?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Un recién nacido presenta amonio elevado y afectación neurológica a los pocos días de vida, con un hígado estructuralmente normal.",
        pregunta: "¿Hacia qué tipo de problema orienta el razonamiento y por qué aparece justo entonces?",
        respuesta:
          "Hacia un déficit hereditario de alguna enzima del ciclo de la urea, y no hacia un daño hepático, porque el hígado está estructuralmente sano: lo que falla es una función concreta, no el órgano. Aparece en los primeros días porque durante la vida fetal la placenta se encarga de retirar el amonio a la circulación materna, de modo que el defecto queda enmascarado. Al nacer, esa vía desaparece y el recién nacido empieza a degradar proteínas por su cuenta, así que el amonio se acumula en cuanto la carga de nitrógeno aumenta. El razonamiento acota el mecanismo y el momento; identificar qué enzima concreta falla exige estudio dirigido y confirmación bioquímica.",
      },
      {
        escenario: "Se bloquea la síntesis de N-acetilglutamato sin tocar ninguna enzima del ciclo.",
        pregunta: "¿Sigue funcionando el ciclo de la urea?",
        respuesta:
          "Prácticamente no. El N-acetilglutamato no es un sustrato ni un intermediario del ciclo: es el activador obligatorio de la carbamoil fosfato sintetasa I, que cataliza el primer paso. Sin él esa enzima no trabaja, así que el amonio no llega a fijarse y todo el ciclo queda parado desde el principio, aunque las cinco enzimas estén intactas. El caso ilustra que un punto de regulación puede ser tan limitante como una enzima ausente, y también por qué el ciclo se activa por la señal de que abundan los aminoácidos —que es cuando se produce el N-acetilglutamato— y no por la presencia del amonio en sí.",
      },
    ],
    errores: [
      {
        error: "Creer que los dos nitrógenos de la urea vienen del mismo aminoácido.",
        correccion:
          "Uno entra como amonio libre en la mitocondria y el otro lo aporta el aspartato en el citosol. Esa doble procedencia es lo que conecta el ciclo con la transaminación, y perderla de vista impide entender cómo llegan hasta aquí los grupos amino de aminoácidos degradados en otros tejidos.",
      },
      {
        error: "Situar todo el ciclo en el citosol o todo en la mitocondria.",
        correccion:
          "Los dos primeros pasos son mitocondriales y los tres siguientes citosólicos, por lo que la citrulina sale y la ornitina entra. Es una de las pocas rutas partidas entre compartimentos, y esa partición explica la necesidad de transportadores específicos en la membrana.",
      },
      {
        error: "Pensar que la ornitina aporta nitrógeno a la urea.",
        correccion:
          "No lo aporta: es el transportador que se regenera en cada vuelta, igual que el oxalacetato en el ciclo de Krebs. Confundir el papel del transportador con el del sustrato hace que el balance de nitrógenos no cuadre nunca.",
      },
      {
        error: "Suponer que el organismo puede almacenar el exceso de aminoácidos como hace con la glucosa.",
        correccion:
          "No existe reserva de nitrógeno. El exceso se degrada, y su grupo amino hay que eliminarlo de forma continua porque el amonio es tóxico desde el primer momento. Esa ausencia de depósito es justamente la razón de que exista este ciclo.",
      },
      {
        error: "Explicar la afectación neurológica de la insuficiencia hepática solo por el amonio.",
        correccion:
          "El papel del amonio es central y está bien documentado, pero se considera un cuadro en el que intervienen varios factores. Presentarlo como causa única es escribir con más certeza de la que tiene el asunto, y además lleva a esperar que la clínica se correlacione con las cifras de amonio de forma más estrecha de lo que ocurre en la práctica.",
      },
    ],
    tarjetas: [
      { front: "¿Por qué hay que eliminar el nitrógeno en lugar de almacenarlo?", back: "Porque no existe reserva de aminoácidos y el amonio libre es neurotóxico." },
      { front: "¿En qué órgano está completo el ciclo de la urea?", back: "En el hígado." },
      { front: "¿De dónde procede cada uno de los dos nitrógenos de la urea?", back: "Uno del amonio libre en la mitocondria; el otro del aspartato en el citosol." },
      { front: "¿Qué enzima cataliza el paso limitante del ciclo de la urea?", back: "La carbamoil fosfato sintetasa I." },
      { front: "¿Qué molécula activa obligatoriamente a la carbamoil fosfato sintetasa I?", back: "El N-acetilglutamato." },
      { front: "¿Qué dos moléculas cruzan la membrana mitocondrial en el ciclo de la urea?", back: "La citrulina sale y la ornitina entra." },
      { front: "¿Qué enzima libera la urea y qué otra molécula genera?", back: "La arginasa, que libera urea y ornitina." },
      { front: "¿Qué papel cumple la ornitina en el ciclo?", back: "Es el transportador que se regenera en cada vuelta; no aporta nitrógeno." },
      { front: "¿Por qué un déficit hereditario del ciclo se manifiesta al nacer y no antes?", back: "Porque durante la vida fetal la placenta retira el amonio a la circulación materna." },
      { front: "¿Qué propiedades hacen de la urea una buena forma de excretar nitrógeno?", back: "Es atóxica y muy hidrosoluble, así que el riñón la elimina con facilidad." },
    ],
    faq: [
      {
        q: "¿Para qué sirve el ciclo de la urea?",
        a: "Para convertir el amonio, que es tóxico para el sistema nervioso, en urea, que es atóxica e hidrosoluble y el riñón puede excretar. Es necesario porque el organismo no tiene forma de almacenar el nitrógeno sobrante: los aminoácidos que no se usan se degradan y su grupo amino queda libre. Solo el hígado dispone del ciclo completo.",
      },
      {
        q: "¿Dónde ocurre el ciclo de la urea?",
        a: "Está repartido entre dos compartimentos del hepatocito. Los dos primeros pasos ocurren en la matriz mitocondrial y los tres restantes en el citosol, de modo que la citrulina tiene que salir de la mitocondria y la ornitina volver a entrar. Es una de las pocas rutas metabólicas partidas entre compartimentos.",
      },
      {
        q: "¿Por qué el amonio es tóxico?",
        a: "Porque atraviesa la barrera hematoencefálica y altera el funcionamiento del sistema nervioso. El organismo no dispone de ningún depósito donde acumularlo mientras espera, así que necesita convertirlo en urea de forma continua. Cuando el ciclo falla, por un déficit hereditario o por insuficiencia hepática, el amonio se eleva y aparece afectación neurológica.",
      },
      {
        q: "¿Qué relación tiene el ciclo de la urea con la insuficiencia hepática?",
        a: "Un hígado dañado no procesa todo el nitrógeno que le llega, de modo que el amonio se acumula y contribuye a la alteración neurológica que acompaña a la insuficiencia hepática. Conviene precisar que ese cuadro no se explica solo por el amonio: su papel es central y está bien documentado, pero se considera que intervienen varios factores.",
      },
    ],
    fuentes: [
      "Guyton y Hall, Tratado de fisiología médica, 13.ª ed., cap. 70 (Metabolismo de las proteínas) y cap. 71 (El hígado como órgano)",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de eliminación del nitrógeno de los aminoácidos",
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de oxidación de aminoácidos y producción de urea",
    ],
    relacionados: ["reacciones-del-metabolismo", "gluconeogenesis", "ph-pka-ionizacion"],
  },

  {
    slug: "enzimas-cinetica",
    titulo: "Enzimas: qué significan de verdad Km y Vmáx",
    tituloSEO: "Cinética enzimática: Michaelis-Menten, Km y Vmáx, tipos de inhibición y regulación alostérica",
    bloque: "molecular",
    unidad: "I8577 · Bioquímica médica",
    nivel: "fundamento",
    minutos: 22,
    resumen:
      "Una enzima no cambia hacia dónde va una reacción: cambia lo rápido que llega. De esa idea salen las dos constantes que la describen, y saber cuál mueve cada tipo de inhibidor convierte una tabla que se memoriza en algo que se deduce.",
    porQueImporta:
      "Es la base de la farmacología: la mayoría de los fármacos son inhibidores enzimáticos, y entender por qué unos se vencen subiendo el sustrato y otros no explica su comportamiento. También ordena la bioquímica entera, porque cada vía tiene una enzima que fija su velocidad, y aparece en el laboratorio cada vez que se mide una enzima en sangre.",
    secciones: [
      {
        titulo: "Lo que una enzima hace y lo que no puede hacer",
        cuerpo: [
          "Una enzima acelera una reacción **bajando su energía de activación**: estabiliza el estado de transición, ese punto intermedio inestable por el que hay que pasar. No aporta energía a la reacción.",
          "De ahí salen dos límites que conviene tener claros desde el principio. Primero: **una enzima no cambia el equilibrio**, solo la velocidad a la que se alcanza. Acelera igual la ida que la vuelta. Si una reacción es desfavorable, seguirá siéndolo con enzima; lo que cambia es que llegará antes a donde iba a llegar de todos modos.",
          "Segundo: **la enzima no se consume**. Sale intacta de cada ciclo y vuelve a empezar, y por eso hace falta tan poca cantidad para procesar mucho sustrato.",
          "Lo que sí aporta la enzima, además de velocidad, es **especificidad**. El sitio activo solo admite determinadas moléculas, y esa selectividad es lo que permite que en el mismo citoplasma ocurran cientos de reacciones distintas sin estorbarse.",
        ],
      },
      {
        titulo: "La curva y las dos constantes",
        cuerpo: [
          "Si se mide la velocidad de una enzima a concentraciones crecientes de sustrato, la curva sube deprisa al principio y luego se aplana. Al principio hay enzima libre de sobra y añadir sustrato acelera; al final toda la enzima está ocupada y añadir más no sirve de nada. Eso es la **saturación**, y es lo que distingue una reacción enzimática de una química corriente.",
          "La velocidad a la que la curva se aplana es la **Vmáx**. Depende de cuánta enzima haya y de lo rápido que trabaje cada molécula. Nunca se alcanza del todo: es una asíntota.",
          "La **Km** es la concentración de sustrato a la que la enzima trabaja a la mitad de su Vmáx. Se usa como medida inversa de afinidad, y aquí está el punto que más se invierte al estudiarlo: **una Km baja significa afinidad alta**, porque basta poco sustrato para llegar a media velocidad.",
          "El ejemplo que fija esta idea ya apareció en glucólisis. La hexocinasa tiene Km baja y trabaja incluso con glucemias bajas; la glucocinasa hepática tiene Km alta y solo se activa cuando la glucosa abunda. La misma reacción, dos afinidades, dos papeles fisiológicos opuestos.",
        ],
      },
      {
        titulo: "Los inhibidores, deducidos en lugar de memorizados",
        cuerpo: [
          "Un **inhibidor competitivo** se parece al sustrato y ocupa el mismo sitio activo. Como compiten, hace falta más sustrato para llegar a media velocidad: **la Km aparente sube**. Pero con sustrato suficiente el inhibidor queda desplazado, así que **la Vmáx no cambia**. La consecuencia práctica es que este tipo de inhibición **se puede vencer subiendo el sustrato**.",
          "Un **inhibidor no competitivo** se une en otro sitio y estropea la enzima, esté o no ocupada. Añadir sustrato no ayuda, porque no compiten por el mismo lugar. El efecto es como tener menos enzima: **baja la Vmáx** y la afinidad de la que sigue funcionando no cambia, así que **la Km se mantiene**.",
          "No hace falta memorizar la tabla si se retiene la pregunta que la genera: **¿compiten por el mismo sitio?** Si sí, el efecto se puede diluir con sustrato y por eso solo se mueve la Km. Si no, no hay forma de desplazarlo y lo que cae es el techo.",
          "Existe un tercer tipo, la inhibición **acompetitiva**, que se une solo al complejo enzima-sustrato y baja ambos parámetros a la vez. Se menciona para que la tabla no parezca completa cuando no lo es.",
        ],
      },
      {
        titulo: "Regulación: más allá de la curva",
        cuerpo: [
          "Las enzimas que controlan una vía no siguen la curva sencilla que se acaba de describir. Suelen ser **alostéricas**: tienen sitios de unión aparte del activo, donde moléculas reguladoras las activan o las inhiben, y su curva es sigmoidea en vez de hiperbólica.",
          "Esa forma en S importa, porque significa que la enzima es **muy sensible a cambios pequeños** de concentración dentro de un rango estrecho. Funciona más como un interruptor que como un regulador gradual, y por eso las enzimas reguladoras de las vías son casi siempre de este tipo. La fosfofructocinasa-1 es el ejemplo canónico.",
          "El caso particular más frecuente es la **inhibición por producto final**: el producto de una vía inhibe su primera enzima. Es retroalimentación negativa aplicada a la bioquímica, y evita fabricar de más.",
          "Además hay otras dos formas de regular que no cambian la cantidad de enzima: la **modificación covalente**, casi siempre añadir o quitar un fosfato, que enciende o apaga la enzima en segundos; y la **activación de precursores inactivos**, que es como se manejan enzimas peligrosas como las digestivas o las de la coagulación, fabricándolas en forma inerte y activándolas solo donde deben actuar.",
        ],
      },
    ],
    analogia: {
      campo: "Un túnel a través de una montaña",
      texto:
        "La enzima no cambia la altura de los dos valles, así que no decide hacia dónde acabará fluyendo el agua: abre un túnel que hace el paso mucho más corto. Y el túnel sirve igual en los dos sentidos.",
      dondeSeRompe:
        "Un túnel está siempre abierto y una enzima no: puede regularse, inhibirse, fosforilarse o fabricarse inactiva. Además la imagen sugiere un paso pasivo, cuando la enzima participa activamente uniéndose al sustrato y estabilizando el estado de transición. Y no recoge la especificidad, que es la mitad de la razón por la que existen las enzimas: un túnel deja pasar a cualquiera.",
    },
    figura: "cinetica-enzimatica",
    recall: [
      {
        pregunta: "Explica qué significan Km y Vmáx, y por qué una Km baja indica afinidad alta.",
        referencia:
          "La Vmáx es la velocidad máxima que alcanza la enzima cuando está saturada de sustrato: depende de cuánta enzima haya y de lo rápido que trabaje cada molécula, y nunca se alcanza del todo porque es una asíntota. La Km es la concentración de sustrato a la que la enzima trabaja exactamente a la mitad de su Vmáx. Se usa como medida inversa de afinidad porque describe cuánto sustrato hace falta para que la enzima funcione a medio gas: si una enzima llega a media velocidad con muy poco sustrato, es que se une con facilidad, y eso es afinidad alta con Km baja. Al revés, una enzima que necesita mucha concentración para llegar a la mitad tiene poca afinidad y Km alta. El ejemplo que lo fija es el par hexocinasa y glucocinasa: la primera tiene Km baja y trabaja incluso con glucemias bajas, mientras que la hepática tiene Km alta y solo actúa cuando la glucosa abunda, lo que les da papeles fisiológicos opuestos.",
        pistas: [
          "¿Qué mide exactamente la Km: velocidad o concentración?",
          "Si una enzima llega a media velocidad con muy poco sustrato, ¿se une bien o mal?",
          "Piensa en la pareja de enzimas que fosforilan glucosa.",
        ],
      },
      {
        pregunta: "¿Cómo distinguirías una inhibición competitiva de una no competitiva sin memorizar la tabla?",
        referencia:
          "Preguntando si el inhibidor y el sustrato compiten por el mismo sitio. Si el inhibidor es parecido al sustrato y ocupa el sitio activo, entonces compiten: hará falta más sustrato para alcanzar la media velocidad, así que la Km aparente sube, pero con sustrato suficiente el inhibidor queda desplazado y la Vmáx se alcanza igual. De ahí la propiedad práctica más útil: la inhibición competitiva se puede vencer subiendo la concentración de sustrato. Si el inhibidor se une en otro sitio y estropea la enzima esté ocupada o no, no compiten por nada: añadir sustrato no lo desplaza, el efecto equivale a tener menos enzima funcionando, baja la Vmáx y la afinidad de la que queda activa no cambia, de modo que la Km se mantiene. Con esa única pregunta se reconstruye la tabla entera, y conviene añadir que existe un tercer tipo, el acompetitivo, que se une solo al complejo enzima-sustrato y desplaza los dos parámetros a la vez.",
        pistas: [
          "Todo depende de una sola pregunta sobre el sitio de unión.",
          "Si compiten, ¿qué pasa cuando hay muchísimo sustrato?",
          "Si no compiten, el efecto se parece a otra cosa: ¿a qué?",
        ],
      },
    ],
    predicciones: [
      {
        escenario: "Un paciente ha ingerido una sustancia que es sustrato de la misma enzima que otra molécula más tóxica, y se administra en cantidad suficiente para ocupar la enzima.",
        pregunta: "¿Qué tipo de inhibición se está aprovechando y por qué funciona?",
        respuesta:
          "Una inhibición competitiva. Las dos moléculas compiten por el mismo sitio activo, así que aumentar mucho la concentración de una desplaza a la otra y reduce la velocidad a la que se transforma. Funciona precisamente por la propiedad que define a este tipo de inhibición: el efecto depende de las concentraciones relativas y puede invertirse cambiándolas. Con un inhibidor no competitivo esta estrategia no serviría de nada, porque no se une al mismo sitio y no hay forma de desplazarlo con más sustrato. El razonamiento explica el mecanismo; qué sustancia se usa y en qué condiciones es una decisión clínica que se rige por guías vigentes y por toxicología, no por este texto.",
      },
      {
        escenario: "Se mide una enzima reguladora de una vía y su curva de velocidad frente a sustrato sale sigmoidea en lugar de hiperbólica.",
        pregunta: "¿Qué dice eso sobre la enzima y qué ventaja funcional tiene esa forma?",
        respuesta:
          "Dice que es una enzima alostérica, con más de un sitio de unión y con cooperatividad entre ellos, de modo que unirse a una molécula facilita las siguientes. La ventaja funcional es la sensibilidad: en la zona central de la curva, un cambio pequeño en la concentración de sustrato o de un modulador produce un cambio grande en la velocidad. La enzima se comporta más como un interruptor que como un regulador gradual, que es exactamente lo que interesa en el punto donde una vía se controla. Por eso las enzimas que fijan la velocidad de las rutas metabólicas, como la fosfofructocinasa-1, suelen ser de este tipo, y por eso su cinética no se describe bien con el modelo sencillo de Michaelis-Menten.",
      },
    ],
    errores: [
      {
        error: "Creer que una enzima desplaza el equilibrio de la reacción hacia los productos.",
        correccion:
          "Acelera por igual la reacción directa y la inversa, así que el equilibrio final es el mismo con enzima y sin ella. Lo único que cambia es el tiempo que se tarda en alcanzarlo. Una reacción termodinámicamente desfavorable sigue siéndolo aunque tenga enzima.",
      },
      {
        error: "Interpretar que una Km alta significa mucha afinidad.",
        correccion:
          "Es al revés, y es el error más repetido del tema. La Km es la concentración necesaria para llegar a media velocidad, así que cuanto más sustrato haga falta, peor se une la enzima: Km alta es afinidad baja. Conviene recordarlo con el par hexocinasa y glucocinasa.",
      },
      {
        error: "Decir que un inhibidor competitivo baja la Vmáx.",
        correccion:
          "No la baja, porque con sustrato suficiente queda desplazado del sitio activo y la enzima alcanza su velocidad máxima igual. Lo que sube es la Km aparente. Esa es justamente la razón de que este tipo de inhibición pueda vencerse aumentando el sustrato, cosa imposible en la no competitiva.",
      },
      {
        error: "Aplicar el modelo de Michaelis-Menten a las enzimas reguladoras de una vía.",
        correccion:
          "Esas enzimas suelen ser alostéricas y su curva es sigmoidea, no hiperbólica, así que ni la Km ni la Vmáx se interpretan igual. La forma en S les da una sensibilidad muy alta en un rango estrecho, que es lo que las hace útiles como puntos de control. Aplicarles el modelo simple lleva a conclusiones equivocadas.",
      },
      {
        error: "Suponer que regular una vía significa cambiar la cantidad de enzima.",
        correccion:
          "Esa es la vía lenta, de horas o días. Las regulaciones rápidas no tocan la cantidad: añadir o quitar un fosfato enciende o apaga la enzima en segundos, y los moduladores alostéricos actúan de inmediato. Además, algunas enzimas se fabrican en forma inactiva y se activan solo donde deben trabajar.",
      },
    ],
    tarjetas: [
      { front: "¿Qué hace una enzima para acelerar una reacción?", back: "Baja la energía de activación estabilizando el estado de transición." },
      { front: "¿Modifica una enzima el equilibrio de la reacción?", back: "No: solo la velocidad a la que se alcanza." },
      { front: "¿Qué es la Km?", back: "La concentración de sustrato a la que la enzima alcanza la mitad de su Vmáx." },
      { front: "¿Qué indica una Km baja sobre la afinidad?", back: "Afinidad alta: basta poco sustrato para llegar a media velocidad." },
      { front: "¿De qué depende la Vmáx?", back: "De la cantidad de enzima y de la velocidad de cada molécula." },
      { front: "¿Qué parámetro modifica un inhibidor competitivo?", back: "Sube la Km aparente; la Vmáx no cambia." },
      { front: "¿Qué parámetro modifica un inhibidor no competitivo?", back: "Baja la Vmáx; la Km no cambia." },
      { front: "¿Qué tipo de inhibición se vence aumentando el sustrato?", back: "La competitiva." },
      { front: "¿Qué forma tiene la curva de una enzima alostérica y qué ventaja aporta?", back: "Sigmoidea: la hace muy sensible a cambios pequeños en un rango estrecho." },
      { front: "¿Qué es la inhibición por producto final?", back: "Que el producto de una vía inhibe su primera enzima: retroalimentación negativa." },
    ],
    faq: [
      {
        q: "¿Qué es la Km de una enzima?",
        a: "Es la concentración de sustrato a la que la enzima trabaja a la mitad de su velocidad máxima. Se usa como medida inversa de la afinidad: una Km baja significa que basta poco sustrato para alcanzar media velocidad, es decir, que la enzima se une bien; una Km alta indica lo contrario. Es una propiedad de cada enzima y no depende de cuánta haya.",
      },
      {
        q: "¿Cuál es la diferencia entre inhibición competitiva y no competitiva?",
        a: "La competitiva ocurre cuando el inhibidor se parece al sustrato y ocupa el mismo sitio activo, de modo que sube la Km aparente pero la Vmáx no cambia y el efecto puede vencerse aumentando el sustrato. La no competitiva ocurre cuando el inhibidor se une en otro sitio y estropea la enzima esté ocupada o no: baja la Vmáx, la Km no cambia y añadir sustrato no sirve de nada.",
      },
      {
        q: "¿Una enzima puede hacer que ocurra una reacción que no ocurriría?",
        a: "No. Una enzima solo acelera reacciones que ya son termodinámicamente posibles, bajando su energía de activación. No aporta energía ni desplaza el equilibrio, y acelera por igual la reacción directa y la inversa. Lo que consigue es que se alcance en un tiempo útil un equilibrio al que la reacción llegaría de todos modos.",
      },
      {
        q: "¿Qué es una enzima alostérica?",
        a: "Es una enzima con sitios de unión adicionales al activo, donde moléculas reguladoras la activan o la inhiben. Su curva de velocidad frente a sustrato es sigmoidea en vez de hiperbólica, lo que la hace muy sensible a cambios pequeños de concentración dentro de un rango estrecho. Por eso las enzimas que controlan la velocidad de una vía metabólica suelen ser de este tipo.",
      },
    ],
    fuentes: [
      "Lehninger, Principios de bioquímica (Nelson y Cox), capítulo de enzimas y cinética enzimática",
      "Lippincott Illustrated Reviews: Bioquímica, capítulo de enzimas",
      "Katzung, Farmacología básica y clínica, capítulo de receptores y farmacodinámica, para la aplicación a inhibidores",
    ],
    relacionados: ["reacciones-del-metabolismo", "glucolisis", "ph-pka-ionizacion"],
  },
];

export const getTema = (slug: string) => TEMAS.find((t) => t.slug === slug);
export const temasPorBloque = (bloqueSlug: string) => TEMAS.filter((t) => t.bloque === bloqueSlug);
export const TOTAL_TEMAS = TEMAS.length;

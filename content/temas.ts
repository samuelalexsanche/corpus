export interface RecallPrompt { pregunta: string; referencia: string; pistas: string[] }
export interface Perturbacion { escenario: string; pregunta: string; respuesta: string }
export interface ErrorComun { error: string; correccion: string }
export interface Tarjeta { front: string; back: string }
export interface FAQ { q: string; a: string }
export interface Seccion { titulo: string; cuerpo: string[] }

import type { LazoDatos } from "@/lib/lazo";

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
   * Lazo de control del tema. Se dibuja con una pieza tapada: un diagrama del
   * mecanismo completo sería la respuesta disfrazada.
   */
  diagrama?: LazoDatos;
  recall: RecallPrompt[];
  perturbaciones?: Perturbacion[];
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
    titulo: "Retroalimentación negativa: el lazo que sostiene la fisiología",
    tituloSEO: "Retroalimentación negativa en fisiología: sensor, controlador, set point y efector",
    bloque: "andamiaje",
    unidad: "B0.5 · Teoría de control aplicada",
    nivel: "fundamento",
    minutos: 18,
    resumen:
      "Las cuatro piezas de un lazo de control —sensor, controlador, set point y efector— y por qué el error, no la medición, es la única señal que el sistema realmente ve. Es el andamio sobre el que se apoya toda la fisiología.",
    porQueImporta:
      "Casi todo lo que un cuerpo hace para mantenerse vivo es un lazo de control. Temperatura, glucosa, presión arterial, pH, osmolaridad, calcio, hormonas tiroideas: todos funcionan igual. Aprender el patrón una vez ahorra memorizar veinte veces lo mismo con nombres distintos. Y en patología, la pregunta que más rendimiento da es siempre la misma: ¿se rompió una pieza, o alguien movió el objetivo?",
    secciones: [
      {
        titulo: "Las cuatro piezas",
        cuerpo: [
          "Piensa en un termostato. Le pones 22 °C, hace calor, arranca el aire; el cuarto se enfría, se apaga; sube la temperatura, vuelve a arrancar. Se queda oscilando alrededor de 22 indefinidamente. Para que eso funcione tienen que existir cuatro elementos, y son los mismos cuatro en cualquier sistema fisiológico.",
          "El **sensor** mide la variable. El termómetro; en el cuerpo, los barorreceptores del seno carotídeo, los quimiorreceptores centrales, las células beta del páncreas que leen la glucosa.",
          "El **controlador** decide qué hacer. La placa del termostato; en el cuerpo, casi siempre un núcleo del hipotálamo o del tronco encefálico.",
          "El **set point** es el valor deseado. El 22. No es parte del controlador aunque viva dentro de él: es un parámetro separado, y en cuanto lo separas puedes hacer la pregunta que importa —¿quién lo fija y puede moverse?",
          "El **efector** ejecuta la corrección. El compresor y los ventiladores; en el cuerpo, un músculo, una glándula, un vaso que se contrae.",
        ],
      },
      {
        titulo: "El error es lo único que el sistema ve",
        cuerpo: [
          "Aquí está el paso que casi todo el mundo salta. El controlador no actúa sobre la medición. Actúa sobre la **diferencia entre la medición y el set point**, y esa diferencia se llama error.",
          "La distinción no es cosmética. Si programas el termostato como «si la temperatura es igual a 22, enciende», enciendes exactamente cuando ya llegaste. Lo correcto es comparar: si la temperatura está *por encima* del objetivo, enfría; si está por debajo, calienta; si el error es cero, no hagas nada.",
          "Se llama retroalimentación **negativa** precisamente por eso: la respuesta va siempre en dirección contraria al error, con el fin de anularlo. Un sistema con retroalimentación positiva hace lo opuesto —amplifica su propia desviación— y por eso en el cuerpo es raro y casi siempre transitorio: la coagulación, el pico de LH que dispara la ovulación, las contracciones del parto. Un lazo positivo sin freno es una explosión.",
        ],
      },
      {
        titulo: "Ganancia, retraso y por qué los sistemas oscilan",
        cuerpo: [
          "Dos parámetros deciden el comportamiento de un lazo. La **ganancia** es cuánto responde el efector por unidad de error: ganancia alta significa corrección enérgica. El **retraso** es cuánto tarda el sistema en enterarse del efecto de su propia acción.",
          "Ganancia alta con retraso largo produce oscilación. El sistema corrige de más porque todavía no ve el resultado de lo que ya hizo, luego corrige de más en sentido contrario, y así. Esto no es teoría abstracta: la respiración de Cheyne-Stokes en la insuficiencia cardíaca es exactamente eso —el tiempo de circulación se alarga, el control respiratorio se entera tarde de la PCO₂ real y la ventilación empieza a oscilar en ciclos de crescendo y decrescendo.",
          "Cuando veas oscilación en un sistema biológico, sospecha ganancia y retraso antes que una pieza rota.",
        ],
      },
    ],
    analogia: {
      campo: "Teoría de control / ingeniería de sistemas",
      texto:
        "Un lazo fisiológico es un controlador en lazo cerrado: mide una variable, compara contra una referencia, y actúa sobre la planta para anular el error. Ganancia, constante de tiempo y retraso significan lo mismo que en control clásico.",
      dondeSeRompe:
        "La evolución no diseña sistemas limpios. Un mismo efector sirve a varios lazos con objetivos en conflicto (la vasoconstricción cutánea sirve a la termorregulación y a la presión arterial a la vez), los set points se mueven con el contexto, y muchos lazos están acoplados de formas que ningún ingeniero aceptaría. La analogía te da la estructura, no la garantía de que el sistema esté bien diseñado.",
    },
    diagrama: {
      variable: "Temperatura central",
      setPoint: "37 °C",
      sensor: "Termorreceptores",
      controlador: "Hipotálamo",
      efector: "Músculo, piel, vasos",
      correccion: "genera o disipa calor",
      perturbacion: "Ambiente frío",
      incognita: "controlador",
      aceptadas: ["hipotálamo", "area preoptica del hipotalamo", "centro termorregulador", "nucleo hipotalamico"],
    },
    recall: [
      {
        pregunta: "Reconstruye de memoria las cuatro piezas de un lazo de retroalimentación negativa y explica qué señal conecta al controlador con el efector.",
        referencia:
          "Sensor (mide la variable), controlador (decide), set point (valor de referencia) y efector (ejecuta la corrección). La señal que las conecta es el ERROR = medición − set point. El controlador nunca actúa sobre la medición sola, siempre sobre la diferencia. Se llama negativa porque la respuesta se opone al error para anularlo.",
        pistas: ["Empieza por lo que mide y termina por lo que actúa", "¿El controlador ve el valor absoluto o una diferencia?"],
      },
      {
        pregunta: "Explica sin ver nada por qué un lazo de control puede oscilar aunque todas sus piezas funcionen bien.",
        referencia:
          "Por la combinación de ganancia alta y retraso. El sistema corrige con fuerza antes de poder observar el efecto de su corrección previa, se pasa, y luego se pasa en sentido contrario. Ninguna pieza está rota: el problema es dinámico. Ejemplo clínico: respiración de Cheyne-Stokes por tiempo de circulación prolongado.",
        pistas: ["¿Qué pasa si actúas fuerte y te enteras tarde?"],
      },
    ],
    perturbaciones: [
      {
        escenario: "Un fármaco bloquea el sensor de un lazo de control sin tocar nada más.",
        pregunta: "¿Qué le pasa a la variable regulada?",
        respuesta:
          "El controlador deja de recibir información y calcula el error contra un dato falso o ausente. La variable queda sin regular y deriva libremente hacia donde la empujen las perturbaciones externas. No es que el efector falle: es que el sistema quedó operando a ciegas, en lazo abierto.",
      },
      {
        escenario: "Se duplica la ganancia de un lazo que ya tenía un retraso importante.",
        pregunta: "¿Mejora o empeora el control?",
        respuesta:
          "Empeora. Más ganancia sobre un retraso existente aumenta la sobrecorrección y puede llevar el sistema de una oscilación amortiguada a una sostenida o creciente. La intuición de que 'corregir más fuerte es corregir mejor' es falsa en cualquier sistema con retraso.",
      },
    ],
    errores: [
      {
        error: "Creer que el controlador responde al valor de la variable.",
        correccion: "Responde al error: la diferencia contra el set point. Un mismo valor de glucosa produce respuestas opuestas según cuál sea el objetivo en ese momento.",
      },
      {
        error: "Asumir que si una variable está anormal, algo está roto.",
        correccion: "Puede que el set point se haya movido a propósito. La fiebre es el ejemplo canónico: nada falla, el objetivo cambió.",
      },
      {
        error: "Tratar retroalimentación positiva como sinónimo de 'buena'.",
        correccion: "En control, positivo y negativo describen la dirección de la respuesta, no si es deseable. La retroalimentación negativa es la que estabiliza.",
      },
    ],
    tarjetas: [
      { front: "¿Sobre qué señal actúa el controlador de un lazo cerrado?", back: "Sobre el error = medición − set point. Nunca sobre la medición sola." },
      { front: "¿Por qué se llama negativa la retroalimentación negativa?", back: "Porque la respuesta va en dirección opuesta al error, para anularlo." },
      { front: "¿Qué combinación de parámetros hace oscilar un lazo de control?", back: "Ganancia alta con retraso largo: el sistema sobrecorrige porque aún no ve el efecto de su corrección previa." },
      { front: "Nombra tres ejemplos de retroalimentación POSITIVA en fisiología humana.", back: "Cascada de la coagulación, pico de LH que dispara la ovulación, y contracciones uterinas en el parto. Todas transitorias y con un freno definido." },
    ],
    faq: [
      { q: "¿Qué es la retroalimentación negativa en fisiología?", a: "Es el mecanismo por el cual un sistema corporal mide una variable, la compara con un valor de referencia (set point) y actúa en dirección opuesta a la desviación para devolverla al objetivo. Es el principio que sostiene la homeostasis." },
      { q: "¿Cuál es la diferencia entre retroalimentación positiva y negativa?", a: "La negativa se opone al cambio y estabiliza el sistema; es la regla en fisiología. La positiva amplifica el cambio y es rara, transitoria y siempre con un mecanismo de terminación: coagulación, ovulación y parto son los tres ejemplos clásicos." },
      { q: "¿Qué es un set point en el cuerpo humano?", a: "Es el valor de referencia que el organismo intenta mantener para una variable dada. No es fijo: puede desplazarse deliberadamente, como ocurre con la temperatura durante la fiebre." },
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
    tituloSEO: "Diferencia entre fiebre e hipertermia: mecanismo, set point y por qué el antipirético no sirve en golpe de calor",
    bloque: "funcion",
    unidad: "I8568 · Fisiología médica",
    nivel: "mecanismo",
    minutos: 15,
    resumen:
      "Dos pacientes con 39 °C pueden tener problemas opuestos. En la fiebre el set point subió y la regulación está intacta; en la hipertermia el set point es normal y el efector está rebasado. La distinción cambia por completo el tratamiento.",
    porQueImporta:
      "Es el ejemplo más limpio de una regla que se aplica a toda la fisiopatología: antes de asumir que un sistema falló, pregunta si el objetivo se movió. Además tiene consecuencia terapéutica inmediata y potencialmente letal: dar paracetamol a un golpe de calor y esperar retrasa el único tratamiento que funciona, que es el enfriamiento físico.",
    secciones: [
      {
        titulo: "La fiebre no es una falla",
        cuerpo: [
          "Cuando hay una infección, unas moléculas llamadas pirógenos —algunas provienen del microorganismo, otras las produce el propio sistema inmune— llegan al hipotálamo y **elevan el set point térmico** de forma deliberada, digamos de 37 a 39 °C.",
          "A partir de ese instante el cuerpo está a 37 con un objetivo de 39. El error es negativo, o sea: hace frío. Y el sistema hace exactamente lo que debe hacer un lazo de retroalimentación negativa bien construido —tirita para generar calor, contrae los vasos de la piel para no perderlo, y produce la sensación subjetiva de frío para que el individuo se tape.",
          "Por eso alguien con 39 °C de fiebre tirita bajo tres cobijas. No es el cuerpo descompuesto: es el cuerpo obedeciendo. El termostato no se rompió, alguien le movió la perilla.",
        ],
      },
      {
        titulo: "La hipertermia sí es una falla",
        cuerpo: [
          "Ahora un obrero bajo el sol durante horas, sin sombra ni agua. También llega con 39 °C. Pero su set point sigue en 37: el hipotálamo quiere enfriarlo y está mandando todas las órdenes correctas.",
          "El problema está en el efector, y conviene ser preciso con la palabra: no está **roto**, está **saturado**. Sudar y vasodilatar funcionan al máximo y aun así no alcanzan, porque la carga térmica externa supera la capacidad de disipación. Un componente roto no responde; uno saturado responde a tope y pierde igual.",
          "De ahí la consecuencia terapéutica. Un antipirético actúa bajando el set point. En la fiebre eso tiene sentido porque el set point está elevado. En el golpe de calor el set point ya es normal, así que el fármaco no tiene nada que corregir: hay que enfriar por fuera —hielo, agua, sombra, retirar ropa— y hacerlo rápido.",
        ],
      },
    ],
    analogia: {
      campo: "Sistemas de control",
      texto: "Fiebre = cambio de referencia con el lazo intacto. Hipertermia = saturación del actuador frente a una perturbación externa que excede su capacidad.",
      dondeSeRompe:
        "La analogía sugiere que basta con distinguir dos casos limpios, y la clínica es más sucia: la hipertermia maligna por anestésicos y el síndrome neuroléptico maligno son cuadros de producción descontrolada de calor a nivel muscular, no encajan del todo en ninguna de las dos casillas y tienen tratamiento propio.",
    },
    diagrama: {
      variable: "Temperatura central",
      setPoint: "Elevado a 39 °C",
      sensor: "Termorreceptores",
      controlador: "Hipotálamo",
      efector: "Tiritona y vasoconstricción",
      correccion: "genera y retiene calor",
      perturbacion: "Pirógenos",
      incognita: "setPoint",
      aceptadas: ["elevado", "subido", "mas alto", "39"],
    },
    recall: [
      {
        pregunta: "Explica en frío, sin ver nada, por qué un paciente con 39 °C de fiebre siente frío y tirita.",
        referencia:
          "Los pirógenos elevaron el set point hipotalámico por encima de la temperatura corporal actual. Eso genera un error negativo: el cuerpo interpreta que está por debajo de su objetivo. La respuesta correcta de un lazo negativo ante ese error es generar calor (tiritar), conservarlo (vasoconstricción cutánea) y motivar conducta de abrigo (sensación de frío). El sistema no está fallando: está persiguiendo un objetivo nuevo.",
        pistas: ["¿Cuál es el signo del error si el objetivo subió y la temperatura no?"],
      },
      {
        pregunta: "Un paciente llega con 39 °C. Enumera qué preguntarías para distinguir fiebre de hipertermia y justifica cada pregunta por el mecanismo.",
        referencia:
          "Contexto de exposición (calor ambiental, ejercicio, encierro en vehículo) porque apunta a carga térmica externa; estado de la piel (sudoración presente y piel húmeda apunta a esfuerzo del efector; piel seca y caliente sugiere efector agotado en golpe de calor clásico); presencia de escalofríos y sensación de frío, que indican set point elevado; datos de infección; fármacos y anestésicos recientes por hipertermia maligna y síndrome neuroléptico maligno; y estado neurológico, porque la alteración del sensorio marca gravedad en golpe de calor.",
        pistas: ["Piensa en qué pieza del lazo interroga cada pregunta"],
      },
    ],
    perturbaciones: [
      {
        escenario: "Se administra un antipirético a un paciente con golpe de calor.",
        pregunta: "¿Qué se espera que ocurra con la temperatura?",
        respuesta:
          "Prácticamente nada. El antipirético baja el set point, y en el golpe de calor el set point ya está en su valor normal: no hay nada que bajar. La temperatura sigue elevada porque la causa es carga térmica externa sobre un efector saturado. El riesgo real no es la ineficacia sino la demora del enfriamiento físico, que es tiempo-dependiente.",
      },
      {
        escenario: "Un paciente con fiebre alta se cubre con más cobijas durante la fase de escalofrío.",
        pregunta: "¿Está empeorando su cuadro?",
        respuesta:
          "Está colaborando con lo que su sistema pidió: mientras el set point esté por encima de la temperatura actual, el organismo busca ganar calor y la conducta de abrigo forma parte de la respuesta. Cuando el set point vuelva a bajar —espontáneamente o por antipirético— se invertirá el error, aparecerá sudoración y el paciente se destapará solo.",
      },
    ],
    errores: [
      { error: "Decir que en la fiebre «el termostato está descompuesto».", correccion: "Está intacto y funcionando con precisión. Lo que cambió es su valor de referencia." },
      { error: "Tratar toda temperatura elevada con antipirético.", correccion: "El antipirético solo actúa si el set point está elevado. En hipertermia el tratamiento es enfriamiento físico." },
      { error: "Llamar «roto» al efector en la hipertermia.", correccion: "Está saturado: trabajando al máximo y aun así insuficiente. Roto es no responder; saturado es responder a tope y perder." },
    ],
    tarjetas: [
      { front: "¿En qué se diferencian fiebre e hipertermia?", back: "Fiebre: set point elevado, regulación intacta. Hipertermia: set point normal, efector rebasado. Mismo número en el termómetro, mecanismos y tratamientos opuestos." },
      { front: "¿Por qué un antipirético no sirve en el golpe de calor?", back: "Porque baja el set point, y en el golpe de calor el set point ya está normal. El tratamiento es enfriamiento físico externo." },
      { front: "¿Qué diferencia hay entre un efector roto y uno saturado?", back: "Roto: no responde. Saturado: responde al máximo y aun así no alcanza. La distinción cambia el tratamiento." },
    ],
    faq: [
      { q: "¿Cuál es la diferencia entre fiebre e hipertermia?", a: "En la fiebre el hipotálamo eleva deliberadamente el set point térmico en respuesta a pirógenos, y la termorregulación permanece intacta. En la hipertermia el set point es normal, pero los mecanismos de disipación de calor están rebasados por carga térmica externa o producción excesiva. Se ven igual en el termómetro y requieren tratamientos distintos." },
      { q: "¿Por qué tiemblo si tengo fiebre alta?", a: "Porque el set point subió por encima de tu temperatura actual. Tu cuerpo interpreta que está frío respecto a su nuevo objetivo, así que tirita para generar calor y contrae los vasos de la piel para conservarlo." },
      { q: "¿Sirve el paracetamol para el golpe de calor?", a: "No. Los antipiréticos actúan bajando un set point elevado, y en el golpe de calor el set point ya es normal. El tratamiento es enfriamiento físico rápido. Es una urgencia médica: se requiere atención inmediata." },
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
    perturbaciones: [
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
      "Es un caso donde una relación cuantitativa de una línea predice una cadena entera de consecuencias clínicas. Además ilustra un principio general de sistemas: un lazo puede corregir su variable objetivo y degradar otra que nadie estaba midiendo.",
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
          "Un lazo de control puede corregir su variable objetivo y degradar otra que nadie estaba midiendo. La hipertrofia baja σ y rompe la perfusión y la distensibilidad. Es el mismo tipo de compromiso que aparece una y otra vez en fisiopatología, y buscarlo activamente es una de las preguntas más rentables frente a cualquier mecanismo compensador.",
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
    perturbaciones: [
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
      controlador: "Centro respiratorio del tronco",
      efector: "Ventilación pulmonar",
      correccion: "elimina o retiene CO₂",
      perturbacion: "Carga ácida metabólica",
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
    perturbaciones: [
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
    perturbaciones: [
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
    perturbaciones: [
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
    perturbaciones: [
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
];

export const getTema = (slug: string) => TEMAS.find((t) => t.slug === slug);
export const temasPorBloque = (bloqueSlug: string) => TEMAS.filter((t) => t.bloque === bloqueSlug);
export const TOTAL_TEMAS = TEMAS.length;

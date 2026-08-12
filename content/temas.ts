export interface RecallPrompt { pregunta: string; referencia: string; pistas: string[] }
export interface Perturbacion { escenario: string; pregunta: string; respuesta: string }
export interface ErrorComun { error: string; correccion: string }
export interface Tarjeta { front: string; back: string }
export interface FAQ { q: string; a: string }
export interface Seccion { titulo: string; cuerpo: string[] }

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
];

export const getTema = (slug: string) => TEMAS.find((t) => t.slug === slug);
export const temasPorBloque = (bloqueSlug: string) => TEMAS.filter((t) => t.bloque === bloqueSlug);
export const TOTAL_TEMAS = TEMAS.length;

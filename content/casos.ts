export interface EtapaCaso {
  titulo: string;
  informacion: string[];
  pregunta: string;
  respuestaEsperada: string;
  puntosClave: string[];
}

export interface Caso {
  slug: string;
  titulo: string;
  bloque: string;
  dificultad: "introductorio" | "intermedio" | "avanzado";
  minutos: number;
  resumen: string;
  advertencia: string;
  etapas: EtapaCaso[];
  cierre: string;
  temasRelacionados: string[];
}

const ADVERTENCIA =
  "Caso construido con fines educativos. No es una guía de manejo clínico ni sustituye la valoración de un profesional. Las conductas reales se rigen por guías vigentes (NOM, CENETEC, sociedades científicas) que deben consultarse en su fuente primaria.";

export const CASOS: Caso[] = [
  {
    slug: "hombre-39-grados-obra",
    titulo: "Hombre de 34 años con 39 °C tras una jornada en obra",
    bloque: "funcion",
    dificultad: "introductorio",
    minutos: 20,
    resumen: "Un caso diseñado para forzar la distinción entre fiebre e hipertermia antes de tener ningún estudio de laboratorio.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "Presentación",
        informacion: [
          "Hombre de 34 años, albañil, traído por compañeros tras encontrarlo confuso al final de la jornada.",
          "Temperatura 39.4 °C. Jornada de ocho horas bajo sol directo, sin sombra estructurada.",
        ],
        pregunta: "Antes de pedir un solo estudio: ¿qué dos mecanismos completamente distintos podrían explicar esos 39.4 °C, y qué dato de la historia inclinaría la balanza?",
        respuestaEsperada:
          "Fiebre (set point hipotalámico elevado por pirógenos, regulación intacta) o hipertermia (set point normal con mecanismos de disipación rebasados). El contexto de exposición térmica prolongada sin hidratación ni sombra inclina fuertemente hacia hipertermia por golpe de calor. La pregunta que más discrimina es si tuvo escalofríos y sensación de frío —propios del set point elevado— o si estuvo sudando profusamente y luego dejó de hacerlo.",
        puntosClave: ["El contexto de exposición vale más que el número del termómetro", "Escalofrío y sensación de frío apuntan a set point elevado"],
      },
      {
        titulo: "Exploración",
        informacion: [
          "Piel caliente y seca. No refiere escalofríos; sus compañeros dicen que «sudaba muchísimo y de pronto dejó de sudar».",
          "Desorientado en tiempo y lugar. Taquicárdico e hipotenso.",
        ],
        pregunta: "¿Qué pieza del circuito termorregulador está comprometida y en qué estado exacto? Justifica por qué un antipirético no va a modificar el cuadro.",
        respuestaEsperada:
          "El efector, en estado de saturación y agotamiento: la sudoración funcionó al máximo hasta que la depleción de volumen la hizo insostenible, y la piel seca marca precisamente ese punto. El set point permanece normal, de modo que un antipirético —cuyo mecanismo es bajar un set point elevado— no tiene sustrato sobre el que actuar. El tratamiento es enfriamiento físico externo, y es tiempo-dependiente.",
        puntosClave: ["Saturado no es lo mismo que roto", "Piel seca en este contexto es signo de gravedad, no de mejoría", "La alteración del sensorio marca gravedad"],
      },
      {
        titulo: "Razonamiento de segundo orden",
        informacion: ["Se plantea la pregunta de por qué la alteración de conciencia aparece en este cuadro y no en una fiebre de 39.4 °C por infección respiratoria."],
        pregunta: "¿Por qué la hipertermia produce daño que la fiebre de la misma magnitud generalmente no produce?",
        respuestaEsperada:
          "Porque en la fiebre la temperatura está regulada: el organismo la sostiene deliberadamente en un valor nuevo y dispone de mecanismos para no rebasarlo. En la hipertermia la temperatura es una variable fuera de control que puede seguir subiendo mientras la carga externa persista, y por encima de cierto umbral se produce desnaturalización proteica y daño celular directo, con el sistema nervioso central entre los tejidos más vulnerables. La diferencia no es el número: es que uno tiene freno y el otro no.",
        puntosClave: ["Regulado y elevado no es lo mismo que descontrolado", "El daño depende de magnitud y tiempo, no solo del pico"],
      },
    ],
    cierre:
      "El caso entero se resuelve con una pregunta de sistemas: ¿el objetivo se movió o el actuador quedó rebasado? Ninguna de las dos respuestas se obtiene de un laboratorio; se obtienen de la historia.",
    temasRelacionados: ["fiebre-vs-hipertermia", "retroalimentacion-negativa"],
  },
  {
    slug: "hipertension-anos-sin-tratar",
    titulo: "Mujer de 58 años con hipertensión de larga evolución y disnea de esfuerzo",
    bloque: "funcion",
    dificultad: "intermedio",
    minutos: 25,
    resumen: "Un caso para razonar la hipertrofia ventricular desde la ley de Laplace y llegar a la disfunción diastólica por deducción, no por memoria.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "Presentación",
        informacion: [
          "Mujer de 58 años. Hipertensión diagnosticada hace 12 años, con adherencia irregular al tratamiento.",
          "Refiere falta de aire al subir escaleras, de instalación progresiva en el último año.",
        ],
        pregunta: "Sin más datos: ¿qué le ha estado haciendo la presión elevada a su ventrículo izquierdo, y por qué esa respuesta era la única disponible?",
        respuestaEsperada:
          "Hipertrofia. Según Laplace, σ ≈ (P·r)/2h: una presión crónicamente elevada aumenta el estrés de pared, y engrosar la pared lo reduce. Era la única respuesta disponible porque el cardiomiocito es post-mitótico y no puede aumentar su número: sin capacidad de división, solo queda aumentar el tamaño celular.",
        puntosClave: ["La hipertrofia es la solución al estrés de pared, no su consecuencia adversa", "La capacidad proliferativa determina qué respuesta existe"],
      },
      {
        titulo: "Estudios iniciales",
        informacion: [
          "Ecocardiograma: hipertrofia concéntrica del ventrículo izquierdo con cavidad reducida.",
          "Fracción de eyección conservada.",
        ],
        pregunta: "La fracción de eyección está normal y sin embargo la paciente tiene disnea. Explica la aparente contradicción desde la mecánica.",
        respuestaEsperada:
          "La fracción de eyección mide la proporción del volumen que se expulsa, es decir la sístole. El problema aquí es la diástole: la pared engrosó hacia la cavidad, de modo que el volumen de llenado disminuyó, y un músculo más grueso es más rígido. Llenarse no es un acto activo sino dejarse estirar, así que un ventrículo rígido se resiste. Se expulsa una fracción normal de un volumen insuficiente, y las presiones de llenado se elevan retrógradamente hacia la circulación pulmonar, lo que produce la disnea.",
        puntosClave: ["Fracción conservada no significa función normal", "El llenado es pasivo y depende de la distensibilidad"],
      },
      {
        titulo: "Riesgo a mediano plazo",
        informacion: ["Se plantea el riesgo de isquemia en esta paciente, cuyas arterias coronarias son angiográficamente normales."],
        pregunta: "¿Cómo puede haber isquemia con arterias coronarias limpias?",
        respuestaEsperada:
          "Por un problema de escalamiento. La masa muscular aumentó pero la red capilar no creció proporcionalmente: baja la densidad capilar por gramo de miocardio y aumenta la distancia de difusión hasta el interior de cada miocito engrosado. Hay más tejido consumiendo oxígeno con peor irrigación por unidad de masa, y el subendocardio es la región más vulnerable. Es isquemia relativa: la oferta es normal en términos absolutos pero insuficiente para la demanda creada.",
        puntosClave: ["Un circuito puede corregir su objetivo y empeorar otra variable", "Isquemia relativa: la demanda creció más que la oferta"],
      },
    ],
    cierre:
      "Toda la cadena —hipertrofia, disfunción diastólica, isquemia relativa— sale de una relación de una línea y de una propiedad del tejido. Nada de esto necesita memorizarse si se deduce.",
    temasRelacionados: ["ley-de-laplace", "hipertrofia-vs-hiperplasia"],
  },
  {
    slug: "joven-respiracion-profunda-y-rapida",
    titulo: "Joven de 22 años con respiración profunda y rápida",
    bloque: "andamiaje",
    dificultad: "intermedio",
    minutos: 25,
    resumen:
      "Un caso para leer un trastorno ácido-base razonándolo desde el par CO₂/bicarbonato, y para distinguir una compensación de un segundo trastorno.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "Presentación",
        informacion: [
          "Hombre de 22 años, traído por familiares por decaimiento de varios días.",
          "Llama la atención una respiración profunda y rápida, sostenida, que él no refiere como falta de aire.",
        ],
        pregunta: "Antes de cualquier laboratorio: ¿qué le está haciendo esa respiración al pH de la sangre, y por qué el cuerpo la mantendría?",
        respuestaEsperada:
          "Respirar profundo y rápido elimina CO₂, que es el componente ácido del par CO₂/bicarbonato. Al bajar el ácido, el cociente entre base y ácido sube y con él sube el pH. El cuerpo sostiene ese patrón si está intentando corregir una acidez de origen no respiratorio: es una compensación, no la enfermedad. La pista de que se trata de compensación y no de angustia es que el paciente no lo vive como falta de aire; el estímulo viene de los quimiorreceptores, no de una sensación de ahogo.",
        puntosClave: [
          "El pulmón es un regulador de pH, no solo de oxigenación",
          "Una hiperventilación sostenida y no percibida como disnea sugiere compensación",
        ],
      },
      {
        titulo: "Gasometría",
        informacion: [
          "pH por debajo del rango normal, es decir, acidemia.",
          "Bicarbonato bajo.",
          "pCO₂ baja.",
        ],
        pregunta: "¿El trastorno primario es respiratorio o metabólico? Justifícalo mirando qué componente se mueve en el mismo sentido que el pH.",
        respuestaEsperada:
          "Es metabólico. La regla es mirar cuál de los dos componentes se desplaza en la misma dirección que el pH: aquí el pH está bajo y el bicarbonato también está bajo, así que el bicarbonato es el culpable y el trastorno primario es una acidosis metabólica. La pCO₂ baja se mueve en sentido contrario al pH, lo que la identifica como la respuesta compensadora del pulmón y no como la causa. Si la pCO₂ fuera la causa, estaría alta, porque retener CO₂ es lo que acidifica por vía respiratoria.",
        puntosClave: [
          "El componente que se mueve en el mismo sentido que el pH es el primario",
          "El que se mueve en sentido contrario está compensando",
        ],
      },
      {
        titulo: "Hasta dónde llega la compensación",
        informacion: [
          "La compensación respiratoria de una acidosis metabólica es rápida: opera en minutos a horas.",
          "Existen reglas que estiman qué pCO₂ cabe esperar para un bicarbonato dado.",
        ],
        pregunta: "¿Puede la compensación respiratoria devolver el pH a la normalidad? ¿Y qué significaría encontrar una pCO₂ distinta de la esperada?",
        respuestaEsperada:
          "No. Una compensación acerca el pH al rango normal pero no lo normaliza del todo: si el pH apareciera plenamente normal habría que sospechar dos trastornos simultáneos que se cancelan, no una compensación exitosa. En cuanto a la magnitud, si la pCO₂ medida es más alta que la esperada para ese bicarbonato significa que el pulmón no está compensando todo lo que debería, y eso añade un componente respiratorio al cuadro. Si es más baja de lo esperado, hay además una alcalosis respiratoria por su cuenta. La compensación es predecible, y esa predictibilidad es justamente lo que permite detectar el segundo trastorno.",
        puntosClave: [
          "Compensar no es normalizar: un pH normal con componentes alterados sugiere trastorno mixto",
          "Comparar la compensación observada con la esperada revela trastornos añadidos",
        ],
      },
      {
        titulo: "De dónde salió el ácido",
        informacion: [
          "El bicarbonato puede bajar por dos motivos distintos: porque se consumió neutralizando un ácido que se añadió, o porque se perdió directamente.",
        ],
        pregunta: "¿Cómo distinguirías, conceptualmente, una acidosis por ácido añadido de una por bicarbonato perdido?",
        respuestaEsperada:
          "Por el balance de cargas del plasma, que tiene que cumplirse siempre. Si se añade un ácido, su anión acompañante se queda en el plasma ocupando el lugar del bicarbonato consumido, de modo que aparece un anión que no se mide de rutina y el hueco aniónico se amplía. Si en cambio el bicarbonato simplemente se pierde, el riñón retiene cloro para mantener la electroneutralidad, el cloro sí se mide, y el hueco aniónico permanece normal. Por eso el hueco aniónico separa las dos familias de causas sin necesidad de identificar todavía cuál es el ácido concreto.",
        puntosClave: [
          "El plasma es eléctricamente neutro y esa restricción es la que hace útil el hueco aniónico",
          "Hueco ampliado: ácido añadido. Hueco normal: bicarbonato perdido y cloro que ocupa su sitio",
        ],
      },
    ],
    cierre:
      "Todo el razonamiento salió de una sola relación —la del par CO₂/bicarbonato— y de una restricción física: el plasma es eléctricamente neutro. No hizo falta memorizar ninguna lista de causas para llegar hasta aquí, y llegar hasta aquí es lo que después convierte esa lista en algo con sentido. Identificar la causa concreta y decidir qué hacer con ella es otra conversación, con guías vigentes de por medio.",
    temasRelacionados: ["ph-pka-ionizacion", "retroalimentacion-negativa"],
  },

  {
    slug: "lactante-enzimas-en-el-sitio-equivocado",
    titulo: "Lactante con enzimas lisosomales altas en sangre",
    bloque: "andamiaje",
    dificultad: "intermedio",
    minutos: 20,
    resumen:
      "Un resultado de laboratorio que parece contradictorio —enzimas elevadas y a la vez insuficientes— se explica entero si uno sabe cómo la célula etiqueta sus envíos.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "Un resultado que parece un error",
        informacion: [
          "Lactante en estudio por retraso del desarrollo y organomegalia.",
          "Se miden varias hidrolasas lisosomales: están muy elevadas en plasma.",
          "Las mismas enzimas, medidas dentro de fibroblastos del paciente, están muy disminuidas.",
        ],
        pregunta: "¿Cómo pueden estar las mismas enzimas altas fuera de la célula y bajas dentro? Piensa en dónde deberían haber terminado.",
        respuestaEsperada:
          "Porque no es un problema de producción sino de dirección. La célula fabrica las enzimas con normalidad, pero no consigue enviarlas a su destino, así que siguen la ruta por defecto de la vía secretora y acaban vertidas al exterior. El resultado son dos hallazgos que parecen contradecirse y que en realidad son la misma cosa vista desde dos compartimentos: sobran en el plasma exactamente porque faltan en el lisosoma. El defecto está en el reparto, no en la fábrica.",
        puntosClave: [
          "Producción y destino son dos problemas distintos",
          "La vía secretora es el destino por defecto cuando falta una señal de desvío",
        ],
      },
      {
        titulo: "La etiqueta",
        informacion: [
          "En el aparato de Golgi, las hidrolasas destinadas al lisosoma reciben una marca de manosa-6-fosfato.",
          "Un receptor reconoce esa marca y desvía la enzima hacia la ruta lisosomal.",
        ],
        pregunta: "Si falla la enzima que coloca la marca, ¿qué le ocurre a todo el conjunto de hidrolasas y por qué el cuadro es generalizado?",
        respuestaEsperada:
          "Ninguna hidrolasa recibe su etiqueta, así que el receptor no reconoce a ninguna y todas se secretan en lugar de llegar al lisosoma. La consecuencia clave es que el defecto no afecta a una enzima sino a la familia entera, porque lo que falla es el sistema de etiquetado común. Por eso el cuadro es multisistémico desde el principio, a diferencia del déficit de una sola hidrolasa, donde solo se acumula el sustrato de esa enzima concreta y el patrón de órganos afectados es más restringido. El nombre del cuadro es enfermedad de células I o mucolipidosis tipo II.",
        puntosClave: [
          "Un fallo en el etiquetado afecta a todo lo que se etiquetaba con esa marca",
          "Fallo del sistema de reparto frente a fallo de una sola enzima: alcance distinto",
        ],
      },
      {
        titulo: "Qué se acumula y dónde",
        informacion: [
          "Los lisosomas del paciente aparecen distendidos por material sin degradar.",
        ],
        pregunta: "¿Por qué unos órganos sufren más que otros si el defecto está en todas las células?",
        respuestaEsperada:
          "Porque lo que determina el daño no es solo la ausencia de la enzima sino cuánto sustrato tiene que procesar cada tejido. Un lisosoma que no digiere acumula aquello que le llega, así que los órganos que más material de recambio manejan son los que primero se llenan y los que antes dan síntomas. Esa es la lógica general de las enfermedades por depósito lisosomal y explica por qué déficits de enzimas distintas producen patrones de órganos distintos pese a compartir el mecanismo: la enzima que falta decide qué sustrato se acumula, y el sustrato decide dónde.",
        puntosClave: [
          "El órgano afectado lo predice el sustrato, no la enzima por sí sola",
          "Mecanismo compartido no implica presentación compartida",
        ],
      },
    ],
    cierre:
      "El caso entero se sostiene sobre una sola idea de biología celular: dentro de la célula el destino de una proteína no depende de lo que la proteína es, sino de la etiqueta que lleva. Con esa idea, un resultado de laboratorio aparentemente imposible se vuelve la predicción más natural.",
    temasRelacionados: ["biologia-celular", "reacciones-del-metabolismo"],
  },

  {
    slug: "corazon-de-atleta-o-enfermedad",
    titulo: "Dos corazones engrosados, dos historias opuestas",
    bloque: "funcion",
    dificultad: "avanzado",
    minutos: 25,
    resumen:
      "Dos ventrículos con la pared engrosada. La misma palabra en el informe y procesos distintos detrás: el caso obliga a preguntar qué carga produjo el engrosamiento antes de interpretarlo.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "Dos informes casi idénticos",
        informacion: [
          "Persona A: 24 años, remero de fondo, entrena muchas horas por semana desde hace años. Asintomática.",
          "Persona B: 58 años, hipertensión de larga evolución mal controlada. Disnea de esfuerzo progresiva.",
          "En ambos, el informe menciona un ventrículo izquierdo con pared engrosada.",
        ],
        pregunta: "La palabra del informe es la misma. ¿Qué pregunta hay que hacerle a cada caso antes de interpretarla?",
        respuestaEsperada:
          "Qué carga produjo el engrosamiento. Un ventrículo se remodela en respuesta al estrés de pared, y ese estrés puede venir de una presión elevada o de un volumen elevado, que son estímulos distintos con respuestas distintas. En el hipertenso la carga es de presión sostenida. En el atleta de resistencia la carga dominante es de volumen, porque el entrenamiento aeróbico aumenta el retorno venoso y el volumen que el ventrículo maneja en cada latido. La palabra «engrosado» no distingue las dos situaciones, y sin esa distinción el informe no se puede leer.",
        puntosClave: [
          "El estímulo, no el resultado, es lo que define la respuesta",
          "Sobrecarga de presión y sobrecarga de volumen no son la misma carga",
        ],
      },
      {
        titulo: "Dos geometrías",
        informacion: [
          "En la persona A la cavidad está aumentada y la pared engrosada de forma proporcional.",
          "En la persona B la cavidad está reducida y la pared engrosada hacia dentro.",
        ],
        pregunta: "Explica las dos geometrías desde la ley de Laplace, partiendo del estímulo que identificaste.",
        respuestaEsperada:
          "El estrés de pared crece con la presión y con el radio, y baja con el grosor. Ante una sobrecarga de presión mantenida, la vía más directa para bajar el estrés es aumentar el grosor, y el engrosamiento se produce hacia la cavidad: la pared crece y el radio disminuye. Eso es la hipertrofia concéntrica de la persona B. Ante una sobrecarga de volumen, la cavidad se dilata primero y el radio aumenta; como el estrés crece con el radio, la pared debe engrosar también, pero solo lo suficiente para acompañar a una cavidad mayor. El resultado es una cavidad grande con una pared proporcionada, que es el patrón excéntrico de la persona A.",
        puntosClave: [
          "Presión: engrosar hacia dentro y reducir el radio",
          "Volumen: dilatar y engrosar de forma proporcionada",
        ],
      },
      {
        titulo: "Por qué una es adaptación y la otra no",
        informacion: [
          "La persona A rinde por encima de la media en pruebas de esfuerzo.",
          "La persona B tiene una fracción de eyección conservada y sin embargo se ahoga al subir escaleras.",
        ],
        pregunta: "¿Qué separa una remodelación adaptativa de una patológica, si en ambas el músculo hizo lo que le tocaba?",
        respuestaEsperada:
          "Dos cosas. La primera es la reversibilidad: la remodelación del atleta regresa al retirar el estímulo, mientras que la del hipertenso se acompaña de cambios estructurales que no revierten con la misma facilidad, entre ellos el depósito de tejido fibroso entre las fibras. La segunda es el coste funcional. El corazón del atleta tiene una cavidad mayor, se llena mejor y aumenta el volumen que expulsa en cada latido. El del hipertenso tiene una cavidad menor y una pared más rígida, así que se llena peor: expulsa una fracción normal de un volumen insuficiente, y las presiones de llenado se transmiten hacia atrás. En ambos el músculo respondió correctamente al estímulo que recibió; la diferencia está en si ese estímulo se retira alguna vez y en qué le cuesta al órgano seguir funcionando.",
        puntosClave: [
          "Reversibilidad al retirar el estímulo",
          "Una fracción de eyección conservada puede convivir con un llenado insuficiente",
          "La adaptación deja de serlo cuando su coste supera al problema que resolvía",
        ],
      },
      {
        titulo: "El límite del razonamiento",
        informacion: [
          "Existen engrosamientos ventriculares que no responden a ninguna sobrecarga, sino a enfermedades del propio músculo o a depósito de sustancias anómalas.",
        ],
        pregunta: "¿Qué debería hacerte dudar de la explicación por sobrecarga en un caso concreto?",
        respuestaEsperada:
          "Que no aparezca una carga que justifique el engrosamiento: una persona joven, sin hipertensión y sin entrenamiento intenso, cuyo ventrículo está engrosado, no encaja en el razonamiento mecánico. También un engrosamiento desproporcionado respecto a la carga presente, o distribuido de forma irregular en lugar de homogénea. En esos casos el mecanismo no es la respuesta a una sobrecarga sino una enfermedad primaria del músculo o un depósito, y la distinción es importante porque cambia por completo cómo se estudia el caso. Aquí conviene decirlo con claridad: el razonamiento mecánico ordena el problema y acota las hipótesis, pero no sustituye al estudio dirigido ni permite concluir un diagnóstico.",
        puntosClave: [
          "Un engrosamiento sin carga que lo explique invalida el modelo mecánico",
          "Un modelo que ordena el problema no es un modelo que lo cierre",
        ],
      },
    ],
    cierre:
      "El caso no enseña dos entidades sino un hábito: antes de interpretar una adaptación, identificar el estímulo que la produjo. Con el estímulo delante, la geometría se deduce desde una relación de una línea; sin él, el mismo hallazgo se lee de dos maneras incompatibles.",
    temasRelacionados: ["ley-de-laplace", "hipertrofia-vs-hiperplasia", "retroalimentacion-negativa"],
  },

  {
    slug: "informe-lleno-de-palabras-desconocidas",
    titulo: "Un informe con doce términos que nunca has visto",
    bloque: "andamiaje",
    dificultad: "introductorio",
    minutos: 15,
    resumen:
      "El objetivo no es saber qué significan estas palabras, sino no necesitar saberlo: descomponerlas en piezas y reconstruir el significado sin diccionario.",
    advertencia: ADVERTENCIA,
    etapas: [
      {
        titulo: "El primer término",
        informacion: [
          "En un informe aparece la palabra «hepatoesplenomegalia».",
          "Regla de lectura: primero el sufijo, que dice qué pasa; luego el prefijo, que dice cómo o dónde; y al final la raíz, que dice a qué órgano.",
        ],
        pregunta: "Descompón el término en sus piezas y reconstruye qué describe, sin buscarlo.",
        respuestaEsperada:
          "Se parte en hepato, espleno y megalia. Hepato remite al hígado y espleno al bazo, y ambas son raíces de órgano. Megalia significa aumento de tamaño, y por ir al final es el sufijo, es decir, lo que está pasando. Reconstruido: aumento de tamaño del hígado y del bazo a la vez. El valor del ejercicio no es haber acertado esta palabra concreta, sino comprobar que el término no había que memorizarlo: estaba compuesto de piezas que ya se conocían, y leerlo en el orden correcto lo resuelve.",
        puntosClave: [
          "El sufijo dice qué ocurre; la raíz, a qué órgano",
          "Un término compuesto se lee de atrás hacia delante",
        ],
      },
      {
        titulo: "Cuando dos términos se parecen",
        informacion: [
          "En el mismo informe aparecen «nefritis» y «nefrosis».",
        ],
        pregunta: "Comparten raíz y difieren en el sufijo. ¿Qué está afirmando cada uno y por qué esa diferencia no es menor?",
        respuestaEsperada:
          "La raíz nefro señala el riñón en los dos casos, así que el órgano no distingue nada. La diferencia está entera en el sufijo: itis indica inflamación, mientras que osis indica un proceso o una alteración sin implicar inflamación. Es decir, los dos términos localizan el problema en el mismo sitio y afirman cosas distintas sobre su naturaleza. Esa es la razón de que valga la pena aprender sufijos antes que palabras: el sufijo es el que carga con la afirmación, y confundirlo cambia lo que uno cree que está pasando aunque el órgano sea el correcto.",
        puntosClave: [
          "La raíz localiza, el sufijo afirma",
          "Dos términos con la misma raíz pueden describir procesos distintos",
        ],
      },
      {
        titulo: "El término que no se deja",
        informacion: [
          "El informe menciona también la «enfermedad de Crohn».",
        ],
        pregunta: "Intenta descomponerlo. ¿Qué está pasando y qué te dice eso sobre los límites del método?",
        respuestaEsperada:
          "No se puede descomponer, y el intento fallido es informativo. Crohn no es una raíz griega ni latina: es un apellido. Se trata de un epónimo, un término formado a partir del nombre propio de quien describió la entidad, y esa categoría no obedece a las reglas de composición porque no está compuesta de morfemas. Reconocer que un término es un epónimo es la respuesta correcta, no un fracaso del método: significa que esa palabra sí hay que aprenderla, mientras que la gran mayoría de los términos que la rodean no.",
        puntosClave: [
          "Un epónimo no se descompone: se aprende",
          "Saber qué categoría de término tienes delante decide si hay que memorizarlo",
        ],
      },
    ],
    cierre:
      "Un vocabulario de unos cientos de piezas cubre la enorme mayoría de los miles de términos que aparecen en un informe. Lo que hay que memorizar de verdad —epónimos, nombres comerciales, siglas— es la excepción, y saber distinguir la excepción de la regla es lo que evita memorizar el idioma entero palabra por palabra.",
    temasRelacionados: ["terminologia-medica", "biologia-celular"],
  },
];

export const getCaso = (slug: string) => CASOS.find((c) => c.slug === slug);

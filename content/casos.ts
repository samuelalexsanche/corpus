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
        pregunta: "¿Qué pieza del lazo termorregulador está comprometida y en qué estado exacto? Justifica por qué un antipirético no va a modificar el cuadro.",
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
        puntosClave: ["Un lazo puede corregir su objetivo y degradar otra variable", "Isquemia relativa: la demanda creció más que la oferta"],
      },
    ],
    cierre:
      "Toda la cadena —hipertrofia, disfunción diastólica, isquemia relativa— sale de una relación de una línea y de una propiedad del tejido. Nada de esto necesita memorizarse si se deduce.",
    temasRelacionados: ["ley-de-laplace", "hipertrofia-vs-hiperplasia"],
  },
];

export const getCaso = (slug: string) => CASOS.find((c) => c.slug === slug);

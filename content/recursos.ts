export interface Recurso {
  titulo: string;
  autor?: string;
  tipo: "libro" | "video" | "atlas" | "banco" | "herramienta" | "gratuito";
  rol: "columna" | "consulta" | "visual" | "practica";
  bloques: string[];
  nota: string;
  gratuito: boolean;
}

export const REGLA_RECURSOS =
  "Un libro columna por materia, uno de consulta, un recurso visual y un banco de preguntas. Cuatro fuentes como máximo. Más que eso es procrastinación disfrazada de rigor: el error más común de quien estudia por su cuenta es coleccionar PDFs en lugar de terminar uno.";

export const RECURSOS: Recurso[] = [
  { titulo: "Organic Chemistry as a Second Language", autor: "Klein", tipo: "libro", rol: "columna", bloques: ["andamiaje"], nota: "No es un tratado: solo lo funcional. Basta con grupos funcionales y ácido-base.", gratuito: false },
  { titulo: "Essential Cell Biology", autor: "Alberts", tipo: "libro", rol: "columna", bloques: ["andamiaje"], nota: "La versión corta, no Molecular Biology of the Cell.", gratuito: false },
  { titulo: "Khan Academy — química y biología", tipo: "gratuito", rol: "visual", bloques: ["andamiaje"], nota: "Cubre el subconjunto de química que hace falta, en español. Coste cero.", gratuito: true },
  { titulo: "The Organic Chemistry Tutor", tipo: "video", rol: "visual", bloques: ["andamiaje"], nota: "Explicaciones cortas y por tema. Ideal para tapar huecos puntuales.", gratuito: true },
  { titulo: "Intuitive Biostatistics", autor: "Motulsky", tipo: "libro", rol: "columna", bloques: ["metodo-cientifico"], nota: "Escrito para no estadísticos. Un perfil cuantitativo puede ir mucho más rápido.", gratuito: false },
  { titulo: "Epidemiología", autor: "Gordis", tipo: "libro", rol: "columna", bloques: ["metodo-cientifico"], nota: "Estándar absoluto y sorprendentemente legible.", gratuito: false },
  { titulo: "Lippincott Illustrated Reviews: Bioquímica", tipo: "libro", rol: "columna", bloques: ["molecular"], nota: "La mejor relación aprendizaje por hora de toda la bioquímica.", gratuito: false },
  { titulo: "Marks' Basic Medical Biochemistry", tipo: "libro", rol: "consulta", bloques: ["molecular"], nota: "Para el «¿y esto para qué sirve?». Pesado como primera pasada.", gratuito: false },
  { titulo: "Ninja Nerd", tipo: "video", rol: "visual", bloques: ["molecular", "funcion"], nota: "El mejor recurso en video de fisiología y metabolismo que existe. Requiere química previa.", gratuito: true },
  { titulo: "Ross — Histología", tipo: "libro", rol: "columna", bloques: ["estructura"], nota: "El estándar. Funciona mejor como texto más atlas que como lectura lineal.", gratuito: false },
  { titulo: "Histology Guide", tipo: "atlas", rol: "visual", bloques: ["estructura"], nota: "Microscopio virtual con zoom real. El mejor recurso gratuito de histología.", gratuito: true },
  { titulo: "Langman (Sadler) — Embriología", tipo: "libro", rol: "columna", bloques: ["estructura"], nota: "Mejor punto de entrada que Moore: más esquemático y más corto.", gratuito: false },
  { titulo: "Netter — Atlas de anatomía", tipo: "atlas", rol: "visual", bloques: ["estructura"], nota: "Ilustrado. Se complementa con Rohen, que es fotográfico y muestra cómo se ve de verdad.", gratuito: false },
  { titulo: "Guyton y Hall — Tratado de fisiología médica", tipo: "libro", rol: "columna", bloques: ["funcion", "andamiaje"], nota: "Narrativa excepcional. La Unidad I sirve además como material de andamiaje.", gratuito: false },
  { titulo: "Ganong — Fisiología médica", tipo: "libro", rol: "consulta", bloques: ["funcion"], nota: "Solo consulta: leer dos libros de fisiología en paralelo es la forma más elegante de sentir que avanzas sin avanzar.", gratuito: false },
  { titulo: "Abbas — Inmunología celular y molecular", tipo: "libro", rol: "columna", bloques: ["funcion"], nota: "Estándar de inmunología.", gratuito: false },
  { titulo: "Levinson — Microbiología médica", tipo: "libro", rol: "columna", bloques: ["agresion"], nota: "El más eficiente de su materia.", gratuito: false },
  { titulo: "Robbins y Cotran — Patología", tipo: "libro", rol: "columna", bloques: ["agresion"], nota: "No hay sustituto. Existe versión corta (Basic Pathology) para primera pasada.", gratuito: false },
  { titulo: "Pathoma", autor: "Sattar", tipo: "video", rol: "visual", bloques: ["agresion"], nota: "El recurso de patología con mejor relación resultado/tiempo que existe.", gratuito: false },
  { titulo: "Katzung — Farmacología básica y clínica", tipo: "libro", rol: "columna", bloques: ["farmacologia"], nota: "Columna de farmacología.", gratuito: false },
  { titulo: "Bates — Guía de exploración física", tipo: "libro", rol: "columna", bloques: ["puente-clinico"], nota: "Estándar mundial de propedéutica. Advertencia: la exploración física no se aprende leyendo.", gratuito: false },
  { titulo: "Symptom to Diagnosis", autor: "Stern", tipo: "libro", rol: "practica", bloques: ["puente-clinico"], nota: "Literalmente el libro que enseña a pensar como clínico.", gratuito: false },
  { titulo: "Harrison — Principios de medicina interna", tipo: "libro", rol: "consulta", bloques: ["medicina-interna"], nota: "Consulta por capítulo, nunca lectura lineal.", gratuito: false },
  { titulo: "Anki", tipo: "herramienta", rol: "practica", bloques: ["andamiaje", "molecular", "estructura", "funcion", "agresion", "farmacologia"], nota: "Repetición espaciada. Sin esto, un plan de cuatro años pierde la mayor parte del primer año. Gratis en escritorio y Android.", gratuito: true },
  { titulo: "Banco de preguntas (AMBOSS, UWorld o ENARM)", tipo: "banco", rol: "practica", bloques: ["integracion"], nota: "La única métrica objetiva disponible sin escuela. Sin calibración se confunde familiaridad con dominio.", gratuito: false },
];

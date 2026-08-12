export type Dominio = 0 | 1 | 2 | 3 | 4;

export interface Unidad {
  clave: string;
  nombre: string;
  creditos: number;
  nota?: string;
}

export interface Bloque {
  id: string;
  slug: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  horas: string;
  color: string;
  porQue: string;
  entregable: string;
  unidades: Unidad[];
  prerequisitos: string[];
  temasClave: string[];
}

export const BLOQUES: Bloque[] = [
  {
    id: "b0", slug: "andamiaje", numero: "0", titulo: "Andamiaje",
    subtitulo: "Lo que la carrera asume que ya sabes",
    horas: "60–90 h", color: "slate",
    porQue:
      "No aparece en ningún mapa curricular porque las facultades lo dan por visto en el bachillerato. Es exactamente por eso que bioquímica se siente imposible: no es que sea difícil, es que es química orgánica aplicada y nadie revisó si tenías la química. Saltarse este bloque es la causa número uno de abandono en el primer año.",
    entregable:
      "Leer una vía metabólica y decir qué grupo funcional se está transformando en cada paso.",
    unidades: [
      { clave: "B0.1", nombre: "Química general: pH, pKa, equilibrio, termodinámica básica", creditos: 0, nota: "Base de todo el equilibrio ácido-base clínico y de la cinética enzimática" },
      { clave: "B0.2", nombre: "Química orgánica funcional: grupos funcionales, polaridad, quiralidad", creditos: 0, nota: "El 60 % del valor del bloque vive aquí" },
      { clave: "B0.3", nombre: "Biología celular: organelos, membranas, ciclo celular, tráfico vesicular", creditos: 0, nota: "Prerrequisito real de histología y patología" },
      { clave: "B0.4", nombre: "Terminología médica: raíces griegas y latinas", creditos: 0, nota: "Convierte ~10,000 términos en ~400 morfemas componibles" },
      { clave: "B0.5", nombre: "Cómo el cuerpo se corrige a sí mismo: retroalimentación, punto de ajuste y retraso", creditos: 0, nota: "El andamio de toda la fisiología" },
    ],
    prerequisitos: [],
    temasClave: ["grupos funcionales", "pH y pKa", "retroalimentación negativa", "morfemas médicos", "ciclo celular"],
  },
  {
    id: "bt", slug: "metodo-cientifico", numero: "T", titulo: "Método",
    subtitulo: "Transversal — arranca desde el día uno",
    horas: "18 créditos", color: "violet",
    porQue:
      "Un estudiante de medicina promedio sufre con bioestadística y epidemiología. Quien viene de una carrera cuantitativa las come. Hacerlas temprano permite leer literatura primaria desde el mes dos en lugar del año cuatro, y eso cambia la calidad de todo lo que sigue.",
    entregable:
      "Leer un ensayo clínico aleatorizado, criticar su diseño, calcular el NNT e interpretar un forest plot sin ayuda.",
    unidades: [
      { clave: "I8608", nombre: "Bioestadística inferencial", creditos: 6 },
      { clave: "I8556", nombre: "Epidemiología", creditos: 6 },
      { clave: "I8573", nombre: "Medicina basada en evidencias", creditos: 3 },
      { clave: "I8574", nombre: "Investigación clínica", creditos: 3 },
    ],
    prerequisitos: [],
    temasClave: ["valor p", "intervalo de confianza", "sesgo", "razón de verosimilitud", "NNT", "metaanálisis"],
  },
  {
    id: "b1", slug: "molecular", numero: "1", titulo: "Nivel molecular",
    subtitulo: "El set de instrucciones del organismo",
    horas: "38 créditos", color: "emerald",
    porQue:
      "Aquí empieza la medicina de verdad. Todo lo demás son abstracciones construidas encima. Cuesta caro y no da recompensa inmediata, exactamente como aprender álgebra lineal antes de tocar redes neuronales. Las vías metabólicas son grafos dirigidos con cuellos de botella; las enfermedades metabólicas son nodos rotos.",
    entregable:
      "Trazar de memoria glucólisis → Krebs → cadena respiratoria, explicar qué falla en diabetes tipo 2 a nivel molecular y leer un pedigrí.",
    unidades: [
      { clave: "I8577", nombre: "Bioquímica médica", creditos: 18, nota: "La unidad más grande de toda la ruta" },
      { clave: "I8578", nombre: "Biología molecular básica", creditos: 7 },
      { clave: "I8579", nombre: "Genética médica", creditos: 10 },
      { clave: "I8580", nombre: "Biología molecular en la clínica", creditos: 3, nota: "Puede diferirse hasta después de patología" },
    ],
    prerequisitos: ["andamiaje"],
    temasClave: ["glucólisis", "ciclo de Krebs", "fosforilación oxidativa", "enzimas", "ADN y replicación", "herencia mendeliana"],
  },
  {
    id: "b2", slug: "estructura", numero: "2", titulo: "Estructura",
    subtitulo: "Histología, embriología y anatomía, en ese orden",
    horas: "34 créditos", color: "amber",
    porQue:
      "El orden importa más aquí que en ningún otro bloque. Histología enseña a ver. Embriología explica por qué las cosas están donde están. Anatomía al final deja de ser memorización arbitraria y se vuelve deducción: el nervio laríngeo recurrente rodea el arco aórtico porque migró con el sexto arco branquial, no porque sí.",
    entregable:
      "Identificar cualquier tejido en una laminilla en menos de diez segundos y explicar un defecto congénito desde su origen embriológico.",
    unidades: [
      { clave: "I8555", nombre: "Histología", creditos: 10, nota: "En paralelo con bioquímica desde la semana 1" },
      { clave: "I8553", nombre: "Embriología", creditos: 7 },
      { clave: "I8554", nombre: "Anatomía humana y disecciones", creditos: 17 },
    ],
    prerequisitos: ["andamiaje"],
    temasClave: ["tejido epitelial", "tejido conectivo", "arcos branquiales", "plegamiento embrionario", "anatomía regional"],
  },
  {
    id: "b3", slug: "funcion", numero: "3", titulo: "Función",
    subtitulo: "El cuerpo funcionando y corrigiéndose",
    horas: "27 créditos", color: "sky",
    porQue:
      "Circuitos de retroalimentación negativa, puntos de ajuste, respuestas más o menos enérgicas, retrasos y circuitos enlazados entre sí. Casi toda la fisiología repite el mismo patrón con nombres distintos. Quien reconoce el patrón no memoriza: deduce.",
    entregable:
      "Dibujar el eje renina-angiotensina-aldosterona y predecir qué pasa al alterarlo en cinco puntos distintos. Explicar por qué un IECA produce tos.",
    unidades: [
      { clave: "I8568", nombre: "Fisiología médica", creditos: 20 },
      { clave: "I8571", nombre: "Inmunología médica", creditos: 7, nota: "Detección de anomalías con self/non-self" },
    ],
    prerequisitos: ["andamiaje", "molecular", "estructura"],
    temasClave: ["potencial de acción", "gasto cardíaco", "filtración glomerular", "equilibrio ácido-base", "respuesta inmune adaptativa"],
  },
  {
    id: "b4", slug: "agresion", numero: "4", titulo: "Agresión y daño",
    subtitulo: "Donde lo normal se rompe",
    horas: "51 créditos", color: "rose",
    porQue:
      "El pivote de la carrera. Fisiopatología es literalmente fisiología con una restricción violada: no se entra aquí sin fisiología sólida o se convierte en memorización de listas. Microbiología va antes porque una fracción enorme de la patología es infecciosa.",
    entregable:
      "Dado un cuadro clínico, proponer el mecanismo de daño celular y el correlato histopatológico esperado.",
    unidades: [
      { clave: "I8581", nombre: "Microbiología I", creditos: 11 },
      { clave: "I8582", nombre: "Microbiología II", creditos: 7 },
      { clave: "I8569", nombre: "Fisiopatología médica", creditos: 15 },
      { clave: "I8583", nombre: "Patología", creditos: 15 },
      { clave: "I8584", nombre: "Sesión anatomoclínica", creditos: 3, nota: "Primer formato de caso: puente al bloque clínico" },
    ],
    prerequisitos: ["funcion"],
    temasClave: ["inflamación", "necrosis y apoptosis", "neoplasia", "bacterias grampositivas", "mecanismos de resistencia"],
  },
  {
    id: "b5", slug: "farmacologia", numero: "5", titulo: "Intervención farmacológica",
    subtitulo: "Perturbar el sistema en un nodo específico",
    horas: "20 créditos", color: "teal",
    porQue:
      "Farmacología después de fisiopatología, siempre. Un fármaco actúa sobre un punto concreto de un mecanismo, y los efectos adversos son lo que ese mismo fármaco hace fuera de ese punto. Sin conocer el mecanismo ni la falla, un fármaco es solo una lista de nombres.",
    entregable:
      "Para las 100 familias más usadas: mecanismo, indicación, efecto adverso principal, contraindicación absoluta e interacción crítica.",
    unidades: [
      { clave: "I8570", nombre: "Farmacología médica", creditos: 9 },
      { clave: "I8572", nombre: "Terapéutica farmacológica", creditos: 11 },
    ],
    prerequisitos: ["agresion"],
    temasClave: ["farmacocinética", "receptores", "vida media", "interacciones", "efectos adversos"],
  },
  {
    id: "bs", slug: "salud-publica", numero: "S", titulo: "Salud pública y contexto",
    subtitulo: "En paralelo, uno por mes",
    horas: "40 créditos", color: "lime",
    porQue:
      "Bajo costo cognitivo, alto valor de encuadre. No se apilan en un bloque: se dosifican en paralelo a los bloques pesados como lectura de fin de semana. Sirven de descanso activo.",
    entregable: "Analizar un problema de salud de una población concreta con datos abiertos y proponer una intervención justificada.",
    unidades: [
      { clave: "I8549", nombre: "Sociedad y salud", creditos: 4 },
      { clave: "I8548", nombre: "Bioética y universidad", creditos: 7 },
      { clave: "I8563", nombre: "Salud pública II", creditos: 3 },
      { clave: "I8559", nombre: "Promoción y estilos de vida saludable", creditos: 3 },
      { clave: "I8562", nombre: "Nutrición y sociedad", creditos: 3, nota: "Sinergia fuerte con bioquímica" },
      { clave: "I8557", nombre: "Salud ambiental", creditos: 3 },
      { clave: "I8558", nombre: "Salud laboral", creditos: 3 },
      { clave: "I8561", nombre: "Economía en salud", creditos: 3 },
      { clave: "I8560", nombre: "Administración de la calidad en servicios de salud", creditos: 3 },
      { clave: "I8564", nombre: "Salud en la comunidad I", creditos: 2 },
      { clave: "I8565", nombre: "Salud en la comunidad II", creditos: 2 },
      { clave: "I8566", nombre: "Salud en la comunidad III", creditos: 2 },
      { clave: "I8567", nombre: "Salud en la comunidad IV", creditos: 2 },
      { clave: "I8575", nombre: "Legislación y salud", creditos: 3 },
      { clave: "I8576", nombre: "Medicina forense", creditos: 3, nota: "Depende de patología: no antes" },
    ],
    prerequisitos: [],
    temasClave: ["determinantes sociales", "bioética", "principio de autonomía", "indicadores de salud"],
  },
  {
    id: "b6", slug: "puente-clinico", numero: "6", titulo: "El puente clínico",
    subtitulo: "Donde el conocimiento se vuelve razonamiento",
    horas: "24 créditos", color: "indigo",
    porQue:
      "El bloque más importante de toda la ruta y el que decide si alguien que estudió solo despega o se estanca. La parte semiológica —interrogatorio, razonamiento, construcción de diferenciales— sí se aprende con casos. La exploración física no: es habilidad motora y requiere manos y pacientes. Confundir las dos es el riesgo central de cualquier ruta autodidacta.",
    entregable:
      "Ante una viñeta clínica: generar diferencial ordenado, justificar el siguiente estudio por su razón de verosimilitud y defender la decisión terapéutica.",
    unidades: [
      { clave: "I8585", nombre: "Propedéutica y semiología médica", creditos: 20 },
      { clave: "I8610", nombre: "Seminario de integración básico-clínica", creditos: 2 },
      { clave: "I8613", nombre: "Análisis de la decisión en la clínica", creditos: 2, nota: "Inferencia bayesiana aplicada" },
    ],
    prerequisitos: ["agresion", "farmacologia"],
    temasClave: ["probabilidad pre-test", "razón de verosimilitud", "diagnóstico diferencial", "umbral de tratamiento"],
  },
  {
    id: "b7", slug: "medicina-interna", numero: "7", titulo: "Medicina interna",
    subtitulo: "El tronco y sus ramas",
    horas: "71 créditos", color: "blue",
    porQue:
      "Clínica médica es la columna vertebral; las especialidades son ramas. El orden va de sistemas con fisiología dura y predecible desde primeros principios hacia los más blandos. Cardio, neumo y nefro forman una tríada acoplada por el equilibrio hidroelectrolítico: estudiarlos juntos multiplica la retención.",
    entregable: "Manejar de principio a fin los 50 cuadros clínicos más frecuentes en consulta.",
    unidades: [
      { clave: "I8586", nombre: "Clínica médica", creditos: 18 },
      { clave: "I8594", nombre: "Clínica de cardiología", creditos: 7 },
      { clave: "I8592", nombre: "Clínica de neumología", creditos: 3 },
      { clave: "I8595", nombre: "Clínica de nefrología y riesgo cardiovascular", creditos: 6 },
      { clave: "I8591", nombre: "Clínica de gastroenterología", creditos: 3 },
      { clave: "I8598", nombre: "Clínica de endocrinología y enfermedades metabólicas", creditos: 3 },
      { clave: "I8601", nombre: "Clínica de hematología", creditos: 3 },
      { clave: "I8604", nombre: "Clínica de infectología", creditos: 3 },
      { clave: "I8588", nombre: "Clínica de reumatología y rehabilitación", creditos: 3 },
      { clave: "I8605", nombre: "Clínica de neurología", creditos: 3 },
      { clave: "I8596", nombre: "Clínica de dermatología", creditos: 3, nota: "Tarde a propósito: es reconocimiento de patrón visual" },
      { clave: "I8597", nombre: "Clínica de psiquiatría", creditos: 7 },
      { clave: "I8589", nombre: "Clínica de oncología", creditos: 3 },
      { clave: "I8593", nombre: "Clínica de gerontogeriatría", creditos: 3 },
      { clave: "I8590", nombre: "Urgencias médicas", creditos: 3, nota: "Al final: integra todo bajo restricción de tiempo" },
    ],
    prerequisitos: ["puente-clinico"],
    temasClave: ["insuficiencia cardíaca", "EPOC", "enfermedad renal crónica", "diabetes mellitus", "anemia"],
  },
  {
    id: "b8", slug: "quirurgico", numero: "8", titulo: "Quirúrgico",
    subtitulo: "Razonamiento, no técnica",
    horas: "47 créditos", color: "orange",
    porQue:
      "La brecha entre teoría y práctica es la más grande de toda la carrera. Se estudia por el razonamiento quirúrgico —indicación, riesgo, complicación—, no por la técnica, que no se aprende sin quirófano. Asumirlo desde el principio evita el peor autoengaño posible.",
    entregable: "Ante un abdomen agudo: construir diferencial, indicar estudios y justificar si opera o no opera.",
    unidades: [
      { clave: "I8599", nombre: "Clínica quirúrgica", creditos: 18 },
      { clave: "I8600", nombre: "Técnicas quirúrgicas", creditos: 6 },
      { clave: "I8587", nombre: "Clínica de coloproctología", creditos: 3 },
      { clave: "I8602", nombre: "Clínica de ortopedia y traumatología", creditos: 3 },
      { clave: "I8607", nombre: "Clínica de urología", creditos: 3 },
      { clave: "I8603", nombre: "Clínica de otorrinolaringología", creditos: 3 },
      { clave: "I8609", nombre: "Clínica de oftalmología", creditos: 3 },
      { clave: "I8606", nombre: "Clínica de tórax y cardiovascular", creditos: 3 },
      { clave: "I8628", nombre: "Cirugía de mínima invasión", creditos: 3 },
      { clave: "I8611", nombre: "Seminario de integración médico-quirúrgica", creditos: 2 },
    ],
    prerequisitos: ["medicina-interna"],
    temasClave: ["abdomen agudo", "apendicitis", "hernias", "trauma", "riesgo quirúrgico"],
  },
  {
    id: "b9", slug: "materno-infantil", numero: "9", titulo: "Materno-infantil",
    subtitulo: "Medicina completa sobre fisiologías propias",
    horas: "74 créditos", color: "pink",
    porQue:
      "Va al final porque es medicina entera aplicada a poblaciones con fisiología distinta: embarazo, neonato, niño. Depende de todo lo anterior. Embriología se reactiva con fuerza aquí, y el repaso espaciado cobra la factura si se descuidó.",
    entregable: "Llevar un control prenatal completo y reconocer las urgencias obstétricas y neonatales.",
    unidades: [
      { clave: "I8617", nombre: "Obstetricia", creditos: 10 },
      { clave: "I8618", nombre: "Ginecología", creditos: 10 },
      { clave: "I8619", nombre: "Medicina sexual", creditos: 3 },
      { clave: "I8620", nombre: "Clínica de ginecología y obstetricia", creditos: 12 },
      { clave: "I8614", nombre: "Salud del niño y del adolescente", creditos: 5 },
      { clave: "I8615", nombre: "Pediatría neonatal y del lactante", creditos: 10 },
      { clave: "I8616", nombre: "Pediatría del preescolar, escolar y adolescente", creditos: 10 },
      { clave: "I8621", nombre: "Clínica de pediatría", creditos: 12 },
      { clave: "I8612", nombre: "Seminario de integración materno-infantil", creditos: 2 },
    ],
    prerequisitos: ["quirurgico"],
    temasClave: ["control prenatal", "preeclampsia", "desarrollo psicomotor", "vacunación", "reanimación neonatal"],
  },
  {
    id: "b10", slug: "integracion", numero: "10", titulo: "Integración",
    subtitulo: "Lo que separa 'leí medicina' de 'sé medicina'",
    horas: "200–300 h", color: "zinc",
    porQue:
      "No está en ningún plan de estudios y es lo que decide el resultado. Repaso espaciado global, viñetas multi-sistema y métrica objetiva contra un banco de preguntas. Sin escuela no hay exámenes; sin exámenes no hay calibración; sin calibración se confunde familiaridad con dominio.",
    entregable: "Puntaje comparable en un banco de preguntas estándar y una auditoría honesta de deudas prácticas.",
    unidades: [
      { clave: "B10.1", nombre: "Repaso espaciado global hasta madurez del mazo", creditos: 0 },
      { clave: "B10.2", nombre: "500+ viñetas clínicas integradas multi-sistema", creditos: 0 },
      { clave: "B10.3", nombre: "Simulacros cronometrados con métrica objetiva", creditos: 0 },
      { clave: "B10.4", nombre: "Auditoría de deudas prácticas", creditos: 0 },
    ],
    prerequisitos: ["materno-infantil"],
    temasClave: ["razonamiento integrado", "calibración", "simulacro"],
  },
];

export const getBloque = (slug: string) => BLOQUES.find((b) => b.slug === slug);

export const TOTAL_UNIDADES = BLOQUES.reduce((n, b) => n + b.unidades.length, 0);
export const TOTAL_CREDITOS = BLOQUES.reduce((n, b) => n + b.unidades.reduce((m, u) => m + u.creditos, 0), 0);

export const DEUDAS_PRACTICAS = [
  { titulo: "Exploración física", detalle: "Auscultar un soplo, palpar una hepatomegalia, percutir un derrame. Habilidad motora y sensorial que no se adquiere leyendo." },
  { titulo: "Procedimientos", detalle: "Venopunción, sutura, intubación, tacto. Requieren repetición supervisada sobre personas reales." },
  { titulo: "Juicio bajo incertidumbre real", detalle: "Paciente ambiguo, cansancio, tres de la mañana, información incompleta y consecuencias reales." },
  { titulo: "Comunicación clínica", detalle: "Dar malas noticias, negociar adherencia, manejar a la familia, sostener una consulta difícil." },
  { titulo: "Tolerancia al error con consecuencias", detalle: "La parte que forma el carácter médico y que ninguna plataforma puede sustituir." },
];

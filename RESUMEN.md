# Qué hice mientras comías

Resumen para revisión. Fecha: 2026-08-11.

---

## Lo que decidí (tenía autoridad de diseño, así que decidí)

**Nombre: Corpus.** Doble sentido — el cuerpo humano y un cuerpo de conocimiento. Corto,
funciona en español y en inglés, y deja espacio de marca. Tagline: *«Aprende medicina por
mecanismo, no por memoria»*, que es literalmente la tesis del proyecto.

**La plataforma no es un sitio de contenido con ejercicios pegados encima.** Ese era el
riesgo obvio y lo evité a propósito. La decisión de diseño central es que **ninguna página
termina en un resumen**: todas terminan en algo que el usuario tiene que producir. Es la misma
regla que rige nuestras sesiones, convertida en producto.

**Tres cosas la diferencian de todo lo que hay en español:**

1. El currículum está ordenado por **dependencia conceptual**, no por semestre. Y los
   prerrequisitos son visibles: la plataforma te dice qué te vas a perder si entras a un
   bloque sin el anterior.
2. **Las analogías se retiran explícitamente.** Cada andamio conceptual lleva una sección
   «dónde se rompe esta analogía». No conozco otra plataforma educativa que haga esto y es
   justo lo que evita que un andamio se convierta en error permanente.
3. **Los límites se declaran en pantalla.** Exploración física, procedimientos, juicio bajo
   incertidumbre real, comunicación clínica. Está en el currículum, en los temas que lo tocan
   y en el pie de página. Que una plataforma de estudio médico diga qué no puede enseñar es
   una posición de honestidad que además funciona como diferenciador.

---

## Qué está construido y funcionando

**Compila limpio: 39 páginas estáticas, 0 errores, TypeScript estricto en verde, 176 tests en verde.**

### Contenido cargado

| Pieza | Volumen |
|---|---|
| Bloques del currículum | 11, con prerrequisitos, entregables y justificación de orden |
| Unidades de aprendizaje | 74, con clave, créditos y notas de secuencia |
| Temas desarrollados | 6, completos con mecanismo, recall, perturbaciones, errores y FAQ |
| Morfemas | 249, más 19 distinciones de alto rendimiento y 35 descomposiciones |
| Casos clínicos por etapas | 2 |
| Recursos catalogados | 25, por bloque, con alternativas gratuitas señaladas |
| Deudas prácticas declaradas | 5 |

Los seis temas son: retroalimentación negativa, fiebre vs hipertermia, hipertrofia vs
hiperplasia, terminología médica, grupos funcionales y ley de Laplace. **Todo lo que
trabajamos en nuestras sesiones está ahí dentro**, escrito para que lo use alguien que no
estuvo en la conversación.

### Los cinco modos de estudio

1. **Repetición espaciada** — SM-2 implementado en `lib/srs.ts`, 40 líneas legibles a
   propósito. Repasos vencidos siempre antes que tarjetas nuevas.
2. **Recall en frío** — campo en blanco, pistas escalonadas bajo demanda, referencia
   completa y autocalificación 0–4 con la escala de dominio. Si te calificas por debajo de 3
   te dice que el tema no está terminado.
3. **Casos por etapas** — el caso no avanza hasta que escribes tu razonamiento. Bloqueado
   por longitud mínima: no puedes hacer clic para saltar.
4. **Decodificador de términos** — escribes cualquier término médico y lo parte en morfemas
   con un algoritmo de cobertura sin solapamiento que prioriza coincidencias largas.
5. **Predice la perturbación** — los escenarios de «¿qué pasa si empujo el sistema aquí?».

### Interfaz

Sistema de diseño propio siguiendo patrones shadcn/ui (cva para variantes, forwardRef,
tokens en variables CSS). Paleta clínica pero cálida: teal profundo como primario, ámbar
como acento de acción. Tema claro y oscuro sin parpadeo.

Accesibilidad tomada en serio: jerarquía de encabezados, `aria-current` en navegación,
`aria-label` en controles de icono, enlace de salto al contenido, foco visible, contraste
WCAG AA en ambos temas y respeto a `prefers-reduced-motion`.

Sin fuentes web externas — pila del sistema, que elimina una petición bloqueante y el
desplazamiento de layout.

### SEO

- Metadata dinámica y canónicas por ruta
- Open Graph con imagen generada por ruta
- JSON-LD: `EducationalOrganization`, `Course` (por bloque), `ScholarlyArticle` + `FAQPage`
  (por tema), `BreadcrumbList` en todas
- `sitemap.xml` y `robots.txt` generados desde el contenido
- Cada tema tiene un `tituloSEO` distinto del título de pantalla, apuntando a long tail:
  *«diferencia entre hipertrofia e hiperplasia»*, *«por qué el antipirético no sirve en golpe
  de calor»*, *«qué significa el sufijo -itis»*. El español médico de calidad está
  desatendido y esas consultas tienen volumen real.

### GEO

- `llms.txt` que describe el sitio **y sus principios editoriales**, para que un modelo que
  cite el contenido pueda transmitir también sus límites
- Rastreo generativo permitido explícitamente en `robots.ts`
- FAQ escritos como respuestas autocontenidas y extraíbles, no como teasers
- El contenido marca lo debatido como debatido, para no ser citado con más certeza de la que
  tiene el campo

---

## Stack

Next.js 16 (App Router, React 19), TypeScript estricto, Tailwind 3. Sin base de datos: el
contenido vive en módulos TypeScript tipados y el progreso en `localStorage`, exportable a
JSON. Todo se prerenderiza como HTML estático.

**Por qué contenido como código:** cada corrección médica se vuelve un pull request revisable
con historial y atribución. Y el tipo obliga a que un tema no se pueda publicar sin `recall`,
sin `errores` y sin `fuentes`. La calidad editorial queda impuesta por el compilador.

Actualicé Next de 15.1.6 a 16.3.0 porque la primera tenía una vulnerabilidad publicada.

---

## Documentación escrita

- **README.md** — qué es, por qué existe, cómo arrancarlo
- **CONTRIBUTING.md** — reglas de contribución. La primera es «nada sin fuente», y explica
  por qué: quien estudia solo no tiene profesor que lo corrija
- **ARCHITECTURE.md** — decisiones técnicas y su justificación
- **CONTENIDO.md** — guía de autoría. Es el documento más importante para escalar esto: define
  cómo se escribe un tema que enseñe en lugar de informar
- **ROADMAP.md** — v0.1 completa, v0.2 de contenido, v0.3 de capacidades, y qué está
  explícitamente fuera de alcance
- **LICENSE** — MIT para código, CC BY-SA 4.0 para contenido

---

## Sobre las skills que pediste

`shadcn`, `web guidelines ux ui pro max` y `frontend design` **no están instaladas en este
entorno** — verifiqué el directorio de skills antes de empezar. Apliqué los patrones de
shadcn/ui a mano (que es lo que shadcn hace de todos modos: copiar componentes al repo, no
instalar una dependencia) y las prácticas de UX/accesibilidad desde criterio propio.

Si me instalas esas skills, puedo hacer una segunda pasada de refinamiento visual con ellas.

---

## Lo que falta y mi recomendación

**El cuello de botella ya no es técnico, es de contenido.** La arquitectura está terminada.
Seis temas de setenta y cuatro unidades es un 8 %.

Mi propuesta, y aquí hay un conflicto que quiero nombrar: **generar contenido para la
plataforma no es lo mismo que estudiar.** Si dedicas tus 10 horas semanales a escribir temas
para Corpus, la plataforma crece y tú no. Tu perfil ya advierte del riesgo de sobreingeniería
del sistema de estudio en lugar de estudiar, y esto es exactamente esa trampa con mejor
disfraz que de costumbre.

La versión que sí funciona: **el contenido sale de tus sesiones, no de sesiones aparte.**
Estudias un tema conmigo como veníamos haciendo, y al cerrar lo convierto en página. El
trabajo de plataforma se vuelve un subproducto de tu estudio en lugar de un competidor por
tu tiempo. Eso además garantiza que el contenido sea bueno, porque pasó por alguien
aprendiéndolo de verdad.

**Próximos pasos concretos:**

1. Corre `npm install && npm run dev` y revísalo en pantalla
2. Decide si el nombre Corpus se queda
3. Repositorio en GitHub y despliegue en Vercel — es gratis y estático
4. Volvemos al Bloque 0, y cada tema que cerremos se publica

**Y lo bloqueante sigue igual que hace tres horas:** Anki instalado, 30 tarjetas importadas,
y el recall en frío que te debo el viernes. La plataforma no cambia eso.

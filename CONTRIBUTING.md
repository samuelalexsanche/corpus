# Cómo contribuir

Gracias por considerarlo. Corpus se sostiene sobre una premisa incómoda: **un dato clínico
inventado con tono seguro es el peor daño posible aquí**, porque quien estudia solo no tiene
profesor que lo corrija. Las reglas de abajo existen por eso.

## Regla no negociable: nada sin fuente

Toda afirmación médica nueva o modificada debe citar fuente en el campo `fuentes` del tema.
Se prefiere fuente primaria o texto de referencia estándar: Guyton, Ganong, Robbins, Lippincott,
Katzung, Abbas, Bates. Para conducta clínica, guías vigentes con su año.

Si algo es **área de investigación activa y no consenso cerrado**, el texto debe decirlo así.
No escribas con más certeza de la que el campo tiene. Ejemplo real en el repositorio: el papel
del microdaño en la hipertrofia muscular se presenta como debatido, no como resuelto.

## Qué no aceptamos

- Dosis, esquemas terapéuticos o protocolos de manejo. Corpus enseña mecanismo, no prescribe.
- Contenido que sugiera que la plataforma sustituye formación clínica.
- Afirmaciones sin fuente, por obvias que parezcan.
- Analogías sin su correspondiente sección de dónde se rompen.

## Cómo se escribe un tema

Cada tema en `content/temas.ts` necesita:

1. **`porQueImporta`** — la consecuencia clínica o conceptual. Si no puedes decir por qué
   importa, el tema no está listo.
2. **`secciones`** — prosa, no viñetas. Un mecanismo explicado en bullets pierde justo lo que
   lo hace entendible: la cadena causal. Las listas son para listas reales (diferenciales,
   criterios, efectos adversos).
3. **`analogia`** (opcional) — con `dondeSeRompe` obligatorio si se incluye.
4. **`recall`** — al menos una pregunta que exija reconstruir, no reconocer. La `referencia`
   debe ser lo bastante completa para que alguien pueda autocalificarse contra ella.
5. **`errores`** — errores reales y frecuentes, con corrección precisa. Un «casi, pero…» vago
   es peor que nada.
6. **`tarjetas`** — una tarjeta, un hecho. Si la respuesta lleva comas, son varias tarjetas.
   Nunca de reconocimiento: «¿Qué es la glucólisis?» es mala tarjeta.
7. **`faq`** — preguntas que alguien escribiría en un buscador, con respuesta autocontenida.
8. **`deudaPractica`** (cuando aplique) — si el tema toca algo que requiere manos y pacientes,
   dilo en el tema, no solo en el currículum.

## Estilo

- Español, con el término técnico en inglés cuando sea el estándar de la literatura.
- Prosa por defecto. Frases que un estudiante pueda leer en voz alta.
- Sin entusiasmo decorativo, sin emojis, sin «¡excelente pregunta!».
- Cuando algo sea difícil, decirlo: «esto tropieza a todo el mundo» sirve más que «tú puedes».

## Proceso

1. Fork y rama descriptiva (`tema/equilibrio-acido-base`).
2. `npm run typecheck` y `npm run build` deben pasar.
3. En el PR: qué añadiste, qué fuentes usaste y si algo es debatido en la literatura.
4. Las contribuciones de contenido médico se revisan por al menos una persona con formación
   en el área antes de mezclarse.

## Contribuciones que no son contenido

Accesibilidad, rendimiento, traducción, corrección de datos, mejoras al algoritmo de
repetición espaciada y nuevos modos de práctica son igual de bienvenidos. Para cambios
grandes, abre un issue antes.

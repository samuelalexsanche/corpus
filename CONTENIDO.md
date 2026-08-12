# Guía de autoría de contenido

Cómo escribir un tema que enseñe en lugar de informar.

## La diferencia que ordena todo

El objetivo no es que el lector **entienda tu explicación**. Es que pueda **reconstruirla solo
la semana que viene**. Eso cambia casi todo lo que sigue.

Un texto que se entiende perfectamente al leerlo y no se puede reproducir después no enseñó
nada: produjo la sensación de haber aprendido, que es exactamente el modo de falla que esta
plataforma existe para combatir.

## Estructura de un tema

### `porQueImporta`
La consecuencia. Clínica si la hay, conceptual si no. Si no puedes articular por qué importa,
el tema todavía no está listo para escribirse.

### `secciones`
Prosa. Un mecanismo explicado en viñetas pierde justo lo que lo hace entendible: la cadena
causal. Las listas se reservan para listas reales — diferenciales, criterios, efectos adversos.

Usa `**negritas**` para el término técnico la primera vez que aparece, no para dar énfasis
dramático.

Escribe el mecanismo como una cadena: esto causa esto, que causa esto otro. Si en algún punto
tienes que escribir «y entonces, por razones complejas…», ahí hay un hueco que el lector va a
sentir aunque no lo nombre.

### `analogia`
Opcional, pero si la incluyes, `dondeSeRompe` es obligatorio.

Las analogías son andamios. La biología rompe los andamios constantemente porque la evolución
no diseña sistemas limpios. **Un andamio que no se retira se convierte en error conceptual
permanente**, y esos errores sobreviven años porque se sienten como comprensión.

### `recall`
La `referencia` debe ser lo bastante completa como para que alguien pueda calificarse contra
ella con honestidad. No es un resumen: es la respuesta que esperarías de alguien que domina
el tema.

Las `pistas` van de menos a más específicas. La última puede ser casi la respuesta; el punto
es que el último paso siempre lo dé el lector.

### `perturbaciones`
El formato de mayor rendimiento para mecanismos. «¿Qué pasa si empujo el sistema aquí?»
distingue a quien entendió de quien memorizó, porque no se puede responder recordando.

Buenas perturbaciones: bloquear una pieza, duplicar un parámetro, retirar un estímulo
sostenido, aplicar el mecanismo a un tejido distinto.

### `errores`
Errores reales, de los que la gente comete de verdad. Y la corrección tiene que ser precisa:
señalar exactamente dónde está mal el razonamiento. Un «casi, pero…» vago es peor que nada,
porque deja el error intacto y añade confusión.

### `tarjetas`
Una tarjeta, un hecho. Si la respuesta lleva comas enumerando cosas, son varias tarjetas.

Nunca de reconocimiento. «¿Qué es la glucólisis?» es mala. «¿Qué enzima cataliza el paso
irreversible que consume el primer ATP y qué la inhibe?» es buena.

Y no hagas tarjetas de algo que el tema no explicó bien: memorizar sin comprender genera
tarjetas que se fallan para siempre.

### `faq`
Preguntas tal como alguien las escribiría en un buscador, con respuestas autocontenidas.
Sirven a dos propósitos a la vez: son la puerta de entrada de la mayoría de los lectores, y
son lo que un modelo generativo va a citar. Escríbelas para que se sostengan solas fuera de
su página.

### `deudaPractica`
Si el tema toca algo que requiere manos, pacientes o laboratorio, dilo aquí. Que la lista
crezca es señal de honestidad, no de debilidad. El riesgo real no es enseñar poco: es que
alguien confunda dominio teórico con competencia clínica.

## Tono

- Español, con el término en inglés cuando sea el estándar de la literatura
- Directo. Sin entusiasmo decorativo, sin emojis, sin celebración automática
- Cuando algo sea difícil, decirlo. «Esto tropieza a todo el mundo» ayuda más que «tú puedes»
- Nunca escribas con más certeza de la que el campo tiene

## Verificación antes de abrir el PR

- [ ] Toda afirmación médica tiene fuente en `fuentes`
- [ ] Lo debatido está marcado como debatido
- [ ] Si hay analogía, tiene `dondeSeRompe`
- [ ] El `recall` exige reconstruir, no reconocer
- [ ] Las tarjetas son de recuperación y de un solo hecho
- [ ] No hay dosis ni protocolos de manejo
- [ ] `npm run build` pasa

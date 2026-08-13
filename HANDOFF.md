# Handoff — Corpus v0.1

Documento para retomar el desarrollo. Estado al 2026-08-11.

---

## 1. Estado actual

**Funciona y está en línea.** `npm run build:export` genera 39 páginas estáticas, TypeScript
estricto en verde, 176 tests en verde. ~6,200 líneas en 52 archivos fuente.

| Área | Estado |
|---|---|
| Arquitectura y stack | ✅ Completo |
| Sistema de diseño | ✅ Completo (claro/oscuro, tokens, accesible) |
| Currículum | ✅ 13 bloques, 81 unidades |
| Temas desarrollados | 🟡 20, a un ritmo de 5 por sesión |
| Modos de estudio | ✅ 8 modos funcionando |
| Ruta personalizada | ✅ planificador en /curriculum |
| SRS | ✅ SM-2 con persistencia local exportable |
| Figuras | 🟡 11 figuras anotadas; 13 de 20 temas con apoyo visual |
| Casos clínicos | 🟡 6 |
| Exportar a Anki | ✅ global y por tema |
| Buscador | ✅ sobre catálogo, temas, unidades, casos y morfemas |
| Catálogo de temas | 🟡 111 entradas con dónde estudiarlas |
| Cobertura del currículum | ✅ las 81 unidades tienen página |
| SEO técnico | ✅ Completo |
| GEO | ✅ llms.txt, JSON-LD, robots generativo |
| Documentación | ✅ 6 documentos |
| Tests | ✅ 127 en Vitest, corriendo en CI |
| Despliegue | ✅ https://samuelalexsanche.github.io/corpus |

## 2. Arranque en 2 minutos

```bash
cd plataforma
npm install
npm run dev
```

Abre http://localhost:3000. Rutas que vale la pena mirar primero para entender el producto:

- `/` — la tesis
- `/tema/hipertrofia-vs-hiperplasia` — la anatomía completa de un tema, incluido el bloque
  «dónde se rompe la analogía» y los ejercicios de perturbación
- `/practicar/terminologia` — el decodificador, que es la pieza más original
- `/practicar/casos/hombre-39-grados-obra` — el formato por etapas

## 3. Lee esto antes de escribir contenido

`CLAUDE.md` (cargado automáticamente por Claude Code) y `CONTENIDO.md`. La regla que domina
todo: **nunca inventes un dato clínico y nunca escribas con más certeza de la que tiene el
campo.** Quien usa esto estudia sin profesor que lo corrija.

## 4. Tareas priorizadas

### P0 — Desplegarlo ✅

Hecho. Vive en https://samuelalexsanche.github.io/corpus, publicado desde `master` por
`.github/workflows/pages.yml` con el despliegue nativo de Pages (sin rama `gh-pages`).

Queda una decisión abierta: **el dominio**. Mientras sea un Pages de proyecto, el sitio cuelga
de `/corpus`, y eso vive en dos variables que deben moverse juntas — `BASE_PATH` y
`NEXT_PUBLIC_SITE_URL`, ambas en el workflow. Dos consecuencias mientras siga así:

- `robots.txt` de un Pages de proyecto **no lo respeta Google**: solo cuenta el del dominio
  raíz, que aquí es `samuelalexsanche.github.io`. El archivo se genera igual, pero no manda.
- Cambiar de dominio después invalida canónicas y obliga a reindexar. Cuanto antes se decida,
  menos cuesta.

Falta también pasar el JSON-LD por Rich Results Test (los cuatro tipos parsean, pero no se han
validado contra el schema de Google).

### P1 — Contenido del Bloque 0 ✅

Los cuatro escritos y publicados: `ph-pka-ionizacion`, `biologia-celular`, `quiralidad` y
`reacciones-del-metabolismo`. Con ellos el andamiaje queda cerrado y el Bloque 0 tiene su
entregable cubierto: leer un paso de una vía metabólica y decir qué grupo funcional se
transforma y quién lo hace.

Cada uno pasa `tests/contenido.test.ts`, así que cumple el contrato sin que nadie lo revise a
ojo. Tres cosas que se decidieron al escribirlos y conviene no deshacer:

- **La talidomida se cuenta completa.** La versión popular —«bastaba con separar los
  enantiómeros»— es falsa: se interconvierten en condiciones fisiológicas. Contar la versión
  corta habría sido más limpio y habría enseñado algo incorrecto.
- **La distinción sintasa/sintetasa se presenta como orientación, no como ley**, porque la
  nomenclatura oficial ya no la sostiene de forma estricta.
- **`ph-pka-ionizacion` lleva diagrama de lazo** (tapa el efector), porque el control
  respiratorio del pH es un lazo de control y conecta el Bloque 0 con fisiología.

**Sigue pendiente lo grande:** 71 de las 81 unidades no tienen tema. El cuello de botella no
se movió, solo se cerró el bloque de entrada.

### P2 — Diagramas 🟡

`components/diagrama-lazo.tsx` está hecho: dibuja el diagrama de bloques de un lazo desde
datos —set point, comparador, controlador, efector, variable y la rama del sensor— y **tapa
una pieza** para que el lector la nombre. Acepta sinónimos, no exige acentos, y no dice
«incorrecto» sino que invita a reintentar antes de revelar. Se usa en `retroalimentacion-negativa`
(tapa el controlador) y en `fiebre-vs-hipertermia` (tapa el set point, que es justo la pieza
que distingue fiebre de hipertermia).

El set point entra por el comparador y no en serie con el controlador. Parece un detalle de
dibujo y no lo es: un diagrama mal trazado se aprende igual de bien que el texto.

Queda lo que no es un lazo: **vías metabólicas y curvas presión-volumen** siguen solo en prosa.
La regla vale igual para ellas — mostrar una relación y dejar que la pregunta pida lo que falta.

### P3 — Exportación a Anki ✅

Hecho el camino de texto, en `/practicar/tarjetas`. Se eligen los mazos y se descarga un
archivo que Anki importa sin configurar nada: trae cabeceras `#separator:tab`, `#html:true`,
`#deck column:3` y `#tags column:4`, y todo cuelga de un mazo raíz «Corpus».

Va separado por tabuladores y no por comas a propósito: los anversos llevan comas
constantemente y cada una sería una columna falsa. La lógica está en `lib/anki.ts`, con tests.

Queda `.apkg` si alguna vez importa exportar también el progreso. Hoy no: Anki reprograma las
tarjetas como nuevas, y eso está dicho en la propia interfaz.

### P4 — Casos clínicos 🟡

De 2 a 6. Los cuatro nuevos cubren sistemas distintos y escalan en dificultad:

- `joven-respiracion-profunda-y-rapida` — leer un trastorno ácido-base desde el par
  CO₂/bicarbonato, distinguir compensación de segundo trastorno, y llegar al hueco aniónico
  desde la electroneutralidad del plasma
- `lactante-enzimas-en-el-sitio-equivocado` — un resultado que parece imposible y se explica
  entero con el etiquetado de manosa-6-fosfato
- `corazon-de-atleta-o-enfermedad` — el mismo hallazgo con dos estímulos opuestos detrás; el
  único de dificultad avanzada, y termina explicitando dónde deja de valer el modelo mecánico
- `informe-lleno-de-palabras-desconocidas` — el decodificador aplicado, incluido el caso del
  epónimo, que es donde el método correctamente falla

**Faltan unos nueve** para llegar al objetivo. Los sistemas sin cubrir son los que aún no
tienen tema que los sostenga, y ese es el orden correcto: un caso sobre algo que la plataforma
no explica es un examen, no un ejercicio.

### P5 — Ruta personalizada ✅

El planificador vive en `/curriculum`. Se declaran horas semanales, semanas activas al año y
horas por crédito, y sale una tabla con duración y fecha estimada por bloque. La lógica está
en `lib/ruta.ts`, aparte del componente, con tests.

Es conservador por construcción y de tres maneras: estima por el extremo alto, descuenta una
fracción creciente de cada semana para el repaso acumulado, y no supone que se estudie las 52
semanas del año. Los tres supuestos son controles visibles en la interfaz, no constantes
escondidas: un plan cuyos supuestos no se ven es indistinguible de una promesa.

**Consecuencia incómoda y deliberada:** a 10 h/semana el currículum completo sale por encima
de los 25 años, y la interfaz lo dice sin suavizarlo. La aritmética está calibrada —a 40 h
semanales da unos 6 años, que es lo que dura la carrera— así que la cifra no es un error del
modelo. Es la información más útil que puede dar la herramienta antes de que alguien empiece.

### P6 — Tests ✅

127 tests en Vitest, corriendo en CI antes del despliegue:

- `tests/srs.test.ts` — escalera de intervalos, umbral de acierto en calidad 3, piso de 1.3
  en el factor de facilidad, vencimiento y que la proyección de los botones no mute el estado
- `tests/decodificar.test.ts` — la lógica del decodificador, extraída del componente a
  `lib/decodificar.ts` para poder probarla
- `tests/contenido.test.ts` — el estándar editorial hecho ejecutable, que era el más valioso
  de los tres

Escribirlos destapó **un defecto real en el decodificador**, ya corregido: 106 de los 249
morfemas usan la notación `cardi(o)-` para la vocal de unión opcional, y el código borraba el
paréntesis dejando solo la forma larga. «pericarditis» no reconocía su raíz. Ahora cada grupo
opcional se expande en sus dos formas, y dos piezas pueden compartir la vocal donde se sueldan
—una sola letra, y solo en el borde— porque esa vocal pertenece de verdad a las dos.

## 5. Deuda técnica conocida

- **`content/morfemas.ts` está generado** desde el CSV de Anki en `../anki/`. No hay script
  de regeneración versionado en el repo. Decidir cuál es la fuente de verdad y documentarlo.
- **`output: 'export'` rompe `/og`**, que necesita runtime. Si se opta por hosting estático
  puro, generar las imágenes Open Graph como archivos.
- **Sin i18n.** Todo hardcodeado en español. No es problema hoy, pero si se plantea inglés
  hay que extraer strings antes de que el contenido crezca.
- **Sin manejo de errores en `storage.ts`** más allá de try/catch silencioso. Si `localStorage`
  está lleno o bloqueado, falla en silencio. Al menos avisar al usuario.
- **El decodificador no maneja epónimos** (enfermedad de Crohn, signo de Babinski). Los
  detecta como «no reconocido», lo cual es correcto pero podría explicarse mejor.

## 6. Decisiones tomadas que conviene no revertir sin pensarlo

**Contenido como código.** Se consideró un CMS y se descartó. El tipo obliga a que un tema no
publique sin recall, sin errores y sin fuentes: la calidad editorial la impone el compilador.
Y cada corrección médica es un PR revisable con atribución.

**SM-2 en vez de FSRS.** FSRS es mejor algoritmo. SM-2 es auditable en 40 líneas por un
estudiante que quiera entender por qué verá una tarjeta en seis días. En una plataforma cuya
tesis es no engañar al usuario, esa legibilidad vale más que la eficiencia.

**Sin cuentas.** No hay base de datos que proteger, no hay consentimiento que pedir, el
hosting es gratis para siempre. El progreso se exporta a JSON.

**Componentes propios, no shadcn como dependencia.** Es lo que shadcn hace de todos modos.
Cuatro primitivos en el repo son menos deuda que una cadena de dependencias en un proyecto
que va a durar años.

**Las deudas prácticas en la interfaz.** No es un descargo legal, es parte del producto. El
riesgo real no es que alguien aprenda poco: es que confunda dominio teórico con competencia
clínica.

## 7. Contexto del proyecto padre

Esta plataforma vive dentro de un proyecto de estudio personal. El directorio superior
contiene el sistema del que salió el contenido:

- `../CLAUDE.md` — el rol del tutor y la filosofía pedagógica completa
- `../contexto/curriculum.md` — la fuente del reordenamiento en bloques
- `../contexto/metodo.md` — de donde salen `/metodo` y las reglas de tarjetas
- `../progreso/` — estado del estudio y bitácora de sesiones
- `../anki/` — los CSV que originaron `content/morfemas.ts`

**Riesgo registrado:** generar contenido para la plataforma no es estudiar. El contenido debe
salir como subproducto de sesiones de estudio reales, nunca como actividad sustituta. Un tema
escrito por alguien que acaba de aprenderlo es mejor que uno redactado en frío, y además evita
que el proyecto se coma el tiempo que debía ir al estudio.

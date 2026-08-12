# Corpus — instrucciones de proyecto

Plataforma abierta para estudiar medicina. Next.js 16 + TypeScript + Tailwind, todo estático,
sin base de datos. El contenido vive en módulos TypeScript tipados dentro de `content/`.

## Antes de tocar contenido médico, lee esto

Este proyecto tiene una regla que domina a todas las demás: **nunca inventes un dato clínico.**
Si no estás seguro de una cifra, un valor de referencia, un mecanismo o una guía, dilo y
búscalo. El usuario final de esta plataforma estudia sin profesor que lo corrija; un dato
inventado con tono seguro es el peor daño posible aquí.

Corolario: **no escribas con más certeza de la que tiene el campo.** Si algo es área de
investigación activa, el texto tiene que decirlo. Hay precedente en el repo — el papel del
microdaño en la hipertrofia muscular se presenta como debatido, no como resuelto.

Y no se aceptan dosis, esquemas terapéuticos ni protocolos de manejo. Corpus enseña
mecanismo, no prescribe.

## La tesis del producto

El objetivo no es que el lector entienda la explicación. Es que pueda **reconstruirla solo la
semana que viene**. Por eso ninguna página termina en un resumen: todas terminan en algo que
el usuario tiene que producir.

Si estás a punto de añadir una función que permite consumir contenido pasivamente sin
producir nada, esa función va en contra del producto. Verifícalo antes.

## Comandos

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # debe pasar antes de cualquier commit
npm run build:export  # sitio estático en out/ (lo que se publica)
npm run og            # regenera las imágenes Open Graph
npm run typecheck
npm test              # vitest
```

`npm test` incluye un smoke test que hace ejecutable el estándar de `CONTENIDO.md`:
comprueba que cada tema tenga recall con referencia calificable, errores con corrección
precisa, tarjetas, FAQ, fuentes y —si hay analogía— su `dondeSeRompe`. Un tema incompleto
no pasa CI.

`npm run build` es la verificación mínima. Genera 38+ páginas estáticas y corre TypeScript.

## Mapa

```
app/              Rutas App Router. Todas SSG salvo /og
components/       UI e interactivos
  ui/             Primitivos: button, card, badge, progress (patrones shadcn, código propio)
content/          TODO el contenido, tipado
  curriculum.ts   11 bloques, 74 unidades, deudas prácticas
  temas.ts        Temas: mecanismo, recall, perturbaciones, errores, tarjetas, FAQ
  morfemas.ts     249 morfemas + 19 distinciones + 35 descomposiciones (generado desde CSV)
  casos.ts        Casos clínicos por etapas
  recursos.ts     Bibliografía por bloque
lib/
  srs.ts          SM-2. Mantener legible: un estudiante debe poder auditarlo
  decodificar.ts  Descomposición de términos en morfemas. Lógica del decodificador
  storage.ts      localStorage, exportable a JSON. No añadir backend
  seo.ts          Metadata + generadores JSON-LD
  anki.ts         Exportación de tarjetas al formato de importación de Anki
  lazo.ts         Datos y calificación del diagrama de lazo de control
public/llms.txt   Capa GEO
```

## Cómo añadir un tema

Edita `content/temas.ts`. El tipo `Tema` obliga a los campos críticos — si compila, tiene
recall, errores y fuentes. Lee `CONTENIDO.md` antes de escribir el primero: define el estándar
editorial completo.

Resumen del estándar:

- **Prosa, no viñetas**, para mecanismos. Un mecanismo en bullets pierde la cadena causal, que
  es justo lo que lo hace entendible. Las listas son para listas reales.
- Si incluyes `analogia`, **`dondeSeRompe` es obligatorio**. Un andamio que no se retira se
  convierte en error conceptual permanente.
- `recall.referencia` debe ser lo bastante completa para que alguien se autocalifique contra
  ella con honestidad.
- Tarjetas: **una tarjeta, un hecho**, siempre de recuperación. Si la respuesta lleva comas
  enumerando, son varias tarjetas. «¿Qué es la glucólisis?» es mala tarjeta.
- `faq`: preguntas tal como se escriben en un buscador, respuestas autocontenidas. Sirven a
  SEO y a citación por modelos generativos.
- `deudaPractica` si el tema toca algo que requiere manos o pacientes.
- `diagrama` si el tema es un lazo de control. **Se dibuja con una pieza tapada**: un diagrama
  del mecanismo completo es la respuesta disfrazada. `aceptadas` debe incluir el propio valor
  de la incógnita y sus sinónimos reales; hay un test que lo comprueba.

Al añadir un tema, `generateStaticParams` lo recoge solo y entra al sitemap automáticamente.

## Convenciones

- Español. Término técnico en inglés cuando sea el estándar de la literatura.
- Sin emojis, sin entusiasmo decorativo, sin «¡excelente!».
- Tokens de color por variables CSS en `globals.css`. **No hardcodear colores** en componentes.
- Accesibilidad no es opcional: jerarquía de encabezados, `aria-label` en controles de icono,
  foco visible, contraste AA en ambos temas.
- Sin fuentes web externas. Pila del sistema a propósito.
- Componentes cliente solo cuando haya estado o efectos. Todo lo demás es servidor.

## Gotchas

- **Next 16: los `params` de página son `Promise`.** `async function Page({ params }: { params: Promise<{slug: string}> })` y luego `await params`.
- **Ya no existe la ruta `/og`.** Las imágenes Open Graph son archivos en `public/og/`
  generados por `npm run og`. `lib/og.ts` mapea ruta → archivo y es el contrato compartido
  entre el generador y `metaPagina`; si tocas el nombrado, tócalo en los dos lados.
  `public/og/` está en `.gitignore`: se regenera en cada build.
- **Al añadir un tema, bloque o caso hay que regenerar las OG** (`npm run og`). El build de
  despliegue ya lo hace, pero en local la imagen no aparece hasta que corras el script.
- **Rutas de metadatos con `output: export`** necesitan `export const dynamic = "force-static"`.
  Ya lo tienen `app/sitemap.ts` y `app/robots.ts`.
- **Canónicas y sitemap pasan por `urlAbs()`**, que fuerza la barra final. El export emite
  `ruta/index.html`, así que `/tema/x/` es la URL que el hosting sirve de verdad. No construyas
  URLs absolutas concatenando `SITIO.url` a mano.
- `content/morfemas.ts` está **generado** desde `../anki/2026-08-11_bloque0_morfemas-medicos.csv`.
  Si editas morfemas, decide si la fuente de verdad pasa a ser el TS y documéntalo.
- **El sitio vive en un Pages de proyecto**, bajo `/corpus`. Eso es `BASE_PATH` en
  `next.config.mjs` y `NEXT_PUBLIC_SITE_URL` en `lib/seo.ts`, ambos fijados en
  `.github/workflows/pages.yml`. Al pasar a dominio propio: `BASE_PATH` vacío y la URL nueva,
  en los dos sitios a la vez.
- `npm install` dentro de carpetas montadas en red es lentísimo. Si va a paso de tortuga,
  instala en un directorio local.

## Qué NO hacer

- No añadir cuentas, backend ni telemetría. Los datos de estudio son del estudiante.
- No añadir publicidad ni muros de pago.
- No añadir certificaciones ni nada que sugiera acreditación.
- No quitar las deudas prácticas de la interfaz. Son parte del producto, no un descargo legal.
- No instalar shadcn/ui como dependencia. Los primitivos viven en el repo a propósito.

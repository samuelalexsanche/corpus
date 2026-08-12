# Handoff — Corpus v0.1

Documento para retomar el desarrollo. Estado al 2026-08-11.

---

## 1. Estado actual

**Funciona.** `npm run build` genera 38 páginas estáticas, TypeScript estricto en verde,
cero errores, cero warnings. ~4,900 líneas en 44 archivos fuente. 396 KB sin `node_modules`.

| Área | Estado |
|---|---|
| Arquitectura y stack | ✅ Completo |
| Sistema de diseño | ✅ Completo (claro/oscuro, tokens, accesible) |
| Currículum | ✅ 11 bloques, 74 unidades |
| Temas desarrollados | 🟡 6 de ~74 unidades — **el cuello de botella** |
| Modos de estudio | ✅ 5 modos funcionando |
| SRS | ✅ SM-2 con persistencia local exportable |
| Casos clínicos | 🟡 2 |
| SEO técnico | ✅ Completo |
| GEO | ✅ llms.txt, JSON-LD, robots generativo |
| Documentación | ✅ 6 documentos |
| Tests | ❌ No hay. Ver tarea 6 |
| Despliegue | ❌ No desplegado |

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

### P0 — Desplegarlo

Sin esto nada de lo demás importa.

1. `git init`, repo en GitHub, licencia ya está (MIT + CC BY-SA).
2. Deploy en Vercel. Es gratis y el proyecto es estático.
3. Definir dominio y actualizar `SITIO.url` en `lib/seo.ts`. Ahora apunta a un placeholder
   (`corpus.study`) y de eso dependen canónicas, sitemap y JSON-LD.
4. Verificar con Rich Results Test que el JSON-LD valida.

**Aceptación:** el sitio carga en producción, `/sitemap.xml` y `/robots.txt` responden, y
Search Console no reporta errores de datos estructurados.

### P1 — Contenido del Bloque 0

Los cuatro temas que faltan para cerrar el andamiaje. Cada uno sigue el estándar de
`CONTENIDO.md` y se añade a `content/temas.ts`:

- `ph-pka-ionizacion` — por qué al pH de la sangre un carboxilo pierde su protón y un amino
  lo gana; buffers; introducción al equilibrio ácido-base
- `biologia-celular` — organelos, membranas, ciclo celular, tráfico vesicular
- `quiralidad` — por qué una enzima acepta una forma y rechaza su espejo
- `reacciones-del-metabolismo` — óxido-reducción, hidrólisis/condensación, fosforilación,
  isomerización; y cómo los nombres de las enzimas describen la reacción

**Aceptación:** cada tema con al menos 2 recall, 1 perturbación, 3 errores comunes, 4 tarjetas,
3 FAQ y fuentes citadas. `npm run build` pasa.

### P2 — Diagramas

El punto más débil de la interfaz. Los conceptos con forma —lazos de control, vías
metabólicas, curvas presión-volumen— están explicados solo en prosa.

Construir `components/diagrama-lazo.tsx`: SVG que renderice un lazo de control desde datos
(sensor, controlador, set point, efector) con la opción de ocultar una pieza y pedir al
usuario que la nombre. Reutilizable para termorregulación, glucemia, presión arterial.

**Regla de diseño:** un diagrama del mecanismo completo es la respuesta disfrazada. Debe
mostrar una relación y dejar que la pregunta pida lo que falta.

### P3 — Exportación a Anki

Alto valor y bajo esfuerzo. Botón que exporte cualquier selección de tarjetas a `.apkg` o al
CSV que Anki importa. Conecta la plataforma con la herramienta que la gente ya usa.

Empezar por CSV (trivial) y evaluar `.apkg` después.

### P4 — Casos clínicos

De 2 a ~15. El formato ya funciona; es trabajo de contenido. Escalar dificultad y cubrir
sistemas distintos. Un caso bien construido rinde más que diez páginas de texto.

### P5 — Ruta personalizada

El usuario declara horas semanales disponibles y recibe un plan conservador con fechas
realistas. La lógica de cálculo ya existe conceptualmente en `../progreso/plan-bloque0.md`:
horas semanales → duración por bloque, restando carga de repaso acumulada.

**Advertencia:** los planes optimistas producen abandono. Ser conservador y dejar holgura.

### P6 — Tests

No hay ninguno. Los que importan, en orden:

- `lib/srs.ts` — intervalos y factor de facilidad. Es la pieza con lógica real
- `components/term-decoder.tsx` — el algoritmo de cobertura sin solapamiento
- Un smoke test de que todos los temas cumplen su contrato (recall no vacío, fuentes no
  vacías, tarjetas con front y back)

Sugerencia: Vitest. El tercero es el más valioso — convierte el estándar editorial en algo
verificable por CI.

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
- `../contexto/curriculum.md` — la fuente del reordenamiento en 11 bloques
- `../contexto/metodo.md` — de donde salen `/metodo` y las reglas de tarjetas
- `../progreso/` — estado del estudio y bitácora de sesiones
- `../anki/` — los CSV que originaron `content/morfemas.ts`

**Riesgo registrado:** generar contenido para la plataforma no es estudiar. El contenido debe
salir como subproducto de sesiones de estudio reales, nunca como actividad sustituta. Un tema
escrito por alguien que acaba de aprenderlo es mejor que uno redactado en frío, y además evita
que el proyecto se coma el tiempo que debía ir al estudio.

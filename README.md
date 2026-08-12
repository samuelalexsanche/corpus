# Corpus

**Aprende medicina por mecanismo, no por memoria.**

Plataforma abierta y gratuita para estudiar medicina con recuperación activa, repetición
espaciada y razonamiento clínico. Sin cuentas, sin publicidad, sin rastreo.

---

## Por qué existe

Un plan de estudio largo no falla por falta de material. Falla por dos cosas: **olvido** y
**autoengaño**. Releer un capítulo lo hace *sentir* conocido sin hacerlo *estar* aprendido, y
sin exámenes la única señal disponible es esa sensación de familiaridad — que es un pésimo
predictor de dominio.

Corpus está construido entero alrededor de esa idea. Ninguna página termina en un resumen:
todas terminan en algo que tienes que producir tú.

## Qué lo diferencia

**El currículum está ordenado por dependencia conceptual, no por semestre.** Las 74 unidades
de la carrera reorganizadas en 11 bloques bajo una sola regla: nunca estudies un tema cuyo
«por qué» vive en un tema que aún no viste. Histología antes que embriología, embriología
antes que anatomía, fisiología antes que fisiopatología, farmacología después de ambas.

**Las analogías se retiran explícitamente.** Cada andamio conceptual —fisiología como teoría
de control, farmacología como perturbar un nodo— viene con una sección que dice dónde se
rompe. Un andamio que no se retira se convierte en error conceptual permanente.

**Los límites se declaran.** Hay una lista visible y permanente de lo que la plataforma no
puede enseñar: exploración física, procedimientos, juicio bajo incertidumbre real y
comunicación clínica. No está escondida en un pie de página, está en el currículum y en los
temas que la tocan. El riesgo real de estudiar medicina en pantalla no es aprender poco: es
confundir dominio teórico con competencia clínica.

## Modos de estudio

| Modo | Qué hace |
|---|---|
| **Repetición espaciada** | Algoritmo SM-2. Cada tarjeta reaparece cuando estás por olvidarla. Repasos vencidos siempre primero. |
| **Recall en frío** | Campo en blanco sin apuntes. Escribes el mecanismo, comparas con la referencia y te calificas 0–4. |
| **Casos por etapas** | El caso no avanza hasta que escribes tu razonamiento. Decidir con información incompleta es la condición real de la clínica. |
| **Decodificador de términos** | Escribe cualquier término médico y lo descompone en sus morfemas. 249 piezas indexadas. |
| **Predice la perturbación** | «¿Qué le pasa al sistema si lo empujo aquí?». Distingue entender de memorizar. |

## Stack

- **Next.js 16** (App Router, React 19, Turbopack) — SSG por defecto
- **TypeScript** estricto
- **Tailwind CSS 3** con sistema de tokens en variables CSS (claro/oscuro)
- **Componentes propios** siguiendo los patrones de shadcn/ui (Radix-compatible, sin dependencia)
- **Sin base de datos.** El contenido vive en módulos TypeScript tipados; el progreso, en `localStorage`

Contenido como código significa que cualquier corrección médica es un pull request revisable,
con historial y atribución.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run typecheck
```

Para desplegar como sitio estático (GitHub Pages, Netlify), descomenta `output: 'export'` en
`next.config.mjs`.

## Estructura

```
app/           Rutas (App Router)
components/    UI y componentes interactivos
  ui/          Primitivos: button, card, badge, progress
content/       Todo el contenido, tipado
  curriculum.ts   11 bloques, 74 unidades
  temas.ts        Temas con mecanismo, recall, perturbaciones, FAQ
  morfemas.ts     249 morfemas + distinciones + descomposiciones
  casos.ts        Casos clínicos por etapas
  recursos.ts     Bibliografía por bloque
lib/
  srs.ts       Repetición espaciada (SM-2)
  storage.ts   Persistencia local, exportable
  seo.ts       Metadata y JSON-LD
public/
  llms.txt     Descripción estructurada para motores generativos
```

## SEO y GEO

- Metadata dinámica y canónicas por ruta; Open Graph con imagen generada
- JSON-LD: `EducationalOrganization`, `Course`, `ScholarlyArticle`, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` y `robots.txt` generados desde el contenido
- `llms.txt` con principios editoriales explícitos para citación por modelos
- Rastreo permitido de forma explícita a motores generativos
- Contenido estructurado para extracción: FAQ reales, definiciones, encabezados semánticos

## Licencia

Código bajo **MIT**. Contenido bajo **CC BY-SA 4.0**.

## Aviso

Corpus es material educativo. No es consejo médico ni sustituye formación clínica supervisada.
Las conductas clínicas se rigen por guías vigentes (NOM, CENETEC, NICE, sociedades científicas)
que deben consultarse en su fuente primaria.

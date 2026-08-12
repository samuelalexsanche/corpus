# Arquitectura

## Principio rector

**El contenido es código.** No hay CMS ni base de datos: todo vive en módulos TypeScript
tipados dentro de `content/`. Esto no es una limitación, es una decisión:

- Cada corrección médica es un pull request revisable, con historial y atribución
- El tipo obliga a que un tema no se pueda publicar sin `recall`, sin `errores` y sin `fuentes`
- Todo el sitio se prerenderiza como HTML estático: rápido, indexable y desplegable en
  cualquier hosting gratuito

## Flujo de datos

```
content/*.ts  ──►  generateStaticParams  ──►  HTML estático prerenderizado
      │
      └──►  componentes cliente  ◄──►  localStorage (progreso del usuario)
```

No hay servidor de aplicación. El único cómputo en tiempo de ejecución es la generación de
imágenes Open Graph.

## Decisiones y por qué

**Componentes propios en vez de instalar shadcn/ui.** Se siguen sus patrones —`cva` para
variantes, `forwardRef`, composición sobre configuración, tokens en variables CSS— pero el
código vive en el repo. En un proyecto de contenido que va a durar años, cuatro primitivos
propios son menos deuda que una cadena de dependencias.

**Tokens en HSL sobre variables CSS.** El tema claro/oscuro se resuelve con una clase en
`<html>`, sin parpadeo y sin JavaScript bloqueante.

**SM-2 y no un algoritmo más moderno.** SM-2 es transparente, auditable en 40 líneas y
suficientemente bueno. Un estudiante puede leer `lib/srs.ts` y entender exactamente por qué
verá una tarjeta en seis días. Esa legibilidad importa más aquí que un par de puntos de
eficiencia.

**localStorage y no cuentas.** Los datos de estudio son del estudiante. Sin cuentas no hay
base de datos que proteger, no hay que pedir consentimiento, y el proyecto puede vivir en
hosting estático indefinidamente sin coste. Se puede exportar e importar como JSON.

## Capa SEO / GEO

`lib/seo.ts` centraliza metadata y generadores JSON-LD. Cada tipo de página emite el schema
que le corresponde: `Course` para bloques, `ScholarlyArticle` más `FAQPage` para temas,
`BreadcrumbList` en todas.

La capa GEO —optimización para motores generativos— asume que una parte creciente del
descubrimiento ocurrirá vía modelos y no vía buscadores. En consecuencia:

- `llms.txt` describe el sitio y **sus principios editoriales**, para que un modelo que cite
  el contenido pueda transmitir también sus límites
- Los FAQ están escritos como respuestas autocontenidas y extraíbles, no como teasers
- El contenido declara explícitamente cuándo algo es debatido, para no ser citado con más
  certeza de la que tiene
- `robots.ts` permite el rastreo generativo de forma explícita

## Accesibilidad

Encabezados jerárquicos, `aria-current` en navegación, `aria-label` en controles de icono,
enlace de salto al contenido, foco visible con anillo de dos píxeles, objetivos táctiles de
al menos 36 px y respeto a `prefers-reduced-motion`. El contraste de los tokens está fijado
para cumplir WCAG AA en ambos temas.

## Rendimiento

Todo estático salvo `/og`. Sin fuentes web externas: se usa la pila del sistema, que elimina
una petición bloqueante y el desplazamiento de layout. Los iconos son SVG por importación
directa, sin sprite ni fuente de iconos.

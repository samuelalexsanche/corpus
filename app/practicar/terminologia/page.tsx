import { TermDecoder, MorfemaExplorer } from "@/components/term-decoder";
import { MORFEMAS, DISTINCIONES } from "@/content/morfemas";
import { JsonLd } from "@/components/jsonld";
import { ldFAQ, metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Decodificador de terminología médica",
  descripcion: `Descompón cualquier término médico en sus prefijos, raíces y sufijos. ${MORFEMAS.length} morfemas griegos y latinos con significado y ejemplos. Gratuito.`,
  ruta: "/practicar/terminologia",
  keywords: ["terminología médica", "prefijos y sufijos médicos", "raíces griegas y latinas medicina", "descomponer términos médicos", "significado sufijo itis"],
});

const FAQ = [
  { q: "¿Cómo se descompone un término médico?", a: "Se lee empezando por el sufijo, que indica qué está pasando; después el prefijo, que indica posición, cantidad o grado; y al final la raíz, que nombra el órgano. Pericarditis se lee: itis (inflamación), peri (alrededor), card (corazón)." },
  { q: "¿Cuántos morfemas médicos hay que aprender?", a: "Con unos 300 a 400 morfemas de alta frecuencia se descompone la enorme mayoría del vocabulario médico. Es un sistema cerrado de piezas combinables, no una lista infinita." },
  { q: "¿Qué diferencia hay entre -itis y -osis?", a: "-itis indica inflamación activa; -osis indica una condición o proceso, frecuentemente degenerativo o de aumento. Artritis es inflamación articular; artrosis es degeneración articular." },
];

export default function TerminologiaPage() {
  return (
    <>
      <JsonLd data={ldFAQ(FAQ)} />
      <div className="container max-w-4xl py-14">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Decodificador de terminología médica</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          El vocabulario médico no es una lista que se memoriza: es un sistema de composición. Escribe cualquier
          término y verás de qué piezas está hecho.
        </p>

        <div className="mt-10"><TermDecoder /></div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Las distinciones que más rinden</h2>
          <p className="mt-2 text-muted-foreground">Son las que más errores evitan porque los morfemas se parecen entre sí.</p>
          <div className="mt-6 space-y-4">
            {DISTINCIONES.map((d) => (
              <details key={d.q} className="rounded-xl border border-border bg-card p-5">
                <summary className="cursor-pointer font-medium">{d.q}</summary>
                <p className="mt-3 border-t border-border pt-3 text-[15px] leading-relaxed">{d.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Todos los morfemas</h2>
          <div className="mt-6"><MorfemaExplorer /></div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

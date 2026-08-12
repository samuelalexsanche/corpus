import { SesionExplicar, type PromptExplicar } from "@/components/sesion-explicar";
import { TEMAS } from "@/content/temas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Explícalo en voz alta",
  descripcion:
    "Explica un mecanismo en tres minutos, en voz alta y a alguien que no estudia medicina. Después compara con la referencia. La técnica que expone los huecos que la lectura esconde.",
  ruta: "/practicar/explicar",
  keywords: ["técnica Feynman medicina", "explicar en voz alta estudiar", "aprender explicando"],
});

const prompts: PromptExplicar[] = TEMAS.flatMap((t) =>
  t.recall.map((r) => ({
    pregunta: r.pregunta,
    referencia: r.referencia,
    tema: t.titulo,
    temaSlug: t.slug,
  }))
);

export default function ExplicarPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Explícalo en voz alta</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Tres minutos, hablando, sin apuntes y dirigido a alguien que no estudia medicina. Cuando se
        acabe el tiempo, compara lo que dijiste con la referencia.
      </p>
      <p className="mt-4 max-w-2xl rounded-lg border-l-2 border-primary bg-primary/[0.05] p-4 text-sm leading-relaxed">
        En voz alta no se puede volver atrás a arreglar la frase, contra reloj no da tiempo a rodear
        lo que no se sabe, y dirigirlo a alguien de fuera impide esconderse detrás del vocabulario.
        Decir «hipertrofia concéntrica» no demuestra nada; explicárselo a tu hermano, sí.
      </p>
      <div className="mt-10">
        <SesionExplicar prompts={prompts} />
      </div>
    </div>
  );
}

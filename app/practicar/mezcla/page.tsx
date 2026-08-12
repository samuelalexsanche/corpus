import { FlashcardSession } from "@/components/flashcard-session";
import { TODAS_LAS_CARTAS as cartas } from "@/lib/cartas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Repaso mezclado",
  descripcion:
    "Tarjetas de temas distintos alternadas a propósito en vez de agrupadas por materia. Se siente más difícil que estudiar por bloques, y ese es justamente el motivo por el que funciona mejor.",
  ruta: "/practicar/mezcla",
  keywords: ["repaso intercalado", "interleaving estudio", "estudiar temas mezclados"],
});

export default function MezclaPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Repaso mezclado</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Las mismas {cartas.length} tarjetas, pero alternando temas en lugar de agruparlos. Nunca dos
        seguidas de la misma materia mientras haya alternativa.
      </p>
      <p className="mt-4 max-w-2xl rounded-lg border-l-2 border-accent bg-accent/[0.05] p-4 text-sm leading-relaxed">
        <strong className="font-semibold">Aviso, para que no lo interpretes mal:</strong> esto se
        siente peor. Vas a fallar más y a ir más lento que estudiando por bloques. La razón es que al
        repetir dentro de un mismo tema no tienes que decidir qué clase de problema tienes delante,
        porque ya lo sabes, y esa decisión es la que hay que entrenar: un paciente no llega
        etiquetado con el capítulo al que pertenece. La dificultad extra es la señal de que está
        funcionando, no de que no.
      </p>
      <div className="mt-10">
        <FlashcardSession cartas={cartas} intercalado />
      </div>
    </div>
  );
}

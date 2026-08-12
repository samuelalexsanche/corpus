import { FlashcardSession } from "@/components/flashcard-session";
import { ExportarAnki } from "@/components/exportar-anki";
import { TODAS_LAS_CARTAS as cartas } from "@/lib/cartas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Tarjetas con repetición espaciada",
  descripcion: "Practica medicina con flashcards de recuperación activa y repetición espaciada. Terminología, fisiología y patología. Gratis, sin cuenta, guardado en tu navegador.",
  ruta: "/practicar/tarjetas",
  keywords: ["flashcards medicina", "anki medicina español", "repetición espaciada", "tarjetas terminología médica"],
});

export default function TarjetasPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Tarjetas</h1>
      <p className="mt-3 text-muted-foreground">
        {cartas.length} tarjetas. Los repasos vencidos van primero, siempre. Tu progreso se guarda solo en este
        navegador: no hay cuentas ni servidor.
      </p>
      <div className="mt-10">
        <FlashcardSession cartas={cartas} />
      </div>
      <div className="mt-14">
        <ExportarAnki cartas={cartas} />
      </div>
    </div>
  );
}

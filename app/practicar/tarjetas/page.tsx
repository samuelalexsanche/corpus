import { FlashcardSession, CartaBase } from "@/components/flashcard-session";
import { ExportarAnki } from "@/components/exportar-anki";
import { TEMAS } from "@/content/temas";
import { MORFEMAS, DISTINCIONES, DESCOMPOSICIONES } from "@/content/morfemas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Tarjetas con repetición espaciada",
  descripcion: "Practica medicina con flashcards de recuperación activa y repetición espaciada. Terminología, fisiología y patología. Gratis, sin cuenta, guardado en tu navegador.",
  ruta: "/practicar/tarjetas",
  keywords: ["flashcards medicina", "anki medicina español", "repetición espaciada", "tarjetas terminología médica"],
});

const cartas: CartaBase[] = [
  ...MORFEMAS.map((m, i) => ({ id: `morf-${i}`, front: `¿Qué significa el morfema ${m.m}?`, back: `${m.sig}.<br><em>Ej.: ${m.ej}</em>`, mazo: "Terminología · morfemas" })),
  ...DISTINCIONES.map((d, i) => ({ id: `dist-${i}`, front: d.q, back: d.a, mazo: "Terminología · distinciones" })),
  ...DESCOMPOSICIONES.map((d, i) => ({ id: `desc-${i}`, front: `Descompón el término: <strong>${d.t}</strong>`, back: d.d, mazo: "Terminología · descomposición" })),
  ...TEMAS.flatMap((t) => t.tarjetas.map((c, i) => ({ id: `${t.slug}-${i}`, front: c.front, back: c.back, mazo: t.titulo }))),
];

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

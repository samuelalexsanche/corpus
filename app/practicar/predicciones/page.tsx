import Link from "next/link";
import { Zap } from "lucide-react";
import { TEMAS } from "@/content/temas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Predice qué pasa",
  descripcion: "Ejercicios de predicción: qué le ocurre al cuerpo si cambias una pieza del mecanismo. El formato que distingue entender de memorizar.",
  ruta: "/practicar/predicciones",
  keywords: ["fisiología ejercicios", "razonamiento fisiológico", "predecir mecanismo", "estudiar fisiología"],
});

export default function PrediccionesPage() {
  const items = TEMAS.flatMap((t) => (t.predicciones ?? []).map((p) => ({ ...p, tema: t })));
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
        <Zap className="h-7 w-7 text-accent" /> Predice qué pasa
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Entender un mecanismo no es poder recitarlo: es poder decir qué le pasa al sistema cuando lo empujas en un
        punto que nunca te enseñaron. Responde en tu cabeza antes de abrir cada tarjeta.
      </p>

      <div className="mt-10 space-y-4">
        {items.map((p, i) => (
          <details key={i} className="group rounded-xl border border-border bg-card p-6">
            <summary className="cursor-pointer list-none">
              <Link href={`/tema/${p.tema.slug}`} className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-primary">
                {p.tema.titulo}
              </Link>
              <span className="mt-3 block text-sm text-muted-foreground">{p.escenario}</span>
              <span className="mt-2 block font-medium leading-snug">{p.pregunta}</span>
              <span className="mt-3 inline-block text-sm font-medium text-primary group-open:hidden">
                Formula tu respuesta, luego abre →
              </span>
            </summary>
            <p className="mt-4 border-t border-border pt-4 text-[15px] leading-relaxed">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

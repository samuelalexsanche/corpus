import Link from "next/link";
import { RecallCard } from "@/components/recall-card";
import { TEMAS } from "@/content/temas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Recall en frío",
  descripcion: "Reconstruye mecanismos de medicina de memoria, sin apuntes, y califícate en una escala honesta de dominio del 0 al 4.",
  ruta: "/practicar/recall",
  keywords: ["recall activo", "recuperación activa medicina", "estudiar sin apuntes", "técnica Feynman medicina"],
});

export default function RecallPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Recall en frío</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Sin apuntes, sin la pestaña del tema abierta, sin pistas salvo que las pidas. Escribe el mecanismo completo
        y después compara. La regla de la escala: <strong className="text-foreground">un tema no cuenta como
        terminado por debajo de 3</strong>, y la mayoría de la gente se detiene en 1 creyendo que va en 3.
      </p>

      <div className="mt-10 space-y-12">
        {TEMAS.map((t) => (
          <section key={t.slug}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Link href={`/tema/${t.slug}`} className="hover:text-primary">{t.titulo}</Link>
            </h2>
            <div className="mt-4 space-y-5">
              {t.recall.map((r, i) => <RecallCard key={i} {...r} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

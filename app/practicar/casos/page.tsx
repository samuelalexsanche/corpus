import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CASOS } from "@/content/casos";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Casos clínicos por etapas",
  descripcion: "Casos clínicos educativos que se revelan por partes y te obligan a comprometer un razonamiento antes de darte el siguiente dato.",
  ruta: "/practicar/casos",
  keywords: ["casos clínicos", "viñetas clínicas", "razonamiento clínico", "casos clínicos resueltos para estudiar"],
});

export default function CasosPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Casos clínicos</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Cada caso se revela por etapas y no avanza hasta que escribes tu razonamiento. Eso es deliberado: el valor
        del formato está en obligarte a decidir con información incompleta, que es la condición real de la clínica.
      </p>
      <ul className="mt-10 space-y-4">
        {CASOS.map((c) => (
          <li key={c.slug}>
            <Link href={`/practicar/casos/${c.slug}`}
              className="group flex items-start justify-between gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{c.dificultad}</Badge>
                  <Badge variant="outline">{c.minutos} min</Badge>
                  <Badge variant="outline">{c.etapas.length} etapas</Badge>
                </div>
                <h2 className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-primary">{c.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.resumen}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

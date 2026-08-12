import { Badge } from "@/components/ui/badge";
import { RECURSOS, REGLA_RECURSOS } from "@/content/recursos";
import { BLOQUES } from "@/content/curriculum";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Recursos para estudiar medicina",
  descripcion: "Libros columna, atlas, video y bancos de preguntas por bloque, con criterio de selección y alternativas gratuitas señaladas.",
  ruta: "/recursos",
  keywords: ["mejores libros de medicina", "libros para estudiar medicina", "recursos gratuitos medicina", "qué libro de fisiología"],
});

export default function RecursosPage() {
  return (
    <div className="container max-w-4xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Recursos</h1>
      <p className="mt-5 max-w-2xl rounded-xl border-l-2 border-accent bg-accent/5 p-5 leading-relaxed">
        {REGLA_RECURSOS}
      </p>

      <div className="mt-12 space-y-12">
        {BLOQUES.map((b) => {
          const rs = RECURSOS.filter((r) => r.bloques.includes(b.slug));
          if (!rs.length) return null;
          return (
            <section key={b.slug}>
              <h2 className="text-xl font-semibold tracking-tight">
                <span className="mr-2 text-muted-foreground">Bloque {b.numero}</span>{b.titulo}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {rs.map((r) => (
                  <li key={r.titulo} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={r.rol === "columna" ? "default" : "secondary"}>{r.rol}</Badge>
                      {r.gratuito && <Badge variant="success">gratis</Badge>}
                    </div>
                    <p className="mt-3 font-medium leading-snug">{r.titulo}</p>
                    {r.autor && <p className="text-sm text-muted-foreground">{r.autor}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.nota}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

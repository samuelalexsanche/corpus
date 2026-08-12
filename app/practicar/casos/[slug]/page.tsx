import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CASOS, getCaso } from "@/content/casos";
import { getTema } from "@/content/temas";
import { CasoRunner } from "@/components/caso-runner";
import { metaPagina } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return CASOS.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaso(slug);
  if (!c) return {};
  return metaPagina({ titulo: c.titulo, descripcion: c.resumen, ruta: `/practicar/casos/${c.slug}`, tipo: "article" });
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaso(slug);
  if (!c) notFound();

  return (
    <div className="container max-w-3xl py-14">
      <Link href="/practicar/casos" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Casos
      </Link>
      <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight">{c.titulo}</h1>
      <p className="mt-3 text-muted-foreground">{c.resumen}</p>

      <div className="mt-10"><CasoRunner caso={c} /></div>

      {c.temasRelacionados.length > 0 && (
        <div className="mt-10 rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold">Si algo de este caso no te salió</p>
          <ul className="mt-3 space-y-2">
            {c.temasRelacionados.map((r) => {
              const t = getTema(r);
              return t ? <li key={r}><Link href={`/tema/${r}`} className="text-sm text-primary hover:underline">{t.titulo}</Link></li> : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

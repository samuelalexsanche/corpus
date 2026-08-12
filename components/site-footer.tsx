import Link from "next/link";
import { SITIO } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-base font-semibold">Corpus</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Plataforma abierta para estudiar medicina con recuperación activa y repetición espaciada.
            Código y contenido libres. Sin cuentas, sin rastreo, sin publicidad.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Estudiar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/curriculum" className="hover:text-foreground">Currículum</Link></li>
            <li><Link href="/practicar" className="hover:text-foreground">Modos de práctica</Link></li>
            <li><Link href="/recursos" className="hover:text-foreground">Recursos</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Proyecto</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/metodo" className="hover:text-foreground">Método</Link></li>
            <li><Link href="/sobre" className="hover:text-foreground">Sobre Corpus</Link></li>
            <li><a href={SITIO.repo} className="hover:text-foreground" rel="noopener">Código fuente</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="container py-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Aviso:</strong> Corpus es material educativo. No es consejo médico
            ni sustituye la formación clínica supervisada, la exploración física ni el juicio de un profesional.
            Las conductas clínicas se rigen por guías vigentes que deben consultarse en su fuente primaria.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Licencia MIT (código) · CC BY-SA 4.0 (contenido)</p>
        </div>
      </div>
    </footer>
  );
}

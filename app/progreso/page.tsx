import { ProgresoPanel } from "@/components/progreso-panel";
import { TEMAS } from "@/content/temas";
import { MORFEMAS, DISTINCIONES, DESCOMPOSICIONES } from "@/content/morfemas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Mi progreso",
  descripcion: "Estadísticas de tu estudio: tarjetas vistas, vencidas, maduras y racha. Todo guardado localmente en tu navegador.",
  ruta: "/progreso",
});

const total = MORFEMAS.length + DISTINCIONES.length + DESCOMPOSICIONES.length + TEMAS.reduce((n, t) => n + t.tarjetas.length, 0);

export default function ProgresoPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Mi progreso</h1>
      <p className="mt-3 text-muted-foreground">Sin cuentas. Sin servidor. Solo este navegador.</p>
      <div className="mt-10"><ProgresoPanel totalCartas={total} /></div>
    </div>
  );
}

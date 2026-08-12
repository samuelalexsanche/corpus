import { Buscador } from "@/components/buscador";
import { construirIndice } from "@/lib/indice";
import { TOTAL_UNIDADES } from "@/content/curriculum";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Buscar",
  descripcion:
    "Busca cualquier materia, tema o término médico y empieza a estudiarlo. Todas las unidades de la carrera están indexadas, con lo que hay disponible de cada una.",
  ruta: "/buscar",
  keywords: ["buscar tema de medicina", "materias de medicina", "estudiar un tema concreto"],
});

// El índice se arma en el build y viaja como datos al componente cliente: no
// hay servidor de búsqueda detrás, igual que no hay servidor de nada más.
const indice = construirIndice();

export default function BuscarPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Buscar</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Las {TOTAL_UNIDADES} unidades de la carrera están aquí, junto con los temas escritos, los
        casos y los {indice.filter((e) => e.tipo === "morfema").length} morfemas del decodificador.
        Si una unidad todavía no tiene tema desarrollado, la encontrarás igual y te dirá qué hay
        para estudiarla mientras tanto.
      </p>
      <div className="mt-8">
        <Buscador indice={indice} />
      </div>
    </div>
  );
}

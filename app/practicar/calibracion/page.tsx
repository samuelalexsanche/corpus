import { SesionCalibracion } from "@/components/sesion-calibracion";
import { TODAS_LAS_CARTAS } from "@/lib/cartas";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Calibración: ¿sabes cuándo sabes?",
  descripcion:
    "Declara tu confianza antes de ver cada respuesta y comprueba si predice tus aciertos. Detecta el exceso de confianza, que es el modo de falla peligroso al estudiar medicina.",
  ruta: "/practicar/calibracion",
  keywords: ["exceso de confianza al estudiar", "calibración estudio medicina", "metacognición"],
});

export default function CalibracionPage() {
  return (
    <div className="container max-w-3xl py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Calibración</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Antes de ver cada respuesta dices qué probabilidad tienes de acertar. Al final se compara lo
        que dijiste con lo que pasó. Lo que se mide no es cuánto sabes, sino si sabes cuándo lo sabes.
      </p>
      <p className="mt-4 max-w-2xl rounded-lg border-l-2 border-accent bg-accent/[0.05] p-4 text-sm leading-relaxed">
        Por qué esto importa más de lo que parece: alguien que falla y lo sabe vuelve al tema, y
        alguien que falla sintiéndose seguro no vuelve nunca. El segundo caso es el que produce
        errores en la práctica, y ningún examen que solo cuente respuestas correctas lo detecta.
      </p>
      <div className="mt-10">
        <SesionCalibracion cartas={TODAS_LAS_CARTAS} />
      </div>
    </div>
  );
}

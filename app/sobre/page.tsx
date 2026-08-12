import Link from "next/link";
import { SITIO, metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  titulo: "Sobre Corpus",
  descripcion: "Qué es Corpus, por qué es abierto, qué puede y qué no puede enseñarte, y cómo contribuir.",
  ruta: "/sobre",
});

export default function SobrePage() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Sobre Corpus</h1>
      <div className="prose-medical mt-8">
        <p>
          Corpus nació de un proyecto personal: alguien que va a entrar a medicina y decidió construir la base
          teórica antes, con un tutor y un sistema de estudio en lugar de una pila de PDFs. La plataforma es ese
          sistema, abierto para cualquiera.
        </p>
        <p>
          No pretende sustituir una facultad. Pretende ser el lugar donde un tema se entiende por mecanismo y se
          practica hasta poder reconstruirlo solo. Sirve igual para quien empieza desde cero que para quien está
          en tercer semestre y quiere repasar fisiopatología renal un martes por la noche.
        </p>
        <h2>Principios</h2>
        <p>
          <strong>Producción sobre consumo.</strong> Ninguna página termina en un resumen. Todas terminan en algo
          que tienes que generar tú.
        </p>
        <p>
          <strong>Honestidad sobre los límites.</strong> Hay una lista visible y permanente de lo que esto no
          puede enseñar: exploración física, procedimientos, juicio bajo incertidumbre real y comunicación
          clínica. No está escondida en un pie de página.
        </p>
        <p>
          <strong>Nada inventado.</strong> El contenido cita su fuente. Cuando algo es área de investigación
          activa y no un hecho cerrado, se dice así.
        </p>
        <p>
          <strong>Sin extracción.</strong> No hay cuentas, ni rastreo, ni publicidad, ni venta de datos. Tu
          progreso se guarda en tu navegador y puedes exportarlo o borrarlo cuando quieras.
        </p>
        <h2>Licencia y contribución</h2>
        <p>
          Código bajo MIT, contenido bajo CC BY-SA 4.0. Las contribuciones de contenido médico requieren cita a
          fuente primaria. El repositorio está en{" "}
          <a href={SITIO.repo} rel="noopener">GitHub</a>.
        </p>
      </div>
      <p className="mt-10 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
        Corpus es material educativo y no constituye consejo médico. Si tienes una preocupación de salud, consulta
        a un profesional. Ver el <Link href="/curriculum" className="text-primary hover:underline">currículum</Link>{" "}
        y las deudas prácticas declaradas.
      </p>
    </div>
  );
}

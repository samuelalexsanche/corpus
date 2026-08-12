"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const guardado = localStorage.getItem("corpus.tema");
    const inicial = guardado ? guardado === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(inicial);
    document.documentElement.classList.toggle("dark", inicial);
  }, []);
  const alternar = () => {
    const n = !dark; setDark(n);
    document.documentElement.classList.toggle("dark", n);
    localStorage.setItem("corpus.tema", n ? "dark" : "light");
  };
  return (
    <button onClick={alternar} aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

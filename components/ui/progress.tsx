import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ value = 0, className, label }: { value?: number; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progreso"}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    >
      <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out" style={{ width: `${v}%` }} />
    </div>
  );
}

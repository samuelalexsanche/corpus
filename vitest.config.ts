import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // El alias replica el `paths` de tsconfig.json. Se declara a mano en vez de
  // con un plugin para no arrastrar una dependencia por dos líneas.
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});

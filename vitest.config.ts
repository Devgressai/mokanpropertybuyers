import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // Components use the automatic JSX runtime (no `import React` in scope),
  // same as Next's SWC compiler. Without this, esbuild's default classic
  // transform emits `React.createElement` and throws "React is not defined".
  esbuild: {
    jsx: "automatic",
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});

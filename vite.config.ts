import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import type { ViteReactSSGOptions } from "vite-react-ssg";
import { finalizeBuild } from "./scripts/finalize-build";

const ssgOptions: ViteReactSSGOptions = {
  entry: "src/main.tsx",
  // /stores/dsw -> dist/stores/dsw/index.html, served at /stores/dsw/ (vercel.json trailingSlash: true)
  dirStyle: "nested",
  script: "async",
  onFinished: (dir) => finalizeBuild(dir),
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist", sourcemap: false, target: "es2022", chunkSizeWarningLimit: 800 },
  ssgOptions,
} as Parameters<typeof defineConfig>[0] & { ssgOptions: ViteReactSSGOptions });

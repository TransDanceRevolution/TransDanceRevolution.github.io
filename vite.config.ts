import { cjsInterop } from "vite-plugin-cjs-interop"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import mdx from "@mdx-js/rollup"

export default defineConfig({
  plugins: [
    cjsInterop({
      dependencies: [
        "@remark-embedder/core",
        "@remark-embedder/transformer-oembed",
      ],
    }),
    tailwindcss(),
    mdx(),
    reactRouter(),
    tsconfigPaths(),
  ],
})

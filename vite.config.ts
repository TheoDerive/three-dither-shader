import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl"


export default defineConfig({
  plugins: [glsl({
    include: "**/**.glsl"
  })],
  build: {
    rollupOptions: {
      external: ["three"],
      output: {
        globals: {
          three: "THREE"
        }
      }
    }
  }
})

/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/caderno-de-receitas/",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      strategies: "generateSW",
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "og-cover.png", "images/*.webp"],
      manifest: {
        name: "Caderno de Receitas",
        short_name: "Caderno",
        description: "Catálogo de receitas brasileiras com fontes e créditos de imagem.",
        lang: "pt-BR",
        start_url: "/caderno-de-receitas/",
        scope: "/caderno-de-receitas/",
        display: "standalone",
        background_color: "#f7f2e8",
        theme_color: "#174b85",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: "/caderno-de-receitas/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,webp,json,xml,txt}"]
      }
    })
  ],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true
  }
});

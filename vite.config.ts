import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    srcDir: 'src',
    filename: 'push-service-worker.js',
    manifest: {
      "theme_color": "#004C45",
      "background_color": "#F98F45",
      "display": "standalone",
      "scope": "/",
      "start_url": "/",
      "name": "MindGuardians",
      "short_name": "MindGuardians",
      "description": "MindGuardians, l\'application qui accompagne les personnes atteintes de la maladie d\'Alzheimer.",
      "icons": [
        {
          "src": "/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://dateapi.onrender.com',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'currentDate',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }), sentryVitePlugin({
    org: "mind-guardians",
    project: "mind-guardians-front"
  })],

  build: {
    sourcemap: true
  }
})
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'GHOST × SOILSKIN',
        short_name: 'GHOST',
        description:
          'Soil Transition Intelligence — from soil sensing to soil regeneration.',
        theme_color: '#1f4d36',
        background_color: '#f7f5ef',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
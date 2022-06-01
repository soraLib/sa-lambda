import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import replace from '@rollup/plugin-replace'
import { VitePWA } from 'vite-plugin-pwa'
import { version } from '../package.json'

export default defineConfig({
  build: {
    ssrManifest: false,
    manifest: false
  },
  optimizeDeps: {
    exclude: [
      'vue-global-api',
      '@vueuse/core'
    ]
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    replace({
      preventAssignment: true,
      __PWA_VERSION__: version
    }),

    Components({
      dirs: [
        '.vitepress/theme/components'
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // generate `components.d.ts` for ts support with Volar
      dts: false,
      // auto import icons
      resolvers: [
        IconsResolver({
          componentPrefix: ''
          // enabledCollections: ['carbon'],
        })
      ]
    }),
    Icons(),
    WindiCSS(),
    VitePWA({
      outDir: '.vitepress/dist',
      registerType: 'prompt',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'safari-pinned-tab.svg',
        'banner_light.svg',
        'banner_dark.svg',
        'icon_light.svg',
        'icon_dark.svg',
        'prompt-update.png'
      ],
      manifest: {
        id: '/',
        name: 'Sa Lambda',
        short_name: 'Sa Lambda',
        description: 'Typescript library for functional programming.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon_light.svg',
            sizes: '155x155',
            type: 'image/svg',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
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
    })
  ]
})

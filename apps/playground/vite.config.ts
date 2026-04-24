import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import vuePlugin from '@vitejs/plugin-vue'
import json5Plugin from 'vite-plugin-json5'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), vuePlugin(), json5Plugin({
    dts: {
      literals: true,
    },
  })],
  resolve: {
    alias: {
      '@fixtures': resolve(__dirname, '../../packages/vite-plugin-json5/tests/json'),
    },
  },
})

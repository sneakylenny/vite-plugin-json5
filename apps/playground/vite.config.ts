import { resolve } from 'path'
import vuePlugin from '@vitejs/plugin-vue'
import json5Plugin from 'vite-plugin-json5'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vuePlugin(), json5Plugin({
    dts: {
      literals: true
    }
  })],
  resolve: {
    alias: {
      '@fixtures': resolve(__dirname, '../../packages/vite-plugin-json5/tests/json')
    }
  }
})

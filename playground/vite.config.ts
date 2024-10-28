import vuePlugin from '@vitejs/plugin-vue'
import json5Plugin from '../src'
import inspectPlugin from 'vite-plugin-inspect'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vuePlugin(), json5Plugin({
    typesDir: './playground/src/types'
  }), inspectPlugin()]
})

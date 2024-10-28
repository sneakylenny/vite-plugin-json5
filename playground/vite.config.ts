import vuePlugin from '@vitejs/plugin-vue'
import json5Plugin from '../dist'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vuePlugin(), json5Plugin()]
})

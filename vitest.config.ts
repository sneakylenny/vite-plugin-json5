import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import json5Plugin from './src'

export default defineConfig({
  plugins: [
    vue(),
    json5Plugin({
      typesDir: './types/generated'
    })
  ],
  test: {
    environment: 'happy-dom' // Set the test environment to 'happy-dom'
  }
})

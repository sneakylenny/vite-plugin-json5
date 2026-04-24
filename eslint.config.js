// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  tseslint.configs.strict,
  eslintPluginVue.configs['flat/recommended'],
  stylistic.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    ignores: ['**/dist/**/*'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    }
  },
  globalIgnores(['**/dist/**/*']),
])

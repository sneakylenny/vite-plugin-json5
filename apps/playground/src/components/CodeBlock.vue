<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-one-dark.css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-json5'

const props = withDefaults(defineProps<{
  code: string
  language?: string
}>(), {
  language: 'json',
})

const highlighted = computed(() => {
  const lang = props.language === 'jsonc' ? 'json5' : props.language
  const grammar = Prism.languages[lang] ?? Prism.languages.plain
  return Prism.highlight(props.code, grammar, lang)
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <pre class="rounded-lg overflow-x-auto text-sm leading-relaxed p-4 m-0"><code
    :class="`language-${language}`"
    v-html="highlighted"
  /></pre>
  <!-- eslint-enable vue/no-v-html -->
</template>

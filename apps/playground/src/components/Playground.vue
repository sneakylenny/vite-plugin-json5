<script setup lang="ts">
import JsoncShowcase from './JsoncShowcase.vue'
import Json5Showcase from './Json5Showcase.vue'
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <header class="mb-14 text-center">
      <div class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-400 font-mono">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        vite-plugin-json5
      </div>
      <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">
        Playground
      </h1>
      <p class="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto">
        Import
        <code class="text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm">.json5</code>
        and
        <code class="text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm">.jsonc</code>
        files natively in Vite — with full named export support.
      </p>
    </header>

    <div class="flex flex-col gap-8">
      <JsoncShowcase />
      <Json5Showcase />
    </div>
  </div>
</template>

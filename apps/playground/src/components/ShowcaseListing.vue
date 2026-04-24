<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'

defineProps<{
  extension: string
  filename: string
  raw: string
  parsedJson: string
  objectKey: string
  namedExport: string
  badgeClass: string
  dotClass: string
  parsedCodeClass: string
}>()
</script>

<template>
  <article class="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl shadow-black/30">
    <header class="flex items-center gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900/80">
      <span :class="['px-2.5 py-1 rounded-md text-xs font-mono font-semibold border', badgeClass]">
        .{{ extension }}
      </span>
      <span class="text-slate-400 font-mono text-sm">{{ filename }}</span>
      <div class="ml-auto flex items-center gap-2">
        <span :class="['w-2 h-2 rounded-full', dotClass]" />
        <span class="text-xs text-slate-500 font-mono">parsed ok</span>
      </div>
    </header>

    <div class="grid grid-cols-2 divide-x divide-slate-800 border-b border-slate-800">
      <section class="p-5 min-w-0">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Raw Input
        </p>
        <CodeBlock
          :code="raw"
          language="json"
        />
      </section>
      <section class="p-5 min-w-0">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Parsed Object
        </p>
        <CodeBlock
          :code="parsedJson"
          language="json"
        />
      </section>
    </div>

    <div class="grid grid-cols-2 divide-x divide-slate-800">
      <section class="px-6 py-5">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Object Key
          <code class="ml-1.5 normal-case text-slate-600 font-mono font-normal">.name</code>
        </p>
        <code :class="['font-mono text-sm', parsedCodeClass]">"{{ objectKey }}"</code>
      </section>
      <section class="px-6 py-5">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Named Export
          <code class="ml-1.5 normal-case text-slate-600 font-mono font-normal">import { name }</code>
        </p>
        <code :class="['font-mono text-sm', parsedCodeClass]">"{{ namedExport }}"</code>
      </section>
    </div>
  </article>
</template>

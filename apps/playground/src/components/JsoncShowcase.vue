<script setup lang="ts">
import raw from '@fixtures/jsonc_example.jsonc?raw'
import result from '@fixtures/jsonc_example.jsonc'
import { name } from '@fixtures/jsonc_example.jsonc'
import ShowcaseListing from './ShowcaseListing.vue'

const parsedJson = JSON.stringify(result, null, 2)
</script>

<template>
  <ShowcaseListing
    extension="jsonc"
    filename="jsonc_example.jsonc"
    :raw="raw"
    :parsed-json="parsedJson"
    :object-key="result.name"
    :named-export="name"
    badge-class="bg-amber-500/10 text-amber-400 border-amber-500/25"
    dot-class="bg-amber-400"
    parsed-code-class="text-amber-300"
  />
</template>

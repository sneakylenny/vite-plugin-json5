<script setup lang="ts">
import raw from '@fixtures/json5_example.json5?raw'
import result from '@fixtures/json5_example.json5'
import { name } from '@fixtures/json5_example.json5'
import ShowcaseListing from './ShowcaseListing.vue'

const parsedJson = JSON.stringify(result, null, 2)
</script>

<template>
  <ShowcaseListing
    extension="json5"
    filename="json5_example.json5"
    :raw="raw"
    :parsed-json="parsedJson"
    :object-key="result.name"
    :named-export="name"
    badge-class="bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
    dot-class="bg-emerald-400"
    parsed-code-class="text-emerald-300"
  />
</template>

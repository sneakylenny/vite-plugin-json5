<script setup lang="ts">
// @ts-expect-error No time to fix this right now... #TODO: Fix this
import JsoncFileRaw from '../../../tests/json/jsonc_example.jsonc?raw'
import JsoncFileResult from '../../../tests/json/jsonc_example.jsonc'

// @ts-expect-error Same as above
import Json5FileRaw from '../../../tests/json/json5_example.json5?raw'
import Json5FileResult from '../../../tests/json/json5_example.json5'
</script>

<template>
  <div>
    <div>
      <h2>JSONC File:</h2>
      <table>
        <thead>
          <tr>
            <th>File content</th>
            <th>Import result</th>
            <th>Example key (name)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre v-text="JsoncFileRaw" />
            </td>
            <td>
              <pre v-text="JsoncFileResult" />
            </td>
            <td>
              <pre v-text="JsoncFileResult.name" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2>JSON5 File:</h2>
      <table>
        <thead>
          <tr>
            <th>File content</th>
            <th>Import result</th>
            <th>Example key (name)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre v-text="Json5FileRaw" />
            </td>
            <td>
              <pre v-text="Json5FileResult" />
            </td>
            <td>
              <pre v-text="Json5FileResult.name" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

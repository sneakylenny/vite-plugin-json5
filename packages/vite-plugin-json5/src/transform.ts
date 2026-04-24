import JSON5 from 'json5'
import { dataToEsm } from '@rollup/pluginutils'
import type { JsonOptions } from 'vite'
import type { DtsAggregatedOptions, DtsSidecarOptions } from './dts.js'

export interface Json5Options extends JsonOptions {
  /**
   * Automatically generate TypeScript declarations for imported JSON5/JSONC
   * files, inferred from each file's contents.
   *
   * Pass `true` to enable with defaults, or an options object to choose a mode:
   *
   * - **Aggregated** (default) — all declarations go into a single file
   *   (`node_modules/@types/__vite-plugin-json5__/index.d.ts`). TypeScript
   *   picks this up automatically — no `tsconfig.json` changes needed.
   * - **Sidecar** (`sidecar: true`) — writes a `.d.ts` next to each source
   *   file; TypeScript picks it up automatically, no tsconfig change needed.
   *   Add `*.json5.d.ts` / `*.jsonc.d.ts` to your `.gitignore`.
   *
   * Set `literals: true` on either mode to use exact literal types instead
   * of widened primitives (e.g. `"1.0.0"` instead of `string`).
   */
  dts?: boolean | DtsAggregatedOptions | DtsSidecarOptions
}

export function transformJson5(
  json: string,
  options: Pick<JsonOptions, 'stringify' | 'namedExports'>,
  isBuild: boolean,
): { parsed: unknown, code: string, map: { mappings: string } | null } {
  const parsed = JSON5.parse(json)

  if (options.stringify === true) {
    const stringified = JSON.stringify(parsed)
    return {
      parsed,
      code: `export default JSON.parse(${JSON.stringify(stringified)})`,
      map: isBuild ? { mappings: '' } : null,
    }
  }

  return {
    parsed,
    code: dataToEsm(parsed, { namedExports: options.namedExports }),
    map: { mappings: '' },
  }
}

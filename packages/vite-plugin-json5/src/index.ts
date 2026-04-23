import JSON5 from 'json5'
import type { Plugin, JsonOptions } from 'vite'
import { dataToEsm } from '@rollup/pluginutils'

// Custom JSON filter for Vite
const json5ExtRE = /\.(jsonc|json5)$/

export interface Json5Options extends JsonOptions {}

export function json5Plugin (
  options: Json5Options = {}
): Plugin {
  let isBuild = false

  return {
    name: 'vite:json5',

    configResolved (config) {
      // Determine if this is the build phase based on the resolved config
      isBuild = config.command === 'build'
    },

    transform (json, id) {
      if (!json5ExtRE.test(id)) return null

      try {
        // Parse the JSON5
        const parsed = JSON5.parse(json)

        if (options.stringify === true) {
          json = JSON.stringify(parsed)

          if (isBuild) {
            // During build, parse then double-stringify to remove all
            // unnecessary whitespaces to reduce bundle size.
            return {
              code: `export default JSON.parse(${JSON.stringify(json)})`,
              map: { mappings: '' }
            }
          } else {
            // For serve, return the stringified result for the browser to parse
            return {
              code: `export default JSON.parse(${JSON.stringify(json)})`,
              map: null
            }
          }
        }

        // Convert the parsed JSON5 data to an ES module export
        return {
          code: dataToEsm(parsed, {
            namedExports: options.namedExports
          }),
          map: { mappings: '' }
        }
      } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e))
        this.error(error.message)
      }
    }
  }
}

export default json5Plugin

import JSON5 from 'json5'
import type { Plugin, JsonOptions } from 'vite'
import { dataToEsm } from '@rollup/pluginutils'
import path from 'path'
import fs from 'fs'
import JsonToTS from 'json-to-ts'

// Custom JSON filter for Vite
const json5ExtRE = /\.(jsonc|json5)$/

export interface Json5Options extends JsonOptions {
  typesDir?: string
}

export function json5Plugin (
  options: Json5Options = {}
): Plugin {
  let isBuild = false

  return {
    name: 'vite:json5-plugin',

    configResolved (config) {
      // Determine if this is the build phase based on the resolved config
      isBuild = config.command === 'build'
    },

    transform (json, id) {
      if (!json5ExtRE.test(id)) return null

      try {
        // Parse the JSON5
        const parsed = JSON5.parse(json)

        if (options.typesDir !== undefined && typeof options.typesDir === 'string') {
          // Get output dir
          const outputDir = options.typesDir

          // Generate declaration file
          const declarationFileName = path.basename(id, path.extname(id)) + '.d.ts'
          const declarationFilePath = path.join(outputDir, declarationFileName)
          const declarationModulePath = path.relative(process.cwd(), id)
          const declarationContent = `declare module '*/${declarationModulePath}'{\n${JsonToTS(parsed).join('\n')}\nconst value: RootObject\nexport default value\n}`

          // Ensure the output directory exists
          fs.mkdirSync(outputDir, { recursive: true })
          fs.writeFileSync(declarationFilePath, declarationContent)

          return {
            code: dataToEsm(parsed, {
              namedExports: options.namedExports
            }),
            map: { mappings: '' }
          }
        }

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

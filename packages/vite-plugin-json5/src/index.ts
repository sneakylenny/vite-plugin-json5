import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { DtsAggregatedOptions, DtsSidecarOptions } from './dts.js'
import { generateModuleBlock, generateSidecarContent, writeDtsFile } from './dts.js'
import type { Json5Options } from './transform.js'
import { transformJson5 } from './transform.js'

export type { Json5Options } from './transform.js'

const json5ExtRE = /\.(jsonc|json5)$/

type AliasEntry = { find: string | RegExp, replacement: string }

export function json5Plugin(
  options: Json5Options = {},
): Plugin {
  const dtsOpts: DtsAggregatedOptions | DtsSidecarOptions | null
    = options.dts === undefined || options.dts === false
      ? null
      : typeof options.dts === 'object' ? options.dts : {}
  const dtsLiterals = dtsOpts?.literals === true
  const dtsSidecar = dtsOpts?.sidecar === true

  let isBuild = false
  let dtsOutFile: string | null = null
  let aliases: AliasEntry[] = []
  const specifiersFor = new Map<string, Set<string>>()
  const declarations = new Map<string, string>()

  return {
    name: 'vite:json5',

    configResolved(config) {
      isBuild = config.command === 'build'
      if (dtsOpts !== null && dtsOpts.sidecar !== true) {
        const outFile = dtsOpts.outFile ?? 'node_modules/@types/__vite-plugin-json5__/index.d.ts'
        dtsOutFile = resolve(config.root, outFile)
      }
      if (Array.isArray(config.resolve?.alias)) {
        aliases = config.resolve.alias
      }
    },

    ...(dtsOpts !== null && !dtsSidecar && {
      resolveId: {
        order: 'pre' as const,
        async handler(id: string, importer: string | undefined) {
          if (!json5ExtRE.test(id.split('?')[0])) return null
          // Skip absolute/filesystem paths — only capture user-written specifiers
          if (id.startsWith('/') || /^[A-Za-z]:[/\\]/.test(id)) return null
          const resolved = await this.resolve(id, importer, { skipSelf: true })
          if (resolved !== null && resolved.external === false) {
            const set = specifiersFor.get(resolved.id) ?? new Set<string>()
            set.add(id)
            specifiersFor.set(resolved.id, set)
          }
          return null
        },
      },
    }),

    transform(json, id) {
      if (!json5ExtRE.test(id)) return null

      try {
        const namedExports = options.namedExports !== false && options.stringify !== true
        const { parsed, code, map } = transformJson5(json, options, isBuild)

        if (dtsOpts !== null) {
          if (dtsSidecar) {
            writeFileSync(`${id}.d.ts`, generateSidecarContent(parsed, namedExports, dtsLiterals), 'utf-8')
          }
          else if (dtsOutFile !== null) {
            let didAddDecl = false
            for (const specifier of specifiersFor.get(id) ?? []) {
              declarations.set(specifier, generateModuleBlock(specifier, parsed, namedExports, dtsLiterals))
              didAddDecl = true
            }
            // In Vite dev mode, the built-in alias plugin resolves aliases before user
            // resolveId hooks run, so specifiersFor is never populated for aliased imports.
            // Reverse-map the resolved path through the alias config as a fallback.
            if (!didAddDecl) {
              for (const alias of aliases) {
                if (typeof alias.find !== 'string') continue
                const rep = alias.replacement.replace(/[/\\]+$/, '')
                if (id.startsWith(rep + '/') || id.startsWith(rep + '\\')) {
                  const specifier = `${alias.find.replace(/[/\\]+$/, '')}/${id.slice(rep.length + 1)}`
                  declarations.set(specifier, generateModuleBlock(specifier, parsed, namedExports, dtsLiterals))
                  didAddDecl = true
                  break
                }
              }
            }
            if (didAddDecl) {
              writeDtsFile(dtsOutFile, declarations)
            }
          }
        }

        return { code, map }
      }
      catch (e) {
        const error = e instanceof Error ? e : new Error(String(e))
        this.error(error.message)
      }
    },
  }
}

export default json5Plugin

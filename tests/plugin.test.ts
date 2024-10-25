import { describe, it, expect } from 'vitest'
import { createServer } from 'vite'
import { json5Plugin } from '../src/index' // Adjust the path to your plugin
import path from 'path'

describe('Vite Plugin for JSONC and JSON5', () => {
  it('should import JSONC files correctly', async () => {
    const server = await createServer({
      plugins: [json5Plugin()]
    })

    // Resolve the path to the JSONC file
    const jsoncFilePath = path.resolve(__dirname, './json/jsonc_example.jsonc')
    const jsoncContent = await server.ssrLoadModule(jsoncFilePath)

    // Add assertions based on the expected output
    expect(jsoncContent.default).toEqual({
      name: 'Example JSONC',
      version: '1.0.0',
      description: 'This is an example of a JSONC file.',
      dependencies: {
        library1: '^1.0.0',
        library2: '^2.0.0'
      },
      settings: {
        enabled: true,
        maxItems: 100
      }
    })

    await server.close()
  })

  it('should import JSON5 files correctly', async () => {
    const server = await createServer({
      plugins: [json5Plugin()]
    })

    // Resolve the path to the JSON5 file
    const json5FilePath = path.resolve(__dirname, './json/json5_example.json5')
    const json5Content = await server.ssrLoadModule(json5FilePath)

    // Add assertions based on the expected output
    expect(json5Content.default).toEqual({
      name: 'Example JSON5',
      version: '1.0.0',
      description: 'This is an example of a JSON5 file.',
      dependencies: {
        library1: '^1.0.0',
        library2: '^2.0.0'
      },
      settings: {
        enabled: true,
        maxItems: 100
      }
    })

    await server.close()
  })
})

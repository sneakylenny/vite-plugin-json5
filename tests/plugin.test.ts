import { describe, it, expect } from 'vitest'
import jsoncData from './json/jsonc_example.jsonc'
import json5Data from './json/json5_example.json5'

describe('Vite Plugin for JSONC and JSON5', () => {
  it('should import JSONC files correctly', async () => {
    // The JSONC file should already be processed and available via import
    expect(jsoncData).toEqual({
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
  })

  it('should import JSON5 files correctly', async () => {
    // The JSON5 file should already be processed and available via import
    expect(json5Data).toEqual({
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
  })
})

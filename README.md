# 🔌 Vite JSON5 (and JSONC) plugin

Plugin for allowing .json5 and .jsonc files to be loaded.

> [!NOTE]
> This plugin is merely just a wrapper using the [json5](https://github.com/json5/json5) package. So all the credits for the parsing goes out to the collaborators of that repository! I just made a plugin that allows files to be parsed using their package.

### 📛 Badges

[![npm](https://img.shields.io/npm/v/vite-plugin-json5?style=flat-square)](https://www.npmjs.com/package/vite-plugin-json5)
![npm](https://img.shields.io/npm/dm/vite-plugin-json5?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sneakylenny/vite-plugin-json5/publish.yml?style=flat-square)
![License](https://img.shields.io/github/license/sneakylenny/vite-plugin-json5?style=flat-square)
[![GitHub Repo stars](https://img.shields.io/github/stars/sneakylenny/vite-plugin-json5?style=flat-square)](https://github.com/sneakylenny/vite-plugin-json5)

## 📦 Installation in 3 easy steps:

### 1. Install the package into to your project

```bash
# PNPM:
pnpm add -D vite-plugin-json5

# Yarn:
yarn add -D vite-plugin-json5

# NPM:
npm install -D vite-plugin-json5
```

### 2. Add it to your vite config

```js
// vite.config.js

import json5Plugin from 'vite-plugin-json5'
// or
import { json5Plugin } from 'vite-plugin-json5'

export default defineConfig({
  json5Plugin()
})
```

### 3. That's it 🎉

You are now able to import files with the .jsonc and .json5 extensions!
These will be parsed by the json5 package and turned into a regular js that the app will be able to read and not get confused by.

### Options ⚙️

This plugin accepts the same options as [the default JSON parser](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/json.ts), plus a `dts` option for automatic TypeScript type generation:

```ts
interface Json5Options {
    /**
     * Generate a named export for every property of the JSON object
     * @default true
     */
    namedExports?: boolean;
    /**
     * Generate performant output as JSON.parse("stringified").
     * Enabling this will disable namedExports.
     * @default false
     */
    stringify?: boolean;
    /**
     * Automatically generate TypeScript declarations for imported
     * JSON5/JSONC files. See the TypeScript types section below.
     */
    dts?:
        | boolean
        // Aggregated mode (default): all declarations in one file
        | { sidecar?: false; literals?: boolean; outFile?: string }
        // Sidecar mode: one .d.ts file next to each source file
        | { sidecar: true; literals?: boolean };
}
```

#### TypeScript types 🔷

Enable the `dts` option to have the plugin automatically generate TypeScript declarations for every JSON5/JSONC file you import. No more `any` — you get full type safety and autocompletion, inferred directly from the file's contents.

```ts
// vite.config.ts
json5Plugin({ dts: true });
```

There are two modes:

---

**Aggregated mode** (default) — all declarations are collected into a single file at `node_modules/.vite-plugin-json5/types.d.ts`. This path is already ignored by virtually every `.gitignore`, so nothing leaks into your repository. Add the file to `files` in your `tsconfig.json` once to activate it (`files` overrides `exclude`, which is why it works even with `node_modules` excluded):

```json
{
    "files": ["node_modules/.vite-plugin-json5/types.d.ts"]
}
```

---

**Sidecar mode** — writes a `.d.ts` file next to each source file (e.g. `config.json5.d.ts` beside `config.json5`). TypeScript picks these up automatically via module resolution — no `tsconfig.json` changes needed. Enable it with `sidecar: true` and add the generated files to your `.gitignore`:

```ts
json5Plugin({ dts: { sidecar: true } });
```

```gitignore
*.json5.d.ts
*.jsonc.d.ts
```

---

**Literal types** — by default, values are widened to their primitive type (`string`, `number`, `boolean`). Pass `literals: true` to use exact literal types instead:

```ts
json5Plugin({ dts: { literals: true } });
```

```ts
// Without literals (default)
export declare const version: string;

// With literals: true
export declare const version: "1.0.0";
```

---

**Custom output path** (aggregated mode only) — change where the aggregated file is written using `outFile`, relative to the Vite root:

```ts
json5Plugin({ dts: { outFile: "src/types/json5.d.ts" } });
```

---

> [!NOTE]
> In Vite's dev server, type declarations are generated **lazily** — the file is written the first time a JSON5/JSONC module is actually loaded by the browser. Open the page once and the file persists on disk across server restarts. Running `vite build` always generates types upfront.

#### Contributing 🏗️

A guide for setting up the development environment to allow for easy contributions.

1. Install dependencies:

    ```console
    $ pnpm install
    ```

1. Make changes
1. Run tests

    ```console
    $ pnpm test
    ```

1. Build when successful
    ```console
    $ pnpm build
    ```
1. Run the playground to test the build
    ```console
    $ pnpm dev
    ```

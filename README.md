# Vite JSON5 (and JSONC) plugin

[![npm](https://img.shields.io/npm/v/vite-plugin-json5?style=flat-square)](https://www.npmjs.com/package/vite-plugin-json5)
![npm](https://img.shields.io/npm/dm/vite-plugin-json5?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sneakylenny/vite-plugin-json5/publish.yml?style=flat-square)
![License](https://img.shields.io/github/license/sneakylenny/vite-plugin-json5?style=flat-square)
[![GitHub Repo stars](https://img.shields.io/github/stars/sneakylenny/vite-plugin-json5?style=flat-square)](https://github.com/sneakylenny/vite-plugin-json5)

A Vite plugin that wraps [`json5`](https://github.com/json5/json5) to allow .json5 and .jsonc files to be loaded.

## Installation

#### 1. Install the package

```bash
# pnpm
pnpm add -D vite-plugin-json5

# yarn
yarn add -D vite-plugin-json5

# npm
npm install -D vite-plugin-json5
```

#### 2. Add it to your Vite config

```js
// vite.config.js
import json5Plugin from "vite-plugin-json5";
// or
import { json5Plugin } from "vite-plugin-json5";

export default defineConfig({
    plugins: [json5Plugin()],
});
```

#### 3. Done

`.json5` and `.jsonc` files can now be imported directly. They are parsed by the [`json5`](https://github.com/json5/json5) package and transformed into standard JavaScript modules.

### Options

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

### TypeScript types

> [!NOTE]
> In Vite's dev server, type declarations are generated **lazily** — the file is written the first time a JSON5/JSONC module is actually requested. Open the page once and the file persists on disk across server restarts. Running `vite build` always generates types upfront.

Enable the `dts` option to have the plugin automatically generate TypeScript declarations for every JSON5/JSONC file you import. No more `any` — you get full type safety and autocompletion, inferred directly from the file's contents.

```ts
// vite.config.ts
json5Plugin({ dts: true });
```

There are two modes:

---

**Aggregated mode** (default) — all declarations are collected into a single file at `node_modules/@types/__vite-plugin-json5__/index.d.ts`. TypeScript picks this up automatically via its default type roots — no `tsconfig.json` changes needed. The file is already gitignored.

> [!NOTE]
> If your `tsconfig.json` has an explicit `"types"` array (e.g. `"types": ["vite/client"]`), add `"__vite-plugin-json5__"` to it.

---

**Sidecar mode** — writes a `.d.ts` file next to each source file (e.g. `config.json5.d.ts` beside `config.json5`). TypeScript picks these up automatically via module resolution — no `tsconfig.json` changes needed.

Example:

```
src/
├── config.json5
├── config.json5.d.ts   ← generated
├── theme.jsonc
└── theme.jsonc.d.ts    ← generated
```

Enable it with `sidecar: true` and add the generated files to your `.gitignore`:

```ts
json5Plugin({ dts: { sidecar: true } });
```

Add the signature of the generated files to the git ignore to prevent them from being pushed to your repository:

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

### Contributing

A guide for setting up the development environment to allow for easy contributions.

This repo uses [proto](https://moonrepo.dev/proto) for toolchain management and [moon](https://moonrepo.dev/moon) as the task runner.

1. Install proto by following the [proto install guide](https://moonrepo.dev/docs/proto/install). Then install the required tools (Node.js, pnpm, and moon) from the repo root:

    ```console
    $ proto install
    ```

1. Install dependencies:

    ```console
    $ pnpm install
    ```

1. Make changes
1. Run tests

    ```console
    $ moon run vite-plugin-json5:test
    ```

1. Build when successful

    ```console
    $ moon run vite-plugin-json5:build
    ```

1. Run the playground to test the build

    ```console
    $ moon run playground:dev
    ```

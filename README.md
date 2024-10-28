# 🔌 Vite JSON5 (and JSONC) plugin
Plugin for allowing .json5 and .jsonc files to be loaded.

> [!NOTE]
> This plugin is merely just a wrapper using the [json5](https://github.com/json5/json5) package. So all the credits for the parsing goes out to the collaborators of that repository! I just made a plugin that allows files to be parsed using their package.

## 📦 Installation in 3 easy steps:

#### 1. Install the package into to your project

```bash
# PNPM:
pnpm add -D vite-plugin-json5

# Yarn:
yarn add -D vite-plugin-json5

# NPM:
npm install -D vite-plugin-json5
```

#### 2. Add it to your vite config

```js
// vite.config.js

import json5Plugin from 'vite-plugin-json5'
// or
import { json5Plugin } from 'vite-plugin-json5'

export default defineConfig({
  json5Plugin()
})
```

#### 3. That's it 🎉

You are now able to import files with the .jsonc and .json5 extensions!
These will be parsed by the json5 package and turned into a regular js that the app will be able to read and not get confused by.

#### Options ⚙️

This plugin accepts the same options as [the default JSON parser](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/json.ts):

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
}
```

#### Developping 🏗️

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
1. (optional) Run the playground to test the build
    ```console
    $ pnpm dev
    ```

---

#### Extra 🍕

<small>
The reason why I created the plugin is because I would like to be able to write comments in my JSON lang files to
give more context about the translations. The problem was, when I imported a .json5 or .jsonc file it threw errors about needing a custom plugin for
these types of files. I couldn't find one yet so... here it is! It made me wonder why Vite doesn't
support it natively.
</small>

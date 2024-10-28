// src/shim.d.ts or src/vue-shim.d.ts
declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

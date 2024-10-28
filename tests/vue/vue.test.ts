import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JsoncTestComponent from './components/JsoncTest.vue'
import Json5TestComponent from './components/Json5Test.vue'

describe('Vue Component with JSONC and JSON5', () => {
  it('should parse and render JSONC in a Vue component', async () => {
    // Mount the Vue component and assert
    const wrapper = mount(JsoncTestComponent)
    expect(wrapper.text()).toContain('Example JSONC')
    expect(wrapper.text()).toContain('library1')
  })

  it('should parse and render JSON5 in a Vue component', async () => {
    // Mount the Vue component and assert
    const wrapper = mount(Json5TestComponent)
    expect(wrapper.text()).toContain('Example JSON5')
    expect(wrapper.text()).toContain('library2')
  })
})

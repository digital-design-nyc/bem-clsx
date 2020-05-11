import { block } from '../src'

const b = block('block')

describe('module', () => {
  it('makes element', () => {
    const cls = b('element')

    expect(cls).toEqual('block__element')
  })

  it('makes element with modifier', () => {
    const cls = b('element', { modifier: true })

    expect(cls).toEqual('block__element block__element_modifier')
  })

  it('makes element with modifier and value', () => {
    const cls = b('element', { modifier: 'value' })

    expect(cls).toEqual('block__element block__element_modifier_value')
  })

  it('makes element with mixin', () => {
    const cls = b('element', 'mixin')

    expect(cls).toEqual('block__element mixin')
  })

  it('makes element with modifier and mixin', () => {
    const cls = b('element', { modifier: 'value' }, 'mixin')

    expect(cls).toEqual('block__element block__element_modifier_value mixin')
  })

  it('makes element with modifier and many mixins', () => {
    const cls = b('element', { modifier: 'value' }, 'mixin', false, null, undefined, 'mix')

    expect(cls).toEqual('block__element block__element_modifier_value mixin mix')
  })
})
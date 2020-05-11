import { block } from '../src'

const b = block('block')

describe('module', () => {
  it('makes block', () => {
    const cls = b()

    expect(cls).toEqual('block')
  })

  it('makes block with modifier', () => {
    const cls = b({ modifier: true })

    expect(cls).toEqual('block block_modifier')
  })

  it('makes block with modifier and value', () => {
    const cls = b({ modifier: 'value' })

    expect(cls).toEqual('block block_modifier_value')
  })

  it('makes block without modifiers with mixin', () => {
    let cls = b(null, 'mixin')

    expect(cls).toEqual('block mixin')

    cls = b(undefined, 'mixin')

    expect(cls).toEqual('block mixin')
  })

  it('makes block with mixin if an empty object is provided as modifiers', () => {
    const cls = b({}, 'mixin')

    expect(cls).toEqual('block mixin')
  })

  it('makes block with modifier and mixin', () => {
    const cls = b({ modifier: 'value' }, 'mixin')

    expect(cls).toEqual('block block_modifier_value mixin')
  })

  it('makes block with modifier and many mixins', () => {
    const cls = b({ modifier: 'value' }, 'mixin', false, null, undefined, 'mix')

    expect(cls).toEqual('block block_modifier_value mixin mix')
  })
})
import { block } from '../src'

const customConfig = {
  namespace: 'ns-',
  elementSeparator: '~~',
  modifierSeparator: '--',
  modifierValueSeparator: '-'
}

const customBlock = (blockName: string) => {
  return block(blockName, customConfig)
}

const b = customBlock('block')

describe('options', () => {
  it('uses custom options', () => {
    expect(b()).toEqual('ns-block')

    expect(b({ mod: 'value' })).toEqual('ns-block ns-block--mod-value')

    expect(b({ mod: true })).toEqual('ns-block ns-block--mod')

    expect(b(null, 'mix')).toEqual('ns-block mix')

    expect(b(undefined, 'mix')).toEqual('ns-block mix')

    expect(b('element')).toEqual('ns-block~~element')

    expect(b('element', { mod: 'value' })).toEqual('ns-block~~element ns-block~~element--mod-value')

    expect(b('element', { mod: true })).toEqual('ns-block~~element ns-block~~element--mod')

    expect(b('element', 'mix')).toEqual('ns-block~~element mix')
  })
})
export interface IOptions {
  namespace?: string,
  elementSeparator: string,
  modifierSeparator: string,
  modifierValueSeparator: string
}

export type IModifiers = Record<string, string | boolean | undefined | null>

export const DEFAULT_OPTIONS: IOptions = {
	elementSeparator: '__',
  modifierSeparator: '_',
  modifierValueSeparator: '_',
}

export type Mixin = string | boolean | undefined | null

function makeMixins(...mixins: Mixin[]): string
function makeMixins(): string {
  let cls = ''
  for (let i = 0; i < arguments.length; i++) {
    const mixin = arguments[i]
    if (mixin) {
      cls += ' ' + mixin
    }
  }
  return cls
}

export const block = (
  blockName: string,
  { namespace, elementSeparator, modifierSeparator, modifierValueSeparator }: IOptions = DEFAULT_OPTIONS
) => {
  function element(elementName: string, mods: IModifiers | null | undefined, ...mixins: Mixin[]): string
  function element(elementName: string, ...mixins: Mixin[]): string
  function element(elementName: string, mods: IModifiers): string
  function element(mods: IModifiers | null | undefined, ...mixins: Mixin[]): string
  function element(elementName: string): string
  function element(mods: IModifiers | null): string
  function element(): string

  function element(
    elementNameOrMods?: string | IModifiers | null | undefined,
    modsOrMixin?: IModifiers | Mixin | null | undefined,
  ): string {
    let baseName = namespace || ''
    baseName += blockName
    if (elementNameOrMods && typeof elementNameOrMods === 'string') {
      baseName += elementSeparator + elementNameOrMods
    }

    let cls = baseName

    let mods: IModifiers | null = null

    if (elementNameOrMods && elementNameOrMods instanceof Object) {
      mods = elementNameOrMods
    }

    if (!mods && modsOrMixin && modsOrMixin instanceof Object) {
      mods = modsOrMixin
    }

    if (mods) {
      for (const mod in mods) {
        const modVal = mods[mod]
        if (modVal) {
          cls += ' ' + baseName + modifierSeparator + mod
          if (modVal !== true) {
            cls += modifierValueSeparator + modVal
          }
        }
      }
    }

    if (typeof modsOrMixin === 'string') {
      cls += makeMixins(modsOrMixin)
    }

    for (let i = 2; i < arguments.length; i++) {
      cls += makeMixins(arguments[i])
    }

    return cls
  }

  return element
}

export default block

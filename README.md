# bem-clsx
Simple and fast [BEM](https://en.bem.info/) class names generator with mixin support. Inspired by [clsx](https://github.com/lukeed/clsx) and [bem-cn](https://github.com/albburtsev/bem-cn)
- No dependencies.
- Useful for [React](#react-example)
- [TypeScript](https://www.typescriptlang.org/) definitions.
- [Configurable](#custom-separators)
- Mixins
## Installation
```
$ npm install bem-clsx --save
```
or
```
$ yarn add bem-clsx
```

## Usage
```js
import block from 'bem-clsx'

const b = block('block')
```
 
### Block
```js
b();
// => 'block' 
b({ modifier: true });
// => 'block block_modifier'
b({ modifier: 'value' });
// => 'block block_modifier_value'
b(null, 'mixin');
// => 'block mixin'
b({ modifier: 'value' }, 'mixin');
// => 'block block_modifier_value mixin'
b({ modifier: 'value' }, 'mixin', null, false, undefined, 'mix');
// => 'block block_modifier_value mixin mix'
```
### Element
```js
b('element');
// => 'block__element' 
b('element', { modifier: true });
// => 'block__element block__element_modifier'
b('element', { modifier: 'value' });
// => 'block__element block__element_modifier_value'
b('element', 'mixin');
// 'block__element mixin'
b('element', { modifier: 'value' }, 'mixin');
//=> 'block__element block__element_modifier_value mixin'
b('element', { modifier: 'value' }, 'mixin', null, false, undefined, 'mix');
//=> 'block__element block__element_modifier_value mixin mix'
```


## React example
```typescript
import React from 'react'
import block from 'bem-clsx'

interface IProps {
  userName: string
  avatarUrl: string
  online: boolean
  className?: string
}

const b = block('user-info')

const UserInfo: React.FC<IProps> = ({
  className,
  userName,
  avatarUrl,
  online
 }) => (
   <div className={b(null, className)}>
     <img className={b('avatar')} src={avatarUrl}/>
     <span className={b('name')}>{userName}<span>
     <div className={b('status', { online })}/>
   </div>
 )
```
If props `className` is `navbar__user-info` and `online` is true, the result would be the following HTML:
```html
<div class="user-info navbar__user-info">
  <img class="user-info__avatar" src="https://images.com/test" />
  <span class="user-info__name">Some User</span>
  <div class="user-info__status user-info__status_online" />
</div>
```
## Custom separators
For using custom element and modifier separators, you can easily create your own module that calls the original with configuration options:

```ts
// ./src/helpers/bem.ts
import block from 'bem-clsx'

const  customConfig  = {
  namespace: 'ns-',
  elementSeparator: '~~',
  modifierSeparator: '--',
  modifierValueSeparator: '-',
}

const customBlock = (blockName: string) => (
  block(blockName, customConfig)
)

export default customBlock
```
Now you can use this function in your application. Example:
```ts
import block from 'helpers/bem'

const b = block('block')

b('element', { modifier: 'value' }, 'mixin', null, false, undefined, 'mix') 
// => 'ns-block~~element ns-block~~element--modifier-value mixin mix'
```
### Default options
```ts
{
  elementSeparator: '__',
  modifierSeparator: '_',
  modifierValueSeparator: '_',
}
```

## License
The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
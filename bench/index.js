const { Suite } = require('benchmark')
const bemCn = require('bem-cn').block
const bemCnLite = require('bem-cn-lite').default
const bemCnFast = require('bem-cn-fast')
const bemJoin = require('bem-join').bemJoin
const bemClsx = require('../dist').default

const params = ['element', { foo: true, bar: 'true', bax: false, bux: undefined }]

console.log('Output')
console.log(bemCn('block').apply(null, params).toString())
console.log(bemCnLite('block').apply(null, params))
console.log(bemCnFast('block').apply(null, params))
console.log(bemJoin('block').apply(null, params))
console.log(bemClsx('block').apply(null, params))

function bench(name, ...args) {
	console.log(`\n# ${name}`);
	new Suite()
		.add('bemCn      ', () => bemCn('block').apply(null, args).toString())
		.add('bemCnLite  ', () => bemCnLite('block').apply(null, args))
		.add('bemCnFast  ', () => bemCnFast('block').apply(null, args))
		.add('bemJoin    ', () => bemJoin('block').apply(null, args))
		.add('bemClsx    ', () => bemClsx('block').apply(null, args))
		.on('cycle', e => console.log('  ' + e.target))
		.run();
}

bench(
	'Block',
);

bench(
	'Block modifiers',
	{ foo: true, bar: 'true', bax: false, bux: undefined },
);

bench(
	'Element',
	'element',
);

bench(
  'Element modifiers',
  'element',
  { foo: true, bar: 'true', bax: false, bux: undefined },
);
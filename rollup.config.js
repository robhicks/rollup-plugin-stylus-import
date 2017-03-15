const buble = require('rollup-plugin-buble');

module.exports = {
	entry: 'src/index.js',
	plugins: [
		buble()
	],
	external: [
		'fs',
		'path',
		'stylus',
		'rollup-pluginutils'
	],
	targets: [
		{
			dest: 'lib/rollup-plugin-stylus.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'lib/rollup-plugin-stylus.es.js',
			format: 'es',
		}
	],
}

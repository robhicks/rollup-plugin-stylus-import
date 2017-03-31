const babel = require('rollup-plugin-babel');

module.exports = {
	entry: 'src/index.js',
	plugins: [
		babel()
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

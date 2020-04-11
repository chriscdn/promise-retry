import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'

export default [{
	input: 'src/index.js',
	output: [{
		file: pkg.main,
		format: 'cjs'
	}],

	plugins: [
	//	commonjs()
	]
}, {
	input: 'src/index.js',
	output: [{
		file: pkg.module,
		format: 'es'
	}],
	plugins: [
commonjs()
	]
}]
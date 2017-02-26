import async from 'rollup-plugin-async'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/cli.js',
  dest: 'dist/cli.js',
  banner: '#!/usr/bin/env node',
  format: 'cjs',
  external: ['fs', 'path', 'chalk'],
  plugins: [
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // not all files you want to resolve are .js files
      extensions: ['.js', '.json'],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: true  // Default: true

    }),
    commonjs(),
    async()
  ]
}

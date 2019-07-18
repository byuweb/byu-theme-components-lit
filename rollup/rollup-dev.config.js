import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import multiEntry from 'rollup-plugin-multi-entry'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  input: [
    'components/byu-theme-components.js'
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    compact: true,
    chunkFileNames: 'components.min.js',
    entryFileNames: 'byu-theme-components.min.js'
  },
  plugins: [
    resolve(),
    json({
      include: 'package.json',
      compact: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    serve('.'),
    multiEntry(),
    postcss({
      plugins: [
        autoprefixer,
        cssnano
      ]
    }),
    minify({
      'mangle': { 'exclude': [] },
      'comments': false
    })
  ]
}

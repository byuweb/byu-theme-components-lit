import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import multiEntry from 'rollup-plugin-multi-entry'
import postcss from 'rollup-plugin-postcss'
import bundleSize from 'rollup-plugin-bundle-size'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  // If using any exports from a symlinked project, uncomment the following:
  // preserveSymlinks: true,
  input: [
    'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
    'components/**/*.js'
  ],
  output: {
    file: 'dist/byu-theme-components.min.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    serve('.'),
    livereload(),
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
    }),
    bundleSize()
  ]
}

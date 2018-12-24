import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    autoExternal(),
    babel({
      exclude: 'node_modules/**'
    }),
  ],
}

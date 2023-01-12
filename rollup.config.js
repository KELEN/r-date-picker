import path from 'path';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default {
  input: 'src/lib/component/index.jsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src/lib')
        }
      ],
    }),
    // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
    // 必须放在最前面
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/env', '@babel/preset-react'],
      extensions: ['.js', '.jsx']
    }),
    // 支持commonjs，包括第三方引入使用到commonjs语法
    commonjs(),
    postcss({
      extensions: ['.css'],
    }),
    terser(),
    peerDepsExternal(),
  ],
};

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import html from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';

const DEV = process.env.NODE_ENV === 'development';
const DIST_DIR = 'dist';

export default {
    input: 'src/main.ts',
    output: {
        name: 'me',
        file: `${DIST_DIR}/bundle.js`,
        sourcemap: DEV,
        format: 'iife'
    },
    plugins: [
        svelte({
            extensions: ['.svelte'],
            preprocess: preprocess(),
            emitCss: false,
            compilerOptions: {
                dev: DEV,
                css: true
            }
        }),
        css({
            output: `global.css`,
        }),
        typescript({ sourceMap: DEV }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        html({
            inject: false,
            template: 'src/index.html',
            fileName: 'index.html',
        }),
        ...DEV ? [
            serve({
                contentBase: DIST_DIR,
                historyApiFallback: true,
                port: 1234,
            }),
            livereload({ watch: DIST_DIR })
        ] : [
            terser()
        ]
    ]
}
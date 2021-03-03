import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import html from "rollup-plugin-html2";
import serve from "rollup-plugin-serve";
import preprocess from "svelte-preprocess";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-import-css";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";

const DEV = Boolean(process.env.ROLLUP_WATCH);
const DIST_DIR = "static";

export default {
  input: "src/main.dom.ts",
  output: {
    name: "me",
    format: "iife",
    file: `${DIST_DIR}/bundle.js`,
    sourcemap: DEV,
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    typescript({ sourceMap: DEV }),
    commonjs({ sourceMap: DEV }),
    replace({
      "process.env.NODE_ENV": DEV ? "development" : "production",
      "process.browser": true,
      preventAssignment: true,
    }),
    svelte({
      preprocess: preprocess(),
      extensions: [".svelte"],
      compilerOptions: {
        dev: DEV,
        generate: "dom",
        hydratable: true,
      },
      emitCss: true,
    }),
    css({
      output: `bundle.css`,
    }),
    html({
      inject: false,
      template: "src/index.html",
      fileName: "index.html",
    }),
    copy({
      targets: [
        { src: "src/global.css", dest: "static" },
        { src: "src/favicon.png", dest: "static" },
      ],
    }),
    ...(DEV
      ? [
          serve({
            contentBase: DIST_DIR,
            historyApiFallback: true,
            port: 1234,
          }),
          livereload({ watch: DIST_DIR }),
        ]
      : [terser()]),
  ],
  watch: {
    clearScreen: false,
  },
};

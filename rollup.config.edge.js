import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import replace from "@rollup/plugin-replace";
import { string } from "rollup-plugin-string";

const DEV = Boolean(process.env.ROLLUP_WATCH);
const DIST_DIR = "edge";

export default {
  input: "src/main.edge.ts",
  output: {
    format: "cjs",
    file: `${DIST_DIR}/index.js`,
    sourcemap: false,
  },
  treeshake: {
    propertyReadSideEffects: false,
    moduleSideEffects: "no-external",
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
      "process.browser": false,
      preventAssignment: true,
    }),
    svelte({
      preprocess: preprocess(),
      extensions: [".svelte"],
      compilerOptions: {
        dev: DEV,
        generate: "ssr",
        hydratable: true,
        css: false,
      },
      emitCss: false,
    }),
    string({
      include: "src/index.html",
    }),
  ],
};

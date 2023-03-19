import { createRequire } from "node:module";

import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const name = createRequire(import.meta.url)("./package.json").name;
const outDir = "dist/";

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${outDir}${name}.cjs`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${outDir}${name}.js`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${outDir}${name}.d.ts`,
      format: "es",
    },
  }),
];

import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const entry = "index";
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
        file: `${outDir}${entry}.cjs`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${outDir}${entry}.js`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${outDir}${entry}.d.ts`,
      format: "es",
    },
  }),
];

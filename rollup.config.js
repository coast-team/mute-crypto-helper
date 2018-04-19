import typescript from 'rollup-plugin-typescript2'
const tsConfig = { include: ['src/**/*.ts'], useTsconfigDeclarationDir: true }

export default [
  {
    input: 'src/index.node.ts',
    output: [{ file: 'dist/crypto-api-wrapper.cjs.js', format: 'cjs', sourcemap: true }],
    plugins: [typescript(tsConfig)],
  },
  {
    input: 'src/index.node.ts',
    output: [{ file: 'dist/crypto-api-wrapper.node.es.js', format: 'es', sourcemap: true }],
    plugins: [typescript(tsConfig)],
  },
  {
    input: 'src/index.browser.ts',
    output: [{ file: 'dist/crypto-api-wrapper.browser.es.js', format: 'es', sourcemap: true }],
    plugins: [typescript(tsConfig)],
  },
]

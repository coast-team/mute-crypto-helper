import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'

const tsConfigEs2015 = {
  tsconfigOverride: {
    compilerOptions: {
      target: 'es2015',
      downlevelIteration: false,
    },
  },
}

const tsConfigEsNext = {
  tsconfigOverride: {
    compilerOptions: {
      target: 'esnext',
      downlevelIteration: false,
    },
  },
}

const tsConfigDeclaration = {
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
    },
  },
  include: ['src/**/*.ts'],
}

const filesizeConfig = { format: { round: 0 } }

const commonjsConfig = {
  namedExports: {
    'bn.js': ['BN'],
  },
}

export default [
  {
    input: 'src/index.node.ts',
    output: [
      {
        file: 'dist/mute-crypto-helper.node.es5.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript(), resolve(), commonjs(commonjsConfig), filesize(filesizeConfig), cleanup()],
  },
  {
    input: 'src/index.browser.ts',
    output: {
      file: 'dist/mute-crypto-helper.browser.es5.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      resolve({
        browser: true,
      }),
      commonjs(commonjsConfig),
      filesize(filesizeConfig),
      cleanup(),
    ],
  },
  {
    input: 'src/index.node.ts',
    output: {
      file: 'dist/mute-crypto-helper.node.es5.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript(tsConfigDeclaration), resolve(), commonjs(commonjsConfig), filesize(filesizeConfig), cleanup()],
  },
  {
    input: 'src/index.browser.ts',
    output: {
      file: 'dist/mute-crypto-helper.browser.es2015.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript(tsConfigEs2015), resolve(), commonjs(commonjsConfig), filesize(filesizeConfig), cleanup()],
  },
  {
    input: 'src/index.browser.ts',
    output: {
      file: 'dist/mute-crypto-helper.browser.esnext.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript(tsConfigEsNext), resolve(), commonjs(commonjsConfig), filesize(filesizeConfig), cleanup()],
  },
]

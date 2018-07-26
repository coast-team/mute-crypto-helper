// Karma configuration Generated on Fri Oct 27 2017 10:07:36 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],

    // list of files / patterns to load in the browser
    files: ['src/bn.js/bn.js', 'src/**/*.ts', 'test/**/*.ts'],

    // list of files to exclude
    exclude: ['karma.conf.js', 'src/index.node.ts', 'test/jasmine.helper.ts'],

    // preprocess matching files before serving them to the browser available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.+(js|ts)': ['karma-typescript'],
      'test/**/*.ts': ['karma-typescript'],
    },

    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json',
      compilerOptions: {
        module: 'commonjs',
        sourceMap: true,
        allowJs: true,
      },
      include: ['src/**/*.ts', 'test/**/*.ts'],
      reports: {
        html: {},
        'text-summary': '',
      },
      coverageOptions: {
        exclude: /helper\.ts/,
      },
    },

    // test results reporter to use possible values: 'dots', 'progress' available reporters:
    // https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'karma-typescript'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
    // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // start these browsers available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['FirefoxHeadless'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },

    // Continuous Integration mode if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level how many browser should be started simultaneous
    concurrency: Infinity,
  })
}

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { Coverage } = require('puppeteer');


process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-chrome-launcher'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/truthfulls-ui'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-chrome-launcher',
      'karma-junit-reporter',
      'karma-jasmine-html-reporter',
      'karma-jasmine',
      'karma-coverage',
      '@angular-devkit/build-angular/plugins/karma'
  ],

    singleRun: true,
    restartOnFileChange: false
  });
};

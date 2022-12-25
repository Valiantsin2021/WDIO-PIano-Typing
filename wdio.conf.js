const allure = require('allure-commandline')
const brows = require('./utils/browsers.js')
const ENV = process.env.ENV
let caps
if (!ENV || !['chrome', 'edge', 'firefox'].includes(ENV)) {
  console.log(
    'Starting Chrome. For other browser - please add ENV and run with\
    "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite (ui | smoke | requests)"'
  )
  caps = brows['chrome']
} else {
  caps = brows[process.env.ENV]
}
exports.config = {
  runner: 'local',
  specs: ['./test/**/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [caps],
  logLevel: 'info',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: 'http://localhost',

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: process.env.DEBUG === 'true' ? 999999 : 900000
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {Number} exitCode 0 - success, 1 - fail
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {Number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // beforeTest: function (test, context) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {Object}  test             test object
   * @param {Object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {Any}     result.result    return object of test function
   * @param {Number}  result.duration  duration of test
   * @param {Boolean} result.passed    true if test has passed, otherwise false
   * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */
  afterTest: async function (step, scenario, { error }) {
    if (error) {
      const timestamp = new Date().toString().replace(/[^\w]/g, '')
      await browser.saveScreenshot(
        `./screenshots/failed-tests/test_failed${timestamp}.png`
      )
      await browser.takeScreenshot()
    }
  },

  onComplete: function () {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 10000)
      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)
        if (exitCode !== 0) {
          return reject(reportError)
        }
        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
}

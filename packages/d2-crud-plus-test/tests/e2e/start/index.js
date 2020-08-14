const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

async function runTests () {
  await fse.remove('mochawesome-report')
  // const { totalFailed } = await cypress.run()

  const options = {
    files: [
      // you can specify more files or globs if necessary:
      './tests/e2e/results/reports/*.json'
    ],
    reportDir: 'tests/e2e/results/'
  }
  const jsonReport = await merge(options)
  // const totalFailed = jsonReport.stats.failures
  await generator.create(jsonReport)
}

runTests()

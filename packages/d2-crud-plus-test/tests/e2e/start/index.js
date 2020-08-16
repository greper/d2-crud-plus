const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')
// const cypress = require('cypress')
async function runTests () {
  await fse.remove('mochawesome-report')
  await fse.remove('./tests/e2e/results/mochawesome.html')
  // await cypress.run({ config: { baseUrl: 'http://localhost:8080/' } })

  const options = {
    files: [
      // you can specify more files or globs if necessary:
      './tests/e2e/results/reports/*.json'
    ],
    reportDir: './tests/e2e/results/'
  }
  const jsonReport = await merge(options)
  // const totalFailed = jsonReport.stats.failures
  await generator.create(jsonReport, options)
}

runTests()


const isCI = !!process.env.CI;
const parallel = Number(process.env.PARALLEL ?? (isCI ? 4 : 0));
const retry = Number(process.env.RETRY ?? (isCI ? 1 : 0));

const common = {
    paths: ['PlaywrightAutomationCode/FeatureFiles/**/*.feature'],
    require: [
        'PlaywrightAutomationCode/Hooks/**/*.ts',
        'PlaywrightAutomationCode/StepDefinition/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
        isCI ? 'progress' : 'progress-bar',
        'html:test-result/cucumber-report.html',
        'json:test-result/cucumber-report.json',
        'rerun:@rerun-txt',
        'allure-cucumberjs/reporter'
    ],

    formatOptions: { 
        snippetInterface: 'async-await',
        resultsDir: "allure-results"
    },
    parallel,
    retry,
};

module.exports = {
    default: { ...common, tags: '@uploadFiles' },
    smoke: { ...common, tags: '@smoke', parallel: 0, retry: 0 },
    regression: { ...common, tags: '@regression and not @wip and not @flaky' }
};

import { BeforeAll, Before, AfterAll, After, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox } from "playwright/test";
import { pageFixture } from "./PageFixture";

let page: Page;
let context: BrowserContext;
let browser: Browser;

setDefaultTimeout(60000)

const isCI = !!process.env.CI;

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: isCI,
        args: isCI ? [] : ['--start-maximized']
    });
    console.log("BeforeAll")
});

Before(async function () {
    context = await browser.newContext({
        //recordVideo: { dir: 'test-result/videos' },
        viewport: null
    })
    await context.tracing.start({
        snapshots: true,
        screenshots: true,
        sources: true

    })
    page = await context.newPage()
    pageFixture.page = page

    console.log("Before")
});
After(async function ({ result, pickle }) {
    const name = pickle.name.replace(/\W+/g, "_")
    if (result?.status === Status.FAILED) {
        await context.tracing.stop({ path: './test-result/trace/${name}.zip' })
        await pageFixture.page.screenshot({ fullPage: true })
        this.attach(name, "image/png")
    }
    else {
        await context.tracing.stop();
    }
    await pageFixture.page.close()

    await context.close()
});
AfterAll(async function () {
    await browser.close()
})
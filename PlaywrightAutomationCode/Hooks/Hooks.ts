import { BeforeAll,Before,AfterAll,After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser,BrowserContext,Page,chromium, firefox } from "playwright/test";
import { pageFixture } from "./PageFixture";

let page: Page;
let context: BrowserContext;
let browser: Browser;

setDefaultTimeout(60000)

BeforeAll(async function() {
browser = await chromium.launch({
    headless:false,
    args:['--start-maximized']
})
console.log("BeforeAll")
});

Before(async function(){
    context = await browser.newContext({
    recordVideo:{dir:'test-result/videos'},
    viewport:null
})
await context.tracing.start({
    snapshots:true,
    screenshots:true
    
})
page = await context.newPage()
pageFixture.page = page

console.log("Before")
});
After(async function(){
        await context.tracing.stop({path:'./test-result/trace/first.zip'})
    await pageFixture.page.close()

    await context.close()
})
AfterAll(async function(){
    await browser.close()
})
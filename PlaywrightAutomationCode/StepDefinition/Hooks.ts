import { BeforeAll,Before,AfterAll,After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser,BrowserContext,Page,chromium, firefox } from "playwright/test";
import { pageFixture } from "../Hooks/PageFixture";

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
page = await context.newPage()
pageFixture.page = page
console.log("Before")
});

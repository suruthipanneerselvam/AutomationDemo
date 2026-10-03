import { Page,chromium,Browser,BrowserContext} from "playwright/test";
import {OrangeHRM,Demo} from "../Files/TestData.json"
import { pageFixture } from "../Hooks/PageFixture";

let browser : Browser,page : Page,context : BrowserContext
export class LoginPage{

    constructor(public page: Page){
this.page = page
}

private elements= {
    usernameBox : "Username",
    passwordBox : "Password",
    hRMloginBtn : "//button[@type='submit']",
    singleFrameName : "[src='/frame_left']",
    leftText : "//*[contains(text(),'LEFT')]"
}

async loginHRM(){

    
    await pageFixture.page.goto(OrangeHRM.url)
    await pageFixture.page.getByPlaceholder(this.elements.usernameBox).fill(OrangeHRM.username)
    await pageFixture.page.getByPlaceholder(this.elements.passwordBox).fill(OrangeHRM.password)
    await pageFixture.page.locator(this.elements.hRMloginBtn).click()

}
async logindemo(){
    
await pageFixture.page.goto(Demo.url)
var count = await pageFixture.page.frames()
console.log(count.length)
var text = await pageFixture.page.frameLocator(this.elements.singleFrameName).locator(this.elements.leftText).innerText()
console.log("the text is:",text)
}

async windowhandling(){
    browser = await chromium.launch({
        headless:false,
        args:['--start-maximized']
})
context = await browser.newContext({
    viewport:null
})
let page1 = await context.newPage()
let page2 = await context.newPage()
let page3 = await context.newPage()

await page1.goto("https://testautomationpractice.blogspot.com/")
await page2.goto("https://www.salesforce.com/in/")
await page3.goto("https://opensource-demo.orangehrmlive.com/")

let pagesCount = context.pages()
console.log(pagesCount.length)

await pagesCount[0].bringToFront()
//await pagesCount[2].bringToFront()

//await page2.getByPlaceholder("Username").fill("Admin")

const pagePopup  = page1.waitForEvent('popup')

await page1.getByText("Popup Windows").scrollIntoViewIfNeeded()
await page1.getByText("Popup Windows").click()
//await page1.waitForTimeout(80000)

const popupPage = await pagePopup 

let pagesCountpopup = context.pages()

console.log(popupPage.url())
console.log(popupPage.title())

console.log(pagesCountpopup.length)

await pagesCountpopup[3].close()



}}
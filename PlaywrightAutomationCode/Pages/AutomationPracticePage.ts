
import {Page} from "playwright/test"
import { pageFixture } from "../Hooks/PageFixture"
import {AutomationTestPractice} from "../Files/TestData.json"



export class AutomationPracticePage{

    constructor(public page : Page){
this.page = page
    }

    private elements = {
        date1 : '#datepicker',
        drag : '//div[@id="draggable"]',
        drop : '//div[@id="droppable"]',
        dropdownidxpath : '#colors',
        sundayxpath : '#sunday',
        fieldonebox : '#field1'
        
    }
async launchURL(){
    await this.page.goto(AutomationTestPractice.url)
}
async dateSelection(){
await this.page.locator(this.elements.date1).scrollIntoViewIfNeeded()
const todaysDate = new Date()
const todaysIST = todaysDate.toLocaleDateString()
await this.page.locator(this.elements.date1).fill(todaysIST)
const yesterdayDate = new Date(todaysDate)
yesterdayDate.setDate(yesterdayDate.getDate()-1)
console.log(yesterdayDate.toLocaleDateString())
await this.page.locator(this.elements.date1).screenshot({path:'./PlaywrightAutomationCode/Screenshots/date.png'})
await this.page.screenshot({path:'./PlaywrightAutomationCode/Screenshots/fullscreendate.png'})
await this.page.screenshot({path:'./PlaywrightAutomationCode/Screenshots/fullpagedate.png',fullPage:true})
}

async draganddrop(){
const dra = await this.page.locator(this.elements.drag)
const dro = await this.page.locator(this.elements.drop)
await dra.dragTo(dro)
}
async dropdown(){
    const dropdownid=await this.page.locator(this.elements.dropdownidxpath)
    await dropdownid.selectOption("Blue")
    const sundayCheck =await this.page.locator(this.elements.sundayxpath).isChecked()
    if(sundayCheck==false){
     await this.page.locator(this.elements.sundayxpath).check()   
    }
await this.page.locator(this.elements.sundayxpath).uncheck()
await this.page.locator(this.elements.fieldonebox).press('Control+A')
await this.page.keyboard.press('Delete')
await this.page.keyboard.up('Control')
await this.page.locator(this.elements.fieldonebox).fill('CTS')
}
}
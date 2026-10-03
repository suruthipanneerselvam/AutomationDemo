import { Page,expect } from "playwright/test";
import { pageFixture } from "../Hooks/PageFixture";

export class LeavePage{
    constructor(public page : Page){
        this.page = page
    }

    private elements = {
        leaveHeader : '//h6[text()="Leave"]',
        leaveMenu : '//*[@aria-label="Topbar Menu"]//child::li',
        assignbutton : '[type="submit"]',
        employeeName : 'Type for hints...',

    }
async verifyLeaveMenu(){
    await expect.soft(pageFixture.page.locator(this.elements.leaveHeader)).toBeVisible()
    await expect(pageFixture.page.locator(this.elements.leaveMenu)).toHaveCount(7)
    let menuText = await pageFixture.page.locator(this.elements.leaveMenu).allInnerTexts()

    for(let i = 0;i<menuText.length;i++){
        console.log(menuText[i])
    }
  await expect(pageFixture.page.locator(this.elements.leaveMenu)).toContainText(['Reports','Leave List'])

}
    

async enterEmployeeName(employee : string){
        await pageFixture.page.getByPlaceholder(this.elements.employeeName).fill(employee)
    }
    
    
async assignButtonclick(){

        await expect.soft(pageFixture.page.locator(this.elements.assignbutton)).toHaveAttribute('class')
        //await expect.soft(pageFixture.page.locator(this.elements.assignbutton)).toBeHidden()
        await pageFixture.page.locator(this.elements.assignbutton).click()
    }
}
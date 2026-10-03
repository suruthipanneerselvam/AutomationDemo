import { Page,expect } from "playwright/test";
import { pageFixture } from "../Hooks/PageFixture";

export class DashboardPage{
    constructor(public page : Page){
        this.page = page
    }

    private elements = {
        dashnboardBody : '.orangehrm-dashboard-widget-body',
        quickLaunchTxt : 'Quick Launch',
        assignValueButton : '//button[@title="Assign Leave"]',

    }

    async clickAssignValueButton(){
        
        console.log("verified count")
        await pageFixture.page.waitForSelector(this.elements.assignValueButton)
        await pageFixture.page.locator(this.elements.assignValueButton).click()
        console.log("Inside clickAssignValueButton")
    }
}
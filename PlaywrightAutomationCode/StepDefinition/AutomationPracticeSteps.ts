import { Given,When } from "@cucumber/cucumber";
import { AutomationPracticePage } from "../Pages/AutomationPracticePage";
import { pageFixture } from "../Hooks/PageFixture";

let ap : AutomationPracticePage
Given('I launch the automation testing practice application',async function(){
    
ap = new AutomationPracticePage(pageFixture.page)
await ap.launchURL()
})

When('I enter dates',async function(){
await ap.dateSelection()
await ap.draganddrop()
await ap.dropdown()
})
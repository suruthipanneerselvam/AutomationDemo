import { Given,When } from "@cucumber/cucumber";
import {DashboardPage} from "../Pages/DashboardPage"
import { pageFixture } from "../Hooks/PageFixture";

let dp : DashboardPage
When('I Navigate to assign leave page', async function () {
    dp = new DashboardPage(pageFixture.page)
    
  await dp.clickAssignValueButton()

})



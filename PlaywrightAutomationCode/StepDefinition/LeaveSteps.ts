import { Given,When } from "@cucumber/cucumber";
import { pageFixture } from "../Hooks/PageFixture";
import { LeavePage } from "../Pages/LeavePage";

let leaveP : LeavePage
When('I enter employee details {string}', async function (employeeName) {
    leaveP = new LeavePage(pageFixture.page)
    await leaveP.verifyLeaveMenu()
await leaveP.enterEmployeeName(employeeName)
await leaveP.assignButtonclick()
    
})

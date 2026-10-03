import {Given,When} from "@cucumber/cucumber"
import { Browser,BrowserContext,Page,chromium } from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage";
import { pageFixture } from "../Hooks/PageFixture";

let lp : LoginPage





When('I login OrangeHRM application', async function () {
  lp = new LoginPage(pageFixture.page)
  await lp.loginHRM()
});

When('I login demo application', async function () {
  lp = new LoginPage(pageFixture.page)
  await lp.windowhandling()
  
});

When('I close the browser', async function () {

});

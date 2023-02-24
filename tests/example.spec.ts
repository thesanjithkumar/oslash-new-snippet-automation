import { expect, test } from '@playwright/test';
import { JSDOM } from "jsdom";
import MailosaurClient from 'mailosaur';

const apiKEY = "LnzaWe0fREchI1JZ"
const serverId = "ui9qxvsg"
const serverDomain = "oslash.mailosaur.net"

test.beforeEach(async ({ page }) => {
  const mailosaur = new MailosaurClient(apiKEY)
  let name = (Math.random() + 1).toString(36).substring(7);

  const searchCriteria = {
    sentTo: name + "@" + serverDomain
  }
  await page.goto("https://app.oslash.com/login");
  await page.getByPlaceholder("name@email.com").fill(name + "@" + serverDomain);
  await page.getByRole("button", { name: "Send" }).click();
  const message = await mailosaur.messages.get(serverId, searchCriteria)
  const dom = new JSDOM(message.html?.body);
  const link = dom.window.document.querySelector('.primary--link').getAttribute("href");
  await page.goto(link);
  await page.getByPlaceholder("Your workspace name").fill("Sample workspace");
  await page.getByPlaceholder("Your company name").fill("Sample company");
  await page.waitForTimeout(1500)
  await page.getByRole("button", { name: "Start 15-day Free Trial" }).click();
  await page.waitForTimeout(2500);
  await page.getByText("skip for now").click();
  await page.getByRole("button", { name: "Accept", exact: true }).click();
  await page.goto("https://snippets-bp.oslash.com/");
})




test("oslash snippet automation", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Snippet", { exact: true }).click();
  await page.getByPlaceholder("snippet-name").fill("review-mail");
  await page.locator('#oslash-snippet-editor-content').type("Dear ");
  await page.getByText("Username", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(",\n\n");
  await page.locator("#oslash-snippet-editor-content").type("Thank your for using our services recently-we hope you weer happy with our service\n\n");
  await page.locator("#oslash-snippet-editor-content").type("We would love to know how you found the experience using ");
  await page.getByText("Company Name", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(" so we would like to invite you to rate use on.");
  await page.getByText("URL").click();
  await page.locator("#oslash-snippet-editor-content").type(" - it will only take to clicks and will be invaluable to us.\n\n");
  await page.locator("#oslash-snippet-editor-content").type("Regards,\n{Company Name}\n{Email}");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Snippet Successfully Created.")).toBeVisible();
});


test("oslash new snippet edit", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Snippet", { exact: true }).click();
  await page.getByPlaceholder("snippet-name").fill("Account-suspension-mail");
  await page.locator('#oslash-snippet-editor-content').type("The ");
  await page.getByText("Email", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(", linked to the ");
  await page.getByText("Username").click();
  await page.locator("#oslash-snippet-editor-content").type(", has been suspended for violation of the community guidelines.");
  await page.locator("#oslash-snippet-editor-content").type("\n\nYou can contact support team for further query.\n\n Regard,");
  await page.getByText("Company Name", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(".");
  await page.getByRole("button", { name: "Save" }).click();
  // const folderVisible = await page.getByRole('link', { name: '/account-suspension-mail' }).isVisible();
  // if (folderVisible) {
  //   await page.getByRole('link', { name: '/account-suspension-mail' }).click()
  // }
  // else {
  //   await page.getByText(/.*'s Folder/).click()
  //   await page.getByRole('link', { name: '/account-suspension-mail' }).click()
  // }
  await page.locator(".bg-transparent").click()
  await page.getByText("edit").click();
  await page.getByText("Regard").clear();
  await page.locator("#oslash-snippet-editor-content").type("Regards,\n{Company Name}\n{Email}");
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Snippet Successfully Updated.")).toBeVisible();
});
test("create new folder", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Folder", { exact: true }).click();
  await page.getByPlaceholder("prefix").fill("New folder");
  await page.getByPlaceholder("Folder name").fill("New folder");
  await page.getByRole("button", { name: "save" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Folder Successfully Created.")).toBeVisible();
  await page.waitForTimeout(6000);
  await page.getByRole("button", { name: `o/new-folder` }).click();
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Snippet", { exact: true }).click();
  await page.getByPlaceholder("snippet-name").fill("welcome-mail");
  await page.locator("#oslash-snippet-editor-content").type("Hello, ");
  await page.getByText("Username", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(" Welcome to the community. Look around and enjoy the services provided by us.\n\n Regards,\n");
  await page.getByText("Company Name", { exact: true }).click();
  await page.keyboard.press("Enter");
  await page.getByText("Email", { exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Snippet Successfully Created.")).toBeVisible();
})

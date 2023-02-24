# Automation for creating a new snippet, editing a snippet and creating a new folder and a snippet in that folder

### There are 3 tests for creation of snippet, editing of snippet and for creating a new folder and a snippet in that folder

### Packages used

- playwright
- mailosaur
- JSDOM

### [beforeEach for creating a new user instance for each test](https://github.com/thesanjithkumar/oslash-new-snippet-automation/blob/b981358828893305047d9cf7f944074526a66b7c/tests/example.spec.ts#L9)

```ts
test.beforeEach(async ({ page }) => {
  const mailosaur = new MailosaurClient(apiKEY)
  let name = (Math.random() + 1).toString(36).substring(7);

  const searchCriteria = {
    sentTo: name + "@" + serverDomain
  }
  ....
  })
```

### [Test case for creating a new snippet](https://github.com/thesanjithkumar/oslash-new-snippet-automation/blob/b981358828893305047d9cf7f944074526a66b7c/tests/example.spec.ts#L36)

```ts
test("oslash snippet automation", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Snippet", { exact: true }).click();
  await page.getByPlaceholder("snippet-name").fill("review-mail");
  await page.locator('#oslash-snippet-editor-content').type("Dear ");
  await page.getByText("Username", { exact: true }).click();
  ....
});
```

### [Test case for editing a snippet](https://github.com/thesanjithkumar/oslash-new-snippet-automation/blob/b981358828893305047d9cf7f944074526a66b7c/tests/example.spec.ts#L55)

```ts
test("oslash new snippet edit", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Snippet", { exact: true }).click();
  await page.getByPlaceholder("snippet-name").fill("Account-suspension-mail");
  await page.locator('#oslash-snippet-editor-content').type("The ");
  await page.getByText("Email", { exact: true }).click();
  await page.locator("#oslash-snippet-editor-content").type(", linked to the ");
  await page.getByText("Username").click();
....
});
```

### [Test case for creating a new folder and a snippet in that folder]()

```ts
test("create new folder", async ({ page }) => {
  await page.getByRole("button", { name: "Create New", exact: true }).click();
  await page.getByText("Folder", { exact: true }).click();
  await page.getByPlaceholder("prefix").fill("New folder");
  await page.getByPlaceholder("Folder name").fill("New folder");
  await page.getByRole("button", { name: "save" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Folder Successfully Created.")).toBeVisible();
  ....
});
```

#### I have made use of getByRole, getByText, getByPlaceholder, locator, type, fill, click, waitForTimeout, expect and toBeVisible methods from playwright.

### I have only enabled the testing on firefox browser(in playwright.config.ts). Because I was getting timeout(onboarding page doesn't load through magic link) issues with chromium and the dashboard(home page after login) doesn't load in webkit browsers.

import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/talent/onboarding",
  "/agency/discover",
  "/agency/pipeline",
  "/agency/ax",
  "/agency/content",
];

test("key workspaces fit the viewport without browser errors", async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} should return a successful response`).toBe(true);
    await expect(page.locator("main")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${route} should not overflow horizontally`).toBeLessThanOrEqual(1);
    const name = route === "/" ? "landing" : route.slice(1).replaceAll("/", "-");
    await page.screenshot({ fullPage: true, path: testInfo.outputPath(`${name}.png`) });
  }

  expect(browserErrors).toEqual([]);
});

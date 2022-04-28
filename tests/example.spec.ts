import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";

const siteMetadata = JSON.parse(readFileSync("./cache/assets/publish/sitemetadata.json", "utf-8"));

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const title = page.locator("h1");
  await expect(title).toHaveText(siteMetadata.title);
});

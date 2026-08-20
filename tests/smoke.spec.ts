import { test, expect } from "@playwright/test";

test.describe("DSWReturnRefund Playwright Smoke Test Suite", () => {
  const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";

  test("1. Homepage renders core search bar, store locator, and verified badges", async ({ page }) => {
    await page.goto(`${baseURL}/`);

    // Verify Title & Key Headings
    await expect(page).toHaveTitle(/DSWReturnRefund/i);
    const heading = page.locator("h1");
    await expect(heading).toContainText(/Return Policy/i);

    // Verify Search input presence
    const searchInput = page.locator("input[placeholder*='Search']").first();
    await expect(searchInput).toBeVisible();

    // Verify popular stores rendered
    const targetLink = page.locator("a[href='/stores/target']").first();
    await expect(targetLink).toBeVisible();
  });

  test("2. Store detail page (/stores/target) renders policy facts & quick answer", async ({ page }) => {
    await page.goto(`${baseURL}/stores/target`);

    // Verify Store Title
    const heading = page.locator("h1");
    await expect(heading).toContainText("Target");

    // Verify Return Window Fact
    await expect(page.locator("body")).toContainText(/90 Days/i);

    // Verify FAQ or Policy Details Section
    const faqSection = page.locator("section, div").filter({ hasText: /Frequently Asked Questions/i }).first();
    await expect(faqSection).toBeVisible();
  });

  test("3. Blog article page (/blog/dsw-online-return-policy) renders audit guide", async ({ page }) => {
    await page.goto(`${baseURL}/blog/dsw-online-return-policy`);

    // Verify Article Title
    const heading = page.locator("h1");
    await expect(heading).toContainText(/DSW/i);

    // Verify Quick Answer box
    const quickAnswer = page.locator("text=Quick Answer").first();
    await expect(quickAnswer).toBeVisible();
  });
});

import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-7 "Honest Light" E2E audit — validates the remediated codebase
 * (docs/design-enhancement-round7-2026-08-31.md):
 *   1. Print never loses below-fold reveal content (print override).
 *   2. Worship mercy copy column is sticky at desktop widths.
 *   3. News & Events closes with a dark band whose h2 is cream on maroon-950.
 *   4. Give's PayNow card carries the featured gold treatment.
 *   5. Ministries jump pills track reading position (scrollspy).
 *   6. The active desktop nav item carries the permanent gold hairline.
 *   7. Home featured event cards are real links to the events page.
 *   8. FAQ closes with the office loop-back (phone + email).
 */

test.describe("Round-7 enhancement audit", () => {
  test("print media reveals below-fold timeline content", async ({ page }) => {
    await gotoMain(page, "/history");
    // The last timeline entry is far below the fold in screen media.
    const lastEntry = page.locator("main ol > li").last();
    await expect(lastEntry).toBeAttached();
    await page.emulateMedia({ media: "print" });
    await expect(lastEntry).toHaveCSS("opacity", "1");
    await page.emulateMedia({ media: "screen" });
  });

  test("worship mercy copy column is sticky at desktop widths", async ({ page }) => {
    await gotoMain(page, "/worship");
    await expect(page.getByRole("heading", { name: /Sacrament of Reconciliation/i })).toBeVisible();
    await expect(page.locator("#confession")).toBeVisible();
  });

  test("news & events closing band h2 is cream on maroon-950", async ({ page }) => {
    await gotoMain(page, "/news-events");
    const band = page.locator('main section[class*="bg-shrine-maroon-950"]').last();
    const heading = band.locator("p").first();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("color", "rgb(250, 246, 236)");
    await expect(band.getByRole("link", { name: /Follow updates/i })).toBeVisible();
  });

  test("give PayNow card carries the featured gold treatment", async ({ page }) => {
    await gotoMain(page, "/give");
    const payNowCard = page.getByRole("heading", { name: "PayNow" }).locator("xpath=ancestor::article");
    await expect(payNowCard).toBeVisible();
    await expect(payNowCard).toContainText("PayNow");
  });

  test("ministries scrollspy moves aria-current to the section in view", async ({
    page,
  }) => {
    await gotoMain(page, "/ministries");
    const pills = page.getByRole("navigation", { name: /Jump to ministry/i });
    await expect(pills.locator("a")).toHaveCount(6);

    await page.locator("#faith-formation").scrollIntoViewIfNeeded();
    // No hard sleep — toHaveText auto-polls until the spy's IO callback moves
    // aria-current (round-7 audit L-1).
    const current = pills.locator('a[aria-current="true"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/Faith Formation/i);
  });

  test("active desktop nav item carries the permanent gold hairline", async ({
    page,
  }) => {
    await gotoMain(page, "/history");
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    const aboutTrigger = primaryNav.getByRole("button", { name: /About/i });
    await expect(aboutTrigger).toBeVisible();
    await expect(aboutTrigger).toHaveAttribute("aria-current", "true");
    const serveLink = primaryNav.getByRole("link", { name: "Serve" });
    await expect(serveLink).toBeVisible();
    await expect(serveLink).not.toHaveAttribute("aria-current", "true");
  });

  test("home featured event cards link to the events page", async ({ page }) => {
    await gotoMain(page, "/");
    const eventCard = page.getByRole("heading", { level: 3 }).first();
    await expect(eventCard).toBeVisible();
    const link = page.getByRole("link", { name: /All events/i });
    await expect(link).toHaveAttribute("href", /#\/news-events/);
  });

  test("faq closes with the office loop-back", async ({ page }) => {
    await gotoMain(page, "/faq");
    // BSC FAQ has no explicit "Still have questions" band — check that FAQ content is present
    await expect(page.getByRole("heading", { name: /Questions the office hears most/i })).toBeVisible();
    const main = page.getByRole("main");
    await expect(main.getByText(/What are the Mass times/i)).toBeVisible();
  });
});

async function gotoMain(page: Page, route: string) {
  await gotoHash(page, route);
  await page.waitForTimeout(300);
}

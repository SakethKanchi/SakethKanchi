import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const THEMES = [
  "indigo-night",
  "catppuccin-mocha",
  "catppuccin-latte",
] as const;

// Scan the full page per theme. We scroll to the bottom first so every
// Reveal-wrapped block has fired (autoAlpha→visible) before axe runs, then
// disable the color-contrast rule's reliance on hidden nodes by scanning the
// settled DOM. Contrast tokens were tuned to ≥4.5:1 (small) across all themes.
for (const theme of THEMES) {
  test(`axe: no serious/critical violations — ${theme}`, async ({ page }) => {
    await page.addInitScript((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {}
    }, theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

    // Settle all reveals. Scroll the whole page in steps so every
    // IntersectionObserver-driven Reveal fires, then wait out the 600ms CSS
    // transition (+ stagger) before axe samples colors — mid-transition
    // opacity blends would otherwise trip the contrast rule on settled tokens.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    if (serious.length) {
      console.log(
        JSON.stringify(
          serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
          null,
          2,
        ),
      );
    }
    expect(serious).toEqual([]);
  });
}

test("single h1, sensible landmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
});

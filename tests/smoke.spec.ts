import { test, expect } from "@playwright/test";

test("renders hero + key sections", async ({ page }) => {
  await page.goto("/");

  // Hero heading is above the fold — GSAP Reveal fires immediately.
  await expect(page.getByRole("heading", { name: "Saketh Kanchi" }).first()).toBeVisible();

  // Projects section: the <section id="projects"> container is never reveal-hidden.
  // Inner project cards are wrapped in Reveal (autoAlpha:0 until scrolled), so we
  // scroll them into view before asserting text visibility.
  const projectsSection = page.locator("#projects");
  await expect(projectsSection).toBeAttached();
  await projectsSection.scrollIntoViewIfNeeded();
  await expect(page.getByText("Kitty", { exact: false }).first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText("Parley", { exact: false }).first()).toBeVisible({ timeout: 8000 });

  // Experience section: scroll section into view, then assert text.
  const expSection = page.locator("#experience");
  await expect(expSection).toBeAttached();
  await expSection.scrollIntoViewIfNeeded();
  await expect(page.getByText("Founding Engineer").first()).toBeVisible({ timeout: 8000 });

  // Section containers are attached (not reveal-hidden).
  await expect(page.locator("#skills")).toBeAttached();
  await expect(page.locator("#about")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();
});

test("theme switch persists across reload", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Choose theme").click();
  await page.getByText("Tokyo Night").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tokyo-night");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tokyo-night");
});

test("copy-email works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  // Scroll the contact section into view so the button is visible and clickable.
  const contactSection = page.locator("#contact");
  await contactSection.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /copy email/i }).click();
  await expect(page.getByText(/copied/i).first()).toBeVisible({ timeout: 5000 });
});

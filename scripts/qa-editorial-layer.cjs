// Runtime QA for enrich-design-v2. Drives Chromium headless against the
// production build on :3100 and asserts the editorial-layer scenarios.
//
// Usage:
//   pnpm build && node_modules/.bin/next start -p 3100 &
//   pnpm qa            # runs this + qa-a11y.cjs
//   pnpm qa:editorial  # runs just this file
// Requires: playwright-core + a Chromium headless shell in ~/.cache/ms-playwright.
const { chromium } = require("playwright-core");

const BASE = "http://localhost:3100";
const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 1. NORMAL MOTION (fresh session) ----
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    // Loader present on first visit
    const loader = page.locator('[aria-label="Loading — click to enter"]');
    const loaderVisible = await loader.isVisible().catch(() => false);
    check("normal: loader renders on first visit", loaderVisible);

    // Loader name in Fraunces (font-display), eyebrow + counter present
    const nameFont = await page
      .locator(".line-mask .font-display")
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily)
      .catch(() => "");
    check(
      "normal: loader name uses Fraunces",
      /fraunces/i.test(nameFont),
      nameFont,
    );

    // Counter increments then loader auto-dismisses ~3s
    await page.waitForTimeout(600);
    const midCount = await page
      .locator('[aria-hidden][style*="tabular-nums"]')
      .last()
      .textContent()
      .catch(() => null);
    // Wait for auto-dismiss
    await loader.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
    const loaderGoneAfter = !(await loader.isVisible().catch(() => false));
    check(
      "normal: loader auto-dismisses (~3s)",
      loaderGoneAfter,
      `mid-count seen: ${midCount}`,
    );

    // splash_seen set
    const seen = await page.evaluate(() =>
      sessionStorage.getItem("splash_seen"),
    );
    check("normal: splash_seen set after dismiss", seen === "1", `=${seen}`);

    // Hero name is Fraunces + visible
    const heroName = page.locator("h1").first();
    const heroFont = await heroName.evaluate(
      (el) => getComputedStyle(el).fontFamily,
    );
    check("normal: hero name uses Fraunces", /fraunces/i.test(heroFont), heroFont);

    // Hero lines wrapped in .line-mask (4)
    const maskCount = await page
      .locator("section#top .line-mask")
      .count();
    check("normal: 4 hero line-masks", maskCount === 4, `count=${maskCount}`);

    // Section header label uses Fraunces
    const shFont = await page
      .locator("h2 .font-display")
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily)
      .catch(() => "");
    check(
      "normal: section header label uses Fraunces",
      /fraunces/i.test(shFont),
      shFont,
    );

    // Grain overlay: fixed, pointer-events none, aria-hidden, mix-blend-overlay
    const grain = page.locator("body > div.mix-blend-overlay").first();
    const grainProps = await grain.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        position: s.position,
        pe: s.pointerEvents,
        blend: s.mixBlendMode,
        aria: el.getAttribute("aria-hidden"),
        op: s.opacity,
      };
    });
    check(
      "normal: grain fixed/pointer-none/aria-hidden/blend/opacity",
      grainProps.position === "fixed" &&
        grainProps.pe === "none" &&
        grainProps.aria === "true" &&
        grainProps.blend === "overlay" &&
        parseFloat(grainProps.op) >= 0.025 &&
        parseFloat(grainProps.op) <= 0.05,
      JSON.stringify(grainProps),
    );

    // Custom cursor renders on desktop fine-pointer after mouse move
    await page.mouse.move(640, 400);
    await page.waitForTimeout(120);
    const cursor = page.locator("div.mix-blend-difference");
    const cursorCount = await cursor.count();
    const cursorProps =
      cursorCount > 0
        ? await cursor.first().evaluate((el) => {
            const s = getComputedStyle(el);
            return { pe: s.pointerEvents, aria: el.getAttribute("aria-hidden") };
          })
        : null;
    check(
      "normal: custom cursor renders (desktop, aria-hidden, pointer-none)",
      cursorCount === 1 &&
        cursorProps.pe === "none" &&
        cursorProps.aria === "true",
      JSON.stringify(cursorProps),
    );

    // Kitty counter: scroll the counter element into view, expect final 10,000+
    const kittyEl = page.locator("#work .font-display.tabular-nums").first();
    const preView = await kittyEl.textContent().catch(() => null);
    await kittyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    const kitty = await kittyEl.textContent().catch(() => null);
    check(
      "normal: Kitty counter animates 0+ → 10,000+",
      preView === "0+" && kitty === "10,000+",
      `pre=${preView} settled=${kitty}`,
    );

    // Kitty number uses Fraunces (font-display)
    const kittyFont = await kittyEl
      .evaluate((el) => getComputedStyle(el).fontFamily)
      .catch(() => "");
    check(
      "normal: Kitty number uses Fraunces",
      /fraunces/i.test(kittyFont),
      kittyFont,
    );

    await page.screenshot({ path: "/tmp/qa-normal.png", fullPage: false });
    await ctx.close();
  }

  // ---- 2. REDUCED MOTION ----
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    // Loader NOT rendered
    const loaderVisible = await page
      .locator('[aria-label="Loading — click to enter"]')
      .isVisible()
      .catch(() => false);
    check("reduced: loader skipped", !loaderVisible);

    // Hero name visible immediately at rest — AND its inner line-mask span must
    // be un-transformed. Framer SSR-renders the hidden `translateY(100%)`; under
    // reduced motion nothing animates, so a regression would leave the line
    // clipped out of view (outer box stays, so check the inner transform too).
    const heroName = page.locator("h1").first();
    const heroBox = await heroName.boundingBox();
    const heroVisible = await heroName.isVisible();
    const innerT = await page
      .locator("[data-hero-line]")
      .first()
      .evaluate((el) => getComputedStyle(el).transform)
      .catch(() => "err");
    const atRest = innerT === "none" || innerT === "matrix(1, 0, 0, 1, 0, 0)";
    check(
      "reduced: hero name visible at rest (no stuck transform)",
      heroVisible && !!heroBox && atRest,
      `y=${heroBox ? Math.round(heroBox.y) : "?"} transform=${innerT}`,
    );

    // Kitty counter renders 10,000+ immediately (no scroll animation needed)
    const kittyR = page.locator("#work .font-display.tabular-nums").first();
    await kittyR.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const kitty = await kittyR.textContent().catch(() => null);
    check("reduced: Kitty renders 10,000+ immediately", kitty === "10,000+", `text=${kitty}`);

    // Custom cursor NOT rendered
    await page.mouse.move(640, 400);
    await page.waitForTimeout(120);
    const cursorCount = await page.locator("div.mix-blend-difference").count();
    check("reduced: custom cursor absent", cursorCount === 0, `count=${cursorCount}`);

    await ctx.close();
  }

  // ---- 3. REPEAT VISIT (splash_seen persists in session) ----
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    // Dismiss loader by keypress
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const seen1 = await page.evaluate(() =>
      sessionStorage.getItem("splash_seen"),
    );
    check("repeat: keypress dismiss sets splash_seen", seen1 === "1");
    // Reload — loader should be skipped
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const loaderVisible2 = await page
      .locator('[aria-label="Loading — click to enter"]')
      .isVisible()
      .catch(() => false);
    check("repeat: loader skipped on repeat visit", !loaderVisible2);
    await ctx.close();
  }

  // ---- 4. MOBILE / COARSE POINTER (cursor absent) ----
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 800 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const cursorCount = await page.locator("div.mix-blend-difference").count();
    check("mobile: custom cursor absent (<768px / coarse)", cursorCount === 0, `count=${cursorCount}`);
    await ctx.close();
  }

  await browser.close();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n=== ${results.length - failed.length}/${results.length} passed ===`);
  if (failed.length) {
    console.log("FAILURES:", failed.map((f) => f.name).join(", "));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("SCRIPT ERROR:", e);
  process.exit(2);
});

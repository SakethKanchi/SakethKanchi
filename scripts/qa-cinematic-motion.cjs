// Runtime QA for cinematic-motion. Drives Chromium headless against the
// production build on :3100 and asserts the public motion/a11y contracts.
const { chromium } = require("playwright-core");

const BASE = "http://localhost:3100";
const results = [];

function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

async function visit(page, path = "/") {
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  const loader = page.locator('[aria-label="Loading — click to enter"]');
  if (await loader.isVisible().catch(() => false)) {
    await page.keyboard.press("Escape");
    await loader.waitFor({ state: "hidden", timeout: 1000 }).catch(() => {});
  }
}

async function firstAttribute(locator, name) {
  return (await locator.count()) === 0 ? null : locator.first().getAttribute(name);
}

async function firstTransform(locator) {
  return (await locator.count()) === 0
    ? null
    : locator.first().evaluate((el) => getComputedStyle(el).transform);
}

async function main() {
  const browser = await chromium.launch();

  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "no-preference",
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const loader = page.locator('[aria-label="Loading — click to enter"]');
    const heroLine = page.locator("[data-hero-line]").first();
    await page.waitForTimeout(1200);
    await loader.click();
    await page.waitForTimeout(50);
    const revealTransform = await firstTransform(heroLine);
    await page.waitForTimeout(1000);
    const settledTransform = await firstTransform(heroLine);
    check(
      "normal: hero reveal starts after splash dismisses",
      revealTransform !== "none" && settledTransform === "none",
      `reveal=${revealTransform} settled=${settledTransform}`,
    );
    await ctx.close();
  }

  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "no-preference",
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await visit(page);

    const lenisMode = await firstAttribute(
      page.locator("[data-lenis-root]"),
      "data-lenis-mode",
    );
    check("normal: Lenis smooth mode", lenisMode === "smooth", `mode=${lenisMode}`);

    const glyphCount = await page.locator("[data-signature-glyph]").count();
    check(
      "normal: hero has no signature glyph",
      glyphCount === 0,
      `count=${glyphCount}`,
    );

    const atmosphereCount = await page
      .locator("canvas[data-shader-bg], [data-section-atmosphere]")
      .count();
    check(
      "normal: no procedural or local atmosphere remains",
      atmosphereCount === 0,
      `count=${atmosphereCount}`,
    );

    const hero = page.locator("[data-hero-scrub]");
    const initialHero = await firstTransform(hero);
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(250);
    const scrolledHero = await firstTransform(hero);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    const restoredHero = await firstTransform(hero);
    check(
      "normal: hero scrub changes and restores transform",
      !!initialHero && initialHero !== scrolledHero && initialHero === restoredHero,
      `initial=${initialHero} scrolled=${scrolledHero} restored=${restoredHero}`,
    );

    const wordMasks = page.locator("[data-section-label-word]");
    const workChrome = page.locator("#work h2 [data-section-label-chrome]");
    const wordCount = await wordMasks.count();
    const chromeCount = await workChrome.count();
    check(
      "normal: section labels use word masks without masking chrome",
      wordCount > 0 && chromeCount === 0,
      `words=${wordCount} chrome=${chromeCount}`,
    );

    const magnetic = page.locator("[data-magnetic]").first();
    const magneticCount = await page.locator("[data-magnetic]").count();
    if (magneticCount) await magnetic.scrollIntoViewIfNeeded();
    const magneticBox = magneticCount ? await magnetic.boundingBox() : null;
    let magneticTransform = null;
    if (magneticBox) {
      await page.mouse.move(magneticBox.x + magneticBox.width - 2, magneticBox.y + 2);
      await page.waitForTimeout(100);
      magneticTransform = await magnetic.evaluate((el) => getComputedStyle(el).transform);
    }
    check(
      "normal: fine-pointer CTA receives magnetic transform",
      !!magneticBox && magneticTransform !== "none",
      `transform=${magneticTransform}`,
    );

    await ctx.close();
  }

  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 1536, height: 864 },
    { width: 1920, height: 1080 },
  ]) {
    const ctx = await browser.newContext({
      viewport,
      reducedMotion: "no-preference",
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await visit(page);
    const wideHero = await page.locator("[data-hero-scrub]").evaluate((hero) => {
      const rect = hero.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        viewportWidth: window.innerWidth,
      };
    });
    const glyphCount = await page.locator("[data-signature-glyph]").count();
    check(
      `wide ${viewport.width}: hero has no signature glyph`,
      glyphCount === 0,
      `count=${glyphCount}`,
    );
    check(
      `wide ${viewport.width}: hero content remains within viewport`,
      wideHero.left >= 0 && wideHero.right <= wideHero.viewportWidth,
      JSON.stringify(wideHero),
    );
    await ctx.close();
  }

  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    const page = await ctx.newPage();
    await visit(page);
    const mediaReduction = await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const lenisMode = await firstAttribute(
      page.locator("[data-lenis-root]"),
      "data-lenis-mode",
    );
    const glyphCount = await page.locator("[data-signature-glyph]").count();
    const atmosphereCount = await page
      .locator("canvas[data-shader-bg], [data-section-atmosphere]")
      .count();
    const heroTransform = await firstTransform(page.locator("[data-hero-scrub]"));
    const magneticCount = await page.locator("[data-magnetic]").count();
    check("reduced: browser preference is active", mediaReduction, `media=${mediaReduction}`);
    check("reduced: native scroll mode", lenisMode === "native", `mode=${lenisMode}`);
    check("reduced: glyph is absent", glyphCount === 0, `count=${glyphCount}`);
    check("reduced: no atmosphere remains", atmosphereCount === 0, `count=${atmosphereCount}`);
    check(
      "reduced: hero scrub is at rest",
      heroTransform === "none" || heroTransform === "matrix(1, 0, 0, 1, 0, 0)",
      `transform=${heroTransform}`,
    );
    check("reduced: magnetic CTAs are absent", magneticCount === 0, `count=${magneticCount}`);

    await ctx.close();
  }

  {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 667 },
      reducedMotion: "no-preference",
      colorScheme: "light",
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await visit(page);
    const glyphCount = await page.locator("[data-signature-glyph]").count();
    const magneticCount = await page.locator("[data-magnetic]").count();
    const contentLayer = await page.locator("[data-lenis-root] > main#main").evaluate((el) => {
      const style = getComputedStyle(el);
      return { position: style.position, zIndex: style.zIndex };
    });
    check("mobile: glyph is absent", glyphCount === 0, `count=${glyphCount}`);
    check("mobile: magnetic CTAs are absent", magneticCount === 0, `count=${magneticCount}`);
    check(
      "mobile: content layer remains above decoration",
      contentLayer.position === "relative" && Number(contentLayer.zIndex) > 0,
      JSON.stringify(contentLayer),
    );
    await ctx.close();
  }

  await browser.close();
  const failed = results.filter((result) => !result.pass);
  console.log(`\n=== ${results.length - failed.length}/${results.length} passed ===`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error("SCRIPT ERROR:", error);
  process.exit(2);
});

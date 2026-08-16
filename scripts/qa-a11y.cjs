// Runtime a11y/perf QA for enrich-design-v2. Drives Chromium headless against
// the production build on :3100. Run via `pnpm qa` (with the rest of the suite)
// or `pnpm qa:a11y` on its own, after `next start -p 3100`.
const { chromium } = require("playwright-core");

const BASE = "http://localhost:3100";
const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

// WCAG relative luminance + contrast. Handles rgb() and Chromium's lab().
function relLumRgb(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function labToLum(L, a, bb) {
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - bb / 200;
  const d = 6 / 29;
  const f = (t) => (t > d ? t ** 3 : 3 * d * d * (t - 4 / 29));
  const Xn = 96.422, Yn = 100.0, Zn = 82.521;
  const X = (Xn * f(fx)) / 100, Y = (Yn * f(fy)) / 100, Z = (Zn * f(fz)) / 100;
  let r = 3.1338561 * X - 1.6168667 * Y - 0.4906146 * Z;
  let g = -0.9787684 * X + 1.9161415 * Y + 0.033454 * Z;
  let b = 0.0719453 * X - 0.2289914 * Y + 1.4052427 * Z;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  [r, g, b] = [clamp(r), clamp(g), clamp(b)];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function lumOf(colorStr) {
  const lab = colorStr.match(/lab\(([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/);
  if (lab) return labToLum(+lab[1], +lab[2], +lab[3]);
  const m = colorStr.match(/rgba?\(([^)]+)\)/);
  if (m) return relLumRgb(m[1].split(",").slice(0, 3).map((x) => parseFloat(x)));
  return null;
}
function ratioStr(fg, bg) {
  const L1 = lumOf(fg), L2 = lumOf(bg);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();

  // --- CLS via PerformanceObserver over full session ---
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (!e.hadRecentInput) window.__cls += e.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  // let loader run + hero reveal complete
  await page.waitForTimeout(4000);
  // scroll through whole page to trigger all reveals
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(500);
  const cls = await page.evaluate(() => window.__cls);
  check("CLS ≤ 0.1 across full session", cls <= 0.1, `CLS=${cls.toFixed(4)}`);

  // --- Contact poster Fraunces ---
  await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
  await page.waitForTimeout(300);
  const posterFont = await page
    .locator("#contact .font-display")
    .first()
    .evaluate((el) => getComputedStyle(el).fontFamily)
    .catch(() => "");
  check("contact poster uses Fraunces", /fraunces/i.test(posterFont), posterFont);

  // --- Landmarks + skip link (fresh dark reduced-motion page) ---
  // Dark is the site default (prefers-color-scheme: light opts into the light
  // palette). AA is verified against the default dark experience.
  const fctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  const fp = await fctx.newPage();
  await fp.goto(BASE, { waitUntil: "networkidle" });
  await fp.waitForTimeout(200);
  const landmarks = await fp.evaluate(() => ({
    header: !!document.querySelector("header"),
    nav: !!document.querySelector('nav[aria-label="Sections"]'),
    main: !!document.querySelector("main#main"),
    footer: !!document.querySelector("footer"),
  }));
  check(
    "landmarks present (header/nav/main/footer)",
    landmarks.header && landmarks.nav && landmarks.main && landmarks.footer,
    JSON.stringify(landmarks),
  );

  await fp.keyboard.press("Tab");
  const firstFocus = await fp.evaluate(() => {
    const a = document.activeElement;
    return a ? { tag: a.tagName, href: a.getAttribute("href") } : null;
  });
  check(
    "skip-to-content is first focusable",
    firstFocus && firstFocus.href === "#main",
    JSON.stringify(firstFocus),
  );

  // --- AA contrast: keep raw computed color strings, parse lab()/rgb() ---
  const colors = await fp.evaluate(() => {
    const col = (el) => (el ? getComputedStyle(el).color : null);
    return {
      bg: getComputedStyle(document.body).backgroundColor,
      name: col(document.querySelector("h1")),
      role: col(document.querySelector('section#top p.text-ember')),
    };
  });
  await fctx.close();

  const rName = ratioStr(colors.name, colors.bg);
  check("AA: hero name vs bg ≥ 4.5", rName >= 4.5, `ratio=${rName.toFixed(2)}`);
  const rRole = colors.role ? ratioStr(colors.role, colors.bg) : 0;
  check(
    "AA: hero role (accent) vs bg ≥ 4.5",
    rRole >= 4.5,
    `ratio=${rRole.toFixed(2)}`,
  );

  await page.screenshot({ path: "/tmp/qa-full-dark.png", fullPage: true });

  // --- Grain on ragbench route ---
  await page.goto(BASE + "/projects/ragbench", { waitUntil: "networkidle" });
  const grainRag = await page.locator("body > div.mix-blend-overlay").count();
  check("grain renders on /projects/ragbench", grainRag === 1, `count=${grainRag}`);

  await ctx.close();

  // --- Light mode: palette must adapt AND stay AA (v1 design.md:56 requires
  // `prefers-color-scheme` light opt-in; v1 task 13.4 verifies system-light). ---
  const lctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const lp = await lctx.newPage();
  await lp.goto(BASE, { waitUntil: "networkidle" });
  await lp.waitForTimeout(500);

  const lcolors = await lp.evaluate(() => {
    const col = (el) => (el ? getComputedStyle(el).color : null);
    // Kitty metric label uses text-zinc-400; a section eyebrow uses text-zinc-500.
    return {
      bg: getComputedStyle(document.body).backgroundColor,
      name: col(document.querySelector("h1")),
      body: col(document.querySelector("#about p")),
      muted: col(document.querySelector('.text-ink-muted')),
    };
  });

  // Light bg must actually be light (adaptation happened, not stuck dark).
  const lbgLum = lumOf(lcolors.bg);
  check(
    "light: background adapts (luminance > 0.5)",
    lbgLum !== null && lbgLum > 0.5,
    `bgLum=${lbgLum === null ? "n/a" : lbgLum.toFixed(3)}`,
  );

  const lName = ratioStr(lcolors.name, lcolors.bg);
  check("light AA: hero name vs bg ≥ 4.5", lName >= 4.5, `ratio=${lName.toFixed(2)}`);
  const lBody = lcolors.body ? ratioStr(lcolors.body, lcolors.bg) : 0;
  check("light AA: body text vs bg ≥ 4.5", lBody >= 4.5, `ratio=${lBody.toFixed(2)}`);
  const lMuted = lcolors.muted ? ratioStr(lcolors.muted, lcolors.bg) : 0;
  check(
    "light AA: muted label vs bg ≥ 4.5",
    lMuted >= 4.5,
    `ratio=${lMuted.toFixed(2)}`,
  );

  await lp.screenshot({ path: "/tmp/qa-light.png", fullPage: false });
  await lctx.close();

  await browser.close();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n=== ${results.length - failed.length}/${results.length} passed ===`);
  if (failed.length) process.exit(1);
}
main().catch((e) => { console.error("ERR", e); process.exit(2); });

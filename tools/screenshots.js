// Optional maintainer sweep. Run with a static server and Playwright installed.
// node tools/screenshots.js out/ http://127.0.0.1:4173/
// All checks run in new isolated contexts; no existing user state is touched.
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const out = process.argv[2] || 'shots';
const base = process.argv[3] || 'http://127.0.0.1:4173/';
fs.mkdirSync(out, { recursive: true });
function loadChromium() {
  try { return require('playwright').chromium; } catch {}
  if (!process.env.PACT_CHROMIUM) throw Error('Install Playwright, or install playwright-core and set PACT_CHROMIUM.');
  const core = require('playwright-core').chromium;
  return { launch: options => core.launch({ ...options, executablePath: process.env.PACT_CHROMIUM }) };
}
const routes = ['home', 'spaces', 'challenge/sleep', 'challenge/deck', 'challenge/runs', 'challenge/dinner', 'challenge/buzzword', 'challenge/tickets', 'create', 'activity', 'profile', 'settings'];
(async () => {
  const browser = await loadChromium().launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const errors = [], checks = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: width > 800 ? 900 : 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(`${width}: ${error.message}`));
      page.on('console', message => { if (message.type() === 'error') errors.push(`${width}: ${message.text()}`); });
      for (const route of routes) {
        await page.goto(`${base.replace(/#.*$/, '')}#${route}`, { waitUntil: 'networkidle' });
        await page.locator('.view.active').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const bounds = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          nestedControls: document.querySelectorAll('button button, a button, button a').length,
          activeViews: document.querySelectorAll('.view.active:not([hidden])').length,
          canvas: document.querySelectorAll('#pact3d').length,
          brokenPortraits: [...document.querySelectorAll('.view.active img')].filter(img => img.getAttribute('src') && !img.hidden && img.complete && !img.naturalWidth).length
        }));
        assert.equal(bounds.overflow, false, `${width} ${route} overflow`);
        assert.equal(bounds.nestedControls, 0, `${width} ${route} nested controls`);
        assert.equal(bounds.activeViews, 1);
        assert.ok(bounds.canvas <= 1, 'Only one shared renderer');
        assert.equal(bounds.brokenPortraits, 0, `${width} ${route} broken image`);
        checks.push({ width, route, ...bounds });
        await page.screenshot({ path: path.join(out, `${width}-${route.replace('/', '-')}.png`), fullPage: true });
        if (route === 'profile') {
          await page.locator('#profileCard').click();
          await page.screenshot({ path: path.join(out, `${width}-profile-back.png`), fullPage: true });
        }
      }
      await context.close();
    }
    assert.deepEqual(errors, [], 'Browser errors');
  } finally {
    fs.writeFileSync(path.join(out, 'verification.json'), JSON.stringify({ checks, errors }, null, 2));
    await browser.close();
  }
  console.log(`Passed ${checks.length} route/viewport checks. Screenshots saved to ${out}.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

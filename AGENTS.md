# Pact — agent notes

Read `README.md` and `REDESIGN.md` for the current app. `HANDOFF.md` documents the previous design and is retained as history.

## Run
- Static site, no build: `python3 -m http.server 4173` from the repo root.
- Desktop is a full-width room; mobile uses native page scrolling and bottom navigation.

## Verify
- Syntax: `node --check model.js`, `node --check room.js`, `node --check scene.js`, `node --check motion.js`.
- Domain checks: `node --test tools/model.test.cjs`.
- Browser sweep: all seven views and six pact detail types, at desktop and phone widths including 320px. Check no horizontal overflow, no nested buttons, no broken portraits, no uncaught browser errors and one shared WebGL canvas.
- `tools/screenshots.js` provides an optional isolated Playwright sweep. Browser-tool restrictions in the active session take precedence; use the available browser surface when required.

## Rules
- Runtime stays dependency-free; Three.js r149 is vendored in `assets/`.
- No nested interactive controls. Gallery cards are articles with one accessible overlay link.
- Use `scrollRootTo` / `currentScrollTop`; both now use native document scrolling.
- Escape user strings with `escapeHtml()` (`e` alias) and validate uploaded image URLs.
- App initialization precedes `initDepthScene()`. A failed stage must never prevent navigation, forms or state updates.
- A scroll, hover or decorative animation never records proof, a vote, a violation or a result. Mutations go through the shared transaction boundary.
- Do not commit `node_modules/`, `out/`, `shots/` or Blender backup files.

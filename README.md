# Pact — the private game room

An original 3D room for promises, predictions and friendly accountability. Oxblood leather, walnut, ivory enamel and brass objects sit inside an editorial, responsive interface.

## Open the app

From this directory:

```sh
python3 -m http.server 4173
```

Open http://127.0.0.1:4173/. No build or runtime package installation is needed. Use a current browser with WebGL; studio portraits automatically cover unavailable 3D. Typography uses Google Fonts, with system fallbacks.

## What works

- Create a pact from a sentence, choose one of six objects, enter the people, dates and stakes, then review and seal it.
- Habit check-ins and photo proof with explicit acceptance; future days stay closed.
- Sealed predictions and number guesses, race logging, jar confirmations, elimination withdrawals and explicit result recording.
- Shared collections, search, filters, activity and persistence across reloads.
- A turning membership card, customizable stats, PNG download, profile/photo settings and JSON record export.
- Native page scrolling, a three-chapter object sequence, pointer response, coin and race movement, reduced-motion support and still-image fallbacks.

This is a local interactive prototype. Records are stored on this browser/device; invitations, multi-user authentication, review permissions and payments are not connected to a backend. Sample members and history demonstrate the experience. Creating a pact does not contact anyone or move money.

## Current files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic views, forms, navigation and native dialog |
| `room.css` | Responsive visual system and motion preferences |
| `model.js` | Canonical state, migration and domain rules |
| `room.js` | Rendering, routes, local transactions and interactions |
| `scene.js` | One reusable Three.js renderer and object choreography |
| `motion.js` | Scroll reveals, visible-card drift and pointer tilt |
| `assets/objects/` | Eight original Blender objects: runtime JSON, GLB, PNG and editable source |
| `tools/build_objects.py` | Reproducible Blender modeling/export pipeline |
| `tools/model.test.cjs` | Domain regression tests |
| `tools/screenshots.js` | Optional screenshot and layout sweep for maintainers |

`script.js` and `styles.css` are retained legacy sources and are not loaded by the current app. The earlier `HANDOFF.md` is historical. Read [REDESIGN.md](REDESIGN.md) for current implementation and verification details.

## Verify

```sh
node --check model.js
node --check room.js
node --check scene.js
node --check motion.js
node --test tools/model.test.cjs
```

For an optional automated visual sweep, install Playwright as a development tool (`npm install --no-save playwright`, then `npx playwright install chromium`) and run `node tools/screenshots.js out/ http://127.0.0.1:4173/`. It opens isolated browser contexts and never clears your regular browser's records. The September 10 implementation was verified using direct browser interaction; the companion screenshot runner is provided for subsequent maintainer use.

## Rebuild the objects

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background --python tools/build_objects.py
```

Blender 5.2.1 was used. The script replaces generated files in `assets/objects/`; copy the editable `.blend` first if making manual edits you want to retain. GLBs are portable authoring exports; the app loads compact mesh JSON using vendored Three.js r149, avoiding extra loaders or packages.

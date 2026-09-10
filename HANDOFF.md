> Historical handoff from the first frontend pass. The September 10 room redesign is implemented; read [REDESIGN.md](REDESIGN.md) and [README.md](README.md) for the current architecture. The old layout and next steps below are retained as history.

# Pact — project handoff

Written 2026-09-10 after a first frontend refinement pass. Everything below is what a new contributor (human or coding agent) needs to keep going without the prior conversation.

## 1. What the product is

Pact is a social accountability app. Users create a **pact** from a sentence ("Can I stay off food delivery this week?"), Pact infers an **object** type, invites people, and tracks it:

| Object type | What it tracks | Where it shows up |
| --- | --- | --- |
| Habit (calendar) | Daily check-ins, optional photo proof, streak | Feed card, Challenge calendar, tug-of-war for 2-person habits |
| Prediction | Yes/no with hidden percentages until reveal | Feed card, Challenge prediction board (Yes/No pin columns) |
| Race | Who logs the most by a date | Feed card, Challenge race board |
| Number | Closest guess wins | Feed card, Challenge number board |
| Jar | Shared penalty jar (violations add up) | Feed card, Challenge jar board |
| Elimination | Last one standing | Feed card, Challenge elimination board |

Every pact has a **stake** (money or a treat), **members** (initials), **proof** rules, and an **outcome**. Completing pacts updates player progress, which unlocks **achievements**. The **profile card** flips to a shareable stats back that can be customised (add, remove, drag stats) and downloaded as a PNG.

## 2. Tech and layout

- Vanilla HTML, CSS and JS. No build step, no framework, no package.json at the root. Serve statically (`python3 -m http.server 4173`).
- `index.html` holds all views as `<section class="view" id="...">`. `showView(id)` toggles `.active`, sets `body[data-scene]`, and `body.bets-mode` / `body.settings-mode` classes that change layout.
- `script.js` structure (top to bottom): sample data arrays (`pacts`, `betSections`, `activity`, `achievements`, settings pages) → state variables → render functions per view → challenge screen builders → persistence (`saveState`/`loadState` in `localStorage` under `pactPrototypeState`, UI position under `pactPrototypeUiState`) → profile card editing and PNG export → scroll helpers and `showView` → `initDepthScene` (three.js) → `init()` wiring.
- `styles.css` is ~4200 lines, mostly component blocks in view order. Colours are hard-coded hex values throughout; only a handful of tokens live in `:root`.
- Fonts: Nunito Sans (700 to 1000) from Google Fonts. Weight 950 resolves to 1000.
- Two data models coexist: `pacts` drives the Feed gallery and its drawer; `betSections` drives Bets and Challenge. They are linked only by shared ids (`sleep`, `deck`, ...). Creating a pact adds to `betSections` only.

### Responsive layers

| Width | Layout |
| --- | --- |
| < 500px | Full-bleed phone. Page scrolls. Nav fixed to viewport. |
| 500–819px | Phone shell centred with rounded corners on the dark stage. |
| ≥ 820px | **Phone frame**: the shell is a fixed-height frame on the right, tilted slightly with `transform`, `main` scrolls internally, the nav is `position: absolute` at the frame bottom, and the drawer / stat sheet / toast align to the frame. The three.js stage fills the left. |

The 820px layer matters: because the shell has a `transform`, any `position: fixed` element inside it is positioned relative to the shell, not the viewport. Keep overlays outside `.shell` (they already are) and keep the nav absolute.

### Scrolling

`scrollRoot()` returns `main` when it is the scroll container (desktop) or `null` (window scrolls). Use `currentScrollTop()`, `scrollRootTo()` and `scrollProgress()` instead of `window.scrollY` / `window.scrollTo`. The Bets view has its own inner scroller (`#spaceGrid`) with the summary tabs and search in `#betsToolbar` above it; `syncBetsSummary()` highlights the tab for the section in view.

### The 3D stage

`initDepthScene()` builds a jar of coins, a stamped proof polaroid, a pin board, a prediction ring and loose coins, lit with a hemisphere, an ambient, a directional key and two coloured point lights. It reacts to pointer position, scroll progress and the current view (`body[data-scene]`). It only animates when the tab is visible, the viewport is ≥ 500px (below that the shell covers it) and `prefers-reduced-motion` is not set. It is called after `init()` inside a `try/catch`, so a WebGL failure can never block the app; the body gets `.no-stage` in that case. three.js is r149: use `outputEncoding`/`sRGBEncoding` era APIs (the code feature-detects).

## 3. What the refinement pass changed (2026-09-10)

Bugs fixed:
- The stage was initialised before the app with no guard; when WebGL failed (headless, old GPU, disabled) nothing rendered. Now `init()` runs first and the stage is wrapped.
- Feed cards were `<button>`s containing `<button>`s (prediction Yes/No). Browsers split the outer button, ejecting the card copy into the gallery. Cards are now `<article role="button" tabindex="0">` with Enter/Space support, and vote options are `<span>`s.
- Desktop nav was unreachable: the tilted shell trapped the fixed nav at the bottom of a 4000px-tall element. Desktop is now a phone frame with internal scrolling (see above).
- Bets sticky summary let card content scroll through the gap above it. Summary and search moved out of the scroller into `#betsToolbar`; the scroller uses flex sizing instead of a `calc(100vh - 198px)` magic number.
- Feed filter row was clipped to 170px ("Couple"/"Group" cut off). It now wraps to its own full-width scrollable row.
- Missing favicon 404 in the console.

Visual polish:
- Object internals (race tracks, number cards, jar, elimination passes, calendar tiles, vote options) were white-on-white; they now sit on `#f3f4f8`.
- Calendar tiles show the weekday letter with a ✓ badge (done) or "Due" instead of the word "Stamped" crammed into a pill.
- Suggestion, context, reaction and drawer action pills were invisible on same-colour panels. Chat rows are now white cards. "Create pact" is a full-width primary button.
- Challenge detail grid no longer leaves an orphan half-width tile.
- Page titles (Bets, Profile, settings panels) use the app font instead of falling back to system fonts.
- Card tone is keyed to `data-object` instead of `:nth-child`, so filtering no longer recolours cards. The card hover tilt defined near the top of the CSS was being overridden by a later `translateY` rule; that rule is gone.
- Stage lighting was blown out (ambient 1.6 + point lights at 16). Rebalanced, objects repositioned to the left so the jar and board are no longer hidden behind the phone.
- Global `:focus-visible` ring; `prefers-reduced-motion` disables animations and the stage loop.

Repo additions: `README.md`, this file, `AGENTS.md`, `tools/screenshots.js`, `.gitignore`.

## 4. Verifying changes

```bash
python3 -m http.server 4173          # terminal 1, repo root
npm i -D playwright                  # once (downloads Chromium); or use PACT_CHROMIUM with playwright-core
node tools/screenshots.js out/       # terminal 2
```

It writes one PNG per screen at mobile and desktop widths, prints the gallery card count (expect 7, stray 0), whether the desktop nav is inside the frame (expect true), and any console errors (expect none). Compare `out/` against the previous run. The full-page mobile captures can show a duplicated hero at the very bottom; that is a headless capture artefact, not a layout bug.

Quick manual checks: keyboard Tab to a feed card and press Enter (drawer opens); on Bets, scroll and watch the summary tab follow; on desktop, the nav stays pinned to the frame while `main` scrolls.

## 5. Known issues and open questions

1. **Moodboard mismatch.** `assets/moodboard.png` is a dark casino board (oxblood, black, gold, velvet, slot machines) while the app is white and pastel. It is unreferenced in code. Decide whether it is the intended visual direction (a retheme touching most of `styles.css`, best done by first introducing colour tokens in `:root`) or a discarded idea (delete it).
2. Two data models (`pacts` vs `betSections`) drift: new pacts appear in Bets but not the Feed; Feed drawer actions ("Check in", "Submit proof", "Reveal result") only bump progress counters. Unifying them is the biggest structural task.
3. The "Chat" view is a notification list; the title and nav label promise a chat.
4. The top bar (`.topbar`) is dead code: it is only shown when `body.show-topbar` exists, which nothing sets.
5. `saveState` stores uploaded proof photos as JPEG data URLs in `localStorage`; a few photos will hit the quota (it toasts "Photo is too large to save").
6. `downloadProfileBack` draws the card with hard-coded colours that do not follow customised stat colours for badges.
7. Colours are hard-coded everywhere; there is no dark theme.
8. No tests beyond the screenshot sweep; no linting configured.

## 6. Suggested next steps, in order

1. Settle the moodboard question (issue 1). If retheming, start by extracting a token layer in `:root` and replacing hex values, keeping the component structure.
2. Unify `pacts` and `betSections` into one store keyed by id, with the Feed deriving its cards from it.
3. Make Feed drawer actions mutate the same bet the Challenge view edits.
4. Add simple unit tests for the pure helpers (`inferObject`, `estimateDuration`, `inferStake`, `stakePotTotal`, `betProgressPercent`) with `node:test`.
5. Wire a real backend only after the data model is unified.

## 7. Conventions to keep

- Keep everything dependency-free at runtime; dev tooling can live in `tools/` and `devDependencies`.
- Escape any user-entered string with `escapeHtml()` before interpolating into templates.
- New views: add a `<section class="view">`, a nav button with `data-view`, and handle any view-specific body class in `showView`.
- Anything interactive must be reachable by keyboard (cards use `role="button"` + keydown).
- Never nest a `<button>` inside another `<button>`; use `<span>` for decorative options inside clickable cards.
- Prefer flex/grid sizing over viewport magic numbers; the nav is 88px tall and content needs ~110px bottom padding to clear it.
- Re-run `tools/screenshots.js` before and after CSS changes.

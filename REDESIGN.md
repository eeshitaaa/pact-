# The Pact Room — implementation handoff

Implemented September 10, 2026 following the approved visual plan. The app now uses a full-width editorial layout, original modeled objects and a shared domain store.

## Visual and motion decisions

Ivory typography on deep burgundy, with walnut trays, enamel tiles, brass details and smoked glass. Fraunces supplies the fuller, softer display face; DM Sans handles card titles, controls and data. Each object occupies an isolated scene container; text and controls remain outside its projected bounds. The live canvas fully replaces its matching poster, and each new chapter removes the previous mesh before displaying its successor. This resolves the translucent ghosting and competing labels shown in the planning screenshots.

Desktop uses a sticky object stage alongside three naturally scrolling chapters: proof, stakes, membership. Phone layouts keep a compact stage above the reading area. Scrolling frames objects only. Submitted actions can move a coin, race token or object; persistent state is recorded before any animation. Native scrolling, keyboard controls and reduced-motion settings remain available.

References inspected through Inspora: [Mechanical Macropad](https://www.inspora.design/posts/mechanical-macropad) for material/light response, [3D Animated Cards](https://www.inspora.design/posts/3d-animated-cards) for physical card motion, and [Shader Dial](https://www.inspora.design/posts/shader-dial) for restrained movement. Models and interface assets were authored for Pact.

## State and architecture

`model.js` exposes the canonical schema and pure rules. `room.js` renders all views from this state. Transactions clone, mutate, save, then rerender; a persistence failure rolls back the mutation. `pactRoomStateV2` is the current storage key. The previous `pactPrototypeState` is migrated on first load and retained untouched. Routes use hash navigation with per-route scroll restoration. User strings are escaped and images are compressed before storage.

Proof submissions remain pending until explicitly accepted. Predictions and other members' number guesses remain hidden until an actual result is recorded. Completed pacts cannot be resolved again. Future habit dates cannot be checked in early. Data and photo review are local prototype behavior, without real account identities or server-enforced permissions.

`scene.js` lazily loads evaluated Blender mesh geometry into one renderer, reused for the currently visible slot. Opaque materials use normal depth ordering; only the jar uses physical glass transmission. Camera fitting includes projected object bounds. The visible object gently drifts at a capped 30fps. Rendering stops when hidden or offscreen, and reduced-motion preferences return it to demand-driven rendering. The PNG portraits cover initial loading, no WebGL and context loss. Individual meshes have stable names for day markers, coins, racers and membership parts.

The eight asset families include all six pact types plus proof and membership. Each has `.json`, `.glb` and transparent `.png` exports. `pact-object-library.blend` contains editable source. The combined folder is roughly 7 MB including authoring exports; the runtime fetches only the current model and relevant portraits. Card portraits and baked sample lettering are illustrative; the adjacent interface is the authoritative live data.

## Verification completed

- Ten passing domain tests: required photo evidence, pending/accepted progression, idempotent logs, day bounds, future-day rejection, completion guards, prediction winners, number validation and ties, elimination survivor rules, inference and legacy migration.
- Desktop and phone inspection, including 390px and 320px. No horizontal document overflow in measured views; small-phone card back spacing corrected.
- Created a new habit through review/seal; checked it in; reloaded; verified the same progress in detail and collections.
- Uploaded photo proof through the file chooser; verified no progress while pending; accepted it and verified progress changed from three to four days.
- Joined a prediction, sealed a choice, verified concealed results, then recorded the actual result and verified winners.
- Logged a race, confirmed a jar slip, sealed a number guess, rejected an empty result, and resolved against an actual result of 22.
- Recorded two elimination withdrawals, verified one remaining member, then explicitly resolved the pact.
- Flipped the card, reordered/removed/added stats, saved profile details, disabled motion and verified persistence after reload.
- Console check after these flows reported no errors or warnings. Browser test mutations used a separate local origin on port 4180; the main preview on 4173 remains separate.

The optional screenshot runner was updated for the new interface; its standalone execution was not used during this session. The browser checks above were performed directly through the available browser tool.

## Intentional limits

No backend, live invitations, remote photo storage, authentication, push reminders or payment processing is implied. The existing frontend prototype's local scope is preserved. Google Fonts require network access; system fallbacks remain legible. Models visualize state symbolically (five habit tiles, up to eight jar coins); full counts remain in accessible text. Before a public launch, connect real identities, review authorization and durable shared storage as a separate product phase.

## Softness and motion refinement

Following feedback that the first room felt rigid, the interface now has rounded cards and panels, pill controls, larger supporting type and clearer sans-serif card titles. Gallery cards float by five pixels on independent cycles; their portraits float and rotate separately. Pointer movement adds a small tilt, while keyboard focus receives the same raised card treatment. Visibility observation pauses gallery motion outside the viewport.

`motion.js` adds staggered entrance reveals to headings, cards, activity, forms and story chapters using IntersectionObserver and the Web Animations API. It observes newly rendered collections without changing application state. Content is never permanently hidden for a reveal. The device reduced-motion preference and the existing motion toggle disable both reveals and drifting; background tabs pause CSS animations.

Verified the new type and card layouts at 1280px and 320px, including the membership card back and six pact object types. Visible card/portrait animation styles were confirmed running; disabling motion returned their animation names to `none`. No browser errors were reported, and all ten domain tests still pass.

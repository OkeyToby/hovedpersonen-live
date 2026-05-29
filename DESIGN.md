# Design System - Hovedpersonen Live

## Product Context

- **What this is:** A static, paper-first game-show kit for an **årstalsquiz** — a "guess the year" party quiz that a host prepares and runs on a big screen.
- **Current V1:** A single-year quiz. Teams take turns picking a category from a board; each category asks one question about that year (correct `+2`); when every category is used, a finale asks the room to name the year (`+3`).
- **Core model:** Producer prepares, Show broadcasts, Print is the script. Paper keeps the show robust if the venue screen fails.
- **The one memorable thing:** It should **look like a real TV quiz** — broadcast prestige, not a phone-app party toy.
- **Primary user:** The host, who arrives with a prepared show and runs it from a laptop on a projector/TV.
- **Project type:** Static browser app (no build, no backend), opened directly as `index.html`, three classic scripts (`content.js` → `game.js` → `app.js`), `localStorage` key `hl-arstalsquiz-v1`.

## Aesthetic Direction

- **Direction:** **Prestige broadcast quiz.** A deep-green stage with metallic gold, anchored by a warm-paper producer desk.
- **The departure (what makes it memorable):** Party-quiz apps (Kahoot, Jackbox) compete on brightness, primary color, and playful chaos. A family year-quiz earns its "real TV quiz" feel from the opposite move — broadcast gravitas: a deep stage, gold signal, and serif weight. The restraint *is* the memorability.
- **Decoration level:** Intentional. Stage graphics and gold cues exist only where they help the host run the show or land the reveal.
- **Mood:** Calm during preparation, sharp and theatrical during the show, literal on paper.
- **Avoid:** Kahoot brightness, primary-color answer blocks, confetti, AI-slop patterns (purple gradients, 3-column icon grids, centered-everything, bubble radii, system-ui display type), generic birthday warmth, and over-explaining helper copy.
- **References:** Prestige broadcast quiz staging (deep stage + gold + serif title); BBC GEL typography guidance for large, readable, scalable broadcast type: https://bbc.github.io/gel/foundations/typography/

## Product Surfaces

### Producer

The preparation view is a working surface — a rundown editor, not a landing page.

- Default first screen.
- Dense enough to prepare real content quickly.
- Clear sections: `Event`, `Hold`, `Kategorier`, `Finale`, `Kørsel` (readiness), `Print`.
- One category edited at a time.
- Concise production labels instead of explanatory prose.
- Status and work controls instead of hero copy.

Labels: `Producer`, `Show`, `Print`, `Hold`, `Kategorier`, `Finale`, `Kørsel`, `Start show`, `Tilføj kategori`, `Fjern`, `Nulstil demo`, `Værtark`, `Holdark`.

### Show

The show view is the primary product moment. It must read like a TV quiz graphic on a projector while the host talks.

- Fills the viewport.
- **Broadcast composition:** top rail (event/round status) → main stage → lower host controls clearly separated from the stage.
- Persistent live scoreboard with **active-team** and **leading-team** emphasis.
- Category board as the visual anchor; tiles are **color-coded** (a small broadcast accent set), not uniform.
- Current question centered and large.
- **Reveal is a theatrical beat:** it changes the visual language (gold, scale, Fraunces display), not only the text.
- Answer/scoring controls live in the lower control band, never competing with the stage.

Show labels: `Aktivt hold`, `Vis kategori-board`, `Rigtigt +2`, `Forkert`, `Bonus +1`, `Reveal`, `Næste`, `Afslut`, finale `+3`.

### Print

Print is not a fallback — it is the reliable script layer and must work with no screen at all.

- `Værtark` (host sheet): running order, every category question + correct answer, the finale answer, point rules.
- `Holdark` (team sheets): answer lines and a simple score box.
- **Black and white first.** Green/gold are optional screen styling, never required for print legibility.

## Typography

- **Display / stage:** `Fraunces`.
  - Use for the intro year, the reveal answer, and identity moments.
  - Rationale: serif occasion and broadcast gravitas without a generic wedding-template feel.
- **Body / UI:** `Source Sans 3` (already loaded).
  - Forms, controls, labels, dense preparation screens.
- **Data / scores:** `IBM Plex Mono`.
  - Category numbers, live score, deltas, running order. Tabular numerals.
- **Loading:** Fraunces + Source Sans 3 + IBM Plex Mono via a Google Fonts `<link>`.
- **Offline `file://` fallbacks:** `Georgia` (display), `Segoe UI` (body), `Consolas` (data).
- **Do not use as primary:** Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat, Poppins, Space Grotesk.

Type scale:

| Token | Size | Use |
| --- | ---: | --- |
| `display-xl` | clamp(7rem, 20vw, 18rem) | intro year |
| `display-lg` | clamp(40px, 5vw, 72px) | reveal answer / active team |
| `question` | clamp(28px, 3.5vw, 52px) | category question |
| `title` | 28px | producer section title |
| `subtitle` | 20px | card title |
| `body` | 16px | forms and print text |
| `label` | 12px | rails, chips, field labels |

## Color

- **Approach:** Balanced split palette by surface.

Producer (warm neutrals):

- `paper`: `#f5f1e8`
- `paper-strong`: `#fffaf0`
- `ink`: `#1d2521`
- `muted`: `#5b635c`
- `line`: `#d8cdbb`

Show (deep green + gold):

- `stage`: `#061f1a`
- `stage-panel`: `#10362d`
- `stage-ink`: `#fff8df`
- `stage-muted`: `rgba(255, 248, 223, 0.72)`
- `signal` (gold): `#d7b35a`

Actions / semantic:

- `success`: `#2e6b47`
- `warning`: `#b8872e`
- `danger`: `#a64235`
- `info`: `#315d7d`

Broadcast category accents (color-coded tiles — small, controlled set drawn from the stage family; gold reserved for signal/reveal):

- Use a fixed small rotation of muted jewel tones over the deep-green stage so each category tile is distinguishable at a glance.
- Keep saturation under broadcast control — distinct, not Kahoot-bright.

Rules:

- Green and gold are the broadcast signature; gold is a **signal**, used most strongly at reveal.
- Wrong-answer (`danger`) state must be visibly different from reveal (gold).
- Do not rely on color alone for correct/wrong/reveal — pair with text and shape.
- All text/background pairings must meet normal contrast expectations, especially at projector distance.

## Spacing

- **Base unit:** 4px.
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64.
- **Density:** Compact in Producer, spacious in Show, literal in Print.
- **Producer panels:** 16-20px internal padding.
- **Show stage:** `clamp(30px, 5vw, 66px)` stage padding.
- **Print:** 12pt margins, simple vertical rhythm.

## Layout

- **Approach:** Hybrid.
- Producer: disciplined grid, top navigation, working columns.
- Show: broadcast composition — top rail, main stage, lower host controls.
- Print: document layout, not app layout.
- **Max content width:** 1480px for Producer.
- **Stage:** fills the whole viewport.
- **Cards:** 6-8px radius for functional panels only.
- **No nested cards. No decorative orb/blob backgrounds.**
- **Breakpoints:** 1080px and 768px (768px tablet breakpoint preserved from prior layout finding).

## Copy Voice

Sound like a production tool, not a cheerful assistant.

Write: `Kategorier`, `Aktivt hold`, `Klar til show`, `Mangler svar`, `Reveal`, `Print værtark`.

Do not write: over-warm birthday copy, three-step onboarding prose, "Udfyld festen...", "Varm og familievenlig", or AI-helper filler.

## Motion

- **Approach:** Minimal-functional, with one theatrical reveal beat.
- Producer changes are instant or near-instant.
- The reveal transition is the one allowed flourish: ~200-260ms, changing color/scale/type weight.
- No confetti, looping decoration, parallax, or animated backgrounds in V1.

## Accessibility

- Show text must read from several meters away.
- Never rely on color alone for correct/wrong/reveal.
- Keep browser zoom available; use real text, not text in images.
- Print must be usable in black and white.

## Implementation Implications

- Keep the no-build, no-package, classic-script setup; the app may run from `file://`.
- Add `Fraunces` and `IBM Plex Mono` to the existing Google Fonts `<link>` (Source Sans 3 already loaded); keep Georgia/Segoe UI/Consolas as offline fallbacks.
- Replace uniform-gold category tiles with the color-coded broadcast accent set.
- Make the reveal a real visual beat (Fraunces display + gold), not a soft fade.
- Keep HTML escaping for all user-controlled text.
- Store preparation data, runtime state, and active surface in `localStorage` (so a mid-show reload restores Show, not Producer).

## Decisions Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-05-29 | Regenerate DESIGN.md from scratch for the årstalsquiz | Prior DESIGN.md described the obsolete "Tre ting"/guldbryllup format. |
| 2026-05-29 | Adopt prestige broadcast quiz (deep green + gold + serif) over party-app brightness | The one memorable thing is "looks like a real TV quiz"; restraint is the differentiator vs. Kahoot/Jackbox. |
| 2026-05-29 | Color-code category tiles with a controlled broadcast accent set | Replaces uniform gold; aids at-a-glance board reading without going Kahoot-bright. (RISK accepted) |
| 2026-05-29 | Fraunces display + a bolder reveal beat | Replaces Georgia + soft gold fade; gives the reveal broadcast occasion. (RISK accepted) |
| 2026-05-29 | Keep dark high-contrast Show stage, persistent scoreboard, B/W Print, Source Sans 3 Producer UI | Validated SAFE choices already matching the running implementation. |

# Design System - Hovedpersonen Live

## Product Context

- **What this is:** A reusable party entertainment kit for a guest who has to bring a polished quiz/show segment without starting from scratch every time.
- **Current V1:** A golden-wedding show built around `Tre ting`, where physical objects, guest stories, teams, print sheets, and a big-screen stage work together.
- **Core model:** Paper is the script. The screen is the broadcast.
- **Primary user:** The entertainment guest, not necessarily the toastmaster or a technical host.
- **Project type:** Static browser app with preparation, show, and print surfaces.

## Aesthetic Direction

- **Direction:** Producer desk + broadcast stage.
- **Decoration level:** Intentional. Use stage graphics and paper cues only where they help the host run the show.
- **Mood:** Calm during preparation, sharp during the show, practical on paper.
- **Avoid:** Generic birthday warmth, over-explaining, AI-like helper copy, stock SaaS cards, and decorative nostalgia that makes the app feel less professional.
- **References:** BBC GEL typography and accessibility guidance supports large readable type, contrast, and scalable text for broadcast-like surfaces: https://bbc.github.io/gel/foundations/typography/

## Product Surfaces

### Producer

The preparation view is a working surface. It should feel like a control room or rundown editor, not a landing page.

- Default first screen.
- Dense enough to prepare real content quickly.
- One active case visible at a time.
- Clear sections: `Event`, `Hold`, `Cases`, `Print`, `Test`.
- Use concise production labels instead of explanatory prose.
- Replace hero copy with status and work controls.

Recommended labels:

- `Producer`
- `Show`
- `Print`
- `Cases`
- `Hold`
- `Test show`
- `Værtark`
- `Casekort`
- `Rekvisitkort`
- `Holdark`

### Show

The show view is the primary product moment. It must feel like a TV quiz graphic that can sit on a projector or TV while the host talks.

- Full-screen or near-full-screen stage.
- Large active team.
- Persistent live score with active-team and leader emphasis.
- Case number and format in a top rail.
- Three objects/clues as the visual anchor, revealed one at a time by the host.
- Current question or story prompt centered and readable.
- Score event visible, but not louder than the story.
- Host controls fixed at the bottom and clearly separated from the stage.
- Answer controls appear only after all three objects/clues have been shown.
- Reveal state must change the visual language, not only the text.

Show labels:

- `Aktivt hold`
- `Tre ting`
- `Rigtigt +2`
- `Forkert`
- `Stjæl +1`
- `Reveal`
- `Næste`
- `Afslut`

### Print

Print is not fallback. Print is the reliable script layer and should work even if the screen is not used.

- `Værtark`: running order, owner, objects, question, answer, reveal note, point rule.
- `Casekort`: one card per case for the host.
- `Rekvisitkort`: three object labels per case.
- `Holdark`: answer fields and simple score box.
- Black and white first. Gold/green may appear only as optional screen styling, not as required print contrast.

## Game Formats

### Tre Ting, En Historie

Use when one guest comes up and tells the real story using three things.

- Fields: title, story owner, three things, host note, question, correct answer, reveal note.
- The guest can hold up one thing at a time.
- The active team answers first.
- Wrong answer opens steal.

### Tre Ting, Tre Historier

Use when the three things each point to a possible story, but only one is the right one.

- Fields: title, story owner, three options, correct option, reveal note.
- Strong for first impressions, family myths, travel, work stories, and "which one actually happened?"
- The screen should show A/B/C choices. The print host sheet must show the correct option.

## Typography

- **Display / stage:** `Fraunces` or `Instrument Serif`.
  - Use for big show titles, reveal answer, and golden-wedding identity moments.
  - Rationale: gives the show warmth and occasion without looking like a generic wedding template.
- **Body / UI:** `Source Sans 3`.
  - Use for forms, controls, labels, and dense preparation screens.
  - Rationale: practical, readable, and less anonymous than default system UI.
- **Data / scores:** `IBM Plex Mono` or `JetBrains Mono`.
  - Use sparingly for case numbers, live score, score deltas, and running order.
  - Must use tabular numerals where possible.
- **Fallback:** `Georgia` for display, `Segoe UI` for body, `Consolas` for data when offline.
- **Do not use as primary:** Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat, Poppins, Space Grotesk.

Type scale:

| Token | Size | Use |
| --- | ---: | --- |
| `display-xl` | clamp(56px, 8vw, 116px) | show answer / active team |
| `display-lg` | clamp(40px, 5vw, 72px) | case question |
| `title` | 28px | producer section title |
| `subtitle` | 20px | card title |
| `body` | 16px | forms and print text |
| `label` | 12px | rails, chips, field labels |

## Color

- **Approach:** Split palette by surface.

Producer:

- `paper`: `#f5f1e8`
- `paper-strong`: `#fffaf0`
- `ink`: `#1d2521`
- `muted`: `#5b635c`
- `line`: `#d8cdbb`

Show:

- `stage`: `#061f1a`
- `stage-panel`: `#10362d`
- `stage-ink`: `#fff8df`
- `stage-muted`: `rgba(255, 248, 223, 0.72)`
- `signal`: `#d7b35a`

Actions:

- `success`: `#2e6b47`
- `warning`: `#b8872e`
- `danger`: `#a64235`
- `info`: `#315d7d`

Rules:

- Use green and gold as signals, not as a full beige/green theme.
- Reveal state may use gold more strongly.
- Error and wrong-answer state must be visibly different from reveal.
- Text/background combinations must meet normal contrast expectations.

## Spacing

- **Base unit:** 4px.
- **Density:** Compact in Producer, spacious in Show, literal in Print.
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64.
- **Producer panels:** 16-20px internal padding.
- **Show stage:** 32-64px stage padding depending on viewport.
- **Print:** 12pt margins and simple vertical rhythm.

## Layout

- **Approach:** Hybrid.
- Producer uses a disciplined grid with top navigation and working columns.
- Show uses broadcast composition: top rail, main stage, lower host controls.
- Print uses document layout, not app layout.
- **Max content width:** 1480px for Producer.
- **Stage:** should be able to occupy the whole viewport.
- **Cards:** 6-8px radius for functional panels only.
- **No nested cards.**
- **No decorative orb/blob backgrounds.**

## Copy Voice

The app should sound like a production tool, not a cheerful assistant.

Write:

- `Cases`
- `Aktivt hold`
- `Klar til test`
- `Print værtark`
- `Mangler svar`
- `Reveal`

Do not write:

- `Klar til guldbryllup`
- `Tre trin fra idé til færdigt indslag`
- `Udfyld festen...`
- `Showfladen er klar...`
- `Varm og familievenlig`
- `En god undskyldning for at fortælle en historie mere`

## Motion

- **Approach:** Minimal-functional.
- Producer changes should be instant or near-instant.
- Show transitions may use one short reveal transition, 180-260ms.
- No looping decoration, confetti, parallax, or animated background patterns in V1.

## Accessibility

- Show text must remain readable from a few meters away.
- Do not rely on color alone for correct/wrong/reveal states.
- Keep browser zoom available.
- Use real text, not text embedded in images.
- Print must be usable in black and white.

## Implementation Implications

- Split UI rendering into `producer`, `show`, and `print` surfaces.
- Add case `format` support:
  - `one_story`
  - `three_stories`
- Preserve no-build, no-package setup.
- Keep HTML escaping for all user-controlled text.
- Store preparation data in `localStorage`.
- The app may run from `file://`.

## Decisions Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-05-25 | Use Producer + Show + Print as the core design model | Matches the user's TV quiz direction and paper-first requirement. |
| 2026-05-25 | Remove banal helper copy from the UI direction | The user explicitly said the text felt too banal and AI-like. |
| 2026-05-25 | Treat print as script, not backup | The user needs this to work at a real guldbryllup next weekend. |
| 2026-05-25 | Support both `Tre ting, en historie` and `Tre ting, tre historier` | Covers the Tobias refrigerator example and the broader reusable template. |

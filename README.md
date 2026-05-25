# Hovedpersonen Live

Static, paper-first game show prototype for a golden wedding. The show is built around `Tre ting, en historie`: selected guests tell short stories from three clues, one team answers first, other teams can steal, and the couple acts as reveal/jury.

The app has no build step, package manager, backend, accounts, room codes, mobile answer flow, or real multiplayer. It runs directly from `index.html` and saves preparation data in `localStorage`.

## Quick Start

1. Open `index.html` in a browser.
2. Fill in the event, teams, story cards, clues, questions, answers, and reveal notes.
3. Click `Start show` to run the big-screen show.
4. Use `Print ark` for host sheets and table answer sheets.

## Repository Contents

```text
index.html        Static entry point with classic scripts.
src/content.js    Golden-wedding seed template and example cases.
src/game.js       Local game state, scoring, phases, and storage helpers.
src/app.js        Rendering and DOM event binding.
src/styles.css    Visual system, responsive layout, and print rules.
DESIGN.md         Design system and UI decisions.
QA.md             Manual test checklist.
docs/README.md    Documentation index for the prototype.
```

## Scope

Included:

- Guided setup for a golden-wedding show.
- Editable teams and `Tre ting, en historie` story cards.
- Deterministic show loop with correct, wrong, steal, reveal, next, and finished states.
- Manual scoring: active team +2, steal +1.
- Local persistence through `localStorage`.
- Print-friendly host and table sheets.

Out of scope for this V1:

- Mobile participation.
- Real-time answer submission.
- Accounts, backend, room codes, networking, or authentication.
- Package manager or build step.

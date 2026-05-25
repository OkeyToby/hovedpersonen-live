# Hovedpersonen Live

Hovedpersonen Live is a static, paper-first game show prototype for a golden
wedding. It helps the entertainment guest prepare and run a reusable party
format built around `Tre ting, en historie`: selected guests tell short stories,
one team answers first, other teams can steal, and the couple acts as reveal or
jury.

The app has no build step, package manager, backend, account system, room codes,
mobile answer flow, or real multiplayer. It is designed to run directly from
`index.html` and save preparation data in `localStorage`.

## Quick Start

1. Open [index.html](index.html) in a browser.
2. Work through the guided setup: `Festen`, `Historiekort`, then `Kør og print`.
3. Keep team and couple-role details in `Indstillinger for hold og ærespar`
   unless the default table-team setup is enough.
4. Click `Start show` and run the turn-based show from the big-screen stage.
5. Use `Print ark` to print host sheets and table answer sheets.
6. Use [QA.md](QA.md) to verify the current prototype behavior.

## Documentation

| Need | File |
|------|------|
| Learn the prototype by running it | [docs/tutorial-first-demo.md](docs/tutorial-first-demo.md) |
| Run and verify locally | [docs/how-to-run-local.md](docs/how-to-run-local.md) |
| Collect story cards before the party | [docs/how-to-collect-story-cards.md](docs/how-to-collect-story-cards.md) |
| Prepare the real golden-wedding show | [docs/how-to-prepare-guldbryllup.md](docs/how-to-prepare-guldbryllup.md) |
| Understand the app surface | [docs/reference-app.md](docs/reference-app.md) |
| Host the room on party day | [docs/reference-party-runbook.md](docs/reference-party-runbook.md) |
| Understand the architecture choices | [docs/explanation-static-prototype.md](docs/explanation-static-prototype.md) |
| Manual acceptance checks | [QA.md](QA.md) |
| Design system and UI rules | [DESIGN.md](DESIGN.md) |

## Project Structure

```text
index.html        Static entry point with classic scripts.
src/content.js    Golden-wedding seed template and example cases.
src/game.js       Local game state, scoring, phases, and storage helpers.
src/app.js        Rendering and DOM event binding.
src/styles.css    Visual system, responsive layout, and print rules.
docs/             Diataxis documentation.
QA.md             Manual test checklist.
DESIGN.md         Design system and UI decision source of truth.
```

## Current Product Scope

The prototype includes:

- Guided three-step setup for the event, one active story card, and print/show
  readiness.
- Golden-wedding template with couple names, event note, tone, team mode, and
  couple role.
- Team setup with point editing and presets for bordhold, Brud mod Gom, and
  free teams.
- Editable `Tre ting, en historie` cases with story owner, three clues, prompt,
  question, correct answer, and reveal note.
- Deterministic show loop: setup, active team, wrong-answer steal, reveal, next
  turn, finished scoreboard.
- Manual scoring: active team +2, steal +1.
- `localStorage` persistence for preparation data.
- Print CSS for host sheets and table answer sheets.

The prototype intentionally does not include:

- Mobile participation.
- Real answer submission.
- Accounts, backend, room codes, networking, or authentication.
- A package manager or build step.

## Development Notes

Keep the app runnable by opening `index.html` directly. The entry point uses
classic scripts instead of JavaScript modules so local `file://` loading works in
normal browsers.

Read [DESIGN.md](DESIGN.md) before changing layout, typography, colors, motion,
or interaction states.

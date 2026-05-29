# Hovedpersonen Live

Hovedpersonen Live is a static, paper-first game show prototype for a golden
wedding. It is built for the entertainment guest who needs a reusable party
format with a preparation layer, a big-screen show layer, and practical print
sheets.

The current V1 centers on `Tre ting`:

- `Tre ting, én historie`: one guest tells the real story through three objects.
- `Tre ting, tre historier`: three object/story options are shown, but only one
  is correct.

In the show layer, the three objects/options are revealed one at a time by the
host. The question and scoring controls appear only after all three have been
shown.

The app has no build step, package manager, backend, account system, room codes,
mobile answer flow, or real multiplayer. It runs directly from `index.html` and
saves preparation data in `localStorage`.

## Quick Start

1. Open [index.html](index.html) in a browser.
2. Use `Producer` to edit event details, teams, cases, clues, stories, answers,
   and reveal notes.
3. Use `Show` or `Start show` for the big-screen party view.
4. Use `Print` for `Værtark`, `Casekort`, `Rekvisitkort`, and `Holdark`.
5. Use [QA.md](QA.md) to verify the current prototype behavior.

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
src/styles.css    Producer, show, responsive, and print styles.
docs/             Diataxis documentation.
QA.md             Manual test checklist.
DESIGN.md         Design system and UI decision source of truth.
```

## Current Product Scope

The prototype includes:

- `Producer`, `Show`, and `Print` surfaces.
- Golden-wedding template with couple names, event note, team mode, and couple
  role.
- Team setup with point editing and presets for table teams, bride/groom teams,
  and free teams.
- Editable `Tre ting, én historie` and `Tre ting, tre historier` cases.
- Deterministic show loop: setup, active team, clue reveal 1-3, answer/steal,
  reveal, next turn, finished scoreboard.
- Live score in the show view with active-team and leading-team emphasis.
- Manual scoring: active team +2, steal +1, and host-awarded bonus +1.
- `localStorage` persistence for preparation data.
- Print sheets for host, cases, props, and teams.

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
copy, or interaction states.

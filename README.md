# Hovedpersonen Live

Hovedpersonen Live is a static, paper-first game show prototype for an
**årstalsquiz** — a "guess the year" party quiz. It is built for the host who
needs a reusable format with a preparation layer, a big-screen show layer, and
practical print sheets.

The current V1 centers on a single year (the seed uses `2002`):

- Teams take turns picking a category from a board.
- Each category asks one question about that year; a correct answer scores `+2`.
- When every category is used, a finale asks the room to name the year for `+3`.

The app has no build step, package manager, backend, account system, room codes,
mobile answer flow, or real multiplayer. It runs directly from `index.html` and
saves preparation data in `localStorage`.

## Quick Start

1. Open [index.html](index.html) in a browser.
2. Use `Producer` to edit the year, title, teams, categories, and finale.
3. Use `Show` or `Start show` for the big-screen party view.
4. Use `Print` for the host sheet (`Værtark`) and team sheets (`Holdark`).
5. Use [QA.md](QA.md) to verify the current prototype behavior.

## Documentation

| Need | File |
|------|------|
| Learn the prototype by running it | [docs/tutorial-first-demo.md](docs/tutorial-first-demo.md) |
| Run and verify locally | [docs/how-to-run-local.md](docs/how-to-run-local.md) |
| Write quiz categories before the party | [docs/how-to-write-categories.md](docs/how-to-write-categories.md) |
| Prepare the real show | [docs/how-to-prepare-show.md](docs/how-to-prepare-show.md) |
| Understand the app surface | [docs/reference-app.md](docs/reference-app.md) |
| Host the room on party day | [docs/reference-party-runbook.md](docs/reference-party-runbook.md) |
| Understand the architecture choices | [docs/explanation-static-prototype.md](docs/explanation-static-prototype.md) |
| Manual acceptance checks | [QA.md](QA.md) |
| Design system and UI rules | [DESIGN.md](DESIGN.md) |

## Project Structure

```text
index.html        Static entry point with classic scripts.
src/content.js    Year-quiz seed template (event, teams, categories, finale).
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
- A year-quiz template with year, title, host note, teams, categories, and a
  finale.
- Team setup with point editing, add, and remove.
- Editable categories (3-7), each with a name, question, answer, and optional
  explanation.
- Deterministic show loop: intro, category board, question, reveal, finale,
  finished scoreboard.
- Live score in the show view with active-team and leading-team emphasis.
- Manual scoring: correct +2, host-awarded bonus +1, and finale winner +3.
- `localStorage` persistence for preparation data, runtime state, and the active
  surface (so a mid-show reload does not expose answers).
- Print sheets for the host and the teams.

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

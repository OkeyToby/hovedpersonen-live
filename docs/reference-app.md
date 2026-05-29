# App Reference

This reference describes the current Hovedpersonen Live årstalsquiz prototype.

## Entry Point

`index.html` loads the app root and three classic scripts in order:

```html
<div id="root"></div>
<script src="./src/content.js"></script>
<script src="./src/game.js"></script>
<script src="./src/app.js"></script>
```

Classic scripts are intentional. They keep the app runnable from `file://`
without a local server.

## Source Files

| File | Purpose |
|------|---------|
| `src/content.js` | Seed year event, teams, categories, and finale (`window.HLContent.template`). |
| `src/game.js` | Local state, phase transitions, scoring, reset, and `localStorage` (`window.HLGame`). |
| `src/app.js` | Producer/Show/Print rendering, escaping, form updates, and event binding. |
| `src/styles.css` | Producer, show, responsive, and print styles. |

## Data Shape

The app saves one local object to `localStorage`:

| Key | Purpose |
|-----|---------|
| `data` | The editable show: `event`, `teams`, `categories`, `finale`. |
| `state` | Runtime: current phase, active team, active category, latest score event. |
| `view` | The active surface (`producer`, `show`, or `print`), so a reload keeps the host on the same surface. |

### Event

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `year` | string | `2002` | The year the room is guessing. Shown in the header, stage rails, and print. |
| `title` | string | `Hvilket år spiller vi?` | Headline shown on the intro stage and event summary. |
| `note` | string | empty | Free host note. Not shown on the show stage. |

### Team

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Stable local identifier used by state, bonus, and finale actions. |
| `name` | string | Team name shown in setup, stage, live score, and print sheets. |
| `score` | number | Manual score. `Start show` resets all scores to `0`. |

### Category

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Stable local identifier for the category tile. |
| `name` | string | Short category label shown on the board tile and editor row. |
| `question` | string | Question read to the active team. |
| `answer` | string | Correct answer shown during reveal. |
| `explanation` | string | Optional context shown on reveal and printed on the host sheet. |
| `used` | boolean | Set `true` once played. Used tiles lock globally and cannot be picked again. |

The app keeps a minimum of 3 and a maximum of 7 categories.

### Finale

| Field | Type | Purpose |
|-------|------|---------|
| `question` | string | The deciding "which year" question. |
| `answer` | string | The correct year. |
| `explanation` | string | Optional host note shown on the finale stage and host sheet. |

## App Surfaces

| Surface | Rendered by | Purpose |
|---------|-------------|---------|
| `Producer` | `producerView()` | Event setup, readiness, category editor, and finale editing. |
| `Show` | `showStage()` | Big-screen stages for intro, category board, question, reveal, finale, and scoreboard, with live score and bonus controls. |
| `Print` | `printPreview()` | Host sheet and team sheets preview, plus a browser print action. |

Team editing lives inside the `Hold` disclosure so the default setup stays
simple. The readiness panel counts:

- number of teams
- categories created (`X/7`)
- categories with both a question and an answer

## Game Phases

| Phase | Meaning |
|-------|---------|
| `intro` | Title card with the year. Host clicks `Vis kategori-board` to begin. |
| `category_board` | Active team picks an unused category tile. |
| `question` | The picked category's question is shown to the active team. |
| `reveal` | Answer and optional explanation are shown after correct/wrong. |
| `finale` | All categories are used; one deciding "which year" question remains. |
| `finished` | Final scoreboard with the winner. |

## Scoring

- Correct answer: `+2` to the active team.
- Bonus: `+1`, available from the live score panel at any point in the show.
- Finale winner: `+3`.
- Wrong answer or reveal without a point: no score change, but the category is
  still marked used.

## Persistence

Show data, runtime state, and the active view are saved to `localStorage` under:

```text
hl-arstalsquiz-v1
```

`Nulstil demo` clears the in-memory store back to the seed template and saves
that reset state.

Saved data is normalized at startup. Missing teams, categories, finale fields,
phase values, and active ids are repaired against the seed template where
possible. Data saved in the old `Tre ting` format (an object with `cases` and no
`categories`) is detected and replaced with the årstalsquiz seed, preserving any
existing team names and ids.

## Rendering and Escaping

`src/app.js` renders HTML strings into `#root`. All user-controlled values pass
through `esc()` before they enter markup. This includes the year, title, team
names and scores, category names, questions, answers, explanations, finale
fields, and print sheets.

Event handling is attribute-driven:

| Attribute | Used for |
|-----------|----------|
| `data-kind` | Distinguishes `event`, `team`, `cat`, and `finale` field updates. |
| `data-field` | Names the object field to update. |
| `data-index` | Finds the team or category being edited. |
| `data-cat-id` | Identifies the category for selection or removal. |
| `data-team-id` | Identifies the team for bonus or finale awards. |
| `data-view` | Names the surface to switch to. |
| `data-action` | Dispatches host actions (see below). |

### Actions

`view`, `start`, `start-cats`, `select-cat-editor`, `select-cat-show`,
`correct`, `wrong`, `bonus`, `next`, `finale-correct`, `finish`, `print`,
`add-team`, `remove-team`, `add-cat`, `remove-cat`, `reset`.

## Print Surface

`@media print` hides the interactive app and shows:

- Host sheet (`Værtark`) with the year, title, point rules, every category's
  question/answer/explanation, and the finale.
- Team sheets (`Holdark`) with answer lines per category, a finale line, and a
  point box for each team.

## Known Limitations

- No mobile participation.
- No real-time answer submission.
- No room codes, backend, accounts, or authentication.
- No automated package scripts.

## Related

- Use [how-to-prepare-show.md](how-to-prepare-show.md) to prepare a real show.
- Use [reference-party-runbook.md](reference-party-runbook.md) for host roles,
  timing, scoring, and failure recovery.

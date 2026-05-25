# App Reference

This reference describes the current Hovedpersonen Live static prototype.

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
| `src/content.js` | Seed golden-wedding event, teams, and `Tre ting, en historie` cases. |
| `src/game.js` | Local state, phase transitions, scoring, reset, and `localStorage`. |
| `src/app.js` | Rendering, escaping, form updates, and event binding. |
| `src/styles.css` | Show stage, setup panels, responsive layout, and print sheets. |

## Data Shape

The app stores one local object with:

| Key | Purpose |
|-----|---------|
| `event` | Occasion, couple names, event note, tone, team mode, and couple role. |
| `teams` | Team id, name, and score. |
| `cases` | Story title, active team, story owner, three clues, prompt, question, answer, and reveal note. |
| `state` | Current phase, active case, active team, steal target, completed cases, and latest score event. |

### Event

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `occasion` | string | `Guldbryllup` | Label shown in the header and print sheets. |
| `coupleA` | string | `Kirsten` | First honoree name. |
| `coupleB` | string | `Poul` | Second honoree name. |
| `date` | string | `Næste weekend` | Event date or short host note. |
| `tone` | string | `Varm og familievenlig` | Preparation note for the host. |
| `teamMode` | string | `bordhold` | One of `bordhold`, `brudgom`, or `frit`. |
| `coupleRole` | string | `reveal-jury` | One of `reveal-jury`, `helpers`, or `own-team`. |

### Team

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Stable local identifier used by cases and state. |
| `name` | string | Team name shown in setup, stage, print sheets, and scoring. |
| `score` | number | Manual score. `Start show` resets all scores to `0`. |

### Case

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Stable local identifier for the story card. |
| `title` | string | Short case title shown to the active team and print sheets. |
| `activeTeamId` | string | Team that answers this case first. |
| `storyOwner` | string | Guest who tells the story. |
| `clues` | string[3] | The three things, objects, or pictures. Missing entries normalize to empty strings. |
| `prompt` | string | Host note for calling up the story owner. |
| `question` | string | Question shown to the active team. |
| `answer` | string | Correct answer shown during reveal. |
| `revealNote` | string | Warm comment shown during reveal and printed on the host sheet. |

## Setup Surface

Setup is rendered as three steps:

| Step | Rendered by | Purpose |
|------|-------------|---------|
| `Festen` | `setupPanel()` | Event names, date note, tone, and advanced team/couple settings. |
| `Historiekort` | `caseEditor()` | One selected story card, `Kort` tabs, and host-card preview. |
| `Kør og print` | `runPanel()` | Readiness checklist, `Start show`, print action, and point reminder. |

Advanced team and couple-role controls live inside
`Indstillinger for hold og ærespar` so the default table-team path stays simple.

The readiness checklist counts:

- cases with story owner, question, and answer
- cases with three filled clues
- current number of teams
- print backup availability

## Game Phases

| Phase | Meaning |
|-------|---------|
| `setup` | Editable preparation screen before the show starts. |
| `active_team` | Current team gets the case and answers first. |
| `steal` | Other teams can steal after a wrong answer. |
| `reveal` | Correct answer, story owner context, and reveal note are shown. |
| `finished` | Final scoreboard is shown. |

## Scoring

- Active team correct answer: `+2`.
- Steal answer: `+1`.
- Reveal without point: no score change.

## Persistence

Preparation data is saved to `localStorage` under:

```text
hovedpersonen-live-guldbryllup-v1
```

`Nulstil demo` clears the current in-memory store back to the seed template and
saves that reset state.

Saved data is normalized at startup. Missing teams, cases, clue entries, phase
values, and active ids are repaired against the seed template where possible.

## Rendering and Escaping

`src/app.js` renders HTML strings into `#root`. All user-controlled values pass
through `escapeHtml()` before they enter markup. This includes names, teams,
clues, prompts, questions, answers, reveal notes, print sheets, and score labels.

Event handling is attribute-driven:

| Attribute | Used for |
|-----------|----------|
| `data-kind` | Distinguishes event, team, case, and clue field updates. |
| `data-field` | Names the object field to update. |
| `data-index` | Finds the team or case being edited. |
| `data-action` | Dispatches host actions such as `start`, `correct`, `wrong`, `steal`, `next`, `finish`, and `print`. |

## Print Surface

`@media print` hides the interactive app and shows:

- Host sheets with case order, active team, story owner, clues, question, answer,
  reveal note, and point rules.
- Table sheets with answer lines and point space for each team.

## Known Limitations

- No mobile participation.
- No real-time answer submission.
- No room codes, backend, accounts, or authentication.
- No automated package scripts.

## Related

- Use [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md) to prepare a real show.
- Use [reference-party-runbook.md](reference-party-runbook.md) for host roles,
  timing, scoring, and failure recovery.

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
| `src/content.js` | Seed golden-wedding event, teams, and `Tre ting` cases. |
| `src/game.js` | Local state, phase transitions, scoring, reset, and `localStorage`. |
| `src/app.js` | Producer/show/print rendering, escaping, form updates, and event binding. |
| `src/styles.css` | Producer, show, responsive, and print styles. |

## Data Shape

The app stores one local object with:

| Key | Purpose |
|-----|---------|
| `event` | Occasion, couple names, event note, tone, team mode, and couple role. |
| `teams` | Team id, name, and score. |
| `cases` | Case title, format, active team, story owner, clues/options, prompt, question, answer, and reveal note. |
| `state` | Current phase, active case, active team, steal target, visible clue count, completed cases, and latest score event. |

### Event

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `occasion` | string | `Guldbryllup` | Label shown in the header and print sheets. |
| `coupleA` | string | `Kirsten` | First honoree name. |
| `coupleB` | string | `Poul` | Second honoree name. |
| `date` | string | `Næste weekend` | Event date or short host note. |
| `tone` | string | `Familievenlig` | Preparation note for the host. |
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
| `id` | string | Stable local identifier for the case. |
| `format` | string | `one_story` or `three_stories`. |
| `title` | string | Short case title shown to the active team and print sheets. |
| `activeTeamId` | string | Team that answers this case first. |
| `storyOwner` | string | Guest who tells the story. |
| `clues` | string[3] | The three things, objects, or pictures. |
| `options` | object[3] | A/B/C option stories for `three_stories`, including the correct option. |
| `prompt` | string | Host note for calling up the story owner. |
| `question` | string | Question shown to the active team. |
| `answer` | string | Correct answer shown during reveal. |
| `revealNote` | string | Comment shown during reveal and printed on the host sheet. |

## App Surfaces

| Surface | Rendered by | Purpose |
|------|-------------|---------|
| `Producer` | `producerView()` | Rundown, selected case editor, event setup, readiness, and score. |
| `Show` | `showStage()` | Big-screen stage for active team, stepwise clue/option reveal, answer, steal, reveal, and scoreboard. |
| `Print` | `printPreview()` | Værtark, Casekort, Rekvisitkort, and Holdark preview plus browser print action. |

Advanced team and couple-role controls live inside `Hold og rolle` so the
default table-team path stays simple.

The readiness checklist counts:

- cases with story owner, question, and answer
- cases with three filled clues/options
- current number of teams
- print sheet types

## Game Phases

| Phase | Meaning |
|-------|---------|
| `setup` | Editable preparation before the show starts. |
| `active_team` | Current team gets the case and answers first. |
| `steal` | Other teams can steal after a wrong answer. |
| `reveal` | Correct answer, story owner context, and reveal note are shown. |
| `finished` | Final scoreboard is shown. |

Within `active_team`, `visibleClueCount` controls whether zero, one, two, or
three clues/options are visible. The host advances it with `Vis ting 1` and
`Vis næste ting`. Answer and reveal controls appear only when the count reaches
three.

## Scoring

- Active team correct answer: `+2`.
- Steal answer: `+1`.
- Reveal without point: no score change.

## Persistence

Preparation data is saved to `localStorage` under:

```text
hovedpersonen-live-guldbryllup-v2
```

`Nulstil demo` clears the current in-memory store back to the seed template and
saves that reset state.

Saved data is normalized at startup. Missing teams, cases, clue entries, option
entries, phase values, and active ids are repaired against the seed template
where possible.

## Rendering and Escaping

`src/app.js` renders HTML strings into `#root`. All user-controlled values pass
through `escapeHtml()` before they enter markup. This includes names, teams,
clues, option stories, prompts, questions, answers, reveal notes, print sheets,
and score labels.

Event handling is attribute-driven:

| Attribute | Used for |
|-----------|----------|
| `data-kind` | Distinguishes event, team, case, clue, and option field updates. |
| `data-field` | Names the object field to update. |
| `data-index` | Finds the team or case being edited. |
| `data-action` | Dispatches host actions such as `view`, `start`, `show-clue`, `correct`, `wrong`, `steal`, `next`, `finish`, and `print`. |

## Print Surface

`@media print` hides the interactive app and shows:

- Værtark with case order, active team, story owner, clues/options, question,
  answer, reveal note, and point rules.
- Casekort with the live host prompt and question.
- Rekvisitkort with physical object labels.
- Holdark with answer lines and point space for each team.

## Known Limitations

- No mobile participation.
- No real-time answer submission.
- No room codes, backend, accounts, or authentication.
- No automated package scripts.

## Related

- Use [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md) to prepare a real show.
- Use [reference-party-runbook.md](reference-party-runbook.md) for host roles,
  timing, scoring, and failure recovery.

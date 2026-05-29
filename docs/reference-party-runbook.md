# Party Runbook Reference

This reference describes the real-room operating plan for the Hovedpersonen Live
årstalsquiz. Use it as a checklist when preparing, printing, and hosting the
show.

## Roles

| Role | Responsibility | Default |
|------|----------------|---------|
| Host | Prepares categories, runs the app, reads questions, manages points. | You |
| Active team | Picks a category and answers first. | Rotates each turn |
| Other teams | Watch, then compete in the finale. | All non-active teams |
| Jury | Judges open questions (e.g. `Top 3`) where the answer is not fixed. | Host or couple |

## Preparation Timeline

| Time | Task | Done when |
|------|------|-----------|
| 5-7 days before | Pick the year and draft 3-7 category questions. | Each category has a question and a clear answer. |
| 3-4 days before | Write the finale "which year" question and answer. | The finale is answerable from the category hints. |
| 2 days before | Enter teams, categories, and the finale in the app. | Reload keeps the prepared content. |
| 1 day before | Print the host sheet and team sheets. | Paper layer is ready. |
| Party day | Test screen, browser zoom, and the intro stage. | The year is readable from the room. |

## Category Fields

| Field | Use it for | Good example |
|-------|------------|--------------|
| `Navn` | Short category label on the board tile. | `Musik` |
| `Spørgsmål` | The question the active team answers. | `Hvem udgav "The Eminem Show" i 2002?` |
| `Svar` | Answer shown in reveal. | `Eminem` |
| `Forklaring` | Optional landing note or extra context. | `Årets bedst sælgende album på verdensplan.` |

## Show Loop

```text
Producer
  -> Start show
Show / intro
  -> Vis kategori-board
category_board
  -> pick a category tile
question
  -> Rigtigt +2        -> reveal
  -> Forkert           -> reveal
reveal
  -> Næste             -> next team's category_board, or finale when none left
finale
  -> select winning team (+3)  -> finished
finished
  -> Print or Start forfra
```

`Bonus +1` and `Afslut` are available throughout the show from the live score
panel and host controls.

## Scoring

| Action | Score change | Next phase |
|--------|--------------|------------|
| Pick a category | No score change. | `question` |
| `Rigtigt +2` | Active team gets 2 points; category locks. | `reveal` |
| `Forkert` | No points; category still locks. | `reveal` |
| `Bonus +1` | Host gives a team an extra point. | Current phase stays unchanged |
| `Næste` | No score change; turn rotates. | `category_board` or `finale` |
| `Finale` winner | Chosen team gets 3 points. | `finished` |

Categories lock globally once played, so each is used exactly once. The turn
rotates to the next team after every reveal until all categories are used.

## Print Pack

| Sheet | Audience | Includes |
|-------|----------|----------|
| `Værtark` | Host | Year, title, point rules, every category's question/answer/explanation, and the finale. |
| `Holdark` | Teams | Answer lines per category, a finale line, and a point box. |

Print before leaving for the venue. The show can run from paper if the screen,
projector, or browser setup fails.

## Room Setup

Recommended setup:

- One laptop on a table near the host.
- Browser opened to `index.html`.
- Screen or projector mirrored from the laptop.
- Browser zoom tested so the question is readable from the room.
- Printed `Værtark` beside the laptop.
- `Holdark` distributed before the first question.

## Safety and Fairness Rules

- Keep questions answerable from general knowledge of the year.
- For open categories like `Top 3`, agree the judging rule before the show.
- Award `Bonus +1` consistently so the room sees it as fair.
- Keep the finale decisive: the team closest to the year wins `+3`.

## Failure Modes

| Problem | Recovery |
|---------|----------|
| Browser loses prepared data | Re-enter from the printed `Værtark`. |
| Accidental reload mid-show | The app restores the Show surface, phase, and scores. |
| Screen is unreadable | Increase browser zoom or run from paper. |
| Only one team remains | The show still works; the finale is a single-team award. |
| The room gets restless | Use `Afslut` to jump to the scoreboard. |

## Related

- Prepare the content with [how-to-prepare-show.md](how-to-prepare-show.md).
- Learn the demo flow in [tutorial-first-demo.md](tutorial-first-demo.md).
- Look up app state and scoring details in [reference-app.md](reference-app.md).

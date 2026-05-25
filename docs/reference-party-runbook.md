# Party Runbook Reference

This reference describes the real-room operating plan for Hovedpersonen Live.
Use it as a checklist when preparing, printing, and hosting the golden-wedding
show.

## Roles

| Role | Responsibility | Default |
|------|----------------|---------|
| Entertainment guest | Prepares cases, runs the app, reads host notes, manages points. | You |
| Couple | Adds reveal comments, confirms answers, acts as jury. | `Reveal og jury` |
| Story owner | Comes up and tells one short story from three things. | Selected guests |
| Active team | Answers the current case first. | Assigned per case |
| Other teams | Can steal after a wrong answer. | All non-active teams |

## Preparation Timeline

| Time | Task | Done when |
|------|------|-----------|
| 7-5 days before | Ask 3-5 guests for safe stories. | Each story has a guest and one memory. |
| 4-3 days before | Choose three things or pictures per story. | The host can show or name all three. |
| 2 days before | Enter teams, cases, questions, and answers. | Reload keeps the prepared content. |
| 1 day before | Print host sheets and table sheets. | Paper backup is ready. |
| Party day | Test screen, browser zoom, and first case. | `Start show` is readable from the room. |

## Case Fields

| Field | Use it for | Good example |
|-------|------------|--------------|
| `Titel` | Short name for the case. | `Den forsvundne cykelnøgle` |
| `Aktivt hold` | Team that answers first. | `Bord 1` |
| `Gæst der fortæller` | Guest who comes up. | `Lone` |
| `Ting 1-3` | Objects, clues, or pictures. | `En gammel cykellygte` |
| `Oplæsningsnote` | What the host says before the story. | `Kald Lone op...` |
| `Spørgsmål til aktivt hold` | The question the team answers. | `Hvor lå cykelnøglen til sidst?` |
| `Korrekt svar` | Answer shown in reveal. | `I Pouls jakkelomme` |
| `Reveal-kommentar` | Warm punchline or memory note. | `Poul leder altid efter det, han allerede har på sig.` |

## Show Loop

```text
setup
  -> Start show
active_team
  -> Korrekt (+2)       -> reveal
  -> Forkert            -> steal
  -> Reveal uden point  -> reveal
steal
  -> Stjæl point (+1)   -> reveal
reveal
  -> Næste              -> next active_team or finished
finished
  -> Print ark or Start forfra
```

## Scoring

| Action | Score change | Next phase |
|--------|--------------|------------|
| `Korrekt (+2)` | Active team gets 2 points. | `reveal` |
| `Forkert` with other teams | No immediate points. | `steal` |
| `Stjæl point` | Stealing team gets 1 point. | `reveal` |
| `Reveal uden point` | No score change. | `reveal` |

If there is only one team, a wrong answer goes directly to reveal because no
other team can steal.

## Print Pack

The print pack has two parts.

| Sheet | Audience | Includes |
|-------|----------|----------|
| Host sheet | Entertainment guest | Case order, active team, story owner, clues, question, answer, reveal note, point rules. |
| Table sheets | Teams | Case titles, answer lines, and point space. |

Print before leaving for the venue. The show can run from paper if the screen,
projector, or browser setup fails.

## Room Setup

Recommended setup:

- One laptop on a table near the host.
- Browser opened to `index.html`.
- Screen or projector mirrored from the laptop.
- Browser zoom tested so the active case is readable.
- Printed host sheet beside the laptop.
- Table sheets distributed before the first question.
- Three things or pictures sorted in case order.

## Safety Rules

- Use warm, family-friendly stories by default.
- Avoid stories that depend on embarrassment, private conflict, or inside jokes
  that most of the room cannot follow.
- Keep the couple central as reveal/jury, not as targets.
- If in doubt, choose the kinder version of a story.

## Failure Modes

| Problem | Recovery |
|---------|----------|
| Browser loses prepared data | Use printed sheets or re-enter from the host sheet. |
| Screen is unreadable | Increase browser zoom or run from paper. |
| A guest does not want to tell the story | Host reads the note and skips the guest performance. |
| Only one team remains | Continue without steal points. |
| The room gets restless | Skip to reveal and move to the next case. |

## Related

- Prepare the content with [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md).
- Learn the demo flow in [tutorial-first-demo.md](tutorial-first-demo.md).
- Look up app state and scoring details in [reference-app.md](reference-app.md).

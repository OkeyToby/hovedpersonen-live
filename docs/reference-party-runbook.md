# Party Runbook Reference

This reference describes the real-room operating plan for Hovedpersonen Live.
Use it as a checklist when preparing, printing, and hosting the golden-wedding
show.

## Roles

| Role | Responsibility | Default |
|------|----------------|---------|
| Entertainment guest | Prepares cases, runs the app, reads host notes, manages points. | You |
| Couple | Adds reveal comments, confirms answers, acts as jury. | `Reveal og jury` |
| Story owner | Comes up and tells one short story or reads the three options. | Selected guests |
| Active team | Answers the current case first. | Assigned per case |
| Other teams | Can steal after a wrong answer. | All non-active teams |

## Preparation Timeline

| Time | Task | Done when |
|------|------|-----------|
| 7-5 days before | Ask 3-5 guests for safe stories. | Each story has a guest and one memory. |
| 4-3 days before | Choose three things, photos, or option stories per case. | The host can show or name each one in order. |
| 2 days before | Enter teams, cases, questions, answers, and reveal notes. | Reload keeps the prepared content. |
| 1 day before | Print Værtark, Casekort, Rekvisitkort, and Holdark. | Paper layer is ready. |
| Party day | Test screen, browser zoom, and first case. | `Start show` is readable from the room. |

## Case Fields

| Field | Use it for | Good example |
|-------|------------|--------------|
| `Format` | Choose `Tre ting, én historie` or `Tre ting, tre historier`. | `Tre ting, tre historier` |
| `Titel` | Short name for the case. | `Første besøg i køkkenet` |
| `Aktivt hold` | Team that answers first. | `Bord 1` |
| `Fortæller` | Guest who comes up or owns the story. | `Tobias` |
| `Ting 1-3` | Objects, clues, or pictures for one-story cases. | `Køleskabsmagnet` |
| `A/B/C historie` | Option stories for three-story cases. | `Han åbnede køleskabet.` |
| `Værtsnote` | What the host says before the story. | `Tobias kommer op...` |
| `Spørgsmål` | The question the team answers. | `Hvad gjorde Tobias først?` |
| `Korrekt svar` | Answer shown in reveal. | `Han åbnede køleskabet.` |
| `Reveal-note` | Landing note or memory comment. | `Direkte ind i familien og direkte i køleskabet.` |

## Show Loop

```text
Producer
  -> Start show
Show / active_team
  -> Vis ting 1
  -> Vis næste ting
  -> Vis næste ting
  -> Rigtigt +2     -> reveal
  -> Forkert        -> steal
  -> Reveal         -> reveal
steal
  -> Stjæl +1       -> reveal
reveal
  -> Næste          -> next active_team or finished
finished
  -> Print or Start forfra
```

## Scoring

| Action | Score change | Next phase |
|--------|--------------|------------|
| `Vis ting 1` / `Vis næste ting` | No score change. | `active_team` |
| `Rigtigt +2` | Active team gets 2 points. | `reveal` |
| `Forkert` with other teams | No immediate points. | `steal` |
| `Stjæl +1` | Stealing team gets 1 point. | `reveal` |
| `Bonus +1` | Host gives a team an extra point. | Current phase stays unchanged |
| `Reveal` | No score change. | `reveal` |

If there is only one team, a wrong answer goes directly to reveal because no
other team can steal.

## Print Pack

| Sheet | Audience | Includes |
|-------|----------|----------|
| `Værtark` | Entertainment guest | Case order, active team, story owner, clues/options, question, answer, reveal note, point rules. |
| `Casekort` | Host | Host prompt and live question for each case. |
| `Rekvisitkort` | Host or helpers | Three things or labels per case. |
| `Holdark` | Teams | Case titles, answer lines, and point space. |

Print before leaving for the venue. The show can run from paper if the screen,
projector, or browser setup fails.

## Room Setup

Recommended setup:

- One laptop on a table near the host.
- Browser opened to `index.html`.
- Screen or projector mirrored from the laptop.
- Browser zoom tested so the active case is readable.
- Printed `Værtark` beside the laptop.
- `Holdark` distributed before the first question.
- Three things, photos, or labels sorted in case order.

## Safety Rules

- Use warm, family-friendly stories by default.
- Avoid stories that depend on embarrassment, private conflict, or inside jokes
  that most of the room cannot follow.
- Keep the couple central as reveal/jury, not as targets.
- If in doubt, choose the kinder version of a story.

## Failure Modes

| Problem | Recovery |
|---------|----------|
| Browser loses prepared data | Use printed sheets or re-enter from `Værtark`. |
| Screen is unreadable | Increase browser zoom or run from paper. |
| A guest does not want to tell the story | Host reads the note and skips the guest performance. |
| Only one team remains | Continue without steal points. |
| The room gets restless | Skip to reveal and move to the next case. |

## Related

- Prepare the content with [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md).
- Learn the demo flow in [tutorial-first-demo.md](tutorial-first-demo.md).
- Look up app state and scoring details in [reference-app.md](reference-app.md).

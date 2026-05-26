# Manual QA Checklist

Use this checklist before calling the golden-wedding prototype ready for another
review.

## Static Load

- [ ] Open `index.html` directly from disk.
- [ ] Confirm the page title is `Hovedpersonen Live - Guldbryllup`.
- [ ] Confirm the app renders without a local server and without module/CORS
      errors.

## Producer and Persistence

- [ ] Confirm the top navigation has `Producer`, `Show`, and `Print`.
- [ ] Confirm `Producer` opens with `Rundown`, one selected case editor, event
      setup, readiness, and score.
- [ ] Confirm team and couple-role controls are inside `Hold og rolle`.
- [ ] Confirm `Klar til test` updates counts for cases, three things, teams, and
      printark.
- [ ] Change the two couple names and event note.
- [ ] Select each holdmodel: `Bordhold`, `Brud mod gom`, `Frit antal hold`.
- [ ] Select each couple role: `Reveal og jury`, `Hjælper på hold`, `Eget hold`.
- [ ] Add a team, rename teams, change a score, and remove a non-final team.
- [ ] Edit a `Tre ting, én historie` case title, story owner, three clues,
      prompt, question, answer, and reveal note.
- [ ] Switch a case to `Tre ting, tre historier` and edit all three option
      stories plus the correct option.
- [ ] Reload the browser and confirm the edited data is restored from
      `localStorage`.
- [ ] Click `Nulstil demo` and confirm seed data returns.

## Full Show Loop

- [ ] Click `Start show` and confirm the big-screen stage shows the first active
      team and no revealed clue yet.
- [ ] Click `Vis ting 1` and confirm only the first clue/option is visible.
- [ ] Click `Vis næste ting` and confirm exactly two clues/options are visible.
- [ ] Click `Vis næste ting` again and confirm all three clues/options are
      visible and `Rigtigt +2`, `Forkert`, and `Reveal` appear.
- [ ] Click `Rigtigt +2` and confirm the active team gains 2 points, all three
      clues/options remain visible, and the stage enters reveal.
- [ ] Click `Næste` and confirm the next case starts with its assigned active
      team and resets to zero visible clues/options.
- [ ] Click `Forkert` and confirm steal controls appear for all other teams.
- [ ] Award steal to another team and confirm that team gains 1 point and reveal
      appears.
- [ ] Click `Reveal` on a later case after all three clues/options are visible
      and confirm no score changes.
- [ ] Advance through all cases and confirm the finished scoreboard appears.
- [ ] Click `Afslut` from the show and confirm the final scoreboard appears.

## Print

- [ ] Open `Print` and confirm `Værtark`, `Casekort`, `Rekvisitkort`, and
      `Holdark` are visible.
- [ ] Click `Åbn print` and confirm print preview hides interactive UI.
- [ ] Confirm `Værtark` includes case order, active team, story owner,
      clues/options, question, answer, reveal note, and point rules.
- [ ] Confirm `Holdark` includes answer lines and point space for each team.

## Escaping and Layout

- [ ] Enter `<script>alert(1)</script>` in couple names, team names, clues,
      option stories, story owner, prompt, question, answer, and reveal note.
- [ ] Confirm the text renders escaped and no script runs.
- [ ] Resize below 390px and confirm Producer, Show, Print, and controls stack
      without horizontal page overflow.

## Snapshot

- [ ] Open `.gstack/designs/hovedpersonen-live-in-app-20260526/finalized.html`
      and confirm it matches the current app behavior.

## Out of Scope

These are intentionally not required for V1:

- Mobile join flow.
- Real-time answer submission.
- Room codes.
- Accounts or backend persistence.
- Automated package scripts.

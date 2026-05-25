# Manual QA Checklist

Use this checklist before calling the golden-wedding prototype ready for another
review.

## Static Load

- [ ] Open `index.html` directly from disk.
- [ ] Confirm the page title is `Hovedpersonen Live - Guldbryllup`.
- [ ] Confirm the app renders without a local server and without module/CORS
      errors.

## Setup and Persistence

- [ ] Confirm setup is presented as three clear steps: `Festen`,
      `Historiekort`, and `Kør og print`.
- [ ] Confirm only one story card is open by default and the `Kort` tabs switch
      between cases without entering show mode.
- [ ] Confirm team and couple-role controls are inside
      `Indstillinger for hold og ærespar`.
- [ ] Confirm `Klar til festen` updates counts for stories, clue cards, teams,
      and print backup.
- [ ] Change the two couple names and event note.
- [ ] Select each holdmodel: `Bordhold`, `Brud mod Gom`, `Frit antal hold`.
- [ ] Select each couple role: `Reveal og jury`, `Hjælper på hold`,
      `Eget hold`.
- [ ] Add a team, rename teams, change a score, and remove a non-final team.
- [ ] Edit one case title, story owner, all three clues, prompt, question,
      answer, and reveal note.
- [ ] Reload the browser and confirm the edited data is restored from
      `localStorage`.
- [ ] Click `Nulstil demo` and confirm seed data returns.

## Full Show Loop

- [ ] Click `Start show` and confirm the big-screen stage shows the first active
      team, three clues, prompt, and question.
- [ ] Click `Korrekt (+2)` and confirm the active team gains 2 points and the
      stage enters reveal.
- [ ] Click `Næste` and confirm the next case starts with its assigned active
      team.
- [ ] Click `Forkert` and confirm steal controls appear for all other teams.
- [ ] Award steal to another team and confirm that team gains 1 point and reveal
      appears.
- [ ] Click `Reveal uden point` on a later case and confirm no score changes.
- [ ] Advance through all cases and confirm the finished scoreboard appears.
- [ ] Click `Afslut` from the show and confirm the final scoreboard appears.

## Print

- [ ] Click `Print ark` and confirm print preview hides interactive UI.
- [ ] Confirm host sheets include case order, active team, story owner, clues,
      question, answer, reveal note, and point rules.
- [ ] Confirm table sheets include answer lines and point space for each team.

## Escaping and Layout

- [ ] Enter `<script>alert(1)</script>` in couple names, team names, clues, story
      owner, prompt, question, answer, and reveal note.
- [ ] Confirm the text renders escaped and no script runs.
- [ ] Resize below 980px and confirm the show stage, setup, cases, and controls
      stack without horizontal page overflow.

## Out of Scope

These are intentionally not required for V1:

- Mobile join flow.
- Real-time answer submission.
- Room codes.
- Accounts or backend persistence.
- Automated package scripts.

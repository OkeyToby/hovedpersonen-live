# Manual QA Checklist

Use this checklist before calling the årstalsquiz prototype ready for review.

## Static Load

- [ ] Open `index.html` directly from disk (`file://`).
- [ ] Confirm the page title is `Hovedpersonen Live — Årstalsquiz`.
- [ ] Confirm the app renders without a local server and without module/CORS errors.

## Producer and Persistence

- [ ] Confirm the top navigation has `Producer`, `Show`, and `Print`.
- [ ] Confirm `Producer` opens with `Event`, `Hold` (inside `<details>`), `Kategorier`, `Finale`, and `Kørsel` sections.
- [ ] Edit the year field and confirm the header year updates.
- [ ] Edit the title field and confirm it saves.
- [ ] Add a team, rename it, change its score, and remove a non-final team.
- [ ] Confirm that removing the last team is blocked (`Fjern` hidden when only 1 team remains).
- [ ] Add categories up to 7; confirm `Tilføj kategori` is hidden at the maximum.
- [ ] Remove a category; confirm `Fjern` is hidden when only 3 categories remain.
- [ ] Edit a category: fill in name, question, answer, and explanation.
- [ ] Edit the Finale question and answer fields.
- [ ] Reload the browser and confirm all edited data is restored from `localStorage`.
- [ ] Click `Nulstil demo` and confirm a confirmation dialog appears before the reset.
- [ ] Confirm seed data is restored after accepting the dialog.

## Full Show Loop

- [ ] Click `Start show` and confirm the big-screen intro stage shows the year.
- [ ] Click `Vis kategori-board` and confirm the category board appears with all categories as tiles.
- [ ] Click a category tile and confirm the question appears with `Rigtigt +2`, `Forkert`, and `Reveal` controls.
- [ ] Click `Rigtigt +2` and confirm the active team gains 2 points and the reveal stage appears.
- [ ] Click `Reveal` and confirm the answer appears in the gold/Fraunces display style.
- [ ] Click `Næste` and confirm the board returns with that category marked used.
- [ ] Click `Forkert` on a later question and confirm no score is awarded.
- [ ] Click `Bonus +1` for any team and confirm the score updates immediately.
- [ ] Advance through all categories and confirm the finale stage appears automatically.
- [ ] Award `+3` to a finale winner and confirm the finished scoreboard appears with the winner highlighted.
- [ ] Click `Afslut` from the mid-show board and confirm the show ends on the finished scoreboard.
- [ ] Reload mid-show and confirm the browser restores to `Show`, not `Producer`.

## Print

- [ ] Open `Print` and confirm both `Værtark` and `Holdark` are visible on screen.
- [ ] Confirm `Værtark` lists all category questions with answers and explanations, the finale answer, and point rules (`+2 / +1 / +3`).
- [ ] Confirm `Holdark` includes answer lines for each category and a score box.
- [ ] Click `Åbn print` and confirm the print preview renders correctly.

## Escaping and Layout

- [ ] Enter `<script>alert(1)</script>` in year, title, team names, category name, question, answer, and finale answer.
- [ ] Confirm the text renders escaped and no script runs.
- [ ] Resize below 768px and confirm Producer, Show, Print, and all controls stack without horizontal overflow.

## Out of Scope

These are intentionally not required for V1:

- Mobile participation or answer submission.
- Room codes, accounts, or backend persistence.
- A package manager or build step.

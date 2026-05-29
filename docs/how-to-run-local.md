# How to Run and Verify Locally

This guide shows how to run the current static prototype and verify the main
local behaviors.

## Prerequisites

- A browser.
- The project files on disk.
- No `npm install` is required.

## Steps

1. Open the app entry point:

   ```text
   index.html
   ```

2. Confirm the current surfaces render.

   Expected visible elements:

   - `Hovedpersonen Live`
   - `Producer`
   - `Show`
   - `Print`
   - the `Event` panel with `Årstal` and `Titel`
   - the `Kørsel` readiness panel
   - `Start show`

3. Exercise the preparation controls.

   - Change the year and title.
   - Open the `Hold` disclosure and add or rename a team.
   - Select a category and edit its name, question, answer, and explanation.
   - Add a category with `Tilføj kategori` (up to 7) and remove one with `Fjern`
     (down to 3).
   - Edit the finale question and answer.

4. Exercise the show controls.

   - Click `Start show`, then `Vis kategori-board`.
   - Pick a category and mark a correct answer (`Rigtigt +2`).
   - Click `Næste` and confirm the turn rotates.
   - Pick another category and mark a wrong answer (`Forkert`).
   - Award `Bonus +1` from the live score panel.
   - Play through all categories and award the finale (`+3`).
   - Confirm the scoreboard shows the winner.

5. Exercise print.

   - Open `Print`.
   - Confirm `Værtark` and `Holdark` are visible.
   - Click `Åbn print`.

6. Run the checklist in [../QA.md](../QA.md).

## Verification

The prototype is verified manually and with direct browser testing. There is no
required package script because the app deliberately avoids a package manager.

Use [how-to-prepare-show.md](how-to-prepare-show.md) and
[reference-party-runbook.md](reference-party-runbook.md) for party-specific
verification.

## Troubleshooting

### The page opens but stays blank

The entry point uses classic scripts:

```html
<script src="./src/content.js"></script>
<script src="./src/game.js"></script>
<script src="./src/app.js"></script>
```

If the page is blank, check browser console errors and confirm all three files
exist under `src/`.

### Edited data keeps coming back

The app saves preparation data in `localStorage` under `hl-arstalsquiz-v1`. Use
`Nulstil demo` to restore the seed data.

### A reload dropped me back to Producer

It should not. The app saves the active surface, so a mid-show reload returns to
the Show stage with the same phase and scores. If you land on Producer, you were
already there before the reload.

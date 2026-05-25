# How to Run and Verify Locally

This guide shows how to run the current golden-wedding prototype and verify the
main local behaviors.

## Prerequisites

- A browser.
- The project files on disk.
- No `npm install` is required.

## Steps

1. Open the app entry point:

   ```text
   index.html
   ```

2. Confirm the guided setup renders.

   Expected visible elements:

   - `Hovedpersonen Live`
   - `Guldbryllups-game show`
   - `Start show`
   - `Festen`
   - `Historiekort`
   - `Kør og print`
   - `Klar til festen`
   - `Indstillinger for hold og ærespar`

3. Exercise the interactive controls.

   - Change couple names and date note.
   - Open `Indstillinger for hold og ærespar`, then change team mode and couple role.
   - Add or rename teams.
   - Use the `Kort` tabs to edit one story case and its three clues.
   - Start the show.
   - Mark a correct answer, a wrong answer, a steal, and a reveal without point.
   - Print the sheets.

4. Run the checklist in [../QA.md](../QA.md).

## Verification

The prototype is verified manually and with direct browser testing. There is no
required package script because the app deliberately avoids a package manager.
For party-specific verification, use [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md)
and [reference-party-runbook.md](reference-party-runbook.md).

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

The app saves preparation data in `localStorage`. Use `Nulstil demo` to restore
the seed data.

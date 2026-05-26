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
   - `Rundown`
   - `Klar til test`
   - `Start show`

3. Exercise the preparation controls.

   - Change couple names and date note.
   - Open `Hold og rolle`.
   - Change team mode and couple role.
   - Add or rename teams.
   - Edit a `Tre ting, én historie` case.
   - Edit a `Tre ting, tre historier` case and confirm one correct radio option.

4. Exercise the show controls.

   - Start the show.
   - Mark a correct answer.
   - Move to the next case.
   - Mark a wrong answer.
   - Award steal.
   - Reveal and finish.

5. Exercise print.

   - Open `Print`.
   - Confirm `Værtark`, `Casekort`, `Rekvisitkort`, and `Holdark` are visible.
   - Click `Åbn print`.

6. Run the checklist in [../QA.md](../QA.md).

## Verification

The prototype is verified manually and with direct browser testing. There is no
required package script because the app deliberately avoids a package manager.

Use [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md) and
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

The app saves preparation data in `localStorage`. Use `Nulstil demo` to restore
the seed data.

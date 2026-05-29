# Run Your First Hovedpersonen Live Demo

This tutorial takes you from the project folder to a working golden-wedding show
demo using the current `Producer`, `Show`, and `Print` surfaces.

## What You Need

- A browser.
- This project folder.
- No package manager or build tool.

## Step 1: Open the App

Open [../index.html](../index.html) in your browser.

You should see the `Producer` surface with:

- a `Rundown` list
- one selected case editor
- event fields
- `Klar til test`
- score chips

This is the preparation layer. It is where you edit the show before the party.

## Step 2: Edit the First Case

In `Rundown`, select the first case: `Første besøg i køkkenet`.

Change one or two fields:

- `Fortæller`
- `Ting 1`, `Ting 2`, `Ting 3`
- `Spørgsmål`
- `Korrekt svar`
- `Reveal-note`

Reload the page. Your edits should still be there because the app saves to
`localStorage`.

## Step 3: Try Both Case Formats

Select case 2 in `Rundown`.

It uses `Tre ting, tre historier`, where each option has:

- one thing
- one possible story
- one radio button for the correct option

Confirm exactly one `Korrekt` option is selected.

## Step 4: Run the Show

Click `Start show`.

1. On the first case, click `Vis ting 1`.
2. Click `Vis næste ting` twice, until all three things are visible.
3. Click `Rigtigt +2`.
4. Confirm the reveal shows the correct answer.
5. Click `Næste`.
6. On the next case, reveal all three options, then click `Forkert`.
7. Award `Stjæl +1` to another team.
8. Award `Bonus +1` to one team from the live score panel.
9. Click `Næste` until the scoreboard appears.

## Step 5: Check Print

Open `Print`.

Confirm you can see:

- `Værtark`
- `Casekort`
- `Rekvisitkort`
- `Holdark`

Click `Åbn print` if you want to inspect browser print preview.

## What You Built

You have run the static, paper-first golden-wedding prototype. You now have a
rehearsable show with a preparation layer, a big-screen layer, and paper sheets.

## Next

- Prepare the real event with [how-to-prepare-guldbryllup.md](how-to-prepare-guldbryllup.md).
- Use the party-day checklist in [reference-party-runbook.md](reference-party-runbook.md).

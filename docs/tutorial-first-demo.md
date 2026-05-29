# Run Your First Hovedpersonen Live Demo

This tutorial takes you from the project folder to a working årstalsquiz demo
using the current `Producer`, `Show`, and `Print` surfaces.

## What You Need

- A browser.
- This project folder.
- No package manager or build tool.

## Step 1: Open the App

Open [../index.html](../index.html) in your browser.

You should see the `Producer` surface with:

- an `Event` panel with the year and title
- a `Kørsel` readiness panel with a `Start show` button
- a category list (the seed has 7 categories)
- a finale editor
- a category editor for the selected category

This is the preparation layer. It is where you edit the quiz before the party.

## Step 2: Edit the Event and a Category

In the `Event` panel, change the `Årstal` and `Titel`.

In the category list, select the first category (`Musik`). In the editor, change
one or two fields:

- `Navn`
- `Spørgsmål`
- `Svar`
- `Forklaring`

Reload the page. Your edits should still be there because the app saves to
`localStorage`.

## Step 3: Check the Finale

In the finale editor, confirm there is a `Spørgsmål` and `Svar`. The seed asks
which year the room is in, with the answer `2002`. This is the deciding round.

## Step 4: Run the Show

Click `Start show`. The app switches to the `Show` surface and the intro stage.

1. Click `Vis kategori-board`.
2. On the board, click any category tile (for example `Sport`).
3. Read the question, then click `Rigtigt +2`.
4. Confirm the reveal shows the answer and the active team gained 2 points.
5. Click `Næste`. The turn rotates to the next team and the board returns.
6. Pick another category and click `Forkert`. The category still locks.
7. Award `Bonus +1` to a team from the live score panel.
8. Keep playing until every tile is used. The app moves to the finale.
9. On the finale stage, click a team button to award `+3`.
10. Confirm the scoreboard shows the winner.

## Step 5: Check Print

Open `Print`.

Confirm you can see:

- `Værtark` (host sheet) with every question, answer, and the finale
- `Holdark` (team sheets) with answer lines and point boxes

Click `Åbn print` if you want to inspect the browser print preview.

## What You Built

You have run the static, paper-first årstalsquiz prototype. You now have a
rehearsable show with a preparation layer, a big-screen layer, and paper sheets.

## Next

- Write your own categories with [how-to-write-categories.md](how-to-write-categories.md).
- Prepare the real event with [how-to-prepare-show.md](how-to-prepare-show.md).
- Use the party-day checklist in [reference-party-runbook.md](reference-party-runbook.md).

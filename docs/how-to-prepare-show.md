# How to Prepare a Show

This guide turns the static prototype into a real party plan for an årstalsquiz.
Use it when you are the host and need to arrive with a finished, printable show.

## Prerequisites

- The project folder on your computer.
- A browser that can open `index.html`.
- A chosen year.
- At least 2 teams.
- 3-7 category questions and a finale, drafted with
  [how-to-write-categories.md](how-to-write-categories.md).

## Steps

1. Open the app.

   Open [../index.html](../index.html) directly in your browser.

   The app opens in `Producer`. This is the preparation layer.

2. Fill in the event.

   In the `Event` panel, update:

   - `Årstal` — the year the room will guess.
   - `Titel` — the headline shown on the intro stage.
   - `Værtsnote` — an optional private note for yourself.

3. Decide the teams.

   Open the `Hold` disclosure to rename teams, edit scores, add, or remove. Keep
   at least two teams so the finale is a real contest. The seed has three:
   `Hold 1`, `Hold 2`, `Hold 3`.

4. Enter the categories.

   Select one category at a time from the list. For each, fill in:

   - `Navn`
   - `Spørgsmål`
   - `Svar`
   - `Forklaring` (optional)

   Use `Tilføj kategori` for up to 7, or `Fjern` to drop down to a minimum of 3.

5. Enter the finale.

   In the finale editor, fill in the `Spørgsmål`, `Svar` (the year), and an
   optional `Forklaring`.

6. Check readiness.

   In the `Kørsel` panel, confirm:

   - the team count matches the room
   - every category shows under "kategorier oprettet"
   - every category has a question and answer

7. Print the paper layer.

   Open `Print` and inspect:

   - `Værtark` (host sheet)
   - `Holdark` (team sheets)

   Print one host set for yourself and team sheets for the players.

8. Rehearse once.

   Run through two categories before the party:

   1. Click `Start show`, then `Vis kategori-board`.
   2. Pick a category and mark `Rigtigt +2`.
   3. Click `Næste`.
   4. Pick another category and mark `Forkert`.
   5. Confirm `Reveal` and `Næste` feel natural.

Use `Bonus +1` during the show if a team earns an extra point for a strong
answer or room reaction.

## Verification

Before leaving for the party, confirm:

- The browser reloads with your prepared year, teams, categories, and finale.
- The host sheet contains all correct answers and the finale.
- The team sheets have answer lines.
- You can reach the intro stage by clicking `Start show`.

## Troubleshooting

### My edits disappeared

The app saves in `localStorage` for the browser you used. Open the same browser
and the same `index.html` file. If you clicked `Nulstil demo`, the seed content
was restored.

### There is only one team

The show still works, but the finale becomes a single-team award. Use at least
two teams for a livelier room.

### The venue screen fails

Use the printed host sheet and team sheets. Read questions aloud and track points
manually.

### An accidental reload mid-show

The app restores the Show surface, the current phase, and all scores, so a
refresh will not expose answers on the projected screen.

## Related

- Use [reference-party-runbook.md](reference-party-runbook.md) on the party day.
- Use [how-to-run-local.md](how-to-run-local.md) to verify the app before you
  leave for the venue.
- Use [reference-app.md](reference-app.md) when editing app data or state
  behavior.

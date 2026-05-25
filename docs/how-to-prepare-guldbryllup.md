# How to Prepare a Golden-Wedding Show

This guide turns the static prototype into a real party plan for a golden
wedding. Use it when you are the entertainment guest and need to arrive with a
finished, printable show.

## Prerequisites

- The project folder on your computer.
- A browser that can open `index.html`.
- Names for the couple.
- At least 3 table teams or family teams.
- 3-5 short stories from selected guests.

## Steps

1. Open the app.

   Open [../index.html](../index.html) directly in your browser.

   The setup screen should show three steps: `Festen`, `Historiekort`, and
   `Kør og print`. The default path is meant to feel like filling in a host
   sheet, not configuring a full quiz system.

2. Fill in the event.

   In `Festen`, update:

   - `Navn 1`
   - `Navn 2`
   - `Dato / note`
   Open `Indstillinger for hold og ærespar` only if you need to change the team
   model, the couple role, or the team names. Keep the default role
   `Reveal og jury` unless you have agreed that the couple should compete on a
   team.

3. Decide the teams.

   The safest default is table teams:

   - `Bord 1`
   - `Bord 2`
   - `Bord 3`

   Rename the teams if the room is divided by family, friends, or sides of the
   family. Keep at least two teams if you want `Stjæl point` to matter.

4. Collect stories before the party.

   Ask selected guests for short memories that point back to the couple. For
   each story, collect:

   - the guest who will tell it
   - three things, objects, or pictures
   - a host note for calling the guest up
   - one question the active team must answer
   - the correct answer
   - a warm reveal comment

   Good stories are specific, safe, and short enough to tell in 60-90 seconds.

5. Enter the story cards.

   In `Historiekort`, use the `Kort` tabs to focus on one story at a time. For
   each case in the app, fill in:

   - `Titel`
   - `Gæst der fortæller`
   - `Ting 1`, `Ting 2`, `Ting 3`
   - `Oplæsningsnote`
   - `Spørgsmål til aktivt hold`
   - `Korrekt svar`
   - `Reveal-kommentar`

   Assign each case to the team that should answer first.

6. Check readiness and print the backup sheets.

   In `Kør og print`, use `Klar til festen` to see whether stories, three things,
   teams, and print backup are ready. Then click `Print ark`.

   Print one host sheet for yourself and one table sheet for each team. The
   table sheets make the show work even if the screen setup at the venue is
   awkward.

7. Rehearse once.

   Run through the first two cases before the party:

   1. Click `Start show`.
   2. Mark one answer as `Korrekt (+2)`.
   3. Click `Næste`.
   4. Mark one answer as `Forkert`.
   5. Award `Stjæl point` to another team.
   6. Confirm `Reveal` and `Næste` feel natural.

## Verification

Before leaving for the party, confirm:

- The browser reloads with your prepared names, teams, and cases.
- The host sheet contains all correct answers.
- The table sheets have answer lines.
- You can reach the first show screen by clicking `Start show`.
- You have the three things or pictures for each story.

## Troubleshooting

### My edits disappeared

The app saves in `localStorage` for the browser you used. Open the same browser
and the same `index.html` file. If you clicked `Nulstil demo`, the seed content
was restored.

### There is only one team

The show still works, but `Stjæl point` is skipped because no other team can
answer. Use at least two teams for a livelier room.

### The venue screen fails

Use the printed host sheet and table sheets. Read the three things aloud and
track points manually.

### A story feels too private

Replace it. The default tone is warm and family-friendly. The couple should feel
central, not exposed.

## Related

- Use [reference-party-runbook.md](reference-party-runbook.md) on the party day.
- Use [how-to-run-local.md](how-to-run-local.md) to verify the app before you
  leave for the venue.
- Use [reference-app.md](reference-app.md) when editing the app data or state
  behavior.

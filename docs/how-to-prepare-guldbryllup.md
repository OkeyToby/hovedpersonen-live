# How to Prepare a Golden-Wedding Show

This guide turns the static prototype into a real party plan for a golden
wedding. Use it when you are the entertainment guest and need to arrive with a
finished, printable show.

## Prerequisites

- The project folder on your computer.
- A browser that can open `index.html`.
- Names for the couple.
- At least 2 table teams or family teams.
- 3-5 short stories from selected guests.
- Three objects, photos, or clue labels for each case.

## Steps

1. Open the app.

   Open [../index.html](../index.html) directly in your browser.

   The app opens in `Producer`. This is the preparation layer.

2. Fill in the event.

   In the event panel, update:

   - `Navn 1`
   - `Navn 2`
   - `Dato / note`

   Open `Hold og rolle` only if you need to change the team model, the couple
   role, or the team names. Keep `Reveal og jury` unless you have agreed that
   the couple should compete.

3. Decide the teams.

   The safest default is table teams:

   - `Bord 1`
   - `Bord 2`
   - `Bord 3`

   Rename the teams if the room is divided by family, friends, or sides of the
   family. Keep at least two teams if you want `Stjæl +1` to matter.

4. Choose the format for each case.

   Use `Tre ting, én historie` when one guest comes up and tells the real story
   using three things.

   Use `Tre ting, tre historier` when the three things each point to a possible
   story and the teams must guess which one actually happened.

5. Enter the cases.

   In `Rundown`, select one case at a time. For each case, fill in:

   - `Format`
   - `Aktivt hold`
   - `Titel`
   - `Fortæller`
   - three things or three option stories
   - `Værtsnote`
   - `Spørgsmål`
   - `Korrekt svar`
   - `Reveal-note`

   For `Tre ting, tre historier`, confirm exactly one `Korrekt` radio option is
   selected.

6. Check readiness.

   In `Klar til test`, confirm:

   - all cases have a storyteller, question, and answer
   - all cases have three things/options
   - the team count matches the room
   - print sheets are available

7. Print the paper layer.

   Open `Print` and inspect:

   - `Værtark`
   - `Casekort`
   - `Rekvisitkort`
   - `Holdark`

   Print one host set for yourself. Print or prepare hold sheets for the teams.

8. Rehearse once.

   Run through the first two cases before the party:

   1. Click `Start show`.
   2. Click `Vis ting 1`.
   3. Click `Vis næste ting` twice.
   4. Mark one answer as `Rigtigt +2`.
   5. Click `Næste`.
   6. Reveal all three things/options on the next case.
   7. Mark one answer as `Forkert`.
   8. Award `Stjæl +1` to another team.
   9. Confirm `Reveal` and `Næste` feel natural.

Use `Bonus +1` during the show if a team earns an extra point for a strong
story, explanation, or room reaction.

## Verification

Before leaving for the party, confirm:

- The browser reloads with your prepared names, teams, and cases.
- The host sheet contains all correct answers.
- The hold sheets have answer lines.
- You can reach the first show screen by clicking `Start show`.
- You have the three things, photos, or labels for each case.

## Troubleshooting

### My edits disappeared

The app saves in `localStorage` for the browser you used. Open the same browser
and the same `index.html` file. If you clicked `Nulstil demo`, the seed content
was restored.

### There is only one team

The show still works, but steal is skipped because no other team can answer. Use
at least two teams for a livelier room.

### The venue screen fails

Use the printed host sheets and hold sheets. Read the three things aloud and
track points manually.

### A story feels too private

Replace it. The default tone is family-friendly. The couple should feel central,
not exposed.

## Related

- Use [reference-party-runbook.md](reference-party-runbook.md) on the party day.
- Use [how-to-run-local.md](how-to-run-local.md) to verify the app before you
  leave for the venue.
- Use [reference-app.md](reference-app.md) when editing app data or state
  behavior.

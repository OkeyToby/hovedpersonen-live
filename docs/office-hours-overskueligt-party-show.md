# Office Hours: Mere Overskueligt Festshow

Date: 2026-05-25

## Problem

Hovedpersonen Live har den rigtige kerne, men setup kan føles for stort: mange felter,
mange cases og mange regler på samme skærm. Brugeren har brug for en genbrugelig
festskabelon, ikke et redigeringsdashboard.

## External Inspiration

- Two Truths and a Lie works because the rule can be explained in one sentence:
  two statements are true, one is false, everyone guesses, then the truth is revealed.
- Hosted versions of Two Truths and a Lie often collect responses before the event
  and turn them into a presentation, then the host interviews the participant after
  reveal.
- Clue/word party games like Catch Phrase, Just One, and Decrypto keep the table
  surface small: a few clues, a clear guess, a reveal, and fast turn-taking.
- Anniversary party games tend to rely on couple trivia and warm memories; the
  risk is that they become flat quizzes unless a story moment is added.

## Premise Challenge

The current app asks: "Can you edit a full show?"

The better V1 question is: "Can you get one good party segment ready in 15 minutes?"

For next weekend, overskuelighed matters more than feature breadth. The app should
hide the full machinery until it is needed.

## Recommended Product Shape

Make the first screen a **show builder with three steps**:

1. **Festen**
   - Couple names.
   - Date or event note.
   - Tone.
   - Advanced team and couple-role settings only when needed.

2. **Historiekort**
   - One case card at a time.
   - Three clues or three statements.
   - Story owner.
   - Correct answer.
   - Reveal note.

3. **Kør og print**
   - Start show.
   - Print host cards.
   - Print table sheets.

## Narrowest Wedge

For the guldbryllup, keep only one active format in the UI:

**Tre ting, en historie**

But present it as cards, not a spreadsheet:

```text
Kort 1
  Hvem fortæller?
  Ting 1
  Ting 2
  Ting 3
  Hvad skal holdet gætte?
  Korrekt svar
  Hvad siger værten ved reveal?
```

Everything else becomes collapsed or secondary.

## Simplification Rules

- First screen should show progress, not all fields.
- Show one active story card by default.
- Move advanced team/role settings behind "Indstillinger".
- Replace scoreboard during setup with "Klar til festen" checklist.
- Keep print visible as a primary action.
- Use examples inline so the user can overwrite them instead of reading docs.

## Suggested Next Implementation Pass

1. Convert setup into a 3-step guided layout: event, cards, run/print.
2. Add a compact story-card editor for the selected case.
3. Collapse team settings and all cases list behind secondary controls.
4. Add "Klar til festen" checklist.
5. Keep existing show-stage and game logic unchanged.

## Assignment

Before redesigning the app, prepare the real guldbryllup content on paper:

- Write 4 story cards.
- For each card: story owner, 3 things, question, answer, reveal note.
- Mark which fields felt hard to fill in.

Those hard fields should drive the UI simplification.

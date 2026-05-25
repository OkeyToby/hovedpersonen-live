# Why the Prototype Is Static

Hovedpersonen Live is currently static because the first product risk is not
backend infrastructure. The first risk is whether the entertainment guest can
prepare and run a warm, understandable golden-wedding show without starting from
zero.

## The Problem

A party game can fail even if the technology works:

- The entertainment guest may not know what to prepare.
- The room may not understand whose turn it is.
- A personal story may need a safe reveal moment.
- Phones, logins, room codes, or network issues can slow down the party.

Adding accounts, networking, persistence servers, or a build system before this
loop is validated would increase implementation surface without proving the core
format.

## The Approach

The current app is deliberately small:

```text
index.html
    |
    v
src/content.js  ---> seed golden-wedding template
src/game.js     ---> local phase machine, scoring, storage
src/app.js      ---> rendering and event binding
src/styles.css  ---> visual system, responsive layout, print rules
```

The prototype can be opened directly from disk and uses `localStorage` for
preparation data.

## Trade-offs

Static-first gives up:

- Real mobile participation.
- Real-time multiplayer.
- Persistent cloud saves.
- Package-script automation.

Static-first preserves:

- Direct local run path.
- Paper-first robustness for a real event.
- Fast editing of names, teams, stories, clues, and answers.
- A small code surface for the show-loop implementation.

## Next Architectural Step

Only add networking after the paper-first show loop has been tested in a real
room. The next credible step would be a host route plus optional guest answer
route, but the current V1 should remain focused on:

```text
setup -> active team -> answer -> steal -> reveal -> score -> next turn
```

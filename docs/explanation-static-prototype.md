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
- Paper may still be needed if the venue screen fails.

Adding accounts, networking, persistence servers, or a build system before this
loop is validated would increase implementation surface without proving the core
format.

## The Approach

The current app is deliberately small:

```text
index.html
    |
    v
src/content.js  ---> seed golden-wedding template and cases
src/game.js     ---> local phase machine, scoring, storage
src/app.js      ---> Producer, Show, Print rendering and event binding
src/styles.css  ---> visual system, responsive layout, print rules
```

The prototype can be opened directly from disk and uses `localStorage` for
preparation data.

The product model is:

```text
Producer  ->  Show  ->  Print
prepare       run       paper script
```

`Producer` is the working surface. `Show` is the broadcast surface. `Print` is
the script layer that makes the show robust in a real room.

## Trade-offs

Static-first gives up:

- Real mobile participation.
- Real-time multiplayer.
- Persistent cloud saves.
- Package-script automation.

Static-first preserves:

- Direct local run path.
- Paper-first robustness for a real event.
- Fast editing of names, teams, stories, clues, options, and answers.
- A small code surface for the show-loop implementation.

## Current State Machine

The show loop is:

```text
setup -> active_team -> steal -> reveal -> finished
```

The host can also go directly to `Print` from the top navigation at any time.

## Next Architectural Step

Only add networking after the paper-first show loop has been tested in a real
room. The next credible step would be a host route plus optional guest answer
route, but the current V1 should remain focused on:

```text
prepare locally -> run on screen -> keep paper backup
```

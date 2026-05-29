# Why the Prototype Is Static

Hovedpersonen Live is currently static because the first product risk is not
backend infrastructure. The first risk is whether the host can prepare and run a
warm, understandable årstalsquiz without starting from zero.

## The Problem

A party game can fail even if the technology works:

- The host may not know what to prepare.
- The room may not understand whose turn it is.
- The answer may need a clear, fair reveal moment.
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
src/content.js  ---> seed year event, teams, categories, and finale
src/game.js     ---> local phase machine, scoring, storage
src/app.js      ---> Producer, Show, Print rendering and event binding
src/styles.css  ---> visual system, responsive layout, print rules
```

The prototype can be opened directly from disk and uses `localStorage` for
preparation data, runtime state, and the active surface.

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
- Fast editing of the year, teams, categories, and finale.
- A small code surface for the show-loop implementation.

## Current State Machine

The show loop is:

```text
intro -> category_board -> question -> reveal -> ... -> finale -> finished
```

After each `reveal`, `Næste` rotates to the next team and returns to
`category_board`. When every category is used, the loop moves to `finale`, then
`finished`. The host can also use `Afslut` to jump to the scoreboard, and can
switch to `Print` from the top navigation at any time.

Because the active surface is persisted alongside state, an accidental reload
mid-show restores the Show stage rather than dropping the host onto Producer —
which would otherwise expose every question and answer on a projected screen.

## Next Architectural Step

Only add networking after the paper-first show loop has been tested in a real
room. The next credible step would be a host route plus an optional guest answer
route, but the current V1 should remain focused on:

```text
prepare locally -> run on screen -> keep paper backup
```

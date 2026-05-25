# Hovedpersonen Live Design Notes

The current design direction is a warm, paper-first golden-wedding game show for
the entertainment guest. The primary product moment is the big-screen stage, not
a mobile answer flow.

## Product Posture

- Lead with `Tre ting, en historie`.
- Keep the couple central as reveal or jury by default.
- Make competition energetic but secondary to stories and memories.
- Avoid spicy defaults, public embarrassment, and tech-heavy join flows.

## Screen Priorities

1. Big-screen show stage: active team, case title, three clues, question, reveal,
   score event, and host controls.
2. Preparation: a guided `Festen -> Historiekort -> Kør og print` setup that
   shows one active story card at a time.
3. Advanced settings: team setup, couple role, and manual scores behind a
   secondary disclosure so the default path stays calm.
4. Print: host sheets and table answer sheets as offline backup.

## Visual System

- Direction: `A+B` from design-shotgun. Use Familiearkiv Scene for setup, stories,
  and print. Use Storskærm Game Show for live show-mode.
- Background: light neutral event-room tone with subtle paper texture.
- Stage: deep green, high contrast, large type, and restrained game-show energy.
- Story surface: white paper-like panel with warm gold accents.
- Setup: family-album and host-card feel, including a gold anniversary seal,
  visible three-step progress, physical-card preview cues, and a readiness list.
- Controls: direct verbs, stable placement, no decorative UI chrome.
- Cards: 8-10px radius, used only for functional panels and repeated cases.
- Typography: serif display treatment is allowed for warm archive moments; utility
  UI stays sans-serif and dense enough for repeated editing.

## Interaction Rules

- `Start show` starts the first case and resets scores.
- `Korrekt (+2)` awards the active team and enters reveal.
- `Forkert` opens steal controls.
- `Reveal uden point` enters reveal without score change.
- `Næste` advances to the next case or finished scoreboard.
- `Print ark` prints host and table sheets.

## Print Rules

Print mode must hide the interactive app and show only practical sheets:

- Host sheet with all answers and reveal notes.
- Table sheets with answer lines and point space.

## Out of Scope

- Mobile participation UI.
- Room codes.
- Real-time multiplayer.
- Account or backend flows.

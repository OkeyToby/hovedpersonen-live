# Hovedpersonen Live - Office Hours Design Doc

Date: 2026-05-24
Mode: Startup + side project

## The Assignment

Build **Hovedpersonen Live** as a turn-based personal game show builder for people
who are asked to bring entertainment to a party, anniversary, birthday, wedding,
or family event.

The first concrete use case is a **golden wedding next weekend**. The product
should help an entertainment guest arrive with a finished, warm, funny, and safe
indslag without inventing the format from scratch.

## Core Insight

The real competitor is not another quiz app. It is:

- Kahoot
- paper questions
- PowerPoint
- homemade quiz cards
- a guestbook or speech
- starting from zero every time

The winning product is not "another live quiz." It is a reusable dramaturgy:

> A finished personal entertainment template where the host only fills in names,
> stories, objects, teams, and answers.

## Recommended Direction

Use a **turn-based game show format**.

Instead of all teams answering the same question at the same time:

- one team is active at a time
- that team gets a custom case, story, or set of clues
- other teams follow along because they can steal points
- the guest/story owner can come up and perform the story
- the main people stay central without being exposed

This makes the experience feel closer to a personal TV game show than a classroom
quiz.

## First Event Format: Golden Wedding

Working title: **"Kan vi gætte jer? Guldbryllupsudgaven"**

Target length: 25-35 minutes.

Tone:

- funny first
- warm and memory-driven second
- competition as energy, not the whole point
- no spicy default
- paper-first robustness with optional mobile support

Teams:

- Prefer table teams or family/friend teams.
- Optional special mode: **Hold Bruden vs. Hold Gommen**.
- The couple can either help teams, reveal answers, or act as judges.

## Signature Round: Three Things, One Story

This is the strongest new mechanic.

Setup:

- before the event, collect 3-5 stories from selected guests
- for each story, choose three objects or pictures
- only one story is true, or one object is the key to the real story

Live flow:

1. A selected guest is called up.
2. The guest gets three things or pictures.
3. They tell the story in 60-90 seconds.
4. The active team answers a question about the story.
5. If they miss, other teams can steal.
6. The couple or family adds the reveal/comment.

Why it works:

- guests become part of the show
- the story still points back to the main people
- the format naturally produces both laughs and memories
- physical objects make the round memorable and printable

## Suggested Game Flow

1. **Opvarmning: Lette grin**
   Fast, safe questions that get the room talking.

2. **Holdet på scenen**
   One team at a time gets a targeted question or story.

3. **Tre ting, en historie**
   Selected guests tell stories using three clues or objects.

4. **Stjæl point**
   Other teams can answer if the active team misses.

5. **Finale: Sammen igen**
   The couple chooses the best, funniest, or warmest final answer.

## Product Requirements

The app should support:

- event template selection, starting with `Guldbryllup`
- team setup with turn order
- per-team cases/questions
- active team state
- steal state
- reveal state
- score tracking
- story/object preparation
- print-friendly host cards and table sheets
- optional mobile answer flow later

For V1, paper and storskærm are allowed to carry the experience. Mobile is useful,
but should not be required for the event to work.

## Premises

- The buyer/user is often not the official host, but the **entertainment guest**:
  the person responsible for "finding på noget sjovt."
- The narrow wedge is not "all parties." It is high-stakes personal indslag where
  starting from zero is stressful.
- The first test should be one real golden wedding, not a generic quiz demo.
- The core differentiation is dramaturgy and templates, not live polling tech.

## Open Questions

- Should the first product package be specifically branded around golden weddings,
  or should it be "family milestone events" with golden wedding as the first template?
- Should the couple be active competitors, judges, or reveal people by default?
- How many guests can comfortably be called up before the pace drops?
- What is the minimum mobile layer that adds value without creating tech friction?

## Next Assignment

Build the next prototype around the **turn-based show loop**:

1. choose teams
2. show active team
3. present three things / one story
4. submit or mark answer
5. open steal opportunity
6. reveal
7. update score
8. advance turn

Do not expand to general party types until the golden wedding flow works end to
end.

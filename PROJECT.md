# Antifragile — a visual essay

A scroll-driven visual essay on the core ideas of Nassim Taleb's *Antifragile:
Things That Gain From Disorder*. One page. One sitting. Read in ~5 minutes.

## References — The Pudding's guide

Re-read before each phase. The starter is theirs; the playbook is theirs.

- [Part 1: Working with Data](https://pudding.cool/process/how-to-make-dope-shit-part-1/)
  — tools and data workflow.
- [Part 2: Design](https://pudding.cool/process/how-to-make-dope-shit-part-2/)
  — pairing visualization with code.
- [Part 3: Storytelling](https://pudding.cool/process/how-to-make-dope-shit-part-3/)
  — structure, audience, and clarity.

## Goal

Use Pudding's playbook to render Taleb's parables. Each section is one
parable Taleb chose to make the abstract concrete. The math from his
[graphical tour](https://www.fooledbyrandomness.com/graphicaltour.pdf)
lives *underneath* each parable as the second beat, not the first —
character first, principle second, exactly as Pudding's Part 3 §3
prescribes for complex ideas.

## The question

> **What is the opposite of fragile?**

Not "robust." English is missing the word — Taleb had to coin it. The
essay walks through the missing word in five of his own parables.

## Sections — five parables

Section titles use Taleb's own terms verbatim (verified against the book
and the [graphical tour PDF](https://www.fooledbyrandomness.com/graphicaltour.pdf)).
Each section: parable opens (character entry), Taleb's own figure reveals
the math, one-sentence message lands. Five total. No more.

1. **How to Love the Wind** — *the prologue line.* Wind extinguishes a
   candle and energizes fire. Same shock, opposite responses.
   - Figure: Fig 21 (robust vs antifragile time series)
   - Pattern: **stacked** — two side-by-side scenes, no animation needed
   - Message: "There is a third category, and you've never named it."

2. **Between Damocles and Hydra** — *Chapter 1 title.* Damocles dines
   under a sword (fragile). The Phoenix burns and returns unchanged
   (robust). The Hydra grows two heads where one is cut (antifragile).
   - Figure: Fig 22 (four payoff shapes — robust, fragile×2, antifragile)
   - Pattern: **stepping** — tap through three states
   - Message: "Fragile, robust, antifragile. The third is the one that grows."

3. **Stone and Pebbles** — *Chapter 18.* A king crushed by one big stone
   is not the same as a king pelted by many small ones. Harm scales
   nonlinearly with size.
   - Figure: Fig 28 (stone and pebbles concavity curve)
   - Pattern: **scrollytelling** — drag/scroll the stone size, watch harm
     curve away from linear
   - Message: "Size matters more than frequency. Concavity is the trap."

4. **Fat Tony** — *Taleb's recurring character.* Fat Tony bets against
   the crowd's prediction during the run-up to the Iraq war. Limited
   downside, unlimited upside. $300k → $18M.
   - Figure: Fig 24 (barbell time series) + Fig 26 (asymmetric payoff)
   - Pattern: **scrollytelling** — animate the payoff asymmetry as the
     volatility input grows
   - Message: "Don't predict. Position. Cap the downside, leave the
     upside open."

5. **The Turkey** — *the closer.* Fed every day for 1000 days, more
   confident every day. Day 1001 is Thanksgiving. Stable history is not
   evidence of safety; sometimes it's the opposite.
   - Figure: Fig 35 (Inverse Turkey Problem)
   - Pattern: **stepping** — tap through the days, the line climbs, then
     the cliff
   - Message: "What you've never seen is exactly what's coming."

## Tech

Use only what the starter already ships (see [README.md](README.md)):

- SvelteKit + Svelte 5
- [`Scrolly.svelte`](src/components/helpers/Scrolly.svelte) for scroll triggers
- Plain SVG for figures until a figure genuinely needs LayerCake
- Style Dictionary tokens already in `properties/`

No new dependencies until a section proves it needs one. No chart framework
installed speculatively. No UI component library.

## Non-goals

- Not a book summary. Skip anything that doesn't have a visual hook.
- No citations, footnotes, or bibliography page.
- No dark-mode toggle, share buttons, or i18n.
- No CMS wiring — copy lives in the component until it doesn't.

## Working order

Pudding's Part 2 cardinal rule: *don't design in code*. Storyboard first.

1. **Storyboard** all 5 parables in Figma (or paper). One panel for the
   parable, one for the math reveal. No Svelte yet.
2. **Skeleton** — replace the prose in
   [Index.svelte](src/components/Index.svelte) with 5 empty section headings
   and placeholder figures.
3. **Build one** end-to-end — start with **Stone and Pebbles**. It's the
   cleanest single-parable + single-figure combo, so it's the lowest risk
   to lock the visual language (type, color, motion, spacing) on.
4. **Copy the pattern** to the other four parables. Resist re-designing
   mid-essay.
5. **Pass** — read it top to bottom. Cut whatever bored you.

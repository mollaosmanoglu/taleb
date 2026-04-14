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

## Guidelines — Pudding essay benchmarks (n = 10)

Sampled 10 published Pudding essays to set targets:

| Essay | Words | Figures |
|-------|------:|--------:|
| Women in Headlines | 2,850 | 6 |
| Song Repetition | 2,100 | 6 |
| Pockets | 2,400 | 10 |
| Film Dialogue | 1,100 | 7 |
| Genre (Spotify) | 1,850 | 1 |
| Foundation Names | 2,850 | 14 |
| How the Internet Laughs | 675 | 8 |
| Big Hair | 1,900 | 36 |
| EU Regions | 2,100 | 12 |
| Women in Congress | 2,100 | 13 |

**Words:** median ~2,100 · range 675–2,850
**Figures:** median ~9 · range 1–36

Aim for **~1,500–2,500 words** and **5–10 figures**. We have 5 interactive
figures (one per parable). Word count is currently low — add more prose to
each parable section to reach ~300–500 words per section.

## Figure catalogue — Taleb's graphical tour (Fig 19–36)

Every distinct concept from the appendix, with what we currently cover:

| # | Figure | Concept | What it shows | Status |
|---|--------|---------|---------------|--------|
| 1 | Fig 19 | Dose-response / Less is More | Inverted U — benefits reverse beyond a point | — |
| 2 | Fig 20–21 | Fragile blowup vs antifragile spike | Time series, same shock opposite outcomes | **Wind** ✓ |
| 3 | Fig 22 | Four probability shapes | Tail asymmetry (fragile/robust/antifragile) | **Hydra** ✓ |
| 4 | Fig 23 | Definition of fragility | Left tail mass grows under stress | — (technical) |
| 5 | Fig 24 | Barbell strategy | Floor the downside, keep unlimited upside | — |
| 6 | Fig 25–26 | Uncertainty injection | Fragile loses, antifragile gains under volatility | — |
| 7 | Fig 27 | Convex transformation | Event ≠ exposure. f(x) vs x. Eliminate downside | — |
| 8 | Fig 28 | Nonlinear harm (concavity) | Size matters more than frequency | **Stone** ✓ |
| 9 | Fig 29 | Weak antifragility | Bounded benefit, typical in nature | — (similar to 1) |
| 10 | Fig 31 | Iatrogenics | Small visible gains, hidden catastrophic losses | — |
| 11 | Fig 32 | Biology S-curve | Convex at low dose, concave at high dose | — (similar to 1) |
| 12 | Fig 34 | Hormesis | What doesn't kill you makes you stronger | — |
| 13 | Fig 35 | Inverse Turkey | Confidence maximal right before collapse | **Turkey** ✓ |
| 14 | Fig 36 | Planners' mistake | Predicted costs vs actual (left tail surprise) | — |

Tony currently shows convex vs concave payoff (Fig 26–27 territory).

## Pudding animation patterns (from 10+ repos)

| Pattern | How it works | Pudding examples | Our use |
|---------|-------------|-----------------|---------|
| Scrolly + sticky figure | `Scrolly bind:value` + `position: sticky` | censorship, yard-sale, pop-love-songs | Stone ✓ |
| Progressive draw | `setInterval` draws SVG path frame-by-frame on `inView` | (our own) | Wind ✓, Turkey ✓ |
| Toggle/ButtonSet | Tap buttons to swap states, figure morphs | censorship, emotion-wheel | Hydra ✓ |
| Slider/Range | Drag to change parameter, figure reacts live | yard-sale, nba-uniforms | Tony ✓ |
| Simulation | `setInterval` runs model, bars update live + play/reset | yard-sale (YSM) | — |
| Side-by-side compare | Two charts/images flex side-by-side | censorship (Graphic.Compare) | Wind ✓ |
| Image keyframe scrolly | Scroll swaps positioned images with opacity/position transitions | yard-sale (scrolly) | — |
| Stacked bar | `ColumnStacked` via LayerCake | censorship | — |
| Line/Area chart | `Line.svelte` + axes via LayerCake context | yard-sale, nba-uniforms | manual d3 (LayerCake incompatible with runes) |
| Beeswarm/Force | `d3-force` simulation for dot plots | kids-book-animals, nba-uniforms | — |
| CSS keyframes | `@keyframes` for shake, bounce, spin | emotion-wheel, yard-sale | — |
| svelte/transition | `fade`, `fly` on mount/unmount | yard-sale, emotion-wheel | — |

Key Pudding structural rule: **short paragraphs (1–3 sentences) interleaved
with figures**. Prose → figure → prose → figure. Questions drive the reader.

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

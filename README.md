<p align="center">
  <img src="docs/logo.png" alt="lindy.design logo" width="200"/>
</p>

# lindy.design

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00)
![License](https://img.shields.io/badge/license-MIT-blue)
![D3](https://img.shields.io/badge/D3-v7-F9A03C)

Interactive visual essay on Nassim Taleb's *Antifragile*. Six parables, nine figures — convexity, barbell payoffs, fat-tailed distributions, and iatrogenics rendered as scrollytelling figures. Inspired by [The Pudding](https://pudding.cool).

<p align="center">
  <img src="docs/screenshot.png" alt="Visual essay preview" width="800"/>
</p>

## The question

> **What is the opposite of fragile?**

Most people say "robust." It isn't. The English language is missing
the word — Taleb had to coin it. This essay walks through the missing
word in six of his own parables.

## The six parables

| # | Parable | Concept | Pattern |
|---|---|---|---|
| I | How to Love the Wind | Fragile vs antifragile time series | Side-by-side progressive draw |
| II | Between Damocles and Hydra | The triad + fat-tailed distributions | Toggle + morphing curve |
| III | Stone and Pebbles | Nonlinear harm (concavity) | Scrollytelling |
| IV | Naive Intervention | Iatrogenics + via negativa | Static dual distribution |
| V | Fat Tony | Barbell strategy + convex payoff | Slider-driven curves |
| VI | The Turkey | Inverse turkey problem | Progressive draw + cliff |

## Editing prose

All essay text lives in [`src/data/copy.json`](src/data/copy.json). Edit that file and hot reload updates the browser — no need to touch Svelte components.

## Project docs

- [PROJECT.md](PROJECT.md) — scope, working order, non-goals

## Development

```bash
bun install
bun run dev
```

## Tech Stack

| Component       | Tools                                     |
| --------------- | ----------------------------------------- |
| Framework       | SvelteKit (Svelte 5)                      |
| Visualization   | D3.js v7                                  |
| UI              | bits-ui components                        |
| Styling         | Style Dictionary (design tokens)          |
| Build           | Vite                                      |
| Deploy          | Cloudflare (adapter-cloudflare/static)    |

## Architecture

Single-page scroll essay. All sections render on one route (`/`).

```
copy.json → Svelte context → 8 components → SVG figures (D3.js)
```

| Layer | What |
|---|---|
| Data | `src/data/copy.json` — all prose |
| Components | Hero, Wind, Hydra, Stone, Intervention, Tony, Turkey, Credits |
| Figures | Pure SVG + D3 (line, area, scaleLinear, curveBasis) |
| Interaction | Scrolly, Slider, ToggleGroup, inView, tweened |
| Math | `src/utils/gaussian.js` — skewed distributions |

## Credit

The concepts, parables, and figures are Nassim Nicholas Taleb's, from
*Antifragile: Things That Gain From Disorder* (Random House, 2012) and
*Statistical Consequences of Fat Tails* (STEM Academic Press, 2020).
The starter template is The Pudding's.

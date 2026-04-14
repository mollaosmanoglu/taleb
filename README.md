<p align="center">
  <img src="docs/logo.png" alt="lindy.design logo" width="200"/>
</p>

# lindy.design

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00)
![License](https://img.shields.io/badge/license-MIT-blue)
![D3](https://img.shields.io/badge/D3-v7-F9A03C)

Interactive visual essay on Nassim Taleb's *Antifragile*. Convexity, barbell payoffs, and fat-tailed distributions rendered as scrollytelling figures. Inspired by [The Pudding](https://pudding.cool).

<p align="center">
  <img src="docs/screenshot.png" alt="Visual essay preview" width="800"/>
</p>

## The question

> **What is the opposite of fragile?**

Most readers answer "robust." It isn't. The English language is missing
the word — Taleb had to coin it. This essay walks through the missing
word in five of his own parables.

## The five parables

Pudding's playbook (character first, principle second), applied to
Taleb's parables, anchored to figures from his own
[graphical tour of the book](https://www.fooledbyrandomness.com/graphicaltour.pdf).

| # | Parable | Taleb's figure | Pattern |
|---|---|---|---|
| 1 | How to Love the Wind | Fig 21 — robust vs antifragile time series | Stacked |
| 2 | Between Damocles and Hydra | Fig 22 — four payoff shapes | Stepping |
| 3 | Stone and Pebbles | Fig 28 — concavity at scale | Scrollytelling |
| 4 | Fat Tony | Fig 24 + 26 — barbell, asymmetric payoff | Scrollytelling |
| 5 | The Turkey | Fig 35 — inverse turkey problem | Stepping |

## Project docs

- [PROJECT.md](PROJECT.md) — scope, working order, non-goals
- [docs/pudding/](docs/pudding/) — local copies of The Pudding's three-part
  guide and their idea-to-essay chronology

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

```
[User Input]                    [System Boundary: lindy.design]              [Content]

┌──────────────┐                                                         ┌───────────────┐
│   Browser    │                                                         │ Taleb's       │
│ (Scrolling)  │                                                         │ Antifragile   │
│              │                                                         │ Figures       │
└──────┬───────┘                                                         │ (PDF data)    │
       │                                                                 └───────┬───────┘
       │ Scroll Events                                                           │
       │                                                                         │
       ▼                                                                         │
┌─────────────────────────────────────────────────────────────────────┐         │
│                      SvelteKit (Svelte 5)                            │         │
│                                                                      │         │
│  ┌──────────────────────────────────────────────────────────────┐   │         │
│  │                   Route Structure                            │   │         │
│  │                                                              │   │         │
│  │  /            → Landing page                                 │   │         │
│  │  /wind        → Parable 1 (Fig 21)                           │   │         │
│  │  /hydra       → Parable 2 (Fig 22)                           │   │         │
│  │  /stone       → Parable 3 (Fig 28)                           │   │         │
│  │  /tony        → Parable 4 (Fig 24 + 26)                      │   │         │
│  │  /turkey      → Parable 5 (Fig 35)                           │   │         │
│  └──────────────┬───────────────────────────────────────────────┘   │         │
│                 │                                                    │         │
│                 ▼                                                    │         │
│  ┌──────────────────────────────────────────────────────────────┐   │         │
│  │              Component Layer                                 │   │         │
│  │                                                              │   │         │
│  │  ┌─────────────────────────────────────────────────────┐     │   │         │
│  │  │        Scrollytelling Components                    │     │   │         │
│  │  │                                                     │     │   │         │
│  │  │  Hero.svelte        → Introduction                  │     │   │◀────────┘
│  │  │  Wind.svelte        → Time series (stacked)         │     │   │ D3 Data
│  │  │  Hydra.svelte       → Payoff shapes (stepping)      │     │   │
│  │  │  Stone.svelte       → Concavity (scrollytelling)    │     │   │
│  │  │  Tony.svelte        → Barbell (scrollytelling)      │     │   │
│  │  │  Turkey.svelte      → Inverse turkey (stepping)     │     │   │
│  │  └─────────────────────────────────────────────────────┘     │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐     │   │
│  │  │           D3.js Visualizations                      │     │   │
│  │  │                                                     │     │   │
│  │  │  • Line charts (robust vs antifragile)              │     │   │
│  │  │  • Payoff curves (convex/concave)                   │     │   │
│  │  │  • Barbell strategy diagrams                        │     │   │
│  │  │  • Fat-tailed distributions                         │     │   │
│  │  └─────────────────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Scroll Interaction (Svelte Runes)               │   │
│  │                                                              │   │
│  │  • Track scroll position                                     │   │
│  │  • Trigger D3 transitions                                    │   │
│  │  • Update narrative text                                     │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

Build: Vite • Deploy: Cloudflare (adapter-static) • Style: Style Dictionary
Inspiration: The Pudding's scrollytelling playbook
```

## Credit

The concepts, parables, and figures are Nassim Nicholas Taleb's, from
*Antifragile: Things That Gain From Disorder* (Random House, 2012).
The starter template is The Pudding's.

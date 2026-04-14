<script>
	// Section II — Between Damocles and Hydra
	// Pattern: stepping with morphing SVG distribution curve
	// Figure: graphical tour Fig 22 — four probability distribution shapes
	import ToggleGroup from "$components/ui/ToggleGroup.svelte";
	import inView from "$actions/inView.js";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import { line, area, scaleLinear, curveBasis } from "d3";
	import { generateCurve } from "$utils/gaussian.js";

	let visible = $state(false);
	let active = $state("damocles");

	const items = [
		{ value: "damocles", label: "Damocles" },
		{ value: "phoenix", label: "Phoenix" },
		{ value: "hydra", label: "Hydra" }
	];

	const stateConfig = {
		damocles: {
			label: "Fragile",
			description: "Fat left tail. Large losses lurk unseen.",
			color: "var(--color-fragile)",
			mu: 0.8, sigma: 0.9, alpha: -8
		},
		phoenix: {
			label: "Robust",
			description: "Symmetric. Small variations, no surprises.",
			color: "var(--color-robust)",
			mu: 0, sigma: 0.6, alpha: 0
		},
		hydra: {
			label: "Antifragile",
			description: "Fat right tail. Large gains possible.",
			color: "var(--color-antifragile)",
			mu: -0.8, sigma: 0.9, alpha: 8
		}
	};

	let current = $derived(stateConfig[active]);

	// SVG dimensions
	const w = 420;
	const h = 200;
	const m = { top: 16, right: 16, bottom: 32, left: 16 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;
	const nPoints = 80;

	const xScale = scaleLinear().domain([-4, 4]).range([m.left, m.left + plotW]);
	const yScale = scaleLinear().domain([0, 1.1]).range([m.top + plotH, m.top]);

	// Tweened y-values for smooth morphing
	const initialCurve = generateCurve(0, 0.6, 0, nPoints, [-4, 4]);
	const tweenedY = tweened(
		initialCurve.map((p) => p.y),
		{ duration: 400, easing: cubicOut }
	);

	// Update tweened data when toggle changes
	$effect(() => {
		const cfg = stateConfig[active];
		const newCurve = generateCurve(cfg.mu, cfg.sigma, cfg.alpha, nPoints, [-4, 4]);
		tweenedY.set(newCurve.map((p) => p.y));
	});

	// Build paths from tweened y-values
	let curvePoints = $derived(
		$tweenedY.map((y, i) => ({
			x: -4 + (i / nPoints) * 8,
			y
		}))
	);

	const lineFn = line().x((d) => xScale(d.x)).y((d) => yScale(d.y)).curve(curveBasis);
	const areaFn = area()
		.x((d) => xScale(d.x))
		.y0(m.top + plotH)
		.y1((d) => yScale(d.y))
		.curve(curveBasis);

	let curvePath = $derived(lineFn(curvePoints));
	let curveArea = $derived(areaFn(curvePoints));
</script>

<section id="hydra" class:visible use:inView onenter={() => (visible = true)}>
	<p class="number">II</p>
	<h2>Between Damocles and Hydra</h2>
	<p class="parable">
		Damocles dines under a sword suspended by a single horsehair.
		One gust and it drops.
	</p>
	<p class="body">
		The Phoenix burns to ash and is reborn, unchanged. The Hydra,
		when you cut off one head, grows back two. Three characters,
		three responses to the same force.
	</p>

	<!-- Figure 1: The Triad (Taleb's Table 1) -->
	<div class="triad">
		<div class="triad-col" style:border-color="var(--color-fragile)">
			<p class="triad-icon">🥂</p>
			<p class="triad-name" style:color="var(--color-fragile)">Fragile</p>
			<p class="triad-desc">Hates volatility. Harmed by shocks. Needs calm.</p>
		</div>
		<div class="triad-col" style:border-color="var(--color-robust)">
			<p class="triad-icon">🔥</p>
			<p class="triad-name" style:color="var(--color-robust)">Robust</p>
			<p class="triad-desc">Indifferent to volatility. Neither helped nor harmed.</p>
		</div>
		<div class="triad-col" style:border-color="var(--color-antifragile)">
			<p class="triad-icon">🐉</p>
			<p class="triad-name" style:color="var(--color-antifragile)">Antifragile</p>
			<p class="triad-desc">Loves volatility. Gains from disorder. Grows stronger.</p>
		</div>
	</div>

	<p class="body">
		English has words for the first two — but not the third. Gaining
		from disorder needed a new word.
	</p>
	<p class="body">
		Toggle between the three. Watch how the shape of possible
		outcomes changes.
	</p>

	<!-- Figure 2: Morphing distribution curve -->
	<div class="figure">
		<div class="toggle-row">
			<ToggleGroup {items} bind:value={active} required={true} />
		</div>

		<svg viewBox="0 0 {w} {h}" class="chart">
			<!-- x-axis -->
			<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1" />
			<!-- center line -->
			<line x1={xScale(0)} y1={m.top} x2={xScale(0)} y2={m.top + plotH}
				stroke="var(--color-gray-200)" stroke-width="1" stroke-dasharray="3 3" />
			<!-- axis labels -->
			<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
				fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)">
				Outcomes
			</text>
			<text x={m.left} y={h - 6}
				fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
				losses
			</text>
			<text x={m.left + plotW} y={h - 6} text-anchor="end"
				fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
				gains
			</text>

			<!-- filled area -->
			<path d={curveArea} fill={current.color} opacity="0.15" />
			<!-- curve line -->
			<path d={curvePath} fill="none" stroke={current.color} stroke-width="2.5" />

			<!-- tail annotation arrow -->
			{#if active === "damocles"}
				<g class="annotation" style="transition: opacity 0.4s ease;">
					<line x1={xScale(-2.5)} y1={m.top + 16} x2={xScale(-1.8)} y2={m.top + plotH - 20}
						stroke="var(--color-fragile)" stroke-width="1" stroke-dasharray="3 2" />
					<text x={xScale(-2.5)} y={m.top + 10} text-anchor="middle"
						fill="var(--color-fragile)" font-size="8" font-weight="700"
						font-family="var(--font-sans)">
						danger
					</text>
				</g>
			{:else if active === "hydra"}
				<g class="annotation" style="transition: opacity 0.4s ease;">
					<line x1={xScale(2.5)} y1={m.top + 16} x2={xScale(1.8)} y2={m.top + plotH - 20}
						stroke="var(--color-antifragile)" stroke-width="1" stroke-dasharray="3 2" />
					<text x={xScale(2.5)} y={m.top + 10} text-anchor="middle"
						fill="var(--color-antifragile)" font-size="8" font-weight="700"
						font-family="var(--font-sans)">
						opportunity
					</text>
				</g>
			{/if}
		</svg>

		<div class="state-info">
			<p class="state-label" style:color={current.color}>{current.label}</p>
			<p class="state-desc">{current.description}</p>
		</div>
	</div>

	<p class="message">
		Fragile, robust, antifragile. The third is the one that grows.
	</p>
</section>

<style>
	section {
		max-width: 680px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 96px 24px;
		border-top: 1px solid var(--color-gray-200);
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.number {
		font-family: var(--font-sans);
		font-size: var(--14px);
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		margin-bottom: 16px;
	}

	h2 {
		font-family: var(--font-sans);
		font-size: var(--48px);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 24px;
	}

	.parable {
		font-size: var(--20px);
		font-style: italic;
		line-height: 1.6;
		color: var(--color-gray-700);
		margin-bottom: 16px;
		max-width: 540px;
	}

	.body {
		font-size: var(--16px, 1rem);
		line-height: 1.7;
		color: var(--color-gray-600);
		margin-bottom: 32px;
		max-width: 540px;
	}

	.triad {
		display: flex;
		gap: 16px;
		margin-bottom: 32px;
		width: 100%;
		max-width: 540px;
	}

	.triad-col {
		flex: 1;
		border-top: 3px solid;
		padding: 16px 12px;
		text-align: center;
	}

	.triad-icon {
		font-size: var(--24px, 1.5rem);
		margin-bottom: 8px;
	}

	.triad-name {
		font-family: var(--font-sans);
		font-size: var(--14px);
		font-weight: 700;
		margin-bottom: 4px;
	}

	.triad-desc {
		font-size: var(--12px, 0.75rem);
		color: var(--color-gray-600);
		line-height: 1.5;
	}

	@media (max-width: 500px) {
		.triad {
			flex-direction: column;
		}
	}

	.figure {
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin-bottom: 48px;
		max-width: 540px;
	}

	.toggle-row {
		display: flex;
		justify-content: center;
	}

	.chart {
		width: 100%;
		max-width: 540px;
		height: auto;
	}

	.state-info {
		text-align: center;
	}

	.state-label {
		font-family: var(--font-sans);
		font-size: var(--20px);
		font-weight: 700;
		margin-bottom: 4px;
		transition: color 0.3s ease;
	}

	.state-desc {
		font-size: var(--14px);
		color: var(--color-gray-600);
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}

	@media (prefers-reduced-motion: reduce) {
		section {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>

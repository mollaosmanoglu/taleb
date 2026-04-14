<script>
	// Section III — Stone and Pebbles
	// Pattern: scrollytelling with sticky SVG concavity curve
	// Figure: graphical tour Fig 28 — harm vs size of stone
	import { getContext } from "svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { line, area, scaleLinear, curveBasis } from "d3";

	const copy = getContext("copy");
	const section = copy.sections[2];

	let value = $state(undefined);

	const w = 420;
	const h = 240;
	const m = { top: 16, right: 56, bottom: 36, left: 56 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;

	// Concavity function: harm = maxHarm * (1 - exp(-k * size))
	// Accelerating harm that flattens at maximum
	const maxHarm = 0.95;
	const k = 0.06;
	const nPoints = 100;
	const maxSize = 100;

	const curveData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const size = (i / nPoints) * maxSize;
		const harm = maxHarm * (1 - Math.exp(-k * size));
		const linear = (size / maxSize) * maxHarm * 0.4; // linear reference
		return { size, harm, linear };
	});

	const xScale = scaleLinear().domain([0, maxSize]).range([m.left, m.left + plotW]);
	const yScale = scaleLinear().domain([0, 1]).range([m.top + plotH, m.top]);

	const harmLine = line().x((d) => xScale(d.size)).y((d) => yScale(d.harm)).curve(curveBasis);
	const linearLine = line().x((d) => xScale(d.size)).y((d) => yScale(d.linear));
	const harmArea = area()
		.x((d) => xScale(d.size))
		.y0(m.top + plotH)
		.y1((d) => yScale(d.harm))
		.curve(curveBasis);

	const fullCurvePath = harmLine(curveData);
	const linearPath = linearLine(curveData);

	const steps = section.steps;

	let stepIndex = $derived(value ?? 0);
	let currentSize = $derived(steps[stepIndex]?.size ?? 5);
	let currentHarm = $derived(maxHarm * (1 - Math.exp(-k * currentSize)));
	let dotX = $derived(xScale(currentSize));
	let dotY = $derived(yScale(currentHarm));

	// Partial area fill up to the current dot
	let partialData = $derived(curveData.filter((d) => d.size <= currentSize));
	let partialArea = $derived(harmArea(partialData));
</script>

<section id="stone">
	<p class="number">{section.number}</p>
	<h2>{section.title}</h2>
	<p class="parable">{section.parable}</p>
	{#each section.body as text}
		<p class="body">{text}</p>
	{/each}

	<div class="scrolly-container">
		<div class="sticky-figure">
			<svg viewBox="0 0 {w} {h}" class="chart">
				<!-- axes -->
				<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
					stroke="var(--color-gray-300)" stroke-width="1" />
				<line x1={m.left} y1={m.top} x2={m.left} y2={m.top + plotH}
					stroke="var(--color-gray-300)" stroke-width="1" />

				<!-- axis labels -->
				<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
					fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)">
					Size of Stone
				</text>
				<text x={16} y={m.top + plotH / 2} text-anchor="middle"
					fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)"
					transform="rotate(-90, 16, {m.top + plotH / 2})">
					Harm
				</text>

				<!-- maximum harm label -->
				<text x={m.left + plotW + 2} y={yScale(maxHarm) + 4}
					fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
					max
				</text>
				<line x1={m.left} y1={yScale(maxHarm)} x2={m.left + plotW} y2={yScale(maxHarm)}
					stroke="var(--color-gray-200)" stroke-width="1" stroke-dasharray="3 3" />

				<!-- linear reference -->
				<path d={linearPath} fill="none"
					stroke="var(--color-gray-300)" stroke-width="1" stroke-dasharray="4 4" />
				<text x={xScale(85)} y={yScale(curveData[85].linear) - 6}
					fill="var(--color-gray-400)" font-size="8" font-style="italic"
					font-family="var(--font-sans)">
					if linear
				</text>

				<!-- shaded area up to dot -->
				<path d={partialArea} fill="var(--color-fragile)" opacity="0.12" />

				<!-- the concavity curve -->
				<path d={fullCurvePath} fill="none"
					stroke="var(--color-fg)" stroke-width="2.5" />

				<!-- moving dot -->
				<circle cx={dotX} cy={dotY} r="5"
					fill="var(--color-fragile)" stroke="var(--color-bg-warm, white)" stroke-width="2" />

				<!-- dot value labels -->
				<text x={dotX} y={dotY - 12} text-anchor="middle"
					fill="var(--color-fragile)" font-size="10" font-weight="700"
					font-family="var(--font-mono, monospace)">
					{(currentHarm * 100).toFixed(0)}%
				</text>
			</svg>
		</div>

		<div class="steps">
			<Scrolly bind:value>
				{#each steps as step, i}
					{@const active = value === i}
					<div class="step" class:active>
						<p>{step.text}</p>
					</div>
				{/each}
			</Scrolly>
		</div>
	</div>

	<p class="message">{section.message}</p>
</section>

<style>
	section {
		max-width: 680px;
		margin: 0 auto;
		padding: 96px 24px;
		border-top: 1px solid var(--color-gray-200);
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
		margin-bottom: 48px;
		max-width: 540px;
	}

	.scrolly-container {
		position: relative;
	}

	.sticky-figure {
		position: sticky;
		top: 10vh;
		z-index: 1;
		background: var(--color-bg-warm, white);
		padding: 16px 0;
	}

	.chart {
		width: 100%;
		max-width: 540px;
		height: auto;
	}

	.steps {
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.step {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.15;
		transition: opacity 0.3s ease;
	}

	.step.active {
		opacity: 1;
	}

	.step p {
		background: var(--color-bg-warm, white);
		padding: 12px 20px;
		font-size: var(--16px, 1rem);
		line-height: 1.6;
		max-width: 360px;
		text-align: center;
		pointer-events: all;
		color: var(--color-gray-800);
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
		margin-top: 48px;
	}

	@media (prefers-reduced-motion: reduce) {
		.step {
			transition: none;
		}
	}
</style>

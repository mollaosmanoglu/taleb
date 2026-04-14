<script>
	// Section V — The Turkey
	// Pattern: progressive SVG line draw with cliff drop
	// Figure: graphical tour Fig 35 — inverse turkey problem
	import { getContext } from "svelte";
	import inView from "$actions/inView.js";
	import { line, area, curveBasis, scaleLinear } from "d3";

	const copy = getContext("copy");
	const section = copy.sections[5];

	let visible = $state(false);
	let day = $state(0);
	let animating = $state(false);

	const totalDays = 50;
	const w = 460;
	const h = 220;
	const m = { top: 16, right: 48, bottom: 32, left: 48 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;

	// Pre-compute the full dataset once (deterministic noise via sin)
	const points = Array.from({ length: totalDays + 1 }, (_, i) => {
		const noise = Math.sin(i * 1.7) * 3 * (1 - i / totalDays);
		const confidence = (i / totalDays) * plotH * 0.85 - noise;
		return { i, x: m.left + (i / totalDays) * plotW, y: m.top + plotH - confidence };
	});

	const xScale = scaleLinear().domain([0, totalDays]).range([m.left, m.left + plotW]);
	const yScale = scaleLinear().domain([0, 1]).range([m.top + plotH, m.top]);

	const lineFn = line()
		.x((d) => d.x)
		.y((d) => d.y);

	const areaFn = area()
		.x((d) => d.x)
		.y0(m.top + plotH)
		.y1((d) => d.y);

	// Derived paths based on current day
	let visiblePoints = $derived(points.slice(0, Math.min(day + 1, totalDays + 1)));
	let linePath = $derived(lineFn(visiblePoints));
	let areaPath = $derived(areaFn(visiblePoints));
	let isCliff = $derived(day > totalDays);

	// Turkey icon position — follows the line, then falls off cliff
	let turkeyX = $derived(isCliff ? points[totalDays].x : (visiblePoints.length > 0 ? visiblePoints[visiblePoints.length - 1].x : points[0].x));
	let turkeyY = $derived(isCliff ? m.top + plotH - 4 : (visiblePoints.length > 0 ? visiblePoints[visiblePoints.length - 1].y - 12 : points[0].y - 12));

	// Cliff line (drops from last point to baseline)
	let cliffPath = $derived(() => {
		if (!isCliff || visiblePoints.length === 0) return "";
		const last = visiblePoints[visiblePoints.length - 1];
		return `M ${last.x} ${last.y} L ${last.x} ${m.top + plotH}`;
	});

	function animate() {
		if (animating) return;
		animating = true;
		day = 0;

		const interval = setInterval(() => {
			day++;
			if (day > totalDays + 1) {
				clearInterval(interval);
				animating = false;
			}
		}, 60);
	}
</script>

<section id="turkey">
	<p class="number">{section.number}</p>
	<h2>{section.title}</h2>
	<p class="parable">{section.parable}</p>
	{#each section.body as text}
		<p class="body">{text}</p>
	{/each}

	<div
		class="figure"
		class:visible
		use:inView
		onenter={() => { visible = true; animate(); }}
	>
		<svg viewBox="0 0 {w} {h}" class="chart">
			<!-- axes -->
			<line
				x1={m.left} y1={m.top + plotH}
				x2={m.left + plotW} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1"
			/>
			<line
				x1={m.left} y1={m.top}
				x2={m.left} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1"
			/>

			<!-- axis labels -->
			<text x={m.left + plotW / 2} y={h - 6}
				text-anchor="middle" fill="var(--color-gray-500)"
				font-size="10" font-family="var(--font-sans)">
				days
			</text>
			<text x={14} y={m.top + plotH / 2}
				text-anchor="middle" fill="var(--color-gray-500)"
				font-size="10" font-family="var(--font-sans)"
				transform="rotate(-90, 14, {m.top + plotH / 2})">
				confidence
			</text>

			<!-- shaded area under the confidence line -->
			{#if visiblePoints.length > 1}
				<path
					d={areaPath}
					fill="var(--color-gray-200)"
					opacity={isCliff ? 0.6 : 0.3}
					class="area"
				/>
			{/if}

			<!-- the confidence line -->
			{#if visiblePoints.length > 1}
				<path
					d={linePath}
					fill="none"
					stroke="var(--color-fg)"
					stroke-width="2.5"
					stroke-linejoin="round"
				/>
			{/if}

			<!-- turkey icon following the line -->
			{#if day > 0}
				<text x={turkeyX} y={turkeyY} text-anchor="middle"
					font-size="14" class="turkey-icon" class:fallen={isCliff}>
					🦃
				</text>
			{/if}

			<!-- the cliff drop -->
			{#if isCliff}
				<path
					d={cliffPath()}
					fill="none"
					stroke="var(--color-fragile)"
					stroke-width="2.5"
					stroke-dasharray="4 3"
				/>

				<!-- thanksgiving label -->
				<text x={points[totalDays].x - 8} y={m.top + plotH / 2}
					text-anchor="end" fill="var(--color-fragile)"
					font-size="9" font-weight="700" font-family="var(--font-sans)">
					Day 1001
				</text>

				<!-- "what the turkey saw" label -->
				<text x={m.left + plotW * 0.4} y={m.top + plotH - 16}
					text-anchor="middle" fill="var(--color-gray-500)"
					font-size="9" font-style="italic" font-family="var(--font-sans)">
					what the turkey saw
				</text>
			{/if}
		</svg>

		<button class="replay" onclick={animate} disabled={animating}>
			{animating ? "..." : "replay"}
		</button>
	</div>

	<p class="message">{section.message}</p>
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

	.figure {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 48px;
		max-width: 540px;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	.figure.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.chart {
		width: 100%;
		max-width: 540px;
		height: auto;
	}

	.area {
		transition: opacity 0.5s ease;
	}

	.turkey-icon {
		transition: transform 0.06s linear;
	}

	.turkey-icon.fallen {
		animation: fall 0.4s ease-in forwards;
	}

	@keyframes fall {
		0% { opacity: 1; }
		100% { opacity: 0.3; }
	}

	.replay {
		font-family: var(--font-mono, monospace);
		font-size: var(--12px, 0.75rem);
		color: var(--color-gray-500);
		background: none;
		border: 1px solid var(--color-gray-300);
		padding: 4px 16px;
		cursor: pointer;
	}

	.replay:hover:not(:disabled) {
		color: var(--color-fg);
		border-color: var(--color-fg);
	}

	.replay:disabled {
		cursor: default;
		opacity: 0.5;
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}

	@media (prefers-reduced-motion: reduce) {
		.figure {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>

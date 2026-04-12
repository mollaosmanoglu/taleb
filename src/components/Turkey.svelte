<script>
	// Section V — The Turkey
	// Pattern: stepping (tap through days, line climbs, then cliff)
	// Figure: graphical tour Fig 35 — inverse turkey problem
	import inView from "$actions/inView.js";

	let visible = $state(false);
	let day = $state(0);
	let animating = $state(false);

	// Build the confidence line — rises for 1000 days, crashes on 1001
	const totalDays = 50; // visual steps (not literal 1000)
	const width = 400;
	const height = 200;
	const margin = { top: 10, right: 10, bottom: 30, left: 40 };
	const plotW = width - margin.left - margin.right;
	const plotH = height - margin.top - margin.bottom;

	function buildPath(upTo) {
		let d = `M ${margin.left} ${margin.top + plotH}`;
		for (let i = 1; i <= Math.min(upTo, totalDays); i++) {
			const x = margin.left + (i / totalDays) * plotW;
			// Confidence rises with diminishing noise
			const noise = Math.sin(i * 1.7) * 3 * (1 - i / totalDays);
			const y = margin.top + plotH - (i / totalDays) * plotH * 0.85 + noise;
			d += ` L ${x} ${y}`;
		}
		// The cliff
		if (upTo > totalDays) {
			const lastX = margin.left + plotW;
			d += ` L ${lastX} ${margin.top + plotH}`;
		}
		return d;
	}

	let path = $derived(buildPath(day));
	let isCliff = $derived(day > totalDays);

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
	<p class="number">V</p>
	<h2>The Turkey</h2>
	<p class="parable">
		A turkey is fed every day for a thousand days. Every day confirms
		its belief that the farmer loves it. Day one thousand and one is
		Thanksgiving.
	</p>

	<div
		class="figure"
		class:visible
		use:inView
		onenter={() => { visible = true; animate(); }}
	>
		<svg viewBox="0 0 {width} {height}" class="chart">
			<!-- axes -->
			<line
				x1={margin.left} y1={margin.top + plotH}
				x2={margin.left + plotW} y2={margin.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1"
			/>
			<line
				x1={margin.left} y1={margin.top}
				x2={margin.left} y2={margin.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1"
			/>

			<!-- axis labels -->
			<text x={margin.left + plotW / 2} y={height - 4}
				text-anchor="middle" fill="var(--color-gray-500)"
				font-size="10" font-family="var(--font-sans)">
				days
			</text>
			<text x={12} y={margin.top + plotH / 2}
				text-anchor="middle" fill="var(--color-gray-500)"
				font-size="10" font-family="var(--font-sans)"
				transform="rotate(-90, 12, {margin.top + plotH / 2})">
				confidence
			</text>

			<!-- the line -->
			<path
				d={path}
				fill="none"
				stroke={isCliff ? "var(--color-fragile)" : "var(--color-fg)"}
				stroke-width="2.5"
				stroke-linejoin="round"
			/>

			<!-- thanksgiving marker -->
			{#if isCliff}
				<text x={margin.left + plotW - 4} y={margin.top + plotH - 8}
					text-anchor="end" fill="var(--color-fragile)"
					font-size="11" font-weight="700" font-family="var(--font-sans)">
					Thanksgiving
				</text>
			{/if}
		</svg>

		<button class="replay" onclick={animate} disabled={animating}>
			{animating ? "..." : "replay"}
		</button>
	</div>

	<p class="message">
		What you've never seen is exactly what's coming.
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
		margin-bottom: 48px;
		max-width: 540px;
	}

	.figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		margin-bottom: 48px;
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
		max-width: 500px;
		height: auto;
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

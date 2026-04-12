<script>
	// Section IV — Fat Tony
	// Pattern: slider-driven convexity payoff (concave vs convex)
	// Figure: convex = antifragile (limited downside, unlimited upside)
	//         concave = fragile (limited upside, unlimited downside)
	import Slider from "$components/ui/Slider.svelte";
	import inView from "$actions/inView.js";
	import { line, scaleLinear, curveBasis } from "d3";

	let visible = $state(false);
	let shock = $state(20);

	const w = 420;
	const h = 260;
	const m = { top: 20, right: 24, bottom: 36, left: 56 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;
	const nPoints = 80;

	const xScale = scaleLinear().domain([0, 100]).range([m.left, m.left + plotW]);
	const yScale = scaleLinear().domain([-120, 120]).range([m.top + plotH, m.top]);
	const zeroY = yScale(0);

	// Convex payoff: limited downside, accelerating upside
	// f(x) = x^1.6 * 0.02 (upside) capped at -floor (downside)
	function convexPayoff(x) {
		if (x <= 0) return 0;
		const upside = Math.pow(x, 1.6) * 0.02;
		const downside = Math.min(x * 0.3, 30);
		return upside - downside;
	}

	// Concave payoff: limited upside, accelerating downside
	function concavePayoff(x) {
		if (x <= 0) return 0;
		const upside = Math.sqrt(x) * 3;
		const downside = Math.pow(x, 1.5) * 0.015;
		return upside - downside;
	}

	const convexData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = (i / nPoints) * 100;
		return { x, y: convexPayoff(x) };
	});

	const concaveData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = (i / nPoints) * 100;
		return { x, y: concavePayoff(x) };
	});

	const lineFn = line().x((d) => xScale(d.x)).y((d) => yScale(d.y)).curve(curveBasis);

	const convexPath = lineFn(convexData);
	const concavePath = lineFn(concaveData);

	// Shock marker — shows payoff at current shock level
	let convexVal = $derived(convexPayoff(shock));
	let concaveVal = $derived(concavePayoff(shock));
	let shockX = $derived(xScale(shock));
	let convexY = $derived(yScale(convexVal));
	let concaveY = $derived(yScale(concaveVal));

	let shockLabel = $derived(
		shock < 20 ? "Small shock" : shock < 50 ? "Moderate shock" : shock < 80 ? "Large shock" : "Black Swan"
	);
</script>

<section id="tony" class:visible use:inView onenter={() => (visible = true)}>
	<p class="number">IV</p>
	<h2>Fat Tony</h2>
	<p class="parable">
		Fat Tony bet against the crowd during the run-up to the Iraq war.
		Limited downside, unlimited upside. Three hundred thousand became
		eighteen million.
	</p>

	<div class="figure">
		<svg viewBox="0 0 {w} {h}" class="chart">
			<!-- axes -->
			<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1" />
			<line x1={m.left} y1={m.top} x2={m.left} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1" />

			<!-- zero line -->
			<line x1={m.left} y1={zeroY} x2={m.left + plotW} y2={zeroY}
				stroke="var(--color-gray-300)" stroke-width="1" stroke-dasharray="4 3" />

			<!-- axis labels -->
			<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
				fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)">
				Size of shock
			</text>
			<text x={16} y={m.top + plotH / 2} text-anchor="middle"
				fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)"
				transform="rotate(-90, 16, {m.top + plotH / 2})">
				Payoff
			</text>
			<text x={m.left + plotW + 2} y={zeroY - 4}
				fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
				0
			</text>

			<!-- concave curve (fragile) -->
			<path d={concavePath} fill="none" stroke="var(--color-fragile)"
				stroke-width="2" opacity="0.8" />

			<!-- convex curve (antifragile) -->
			<path d={convexPath} fill="none" stroke="var(--color-antifragile)"
				stroke-width="2.5" />

			<!-- shock marker line -->
			<line x1={shockX} y1={m.top} x2={shockX} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1" stroke-dasharray="2 2" />

			<!-- dots at shock intersection -->
			<circle cx={shockX} cy={convexY} r="5"
				fill="var(--color-antifragile)" stroke="var(--color-bg-warm, white)" stroke-width="2" />
			<circle cx={shockX} cy={concaveY} r="5"
				fill="var(--color-fragile)" stroke="var(--color-bg-warm, white)" stroke-width="2" />

			<!-- payoff labels at dots -->
			<text x={shockX + 8} y={convexY + 4}
				fill="var(--color-antifragile)" font-size="10" font-weight="700"
				font-family="var(--font-mono, monospace)">
				+{convexVal.toFixed(0)}
			</text>
			<text x={shockX + 8} y={concaveY + 4}
				fill="var(--color-fragile)" font-size="10" font-weight="700"
				font-family="var(--font-mono, monospace)">
				{concaveVal.toFixed(0)}
			</text>

			<!-- curve labels -->
			<text x={xScale(75)} y={yScale(convexPayoff(75)) - 10}
				fill="var(--color-antifragile)" font-size="9" font-weight="700"
				font-family="var(--font-sans)">
				Convex (antifragile)
			</text>
			<text x={xScale(70)} y={yScale(concavePayoff(70)) + 16}
				fill="var(--color-fragile)" font-size="9" font-weight="700"
				font-family="var(--font-sans)">
				Concave (fragile)
			</text>
		</svg>

		<div class="control">
			<label>
				<span class="control-label">Shock</span>
				<Slider min={1} max={100} step={1} bind:value={shock} />
				<span class="control-value">{shockLabel}</span>
			</label>
		</div>

		<p class="insight">
			{#if shock < 20}
				Small shocks — both payoffs are similar. No visible difference.
			{:else if shock < 50}
				The curves diverge. The convex position gains more than it loses. The concave one loses more than it gains.
			{:else}
				Large shock — the convex payoff explodes upward while the concave one collapses. This is why Fat Tony bets on volatility.
			{/if}
		</p>
	</div>

	<p class="message">
		Don't predict. Position. Cap the downside, leave the upside open.
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
		margin-bottom: 48px;
		max-width: 540px;
	}

	.figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		margin-bottom: 48px;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		height: auto;
	}

	.control {
		width: 100%;
		max-width: 360px;
	}

	.control label {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.control-label {
		font-family: var(--font-sans);
		font-size: var(--14px);
		color: var(--color-gray-600);
		white-space: nowrap;
	}

	.control-value {
		font-family: var(--font-mono, monospace);
		font-size: var(--12px, 0.75rem);
		color: var(--color-gray-500);
		min-width: 10ch;
		text-align: right;
	}

	.insight {
		font-size: var(--14px);
		color: var(--color-gray-600);
		text-align: center;
		max-width: 400px;
		min-height: 2.5em;
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

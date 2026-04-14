<script>
	// Section IV — Fat Tony
	// Pattern: slider-driven convexity payoff (concave vs convex)
	// Figure: convex = antifragile (limited downside, unlimited upside)
	//         concave = fragile (limited upside, unlimited downside)
	import Slider from "$components/ui/Slider.svelte";
	import inView from "$actions/inView.js";
	import { line, area, scaleLinear, curveBasis } from "d3";

	let visible = $state(false);
	let shock = $state(20);

	const w = 420;
	const h = 260;
	const m = { top: 20, right: 56, bottom: 36, left: 56 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;
	const nPoints = 80;

	const xScale = scaleLinear().domain([0, 100]).range([m.left, m.left + plotW]);

	// Convex payoff (antifragile): small fixed cost, explosive upside
	function convexPayoff(x) {
		return Math.pow(x, 2.2) * 0.008 - 60;
	}

	// Concave payoff (fragile): small steady gain, catastrophic downside
	function concavePayoff(x) {
		return 60 - Math.pow(x, 2.2) * 0.008;
	}

	const convexData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = (i / nPoints) * 100;
		return { x, y: convexPayoff(x) };
	});

	const concaveData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = (i / nPoints) * 100;
		return { x, y: concavePayoff(x) };
	});

	// Compute y-domain from actual data with padding
	const allY = [...convexData.map((d) => d.y), ...concaveData.map((d) => d.y)];
	const yMin = Math.min(...allY) * 1.3;
	const yMax = Math.max(...allY) * 1.15;
	const yScale = scaleLinear().domain([yMin, yMax]).range([m.top + plotH, m.top]);
	const zeroY = yScale(0);

	const lineFn = line().x((d) => xScale(d.x)).y((d) => yScale(d.y)).curve(curveBasis);

	const convexPath = lineFn(convexData);
	const concavePath = lineFn(concaveData);

	// Shaded areas: green above zero (gains), red below zero (losses)
	const areaAbove = area()
		.x((d) => xScale(d.x))
		.y0(zeroY)
		.y1((d) => yScale(Math.max(d.y, 0)))
		.curve(curveBasis);
	const areaBelow = area()
		.x((d) => xScale(d.x))
		.y0(zeroY)
		.y1((d) => yScale(Math.min(d.y, 0)))
		.curve(curveBasis);

	const convexGainArea = areaAbove(convexData);
	const convexLossArea = areaBelow(convexData);
	const concaveGainArea = areaAbove(concaveData);
	const concaveLossArea = areaBelow(concaveData);

	// Shock marker — shows payoff at current shock level
	let convexVal = $derived(convexPayoff(shock));
	let concaveVal = $derived(concavePayoff(shock));
	let shockX = $derived(xScale(shock));
	let convexY = $derived(yScale(convexVal));
	let concaveY = $derived(yScale(concaveVal));

	let shockLabel = $derived(
		shock < 20 ? "Small shock" : shock < 50 ? "Moderate shock" : shock < 80 ? "Large shock" : "Black Swan"
	);

	// Barbell figure (Fig 24) — time series with floor + unlimited upside
	const bbW = 420;
	const bbH = 180;
	const bbM = { top: 16, right: 40, bottom: 28, left: 16 };
	const bbPlotW = bbW - bbM.left - bbM.right;
	const bbPlotH = bbH - bbM.top - bbM.bottom;
	const bbFrames = 60;

	function buildBarbell(seed) {
		let y = 0;
		const floor = -10;
		const pts = [{ i: 0, y: 0 }];
		for (let i = 1; i <= bbFrames; i++) {
			const noise = Math.sin(i * seed) * 2 + Math.cos(i * seed * 1.3) * 1.5;
			y += noise;
			// Floor: losses are capped
			if (y < floor) y = floor;
			// Occasional upside spike
			if (i === 38) y += 25;
			if (i === 52) y += 40;
			pts.push({ i, y });
		}
		return pts;
	}

	const bbData = buildBarbell(2.1);
	const bbAllY = bbData.map((d) => d.y);
	const bbYMin = Math.min(...bbAllY, -15);
	const bbYMax = Math.max(...bbAllY) * 1.1;
	const bbXScale = scaleLinear().domain([0, bbFrames]).range([bbM.left, bbM.left + bbPlotW]);
	const bbYScale = scaleLinear().domain([bbYMin, bbYMax]).range([bbM.top + bbPlotH, bbM.top]);
	const bbFloorY = bbYScale(-10);
	const bbLineFn = line().x((d) => bbXScale(d.i)).y((d) => bbYScale(d.y));
	const bbPath = bbLineFn(bbData);
</script>

<section id="tony" class:visible use:inView onenter={() => (visible = true)}>
	<p class="number">V</p>
	<h2>Fat Tony</h2>
	<p class="parable">
		Fat Tony is Taleb's recurring character — a trader from Brooklyn
		who makes his living from other people's blindness. He doesn't
		predict the future. He positions himself so that prediction becomes
		unnecessary.
	</p>

	<p class="body">
		During the run-up to the Iraq war, Tony noticed that the market
		priced oil as if nothing would happen. He bought options —
		contracts that would pay off enormously if prices spiked, and cost
		very little if they didn't.
	</p>

	<!-- Figure 1: The Barbell (Fig 24) -->
	<div class="figure">
		<p class="figure-label">The barbell: floor your losses, keep the upside open</p>
		<svg viewBox="0 0 {bbW} {bbH}" class="chart">
			<line x1={bbM.left} y1={bbM.top + bbPlotH} x2={bbM.left + bbPlotW} y2={bbM.top + bbPlotH}
				stroke="var(--color-gray-300)" stroke-width="1" />
			<!-- floor line -->
			<line x1={bbM.left} y1={bbFloorY} x2={bbM.left + bbPlotW} y2={bbFloorY}
				stroke="var(--color-fragile)" stroke-width="1" stroke-dasharray="4 3" />
			<text x={bbM.left + bbPlotW - 4} y={bbFloorY - 6} text-anchor="end"
				fill="var(--color-fragile)" font-size="8" font-family="var(--font-sans)">
				Floor
			</text>
			<!-- the line -->
			<path d={bbPath} fill="none" stroke="var(--color-antifragile)"
				stroke-width="2.5" stroke-linejoin="round" />
			<!-- unlimited upside label -->
			<text x={bbXScale(52)} y={bbYScale(bbData[52].y) - 10} text-anchor="middle"
				fill="var(--color-antifragile)" font-size="8" font-weight="700"
				font-family="var(--font-sans)">
				Upside
			</text>
			<!-- axis labels -->
			<text x={bbM.left + bbPlotW / 2} y={bbH - 6} text-anchor="middle"
				fill="var(--color-gray-400)" font-size="9" font-family="var(--font-sans)">
				time
			</text>
		</svg>
	</div>

	<p class="body">
		Three hundred thousand dollars became eighteen million. The key
		was not foresight. It was asymmetry: limited downside, unlimited
		upside. A convex payoff.
	</p>

	<p class="body">
		Drag the slider to see how convex and concave positions diverge
		as shocks grow.
	</p>

	<!-- Figure 2: Convexity payoff (Fig 26-27) -->
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

			<!-- shaded areas: green for gains, red for losses -->
			<path d={convexGainArea} fill="var(--color-antifragile)" opacity="0.12" />
			<path d={convexLossArea} fill="var(--color-fragile)" opacity="0.08" />
			<path d={concaveGainArea} fill="var(--color-antifragile)" opacity="0.08" />
			<path d={concaveLossArea} fill="var(--color-fragile)" opacity="0.12" />

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
				{convexVal >= 0 ? "+" : ""}{convexVal.toFixed(0)}
			</text>
			<text x={shockX + 8} y={concaveY + 4}
				fill="var(--color-fragile)" font-size="10" font-weight="700"
				font-family="var(--font-mono, monospace)">
				{concaveVal >= 0 ? "+" : ""}{concaveVal.toFixed(0)}
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

	.figure-label {
		font-family: var(--font-sans);
		font-size: var(--12px, 0.75rem);
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		margin-bottom: 48px;
		max-width: 540px;
	}

	.chart {
		width: 100%;
		max-width: 540px;
		height: auto;
	}

	.control {
		width: 100%;
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

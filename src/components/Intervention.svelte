<script>
	// Section IV — Naive Intervention
	// Pattern: toggle between "intervene" and "do nothing"
	// Figure: Fig 31 — iatrogenics probability distribution
	import inView from "$actions/inView.js";
	import { line, area, scaleLinear, curveBasis } from "d3";

	let visible = $state(false);

	const w = 420;
	const h = 200;
	const m = { top: 16, right: 56, bottom: 32, left: 56 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;
	const nPoints = 100;

	const xScale = scaleLinear().domain([-5, 4]).range([m.left, m.left + plotW]);
	const yScale = scaleLinear().domain([0, 1.1]).range([m.top + plotH, m.top]);

	// Benefits curve: tall narrow peak (high probability of small gains)
	const benefitData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = -5 + (i / nPoints) * 9;
		const y = Math.exp(-3 * Math.pow(x - 1.5, 2));
		return { x, y };
	});

	// Iatrogenics curve: long flat tail (low probability, catastrophic harm)
	const iatroData = Array.from({ length: nPoints + 1 }, (_, i) => {
		const x = -5 + (i / nPoints) * 9;
		// Exponential-like rise from left, peaks near the benefit zone
		const y = x < 2 ? 0.7 * Math.exp(-0.08 * Math.pow(x - 2, 2)) * (1 / (1 + Math.exp(-1.5 * (x + 4)))) : 0.7 * Math.exp(-3 * Math.pow(x - 2, 2));
		return { x, y };
	});

	const lineFn = line()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y))
		.curve(curveBasis);
	const areaFn = area()
		.x((d) => xScale(d.x))
		.y0(m.top + plotH)
		.y1((d) => yScale(d.y))
		.curve(curveBasis);

	const benefitPath = lineFn(benefitData);
	const benefitArea = areaFn(benefitData);
	const iatroPath = lineFn(iatroData);
	const iatroArea = areaFn(iatroData);

	// Via negativa list
	const subtractions = [
		{ add: "More medicine", sub: "Remove the harmful" },
		{ add: "More regulation", sub: "Remove rent-seekers" },
		{ add: "More advice", sub: "Remove fragilities" },
		{ add: "More complexity", sub: "Remove layers" }
	];
</script>

<section id="intervention" class:visible use:inView onenter={() => (visible = true)}>
	<p class="number">IV</p>
	<h2>Naive Intervention</h2>
	<p class="parable">
		A doctor treats a mild headache. The headache goes away. A year
		later the patient returns with liver failure.
	</p>
	<p class="body">
		The Greeks had a word for this: iatrogenics — harm caused by the
		healer. The concept applies everywhere. Governments intervene in
		economies. Managers intervene in teams. The urge to "do something"
		is often the most dangerous thing of all.
	</p>

	<!-- Figure 1: Iatrogenics (Fig 31) — two overlapping distributions -->
	<div class="figure">
		<svg viewBox="0 0 {w} {h}" class="chart">
			<!-- x-axis -->
			<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
				stroke="var(--color-gray-300)" stroke-width="1" />

			<!-- axis labels -->
			<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
				fill="var(--color-gray-500)" font-size="10" font-family="var(--font-sans)">
				Outcomes
			</text>
			<text x={m.left} y={h - 6}
				fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
				harm
			</text>
			<text x={m.left + plotW} y={h - 6} text-anchor="end"
				fill="var(--color-gray-400)" font-size="8" font-family="var(--font-sans)">
				benefit
			</text>

			<!-- iatrogenics area (orange/red — wide, flat, long left tail) -->
			<path d={iatroArea} fill="var(--color-fragile)" opacity="0.15" />
			<path d={iatroPath} fill="none" stroke="var(--color-fragile)" stroke-width="2" />

			<!-- benefits area (blue — tall, narrow peak) -->
			<path d={benefitArea} fill="var(--color-antifragile)" opacity="0.15" />
			<path d={benefitPath} fill="none" stroke="var(--color-antifragile)" stroke-width="2.5" />

			<!-- labels -->
			<text x={xScale(-2)} y={m.top + plotH * 0.45} text-anchor="middle"
				fill="var(--color-fragile)" font-size="9" font-weight="700"
				font-family="var(--font-sans)">
				Iatrogenics
			</text>
			<text x={xScale(1.5)} y={yScale(1) - 6} text-anchor="middle"
				fill="var(--color-antifragile)" font-size="9" font-weight="700"
				font-family="var(--font-sans)">
				Benefits
			</text>

			<!-- arrow: "you see this" on the right side, pointing left to peak -->
			<g class="annotation">
				<text x={xScale(3.2)} y={m.top + plotH * 0.6} text-anchor="start"
					fill="var(--color-gray-500)" font-size="7" font-style="italic"
					font-family="var(--font-sans)">
					you see this
				</text>
				<line x1={xScale(3.1)} y1={m.top + plotH * 0.58} x2={xScale(2.2)} y2={m.top + plotH * 0.5}
					stroke="var(--color-gray-400)" stroke-width="0.8" />
			</g>

			<!-- arrow: "you don't see this" on far left, pointing right to tail -->
			<g class="annotation">
				<text x={xScale(-4.8)} y={m.top + plotH * 0.6} text-anchor="start"
					fill="var(--color-gray-500)" font-size="7" font-style="italic"
					font-family="var(--font-sans)">
					you don't
				</text>
				<text x={xScale(-4.8)} y={m.top + plotH * 0.6 + 10} text-anchor="start"
					fill="var(--color-gray-500)" font-size="7" font-style="italic"
					font-family="var(--font-sans)">
					see this
				</text>
				<line x1={xScale(-3.6)} y1={m.top + plotH * 0.58} x2={xScale(-3)} y2={m.top + plotH * 0.65}
					stroke="var(--color-gray-400)" stroke-width="0.8" />
			</g>
		</svg>

		<p class="figure-caption">
			The benefit is visible and certain. The harm is hidden and
			catastrophic. The orange area exceeds the blue.
		</p>
	</div>

	<p class="body">
		The cure has a name: via negativa. Don't ask what to add. Ask
		what to remove.
	</p>

	<!-- Figure 2: Via Negativa — subtraction table -->
	<div class="negativa">
		<div class="negativa-col">
			<p class="negativa-header" style:color="var(--color-fragile)">Additive (fragile)</p>
			{#each subtractions as row}
				<p class="negativa-item">{row.add}</p>
			{/each}
		</div>
		<div class="negativa-col">
			<p class="negativa-header" style:color="var(--color-antifragile)">Subtractive (robust)</p>
			{#each subtractions as row}
				<p class="negativa-item">{row.sub}</p>
			{/each}
		</div>
	</div>

	<p class="message">
		The first decision is not what to do. It's what to stop doing.
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

	.figure-caption {
		font-size: var(--14px);
		color: var(--color-gray-600);
		text-align: center;
		max-width: 400px;
	}

	.negativa {
		display: flex;
		gap: 24px;
		margin: 0 auto 48px;
		max-width: 540px;
		width: 100%;
	}

	.negativa-col {
		flex: 1;
	}

	.negativa-header {
		font-family: var(--font-sans);
		font-size: var(--12px, 0.75rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 12px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--color-gray-200);
	}

	.negativa-item {
		font-size: var(--14px);
		color: var(--color-gray-600);
		line-height: 1.5;
		padding: 6px 0;
	}

	@media (max-width: 500px) {
		.negativa {
			flex-direction: column;
		}
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

<script>
	// Section I — How to Love the Wind
	// Pattern: two side-by-side SVG time series, progressive draw
	// Figure: graphical tour Fig 20 + 21 — fragile blowup vs antifragile spike
	import inView from "$actions/inView.js";
	import { line, scaleLinear } from "d3";

	let visible = $state(false);
	let frame = $state(0);
	let animating = $state(false);

	const totalFrames = 50;
	const shockAt = 40; // 80% through
	const w = 220;
	const h = 160;
	const m = { top: 12, right: 40, bottom: 28, left: 12 };
	const plotW = w - m.left - m.right;
	const plotH = h - m.top - m.bottom;

	// Pre-compute random walks (deterministic via sin-based noise)
	function buildWalk(seed, shockDir) {
		let y = 0;
		const pts = [{ i: 0, y: 0 }];
		for (let i = 1; i <= totalFrames; i++) {
			if (i <= shockAt) {
				// Small random variations
				const noise = Math.sin(i * seed) * 0.4 + Math.cos(i * seed * 0.7) * 0.3;
				y += noise + 0.15; // slight upward drift
				pts.push({ i, y });
			} else if (i === shockAt + 1) {
				// The shock
				y += shockDir * (Math.abs(y) + 8);
				pts.push({ i, y });
			} else {
				// After shock — stay near shock level
				y += Math.sin(i * seed) * 0.2;
				pts.push({ i, y });
			}
		}
		return pts;
	}

	const fragileData = buildWalk(1.7, -3);
	const antifragileData = buildWalk(2.3, 2.5);

	// Scales
	const allY = [...fragileData.map((d) => d.y), ...antifragileData.map((d) => d.y)];
	const yMin = Math.min(...allY);
	const yMax = Math.max(...allY);
	const xScale = scaleLinear().domain([0, totalFrames]).range([m.left, m.left + plotW]);
	const yScaleFragile = scaleLinear().domain([yMin, yMax]).range([m.top + plotH, m.top]);
	const yScaleAnti = scaleLinear().domain([yMin, yMax]).range([m.top + plotH, m.top]);

	const lineFragile = line().x((d) => xScale(d.i)).y((d) => yScaleFragile(d.y));
	const lineAnti = line().x((d) => xScale(d.i)).y((d) => yScaleAnti(d.y));

	let fragilePath = $derived(lineFragile(fragileData.slice(0, frame + 1)));
	let antiPath = $derived(lineAnti(antifragileData.slice(0, frame + 1)));
	let pastShock = $derived(frame > shockAt);

	// Zero line y-position
	let zeroY = $derived(yScaleFragile(0));

	function animate() {
		if (animating) return;
		animating = true;
		frame = 0;

		const interval = setInterval(() => {
			frame++;
			if (frame >= totalFrames) {
				clearInterval(interval);
				animating = false;
			}
		}, 60);
	}
</script>

<section id="wind">
	<p class="number">I</p>
	<h2>How to Love the Wind</h2>
	<p class="parable">
		Wind extinguishes a candle and energizes fire. Likewise with
		randomness, uncertainty, chaos: you want to use them, not hide
		from them. You want to be the fire and wish for the wind.
	</p>
	<p class="body">
		Same shock, opposite responses. The candle is fragile — it needs
		calm and predictability. The fire is antifragile — it feeds on the
		very thing that kills the candle. The two lines below show the same
		random walk hit by the same shock. One collapses. The other
		thrives.
	</p>

	<div
		class="figure"
		class:visible
		use:inView
		onenter={() => { visible = true; animate(); }}
	>
		<div class="charts">
			<!-- Fragile time series -->
			<div class="chart-wrapper">
				<p class="chart-label" style:color="var(--color-fragile)">Fragile</p>
				<svg viewBox="0 0 {w} {h}">
					<!-- axes -->
					<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
						stroke="var(--color-gray-300)" stroke-width="1" />
					<!-- zero reference -->
					<line x1={m.left} y1={zeroY} x2={m.left + plotW} y2={zeroY}
						stroke="var(--color-gray-200)" stroke-width="1" stroke-dasharray="3 3" />
					<!-- axis labels -->
					<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
						fill="var(--color-gray-400)" font-size="9" font-family="var(--font-sans)">
						time
					</text>
					<!-- the line -->
					{#if frame > 0}
						<path d={fragilePath} fill="none"
							stroke={pastShock ? "var(--color-fragile)" : "var(--color-fg)"}
							stroke-width="2" stroke-linejoin="round" />
					{/if}
					<!-- blowup label -->
					{#if pastShock}
						<text x={xScale(shockAt + 3)} y={yScaleFragile(fragileData[shockAt + 1].y) + 14}
							fill="var(--color-fragile)" font-size="8" font-weight="700"
							font-family="var(--font-sans)">
							Blowup
						</text>
					{/if}
				</svg>
			</div>

			<!-- Antifragile time series -->
			<div class="chart-wrapper">
				<p class="chart-label" style:color="var(--color-antifragile)">Antifragile</p>
				<svg viewBox="0 0 {w} {h}">
					<!-- axes -->
					<line x1={m.left} y1={m.top + plotH} x2={m.left + plotW} y2={m.top + plotH}
						stroke="var(--color-gray-300)" stroke-width="1" />
					<!-- zero reference -->
					<line x1={m.left} y1={zeroY} x2={m.left + plotW} y2={zeroY}
						stroke="var(--color-gray-200)" stroke-width="1" stroke-dasharray="3 3" />
					<!-- axis labels -->
					<text x={m.left + plotW / 2} y={h - 6} text-anchor="middle"
						fill="var(--color-gray-400)" font-size="9" font-family="var(--font-sans)">
						time
					</text>
					<!-- the line -->
					{#if frame > 0}
						<path d={antiPath} fill="none"
							stroke={pastShock ? "var(--color-antifragile)" : "var(--color-fg)"}
							stroke-width="2" stroke-linejoin="round" />
					{/if}
					<!-- spike label -->
					{#if pastShock}
						<text x={xScale(shockAt + 3)} y={yScaleAnti(antifragileData[shockAt + 1].y) - 6}
							fill="var(--color-antifragile)" font-size="8" font-weight="700"
							font-family="var(--font-sans)">
							Gains
						</text>
					{/if}
				</svg>
			</div>
		</div>

		<button class="replay" onclick={animate} disabled={animating}>
			{animating ? "..." : "replay"}
		</button>
	</div>

	<p class="message">
		There is a third category, and you've never named it.
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

	.charts {
		display: flex;
		gap: 24px;
		width: 100%;
	}

	.chart-wrapper {
		flex: 1;
		min-width: 0;
	}

	.chart-wrapper svg {
		width: 100%;
		height: auto;
		display: block;
	}

	.chart-label {
		font-family: var(--font-sans);
		font-size: var(--14px);
		font-weight: 700;
		text-align: center;
		margin-bottom: 4px;
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

	@media (max-width: 500px) {
		.charts {
			flex-direction: column;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.figure {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>

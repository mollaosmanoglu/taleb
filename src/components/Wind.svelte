<script>
	// Section I — How to Love the Wind
	// Pattern: stacked (candle vs fire, CSS animated)
	// Figure: graphical tour Fig 21 — robust vs antifragile time series
	import inView from "$actions/inView.js";

	let visible = $state(false);
</script>

<section id="wind">
	<p class="number">I</p>
	<h2>How to Love the Wind</h2>
	<p class="parable">
		Wind extinguishes a candle and energizes fire.
	</p>

	<div
		class="figure"
		class:visible
		use:inView
		onenter={() => (visible = true)}
	>
		<div class="scene">
			<div class="scene-label">Candle</div>
			<div class="object candle">
				<div class="flame candle-flame"></div>
				<div class="body candle-body"></div>
			</div>
			<div class="wind-label">wind →</div>
			<div class="outcome fragile-outcome">extinguished</div>
		</div>

		<div class="scene">
			<div class="scene-label">Fire</div>
			<div class="object fire">
				<div class="flame fire-flame"></div>
				<div class="body fire-body"></div>
			</div>
			<div class="wind-label">wind →</div>
			<div class="outcome antifragile-outcome">energized</div>
		</div>
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
		margin-bottom: 48px;
		max-width: 540px;
	}

	.figure {
		display: flex;
		gap: 48px;
		justify-content: center;
		margin-bottom: 48px;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	.figure.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.scene {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		min-width: 160px;
	}

	.scene-label {
		font-family: var(--font-sans);
		font-size: var(--14px);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-gray-500);
	}

	.object {
		position: relative;
		height: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	.flame {
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
		transition: all 1.5s ease;
	}

	.candle-flame {
		width: 12px;
		height: 24px;
		background: #f6ad55;
		animation: flicker 0.3s ease-in-out infinite alternate;
	}

	.visible .candle-flame {
		width: 4px;
		height: 4px;
		opacity: 0;
		animation: none;
		transition-delay: 0.5s;
	}

	.candle-body {
		width: 16px;
		height: 48px;
		background: var(--color-gray-300);
	}

	.fire-flame {
		width: 32px;
		height: 48px;
		background: #e53e3e;
		box-shadow: 0 0 12px #e53e3e44;
		animation: flicker 0.2s ease-in-out infinite alternate;
	}

	.visible .fire-flame {
		width: 56px;
		height: 80px;
		background: #dd6b20;
		box-shadow: 0 0 32px #dd6b2066, 0 0 64px #e53e3e33;
		transition-delay: 0.5s;
	}

	.fire-body {
		width: 40px;
		height: 12px;
		background: var(--color-gray-600);
	}

	.wind-label {
		font-family: var(--font-mono, monospace);
		font-size: var(--12px, 0.75rem);
		color: var(--color-gray-400);
		opacity: 0;
		transition: opacity 0.5s ease 0.3s;
	}

	.visible .wind-label {
		opacity: 1;
	}

	.outcome {
		font-family: var(--font-sans);
		font-size: var(--14px);
		font-weight: 700;
		opacity: 0;
		transition: opacity 0.5s ease 1.5s;
	}

	.visible .outcome {
		opacity: 1;
	}

	.fragile-outcome {
		color: var(--color-fragile);
	}

	.antifragile-outcome {
		color: var(--color-antifragile);
	}

	@keyframes flicker {
		from { transform: scaleX(1) scaleY(1); }
		to { transform: scaleX(0.9) scaleY(1.05); }
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}

	@media (prefers-reduced-motion: reduce) {
		.flame {
			animation: none !important;
		}
		.figure, .wind-label, .outcome {
			transition: none !important;
		}
		.figure {
			opacity: 1;
			transform: none;
		}
	}
</style>

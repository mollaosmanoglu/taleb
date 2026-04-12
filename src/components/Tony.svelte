<script>
	// Section IV — Fat Tony
	// Pattern: scrollytelling with slider input
	// Figure: graphical tour Fig 24 + 26 — barbell, asymmetric payoff
	import Slider from "$components/ui/Slider.svelte";

	let volatility = $state(10);

	let downside = $derived(Math.min(volatility * 0.3, 30));
	let upside = $derived(volatility * volatility * 0.06);
	let ratio = $derived(upside > 0 ? (upside / Math.max(downside, 1)).toFixed(1) : "0");
</script>

<section id="tony">
	<p class="number">IV</p>
	<h2>Fat Tony</h2>
	<p class="parable">
		Fat Tony bet against the crowd during the run-up to the Iraq war.
		Limited downside, unlimited upside. Three hundred thousand became
		eighteen million.
	</p>

	<div class="figure">
		<div class="control">
			<label>
				<span class="control-label">Volatility</span>
				<Slider min={0} max={100} step={1} bind:value={volatility} />
				<span class="control-value">{volatility}</span>
			</label>
		</div>

		<div class="payoff">
			<div class="payoff-side">
				<div class="payoff-bar downside" style:height="{downside * 3}px"></div>
				<p class="payoff-label">Downside</p>
				<p class="payoff-value">-{downside.toFixed(0)}</p>
			</div>
			<div class="payoff-side">
				<div class="payoff-bar upside" style:height="{Math.min(upside * 3, 300)}px"></div>
				<p class="payoff-label">Upside</p>
				<p class="payoff-value">+{upside.toFixed(0)}</p>
			</div>
		</div>

		<p class="ratio">Payoff ratio: <strong>{ratio}x</strong></p>
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
		gap: 32px;
		margin-bottom: 48px;
	}

	.control {
		width: 100%;
		max-width: 400px;
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
		font-size: var(--14px);
		color: var(--color-gray-600);
		min-width: 3ch;
		text-align: right;
	}

	.payoff {
		display: flex;
		gap: 64px;
		align-items: flex-end;
		min-height: 320px;
		padding-top: 20px;
	}

	.payoff-side {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.payoff-bar {
		width: 64px;
		transition: height 0.3s ease;
	}

	.payoff-bar.downside {
		background: var(--color-fragile);
	}

	.payoff-bar.upside {
		background: var(--color-antifragile);
	}

	.payoff-label {
		font-family: var(--font-sans);
		font-size: var(--14px);
		color: var(--color-gray-600);
	}

	.payoff-value {
		font-family: var(--font-mono, monospace);
		font-size: var(--14px);
	}

	.ratio {
		font-family: var(--font-mono, monospace);
		font-size: var(--16px, 1rem);
		color: var(--color-gray-800);
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}
</style>

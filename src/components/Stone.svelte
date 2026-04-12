<script>
	// Section III — Stone and Pebbles
	// Pattern: scrollytelling (scroll the stone size, watch harm curve)
	// Figure: graphical tour Fig 28 — concavity at scale
	import Scrolly from "$components/helpers/Scrolly.svelte";

	let value = $state(undefined);

	const steps = [
		{ stone: 1, harm: 1, text: "One small pebble. Barely a scratch." },
		{ stone: 5, harm: 8, text: "A fistful of stones. The bruise is worse than five scratches." },
		{ stone: 10, harm: 30, text: "A heavy rock. The damage isn't 10x — it's 30x." },
		{ stone: 20, harm: 120, text: "A boulder. Harm isn't proportional. It accelerates." },
		{ stone: 50, harm: 500, text: "One massive stone. This is what kills. Concavity is the trap." }
	];

	let current = $derived(steps[value] ?? steps[0]);
	let progress = $derived((current.harm / 500) * 100);
</script>

<section id="stone">
	<p class="number">III</p>
	<h2>Stone and Pebbles</h2>
	<p class="parable">
		A king hit with one large stone is not the same as a king pelted
		with a thousand pebbles. The harm is not proportional — it
		accelerates.
	</p>

	<div class="scrolly-container">
		<div class="sticky-figure">
			<div class="bar-container">
				<div class="bar-label">Stone size: {current.stone}</div>
				<div class="bar-track">
					<div class="bar-fill" style:width="{progress}%"></div>
				</div>
				<div class="bar-label">Harm: {current.harm}x</div>
			</div>
			<p class="step-text">{current.text}</p>
		</div>

		<div class="steps">
			<Scrolly bind:value>
				{#each steps as step, i}
					{@const active = value === i}
					<div class="step" class:active>
						<p>Stone size: <strong>{step.stone}</strong> → Harm: <strong>{step.harm}x</strong></p>
					</div>
				{/each}
			</Scrolly>
		</div>
	</div>

	<p class="message">
		Size matters more than frequency. Concavity is the trap.
	</p>
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
		margin-bottom: 48px;
		max-width: 540px;
	}

	.scrolly-container {
		position: relative;
	}

	.sticky-figure {
		position: sticky;
		top: 15vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 32px;
		background: var(--color-bg, #fff);
		z-index: 1;
		margin-bottom: -50vh;
	}

	.bar-container {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.bar-label {
		font-family: var(--font-mono, monospace);
		font-size: var(--14px);
		color: var(--color-gray-600);
	}

	.bar-track {
		width: 100%;
		height: 24px;
		background: var(--color-gray-200);
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		background: var(--color-fg, #1a1a1a);
		transition: width 0.5s ease;
	}

	.step-text {
		font-size: var(--16px, 1rem);
		color: var(--color-gray-800);
		text-align: center;
		max-width: 400px;
		min-height: 3em;
	}

	.steps {
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.step {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.2;
		transition: opacity 0.3s ease;
	}

	.step.active {
		opacity: 1;
	}

	.step p {
		background: var(--color-bg, #fff);
		padding: 12px 20px;
		font-size: var(--16px, 1rem);
		pointer-events: all;
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
		margin-top: 48px;
	}
</style>

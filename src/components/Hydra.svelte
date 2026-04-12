<script>
	// Section II — Between Damocles and Hydra
	// Pattern: stepping (tap through three states)
	// Figure: graphical tour Fig 22 — four payoff shapes
	import ToggleGroup from "$components/ui/ToggleGroup.svelte";
	import inView from "$actions/inView.js";

	let visible = $state(false);

	let active = $state("damocles");

	const items = [
		{ value: "damocles", label: "Damocles" },
		{ value: "phoenix", label: "Phoenix" },
		{ value: "hydra", label: "Hydra" }
	];

	const states = {
		damocles: {
			label: "Fragile",
			description: "A sword hangs by a single hair above his head. One small shock and it's over.",
			color: "var(--color-fragile)"
		},
		phoenix: {
			label: "Robust",
			description: "It burns and returns unchanged. Shocks don't help, but they don't hurt either.",
			color: "var(--color-robust)"
		},
		hydra: {
			label: "Antifragile",
			description: "Cut one head, two grow back. It needs the damage to become stronger.",
			color: "var(--color-antifragile)"
		}
	};

	let current = $derived(states[active]);
</script>

<section id="hydra" class:visible use:inView onenter={() => (visible = true)}>
	<p class="number">II</p>
	<h2>Between Damocles and Hydra</h2>
	<p class="parable">
		Damocles dines with a sword dangling over his head. The Phoenix
		burns and returns unchanged. The Hydra grows two heads where one
		is cut.
	</p>

	<div class="figure">
		<div class="toggle-row">
			<ToggleGroup {items} bind:value={active} required={true} />
		</div>
		<div class="state-display" style:border-color={current.color}>
			<p class="state-label" style:color={current.color}>{current.label}</p>
			<p class="state-desc">{current.description}</p>
		</div>
	</div>

	<p class="message">
		Fragile, robust, antifragile. The third is the one that grows.
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

	@media (prefers-reduced-motion: reduce) {
		section {
			transition: none;
			opacity: 1;
			transform: none;
		}
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
		min-height: 320px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		margin-bottom: 48px;
	}

	.toggle-row {
		display: flex;
		justify-content: center;
	}

	.state-display {
		border: 2px solid;
		padding: 32px;
		text-align: center;
		width: 100%;
		max-width: 400px;
		transition: border-color 0.3s ease;
	}

	.state-label {
		font-family: var(--font-sans);
		font-size: var(--24px, 1.5rem);
		font-weight: 700;
		margin-bottom: 12px;
		transition: color 0.3s ease;
	}

	.state-desc {
		font-size: var(--16px, 1rem);
		line-height: 1.6;
		color: var(--color-gray-700);
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}
</style>

<script>
	// Section III — Stone and Pebbles
	// Pattern: scrollytelling (scroll the stone size, watch harm curve)
	// Figure: graphical tour Fig 28 — concavity at scale
</script>

<section id="stone">
	<p class="number">III</p>
	<h2>Stone and Pebbles</h2>
	<p class="parable">
		A king hit with one large stone is not the same as a king pelted
		with a thousand pebbles. The harm is not proportional — it
		accelerates.
	</p>
	<div class="figure">Figure 28 — concavity at scale</div>
	<p class="message">
		Size matters more than frequency. Concavity is the trap.
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
		align-items: center;
		justify-content: center;
		min-height: 320px;
		border: 1px dashed var(--color-gray-400);
		font-family: var(--font-mono, monospace);
		font-size: var(--14px);
		color: var(--color-gray-600);
		margin-bottom: 48px;
	}

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}
</style>

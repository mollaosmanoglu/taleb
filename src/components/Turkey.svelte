<script>
	// Section V — The Turkey
	// Pattern: stepping (tap through the days, then the cliff)
	// Figure: graphical tour Fig 35 — inverse turkey problem
</script>

<section id="turkey">
	<p class="number">V</p>
	<h2>The Turkey</h2>
	<p class="parable">
		A turkey is fed every day for a thousand days. Every day confirms
		its belief that the farmer loves it. Day one thousand and one is
		Thanksgiving.
	</p>
	<div class="figure">Figure 35 — inverse turkey problem</div>
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

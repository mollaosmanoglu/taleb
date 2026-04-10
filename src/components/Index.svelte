<script>
	// Skeleton only — no figures yet. See PROJECT.md.
</script>

<article>
	<header class="hero">
		<p class="kicker">A visual essay on Nassim Taleb's <em>Antifragile</em></p>
		<h1>What is the opposite of fragile?</h1>
		<p class="dek">
			Most people answer "robust." It isn't. English is missing the
			word — Taleb had to coin it. Five parables, five figures.
		</p>
	</header>

	<section id="wind">
		<p class="section-number">I</p>
		<h2>How to Love the Wind</h2>
		<p class="message">
			There is a third category, and you've never named it.
		</p>
		<div class="figure-placeholder">Figure 21 — robust vs antifragile</div>
	</section>

	<section id="hydra">
		<p class="section-number">II</p>
		<h2>Between Damocles and Hydra</h2>
		<p class="message">
			Fragile, robust, antifragile. The third is the one that grows.
		</p>
		<div class="figure-placeholder">Figure 22 — four payoff shapes</div>
	</section>

	<section id="stone">
		<p class="section-number">III</p>
		<h2>Stone and Pebbles</h2>
		<p class="message">
			Size matters more than frequency. Concavity is the trap.
		</p>
		<div class="figure-placeholder">Figure 28 — concavity at scale</div>
	</section>

	<section id="tony">
		<p class="section-number">IV</p>
		<h2>Fat Tony</h2>
		<p class="message">
			Don't predict. Position. Cap the downside, leave the upside open.
		</p>
		<div class="figure-placeholder">Figure 24 + 26 — barbell, asymmetric payoff</div>
	</section>

	<section id="turkey">
		<p class="section-number">V</p>
		<h2>The Turkey</h2>
		<p class="message">
			What you've never seen is exactly what's coming.
		</p>
		<div class="figure-placeholder">Figure 35 — inverse turkey problem</div>
	</section>

	<footer>
		<p>
			Concepts, parables, and figures by Nassim Nicholas Taleb,
			<em>Antifragile: Things That Gain From Disorder</em> (Random House, 2012).
		</p>
	</footer>
</article>

<style>
	article {
		max-width: 680px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.hero {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 96px 0;
	}

	.kicker {
		font-family: var(--font-sans);
		font-size: var(--14px);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-gray-600);
		margin-bottom: 24px;
	}

	h1 {
		font-family: var(--font-sans);
		font-size: var(--64px);
		font-weight: 700;
		line-height: 1.05;
		margin-bottom: 32px;
	}

	.dek {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		max-width: 540px;
	}

	section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 96px 0;
		border-top: 1px solid var(--color-gray-200);
	}

	.section-number {
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

	.message {
		font-size: var(--20px);
		line-height: 1.6;
		color: var(--color-gray-800);
		margin-bottom: 48px;
		max-width: 540px;
	}

	.figure-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 320px;
		border: 1px dashed var(--color-gray-400);
		font-family: var(--font-mono, monospace);
		font-size: var(--14px);
		color: var(--color-gray-600);
	}

	footer {
		padding: 96px 0 64px;
		border-top: 1px solid var(--color-gray-200);
		font-size: var(--14px);
		color: var(--color-gray-600);
		line-height: 1.6;
	}
</style>

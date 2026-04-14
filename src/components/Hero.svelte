<script>
	// Hero — the question that opens the essay
	import inView from "$actions/inView.js";

	let visible = $state(false);
</script>

<header class="hero" class:visible use:inView onenter={() => (visible = true)}>
	<p class="kicker">A visual essay on Nassim Taleb's <em>Antifragile</em></p>
	<h1>What is the opposite of fragile?</h1>
	<p class="dek">
		Most people answer "robust." It isn't.
	</p>
	<p class="intro">
		English doesn't have the word. Taleb had to coin it. The thing
		he named is behind everything that has changed with time:
		evolution, culture, ideas, political systems, your own career.
	</p>
	<p class="intro">
		Some things benefit from shocks. Not just resist them — actually
		get better. Six parables, nine figures. Scroll.
	</p>
</header>

<style>
	.hero {
		max-width: 680px;
		margin: 0 auto;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 96px 24px;
		opacity: 0;
		transform: translateY(32px);
		transition: opacity 1s ease, transform 1s ease;
	}

	.hero.visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero {
			transition: none;
			opacity: 1;
			transform: none;
		}
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
		margin-bottom: 24px;
	}

	.intro {
		font-size: var(--16px, 1rem);
		line-height: 1.7;
		color: var(--color-gray-600);
		max-width: 540px;
	}
</style>

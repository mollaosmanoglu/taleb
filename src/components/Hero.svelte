<script>
	// Hero — the question that opens the essay
	import { getContext } from "svelte";
	import inView from "$actions/inView.js";

	const copy = getContext("copy");
	let visible = $state(false);
</script>

<a
	href="https://github.com/mollaosmanoglu/taleb"
	target="_blank"
	rel="noopener noreferrer"
	class="github-link"
>
	<svg viewBox="0 0 24 24" fill="currentColor" class="github-icon">
		<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
	</svg>
	<span>mollaosmanoglu/taleb</span>
</a>

<header class="hero" class:visible use:inView onenter={() => (visible = true)}>
	<p class="kicker">{@html copy.hero.kicker}</p>
	<h1>{copy.hero.title}</h1>
	<p class="dek">{copy.hero.dek}</p>
	{#each copy.hero.intro as text}
		<p class="intro">{text}</p>
	{/each}

	<!-- Three triad icons -->
	<svg viewBox="0 0 600 200" class="hero-bg" aria-hidden="true">
		<!-- Impact lines (shared) -->
		{#each [0, 1, 2] as col}
			{@const cx = 100 + col * 200}
			<line x1={cx + 20} y1={92} x2={cx + 40} y2={88} stroke="var(--color-gray-400)" stroke-width="1.5" opacity="0.4" />
			<line x1={cx + 20} y1={100} x2={cx + 44} y2={100} stroke="var(--color-gray-400)" stroke-width="1.5" opacity="0.4" />
			<line x1={cx + 20} y1={108} x2={cx + 40} y2={112} stroke="var(--color-gray-400)" stroke-width="1.5" opacity="0.4" />
			<!-- ball -->
			<circle cx={cx + 16} cy={100} r="6" fill="var(--color-fragile)" opacity="0.6" />
		{/each}

		<!-- Fragile: broken bar, split apart -->
		<g transform="translate(100, 100)">
			<line x1="-4" y1="-50" x2="-16" y2="-10" stroke="var(--color-gray-500)" stroke-width="10" stroke-linecap="round" opacity="0.5" />
			<line x1="-4" y1="50" x2="-16" y2="10" stroke="var(--color-gray-500)" stroke-width="10" stroke-linecap="round" opacity="0.5" />
		</g>

		<!-- Robust: solid bar, unmoved -->
		<g transform="translate(300, 100)">
			<line x1="0" y1="-50" x2="0" y2="50" stroke="var(--color-gray-500)" stroke-width="10" stroke-linecap="round" opacity="0.5" />
		</g>

		<!-- Antifragile: wavy bar, absorbing and growing -->
		<g transform="translate(500, 100)">
			<path d="M0 -50 Q15 -30 0 -15 Q-15 0 0 15 Q15 30 0 50"
				fill="none" stroke="var(--color-antifragile)" stroke-width="10" stroke-linecap="round" opacity="0.5" />
		</g>

		<!-- Labels -->
		<text x="100" y="170" text-anchor="middle" fill="var(--color-gray-400)" font-size="11" font-family="var(--font-sans)" letter-spacing="0.1em" opacity="0.5">FRAGILE</text>
		<text x="300" y="170" text-anchor="middle" fill="var(--color-gray-400)" font-size="11" font-family="var(--font-sans)" letter-spacing="0.1em" opacity="0.5">ROBUST</text>
		<text x="500" y="170" text-anchor="middle" fill="var(--color-antifragile)" font-size="11" font-family="var(--font-sans)" letter-spacing="0.1em" opacity="0.4">ANTIFRAGILE</text>
	</svg>
</header>

<style>
	.github-link {
		position: fixed;
		top: 16px;
		right: 16px;
		z-index: var(--z-top, 10);
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--color-gray-500);
		text-decoration: none;
		font-family: var(--font-sans);
		font-size: 12px;
		padding: 4px 8px;
		transition: color 0.2s ease;
	}

	.github-link:hover {
		color: var(--color-gray-800);
	}

	.github-icon {
		width: 16px;
		height: 16px;
	}

	.hero-bg {
		width: 100%;
		max-width: 540px;
		height: auto;
		margin-top: 48px;
	}

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

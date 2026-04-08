<script>
	import { getContext } from "svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<section class="intro">
	<h1>What is Antifragility?</h1>
	<p>
		Some things break under stress. A coffee mug hits the floor and shatters.
		A rigid system faces a shock and collapses. We call these things fragile.
		The opposite of fragile isn't robust — robust just means something survives
		stress unchanged. There's a third category, one that Nassim Nicholas Taleb
		argues we didn't even have a word for until he coined it: antifragile.
	</p>
	<p>
		Antifragile systems actually benefit from disorder. Your immune system gets
		stronger after exposure to pathogens. Muscles grow because you tear them
		apart lifting heavy things. Startups thrive in volatile markets that kill
		corporations. Evolution itself is antifragile — random mutations and
		selection pressure produce organisms better adapted to their environment.
	</p>
	<p>
		The key insight is asymmetry. An antifragile system has more upside than
		downside from random events. Small losses, big gains. A concave payoff
		means you're fragile — you lose more than you gain from volatility. A
		convex payoff means you're antifragile — volatility is your friend.
	</p>
	<p>
		Think about it through the lens of probability. Most people try to predict
		the future and position themselves for the most likely outcome. Taleb's
		argument is the opposite: you don't need to predict anything. Just arrange
		your life so that you benefit from surprises. The barbell strategy — 90%
		extremely safe, 10% extremely risky — beats "medium risk" every time in a
		world with fat tails.
	</p>
	<p>
		This matters because we live in Extremistan, not Mediocristan. In
		Mediocristan, outcomes cluster around the average — human height, daily
		calorie intake. In Extremistan, a single observation can dominate
		everything — wealth, book sales, pandemic deaths. Most of the interesting
		things in life follow Extremistan dynamics, yet we keep using Mediocristan
		tools to navigate them.
	</p>
</section>

<style>
	.intro {
		max-width: 680px;
		margin: 0 auto;
		padding: 64px 16px;
	}

	h1 {
		font-family: var(--font-sans);
		font-size: var(--48px);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 32px;
	}

	p {
		font-size: var(--20px);
		line-height: 1.7;
		margin-bottom: 24px;
		color: var(--color-gray-800);
	}
</style>

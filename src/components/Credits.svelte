<script>
	// Credits footer
	import { getContext } from "svelte";
	const copy = getContext("copy");
</script>

<footer>
	{#each copy.credits as line}
		<p>{@html line}</p>
	{/each}
</footer>

<style>
	footer {
		max-width: 680px;
		margin: 0 auto;
		padding: 96px 24px 64px;
		border-top: 1px solid var(--color-gray-200);
		color: var(--color-gray-500);
		line-height: 1.6;
	}

	footer p {
		font-size: 12px;
	}
</style>

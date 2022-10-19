<script lang="ts">
	import Hash from './Hash.svelte';

	export let type: string;
	export let contractHash: string;
</script>

<div class="contract-text">
	<div class="type">
		{type}
	</div>
	{#if contractHash}
		<div class="detail">
			{#if type === 'delegate' || type === 'undelegate'}
				with <a href="/contracts/{contractHash}" class="auction">Auction</a> System Contract
			{:else}
				with <a href="/contracts/{contractHash}" class="auction"
					><Hash hash={contractHash} color="green" /></a
				>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.contract-text {
		@apply text-[clamp(14px,1.07vw,1.07vw)];
	}

	.type {
		@apply text-color-hover-footer-link capitalize;
	}

	.detail {
		@apply text-color-grey-footer-label;
	}

	.auction {
		@apply text-color-hover-footer-link;
	}
</style>

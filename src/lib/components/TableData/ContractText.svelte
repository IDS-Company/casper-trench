<script lang="ts">
	export let type: string;
</script>

<div class="contract-text">
	<div class="type">
		{type}
	</div>
	{#if type === 'delegate' || type === 'undelegate'}
		<div class="detail">
			with <span class="auction">Auction</span> System Contract
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

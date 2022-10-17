<script lang="ts">
	import PaginatorChevron from '$lib/icons/PaginatorChevron.svelte';
	import { createEventDispatcher } from 'svelte';
	import ShowRow from './ShowRow.svelte';
	import { getLatestBlocks } from '$utils/chain/blocks';
	import { getLatestChainState } from '$utils/api';
	const dispatch = createEventDispatcher();
	let page = 1;

	export let itemsPerPage = 10;
	export let latestBlock = 0;
	export let isRangeBlock = false;
	export let startIndex = 0;
	export let showTotalRows = true;
	export let items: {}[] = [];
	export let pagedItems: {}[] = [];
	export let apiPaginator = false;
	export let showRow = true;
	const pageItems = () => {
		pagedItems =
			items &&
			items.length > 0 &&
			items.filter((item, index) => {
				if (index >= startIndex && index < startIndex + itemsPerPage) {
					return item;
				}
			});
	};
	$: items && itemsPerPage && pageItems();
	$: totalPages = items && pageItems && Math.ceil(items.length / itemsPerPage);
</script>

<div class="paginator">
	{#if showTotalRows}
		<div class="total">{items && items.length} total rows</div>
	{:else if showRow}
		<ShowRow bind:itemsPerPage />
	{/if}
	<div class="paginator-buttons">
		{#if showTotalRows}
			{#if showRow}
				<ShowRow bind:itemsPerPage />
			{/if}
		{/if}
		<div class="actual-paginator">
			<button
				type="button"
				on:click={async () => {
					if (isRangeBlock) {
						const chainState = await getLatestChainState();
						startIndex = chainState && chainState.last_added_block_info?.height;
					} else {
						startIndex = 0;
					}
					page = 1;
					apiPaginator ? dispatch('load-page') : pageItems();
				}}
				class="button">First</button
			>
			<button
				type="button"
				on:click={() => {
					if (page > 1) {
						page--;
						isRangeBlock ? (startIndex += itemsPerPage) : (startIndex -= itemsPerPage);
						apiPaginator ? dispatch('load-page') : pageItems();
					}
				}}
				class="button"
			>
				<div class="icon">
					<PaginatorChevron />
				</div>
			</button>
			<div class="text">
				Page {page}
				{#if !apiPaginator}
					of {totalPages ? totalPages.toLocaleString() : "1"}
				{/if}
				{#if isRangeBlock}
					of {parseFloat((latestBlock / itemsPerPage).toFixed()).toLocaleString()}
				{/if}
			</div>
			<button
				type="button"
				on:click={() => {
					if (apiPaginator && items && items.length > 0) {
						page++;
						// startIndex += itemsPerPage;
						isRangeBlock ? (startIndex -= itemsPerPage) : (startIndex += itemsPerPage);
						dispatch('load-page');
					} else {
						if (page < totalPages) {
							page++;
							startIndex += itemsPerPage;
							pageItems();
						}
					}
				}}
				class="button"
			>
				<div class="icon right">
					<PaginatorChevron />
				</div>
			</button>
			<button
				type="button"
				on:click={() => {
					if (apiPaginator) return;
					page = totalPages;
					startIndex = (totalPages - 1) * itemsPerPage;
					pageItems();
				}}
				class="button">Last</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	.paginator {
		@apply flex justify-between flex-col max-w-max md:flex-row gap-3 md:gap-0;
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.paginator-buttons {
		@apply flex flex-col md:flex-row gap-[clamp(4px,1.19vw,1.19vw)];
	}

	.actual-paginator {
		@apply flex gap-[clamp(4px,0.71vw,0.71vw)] items-center;
	}

	.text {
		@apply mx-[clamp(8px,0.6vw,0.6vw)];
		@apply min-w-max max-w-max whitespace-nowrap;
		@apply text-center;
		@apply flex-grow;
	}

	.right {
		@apply transform rotate-180;
	}

	.icon {
		@apply h-[clamp(10px,0.95vw,0.95vw)];
	}

	.button {
		@apply px-[clamp(6px,0.83vw,0.83vw)] py-[clamp(6px,0.6vw,0.6vw)] h-full max-w-max;
		@apply leading-none;
		@apply border-[clamp(1px,0.12vw,0.12vw)] rounded-[clamp(4px,0.3vw,0.3vw)] border-color-paginator-border;
		@apply cursor-pointer;
	}
</style>

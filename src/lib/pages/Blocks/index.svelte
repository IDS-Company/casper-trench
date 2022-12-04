<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import { isLoading } from '$stores/loading';
	// import { getLatestBlocks, getRangeBlocks, getValidator } from '$utils/api';
	import { getBlocks, getLatestBlocks } from '$utils/api';
	import { getValidatorDetails, millisToFormat, timeAgo } from '$utils/converters';
	import { blockHistory } from '$utils/history';
	import { tableSort } from '$utils/sort';
	import type { Block } from '$utils/types/block';
	import { onMount } from 'svelte';
	let blocks: Block[];
	let latestBlock = 0;
	let blocksPerPage = 10;
	let startIndex = 0;
	onMount(async () => {
		$isLoading = true;
		const latestBlocks: Block[] = await getLatestBlocks(1);
		startIndex = latestBlocks && latestBlocks[0].blockHeight;
		latestBlock = startIndex;
		$isLoading = false;
	});

	let sortingOptions = {
		index: 0,
		order: null
	};

	const fetchBlocks = async () => {
		$isLoading = true;
		blocks = await getBlocks(startIndex, blocksPerPage);
		$isLoading = false;
	};
	$: if (blocksPerPage && startIndex) {
		setTimeout(async () => {
			await fetchBlocks();
		}, 1);
	}
	const sortBlocks = (direction: 'asc' | 'desc', field: string, i: number) => {
		blocks = tableSort(direction, blocks, field);
		sortingOptions = {
			index: i,
			order: direction
		};
	};
	blockHistory.set('/blocks');
</script>

<div class="delegators-tab">
	<div class="title">Blocks</div>
	<table>
		<tr>
			<th class="blocky">
				<div class="sorter">
					<div class="text">Block Height</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBlocks(e.detail?.direction, 'blockHeight', 0)}
					/>
				</div>
			</th>
			<th>
				<div class="sorter">
					<div class="text">Era</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBlocks(e.detail?.direction, 'eraID', 1)}
					/>
				</div>
			</th>
			<th class="center">
				<div class="sorter">
					<div class="text">Transaction</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBlocks(e.detail?.direction, 'deploys', 2)}
					/>
				</div>
			</th>
			<th class="center">
				<div class="sorter">
					<div class="text">Age</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBlocks(e.detail?.direction, 'timestamp', 3)}
					/>
				</div>
			</th>
			<th class="right">Block Hash</th>
			<th class="right">Validators</th>
		</tr>
		<div class="divider table-header-border" />
		{#if blocks && blocks.length > 0}
			{#each blocks as block, i}
				<tr>
					<td class="blocky black">
						{block.blockHeight.toLocaleString()}
					</td>
					<td class="era">
						{block.eraID}
					</td>
					<td class="center black">
						{block.deploys}
					</td>
					<td class="center age">
						{`${timeAgo(millisToFormat(Date.now() - Date.parse(block.timestamp.toString())))} ago`}
					</td>
					<td class="flex justify-end">
						<div class="wrapper">
							<a href="/blocks/{block.blockHash}">
								<Hash hash={block.blockHash} />
							</a>
						</div>
					</td>
					<td>
						<div class="flex justify-end">
							<Validator variant="left" hash={block?.validatorPublicKey} />
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		isRangeBlock
		showTotalRows
		bind:itemsPerPage={blocksPerPage}
		apiPaginator
		bind:items={blocks}
		bind:startIndex
		bind:latestBlock
		on:load-page={async () => await fetchBlocks()}
	/>
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.title {
		@apply text-[clamp(18px,1.43vw,1.43vw)] font-bold text-color-table-header;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(24px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left min-w-max;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(24px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.blocky {
		@apply px-0 pr-[clamp(24px,1vw,1vw)];
	}

	.wrapper {
		@apply flex justify-center;
	}

	.center {
		@apply text-center;
	}

	.right {
		@apply text-right;
	}

	.age {
		@apply text-color-grey-footer-label whitespace-nowrap;
	}

	.black {
		@apply text-color-black-text;
	}

	.era {
		@apply text-color-grey-footer-label;
	}

	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)] min-w-max;
	}

	.center > .sorter {
		@apply justify-center;
	}
</style>

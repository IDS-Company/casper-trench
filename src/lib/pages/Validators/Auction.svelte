<script lang="ts">
	import CircleProgressBar from '$lib/components/TableData/CircleProgressBar.svelte';
	import Status from '$lib/components/TableData/Status.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import { tableSort } from '$utils/sort';
	import { bidValidators, currentPage, showSwitch } from '$stores/validatorsSwitch';
	import { onMount } from 'svelte';
	import { getBids } from '$utils/api';
	import type { Bid } from '$utils/types/validator';
	import { isLoading } from '$stores/loading';

	let displayedBidValidators: Bid[] = [];

	currentPage.set(1);

	let sortingOptions = {
		index: 0,
		order: null
	};

	onMount(async () => {
		$isLoading = true;
		$bidValidators = await getBids();
		$isLoading = false;
	});

	const sortBids = (direction: 'asc' | 'desc', field: string, i: number) => {
		$bidValidators = tableSort(direction, $bidValidators, field);
		sortingOptions = {
			index: i,
			order: direction
		};
	};
</script>

{#if displayedBidValidators && displayedBidValidators.length > 0}
	<table>
		<tr>
			<th class="rank">Rank</th>
			<th> <div class="validators">Validators</div></th>
			<th><div class="status">Status</div></th>
			<th class="fee">
				<div class="header-wrapper">
					<div class="text">Fee</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBids(e.detail?.direction, 'delegationRate', 0)}
					/>
				</div>
			</th>
			<th>
				<div class="header-wrapper">
					<div class="text">Delegators</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBids(e.detail?.direction, 'numOfDelegators', 1)}
					/>
				</div>
			</th>
			<th class="stake">
				<div class="header-wrapper justify-center">
					<div class="text">Total Stake</div>
					<Tooltip text="Total Stake tooltip" />
					<TableSorter
						ascendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBids(e.detail?.direction, 'totalBid', 2)}
					/>
				</div>
			</th>
			<th class="self">Self %</th>
			<th>
				<div class="header-wrapper justify-center network-perc">
					<div class="text">% Of Network</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortBids(e.detail?.direction, 'networkPercentage', 3)}
					/>
				</div></th
			>
			<th>
				<div class="justify-center performance">
					<div class="text">Performance</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 4 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 4 && sortingOptions.order === 'desc'}
						left
						on:sort={(e) => sortBids(e.detail?.direction, 'performance', 4)}
					/>
				</div>
			</th>
		</tr>
		<div class="divider table-header-border" />
		{#each displayedBidValidators as bid, i}
			<tr>
				<td class="rank-val">{bid.rank}</td>
				<td
					><div class="validators">
						<Validator
							imgUrl={bid.information?.icon}
							hash={bid.publicKey}
							name={bid.information?.name}
						/>
					</div></td
				>
				<td
					><div class="status">
						<Status inactive={bid.inactive && bid.inactive} />
					</div></td
				>
				<td class="grey">{bid.delegationRate && bid.delegationRate.toFixed(2)}%</td>
				<td>{bid.numOfDelegators && bid.numOfDelegators.toLocaleString('en')}</td>
				<td class="stake">{bid.totalBid && bid.totalBid.toLocaleString('en')} CSPR</td>
				<td class="grey self">{bid.selfStakePercentage && bid.selfStakePercentage.toFixed(2)}%</td>
				<td class="grey network-perc"
					>{bid.networkPercentage && bid.networkPercentage.toFixed(2)}%</td
				>
				<td class="performance"
					><CircleProgressBar progress={(bid.performance && bid.performance) || 0} /></td
				>
			</tr>
		{/each}
	</table>
{/if}
<Paginator bind:items={$bidValidators} bind:pagedItems={displayedBidValidators} />

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
		@apply whitespace-nowrap;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
		@apply whitespace-nowrap;
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.rank {
		@apply text-left;
		@apply w-[2.5vw];
	}

	.rank-val {
		@apply w-[2.5vw];
		@apply text-center;
	}

	.validators {
		@apply pl-[3.69vw];
		@apply text-left;
		@apply flex justify-start;
	}

	.performance {
		@apply text-center;
		@apply flex justify-center gap-[clamp(8px,0.48vw,0.48vw)];
	}

	.network-perc {
		@apply text-right;
		@apply justify-end;
	}

	.self {
		@apply text-right;
	}

	.stake {
		@apply text-center;
	}

	.header-wrapper {
		@apply flex items-center gap-[clamp(8px,0.48vw,0.48vw)];
	}

	.status {
		@apply text-center;
		@apply flex justify-center;
	}
</style>

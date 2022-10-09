<script lang="ts">
	showSwitch.set(true);

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

	onMount(async () => {
		$isLoading = true;
		$bidValidators = await getBids();
		$isLoading = false;
	});

	const sortBids = (direction: 'asc' | 'desc', field: string) => {
		$bidValidators = tableSort(direction, $bidValidators, field);
	};
</script>

{#if displayedBidValidators && displayedBidValidators.length > 0}
	<table>
		<tr>
			<th class="rank">Rank</th>
			<th class="validators">Validators</th>
			<th class="status">Status</th>
			<th class="fee">
				<div class="header-wrapper">
					<div class="text">Fee</div>
					<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'delegationRate')} />
				</div>
			</th>
			<th>
				<div class="header-wrapper">
					<div class="text">Delegators</div>
					<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'numOfDelegators')} />
				</div>
			</th>
			<th class="stake">
				<div class="header-wrapper justify-center">
					<div class="text">Total Stake</div>
					<Tooltip text="Total Stake tooltip" />
					<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'totalBid')} />
				</div>
			</th>
			<th class="self">Self %</th>
			<th class="network-perc">% Of Network</th>
			<th class="performance">
				<div class="header-wrapper">
					<div class="text">Performance</div>
				</div>
			</th>
		</tr>
		<div class="divider table-header-border" />
		{#each displayedBidValidators as bid, i}
			<tr>
				<td class="rank-val">{bid.rank}</td>
				<td class="validators"
					><Validator
						imgUrl={bid.information?.icon}
						hash={bid.publicKey}
						name={bid.information?.name}
					/></td
				>
				<td class="status"><Status inactive={bid.inactive && bid.inactive} /></td>
				<td class="grey">{bid.delegationRate && bid.delegationRate.toFixed(2)}%</td>
				<td>{bid.numOfDelegators && bid.numOfDelegators.toLocaleString('en')}</td>
				<td class="stake">{bid.totalBid && bid.totalBid.toLocaleString('en')} CSPR</td>
				<td class="grey self">{bid.selfStakePercentage && bid.selfStakePercentage.toFixed(2)}%</td>
				<td class="grey network-perc">{bid.networkPercentage && bid.networkPercentage.toFixed(2)}%</td>
				<td class="performance"><CircleProgressBar progress={bid.performance && bid.performance} /></td>
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
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
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
	}

	.performance {
		@apply text-center;
		@apply flex justify-center;
	}

	.network-perc {
		@apply text-right;
	}

	.self {
		@apply text-right;
	}

	.stake {
		@apply text-center;
	}

	.header-wrapper {
		@apply flex items-center gap-[0.48vw];
	}

	.status {
		@apply text-center;
		@apply flex justify-center;
	}
</style>

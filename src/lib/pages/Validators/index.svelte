<script lang="ts">
	import Switch from '$lib/components/Reusables/Switch.svelte';
	import CircleProgressBar from '$lib/components/TableData/CircleProgressBar.svelte';
	import Status from '$lib/components/TableData/Status.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import type { EraValidator, Bid } from '$utils/types/validator';
	import { tableSort } from '$utils/sort';
	import { get } from 'svelte/store';
	import { getBids, getCurrentEraValidators, getNextEraValidators } from '$utils/api';

	let bidValidators: Bid[] = [];
	let currentEraValidators: Partial<Bid[]> = [];
	let nextEraValidators: Partial<Bid[]> = [];
	let eraValidators: Partial<Bid[]>;
	let displayedBidValidators: Bid[] = [];
	let displayedEraValidators: Partial<Bid[]> = [];

	let pageOptions: { name: string; dropdown?: string[]; selectedDropdown?: string }[] = [
		{
			name: 'Validators',
			dropdown: [],
			selectedDropdown: ''
		},
		{
			name: 'Validator Auction',
			dropdown: [],
			selectedDropdown: ''
		}
	];

	let sortingOptions = {
		index: 0,
		order: null
	};

	let currentPage = 0;
	onMount(async () => {
		$isLoading = true;
		bidValidators = await getBids();
		currentEraValidators = await getCurrentEraValidators();
		nextEraValidators = await getNextEraValidators();
		currentEraValidators?.forEach((validator) => {
			validator.performance = bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).performance;
			validator.information = bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).information;
		});
		nextEraValidators?.forEach((validator) => {
			validator.performance = bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).performance;
			validator.information = bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).information;
		});
		eraValidators = currentEraValidators;
		if (pageOptions) {
			pageOptions[0].dropdown[0] = `Current Era ${currentEraValidators[0]?.eraId}`;
			pageOptions[0].dropdown[1] = `Next Era ${nextEraValidators[0]?.eraId}`;
		}

		$isLoading = false;
	});

	const sortValidators = (direction: 'asc' | 'desc', field: string, i: number) => {
		eraValidators = tableSort(direction, eraValidators, field);
		sortingOptions = {
			index: i,
			order: direction
		};
	};

	const sortBids = (direction: 'asc' | 'desc', field: string) => {
		bidValidators = tableSort(direction, bidValidators, field);
	};
</script>

<div class="content">
	<Switch
		options={pageOptions}
		bind:selected={currentPage}
		outlined
		on:dropdown-option-clicked={(e) => {
			if (e.detail.optionIndex !== 0) {
				return;
			}
			if (e.detail.dropdownIndex === 0) {
				eraValidators = currentEraValidators && currentEraValidators;
			} else {
				eraValidators = nextEraValidators && nextEraValidators;
			}
		}}
	/>

	{#if currentPage === 0}
		{#if displayedEraValidators && displayedEraValidators.length > 0}
			<table>
				<tr>
					<th class="rank">Rank</th>
					<th class="validators">Validators</th>
					<th class="fee">
						<div class="header-wrapper">
							<div class="text">Fee</div>
							<TableSorter
								ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
								descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'}
								on:sort={(e) => sortValidators(e.detail?.direction, 'delegationRate', 0)}
							/>
						</div>
					</th>
					<th>
						<div class="header-wrapper">
							<div class="text">Delegators</div>
							<TableSorter
								ascendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'asc'}
								descendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'desc'}
								on:sort={(e) => sortValidators(e.detail?.direction, 'numOfDelegators', 1)}
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
								on:sort={(e) => sortValidators(e.detail?.direction, 'selfStake', 2)}
							/>
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
				{#each displayedEraValidators as validator, i}
					<tr>
						<td class="rank-val">{validator.rank}</td>
						<td class="validators"
							><Validator
								imgUrl={validator?.information?.icon}
								hash={validator?.publicKey}
								name={validator.information?.name}
							/></td
						>
						<td class="grey">{validator.delegationRate}%</td>
						<td>{validator.numOfDelegators.toLocaleString('en')}</td>
						<td class="stake">{validator.totalBid.toLocaleString('en')} CSPR</td>
						<td class="grey self">{validator.selfStakePercentage.toFixed(2)}%</td>
						<td class="grey network-perc">{validator.networkPercentage.toFixed(2)}%</td>
						<td class="performance"><CircleProgressBar progress={validator.performance} /></td>
					</tr>
				{/each}
			</table>
		{/if}
		<Paginator bind:items={eraValidators} bind:pagedItems={displayedEraValidators} />
	{:else}
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
						<td class="status"><Status inactive={bid.inactive} /></td>
						<td class="grey">{bid.delegationRate.toFixed(2)}%</td>
						<td>{bid.numOfDelegators.toLocaleString('en')}</td>
						<td class="stake">{bid.totalBid.toLocaleString('en')} CSPR</td>
						<td class="grey self">{bid.selfStakePercentage.toFixed(2)}%</td>
						<td class="grey network-perc">{bid.networkPercentage.toFixed(2)}%</td>
						<td class="performance"><CircleProgressBar progress={bid.performance} /></td>
					</tr>
				{/each}
			</table>
		{/if}
		<Paginator bind:items={bidValidators} bind:pagedItems={displayedBidValidators} />
	{/if}
</div>

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

	.content {
		@apply flex flex-col gap-[3.21vw];
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

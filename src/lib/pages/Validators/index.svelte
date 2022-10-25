<script lang="ts">
	import CircleProgressBar from '$lib/components/TableData/CircleProgressBar.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import { tableSort } from '$utils/sort';
	import { currentPage, eraValidators } from '$stores/validatorsSwitch';
	import type { Bid } from '$utils/types/validator';

	let displayedEraValidators: Partial<Bid[]> = [];

	currentPage.set(0);

	let sortingOptions = {
		index: 0,
		order: null
	};

	const sortValidators = (direction: 'asc' | 'desc', field: string, i: number) => {
		$eraValidators = tableSort(direction, $eraValidators, field);
		sortingOptions = {
			index: i,
			order: direction
		};
	};
</script>

{#if displayedEraValidators && displayedEraValidators.length > 0}
	<table>
		<tr>
			<th class="rank">Rank</th>
			<th><div class="validators">Validators</div></th>
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
						on:sort={(e) => sortValidators(e.detail?.direction, 'totalBid', 2)}
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
						on:sort={(e) => sortValidators(e.detail?.direction, 'networkPercentage', 3)}
					/>
				</div></th
			>
			<th>
				<div class="performance center">
					<div class="text">Performance</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 4 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 4 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortValidators(e.detail?.direction, 'performance', 4)}
					/>
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
				<td class="grey">{validator.delegationRate && validator.delegationRate}%</td>
				<td>{validator.numOfDelegators && validator.numOfDelegators.toLocaleString('en')}</td>
				<td class="stake">{validator.totalBid && validator.totalBid.toLocaleString('en')} CSPR</td>
				<td class="grey self"
					>{validator.selfStakePercentage && validator.selfStakePercentage.toFixed(2)}%</td
				>
				<td class="grey network-perc"
					>{validator.networkPercentage && validator.networkPercentage.toFixed(2)}%</td
				>
				<td
					><div class="performance md:ml-[5vw]">
						<CircleProgressBar progress={(validator.performance && validator.performance) || 0} />
					</div></td
				>
			</tr>
		{/each}
	</table>
{/if}
<Paginator bind:items={$eraValidators} bind:pagedItems={displayedEraValidators} />

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
		@apply flex justify-start gap-[clamp(8px,0.48vw,0.48vw)];
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

	.center {
		@apply justify-center;
	}
</style>

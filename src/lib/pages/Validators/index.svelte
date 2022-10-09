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

	const sortValidators = (direction: 'asc' | 'desc', field: string) => {
		$eraValidators = tableSort(direction, $eraValidators, field);
	};

	currentPage.set(0);
</script>

{#if displayedEraValidators && displayedEraValidators.length > 0}
	<table>
		<tr>
			<th class="rank">Rank</th>
			<th class="validators">Validators</th>
			<th class="fee">
				<div class="header-wrapper">
					<div class="text">Fee</div>
					<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'delegationRate')} />
				</div>
			</th>
			<th>
				<div class="header-wrapper">
					<div class="text">Delegators</div>
					<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'numOfDelegators')} />
				</div>
			</th>
			<th class="stake">
				<div class="header-wrapper justify-center">
					<div class="text">Total Stake</div>
					<Tooltip text="Total Stake tooltip" />
					<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'selfStake')} />
				</div>
			</th>
			<th class="self">Self %</th>
			<th>
				<div class="header-wrapper justify-center network-perc">
					<div class="text">% Of Network</div>
					<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'networkPercentage')} />
				</div></th
			>
			<th>
				<div class="justify-center performance">
					<div class="text">Performance</div>
					<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'performance')} />
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
		@apply flex justify-center gap-[0.48vw];
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
		@apply flex items-center gap-[0.48vw];
	}
</style>

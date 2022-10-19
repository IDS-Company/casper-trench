<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import { getContracts } from '$utils/api';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import { onMount } from 'svelte';

	let contracts = [];
	let displayedContracts = [];
	let sortingOptions = {
		index: 0,
		order: null
	};

	const sortTransactions = (direction: 'asc' | 'desc', field: string) => {
		// transactions = tableSort(direction, transactions, field);
		sortingOptions = {
			index: 0,
			order: direction
		};
	};

	const typeFilterItems = ['System Contract', 'ERC-20', 'DeFi', 'NFT'];
	let selectedFilter = -1;
	onMount(async () => {
		contracts = await getContracts();
	});
</script>

<div class="delegators-tab">
	<div class="title">Contracts</div>
	<table>
		<tr>
			<th class="blocky">Package Hash</th>
			<!-- <th>Name</th>
			<th
				><div class="sorter">
					<div class="text">Type</div>
					<TableFilter dropdownItems={typeFilterItems} bind:selectedFilter />
				</div></th
			> -->
			<th>Active</th>
			<th
				><div class="sorter">
					<div class="text">30d Transactions</div>
					<Tooltip text="Number of Contract calls in the past 30 Days" />
					<TableSorter
						ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortTransactions(e.detail?.direction, 'transactions')}
					/>
				</div></th
			>
			<!-- <th><div class="flex justify-end">Contract Owner</div></th> -->
		</tr>
		<div class="divider table-header-border" />
		{#if displayedContracts && displayedContracts?.length}
			{#each displayedContracts as contract}
				{#if selectedFilter === -1}
					<tr>
						<td class="blocky hash">
							<a href="/contract-package/{contract.contractPackageHash}">
								<Hash hash={contract.contractPackageHash} noOfCharacters={5} variant="righter" />
							</a>
						</td>
						<!-- <td class="grey">{contract.name || ''}</td> -->
						<!-- <td>{contract.type || ''}</td> -->
						<td>
							<div class="grey">
								{contract &&
									timeAgo(
										millisToFormat(
											Date.now() -
												(new Date(contract?.timestamp).getTime() ||
													new Date('2022-01-01').getTime())
										)
									)} ago
							</div>
						</td>
						<td>{contract.transactions || 0}</td>
						<!-- <td class="grey">
						<div class="flex justify-end">
							{#if contract.owner}
								<a href="/accounts/{contract.owner}">
									<Validator imgUrl={''} name={''} hash={contract.owner} notValidator />
								</a>
							{:else}
								System
							{/if}
						</div>
					</td> -->
					</tr>
				{:else if contract.type !== null}
					{#if contract.type.toLowerCase().includes(typeFilterItems[selectedFilter].toLowerCase())}
						<tr>
							<td class="block hash">
								<a href="/contract-package/{contract.packageHash}">
									<Hash hash={contract.packageHash} noOfCharacters={5} variant="righter" />
								</a>
							</td>
							<td class="grey">{contract.name || ''}</td>
							<td>{contract.type || ''}</td>
							<td>
								<div class="grey">
									{timeAgo(millisToFormat(Date.now() - new Date(contract.timestamp).getTime()))} ago
								</div>
							</td>
							<td>{contract.transactions}</td>
							<td class="grey">
								<div class="flex justify-end">
									{#if contract.owner}
										<a href="/accounts/{contract.owner}">
											<Validator imgUrl={''} name={''} hash={contract.owner} notValidator />
										</a>
									{:else}
										System
									{/if}
								</div>
							</td>
						</tr>
					{/if}
				{/if}
			{/each}
		{/if}
	</table>
	<Paginator bind:items={contracts} bind:pagedItems={displayedContracts} itemsPerPage={5} />
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative md:mb-[0.95vw];
	}

	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold text-color-table-header;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)] min-w-max;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left whitespace-nowrap;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max whitespace-nowrap;
	}

	.blocky {
		@apply px-0;
	}

	.grey {
		@apply text-color-grey-footer-label min-w-max whitespace-nowrap;
	}

	.hash {
		@apply text-color-hover-footer-link min-w-max;
	}
</style>

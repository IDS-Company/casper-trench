<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import ContractText from '$lib/components/TableData/ContractText.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import TxHash from '$lib/components/TableData/TxHash.svelte';
	import { millisToFormat, parseStringValue, timeAgo } from '$utils/converters';
	import { getTransactions } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import PlaceHolderIndicator from '$lib/components/PlaceHolderIndicator.svelte';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import { tableSort } from '$utils/sort';
	import type { Transaction } from '$utils/types/transaction';
	import TableFilter from '$lib/components/Reusables/TableFilter.svelte';
	let transactions: Transaction[];
	let transactionsPerPage = 10;
	let startIndex = 1;

	const fetchTransactions = async () => {
		$isLoading = true;
		transactions = await getTransactions(transactionsPerPage, startIndex);
		$isLoading = false;
	};
	$: if (transactionsPerPage) {
		setTimeout(async () => {
			await fetchTransactions();
			// transactions = await getAllTransactions();
		}, 1);
	}

	let sortingOptions = {
		index: 0,
		order: null
	};

	const sortTransactions = (direction: 'asc' | 'desc', field: string) => {
		transactions = tableSort(direction, transactions, field);
		sortingOptions = {
			index: 0,
			order: direction
		};
	};

	const typeFilterItems = ['Transfer', 'Delegate', 'Undelegate'];
	let selectedFilter = -1;
</script>

<div class="delegators-tab">
	<div class="title">Transactions</div>
	<table>
		<tr>
			<th class="blocky">Tx Hash</th>
			<th class="">Block Hash</th>
			<th class="">Public Key</th>
			<th class="center sorter">
				<div class="text">Age</div>
				<TableSorter ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
				descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'} on:sort={(e) => sortTransactions(e.detail?.direction, 'timestamp')} />
			</th>
			<th><div class="filter">
				<div class="text">Contract</div>
				<TableFilter dropdownItems={typeFilterItems} bind:selectedFilter />
			</div></th>
			<th class="right">Amount</th>
			<th class="right"> Cost</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transactions && transactions.length > 0}
			{#each transactions as transaction}
				<tr>
					<td class="blocky">
						<div class="wrapper-center">
							<a href="/transactions/{transaction.deployHash}">
								<TxHash
									hash={transaction.deployHash}
									righter
									color={transaction.status === 'success' ? 'text' : 'yellow'}
								/>
							</a>
						</div>
					</td>
					<td>
						<a href="/blocks/{transaction.blockHash}"> <Hash hash={transaction.blockHash} /></a>
					</td>
					<td>
						<a href="/accounts/{transaction.publicKey}">
							<Hash hash={transaction.publicKey} />
						</a>
					</td>
					<td class="center age">
						{`${timeAgo(millisToFormat(Date.now() - Date.parse(transaction.timestamp)))} ago`}
					</td>
					<td>
						<ContractText type={transaction.entryPoint} />
					</td>
					<td class="right">
						<div class="wrapper">
							<BalanceTransferrable cspr={transaction.amount} />
						</div>
					</td>
					<td class="right">
						<div class="wrapper">
							<BalanceTransferrable cspr={transaction.cost} />
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={transactionsPerPage}
		apiPaginator
		bind:items={transactions}
		bind:startIndex
		on:load-page={async () => await fetchTransactions()}
	/>
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold text-color-table-header;
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

	.blocky {
		@apply px-0;
	}

	.right {
		@apply text-right;
	}

	.wrapper {
		@apply flex justify-end;
	}

	.center {
		@apply text-center;
	}

	.age {
		@apply text-color-grey-footer-label;
	}

	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)] justify-center;
	}

	.filter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.wrapper-center {
		@apply flex items-center;
		@apply md:h-[3vw];
	}
</style>

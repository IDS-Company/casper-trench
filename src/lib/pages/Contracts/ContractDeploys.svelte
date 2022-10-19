<script lang="ts">
	import { goto } from '$app/navigation';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import AmountCost from '$lib/components/TableData/AmountCost.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import { getContractDeploys } from '$utils/api';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ContractText from '$lib/components/TableData/ContractText.svelte';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import TxHash from '$lib/components/TableData/TxHash.svelte';
	import type { Transaction } from '$utils/types/transaction';

	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let transactions: Transaction[];
	onMount(async () => {
		transactions = await getContractDeploys($page.params.hash);
	});
</script>

<div class="delegators-tab">
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="blocky">TX Hash</th>
			<th>Block Hash</th>
			<th>Public Key</th>
			<th>
				<div class="tooltip">
					<div class="text">Age</div>
					<TableSorter />
				</div>
			</th>
			<th> Contract </th>
			<th class="right">Value</th>
			<th class="right">Fee</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transactions && transactions.length > 0}
			{#each transactions as transaction}
				<tr>
					<td class="blocky">
						<div class="tx-id">
							<a href="/transactions/{transaction?.deployHash}">
								<!-- <Hash hash={transaction?.deployHash} variant={'righter'} /> -->
								<TxHash
									hash={transaction.deployHash}
									righter
									color={transaction.status === 'success' ? 'text' : 'yellow'}
								/>
							</a>
						</div>
					</td>
					<td>
						<a href="/blocks/{transaction?.blockHash}">
							<Hash hash={transaction?.blockHash} />
						</a>
					</td>
					<td
						><a href="/accounts/{transaction?.publicKey}">
							<Hash hash={transaction?.publicKey} />
						</a></td
					>
					<td>{`${timeAgo(millisToFormat(Date.now() - Date.parse(transaction.timestamp)))} ago`}</td
					>
					<td>
						<ContractText type={transaction.entryPoint} contractHash={transaction?.contractHash} />
					</td>
					<td>
						<div class="flex justify-end">
							<div class="wrapper">
								<BalanceTransferrable cspr={transaction.amount} />
							</div>
						</div>
					</td>
					<td class="right">
						<div class="flex justify-end">
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
		bind:startIndex
	/>
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.blocky {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.right {
		@apply text-right;
	}

	.tooltip {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.tx-id {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.eye {
		@apply py-[clamp(4px,0.42vw,0.42vw)] px-[clamp(2px,0.3vw,0.3vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply bg-color-translucent-green;
	}

	.eye > .icon {
		@apply w-[clamp(12px,0.95vw,0.95vw)];
	}

	.top {
		@apply font-medium;
	}

	.bottom {
		@apply flex items-center gap-[0.2vw];
	}

	.green {
		@apply text-color-hover-footer-link cursor-pointer;
	}
</style>

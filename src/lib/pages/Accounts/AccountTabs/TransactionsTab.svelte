<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import Hash from '$components/TableData/Hash.svelte';
	import TransactionStatus from '$components/TableData/TransactionStatus.svelte';
	import type { AccountTransaction } from '$utils/types/transaction';
	import { onMount } from 'svelte';
	import { isLoading } from '$stores/loading';
	import { page } from '$app/stores';
	import { getAccountDeploys } from '$utils/api';
	import EmptyIcon from '$lib/icons/EmptyIcon.svelte';

	let transactions: AccountTransaction[];
	let transactionsPerPage = 10;
	let startIndex = 1;
	onMount(async () => {
		await fetchTransactions();
	});

	const fetchTransactions = async () => {
		$isLoading = true;
		transactions = await getAccountDeploys($page.params?.address, transactionsPerPage, startIndex);
		$isLoading = false;
	};
	$: if (transactionsPerPage) {
		setTimeout(async () => {
			await fetchTransactions();
		}, 1);
	}
</script>

<div class="transactions-tab">
	<div class="total">
		Latest {transactionsPerPage} Transactions
	</div>
	<table>
		<tr>
			<th class="blocky">TX ID</th>
			<th>TX Time</th>
			<th class="right">From (Account Hash)</th>
			<th class="right">TX Fee</th>
			<th class="right">Status</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transactions && transactions.length > 0}
			{#each transactions as transaction}
				<tr>
					<td class="blocky">
						<a class="hidden md:block" href="/transactions/{transaction.deployHash}">
							{transaction.deployHash}</a
						>
						<a class="md:hidden" href="/transactions/{transaction.deployHash}">
							{`${transaction.deployHash.substring(0, 5)}...${transaction.deployHash.substring(
								transaction.deployHash.length - 5
							)}`}</a
						></td
					>
					<td class="time"
						>{`${timeAgo(millisToFormat(Date.now() - Date.parse(transaction.timestamp)))} ago`}</td
					>
					<td>
						<div class="right-flex">
							<Hash color="black" hash={transaction.publicKey} />
						</div>
					</td>
					<td>
						<div class="value-crypto">
							<div class="crypto">
								{transaction.cost.toLocaleString('en')}
							</div>
							<div class="cspr">CSPR</div>
						</div>
					</td>
					<td>
						<div class="wrapper">
							<TransactionStatus success={transaction.status.toLowerCase() === 'success'}>
								{transaction.status}
							</TransactionStatus>
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	{#if transactions && transactions.length > 0}
		<Paginator
			showTotalRows={false}
			bind:itemsPerPage={transactionsPerPage}
			apiPaginator
			bind:items={transactions}
			bind:startIndex
			on:load-page={async () => await fetchTransactions()}
		/>
	{:else}
		<div class="empty">
			<div class="content">
				<div class="empty-icon">
					<EmptyIcon />
				</div>
				<div class="text">Empty</div>
			</div>
		</div>
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,2vw,2vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,2vw,2vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	td.blocky {
		@apply text-color-hover-footer-link;
	}

	.blocky {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[clamp(4px,2.38vw,2.38vw)];
	}

	.right {
		@apply text-right;
	}

	.time {
		@apply align-top;
		@apply min-w-max;
	}

	.right-flex {
		@apply flex justify-end;
	}

	.value-crypto {
		@apply flex items-center justify-end gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-right text-[clamp(10px,0.83vw,0.83vw)];
	}

	.crypto {
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label;
	}

	.wrapper {
		@apply flex justify-end;
	}

	.empty-icon {
		@apply w-[clamp(16px,2.08vw,2.08vw)] h-[clamp(16px,2.08vw,2.08vw)];
	}

	.empty {
		@apply h-[23.81vh] md:h-[23.81vw] w-full;
		@apply flex items-center justify-center;
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label text-opacity-50;
	}

	.empty > div {
		@apply flex flex-col items-center justify-center;
	}
</style>

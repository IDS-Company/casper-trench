<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import AmountChange from '$lib/components/TableData/AmountChange.svelte';
	import FromToAccountHash from '$lib/components/TableData/FromToAccountHash.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import type { Transfer } from '$utils/types/transfer';
	import { getAccountTransfers } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import EmptyIcon from '$lib/icons/EmptyIcon.svelte';
	let transfers: Transfer[];
	let transfersPerPage = 10;
	let startIndex = 1;
	export let props: { accountHash: string };
	onMount(async () => {
		await fetchTransfers();
	});

	const fetchTransfers = async () => {
		$isLoading = true;
		transfers = await getAccountTransfers($page.params?.address, transfersPerPage, startIndex);

		$isLoading = false;
	};
	$: if (transfersPerPage) {
		setTimeout(async () => {
			await fetchTransfers();
		}, 1);
	}
</script>

<div class="transfer-tab">
	<div class="total">
		Latest {transfersPerPage} Transactions
	</div>
	<table>
		<tr>
			<th class="blocky">TX ID</th>
			<th>TX Time</th>
			<th class="right">From (Account Hash)</th>
			<th class="right">To (Account Hash)</th>
			<th class="right">Amount</th>
		</tr>
		<div class="divider table-header-border" />
		<!-- TODO add account balances,direction,correct amount -->
		{#if props.accountHash && transfers && transfers.length > 0}
			{#each transfers as transfer}
				<tr>
					<td class="blocky">
						<a class="hidden md:block" href="/transactions/{transfer.deployHash}"> {transfer.deployHash}</a>
						<a class="md:hidden" href="/transactions/{transfer.deployHash}"> {`${transfer.deployHash.substring(0, 5)}...${transfer.deployHash.substring(transfer.deployHash.length - 5)}`}</a></td
					>
					<td class="time"
						>{`${timeAgo(millisToFormat(Date.now() - Date.parse(transfer.timestamp)))} ago`}</td
					>
					{#if transfer.fromAccountHash === props?.accountHash || transfer.toAccountHash === $page.params?.address}
						<td>
							<div class="right-flex">
								<FromToAccountHash
									cspr={transfer.fromAccountBalance}
									hash={transfer.fromAccountHash}
									link="/accounts/{transfer.fromAccountHash}"
								/>
							</div>
						</td>
						<td>
							<div class="right-flex">
								<FromToAccountHash
									cspr={transfer.toAccountBalance}
									hash={transfer.toAccountHash}
									link="/accounts/{transfer.toAccountHash}"
								/>
							</div>
						</td>
					{:else}
						<td>
							<div class="right-flex">
								<FromToAccountHash
									cspr={transfer.toAccountBalance}
									hash={transfer.toAccountHash}
									link="/accounts/{transfer.toAccountHash}"
								/>
							</div>
						</td>
						<td>
							<div class="right-flex">
								<FromToAccountHash
									cspr={transfer.fromAccountBalance}
									hash={transfer.fromAccountHash}
									link="/accounts/{transfer.fromAccountHash}"
								/>
							</div>
						</td>
					{/if}

					<td>
						<div class="right-flex">
							<AmountChange
								isUp={transfer.fromAccountHash === props?.accountHash ? false : true}
								cspr={transfer.amount}
							/>
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	{#if transfers && transfers.length > 0}
		<Paginator
			showTotalRows={false}
			bind:itemsPerPage={transfersPerPage}
			apiPaginator
			bind:items={transfers}
			bind:startIndex
			on:load-page={async () => await fetchTransfers()}
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,1vw,1vw)];
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
		@apply align-middle md:align-top;
		@apply min-w-max;
	}

	.right-flex {
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

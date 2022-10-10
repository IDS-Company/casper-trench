<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import Contract from '$lib/components/TableData/Contract.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import PublicKey from '$lib/components/TableData/PublicKey.svelte';
	import Rank from '$lib/components/TableData/Rank.svelte';
	import { isLoading } from '$stores/loading';
	import { getTopAccounts } from '$utils/api';
	import { tableSort } from '$utils/sort';
	import type { TopAccount } from '$utils/types/account';
	import { onMount } from 'svelte';

	let accountsPerPage = 10;
	let startIndex = 1;
	let topAccounts: TopAccount[];

	const fetchTopAccounts = async () => {
		$isLoading = true;
		topAccounts = await getTopAccounts(startIndex, accountsPerPage);
		$isLoading = false;
	};

	let sortingOptions = {
		index: 0,
		order: null
	};

	const sortTopAccounts = (direction: 'asc' | 'desc', field: string, i: number) => {
		topAccounts = tableSort(direction, topAccounts, field);
		sortingOptions = {
			index: i,
			order: direction
		};
	};

	onMount(async () => {
		await fetchTopAccounts();
	});

	$: if (accountsPerPage) {
		setTimeout(async () => {
			await fetchTopAccounts();
		}, 1);
	}
</script>

<div class="delegators-tab">
	<div class="title">Rich List</div>
	<table>
		<tr>
			<th class="block">Rank</th>
			<th>Public key</th>
			<th>Account hash</th>
			<th>
				<div class="sorter">
					<div>Balance</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 0 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortTopAccounts(e.detail?.direction, 'balance', 0)}
					/>
				</div>
			</th>
			<th>
				<div class="sorter">
					<div>Transferrable</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 1 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortTopAccounts(e.detail?.direction, 'transferrable', 1)}
					/>
				</div>
			</th>
			<th>
				<div class="sorter">
					<div>Txn Count</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 2 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortTopAccounts(e.detail?.direction, 'transactionCount', 2)}
					/>
				</div>
			</th>
			<th>
				<div class="sorter right-div">
					<div>Staked</div>
					<TableSorter
						ascendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'asc'}
						descendingSelected={sortingOptions.index === 3 && sortingOptions.order === 'desc'}
						on:sort={(e) => sortTopAccounts(e.detail?.direction, 'stakedAmount', 3)}
					/>
				</div>
			</th>
		</tr>
		<div class="divider table-header-border" />
		{#if !$isLoading && topAccounts && topAccounts.length > 0}
			{#each topAccounts as account, i}
				<tr>
					<td class="block">
						<div class="wrapper">
							<!-- TOD use actual rank -->
							<!-- <Rank rank={account.rank} /> -->
							<Rank rank={i + 1} />
							<Contract text="CONTRACT" />
						</div>
					</td>
					<td>
						<a href="/accounts/{account.publicKey}">
							<PublicKey
								hash={account.publicKey}
								activeDate={Date.parse(account.activeDate.toString())}
							/>
						</a>
					</td>
					<td>
						<a href="/accounts/{account.accountHash}"
							><Hash hash={account.accountHash} noOfCharacters={10} /></a
						></td
					>
					<td><div class="right-div"><BalanceTransferrable cspr={account.balance} /></div></td>
					<td><div class="right-div"><BalanceTransferrable cspr={account.transferrable} /></div></td
					>
					<td>{account.transactionCount?.toLocaleString('en') || 0}</td>
					<td class="right">{account.stakedAmount.toLocaleString('en')}</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={accountsPerPage}
		apiPaginator
		bind:items={topAccounts}
		bind:startIndex
		on:load-page={async () => await fetchTopAccounts()}
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,2.4vw,2.4vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
		/* @apply flex flex-row; */
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,2.4vw,2.4vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header align-top;
		@apply min-w-max h-full;
	}

	.block {
		@apply px-0;
	}

	.right {
		@apply text-right;
	}

	.right-div {
		@apply flex justify-end;
	}

	.wrapper {
		@apply flex gap-[2.26vw];
	}
	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}
</style>

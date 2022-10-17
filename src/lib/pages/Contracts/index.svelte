<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableFilter from '$lib/components/Reusables/TableFilter.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';

	let contracts = [
		{
			packageHash: '86f2d45f024d7bb7fb5266b2390d7c253b588a0a16ebd946a60cb4314600af74',
			name: 'Auction',
			type: 'System Contract',
			timestamp: '2021-03-31T15:00:40.000Z',
			transactions: 4876,
			owner: null
		},
		{
			packageHash: '7998f6ca22f0f17d2011b875c07d2a4bbce7d4a3a27bf109352a8ea5eed3dbc8',
			name: null,
			type: null,
			timestamp: '2022-04-30T20:32:20.000Z',
			transactions: 151,
			owner: '016a6339f34d4ec62f60f20dd7295b5b7872cd7c59a430320aab5baa823e1f524c'
		},
		{
			packageHash: '5cf078b7768fd146630a0c74070e5a966504a8a87448a9865e5b9ca3d05d908f',
			name: 'Swappery Token',
			type: 'ERC-20',
			timestamp: '2022-04-30T20:32:20.000Z',
			transactions: 40,
			owner: '01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071'
		},
		{
			packageHash: '460018b5a6a6fa6046d1021a7f4414fd45e5e506e6604b4656fe66c90b661e6b',
			name: 'Friendly Market',
			type: 'DeFi',
			timestamp: '2022-06-05T19:53:35.000Z',
			transactions: 39,
			owner: '01f61490e53606fbec3bcd9124213eac25186faafa150af9f6b9efc45358f844d1'
		},
		{
			packageHash: '2afc2c90a996218a3c64d8fd9a949bf68813696f0c68831ceae2b01394484b81',
			name: 'WISEKEY_KYC',
			type: 'NFT',
			timestamp: '2022-03-01T19:10:07.000Z',
			transactions: 5,
			owner: '016ecbdc24a17aec45b8a125d7f5df0b7f03a15ac7d2e41f353c90339a383b26ca'
		}
	];

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
			<th>Age</th>
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
		{#each contracts as contract}
			{#if selectedFilter === -1}
				<tr>
					<td class="blocky hash">
						<a href="/contract-package/{contract.packageHash}">
							<Hash hash={contract.packageHash} noOfCharacters={5} variant="righter" />
						</a>
					</td>
					<!-- <td class="grey">{contract.name || ''}</td> -->
					<!-- <td>{contract.type || ''}</td> -->
					<td>
						<div class="grey">
							{timeAgo(millisToFormat(Date.now() - new Date(contract.timestamp).getTime()))} ago
						</div>
					</td>
					<td>{contract.transactions}</td>
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
	</table>
	<Paginator />
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

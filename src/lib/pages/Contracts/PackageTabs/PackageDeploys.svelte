<script lang="ts">
	import { goto } from '$app/navigation';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableFilter from '$lib/components/Reusables/TableFilter.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import AmountCost from '$lib/components/TableData/AmountCost.svelte';
	import Contract from '$lib/components/TableData/Contract.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';

	export let props: {
		contractHash: string;
	};
	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let contracts = [
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: "Swappery Token",
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		},
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: "Swappery Token",
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		},
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: "Swappery Token",
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		},
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: "Swappery Token",
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		},
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: "Swappery Token",
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		},
		{
			id: 'f84a69f58e6aedb6c504c8dac84e82fe765447f72da4b8bc1dc96fd24e6745e7',
			blockHash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
			publicKey: "01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071",
			age: '2021-03-31T15:00:40.000Z',
			contract: {
				hash: "ebfbc348fbb69ae35474244e2f38e9cb04fadf5df5b64020b220809617d0c20c",
				name: null,
				type: "ERC-20",
				function: 'mint'
			},
			value: 234,
			fee: 23
		}
	];
</script>

<div class="delegators-tab">
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="block">TX Hash</th>
			<th>Block Hash</th>
			<th>Public Key</th>
			<th>
				<div class="tooltip">
					<div class="text">Age</div>
					<TableSorter />
				</div>
			</th>
			<th>
				Contract
			</th>
			<th class="right">Value</th>
			<th class="right">Fee</th>
		</tr>
		<div class="divider table-header-border" />
		{#if contracts && contracts.length > 0}
			{#each contracts as contract}
				<tr>
					<td class="block">
						<div class="tx-id">
							<div class="eye">
								<div class="icon">
									<EyeIcon />
								</div>
							</div>
							<a href="/transactions/{contract.id}">
								<Hash hash={contract.id} />
							</a>
						</div>
					</td>
					<td>
						<a href="/blocks/{contract.blockHash}">
							<Hash hash={contract.blockHash} />
						</a>
					</td>
					<td><a href="/accounts/{contract.publicKey}">
						<Hash hash={contract.publicKey} />
					</a></td>
					<td>{`${timeAgo(millisToFormat(Date.now() - (new Date(contract.age)).getTime()))} ago`}</td>
					<td>
						<div class="contract-value">
							<div class="top">{contract.contract.function}</div>
							{#if contract.contract.name}	
								<div class="bottom">with <span class="green" on:click={() => {
									goto(`/contracts/${contract.contract.hash}`);
								}}>{`${contract.contract.name} ${contract.contract.type || ""}`}</span></div>
							{:else}
								<div class="bottom">with <Hash hash={contract.contract.hash} on:click={() => {
									goto(`/contracts/${contract.contract.hash}`);
								}}/> </div>
							{/if}
						</div>
					</td>
					<td>
						<div class="flex justify-end">
							<AmountCost cspr={contract.fee} cashValue={contract.value / 123} />
						</div>
					</td>
					<td class="right">
						<div class="flex justify-end">
							<AmountCost cspr={contract.fee} cashValue={contract.fee / 123} />
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.block {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
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
		@apply pt-[clamp(8px,0.8vw,0.8vw)];
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

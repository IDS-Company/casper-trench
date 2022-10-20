<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import { isLoading } from '$stores/loading';
	import { getValidatorBlocks } from '$utils/api';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import { blockHistory } from '$utils/history';
	import type { DBBlock } from '$utils/types/block';
	import { onMount } from 'svelte';

	export let props: {
		validatorPublicKey: string;
	};
	let blocksPerPage: number = 10;
	let startIndex = 1;
	let blocks: DBBlock[];
	onMount(async () => {
		await fetchProposerBlocks();
	});

	const fetchProposerBlocks = async () => {
		$isLoading = true;
		blocks = await getValidatorBlocks(props.validatorPublicKey, blocksPerPage, startIndex);
		$isLoading = false;
	};
	$: if (blocksPerPage) {
		setTimeout(async () => {
			await fetchProposerBlocks();
		}, 1);
	}
	blockHistory.set(`/validators/${props.validatorPublicKey}`);
</script>

<div class="delegators-tab">
	<div class="total">
		{blocksPerPage} blocks per page
	</div>
	<table>
		<tr>
			<th class="blocky">Block</th>
			<th>Era</th>
			<th>Age</th>
			<th>Transactions</th>
			<th>Transfer</th>
			<th class="right">Block Hash</th>
		</tr>
		<div class="divider table-header-border" />
		{#if blocks && blocks.length > 0}
			{#each blocks as block}
				<tr>
					<td class="blocky">{block.blockHeight.toLocaleString('en')}</td>
					<td>{block.eraID.toLocaleString('en')}</td>
					<td
						>{`${timeAgo(
							millisToFormat(Date.now() - Date.parse(block.timestamp.toString()))
						)} ago`}</td
					>
					<td>{block.deploys}</td>
					<td>{block.transfers}</td>
					<td class="hash right">
						<a href="/blocks/{block.blockHash}" class="hidden md:block"> {block.blockHash}</a>
						<a href="/blocks/{block.blockHash}" class="md:hidden">
							{`${block.blockHash.substring(0, 10)}...${block.blockHash.substring(
								block.blockHash.length - 10
							)}`}</a
						>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<div class="w-[40%] lg:w-full">
		<Paginator
			showTotalRows={false}
			bind:itemsPerPage={blocksPerPage}
			apiPaginator
			bind:items={blocks}
			bind:startIndex
			on:load-page={async () => await fetchProposerBlocks()}
		/>
	</div>
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

	.blocky {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.hash {
		@apply text-color-hover-footer-link hover:text-opacity-70;
	}

	.right {
		@apply text-right;
	}
</style>

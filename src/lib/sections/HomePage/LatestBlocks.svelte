<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';
	import BlockHeight from '$lib/components/TableData/BlockHeight.svelte';
	import { getLatestBlocks } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import type { DBBlock } from '$utils/types/block';
	import { onMount } from 'svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	let blocks: DBBlock[];
	onMount(async () => {
		$isLoading = true;
		blocks = await getLatestBlocks(10);
		$isLoading = false;
	});
</script>

<div class="top-validators">
	<h3>Latest</h3>
	<h2>Blocks</h2>
	{#if blocks && blocks.length > 0}
		<table>
			<tr>
				<th>Block Height</th>
				<th>Era</th>
				<th>Block Hash</th>
				<th>Deploys</th>
			</tr>
			<div class="divider table-header-border" />
			{#each blocks as block}
				<tr>
					<td
						><BlockHeight
							blockDate={Date.parse(block.timestamp.toLocaleString())}
							blockHeight={block.blockHeight.toLocaleString('en')}
						/></td
					>
					<td class="text-color-table-header">{block.eraID}</td>
					<td><a href="/blocks/{block.blockHash}"><Hash hash={block.blockHash} /></a></td>
					<td class="text-color-table-header">{block.deploys}</td>
				</tr>
			{/each}
		</table>

		<div class="mobile-stuff">
			{#each blocks as block, i}
				<div class="validator-mobile" class:noborder={i === blocks.length - 1}>
					<div class="left">
						<div class="item">
							<div class="label">Block Height</div>
							<div class="value">
								<BlockHeight
									blockDate={Date.parse(block.timestamp.toLocaleString())}
									blockHeight={block.blockHeight.toLocaleString('en')}
									flexed
								/>
							</div>
						</div>
						<div class="item">
							<div class="label">Era</div>
							<div class="value">
								{block.eraID}
							</div>
						</div>
						<div class="item">
							<div class="label">Block Hash</div>
							<div class="value">
								<a href="/blocks/{block.blockHash}"><Hash hash={block.blockHash} /></a>
							</div>
						</div>
					</div>
					<div class="right">
						<div>Deploys</div>
						<div class="flex justify-end">
							{block.deploys}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="button">
			<Button outline on:click={() => goto(`/blocks`)}>View all Blocks</Button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.top-validators {
		@apply flex flex-col items-start;
		@apply w-full;
	}
	h3 {
		@apply font-medium text-color-hover-footer-link text-[clamp(14px,1.07vw,1.07vw)] leading-[120%];
	}
	h2 {
		@apply font-bold text-color-table-header text-[clamp(18px,1.4vw,1.4vw)] leading-[120%];
		@apply mt-[clamp(5px,0.3vw,0.3vw)] mb-[clamp(14px,1.6vw,1.6vw)];
	}
	table {
		@apply table-auto w-full relative;
		@apply hidden md:table;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header text-left;
	}

	td {
		@apply py-[clamp(8px,0.5vw,0.5vw)] md:h-[2.38vw] lg:h-[3.5vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] min-w-max;
	}

	.validator-mobile {
		@apply text-sm py-3;
		@apply flex justify-between;
		@apply border-b border-b-color-grey-border-line;
		@apply w-full;
	}

	.mobile-stuff {
		@apply w-full;
		@apply md:hidden;
	}

	.noborder {
		@apply border-transparent;
	}

	.item {
		@apply flex items-center gap-2;
	}

	.left {
		@apply flex flex-col gap-2;
	}

	.button {
		@apply w-full;
		@apply flex justify-center;
		@apply mt-[clamp(14px,1.6vw,1.6vw)];
		@apply transform md:translate-y-[-0.4vw] lg:translate-y-[0];
	}
</style>

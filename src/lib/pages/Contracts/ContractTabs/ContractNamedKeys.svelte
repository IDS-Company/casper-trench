<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let props: {
		namedKeys: any;
	};
	let groupsPerPage: number = 10;
	let namedKeys = props?.namedKeys;
	let displayedNamedKeys = [];
	console.log(namedKeys);
</script>

<div class="delegators-tab">
	<div class="total">
		{groupsPerPage} Groups per page
	</div>
	<table>
		<tr>
			<th class="blocky">Key</th>
			<th>Value</th>
		</tr>
		<div class="divider table-header-border" />
		{#if displayedNamedKeys && displayedNamedKeys.length > 0}
			{#each displayedNamedKeys as namedKey}
				<tr>
					<td class="blocky">
						{namedKey?.name}
					</td>
					<td class="green">
						<a href="/uref/{namedKey?.key}" class="key-item">
							{namedKey?.key}
						</a>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		bind:items={namedKeys}
		bind:pagedItems={displayedNamedKeys}
		bind:itemsPerPage={groupsPerPage}
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,4vw,4vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[clamp(16px,4vw,4vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.key-item {
		@apply cursor-pointer text-color-hover-footer-link hover:text-opacity-70;
	}

	.blocky {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}
</style>

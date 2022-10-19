<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let props: {
		groups: any;
	};
	let groupsPerPage: number = 10;
	let startIndex = 0;
	let groups = props?.groups;
	let displayedGroups = [];
</script>

<div class="delegators-tab">
	<div class="total">
		{groupsPerPage} Groups per page
	</div>
	<table>
		<tr>
			<th class="blocky">Group</th>
			<th>Key</th>
		</tr>
		<div class="divider table-header-border" />
		{#if displayedGroups && displayedGroups.length > 0}
			{#each displayedGroups as group}
				<tr>
					<td class="blocky">
						{group.group}
					</td>
					<td>
						{group.key}
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={groupsPerPage}
		bind:items={groups}
		bind:pagedItems={displayedGroups}
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

	.blocky {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.green {
		@apply text-color-hover-footer-link cursor-pointer;
	}
</style>

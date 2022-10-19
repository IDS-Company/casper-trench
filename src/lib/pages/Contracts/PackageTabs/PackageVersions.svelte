<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let props: {
		versions: any;
	};
	let versionsPerPage: number = 10;
	let versions = props?.versions;
	let displayedVersions = [];
</script>

<div class="delegators-tab">
	<div class="total">
		{versionsPerPage} Versions per page
	</div>
	<table>
		<tr>
			<th class="blocky">Contract Version</th>
			<th>Major Protocol Version</th>
			<th>Contract Version Hash</th>
		</tr>
		<div class="divider table-header-border" />
		{#if displayedVersions && displayedVersions.length > 0}
			{#each displayedVersions as version}
				<tr>
					<td class="blocky">
						{version?.contractVersion}
					</td>
					<td>
						{version?.protocolVersionMajor}
					</td>
					<td
						><a href="/contracts/{version?.contractHash?.replace('contract-', '')}" class="green">
							{version?.contractHash?.replace('contract-', '')}
						</a></td
					>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		bind:itemsPerPage={versionsPerPage}
		bind:pagedItems={displayedVersions}
		bind:items={versions}
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
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.green {
		@apply text-color-hover-footer-link cursor-pointer;
	}
</style>

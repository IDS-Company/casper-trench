<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let props: {
		contractHash: string;
	};
	let versionsPerPage: number = 10;
	let startIndex = 0;
	let versions = [
		{
			version: 2,
			majorProtocolVersion: 1,
			versionHash: '01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071'
		},
		{
			version: 1,
			majorProtocolVersion: 1,
			versionHash: '01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071'
		}
	];
</script>

<div class="delegators-tab">
	<div class="total">
		{versionsPerPage} Versions per page
	</div>
	<table>
		<tr>
			<th class="block">Contract Version</th>
			<th>Major Protocol Version</th>
			<th>Contract Version Hash</th>
		</tr>
		<div class="divider table-header-border" />
		{#if versions && versions.length > 0}
			{#each versions as version}
				<tr>
					<td class="block">
						{version.version}
					</td>
					<td>
						{version.majorProtocolVersion}
					</td>
					<td
						><a href="/contracts/{version.versionHash}" class="green">
							{version.versionHash}
						</a></td
					>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={versionsPerPage}
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

	.green {
		@apply text-color-hover-footer-link cursor-pointer;
	}
</style>

<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import Globe from '$lib/icons/Globe.svelte';
	import { sampleEntryPoints } from '$utils/sampleData';

	export let props: {
		entryPoints: any;
	};
	let groupsPerPage: number = 10;
	let startIndex = 0;
	let entryPoints = props?.entryPoints;
	let displayedEntryPoints = [];
</script>

<div class="delegators-tab">
	<div class="total">
		{groupsPerPage} Groups per page
	</div>
	<table>
		<tr>
			<th class="blocky">Name</th>
			<th>Signature</th>
			<th class="right">Access</th>
			<th class="right">Execution Context</th>
		</tr>
		<div class="divider table-header-border" />
		{#if displayedEntryPoints && displayedEntryPoints.length > 0}
			{#each displayedEntryPoints as entryPoint}
				<tr>
					<td class="blocky">
						{entryPoint?.name}
					</td>
					<td>
						<!-- {#if entryPoints?.args && entryPoints?.args?.length > 0} -->
						({#each entryPoint?.args as arg}
							<span class="data-type">
								{arg.name}
								<span class="green">
									{arg?.clType}
								</span>
							</span>
						{/each}): <span class="data-type green">{entryPoint?.ret}</span>
						<!-- {/if} -->
					</td>
					<td>
						<div class="globe">
							<div class="icon">
								<Globe active={entryPoint?.access?.toLowerCase() === 'public'} />
							</div>
							<div class="text">
								{entryPoint.access}
							</div>
						</div>
					</td>
					<td class="right">
						{entryPoint?.entryPointType}
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		bind:itemsPerPage={groupsPerPage}
		bind:items={entryPoints}
		bind:pagedItems={displayedEntryPoints}
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
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.data-type {
		@apply text-[clamp(12px,0.95vw,0.95vw)];
		@apply bg-color-ago-background;
		@apply p-[clamp(4px,0.3vw,0.3vw)] m-[clamp(4px,0.15vw,0.15vw)];
		@apply max-w-max;
	}

	.globe > .icon {
		@apply h-4 md:w-[0.95vw] md:h-[0.95vw];
	}

	.globe {
		@apply flex items-center gap-[clamp(8px,0.83vw,0.83vw)] justify-end;
	}

	.right {
		@apply text-right;
	}
</style>

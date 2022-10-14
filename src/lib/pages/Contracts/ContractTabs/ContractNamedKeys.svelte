<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let props: {
		contractHash: string;
	};
	let groupsPerPage: number = 10;
	let startIndex = 0;
	let keys = [
			{
			  name: "admins",
			  key: "uref-4bd55dac093587945b9392ac563a3984f0b355f3a7366b2a317d8324037b3709-007"
			},
			{
			  name: "allowances",
			  key: "uref-19dc0cf0accee37fe5aea6e0f041d4bb715b3df55fb9d94fe8ddecdd252eae70-007"
			},
			{
			  name: "balances",
			  key: "uref-f499aeb14e31f773d0f4ab9b57abadf77da8d025c547d1cc314ca3189eaeb586-007"
			},
			{
			  name: "decimals",
			  key: "uref-29484600e70dd2c60b27be8b8af90f4244b5d73ffd6d7320d8b74ab4e5fba5cd-001"
			},
			{
			  name: "name",
			  key: "uref-4460e0d5cf130bc2a03073fd7f29815f69192633fad763031d5b9c7724b31b6f-001"
			},
			{
			  name: "symbol",
			  key: "uref-a6c6c24e9b0317533abb18962ad664eb550087a16862764ddd07c41c37735752-001"
			},
			{
			  name: "total_supply",
			  key: "uref-231b1455f850ccf5770af12ebe32456726573d5cdf1a9f33bd547844a0788de4-003"
			}
		  ],;
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
		{#if keys && keys.length > 0}
			{#each keys as key}
				<tr>
					<td class="blocky">
						{key.name}
					</td>
					<td class='green'>
						<a href="/uref/{key.key}">
                            {key.key}
                        </a>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={groupsPerPage}
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
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.green {
		@apply text-color-hover-footer-link cursor-pointer;
	}
</style>

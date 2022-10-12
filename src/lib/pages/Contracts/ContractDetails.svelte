<script lang="ts">
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { page } from '$app/stores';
	import PackageDeploys from './PackageTabs/PackageDeploys.svelte';
	import ContractsOverview from '$lib/components/Contracts/ContractsOverview.svelte';
	import ContractEntryPoints from './ContractTabs/ContractEntryPoints.svelte';
	import ContractNamedKeys from './ContractTabs/ContractNamedKeys.svelte';

	let menuOptions = [
		{
			title: 'Transactions',
			component: PackageDeploys,
			props: {}
		},
		{
			title: 'Entry Points',
			component: ContractEntryPoints,
			props: {}
		},
        {
			title: 'Named Keys',
			component: ContractNamedKeys,
			props: {}
		},
	];
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">Contract</div>
			</div>
			<div class="value">
				<div class="text">
					{$page.params?.hash}
				</div>
				<div class="copy-icon">
					<CopyIcon text={$page.params?.hash} />
				</div>
			</div>
		</div>
	</div>

	<div class="info">
		<ContractsOverview />
	</div>
	<TabMenu {menuOptions} />
</div>

<style lang="postcss">
	.address {
		@apply text-color-table-header;
	}
	.address > .value {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.address > .title {
		@apply font-bold text-[clamp(16px,1.19vw,1.19vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.address > .value {
		@apply text-[clamp(8px,0.95vw,0.95vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.header {
		@apply flex gap-[clamp(4px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}
</style>

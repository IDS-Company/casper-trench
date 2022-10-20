<script lang="ts">
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { page } from '$app/stores';
	import ContractsPackageOverview from './ContractsPackageOverview.svelte';
	import ContractDeploys from './ContractDeploys.svelte';
	import PackageVersions from './PackageTabs/PackageVersions.svelte';
	import PackageGroups from './PackageTabs/PackageGroups.svelte';
	import type { Contract } from '$utils/types/contract';
	let contract: Contract;
	let menuOptions = [
		{
			title: 'Transactions',
			component: ContractDeploys,
			props: {}
		},
		{
			title: 'Versions',
			component: PackageVersions,
			props: {}
		},
		{
			title: 'Groups',
			component: PackageGroups,
			props: {}
		}
	];
	$: {
		menuOptions[1].props['versions'] = contract?.contractPackage?.versions;
		menuOptions[2].props['groups'] = contract?.contractPackage?.groups;
	}
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">Contract Package</div>
			</div>
			<div class="value">
				<div class="text">
					<div class="md:hidden">
						{$page.params?.hash
							? `${$page.params?.hash.substring(0, 20)}...${$page.params?.hash.substring(
									$page.params?.hash.length - 20
							  )}`
							: ''}
					</div>
					<div class="hidden md:block">
						{$page.params?.hash}
					</div>
				</div>
				<div class="copy-icon">
					<CopyIcon text={$page.params?.hash} />
				</div>
			</div>
		</div>
	</div>

	<div class="info">
		<ContractsPackageOverview bind:contract />
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
		@apply font-bold text-[clamp(14px,1.19vw,1.19vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.address > .value {
		@apply text-[clamp(12px,0.95vw,0.95vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.header {
		@apply flex items-center md:items-start gap-[clamp(12px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}
</style>

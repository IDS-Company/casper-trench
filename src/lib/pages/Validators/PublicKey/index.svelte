<script lang="ts">
	import DelegatorsTab from '$lib/components/Validators/DelegatorsTab.svelte';
	import StatisticsCard from '$lib/components/Validators/StatisticsCard.svelte';
	import ValidatorCard from '$lib/components/Validators/ValidatorCard.svelte';
	import VerifiedBlocksTab from '$lib/components/Validators/VerifiedBlocksTab.svelte';
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import type { Bid } from '$utils/types/validator';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getValidator, getValidatorDelegators } from '$utils/api';
	import Button from '$lib/components/Reusables/Button.svelte';

	let delegators: {
		publicKey: string;
		stakedAmount: number;
		bondingPurse: string;
		delegatee: string;
		rank?: number;
	}[] = [];

	let validator: Bid;
	let menuOptions = [
		{
			title: 'Delegators',
			component: DelegatorsTab,
			props: { delegators }
		},
		{
			title: 'Verified Blocks',
			component: VerifiedBlocksTab,
			props: { validatorPublicKey: $page.params.public_key }
		}
	];

	onMount(async () => {
		$isLoading = true;
		validator = await getValidator($page.params.public_key);
		delegators = await getValidatorDelegators($page.params.public_key);
		menuOptions[0].props.delegators = delegators && delegators;
		menuOptions[0].props.delegators.unshift({
			publicKey: validator.publicKey,
			stakedAmount: validator.selfStake,
			bondingPurse: '',
			delegatee: ''
		});
		menuOptions[0].props['totalStake'] = validator && validator.totalBid;
		menuOptions[0].props['validatorPublicKey'] = validator && validator.publicKey;
		$isLoading = false;
	});
</script>

<div class="main">
	{#if validator}
		<div class="buttons">
			<Button outline>Delegate</Button>
			<Button red>Undelegate</Button>
		</div>
		<div class="header-content">
			<!-- <ValidatorCard {validator} /> -->
			<StatisticsCard {validator} />
		</div>
		{#if validator && delegators?.length > 0}
			<TabMenu {menuOptions} />
		{/if}
	{/if}
</div>

<style lang="postcss">
	.header-content {
		/* @apply flex flex-col md:flex-row gap-y-[clamp(10px,1vw,1vw)] justify-between; */
		@apply mb-[3.51vw];
	}

	.buttons {
		@apply hidden;
		/* @apply flex items-center justify-center md:justify-start gap-[clamp(16px,1.5vw,1.5vw)] flex-row; */
		@apply mb-[3.51vw];
	}
</style>

<script lang="ts">
	import Switch from '$lib/components/Reusables/Switch.svelte';
	import type { Bid } from '$utils/types/validator';
	import { bidValidators, currentPage, eraValidators, showSwitch } from '$stores/validatorsSwitch';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isLoading } from '$stores/loading';
	import { getBids, getCurrentEraValidators, getNextEraValidators } from '$utils/api';

	let currentEraValidators: Partial<Bid[]> = [];
	let nextEraValidators: Partial<Bid[]> = [];

	let pageOptions: { name: string; dropdown?: string[]; selectedDropdown?: string }[] = [
		{
			name: 'Validators',
			dropdown: [],
			selectedDropdown: ''
		},
		{
			name: 'Validator Auction',
			dropdown: [],
			selectedDropdown: ''
		}
	];

    onMount(async () => {
		$isLoading = true;
		$bidValidators = await getBids();
		currentEraValidators = await getCurrentEraValidators();
		nextEraValidators = await getNextEraValidators();
		currentEraValidators?.forEach((validator) => {
			validator.performance = $bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).performance;
			validator.information = $bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).information;
		});
		nextEraValidators?.forEach((validator) => {
			validator.performance = $bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).performance;
			validator.information = $bidValidators?.find(
				(bid) => bid.publicKey === validator.publicKey
			).information;
		});
		$eraValidators = currentEraValidators;
		if (pageOptions) {
			pageOptions[0].dropdown[0] = `Current Era ${currentEraValidators[0]?.eraId}`;
			pageOptions[0].dropdown[1] = `Next Era ${nextEraValidators[0]?.eraId}`;
		}
		$isLoading = false;
	});
</script>

{#if $showSwitch}
	<div class="content">
		<Switch
			options={pageOptions}
			bind:selected={$currentPage}
			outlined
            on:switched={e => {
                if (e.detail.optionIndex === 1) {
					goto('/validators/auction');
					return;
				}
            }}
			on:dropdown-option-clicked={(e) => {				
				if (e.detail.dropdownIndex === 0) {
					$eraValidators = currentEraValidators && currentEraValidators;
				} else {
					$eraValidators = nextEraValidators && nextEraValidators;
				}
				goto('/validators');
			}}
		/>

		<slot />
	</div>
{:else}
	<slot />
{/if}

<style lang="postcss">
	.content {
		@apply flex flex-col gap-[3.21vw];
	}
</style>

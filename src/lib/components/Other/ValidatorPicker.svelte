<script lang="ts">
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { isLoading } from '$stores/loading';
	import { getCurrentEraValidators } from '$utils/api';
	import type { Bid } from '$utils/types/validator';
	import { createEventDispatcher, onMount } from 'svelte';
	import Hash from '../TableData/Hash.svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let editValidator = true;
	let availableValidators: Partial<Bid[]> = [];
	let validatorPublicKey = '';
	let selectedValidator = -1;
	let noValidators = false;
	let error = '';

	$: if (!validatorPublicKey) {
		validatorPublicKey = '';
	} else {
		noValidators = true;
		availableValidators.forEach((validator) => {
			if (validator.publicKey.toLowerCase().includes(validatorPublicKey.toLowerCase())) {
				noValidators = false;
			}
		});
	}

	onMount(async () => {
		$isLoading = true;
		availableValidators = await getCurrentEraValidators();
		$isLoading = false;
	});
</script>

{#if editValidator}
	<div class="relative">
		<div class="input-wrapper">
			<div class="top">Validator</div>
			<div class="input">
				<input
					type="text"
					bind:value={validatorPublicKey}
					placeholder="Enter address or contract"
				/>
			</div>
		</div>
		{#if validatorPublicKey.length > 2}
			<div class="dropdown">
				{#if !noValidators}
					<table>
						<tr class="hidden md:table-row">
							<th class="text-left">Validator</th>
							<th class="text-right">Fee</th>
							<th class="text-right">Total stake (self stake $)</th>
						</tr>
						<tr class="md:hidden">
							<th class="text-left">Validator</th>
							<th class="text-right">Fee</th>
							<th class="text-right">Self stake</th>
						</tr>
						{#each availableValidators as validator, i}
							{#if validator.publicKey
								.toLowerCase()
								.includes(validatorPublicKey.toLowerCase()) && validatorPublicKey.length > 2}
								<tr
									class="cursor-pointer value validator-display mb-[clamp(4px,0.48vw,0.48vw)]"
									transition:slide
									on:click={() => {
										selectedValidator = i;
										editValidator = false;
										dispatch('select', availableValidators[selectedValidator]);
									}}
								>
									<td>
										<div class="validator-hash">
											{#if validator?.information?.icon}
												<img
													src={validator?.information?.icon ||
														'/images/png/validator-placeholder.png'}
													alt="validator"
												/>
											{/if}
											<div class="hidden md:block">
												<Hash color="black" noOfCharacters={10} hash={validator.publicKey || ''} />
											</div>
											<div class="md:hidden">
												<Hash color="black" noOfCharacters={4} hash={validator.publicKey || ''} />
											</div>
										</div>
									</td>
									<td class="hidden md:table-cell">
										<div class="validator-cspr">
											<div class="cspr">
												<span class="cspr-fee"
													>{validator.delegationRate && validator.delegationRate}%</span
												>
											</div>
											<div class="perc">
												({validator.numOfDelegators &&
													validator.numOfDelegators.toLocaleString('en')}
												delegators)
											</div>
										</div>
									</td>
									<td class="hidden md:table-cell">
										<div class="validator-cspr">
											<div class="cspr">
												<span class="cspr-fee"
													>{validator.totalBid && validator.totalBid.toFixed(5)}</span
												> CSPR
											</div>
											<div class="perc">
												({validator.selfStakePercentage &&
													validator.selfStakePercentage.toFixed(2)}%)
											</div>
										</div>
									</td>
									<td class="md:hidden">
										<div class="validator-cspr w-full">
											<div class="cspr">
												<span class="cspr-fee"
													>{validator.delegationRate && validator.delegationRate}%</span
												>
											</div>
											<div class="perc">
												({validator.numOfDelegators &&
													validator.numOfDelegators.toLocaleString('en')}
												delegators)
											</div>
										</div>
									</td>
									<td class="md:hidden">
										<div class="validator-cspr w-full">
											<div class="cspr">
												<span class="cspr-fee"
													>{validator.totalBid &&
														Number(validator.totalBid.toFixed(2)).toLocaleString()}</span
												> CSPR
											</div>
											<div class="perc">
												({validator.selfStakePercentage &&
													validator.selfStakePercentage.toFixed(2)}%)
											</div>
										</div>
									</td>
								</tr>
							{/if}
						{/each}
					</table>
				{:else}
					<div class="grey">No Validators</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="sender">
		<div class="top">
			<div>Validator</div>
		</div>
		<div
			class="value validator-display mb-[clamp(16px,1.9vw,1.9vw)] vali-border"
			class:error
			on:click={() => {
				editValidator = true;
			}}
		>
			<div class="flex items-center justify-between">
				<div class="validator-hash">
					{#if availableValidators[selectedValidator]?.information?.icon}
						<img
							src={availableValidators[selectedValidator]?.information?.icon ||
								'/images/png/validator-placeholder.png'}
							alt="validator"
						/>
					{/if}
					<div class="hidden md:block">
						<Hash
							color="black"
							noOfCharacters={10}
							hash={availableValidators[selectedValidator].publicKey || ''}
						/>
					</div>
					<div class="md:hidden">
						<Hash
							color="black"
							noOfCharacters={16}
							hash={availableValidators[selectedValidator].publicKey || ''}
						/>
					</div>
					<div class="copy-icon">
						{#if availableValidators[selectedValidator].publicKey}
							<CopyIcon text={availableValidators[selectedValidator].publicKey || ''} />
						{/if}
					</div>
				</div>
				<div class="validator-cspr hidden md:block">
					<div class="cspr">
						<span class="cspr-fee"
							>{availableValidators[selectedValidator].delegationRate &&
								availableValidators[selectedValidator].delegationRate}%</span
						>
					</div>
					<div class="perc">
						({availableValidators[selectedValidator].numOfDelegators.toLocaleString('en')} delegators)
					</div>
				</div>
				<div class="validator-cspr hidden md:block">
					<div class="cspr">
						<span class="cspr-fee"
							>{availableValidators[selectedValidator].totalBid &&
								availableValidators[selectedValidator].totalBid.toFixed(5)}</span
						> CSPR
					</div>
					<div class="perc">
						({availableValidators[selectedValidator].selfStakePercentage &&
							availableValidators[selectedValidator].selfStakePercentage.toFixed(2)}%)
					</div>
				</div>
			</div>
			<div class="flex md:hidden w-full">
				<div class="validator-cspr w-full">
					<div class="cspr">
						<span class="cspr-fee"
							>{availableValidators[selectedValidator].delegationRate &&
								availableValidators[selectedValidator].delegationRate}%</span
						>
					</div>
					<div class="perc">
						({availableValidators[selectedValidator].numOfDelegators.toLocaleString('en')} delegators)
					</div>
				</div>
				<div class="validator-cspr w-full">
					<div class="cspr">
						<span class="cspr-fee"
							>{availableValidators[selectedValidator].totalBid &&
								availableValidators[selectedValidator].totalBid.toFixed(5)}</span
						> CSPR
					</div>
					<div class="perc">
						({availableValidators[selectedValidator].selfStakePercentage &&
							availableValidators[selectedValidator].selfStakePercentage.toFixed(2)}%)
					</div>
				</div>
			</div>
		</div>
		{#if error}
			<div class="error-msg">
				{error}
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.copy-icon {
		@apply w-[clamp(16px,2vw,2vw)] h-[clamp(16px,2vw,2vw)];
	}

	.top {
		@apply flex justify-between items-center;
		@apply mb-[clamp(4px,0.6vw,0.6vw)];
		@apply text-color-black-text text-[clamp(14px,1.07vw,1.07vw)];
	}

	.value {
		@apply bg-color-sender-background;
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(12px,0.77vw,0.77vw)];
	}

	.validator-display {
		@apply bg-white;
	}

	.validator-hash {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.validator-hash > img {
		@apply rounded-full;
		@apply h-5 md:h-full;
	}

	.input > input {
		@apply outline-none;
		@apply w-[90%];
	}

	.cspr {
		@apply text-color-grey-footer-label;
	}

	.cspr {
		@apply text-[clamp(10px,0.71vw,0.71vw)] leading-none;
		@apply flex items-center justify-end gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.cspr-fee {
		@apply text-color-table-header text-[clamp(14px,1.07vw,1.07vw)];
	}

	.input {
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-black-text;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply flex items-center justify-between;
		@apply mb-[clamp(4px,0.71vw,0.71vw)];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-input-border;
	}

	.perc {
		@apply text-[clamp(12px,0.83vw,0.83vw)] text-right;
	}

	.dropdown {
		@apply bg-white absolute w-full z-50;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply border-color-sender-background border-[clamp(1px,0.12vw,0.12vw)];
		@apply shadow-[0px_0px_11px_0px_rgba(0,0,0,0.1)];
		@apply p-[clamp(8px,1.71vw,1.71vw)];
	}

	table {
		@apply w-full;
	}

	th {
		@apply text-[clamp(14px,1.07vw,1.07vw)];
		@apply pb-[clamp(12px,0.71vw,0.71vw)];
	}

	td {
		@apply py-[clamp(12px,0.71vw,0.71vw)];
	}

	.vali-border {
		@apply border-color-sender-background border-[clamp(1px,0.12vw,0.12vw)];
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
	}

	.error {
		@apply border-color-arcadia-red;
	}

	.error-msg {
		@apply text-color-arcadia-red text-[clamp(12px,0.95vw,0.95vw)];
	}
</style>

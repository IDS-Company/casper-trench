<script lang="ts">
	import TreeToggle from '$lib/components/Reusables/TreeToggle.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { getUref } from '$utils/api';
	import { notifySuccess } from '$utils/toast';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { isLoading } from '$stores/loading';
	let uref: {
		CLValue?: {
			cl_type: string;
			bytes: string;
			parsed: number;
		};
	};
	let showRawData = false;
	onMount(async () => {
		$isLoading = true;
		uref = await getUref($page.params.uref);
		$isLoading = false;
	});
</script>

<div class="overview">
	<div class="title">UREF OVERVIEW</div>
	<div class="extras">
		<table>
			{#if uref?.CLValue?.cl_type === 'Unit'}
				<tr>
					<td class="label">Type</td>
					<td class="value">This URef is used as an access token or reference to a dictionary. </td>
				</tr>
			{:else if uref?.CLValue}
				<tr>
					<td class="label">Type</td>
					<td class="value">
						{uref?.CLValue?.cl_type}
					</td>
				</tr>
				<tr>
					<td class="label">Value</td>
					<td class="value">
						{uref?.CLValue?.parsed}
					</td>
				</tr>
			{/if}

			{#if uref?.CLValue}
				<tr>
					<td class="label">Raw Data</td>
					<td class="value">
						<div class="raw-buttons">
							<div
								class="proofs-button green"
								on:click={() => {
									showRawData = !showRawData;
								}}
							>
								<div class="text">Show</div>
								<div class="eye-icon">
									{#if !showRawData}
										<div transition:slide>
											<EyeIcon />
										</div>
									{:else}
										<div transition:slide>
											<CrossedEyeIcon />
										</div>
									{/if}
								</div>
							</div>
							{#if showRawData}
								<button
									type="button"
									on:click={() => {
										navigator.clipboard &&
											navigator.clipboard.writeText(JSON.stringify(uref, null, 2));
										notifySuccess('Copied');
									}}
									class="copy-button"
								>
									<div class="text">Copy</div>
									<div class="copy-icon">
										<CopyIcon />
									</div>
								</button>
							{/if}
						</div>
						{#if uref && showRawData}
							<div class="raw-data hidden md:block" transition:slide>
								<TreeToggle text="" data={uref} />
							</div>
						{/if}
					</td>
				</tr>
			{/if}
		</table>
		{#if uref && showRawData}
			<div class="raw-data md:hidden" transition:slide>
				<TreeToggle text="" data={uref} />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.overview {
		@apply pt-[clamp(16px,1.73vw,1.73vw)] pb-[clamp(16px,2.08vw,2.08vw)] pl-[clamp(16px,1.43vw,1.43vw)] pr-[clamp(16px,1.90vw,1.90vw)];
		@apply w-full;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[clamp(14px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply w-[clamp(80px,10.83vw,10.83vw)] md:min-w-[10.83vw];
	}

	.value {
		@apply text-[clamp(14px,0.95vw,0.95vw)] text-color-table-header;
	}

	td {
		@apply pb-[clamp(4px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(16px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}

	.raw-data {
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply p-[clamp(16px,1.43vw,1.43vw)];
		@apply mt-[clamp(8px,0.2vw,0.2vw)];
		@apply max-h-[clamp(300px,40vw,40vw)] overflow-y-auto;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply text-[clamp(14px,1.07vw,1.07vw)];
	}

	.raw-buttons {
		@apply flex gap-[clamp(4px,0.54vw,0.54vw)];
	}

	.copy-button {
		@apply flex items-center;
		@apply pl-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-copy-btn-bg;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
		@apply min-h-[2.4vw] h-full;
	}

	.eye-icon {
		@apply w-[16px] md:w-[1.19vw];
	}

	.copy-icon {
		@apply w-[20px] md:w-[1.19vw];
	}

	.proofs-button {
		@apply flex items-center gap-[clamp(8px,0.3vw,0.3vw)];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}
</style>

<script lang="ts">
	import TreeToggle from '$lib/components/Reusables/TreeToggle.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { sampleJsonData } from '$utils/sampleData';
    import { slide } from 'svelte/transition';

	export let type = 'This URef is used as an access token or reference to a dictionary.';
    export let jsonData = sampleJsonData;

	let showRawData = false;
</script>

<div class="overview">
	<div class="title">UREF OVERVIEW</div>
	<div class="extras">
		<table>
			{#if type}
				<tr>
					<td class="label">Type</td>
					<td class="value">
						{type}
					</td>
				</tr>
			{/if}
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
                                        navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
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
                    {#if jsonData && showRawData}
                        <div class="raw-data" transition:slide>
                            <TreeToggle text="" data={jsonData} />
                        </div>
                    {/if}
				</td>
			</tr>
		</table>
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
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[10.83vw];
	}

	.value {
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-table-header;
	}

	td {
		@apply pb-[clamp(4px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(12px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}

    .raw-data {
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply p-[clamp(16px,1.43vw,1.43vw)];
        @apply mt-[0.2vw];
		@apply md:max-h-[40vw] overflow-y-auto;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
	}

	.raw-buttons {
		@apply flex items-center gap-[clamp(4px,0.54vw,0.54vw)];
	}

	.copy-button {
		@apply flex items-center;
		@apply pl-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-copy-btn-bg;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
		@apply min-h-[2.4vw];
	}

	.eye-icon {
		@apply w-[1.19vh] md:w-[1.19vw];
	}

    .proofs-button {
		@apply flex items-center gap-[0.3vw];
		@apply px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
		@apply min-h-[2.4vw];
	}
</style>

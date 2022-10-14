<script lang="ts">
	import TreeToggle from '$lib/components/Reusables/TreeToggle.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import { sampleJsonData } from '$utils/sampleData';
	import { slide } from 'svelte/transition';

	export let accessKey =
		'uref-be3a9a586b10eba01dc1392bcef73139ea2482be3af469eca12c5ae91a7ed6b4-007';
	export let timestamp = '2021-03-31T15:00:40.000Z';
	export let owner = '01d29b3abef3b25d4f43519bfaef6b6ec71cd9f115fcdb005bb287f54f67c57071';
	export let name = 'Swappery Token';
	export let type = 'ERC-20';
	export let jsonData = sampleJsonData;

	const timestampDate = new Date(timestamp);
	let showRawData = false;
</script>

<div class="overview">
	<div class="title">CONTRACT OVERVIEW</div>
	<div class="extras hidden md:block">
		<table>
			<tr>
				<td class="label">Access Key</td>
				<td class="value">
					<a href="/uref/{accessKey}">
						<Hash hash={accessKey} noOfCharacters={50} start />
					</a>
				</td>
			</tr>
			{#if name}
				<tr>
					<td class="label">Name</td>
					<td class="value">
						{name}
					</td>
				</tr>
			{/if}
			{#if owner}
				<tr>
					<td class="label">Owner Public Key</td>
					<td class="value">
						<a href="/accounts/{owner}">
							<Validator
								imgUrl={''}
								name={''}
								hash={owner}
								notValidator
								start
								noOfCharacters={45}
							/>
						</a>
					</td>
				</tr>
			{/if}
			{#if type}
				<tr>
					<td class="label">Type</td>
					<td class="value">
						{type}
					</td>
				</tr>
			{/if}
			<tr>
				<td class="label">Timestamp</td>
				<td class="value">
					<div class="time">{timestampDate}</div>
					<div class="ago">
						{`${timeAgo(millisToFormat(Date.now() - timestampDate.getTime()))} ago`}
					</div>
				</td>
			</tr>
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
	<div class="md:hidden">
		<div class="flex justify-between mb-2">
			<div class="label">Access Key</div>
			<div class="value flex items-center gap-2 hash">
				<div class="text">
					<a href="/uref/{accessKey}">
						{`${accessKey.substring(0, 8)}...${accessKey.substring(accessKey.length - 8)}`}
					</a>
				</div>
				{#if accessKey}
					<div class="copy-icon">
						<CopyIcon text={accessKey} />
					</div>
				{/if}
			</div>
		</div>
		{#if name}
			<div class="flex justify-between mb-2">
				<div class="label">Name</div>
				<div class="value">
					{name}
				</div>
			</div>
		{/if}
		{#if owner}
			<div class="flex justify-between mb-2">
				<div class="label">Owner Public Key</div>
				<div class="value flex items-center gap-2 hash">
					<a href="/accounts/{owner}">
						{`${owner.substring(0, 8)}...${owner.substring(owner.length - 8)}`}
					</a>
					{#if accessKey}
						<div class="copy-icon">
							<CopyIcon text={accessKey} />
						</div>
					{/if}
				</div>
			</div>
		{/if}
		{#if type}
			<div class="flex justify-between mb-2">
				<div class="label">Type</div>
				<div class="value">
					{type}
				</div>
			</div>
		{/if}
		<div class="flex justify-between">
			<div class="label">Timestamp</div>
			<div class="value">
				<div class="time">{timestampDate}</div>
				<div class="ago">
					{`${timeAgo(
						millisToFormat(Date.now() - timestampDate.getTime())
					)} ago`}
				</div>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="label mb-1">Raw Data</div>
			<div class="value">
				<div
					class="proofs-button green"
					on:click={() => {
						showRawData = !showRawData;
					}}
				>
					<div class="text">
						{#if !showRawData}
							Show
						{:else}
							Hide
						{/if}
					</div>
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
			</div>
		</div>
		{#if showRawData}
			<div class="raw-data" transition:slide>
				<TreeToggle text="" data={jsonData} />
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
		@apply md:w-[10.83vw];
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
		@apply md:max-h-[40vw] overflow-y-auto;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply text-[clamp(14px,1.07vw,1.07vw)];
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
		@apply w-[16px] md:w-[1.19vw];
	}

	.copy-icon {
		@apply w-[20px] md:w-[1.19vw];
	}

	.proofs-button {
		@apply flex items-center gap-[0.3vw];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.time {
		@apply max-w-[175px] md:max-w-none;
	}

	.ago {
		@apply text-[clamp(10px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply bg-color-ago-background;
		@apply p-[clamp(4px,0.3vw,0.3vw)];
		@apply max-w-max;
	}
</style>

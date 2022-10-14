<script lang="ts">
	import { slide } from 'svelte/transition';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import VerifiedIcon from '$lib/icons/VerifiedIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import TransactionDetailsSuccessIcon from '$lib/icons/TransactionDetailsSuccessIcon.svelte';
	import {
		getValidatorDetails,
		millisToFormat,
		parseStringValue,
		timeAgo
	} from '$utils/converters';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import TreeToggle from '$lib/components/Reusables/TreeToggle.svelte';
	import { onMount } from 'svelte';
	import { isLoading } from '$stores/loading';
	import { getDeploy } from '$utils/api';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let showRawData = false;
	let deployResult;
	let toDownload;
	let verified = false;

	onMount(async () => {
		$isLoading = true;
		deployResult = await getDeploy($page.params.hash);
		$isLoading = false;
	});
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
		integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
</svelte:head>

<div class="transaction-details">
	<div class="top">
		<span
			class="green cursor-pointer"
			on:click={() => {
				goto('/transactions');
			}}>Transactions</span
		> / Transaction Details
	</div>
	{#if deployResult}
		<div class="wrapper" bind:this={toDownload}>
			<button
				class="download-button"
				type="button"
				on:click={() => {
					var opt = {
						margin: 1,
						filename: `${deployResult?.deploy.hash}.pdf`,
						image: { type: 'jpeg', quality: 1 },
						html2canvas: { scale: 2, width: '2800', height: '1920' },
						jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' }
					};

					// New Promise-based usage:
					html2pdf().set(opt).from(toDownload).save();
				}}
			>
				<DownloadIcon />
			</button>

			<div class="status">
				<div class="icon">
					{#if deployResult?.deploy?.approvals?.length > 0}
						<TransactionDetailsSuccessIcon />
					{:else}
						<!-- TODO Fail Icon -->
					{/if}
				</div>
				<div class="status-text" class:success={deployResult?.deploy?.approvals?.length > 0}>
					{#if deployResult?.deploy?.session.StoredContractByHash}
						{deployResult?.deploy?.session.StoredContractByHash.entry_point}
					{:else if deployResult.deploy?.session?.Transfer}
						Transfer
					{:else if deployResult.deploy?.session?.ModuleBytes}
						Deploy
					{/if} SUCCESS
				</div>
				<div class="amount">
					<div class="value">
						{parseStringValue(
							deployResult?.deploy?.session.StoredContractByHash?.args[2][1].parsed ||
								deployResult.deploy?.session?.Transfer?.args[0]?.[1]?.parsed ||
								deployResult.deploy?.session?.ModuleBytes?.args[0]?.[1]?.parsed ||
								0
						).toLocaleString('en')}
					</div>
					<div class="cspr">CSPR</div>
				</div>
			</div>

			<div class="details">
				<table class="extras hidden md:block">
					<tr>
						<td class="label">Transaction Hash</td>
						<td class="value">{deployResult?.deploy?.hash}</td>
					</tr>

					<tr>
						<td class="label">Block Hash</td>
						<td class="value green">{deployResult?.execution_results[0]?.block_hash}</td>
						<!-- TODO remove placeholder -->
						<!-- <PlaceHolderIndicator /> -->
					</tr>

					<tr>
						<td class="label">Timestamp</td>
						<td class="value">
							<div class="time">{new Date(deployResult?.deploy?.header?.timestamp)}</div>
							<div class="ago">
								{`${timeAgo(
									millisToFormat(Date.now() - Date.parse(deployResult?.deploy?.header?.timestamp))
								)} ago`}
							</div>
						</td>
					</tr>

					<tr>
						<td class="label">From (Public Key)</td>
						<td class="value">
							{#await getValidatorDetails(deployResult?.deploy?.header?.account)}
								<div class="validator validator-placeholder" />
							{:then validator}
								<div class="validator">
									<div class="logo">
										{#if validator?.name}
											<img src={validator?.icon} alt="validator-icon" />
										{:else}
											<div class="image-placeholder">
												<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
											</div>
										{/if}
									</div>
									<div class="dets">
										<div class="name {validator?.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
											<div class="text">
												{validator?.name || ''}
											</div>
											{#if verified}
												<div class="verified-icon">
													<VerifiedIcon />
												</div>
											{/if}
										</div>
										<div class="hash">
											<a href="/validators/{deployResult?.deploy?.header?.account}">
												{deployResult?.deploy?.header?.account}
											</a>
											<div>
												<CopyIcon text={deployResult?.deploy?.header?.account} />
											</div>
										</div>
									</div>
								</div>
							{/await}
						</td>
					</tr>

					<tr>
						<td class="label">To (Public Key)</td>
						<td class="value">
							{#if deployResult?.deploy?.session?.Transfer}
								{#await getValidatorDetails(deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed)}
									<div class="validator validator-placeholder" />
								{:then validator}
									<div class="validator">
										<div class="logo">
											{#if validator?.icon}
												<img src={validator?.icon} alt="validator-icon" />
											{:else}
												<div class="image-placeholder">
													<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
												</div>
											{/if}
										</div>
										<div class="dets">
											<div class="name {validator?.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
												<div class="text">
													{validator?.name || ''}
												</div>
												{#if verified}
													<div class="verified-icon">
														<VerifiedIcon />
													</div>
												{/if}
											</div>
											<div class="hash">
												<a
													href="/validators/{deployResult?.deploy?.session?.Transfer?.args[1]?.[1]
														?.parsed}"
												>
													{deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed}</a
												>
												<div>
													<CopyIcon
														text={deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed}
													/>
												</div>
											</div>
										</div>
									</div>
								{/await}
							{:else}
								<!-- <div class="px-[clamp(5px)]">Contract</div> -->
								<div class="contract-placeholder">Contract</div>
							{/if}
						</td>
					</tr>

					<tr>
						<td class="label">Value</td>
						<td class="value">
							<!-- deployResult?.deploy?.session.StoredContractByHash?.args[2][1].parsed) || -->
							<BalanceTransferrable
								cspr={parseStringValue(
									deployResult?.deploy?.session.StoredContractByHash?.args[2][1].parsed ||
										deployResult?.deploy?.session?.Transfer?.args[0]?.[1]?.parsed ||
										deployResult.deploy?.session?.ModuleBytes?.args[7]?.[1]?.parsed ||
										0
								)}
							/></td
						>
					</tr>

					<tr>
						<td class="label">Transaction Fee</td>
						<td class="value"
							><BalanceTransferrable
								cspr={parseStringValue(deployResult?.execution_results[0].result.Success.cost)}
							/></td
						>
					</tr>

					<tr>
						<td class="label">Gas Price</td>
						<td class="value">{deployResult?.deploy?.header?.gas_price} motes</td>
					</tr>

					<tr>
						<td class="label">TTL</td>
						<td class="value">{deployResult?.deploy?.header?.ttl}</td>
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
												navigator.clipboard.writeText(JSON.stringify(deployResult, null, 2));
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
							{#if deployResult && showRawData}
								<div class="raw-data" transition:slide>
									<TreeToggle text="" data={deployResult} />
								</div>
							{/if}
						</td>
					</tr>
				</table>
			</div>
			<div class="mobile-stuff">
				<div class="label mb-1">Transaction Hash</div>
				<div class="value mb-4">
					<div class="flex gap-4">
						<div class="text">
							{`${deployResult?.deploy?.hash.substring(
								0,
								16
							)}...${deployResult?.deploy?.hash.substring(deployResult?.deploy?.hash.length - 16)}`}
						</div>
						<div class="copy-icon">
							<CopyIcon text={deployResult?.deploy?.hash} />
						</div>
					</div>
				</div>
				<div class="label mb-1">Block Hash</div>
				<div class="value mb-4">
					<div class="flex gap-4">
						<div class="text">
							{`${deployResult?.execution_results[0]?.block_hash.substring(
								0,
								16
							)}...${deployResult?.execution_results[0]?.block_hash.substring(
								deployResult?.execution_results[0]?.block_hash.length - 16
							)}`}
						</div>
						<div class="copy-icon">
							<CopyIcon text={deployResult?.execution_results[0]?.block_hash} />
						</div>
					</div>
				</div>
				<div class="flex justify-between">
					<div class="label mb-1">Timestamp</div>
					<div class="value mb-4">
						<div class="time">{new Date(deployResult?.deploy?.header?.timestamp)}</div>
						<div class="ago">
							{`${timeAgo(
								millisToFormat(Date.now() - Date.parse(deployResult?.deploy?.header?.timestamp))
							)} ago`}
						</div>
					</div>
				</div>
				<div class="label mb-1">From (Public Key)</div>
				<div class="value mb-4">
					{#await getValidatorDetails(deployResult?.deploy?.header?.account)}
						<div class="validator validator-placeholder" />
					{:then validator}
						<div class="validator">
							<div class="logo">
								{#if validator?.icon}
									<img src={validator?.icon} alt="validator-icon" />
								{:else}
									<div class="image-placeholder">
										<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
									</div>
								{/if}
							</div>
							<div class="dets">
								<div class="name {validator?.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
									<div class="text">
										{validator?.name || ''}
									</div>
									{#if verified}
										<div class="verified-icon">
											<VerifiedIcon />
										</div>
									{/if}
								</div>
								<div class="hash">
									<a href="/validators/{deployResult?.deploy?.header?.account}">
										{`${deployResult?.deploy?.header?.account.substring(
											0,
											16
										)}...${deployResult?.deploy?.header?.account.substring(
											deployResult?.deploy?.header?.account.length - 16
										)}`}
									</a>
								</div>
							</div>
						</div>
					{/await}
				</div>
				<div class="label mb-1">To (Public Key)</div>
				{#if deployResult?.deploy?.session?.Transfer}
					<div class="value mb-4">
						{#await getValidatorDetails(deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed)}
							<div class="validator validator-placeholder" />
						{:then validator}
							<div class="validator">
								<div class="logo">
									{#if validator?.icon}
										<img src={validator?.icon} alt="validator-icon" />
									{:else}
										<div class="image-placeholder">
											<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
										</div>
									{/if}
								</div>
								<div class="dets">
									<div class="name {validator?.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
										<div class="text">
											{validator?.name || ''}
										</div>
										{#if verified}
											<div class="verified-icon">
												<VerifiedIcon />
											</div>
										{/if}
									</div>
									<div class="hash">
										<a
											href="/validators/{deployResult?.deploy?.session?.Transfer?.args[1]?.[1]
												?.parsed}"
										>
											{`${deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed.substring(
												0,
												16
											)}...${deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed.substring(
												deployResult?.deploy?.session?.Transfer?.args[1]?.[1]?.parsed.length - 16
											)}`}
										</a>
									</div>
								</div>
							</div>
						{/await}
					</div>
				{/if}
				<div class="flex justify-between">
					<div class="label mb-1">Value</div>
					<div class="value mb-4">
						<BalanceTransferrable
							cspr={parseStringValue(
								deployResult?.deploy?.session.StoredContractByHash?.args[2][1].parsed ||
									deployResult?.deploy?.session?.Transfer?.args[0]?.[1]?.parsed ||
									deployResult.deploy?.session?.ModuleBytes?.args[7]?.[1]?.parsed ||
									0
							)}
						/>
					</div>
				</div>
				<div class="flex justify-between">
					<div class="label mb-1">Transaction Fee</div>
					<div class="value mb-4">
						<BalanceTransferrable
							cspr={parseStringValue(deployResult?.execution_results[0].result.Success.cost)}
						/>
					</div>
				</div>
				<div class="flex justify-between">
					<div class="label mb-1">Gas Price</div>
					<div class="value mb-4">
						{deployResult?.deploy?.header?.gas_price} motes
					</div>
				</div>
				<div class="flex justify-between">
					<div class="label mb-1">TTL</div>
					<div class="value mb-4">
						{deployResult?.deploy?.header?.ttl}
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
				{#if deployResult && showRawData}
					<div class="raw-data" transition:slide>
						<TreeToggle text="" data={deployResult} />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.transaction-details {
		@apply text-color-table-header text-[clamp(12px,1.07vw,1.07vw)];
	}

	.top {
		@apply mb-[clamp(8px,1.43vw,1.43vw)];
		@apply hidden md:block;
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.wrapper {
		@apply md:w-[82.2vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply px-[clamp(16px,2.38vw,2.38vw)] py-[clamp(16px,2.38vw,2.38vw)] mx-auto;
		@apply relative;
		@apply text-color-table-header;
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.download-button {
		@apply absolute top-[clamp(16px,1.79vw,1.79vw)] right-[clamp(16px,2.38vw,2.38vw)];
		@apply w-[clamp(20px,2.86vw,2.86vw)];
		@apply cursor-pointer;
		@apply hidden md:block;
	}

	.mobile-stuff {
		@apply md:hidden w-full;
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.label {
		@apply font-bold text-[clamp(14px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:min-w-[14.11vw];
	}

	.value {
		@apply text-[clamp(14px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[0.24vw];
	}

	td {
		@apply pb-[clamp(16px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.ago {
		@apply text-[clamp(10px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply bg-color-ago-background;
		@apply p-[clamp(4px,0.3vw,0.3vw)];
		@apply max-w-max;
	}

	.validator {
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply p-[clamp(16px,1.19vw,1.19vw)];
		@apply rounded-[0.6vh] md:rounded-[0.6vw];
		@apply flex items-center gap-[clamp(8px,0.71vw,0.71vw)];
	}
	.validator-placeholder {
		@apply animate-pulse;
		@apply bg-gradient-to-tr from-gray-100 to-gray-50;
		@apply h-[clamp(16px,1.19vw,1.19vw)];
	}

	.contract-placeholder {
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply p-[clamp(16px,1.19vw,1.19vw)];
		@apply rounded-[0.6vh] md:rounded-[0.6vw];
		@apply flex items-center gap-[clamp(8px,0.71vw,0.71vw)];
		@apply bg-gradient-to-tr from-gray-100 to-gray-50;
		@apply h-[clamp(16px,1.19vw,1.19vw)];
		@apply max-w-min;
	}
	.logo {
		@apply w-[2.98vh] h-[2.98vh] md:w-[2.98vw] md:h-[2.98vw];
	}

	.logo > img {
		@apply rounded-full;
	}
	.image-placeholder {
		@apply bg-gray-100;
		@apply rounded-full;
		@apply flex items-center justify-center;
		@apply w-[2.98vh] h-[2.98vh] md:w-[2.98vw] md:h-[2.98vw];
	}
	.image-placeholder > img {
		@apply w-2/3;
	}

	.name {
		@apply flex items-center;
	}

	.verified-icon {
		@apply w-[1.31vh] h-[1.31vh] md:w-[1.31vw] md:h-[1.31vw];
	}

	.dets > .hash {
		@apply text-color-hover-footer-link;
		@apply flex flex-row items-center gap-x-[clamp(5px,0.5vw,0.5vw)];
	}
	.dets > .hash > div {
		@apply w-[2vh] h-[2vh] md:w-[2vw] md:h-[2vw];
	}

	.eye-icon {
		@apply w-3 md:w-[1.19vw];
	}

	.copy-icon {
		@apply w-5 md:w-[1.5vw];
	}

	.proofs-button {
		@apply flex items-center gap-[clamp(4px,0.3vw,0.3vw)];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[4px] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}

	.status {
		@apply flex flex-col items-center;
	}

	.icon {
		@apply w-[clamp(95px,7.5vw,7.5vw)] h-[clamp(95px,7.5vw,7.5vw)];
	}

	.status-text {
		@apply uppercase text-color-arcadia-red font-bold text-[clamp(14px,1.43vw,1.43vw)];
		@apply mb-[clamp(8px,0.71vw,0.71vw)];
	}

	.success {
		@apply text-color-arcadia-green;
	}

	.amount {
		@apply flex gap-[clamp(4px,0.48vw,0.48vw)] items-center;
		@apply mb-[clamp(16px,3.93vw,3.93vw)];
	}

	.amount > .value {
		@apply text-[clamp(28px,2.86vw,2.86vw)] font-bold;
	}

	.amount > .cspr {
		@apply text-[clamp(24px,1.90vw,1.90vw)] font-bold text-color-grey-footer-label;
	}

	.raw-data {
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply p-[clamp(16px,1.43vw,1.43vw)];
		@apply md:max-w-[57.86vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply overflow-x-auto;
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

	.time {
		@apply max-w-[175px] md:max-w-none;
	}
</style>

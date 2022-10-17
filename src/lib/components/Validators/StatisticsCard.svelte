<script lang="ts">
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import type { Bid, ValidatorDetails } from '$utils/types/validator';
	import BalanceTransferrable from '$components/TableData/BalanceTransferrable.svelte';
	import CircleProgressBar from '$components/TableData/CircleProgressBar.svelte';
	import PlaceHolderIndicator from '../PlaceHolderIndicator.svelte';

	export let validator: Partial<Bid>;
</script>

<div class="statistics-card">
	<div class="md:hidden">
		<div class="label">Public Key</div>
		<div class="value mb-4">
			<div class="text">
				<div class="md:hidden">
					{`${validator.publicKey.substring(0, 16)}...${validator.publicKey.substring(
						validator.publicKey.length - 16
					)}`}
				</div>
				<div class="hidden md:block">
					{validator.publicKey}
				</div>
			</div>
			<div class="copy-icon">
				<CopyIcon text={validator.publicKey} />
			</div>
		</div>
	</div>
	<table class="extras">
		<tr class="hidden md:table-row">
			<td class="label">Public Key</td>
			<td class="value"
				><div class="text">
					<div class="md:hidden">
						{`${validator.publicKey.substring(0, 5)}...${validator.publicKey.substring(
							validator.publicKey.length - 5
						)}`}
					</div>
					<div class="hidden md:block">
						{validator.publicKey}
					</div>
				</div>
				<div class="copy-icon">
					<CopyIcon text={validator.publicKey} />
				</div></td
			>
		</tr>
		<tr>
			<td class="label">Total Validator Rewards</td>
			<td class="value"><BalanceTransferrable cspr={validator.totalValidatorRewards} /></td>
		</tr>
		<tr>
			<td class="label">Total Delegator Rewards</td>
			<td class="value"><BalanceTransferrable cspr={validator.totalDelegatorRewards} /></td>
		</tr>
		<tr>
			<td class="label">Total Stake</td>
			<td class="value"><BalanceTransferrable cspr={validator.totalBid} /></td>
		</tr>
		<tr>
			<td class="label">Self Stake</td>
			<td class="value"><BalanceTransferrable cspr={validator.selfStake} /></td>
		</tr>
		<tr>
			<td class="label">Commission Rate</td>
			<td class="value commission">{validator.delegationRate.toFixed(2) || 0}%</td>
		</tr>
		<tr>
			<td class="label">Performance</td>
			<td class="value"><CircleProgressBar progress={validator.performance || 0} /></td>
		</tr>
	</table>
</div>

<style lang="postcss">
	.statistics-card {
		@apply flex flex-col md:items-center;
		@apply pt-[2.5vw] pb-[2.92vw] px-[2.5vw];
		@apply w-full md:w-[57.38vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[clamp(14px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-full;
	}

	.value {
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-hover-footer-link;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
		@apply w-full;
	}

	td {
		@apply pb-[2.2vw];
		@apply align-top;
	}

	.copy-icon {
		@apply w-[clamp(20px,1.96vw,1.96vw)] h-[clamp(20px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.commission {
		@apply text-color-table-header text-[clamp(14px,1.07vw,1.07vw)];
	}
</style>

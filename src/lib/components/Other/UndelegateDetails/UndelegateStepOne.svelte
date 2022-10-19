<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';

	import Hash from '$lib/components/TableData/Hash.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';
	import { getStats } from '$utils/api';
	import { getAccountBalance } from '$utils/wallets/balance';
	import NumberInput from '$lib/components/Reusables/NumberInput.svelte';
	import ValidatorPicker from '../ValidatorPicker.svelte';

	export let validatorPublicKey: string;
	export let amount = 500; // Minimum CSPR delegatable
	export let balance;
	export let csprFee = 2.5;
	export let account;

	let sendMax = false;
	$: amount = sendMax ? parseFloat(balance) - csprFee : 500;

	const limit = 500;
</script>

<div class="title">Undelegation details</div>
{#if !$account}
	<div class="sign-in-alert">
		<div class="icon">
			<YellowWarningIcon black />
		</div>
		<div class="text">
			You’re not signed in. <span
				class="green"
				on:click={() => {
					goto('/sign-in');
				}}>Sign in</span
			> with a compatible wallet like Signer or Ledger to continue.
		</div>
	</div>
{/if}

<div class="sender">
	<div class="top">
		<div>Account</div>
		<div>Balance</div>
	</div>
	<div class="value grey">
		<span
			><div class="md:hidden">
				<Hash start color="grey" noOfCharacters={5} hash={$account?.publicKey || ''} />
			</div>
			<div class="hidden md:block">
				<Hash start color="grey" noOfCharacters={20} hash={$account?.publicKey || ''} />
			</div>
			<div class="copy-icon">
				{#if $account?.publicKey}
					<CopyIcon text={$account?.publicKey || ''} />
				{/if}
			</div></span
		>
		<span
			>{#await getAccountBalance()}
				Loading ...
			{:then balance}
				{balance} CSPR
			{/await}</span
		>
	</div>
</div>

<ValidatorPicker on:select={(e)=> {
	validatorPublicKey = e.detail.publicKey
}}/>

<NumberInput bind:amount {limit} bind:sendMax>Undelegate max</NumberInput>

<div class="fee">
	<div class="left">Transaction Fee</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{csprFee.toFixed(5)}</span> CSPR</div>
		{#await getStats()}
			Loading ...
		{:then stats}
			<!-- TODO Get price from CoinGecko -->
			<div class="cash">
				${Math.floor(csprFee * stats.price * 100000000) / 100000000 || '0'}
			</div>
		{/await}
	</div>
</div>

<div class="terms">
	By using cspr.fyi, you acknowledge that you have read, understood and accepted our. <span
		class="green">Terms of Service.</span
	>
</div>
<div class="next-button">
	<Button wider gradient on:click>Next</Button>
</div>

<style lang="postcss">
	.copy-icon {
		@apply w-[clamp(16px,2vw,2vw)] h-[clamp(16px,2vw,2vw)];
	}

	.title {
		@apply text-color-table-header font-bold text-[clamp(16px,1.43vw,1.43vw)];
		@apply mb-[clamp(12px,0.83vw,0.83vw)] mt-[clamp(16px,2.26vw,2.26vw)];
	}

	.value > span {
		@apply flex items-center;
	}

	.sign-in-alert {
		@apply flex items-center gap-[clamp(4px,0.6vw,0.6vw)];
		@apply text-[clamp(10px,0.77vw,0.77vw)] text-color-black-text;
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply bg-color-tranfer-det-green;
		@apply rounded-[0.24vh] md:rounded-[0.24vw];
		@apply mb-[clamp(16px,1.43vw,1.43vw)];
	}

	.sign-in-alert > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
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
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
		@apply flex items-center justify-between;
		@apply border-color-sender-background border-[clamp(1px,0.12vw,0.12vw)];
	}

	.cspr {
		@apply text-[clamp(12px,0.71vw,0.71vw)] leading-none;
		@apply flex items-center justify-end gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.cspr-fee {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)];
	}

	.terms {
		@apply text-[clamp(12px,0.77vw,0.77vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.fee {
		@apply flex justify-between items-center;
		@apply text-[clamp(14px,1.07vw,1.07vw)];
		@apply py-[clamp(16px,1.43vw,1.43vw)];
		@apply border-t-color-transfer-details-border border-t-[clamp(1px,0.12vw,0.12vw)];
	}

	.cash {
		@apply text-color-table-header text-[clamp(14px,1.07vw,1.07vw)] font-bold;
	}

	.right {
		@apply text-right;
	}

	.next-button {
		@apply mt-[clamp(16px,2.92vw,2.92vw)];
		@apply flex justify-center;
	}

	.terms,
	.left,
	.cspr,
	.grey {
		@apply text-color-grey-footer-label;
	}
</style>

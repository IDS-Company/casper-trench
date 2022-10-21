<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getAccountBalance } from '$utils/api';
	import { isPublicKey } from '$utils/wallets/verifications';
	const { CLPublicKey } = browser && window.CasperSDK;
	import Hash from './Hash.svelte';

	export let isFrom = false;
	export let cspr: number;
	export let hash: string;
	export let link = '';
	$: hash = isPublicKey(hash)
		? CLPublicKey.fromHex(hash).toAccountHashStr().replace('account-hash-', '')
		: hash;
</script>

<div class="from-to-hash">
	{#if link}
		<Hash
			{hash}
			on:click={() => {
				location.reload();
				goto(link);
			}}
			noOfCharacters={6}
			color={`${isFrom ? 'black' : 'text'}`}
		/>
	{:else}
		<Hash {hash} noOfCharacters={6} color={`${isFrom ? 'black' : 'text'}`} />
	{/if}
	<div class="value-crypto">
		<div class="crypto">
			{#if cspr}
				{cspr?.toFixed(5)}
			{:else}
				{#await getAccountBalance(hash)}
					{''}
				{:then balance}
					{(balance && parseFloat(balance?.toFixed(5)).toLocaleString('en')) || 0}
				{/await}
			{/if}
		</div>
		<div class="cspr">CSPR</div>
	</div>
</div>

<style lang="postcss">
	.from-to-hash {
		@apply text-right max-w-max;
		@apply flex flex-col items-end;
	}

	.value-crypto {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
	}

	.crypto {
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label text-[clamp(10px,0.83vw,0.83vw)];
	}
</style>

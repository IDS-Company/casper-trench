<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import Weight from '$components/TableData/Weight.svelte';

	export let props: {
		delegators: {
			publicKey: string;
			stakedAmount: number;
			bondingPurse: string;
			delegatee: string;
			rank?: number;
		}[];
		totalStake: string;
		validatorPublicKey: string;
	};

	let displayedDelegators: {
		publicKey: string;
		stakedAmount: number;
		bondingPurse: string;
		delegatee: string;
	}[];
	let delegators = props.delegators;
	let totalDelagators = delegators.length;
</script>

<div class="delegators-tab">
	<div class="total">
		{#if delegators}
			Total {totalDelagators} delegators
		{:else}
			Total 0 delegators{/if}
	</div>
	<table>
		<tr>
			<th class="rank blocky">Rank</th>
			<th>Delegators (Public key)</th>
			<!-- TODO confirm is staked amount -->
			<!-- <th class="to"> To (Account Hash) </th> -->
			<th class="to">Staked Amount</th>
			<th class="weight"> % Weight </th>
		</tr>
		<div class="divider table-header-border" />
		{#if displayedDelegators && displayedDelegators.length > 0}
			{#each displayedDelegators as delegator, i}
				<tr>
					{#if props.validatorPublicKey === delegator.publicKey}
						<td class="blocky">Self Stake</td>
					{:else}
						<td class="blocky" class:rank-val={i === 0}>{i}</td>
					{/if}
					<td class="key">
						<a href="/accounts/{delegator.publicKey}" class="hidden md:block">
							{delegator.publicKey}</a
						>
						<a href="/accounts/{delegator.publicKey}" class="md:hidden">
							{`${delegator.publicKey.substring(0, 10)}...${delegator.publicKey.substring(
								delegator.publicKey.length - 10
							)}`}</a
						>
					</td>
					<td class="to">
						<div class="value-crypto">
							<div class="crypto">
								{delegator.stakedAmount.toLocaleString('en')}
							</div>
							<div class="cspr">CSPR</div>
						</div>
					</td>
					<td class="weight"
						><Weight value={delegator.stakedAmount / parseFloat(props.totalStake)} /></td
					>
				</tr>
			{/each}
		{/if}
	</table>
	<div class="w-[40%] lg:w-full">
		<Paginator
			showTotalRows={false}
			bind:items={delegators}
			bind:pagedItems={displayedDelegators}
		/>
	</div>
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[clamp(16px,1vw,1vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.value-crypto {
		@apply flex items-center justify-end gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-right text-[clamp(10px,0.83vw,0.83vw)];
	}

	.crypto {
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label;
	}

	.to {
		@apply text-right;
	}

	.weight {
		@apply text-right;
		@apply flex justify-end;
	}

	.key {
		@apply text-color-hover-footer-link hover:text-opacity-70;
	}

	.total {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.blocky {
		@apply px-0;
	}
</style>

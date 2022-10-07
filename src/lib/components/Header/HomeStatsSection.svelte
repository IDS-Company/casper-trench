<script lang="ts">
	import type { Stats } from '$utils/types/stats';
	import { aTimeAgo } from '$utils/converters';
	import HomePageChart from '$lib/components/Charts/HomePageChart.svelte';
	import SvelteLoader from '$components/SvelteLoader/index.svelte';
	export let stats: Stats;
	export let isLoading = true;
</script>

{#if isLoading}
	<SvelteLoader />
{/if}
<div class="home-stats-section header-stats-background">
	<div class="stat-column">
		<div class="top">
			<div class="title">BLOCK HEIGHT</div>
			<div class="value">
				{stats?.currentBlockHeight.toLocaleString('en') || '0'}
			</div>
			<div class="detail flex">
				{(stats && aTimeAgo(Date.now() - Date.parse(stats?.currentBlockTime))) || '0 seconds '}
				ago
			</div>
		</div>
		<div class="bottom">
			<div class="title">CSPR PRICE</div>
			<div class="value">
				${Math.floor(stats?.currentPrice * 10000) / 10000 || '0'}
			</div>
			<div class="detail">
				${stats?.marketCap?.toLocaleString('en') || '0'} Market Cap
			</div>
		</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="top">
			<div class="title">ACTIVE VALIDATORS</div>
			<div class="value">
				{stats?.activeValidators || '0'}
			</div>
			<div class="detail">
				out of {stats?.activeBids || '0'} active bids
			</div>
		</div>
		<div class="bottom">
			<div class="title">CIRCULATING SUPPLY</div>
			<div class="value">
				{stats?.circulatingSupply?.toLocaleString('en') || '0'}
			</div>
			<div class="detail">
				{(stats &&
					stats.circulatingSupply &&
					stats.totalSupply &&
					((stats.circulatingSupply / stats.totalSupply) * 100).toFixed(2)) ||
					0}% of {stats?.totalSupply?.toLocaleString('en') || '0'}
			</div>
		</div>
	</div>

	<div class="vt" />

	<div class="stat-column last-b">
		<div class="top">
			<div class="title">TOTAL STAKE BONDED</div>
			<div class="value">
				{stats?.totalStakeBonded?.toLocaleString('en') || 0}
			</div>
			<div class="detail">
				{(stats &&
					stats?.totalStakeBonded &&
					stats?.totalSupply &&
					((stats?.totalStakeBonded / stats?.totalSupply) * 100).toFixed(2)) ||
					0}% of Total supply
			</div>
		</div>
		<div class="bottom">
			<div class="title">TOTAL TRANSFERS</div>
			<div class="value">
				{(stats && stats.totalTransfers?.toLocaleString('en')) || '0'}
			</div>
		</div>
	</div>

	<div class="vt" />

	<div class="graph">
		<HomePageChart />
	</div>
</div>

<style lang="postcss">
	.home-stats-section {
		@apply md:h-[clamp(100px,16.13vw,16.13vw)] md:w-[clamp(500px,92.44vw,92.44vw)];
		@apply p-6 md:p-[clamp(10px,1.73vw,1.73vw)] rounded-[clamp(10px,1.19vw,1.19vw)] border-[clamp(1px,0.06vw,0.06vw)] border-color-border-header-stats border-opacity-50;
		@apply flex flex-col md:flex-row md:gap-[clamp(10px,1.43vw,1.43vw)] md:items-center backdrop-blur;
	}

	.stat-column {
		@apply md:w-[clamp(100px,17.86vw,17.86vw)] flex md:flex-col h-full leading-none;
		@apply border-b md:border-b-0 border-color-divider-header-stats border-opacity-50;
		@apply py-3 md:py-0;
	}

	.stat-column > div {
		@apply w-full md:w-auto md:h-1/2 md:pl-[clamp(20px,1.5vw,1.5vw)];
	}

	.top {
		@apply border-r md:border-r-0 md:border-b border-color-divider-header-stats border-opacity-50;
	}

	.bottom {
		@apply pl-6 md:pl-0 md:mt-[clamp(8px,0.95vw,0.95vw)];
	}

	.vt {
		@apply hidden md:block h-full border-r border-color-divider-header-stats border-opacity-50;
	}

	.title {
		@apply text-xs md:text-[clamp(8px,0.95vw,0.95vw)] text-color-title-header-stats mb-2 md:mb-[clamp(2px,0.5vw,0.5vw)];
	}

	.value {
		@apply text-xl md:text-[clamp(14px,1.67vw,1.67vw)] text-white font-medium md:mb-[clamp(2px,0.4vw,0.4vw)];
	}

	.detail {
		@apply text-sm md:text-[clamp(10px,1.07vw,1.07vw)] text-white;
	}

	.side {
		@apply absolute;
		@apply transform translate-x-[-1.5vw] translate-y-[-0.2vw];
	}

	.last-b {
		@apply border-b-0;
	}
</style>

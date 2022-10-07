<script lang="ts">
	import { aTimeAgo } from '$utils/converters';
	import type { Stats } from '$utils/types/stats';
	import SvelteLoader from '$components/SvelteLoader/index.svelte';

	export let stats: Stats;
	export let isLoading = true;
</script>

{#if isLoading}
	<SvelteLoader />
{/if}
<div class="home-stats-section header-stats-background">
	<div class="stat-column">
		<div class="title">BLOCK HEIGHT</div>
		<div class="value">
			{stats?.currentBlockHeight.toLocaleString('en') || '0'}
		</div>
		<div class="detail flex">
			{(stats && aTimeAgo(Date.now() - Date.parse(stats?.currentBlockTime))) || '0 seconds'}
			ago
		</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">APY</div>
		<div class="value">
			{stats?.apy?.toFixed(2) || '0'}%
		</div>
		<div class="detail">Annual Percentage Yield</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">CSPR PRICE</div>
		<div class="value">
			${Math.floor(stats?.currentPrice * 10000) / 10000 || '0'}
		</div>
		<div class="detail">
			${stats?.marketCap?.toLocaleString('en') || '0'} Market Cap
		</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">CIRCULATING SUPPLY</div>
		<div class="value">
			{stats?.circulatingSupply?.toLocaleString('en') || '0'}
		</div>
		<div class="detail">
			{(stats &&
				stats?.circulatingSupply &&
				stats?.totalSupply &&
				((stats?.circulatingSupply / stats?.totalSupply) * 100).toFixed(2)) ||
				0}% of {stats?.totalSupply?.toLocaleString('en') || '0'}
		</div>
	</div>
</div>

<style lang="postcss">
	.home-stats-section {
		@apply md:h-[clamp(100px,5.5vw,5.5vw)] md:w-[clamp(500px,46.96vw,46.96vw)];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(20px,1.5vw,1.5vw)] rounded-[clamp(10px,1.19vw,1.19vw)] border-[clamp(1px,0.06vw,0.06vw)] border-color-border-header-stats border-opacity-50;
		@apply flex gap-[clamp(10px,1.43vw,1.43vw)] items-center backdrop-blur;
	}

	.stat-column {
		@apply w-full leading-none;
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
		@apply transform translate-x-[3.5vw] translate-y-[-0.2vw];
	}
</style>

<script lang="ts">
	import OtherStatsSection from './OtherStatsSection.svelte';
	import Navbar from './Navbar.svelte';
	import Filter from '$lib/components/Header/Filter.svelte';
	import HomeStatsSection from './HomeStatsSection.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getStats } from '$utils/api';
	import type { Stats } from '$utils/types/stats';
	let isLoading = false;
	$: isHome = $page.url.pathname === '/';
	let stats: Stats;
	onMount(async () => {
		stats = await getStats();
	});
</script>

<div class="header">
	<Navbar />
	{#if isHome}
		<Filter />
		<HomeStatsSection bind:stats bind:isLoading />
	{:else}
		<div class="header-flex">
			<OtherStatsSection bind:stats bind:isLoading />
			<Filter />
		</div>
	{/if}
</div>

<style lang="postcss">
	.header {
		@apply flex flex-col gap-y-[2vw];
		@apply sm:p-4 md:px-[clamp(16px,3.57vw,3.57vw)] md:pt-[clamp(16px,0.95vw,0.95vw)] md:pb-[clamp(16px,2vw,2vw)];
		@apply bg-no-repeat bg-center bg-auto;
		@apply w-full;
		background: url('/images/png/header-bg.png') center/cover;
	}

	.header-flex {
		@apply flex items-center justify-between;
	}
</style>

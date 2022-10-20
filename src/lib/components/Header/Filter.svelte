<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { searchPhrase } from '$utils/api';

	export let value: string;
	export const search = async () => {
		await searchPhrase(value);
		value = '';
	};
</script>

<div class="filter">
	<!-- <div class="filter-dropdown">
		<div class="text">Filter</div>
		<div class="chevron">
			<NavbarChevron />
		</div>
	</div> -->

	<input
		type="text"
		name="filter"
		on:keydown={async (e) => {
			if (e.key === 'Enter') {
				search();
			}
		}}
		placeholder="Search by Address / Hash / Block / Public Key"
		bind:value
	/>

	<button class="search" type="button" on:click={search}>
		<div class="search-icon">
			<SearchIcon />
		</div>
	</button>
</div>

<style lang="postcss">
	.filter {
		@apply flex items-center;
		@apply md:w-[clamp(100px,34.58vw,34.58vw)] md:h-[clamp(10px,2.5vw,2.5vw)] rounded-[clamp(4px,0.24vw,0.24vw)] bg-color-filter-bg;
		@apply text-[clamp(10px,0.83vw,0.83vw)] text-white;
		@apply mb-4 md:mb-0;
		@apply mx-4 md:mx-0;
	}

	.filter-dropdown {
		@apply px-4 md:px-0 md:w-[20%] md:h-full py-3 md:py-0 bg-color-filter-dropdown-button-bg flex items-center justify-center cursor-pointer;
		@apply rounded-l-[clamp(4px,0.24vw,0.24vw)];
	}

	input {
		@apply bg-transparent w-full flex-grow px-[clamp(16px,0.95vw,0.95vw)] appearance-none outline-none;
	}

	.chevron {
		@apply h-[clamp(14px,0.95vw,0.95vw)] w-[clamp(14px,0.95vw,0.95vw)] ml-[clamp(4px,0.36vw,0.36vw)];
	}

	.search {
		@apply md:h-full md:w-[clamp(20px,3.36vw,3.36vw)] flex items-center justify-center cursor-pointer;
		@apply bg-gradient-to-r from-color-search-btn-blue to-color-search-btn-green;
		@apply rounded-r-[clamp(4px,0.24vw,0.24vw)];
		@apply py-[14px] md:py-0 px-4 md:px-0;
	}

	.search-icon {
		@apply w-[clamp(10px,0.95vw,0.95vw)] h-[clamp(10px,0.95vw,0.95vw)];
	}
</style>

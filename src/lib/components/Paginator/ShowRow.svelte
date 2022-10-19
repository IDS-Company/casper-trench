<script>
	import ShowRowChevron from '$lib/icons/ShowRowChevron.svelte';
	import { slide } from 'svelte/transition';
	export let itemsPerPage = 10;
	let dropdown = false;
	const pageLengths = [10, 25, 50, 100];
</script>

<div class="show-row">
	<div class="title">Show Row</div>
	<div>
		<button type="button" on:click={() => (dropdown = !dropdown)} class="dropdown-header">
			<div class="value">
				{itemsPerPage}
			</div>
			<div class="chevron">
				<ShowRowChevron />
			</div>
		</button>

		{#if dropdown}
			<div class="dropdown" transition:slide>
				{#each pageLengths as item, index}
					<div
						class="dropdown-option"
						class:selected-drop={itemsPerPage === item}
						on:click={() => {
							itemsPerPage = item;
							dropdown = false;
						}}
					>
						{item}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.show-row {
		@apply flex items-center gap-[clamp(4px,2.8vw,2.8vw)] lg:px-2;
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.dropdown-header {
		@apply flex items-center gap-[clamp(4px,0.36vw,0.36vw)];
		@apply cursor-pointer;
	}
	.dropdown {
		@apply absolute z-50;
		@apply text-color-table-header text-opacity-50 text-[clamp(14px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[clamp(4px,0.4vw,0.4vw)];
		@apply min-w-max;
		@apply rounded-[clamp(4px,0.6vw,0.6vw)];
		@apply bg-white;
		@apply mt-[clamp(8px,0.89vw,0.89vw)] py-[clamp(4px,0.83vw,0.83vw)] px-[clamp(8px,1.07vw,1.07vw)];
		@apply shadow-[0px_0px_11px_0px_rgba(0,0,0,0.1)];
	}

	.dropdown-option {
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.dropdown-option.selected-drop {
		@apply text-color-hover-footer-link font-medium;
	}
	.value {
		@apply text-color-black-text;
		@apply bg-transparent;
	}

	.chevron {
		@apply w-3 md:w-[0.73vw];
	}
</style>

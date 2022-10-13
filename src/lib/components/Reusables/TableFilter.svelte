<script lang="ts">
	import FilterIcon from '$lib/icons/FilterIcon.svelte';
	import { clickOutside } from '$utils/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let dropdownItems = [];
	export let selectedFilter = -1;
	let isDroppedDown = false;

	const dropDownOptionClickHandler = (i: number) => {
		selectedFilter = i;
		isDroppedDown = false;
		dispatch('filter', {
			optionIndex: i
		});
	};
</script>

<div
	class="wrapper"
	use:clickOutside
	on:click_outside={() => {
		isDroppedDown = false;
	}}
>
	<div
		class="icon"
		on:click={() => {
			isDroppedDown = !isDroppedDown;
		}}
	>
		<FilterIcon active={selectedFilter !== -1} />
	</div>
	{#if isDroppedDown}
		<div class="dropdown" transition:slide>
			{#each dropdownItems as item, i}
				<div
					class="item"
					class:selected={selectedFilter === i}
					on:click={() => dropDownOptionClickHandler(i)}
				>
					{item}
				</div>
			{/each}
			<div
				class="item"
				class:selected={selectedFilter === -1}
				on:click={() => dropDownOptionClickHandler(-1)}
			>
				No Filter
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		@apply relative;
	}

	.dropdown {
		@apply absolute;
		@apply mt-[0.48vw];
	}
	.icon {
		@apply h-[clamp(10px,0.83vw,0.83vw)] w-[clamp(10px,0.83vw,0.83vw)];
		@apply cursor-pointer;
	}

	.item {
		@apply text-[clamp(12px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
		@apply min-w-max;
	}

	.selected {
		@apply text-color-hover-footer-link;
	}

	.dropdown {
		@apply rounded-[0.4vw];
		@apply p-[0.95vw];
		@apply bg-white;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-black border-opacity-20;
		@apply z-10;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
	}
</style>

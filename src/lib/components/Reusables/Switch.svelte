<script lang="ts">
	import SwitchChevron from '$lib/icons/SwitchChevron.svelte';
	import { createEventDispatcher } from 'svelte/internal';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let options: {
		name?: string;
		dropdown?: string[];
		selectedDropdown?: string;
	}[] = [];
	export let selected = 0;
	export let outlined = false;

	let dropdowns: boolean[] = [];
	dropdowns = [];
	options.forEach((option) => {
		dropdowns.push(false);
		option.selectedDropdown = option.dropdown[0];
	});

	let selectOption = (optionIndex: number) => {
		selected = optionIndex;
		options.forEach((option) => {
			option.selectedDropdown = '';
		});
		dropdowns.forEach((_, i) => (dropdowns[i] = false));
	};

	let selectDropdownOption = (optionIndex: number, dropdownIndex: number) => {
		options.forEach((option, index) => {
			if (optionIndex != index) {
				option.selectedDropdown = '';
			}
		});
		selected = optionIndex;
		options[optionIndex].selectedDropdown = options[optionIndex].dropdown[dropdownIndex];
		dispatch('dropdown-option-clicked', {
			optionIndex,
			dropdownIndex
		});
		dropdowns[optionIndex] = false;
	};
	const buttonClickHandler = (index: number) => {
		if (options[index].dropdown.length > 0) {
			if (!dropdowns[index]) {
				dropdowns.forEach((_, i) => (dropdowns[i] = false));
				dropdowns[index] = true;
				return;
			} else {
				dropdowns[index] = false;
				return;
			}
		}
		dispatch('switched', {optionIndex: index});
		selectOption(index);
	};
	let chevColor = [];

	options.forEach((_, i) => {
		chevColor = [...chevColor, selected === i ? "#099B91": "grey"]
	})
</script>

<div class="switch" class:outlined>
	{#each options as option, i}
		<div class="wrapper">
			<div class="button" class:selected={selected === i} on:click={() => buttonClickHandler(i)} on:mouseenter={() => {
				if (selected === i) {
					chevColor[i] = "white";
				} else {
					chevColor[i] = "#099B91";
				}
			}} on:mouseleave={() => {
				if (selected === i) {
					chevColor[i] = "#099B91";
				} else {
					chevColor[i] = "grey";
				}
			}}>
				<div class="text">
					{option.name}
				</div>
				{#if option.dropdown.length > 0}
					<div class="icon" class:flipped={dropdowns[i]}>
						<SwitchChevron color={chevColor[i]}/>
					</div>
				{/if}
			</div>
			{#if dropdowns[i]}
				<div class="dropdown" transition:slide>
					{#each option.dropdown as dropdownOption, index}
						<div
							class="dropdown-option"
							class:selected-drop={option.selectedDropdown === dropdownOption}
							on:click={() => {
								selectDropdownOption(i, index);
							}}
						>
							{dropdownOption}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="postcss">
	.switch {
		@apply flex items-center gap-[clamp(10px,1.07vw,1.07vw)];
		@apply w-max h-max;
		@apply text-[clamp(14px,1.07vw,1.07vw)];
		@apply cursor-pointer;
	}

	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.12vw,0.12vw)];
		@apply text-color-grey-footer-label hover:text-color-hover-footer-link;
		@apply rounded-[clamp(4px,0.48vh,0.48vh)] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply flex items-center gap-[clamp(4px,0.6vw,0.6vw)];
	}

	.selected {
		@apply bg-color-hover-footer-link;
		@apply text-white;
		@apply border-color-hover-footer-link border-[clamp(1px,0.12vw,0.12vw)];
	}

	.icon {
		@apply w-[clamp(12px,0.54vw,0.54vw)] h-[clamp(8px,0.33vw,0.33vw)];
		@apply transition-all;
	}

	.flipped {
		@apply transform rotate-180;
	}

	.outlined > div > .button {
		@apply border-[0vw];
	}
	.outlined > div > .selected {
		@apply text-color-hover-footer-link;
		@apply bg-white;
		@apply border-color-hover-footer-link border-[clamp(1px,0.12vw,0.12vw)];
		@apply px-[clamp(12px,1.31vw,1.31vw)] py-[clamp(8px,0.77vw,0.77vw)] rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply hover:bg-color-hover-footer-link hover:text-white;
	}

	.wrapper {
		@apply relative;
	}

	.dropdown {
		@apply absolute z-50;
		@apply text-color-table-header text-opacity-50 text-[clamp(14px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[clamp(4px,0.4vw,0.4vw)];
		@apply min-w-max;
		@apply rounded-[clamp(4px,0.6vw,0.6vw)];
		@apply bg-white;
		@apply mt-[clamp(8px,0.89vw,0.89vw)] py-[clamp(8px,0.83vw,0.83vw)] px-[clamp(12px,1.07vw,1.07vw)];
		@apply shadow-[0px_0px_0.65vw_0px_rgba(0,0,0,0.1)];
	}

	.dropdown-option {
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.dropdown-option.selected-drop {
		@apply text-color-hover-footer-link font-medium;
	}
</style>

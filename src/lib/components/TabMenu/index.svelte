<script>
	import TabSelectorIcon from '$lib/icons/TabSelectorIcon.svelte';

	export let menuOptions = [];
	let selected = 0;
</script>

<div class="tab-menu">
	<div class="header">
		{#each menuOptions as option, i}
			<div
				class="option"
				class:selected={selected === i}
				on:click={() => {
					selected = i;
				}}
			>
				{#if selected === i}
					<div class="selector">
						<TabSelectorIcon />
					</div>
				{/if}
				<div class="text">
					{option.title}
				</div>
			</div>
		{/each}
	</div>
	<div class="content">
		<svelte:component this={menuOptions[selected].component} props={menuOptions[selected].props} />
	</div>
</div>

<style lang="postcss">
	.tab-menu {
		@apply overflow-y-auto;
	}

	.header {
		@apply flex items-center;
	}

	.option {
		@apply px-[clamp(8px,0.6vw,0.6vw)] w-[140px] lg:w-[200px] xl:w-max;
		@apply cursor-pointer;
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-grey-footer-label text-center;
	}

	.text {
		@apply px-4 py-[clamp(8px,1.19vw,1.19vw)] w-max mx-auto xl:mx-0 lg:text-left;
	}

	.selected {
		@apply border-[clamp(1px,0.15vw,0.15vw)] border-b-0 border-color-tooltip-border border-opacity-100;
		@apply rounded-[0.6vw] rounded-b-none;
		@apply text-color-table-header font-medium max-w-max;
	}

	.content {
		@apply border-[clamp(1px,0.15vw,0.15vw)] border-color-tooltip-border border-opacity-100;
		@apply p-[2.38vw];
		@apply rounded-[0.6vw] rounded-tl-none;
		@apply min-w-max;
	}

	.selector {
		@apply w-full h-[0.24vh] md:h-[0.24vw];
	}
</style>

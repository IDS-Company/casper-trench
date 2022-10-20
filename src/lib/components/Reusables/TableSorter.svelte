<script>
	import PaginatorChevron from '$lib/icons/PaginatorChevron.svelte';
	import { createEventDispatcher } from 'svelte';
	import Tooltip from './Tooltip.svelte';

	const dispatch = createEventDispatcher();

	export let ascendingSelected = false;
	export let descendingSelected = false;
	export let autoDisabled = true;
	export let left = false;

	export let ascendingHandler = () => {
		dispatch('sort', { direction: 'asc' });
		if (!autoDisabled) {
			ascendingSelected = true;
			descendingSelected = false;
		}
	};

	export let descendingHandler = () => {
		dispatch('sort', { direction: 'desc' });
		if (!autoDisabled) {
			ascendingSelected = false;
			descendingSelected = true;
		}
	};
</script>

<div class="table-sorter">
	<Tooltip text="Lowest to Highest" {left}>
		<div class="ascending" on:click={ascendingHandler}>
			<div class="icon">
				<PaginatorChevron hover color={ascendingSelected ? '#099B91' : '#8F9398'} />
			</div>
		</div>
	</Tooltip>
	<Tooltip text="Highest to Lowest" {left}>
		<div class="descending" on:click={descendingHandler}>
			<div class="icon">
				<PaginatorChevron hover color={descendingSelected ? '#099B91' : '#8F9398'} />
			</div>
		</div>
	</Tooltip>
</div>

<style lang="postcss">
	.table-sorter {
		@apply flex flex-col gap-[0.42vw];
	}
	.icon {
		@apply w-[clamp(8px,0.7vw,0.7vw)] h-[clamp(8px,0.35vw,0.35vw)];
	}

	.ascending > .icon {
		@apply transform rotate-90;
	}

	.descending > .icon {
		@apply transform -rotate-90;
	}

	.ascending,
	.descending {
		@apply cursor-pointer;
	}
</style>
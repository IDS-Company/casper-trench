<script lang="ts">
	import { millisToFormat, timeAgo } from '$utils/converters';

	export let blockDate: number;
	export let blockHeight: string;
	export let flexed = false;
	const diff = Date.now() - blockDate;
	const textString = timeAgo(millisToFormat(diff));
</script>

<div class="block-height" class:flexed>
	<div class="block-height">
		{blockHeight}
	</div>
	<div class="time-ago">
		{textString} ago
	</div>
</div>

<style lang="postcss">
	.time-ago {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header text-opacity-50;
		@apply mt-[clamp(2px,0.24vw,0.24vw)];
	}

	.block-height {
		@apply leading-none;
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header text-opacity-100;
	}

	.flexed {
		@apply flex gap-2 items-center;
	}
</style>

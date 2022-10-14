<script lang="ts">
	export let inactive: boolean;
	$: status = inactive ? 'Inactive' : 'Active';
</script>

<div class="status {status.toLowerCase()}">
	{status}
</div>

<style lang="postcss">
	.status {
		@apply text-[clamp(14px,0.95vw,0.95vw)] text-white;
		@apply py-[clamp(2px,0.24vw,0.24vw)] px-[clamp(4px,0.4vw,0.4vw)];
		@apply max-w-max;
		@apply rounded-full;
	}

	.active {
		@apply bg-color-arcadia-green;
	}

	.inactive {
		@apply bg-color-arcadia-red;
	}
</style>

<script lang="ts">
	import ProgressCheckMarkIcon from '$lib/icons/ProgressCheckMarkIcon.svelte';
	import ProgressMarker from '$lib/icons/ProgressMarker.svelte';

	export let step: 0 | 1 | 2 | 3 = 0;
	export let page = '';

	let progressClass = '';
	let iconClass = '';

	$: switch (step) {
		case 0:
			progressClass = 'w-[25%] md:w-[7vw]';
			iconClass = 'translate-x-[-9px] md:translate-x-[-0.5vw]';
			break;
		case 1:
			progressClass = 'w-[52%] md:w-[12vw]';
			iconClass = 'translate-x-[95px] md:translate-x-[11.5vw]';
			break;
		case 2:
			progressClass = 'w-[80%] md:w-[21vw]';
			iconClass = 'translate-x-[150px] md:translate-x-[20.75vw]';
			break;
		default:
			progressClass = 'w-[100%] md:w-full';
			iconClass = 'translate-x-[190px] md:translate-x-[29.25vw]';
			break;
	}
</script>

<div class="step-progress">
	<div class="progress-bar">
		<div class="icon translate-x-[-9px] md:translate-x-[-0.5vw] check-mark" class:checked={step > 0}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[95px] md:translate-x-[11.5vw] check-mark" class:checked={step > 1}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[150px] md:translate-x-[20.75vw] check-mark" class:checked={step > 2}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon translate-x-[190px] md:translate-x-[29.25vw] check-mark" class:checked={step > 3}>
			<ProgressCheckMarkIcon />
		</div>
		<div class="icon {iconClass}">
			<ProgressMarker />
		</div>
		<div class="progress {progressClass}" />
	</div>
	<div class="step-text" class:righter={page.toLowerCase().includes('undel')}>
		<div class="text" class:selected={step === 0}>
			{page}
		</div>
		<div class="text" class:selected={step === 1}>Confirm</div>
		<div class="text" class:selected={step === 2}>Sign</div>
		<div class="text" class:selected={step === 3}>Done</div>
	</div>
</div>

<style lang="postcss">
	.step-text {
		@apply flex items-center gap-4 md:gap-[clamp(16px,7vw,7vw)];
		@apply text-[clamp(14px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.step-progress {
		@apply flex items-center flex-col gap-[clamp(4px,1.55vw,1.55vw)];
	}

	.selected {
		@apply text-color-hover-footer-link;
	}

	.progress-bar {
		@apply w-[clamp(200px,30vw,30vw)] h-[clamp(2px,0.12vw,0.12vw)];
		@apply bg-color-step-progress-bar-bg;
		@apply transform translate-x-[1.2vw] md:translate-x-[1.2vw];
	}

	.icon {
		@apply h-[clamp(16px,1.07vw,1.07vw)] w-[clamp(16px,1.07vw,1.07vw)];
		@apply transform translate-y-[-7px] md:translate-y-[-0.5vw];
		@apply absolute;
		@apply transition-all;
	}

	.progress {
		@apply h-full bg-color-hover-footer-link;
		@apply transition-all;
	}

	.check-mark {
		@apply transform scale-0;
		@apply transition-all;
	}

	.checked {
		@apply scale-100;
	}

	.righter {
		@apply transform translate-x-[-10px] md:translate-x-0;
	}
</style>

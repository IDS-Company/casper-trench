<script lang="ts">
	import { goto } from '$app/navigation';
	import Hash from './Hash.svelte';

	export let imgUrl: string;
	export let name: string;
	export let hash: string;
	export let variant: 'center' | 'right' | 'righter' | 'left' = 'right';
	export let notValidator = false;
	export let start = false;
	export let noOfCharacters = 5;
</script>

<div class="validator">
	{#if imgUrl}
		<div class="icon">
			<img src={imgUrl} alt="validator-icon" />
		</div>
	{:else}
		<div class="image-placeholder">
			<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
		</div>
	{/if}
	<div class="details">
		<Hash
			{hash}
			{variant}
			{start}
			{noOfCharacters}
			on:click={() => {
				if (!notValidator) {
					goto(`/validators/${hash}`);
				}
			}}
		/>
		<div class="name">
			{#if name}
				{name}
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.validator {
		@apply flex items-center justify-start gap-[clamp(8px,0.95vw,0.95vw)];
		@apply text-left;
	}

	.icon {
		@apply w-[clamp(16px,2vw,2vw)];
	}

	.details {
		@apply leading-none flex items-center;
	}
	.image-placeholder {
		@apply bg-gray-100;
		@apply rounded-full w-[clamp(20px,2vw,2vw)];
		@apply flex items-center justify-center;
	}
	.name {
		@apply text-color-grey-footer-label;
		@apply mt-[clamp(2px,0.24vw,0.24vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)];
	}
</style>

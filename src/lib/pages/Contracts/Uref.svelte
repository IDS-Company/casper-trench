<script lang="ts">
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { page } from '$app/stores';
	import URefOverview from './URefOverview.svelte';
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">URef</div>
			</div>
			<div class="value">
				<div class="text">
					{$page.params?.hash}
				</div>
				<div class="copy-icon">
					<CopyIcon text={$page.params?.hash} />
				</div>
			</div>
		</div>
	</div>

	<div class="info">
		<URefOverview />
	</div>
</div>

<style lang="postcss">
	.address {
		@apply text-color-table-header;
	}
	.address > .value {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.address > .title {
		@apply font-bold text-[clamp(16px,1.19vw,1.19vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.address > .value {
		@apply text-[clamp(8px,0.95vw,0.95vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.header {
		@apply flex gap-[clamp(4px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}
</style>

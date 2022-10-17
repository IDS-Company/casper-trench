<script>
	import { slide } from 'svelte/transition';
	import Paginator from '$lib/components/Paginator/index.svelte';

	export let proofs = [];
	let displayProofs = [];
</script>

<div class="proofs">
	{#each displayProofs as proof}
		<div class="proof" transition:slide>
			<div class="num">{proof.pos}</div>
			<table>
				<tr>
					<td class="label"> Public Key </td>
					<td class="value key hidden md:table-cell">
						<a href="/accounts/{proof.public_key}">
							{proof.public_key || ''}
						</a>
					</td>
					<td class="value key md:hidden">
						<a href="/accounts/{proof.public_key}">
							{`${proof.public_key.substring(0, 10)}...${proof.public_key.substring(
								proof.public_key.length - 10
							)}`}
						</a>
					</td>
				</tr>
				<tr>
					<td class="label"> Signature </td>
					<td class="value signature hidden md:table-cell">
						{proof.signature || ''}
					</td>
					<td class="value signature md:hidden max-w-[60vw]">
						{proof.signature || ''}
					</td>
				</tr>
			</table>
		</div>
	{/each}
	<div class="paginator-wrapper">
		<Paginator bind:items={proofs} bind:pagedItems={displayProofs} itemsPerPage={5} showTotalRows={false} showRow={false}/>
	</div>
</div>

<style lang="postcss">
	.proof {
		@apply flex max-w-full;
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-table-header;
		@apply pb-[clamp(4px,0.48vw,0.48vw)] pt-[clamp(16px,1.19vw,1.19vw)];
		@apply border-b-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
	}

	.num {
		@apply w-[1.55vh] h-[1.55vh] md:w-[1.55vw] md:h-[1.55vw];
		@apply hidden md:flex items-center justify-center;
		@apply rounded-full;
		@apply bg-color-proof-num-background;
		@apply mr-[clamp(20px,1.61vw,1.61vw)];
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.paginator-wrapper {
		@apply mt-[clamp(16px,1.19vw,1.19vw)] flex justify-end w-full;
	}

	.label {
		@apply w-[20vw] md:w-[7.14vw];
		@apply align-top;
	}

	.value {
		@apply md:max-w-[47.5vw];
		@apply break-words;
	}

	td {
		@apply pb-[clamp(4px,0.6vw,0.6vw)];
	}

	.key {
		@apply text-color-hover-footer-link;
	}

	.signature {
		@apply text-color-grey-footer-label;
	}

	.proofs {
		@apply flex flex-col items-center;
	}

	.paginator {
		@apply flex gap-[clamp(8px,0.71vw,0.71vw)];
	}

	.button {
		@apply w-[clamp(20px,1.96vw,1.96vw)] h-[clamp(20px,1.96vw,1.96vw)];
		@apply flex items-center justify-center;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply cursor-pointer;
		@apply text-[clamp(14px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply transition-all;
	}

	.selected {
		@apply border-color-hover-footer-link border-[clamp(1px,0.12vw,0.12vw)];
		@apply text-color-hover-footer-link;
	}
</style>

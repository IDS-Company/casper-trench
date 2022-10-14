<script>
	import ArcadiaLogo from '$lib/icons/ArcadiaLogo.svelte';
	import CasperTrenchLogo from '$lib/icons/CasperTrenchLogo.svelte';
</script>

<div class="bottom-footer">
	<img src="/images/png/b-footer-bg.png" alt="bg" class="bg" draggable="false" />
	<div class="bg darker" />
	<div class="logos">
		<div class="a-logo">
			<ArcadiaLogo />
		</div>
		<div class="c-logo">
			<CasperTrenchLogo />
		</div>
	</div>
	<div class="versions">
		<div>cspr.fyi version: 1.10.0 (4287b143)</div>
		<div>Casper Network Node version: 1.4.6 (72b698e89)</div>
		<div>Quote Data provided by CoinGecko API</div>
	</div>
</div>

<style lang="postcss">
	.bottom-footer {
		@apply relative py-[clamp(16px,3.21vw,3.21vw)] md:pl-[clamp(16px,3.75vw,3.75vw)] md:pr-[clamp(16px,9.94vw,9.94vw)];
		@apply flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0;
		@apply w-screen;
	}

	.bg {
		@apply absolute inset-0 -z-20 w-full h-full block;
	}

	.darker {
		@apply bg-black -z-10 bg-opacity-30 md:bg-opacity-50;
	}

	.versions {
		@apply text-white text-[clamp(8px,0.65vw,0.65vw)];
		@apply text-center md:text-left;
	}

	.logos {
		@apply flex items-center gap-[clamp(16px,1.19vw,1.19vw)] h-full;
	}

	.a-logo {
		@apply h-5 aspect-auto md:w-[clamp(50px,8.39vw,8.39vw)] md:h-[clamp(25px,2.38vw,2.38vw)];
	}

	.c-logo {
		@apply h-8 aspect-auto md:h-[clamp(25px,2.44vw,2.44vw)];
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import CasperTrenchLogo from '$lib/icons/CasperTrenchLogo.svelte';
	import NavBarCloseIcon from '$lib/icons/NavBarCloseIcon.svelte';
	import UserIcon from '$lib/icons/UserIcon.svelte';
	import { account } from '$stores/account';
	import { disconnectWallet } from '$utils/wallets/connection';
	import { onMount } from 'svelte';
	import Hash from '../TableData/Hash.svelte';
	import MobileNavDropdown from './MobileNavDropdown.svelte';

	export let handleClose = () => {};
	export let navItems: {
		text: string;
		link: string;
		dropdown: {
			text: string;
			link: string;
		}[];
	}[] = [];

	let navbar;

	function handleLinkClick() {
		close();
	}

	function close() {
		navbar.classList.remove('animate-in');
		navbar.classList.add('animate-out');
		setTimeout(() => {
			handleClose();
		}, 500);
	}
	onMount(() => {
		document.body.style.overflowY = 'hidden';
		navbar.classList.remove('animate-out');
		navbar.classList.add('animate-in');
		return () => {
			document.body.style.overflowY = 'scroll';
		};
	});
</script>

<div bind:this={navbar} class="root bg animate-out">
	<div class="nav">
		<div class="flex items-center justify-between mb-16">
			<div class="c-logo">
				<CasperTrenchLogo />
			</div>

			<div on:click={close}>
				<NavBarCloseIcon />
			</div>
		</div>

		<div class="nav-items">
			{#each navItems as navItem}
				<div class="nav-item">
					{#if navItem.dropdown.length > 0}
						<MobileNavDropdown {navItem} on:close={close}/>
					{:else}
						<div class="text" class:selected={$page.url.pathname === navItem.link} on:click={close}>
							<a href={navItem.link}>{navItem.text}</a>
						</div>
					{/if}
				</div>
			{/each}
			{#if $account}
				<button on:click={disconnectWallet}>
					<Hash hash={$account.publicKey} />
				</button>
			{:else}
				<a href="/sign-in" class="signin" on:click={close}>
					<div class="user-icon">
						<UserIcon isMobile/>
					</div>
					<div class="text">Sign In</div>
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.root {
		height: 100vh;
		width: 100vw;
		transition: all 0.5s ease;
	}

	.nav {
		@apply flex flex-col px-4 py-4 text-sm;

		background-image: url('/images/png/rounds.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.bg {
		@apply bg-[#00094B] bg-opacity-80;
		@apply w-screen h-screen fixed z-50;
		@apply md:hidden;
	}

	.c-logo {
		@apply h-10;
	}

	.nav-items {
		@apply flex flex-col justify-center gap-3;
		@apply mb-8;
	}

	.nav-item {
		@apply text-white text-opacity-50 font-normal;
	}

	.selected {
		@apply text-white text-opacity-100;
	}

	.signin {
		@apply flex items-center cursor-pointer;
		@apply text-white text-opacity-100;
	}

	.user-icon {
		@apply h-[clamp(14px,1.07vw,1.07vw)] w-[clamp(14px,1.07vw,1.07vw)] mr-[4px];
	}
</style>

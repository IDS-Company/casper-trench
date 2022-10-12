<script>
	import Auction from "$lib/pages/Validators/Auction.svelte";
	import { showSwitch } from "$stores/validatorsSwitch";
	
	showSwitch.set(true);
</script>
<Auction />
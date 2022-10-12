<script lang="ts">
	import PublicKey from '$pages/Validators/PublicKey/index.svelte';
	import { showSwitch } from '$stores/validatorsSwitch';

	showSwitch.set(false);
</script>

<PublicKey />

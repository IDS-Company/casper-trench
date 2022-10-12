<script>
	import Validators from '$lib/pages/Validators/index.svelte';
	import { showSwitch } from '$stores/validatorsSwitch';

    showSwitch.set(true);
</script>

<Validators />

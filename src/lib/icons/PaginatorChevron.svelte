<script>
	export let color = '#8F9398';
	export let hover = false;

	let isHovering = false;
</script>

<svg
	width="9"
	height="14"
	class="w-full h-full"
	viewBox="0 0 9 14"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	on:mouseover={() => {
		if (!hover) return;
		isHovering = true;
	}}
	on:mouseout={() => {
		if (!hover) return;
		isHovering = false;
	}}
>
	<path
		d="M7.50049 1.5L2.00049 7.5L7.50049 13"
		stroke={isHovering ? '#099B91' : color}
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>

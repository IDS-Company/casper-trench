<script>
	import {
		Chart,
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	} from 'chart.js';

	Chart.register(
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	);

	import { onMount } from 'svelte';

	let chartElement, myChart;

	const labels = [
		'Jan 1',
		'Jan 2',
		'Jan 3',
		'Jan 4',
		'Jan 5',
		'Jan 6',
		'Jan 7',
		'Jan 8',
		'Jan 9',
		'Jan 10',
		'Jan 11',
		'Jan 12',
		'Jan 13',
		'Jan 14'
	];
	const dataset = [
		2200, 2100, 2150, 2120, 2230, 2260, 2300, 2250, 2300, 2220, 2300, 2200, 2450, 2350
	];

	let data = {
		labels: labels,
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: '#099B91',
				borderColor: '#099B91',
				data: dataset,
				tension: 0.5,
				pointRadius: 0
			}
		]
	};

	const config = {
		type: 'line',
		data: data,
		options: {
			scales: {
				x: {
					display: false
				},
				y: {
					display: false
				}
			},
			plugins: {
				legend: {
					display: false
				}
			}
		}
	};

	onMount(() => {
		const ctx = chartElement.getContext('2d');
		myChart = new Chart(ctx, config);
	});

	const median = (arr) => {
		const mid = Math.floor(arr.length / 2),
			nums = [...arr].sort((a, b) => a - b);
		return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
	};

	function abbrNum(number, decPlaces) {
		decPlaces = Math.pow(10, decPlaces);
		var abbrev = ['k', 'm', 'b', 't'];

		for (var i = abbrev.length - 1; i >= 0; i--) {
			var size = Math.pow(10, (i + 1) * 3);
			if (size <= number) {
				number = Math.round((number * decPlaces) / size) / decPlaces;
				if (number == 1000 && i < abbrev.length - 1) {
					number = 1;
					i++;
				}
				number += abbrev[i];
				break;
			}
		}
		return number;
	}
</script>

<div class="main">
	<div class="title">
		<div class="text">TRANSACTIONS HISTORY in 14 DAYS</div>
		<div class="value">588,675</div>
	</div>
	<div class="wrapper">
		<div class="yaxis">
			<div>{abbrNum(Math.max(...dataset), 1)}</div>
			<div>{abbrNum(median(dataset), 1)}</div>
			<div>{abbrNum(Math.min(...dataset), 1)}</div>
		</div>
		<div class="right">
			<div class="chart-wrapper">
				<canvas bind:this={chartElement} />
			</div>
			<div class="xaxis">
				<div>{labels[0]}</div>
				<div>{labels[Math.round(labels.length / 2)]}</div>
				<div>{labels[labels.length - 1]}</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply h-full;
		@apply text-white text-[0.73vw];
	}

	.title {
		@apply flex justify-between;
		@apply mb-[1.19vw];
	}

	.title > .text {
		@apply text-[0.83vw] font-medium;
	}

	.title > .value {
		@apply text-[0.67vw];
	}

	.chart-wrapper {
		@apply relative;
		@apply w-[15vw];
	}

	canvas {
		@apply absolute;
		@apply inset-0;
		@apply h-full w-full;
	}

	.yaxis {
		@apply h-[8vw];
		@apply flex flex-col justify-between;
	}

	.xaxis {
		@apply w-full;
		@apply flex justify-between;
		@apply absolute bottom-0;
	}

	.yaxis > div {
		@apply w-max;
	}

	.wrapper {
		@apply relative;
		@apply flex gap-[2vw];
		@apply h-full;
	}

	.right {
		@apply relative;
		@apply flex flex-col;
		@apply h-full;
		@apply w-[15vw];
	}
</style>

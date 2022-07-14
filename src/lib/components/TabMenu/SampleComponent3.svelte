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
	import { onMount } from 'svelte';
  import { getRelativePosition } from 'chart.js/helpers';

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

	let chartElement, rangeSelectorElement,
		start = '1',
		end = '21',
		myChart, rangeSelectorChart;

	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'February',
		'March',
		'April',
		'May',
		'June',
		'February',
		'March',
		'April',
		'May',
		'June',
		'February',
		'March',
		'April',
		'May',
		'June',
		'February',
		'March',
		'April',
		'May',
		'June',
		'February',
		'March',
		'April',
		'May',
		'June'
	];
	const dataset = [
		0, 10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30, 45, 10,
		5, 2, 20, 30, 45, 10, 5, 2, 20, 30, 45
	];

	let data = {
		labels: labels,
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: dataset
			}
		]
	};

	const config = {
		type: 'line',
		data: data,
		options: {
      onClick: (e) => {
        const canvasPosition = getRelativePosition(e, myChart);

        // Substitute the appropriate scale IDs
        const dataX = myChart.scales.x.getValueForPixel(canvasPosition.x);
        const dataY = myChart.scales.y.getValueForPixel(canvasPosition.y);
        console.log(dataX, dataY);
      }
    }
	};

	onMount(() => {
		const ctx = chartElement.getContext('2d');
    const selectorCtx = rangeSelectorElement.getContext('2d');
		myChart = new Chart(ctx, config);
    rangeSelectorElement = new Chart(selectorCtx, config)
	});

	$: if (myChart && start && end) {
		updateChart();
	}

	function updateChart() {
		if (parseInt(start) > parseInt(end)) {
			return;
		}
		const labelValue = labels.slice(parseInt(start) - 1, parseInt(end));
		const dbValue = dataset.slice(parseInt(start) - 1, parseInt(end));
		myChart.data.labels = labelValue;
		myChart.data.datasets[0].data = dbValue;
		myChart.update();
	}
</script>

<div>
	<canvas bind:this={chartElement} />
	<div class="range">
    <canvas bind:this={rangeSelectorElement} />
  </div>

	<input
		type="range"
		on:change={() => {
			if (parseInt(start) > parseInt(end)) {
				start = end;
			}
		}}
		bind:value={start}
		min="1"
		max="21"
	/>
	<input
		type="range"
		on:change={() => {
			if (parseInt(end) < parseInt(start)) {
				end = start;
			}
		}}
		bind:value={end}
		min="1"
		max="21"
	/>
</div>

<style lang='postcss'>
  .range {
    @apply h-[1vw];
  }
</style>

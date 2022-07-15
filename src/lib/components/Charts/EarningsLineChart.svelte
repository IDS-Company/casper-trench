<script lang='ts'>
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
		'Jan 14',
		'Jan 15',
		'Jan 16',
		'Jan 17',
		'Jan 18',
		'Jan 19',
		'Jan 20',
		'Jan 21',
		'Jan 22',
		'Jan 23',
		'Jan 24',
		'Jan 25',
		'Jan 26',
		'Jan 27',
		'Jan 28',
		'Jan 29',
		'Jan 30',
		'Jan 31'
	];
	const dataset = [
		12200, 12100, 12150, 12120, 12230, 12260, 12300, 12250, 12300, 11220, 12300, 12200, 12450,
		12350, 12200, 12100, 12150, 12120, 12230, 12260, 12300, 12250, 12300, 12220, 12300, 11200,
		12450, 12350, 12200, 12100, 12150
	];

    const getOrCreateTooltip = (chart) => {
		let tooltipEl = chart.canvas.parentNode.querySelector('div');

		if (!tooltipEl) {
			tooltipEl = document.createElement('div');

			tooltipEl.style.pointerEvents = 'none';
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.transform = 'translate(1%, 40%)';
			tooltipEl.style.transition = 'all .1s ease';
			tooltipEl.style.columnGap = '1vw';
			const labelWrapper = document.createElement('div');
            labelWrapper.style.minWidth = 'max-content';
            labelWrapper.style.display = 'flex';
            labelWrapper.style.alignItems= 'center';
            labelWrapper.style.gap = '1vw';
			labelWrapper.style.borderRadius = '0.27vw';
			labelWrapper.style.paddingTop = '0.5vw';
			labelWrapper.style.paddingRight = '1.2vw';
			labelWrapper.style.paddingBottom = '0.5vw';
			labelWrapper.style.paddingLeft = '1.2vw';
			labelWrapper.style.color = 'black';
            labelWrapper.style.marginLeft = '1.5vw';
			labelWrapper.style.backdropFilter = 'blur(20px)';
			labelWrapper.style.opacity = 1;
			labelWrapper.style.background = 'white';
            labelWrapper.style.borderWidth = '0.2vw';
            labelWrapper.style.borderColor = '#8383830F';

            const bullet = document.createElement('div');
            bullet.style.height = '0.75vw';
            bullet.style.width = '0.75vw';
            bullet.style.backgroundColor = '#1735A3';
            bullet.style.borderRadius = '50%';
            labelWrapper.appendChild(bullet);

			const pointWrapper = document.createElement('div');
			pointWrapper.style.width = '1.5vw';
			pointWrapper.style.height = '1.5vw';
			pointWrapper.style.borderRadius = '50%';
			pointWrapper.style.background = '#8383832F';
            pointWrapper.style.marginBottom = '1vw';
			pointWrapper.style.display = 'flex';
			pointWrapper.style.justifyContent = 'center';
			pointWrapper.style.alignItems = 'center';

			const point = document.createElement('div');
			point.style.width = '1vw';
			point.style.height = '1vw';
			point.style.borderRadius = '50%';
			point.style.background = '#838383';
            point.style.borderWidth = '0.25vw';
            point.style.borderColor = 'white'

			pointWrapper.appendChild(point);
			tooltipEl.appendChild(pointWrapper);
			tooltipEl.appendChild(labelWrapper);

			chart.canvas.parentNode.appendChild(tooltipEl);
		}

		return tooltipEl;
	};

    const externalTooltipHandler = (context) => {
		const { chart, tooltip } = context;

		const tooltipEl = getOrCreateTooltip(chart);

		if (tooltip.body) {
			const price = document.createElement('h2');
			price.innerHTML = `${tooltip.body[0].lines}`;
			price.style.marginTop = '0.4vw';
			price.style.fontSize = '0.95vw';
			price.style.lineHeight = '1.7vw';
			price.style.color = '#425466';

			const labelWrapper = tooltipEl.childNodes[1];
			if (labelWrapper.childNodes.length > 1){
				labelWrapper.replaceChild(price, labelWrapper.childNodes[1]);
            } else {
                labelWrapper.appendChild(price);
            }
		}
		const pointWrapper = tooltipEl.childNodes[1];
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = `${
			tooltip.caretX - tooltipEl.offsetWidth / 2 + pointWrapper.offsetWidth / 2
		}px`;
		tooltipEl.style.top = `${tooltip.caretY - tooltipEl.offsetHeight / 2}px`;
	};

	let data = {
		labels: labels,
		datasets: [
			{
				label: 'CSPR received',
				backgroundColor: '#099B91',
				borderColor: '#099B91',
				data: dataset,
				tension: 0,
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
					display: true,
                    grid: {
                        display: false,
                    }
				},
				y: {
					display: true,
					beginAtZero: true,
                    ticks: {
                        callback: (value: number) => {
								return `${value / 1000}K`;
							}
                    },
                    position: 'right',
				}
			},
			plugins: {
				legend: {
					display: false
				},
                tooltip: {
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }
			}
		}
	};

	onMount(() => {
		const ctx = chartElement.getContext('2d');
		myChart = new Chart(ctx, config);
	});
</script>

<div class="wrapper">
	<canvas bind:this={chartElement} />
</div>

<style lang="postcss">
	.wrapper {
		@apply relative;
		@apply mt-[clamp(20px,3vw,3vw)];
		@apply w-full h-full;
	}
	canvas {
		@apply w-full h-full;
	}
</style>

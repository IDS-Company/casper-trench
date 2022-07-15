<script>
import ArrowToRightIcon from "$lib/icons/ArrowToRightIcon.svelte";

</script>
<div class="chart-header">
    <div class="title">
        Latest 1000 Era rewards (CSPR)
    </div>
    <div class="filters">
        <div class="zoom">
            <div class='title'>
                Zoom
            </div>
            <div class="buttons">
                <div class="button">1m</div>
                <div class="button">3m</div>
                <div class="button">6m</div>
                <div class="button">YTD</div>
                <div class="button">1y</div>
                <div class="button">All</div>
            </div>
        </div>
        <div class="dates">
            <div class="start">Apr 12, 2022</div>
            <div class="icon">
                <ArrowToRightIcon />
            </div>
            <div class="end">
                Jul 4, 2022
            </div>
        </div>
    </div>
</div>

<style lang='postcss'>
    .chart-header {
        @apply text-color-grey-footer-label text-[0.94vw];
        @apply flex flex-col gap-[1.25vw];
    }

    .filters {
        @apply flex items-center justify-between;
    }

    .zoom {
        @apply flex gap-[0.68vw] items-center;
    }

    .buttons {
        @apply flex gap-[0.52vw] items-center; 
    }

    .button {
        @apply py-[0.21vw] px-[0.52vw];
        @apply border border-color-button-grey-border rounded-[0.26vw];
        @apply cursor-pointer;
        @apply text-[0.73vw];
    }

    .dates {
        @apply flex items-center gap-[0.57vw];
    }

    .icon {
        @apply w-[1.46vw];
    }
</style>
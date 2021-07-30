<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  import { heroDurations } from '../stores/heroDurations';
  import Loader from './Loader.svelte';

  Exporting(Highcharts);

  export let heroId;

  onMount(async () => {
    await heroDurations.getData(heroId);
    Highcharts.chart('duration', {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Durations',
        style: {
          color: '#ffffff'
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: $heroDurations[heroId].durations,
        title: {
          text: 'Duration, min',
          style: {
            color: '#ffffff'
          }
        },
        labels: {
          style: {
            color: '#c7c7c7'
          }
        },
        lineColor: 'transparent'
      },
      yAxis: {
        gridLineColor: 'transparent',
        title: {
          text: 'Matches played (only pro)',
          style: {
            color: '#ffffff'
          }
        },
        labels: {
          style: {
            color: '#c7c7c7'
          }
        },
      },
      series: [{
        data: $heroDurations[heroId].games_played.map((value, index) => {
          const winrate = $heroDurations[heroId].win_rate[index];
          return {
            y: value,
            borderColor: 'transparent',
            color: winrate < 49
              ? '#ff4a4a'
              : winrate < 51
                ? '#ffdf50'
                : '#58ff58'
          };
        })
      }],
      plotOptions: {
        column: {
          minPointLength: 3
        }
      },
      tooltip: {
        formatter: function () {
          const winrate = $heroDurations[heroId].win_rate[this.point.index];
          return `${this.x} minutes<br/>${this.y} matches<br/>${winrate}% win`;
        }
      }
    });
  })
</script>

{#if $heroDurations[heroId]}
    <div id="duration" class="container"></div>
{:else}
    <Loader/>
{/if}

<style>
    .container {
        width: 100%;
        height: 300px;
    }
</style>
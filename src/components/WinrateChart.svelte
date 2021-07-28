<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';

  Exporting(Highcharts);

  export let stats = {};

  const pickNumbers = Array.from({ length: 8 }).map((_, index) => index + 1);

  onMount(() => {
    const data = pickNumbers.map(number => {
      return Number((stats[`${number}_win`] * 100 / stats[`${number}_pick`]).toFixed(2));
    })
    Highcharts.chart('container', {
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Winrate depending on the pick number',
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
        categories: pickNumbers,
        title: {
          text: 'Pick number, #',
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
          text: 'Winrate, %',
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
        data
      }],
      plotOptions: {
        series: {
          zones: [
            {
              value: 49,
              color: '#ff4a4a',
            },
            {
              value: 51,
              color: '#ffdf50',
            },
            {
              color: '#58ff58'
            },
          ],
        },
      },
      tooltip: {
        formatter: function () {
          return `For <b>${this.x}</b> pick - <b>${this.y}%</b>`;
        }
      }
    });
  });
</script>

<div id="container" class="container"></div>

<style>
    .container {
        width: 100%;
        height: 300px;
    }
</style>
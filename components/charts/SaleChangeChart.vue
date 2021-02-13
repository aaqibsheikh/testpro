<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      chartData: {
        labels: [
          'New York',
          'Gangtok',
          'Buenos Aires',
          'Hafar Al-Batin',
          'Idlib',
        ],
        datasets: [
          {
            label: 'Line Chart',
            data: [3241, 1259, 157, 1545, 9841],
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 1,
          },
        ],
      },
      options: {
        tooltips: {
          enabled: false,
        },
        scales: {
          yAxes: [
            {
              display: false, //this will remove all the x-axis grid lines
            },
          ],
          xAxes: [
            {
              display: false, //this will remove all the x-axis grid lines
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
<style>
.linechartbox .chartjs-render-monitor {
  height: 272px !important;
}
</style>

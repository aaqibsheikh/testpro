<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      chartData: {
        labels: [
          'Babol',
          'Cabanatuan',
          'Daegu',
          'Jerusalem',
          'Fairfield',
          'New York',
          'Gangtok',
          'Buenos Aires',
          'Hafar Al-Batin',
          'Idlib',
        ],
        datasets: [
          {
            label: '',
            data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
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

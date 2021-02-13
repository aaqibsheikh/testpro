<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            barThickness: 3,
            label: 'Bar Chart',
            backgroundColor: [
              'rgba(255, 255, 255, 255)',
              'rgba(255, 255, 255, 255)',
              'rgba(255, 255, 255, 255)',
              'rgba(255, 255, 255, 255)',
            ],
            data: [12, 19, 3, 5],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
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

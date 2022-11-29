<template>
  <section id="section-dashboard">
    <Bar
      :chart-options="chartOptions"
      :chart-data="data"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />     
  </section>     
</template>

<script>
import axios from "axios";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  mounted() {
    this.allDashdata();
  }, 
  methods: {
    async allDashdata(){
      axios.get('http://localhost:8844/api/dashdata/all', {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then((response) => {
            console.log('Dash data: ',response.data)
            this.chartData.labels = response.data.nombre;
            console.log('Nombre eps: ', response.data.nombre)
            this.chartData.datasets = response.data.saldo;
            console.log('Saldo: ', response.data.saldo)
        });
    }
   
  }
};
</script>

<style>

</style>
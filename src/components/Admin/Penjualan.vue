<template>
  <div class="w-full">
    <div>Penjualan 6 Bulan Terakhir</div>
    <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
  </div>

</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'


export default {
  name: 'penjualan-component',
  components: {
    apexchart: VueApexCharts
  },
  data: function(){
    return {
      token: localStorage.getItem('token') || "",
      dataOrder: [],
      options: {
        chart:{
          id: 'vuechart-example',
          group: 'social',
          type: 'area',
        },
        colors: ['#00E396'],
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Penjualan',
        data: []
      }]
      // Ini Contohnya:
      // options: {
      //   chart: {
      //     id: 'vuechart-example'
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      //   }
      // },
      // series: [{
      //   name: 'Penjualan',
      //   data: [30, 40, 45, 50, 49, 60, 70, 91]
      // }]
    }
  },
  mounted: function(){
    axios.get(`http://localhost:5500/apiAdmin/dataPenjualan`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).then((res) => {
      // Harus di sortir d frontend
      this.dataOrder = res.data;
      let xaxisArr = [];
      console.log(this.dataOrder);

      for (let i = 0; i < this.dataOrder.length; i++) {
        let thnBln = this.dataOrder[i].month;
        let selling = this.dataOrder[i].totalSales;
        let bln = thnBln.split("-"); // 2024-03. bln[0] = 2024, bln[1] = 03

        let txtbln;
        switch(parseInt(bln[1])){
          case 1:
            txtbln = "Januari";
            break;
          case 2:
            txtbln = "Februari";
            break;
          case 3: 
            txtbln = "Maret";
            break;
          case 4:
            txtbln = "April";
            break;
          case 5:
            txtbln = "May";
            break;
          case 6:
            txtbln = "Juni";
            break;
          case 7:
            txtbln = "July";
            break;
          case 8:
            txtbln = "Agustus";
            break;
          case 9:
            txtbln = "September";
            break;
          case 10:
            txtbln = "Oktober";
            break;
          case 11:
            txtbln = "November";
            break;
          case 12:
            txtbln = "Desember";
            break;
        }
        // Ini Push Bulan; untuk options xaxis (label nama dibawah grafik). horizontal
        xaxisArr.push(txtbln);
        // End Push Bulan;

        // ini push count penjualan. vertikal yang menunjukkan angka
        this.series[0].data.push(selling);
        // end push count
      }
      // khusus utk update options xaxis, harus define ulang. 
      // sumber :https://stackoverflow.com/questions/72057329/apexcharts-dynamically-change-xaxis-categories
      this.updateAxis(xaxisArr);

    }).catch((err) => {
      alert("Gagal");
      console.warn(err);
    });
  },
  methods: {
    updateAxis: function(data){
      this.options = {
        ...this.options,
        xaxis: {
          categories: data
        }
      }
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid;
}
</style>
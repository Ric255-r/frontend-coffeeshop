<template>
  <div class="flex flex-wrap">
    <div class="w-6/12">
      <div class="sticky top-[10px]">Penjualan 6 Bulan Terakhir</div>
      <apexchart class="sticky top-[40px]"  width="500" type="line" :options="options" :series="series"></apexchart>
    </div>

    <div class="w-6/12 text-sm">

      <div class="flex flex-wrap px-2 py-2 overflow-hidden shadow">
        <div class="w-full">Master Data</div>
        <br><br>
        <div class="w-3/12">
          No
        </div>
        <div class="w-3/12">
          Bulan
        </div>
        <div class="w-3/12">
          Total Penjualan
        </div>
        <div class="w-3/12">
          Aksi
        </div>

      </div>
      <div class="flex flex-wrap px-2 py-2 overflow-hidden shadow text-gray-600" v-for="(items, index) in dataOrder" :key="index">
        <div class="w-3/12">
          {{index + 1}}
        </div>
        <div class="w-3/12">
          {{items.month}}
        </div>
        <div class="w-3/12">
          {{items.totalSales}}
        </div>
        <div class="w-3/12">
          <button @click="handleDetail(items.month)">View Details</button>
        </div>

      </div>
      <div class="flex flex-wrap px-2 py-2 overflow-hidden shadow">
        <div class="w-full text-center">View More</div>
      </div>
    </div>

    <Dialog class="w-full" v-model:visible="visibleModal" modal header="Detail Penjualan" >
        <span class="p-text-secondary block mb-5 text-right">Total Transaksi Bulan ini = {{ countMasterData }} Transaksi </span>
        <!-- <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div> -->
        <div class="flex flex-wrap" style="border: 1px solid black;" v-for="(item1, index1) in dataMasterOrder"  :key="index1">
          <div class="w-3/12">
            No Jual : {{ item1.nojual }}
          </div>
          <div class="w-3/12">
            GrandTotal : {{ item1.grandtotal }}
          </div>
          <div class="w-3/12">
            Tgl Transaksi : {{ item1.tgltransaksi }}
          </div>
          <div class="w-3/12">
            Pelanggan ID : {{ item1.pelanggan_id }}
          </div>

          <template v-for="(item2, index2) in dataDetilOrder" :key="index2">
            <div class="w-full" v-if="item1.nojual == item2.nojual_id">
              {{ item2.nama_barang }}
            </div>
          </template>
        </div>

        <div class="flex justify-content-end gap-2">
            <button type="button" label="Cancel" severity="secondary" @click="visibleModal = false"></button>
            <button type="button" label="Save" @click="visibleModal = false"></button>
        </div>
    </Dialog>

  </div>

</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'
import Dialog from 'primevue/dialog'


export default {
  name: 'penjualan-component',
  components: {
    apexchart: VueApexCharts,
    Dialog
  }, 
  data: function(){
    return {
      token: localStorage.getItem('token') || "",
      dataOrder: [],
      dataMasterOrder: [],
      dataDetilOrder: [],
      visibleModal: false,
      countMasterData: 0,
      options: {
        chart:{
          id: 'vuechart-example',
          group: 'social',
          // type: 'area',
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
  computed: {

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
    },
    handleDetail: async function(yearMonth){
      try {
        this.visibleModal = true;

        let splitYearMonth = yearMonth.split("-");
        let monthOnly = splitYearMonth[1];

        const resJualDetil = await axios.get(`http://localhost:5500/apiAdmin/dataPenjualanDetil/${monthOnly}`, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });

        this.dataMasterOrder = resJualDetil.data.arrJual;
        this.dataDetilOrder = resJualDetil.data.arrJualDetil;
        this.countMasterData = this.dataMasterOrder.length;
      } catch (error) {
        console.warn(error);
        return null;
      }
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid;
} */
</style>
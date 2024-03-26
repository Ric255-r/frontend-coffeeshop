<template>
  <div class="w-full">
    <div class="flex flex-wrap">
      <div class="w-4/12 bg-white shadow-md rounded">
        <apexchart width="500" type="pie" :options="chartOptions" :series="series"></apexchart>
      </div>

      <div class="w-2/12 fontChart my-auto" >
        <div class="flex flex-wrap bg-white shadow-md rounded mx-1 pb-2">
          <div class="w-full text-sm text-center pt-2">Jumlah Gelas Terjual dibulan ini </div>
          <div class="w-full text-center pt-[50px]">
            <i class="fas fa-coffee text-[25px]"></i>
          </div>
          <div class="w-full text-center text-sm">{{ dataThisMonth.totalSales }}</div>
        </div>
      </div>

      <div class="w-4/12 fontChart text-center">
        <div class="flex flex-wrap bg-white shadow-md rounded min-h-full">
          <div class="w-full text-sm">
            Jumlah Penghasilan Per : 
            <select 
              name="omset" id="omset" class="py-2 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
              @change="getOmset" v-model="selectedOmset">
              <option value="hari">Hari ini</option>
              <option value="bulan">Bulan ini</option>
              <option value="tahun">Tahun ini</option>
            </select>
          </div>


          <div class="w-6/12 text-sm">
            <div class="pb-3 text-center">
              <i class="fas fa-shopping-cart text-[25px]" style="color: green;"></i>
            </div>
            
            <div>{{ jlhTrans }} Transaksi</div>
          </div>
          <div class="w-6/12 text-sm" id="jlhOmset">
            <div class="pb-3 text-center">
              <i class="fas fa-money-bill-wave text-[25px]" style="color: green;"></i>
            </div>
            
            <div>Rp {{ jlhOmset }}</div>
          </div>
        </div>
      </div>
      <div class="w-2/12 my-auto" @mouseenter="showOverlay" @mouseleave="hideOverlay">
        <div class="flex justify-center flex-wrap ml-1 bg-white shadow-md rounded min-h-full" >
          <apexchart class="transition ease-in-out" width="210" type="radialBar" :options="radialBarOption" :series="radialBarOption.series"></apexchart>
        
          <OverlayPanel ref="op">
            <div class="flex flex-column gap-3">
              <i class="fas fa-user"></i>{{ totalUser }} Total User Terdaftar
            </div>
          </OverlayPanel>
        
        </div>

      </div>
    </div>

    <div class="flex flex-wrap mt-5 bg-white shadow-md rounded">
      <div class="w-full py-3 text-sm fontChart pl-5">
        Top 3 Transaksi Pending : 
      </div>
      <div class="w-full mt-2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">      
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No.
                </th>
                <th scope="col" class="px-6 py-3">
                  No Jual
                </th>
                <th scope="col" class="px-6 py-3">
                  TglTransaksi
                </th>
                <th scope="col" class="px-6 py-3">
                  Pelanggan_ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Bukti Bayar 
                </th>
                <th scope="col" class="px-6 py-3">
                  GrandTotal
                </th>
                <th scope="col" class="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody v-if="filterData().length" >
              <template v-for="(item, index) in filterData()" :key="index">
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" width="5%">
                    {{ index + 1}}
                  </th>
                  <td class="px-6 py-4">
                    {{ item.nojual }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.tgltransaksi }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.pelanggan_id }}
                  </td>
                  <td class="px-6 py-4 text-center items-center justify-center">
                    <img 
                      :src="`http://localhost:5500/apiAdmin/buktibayar/${item.buktiByr}`" 
                      :alt="``"
                      height="50" width="50" />
                  </td>
                  <td class="px-6 py-4">
                    Rp. {{ item.grandtotal }}
                  </td>

                  <td class="px-6 py-4 text-left">
                    <!-- Modal toggle -->
                    <button class="block text-white bg-blue-700 
                      hover:bg-blue-800 focus:ring-4 focus:outline-none 
                      focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                      py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                      dark:focus:ring-blue-800" @click="$router.push('/admin/order')">
                      Go To Penjualan
                    </button>
                  </td>
                </tr>

                <tr v-if="index == 2" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="text-center py-5" colspan="7">
                    <router-link to="/admin/order">View More Data</router-link>
                  </td>
                </tr>
                
              </template>

            </tbody>

            <tbody v-else>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                <td class="text-center py-10" colspan="7">Tidak Ada Data</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'
import OverlayPanel from 'primevue/overlaypanel'

export default {
  name: 'dashboard-component',
  components: {
    apexchart : VueApexCharts,
    OverlayPanel
  },
  data: function(){
    return {
      token: localStorage.getItem('token') || "",
      dataTerbanyak: [],
      dataThisMonth: 0,
      series: [],
      selectedOmset: "bulan",
      jlhOmset: 0,
      jlhTrans: 0,
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        title: {
          text: "Top 6 Minuman Terlaris Saat ini"
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: true
        }
      },
      // Buat Radial Bar
      maxRadialBar: 300,
      radialBarOption: {
        series: [],
        chart: {
          height: 360,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: '13px',
                fontFamily: undefined,
                fontWeight: 600,
                color: undefined,
                offsetY: -5
              },
            }
          },
        },
        labels: ['User Terdaftar'],
      },
      totalUser: 0,
      dataOrder: [],
    }
  },
  computed: {

  },
  mounted: function(){
    // Note. jikalau mau lakukan 2 request http scr bersamaan, buat yang utama jalan dlu.
    // ga bisa panggil 2" nya disini spt this.fetchDataJual() & this.getOmset(). dia bkl bentrok.
    // jd solusiny taruh satu yg utama, kek fetchDataJual(), ntar di then axiosnya, 
    // Panggil function this.getOmset()
    this.fetchDataTerjual();
    // atau bs pake async await kaya di react (sosmed yg ak buat) loader.js
    
    // Buat Radial Bar. di arg this.valueToPercent isi aj jlh userny
    this.totalUser = 10;
    this.radialBarOption.series[0] = this.valueToPercent(this.totalUser);
  },
  methods: {
    fetchDataTerjual: function(){
      // ini req axios yg pertama.
      axios.get(`http://localhost:5500/apiAdmin/dataItemTerjual`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
      .then((res) => {
        this.dataTerbanyak = res.data.arrTerbanyak;
        this.dataThisMonth = res.data.arrThisMonth;
        this.getOmset(); // panggil request axios yg kedua.

        let arrNamaBrg = [];
        for (let i = 0; i < this.dataTerbanyak.length; i++) {
          let nama_barang = this.dataTerbanyak[i].nama_barang;
          let countdata = this.dataTerbanyak[i].countdata;

          this.series.push(countdata); // series buat nunjukin angka count
          arrNamaBrg.push(nama_barang); // optionsChart untuk nama label
        }

        this.updateChartOptions(arrNamaBrg);
      })
      .catch((err) => {
        alert("Gagal");
        console.warn(err)
      });
    },
    getOmset: function(){
      // axios req kedua
      axios.get(`http://localhost:5500/apiAdmin/dataOmset/${this.selectedOmset}`, {
        headers:{
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        let jlhOmset = res.data.omset.grandtotal;
        let jlhTrans = res.data.transaksi.jlhTrans;

        this.jlhOmset = jlhOmset == null ? 0 : jlhOmset;
        this.jlhTrans = jlhTrans == null ? 0 : jlhTrans;

        // Panggil axios ketiga
        this.getDataTable();
      }).catch((err) => {
        alert("Gagl ubah changes");
        console.warn(err);
      });
    },
    getDataTable: async function(){
      // ini axios ketiga dan seterusnya. biar g banyak callback pake async await aje
      try {
        const resDataOrder = await axios.get(`http://localhost:5500/apiAdmin/dataOrderan`, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });

        this.dataOrder = JSON.parse(resDataOrder.data) // ini diparse kejson krn returnny string dari python;

        console.log(this.dataOrder);

      } catch (error) {
        console.warn(error);
        return null;
      }
    },

    filterData: function(){
      let filter = this.dataOrder.filter((items) => items.status_order == 'PENDING');
      return filter.slice(0, 3); // Slice the first 3 items
    },

    updateChartOptions: function(data){
      // ini buat update chartnya. ambil dari data hook
      this.chartOptions = {
        ...this.chartOptions,
        labels: data
      }
    },
    valueToPercent: function(val){
      // buat radial bar
      let rumus = (val * 100) / this.maxRadialBar;
      return Math.ceil(rumus); // pembulatan keatas pakai math.ceil()
    },
    showOverlay: function(event){
      this.$refs.op.toggle(event);
    },
    hideOverlay: function(){
      this.$refs.op.hide();
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid;
} */

.fontChart {
  font-family: Helvetica, Arial, sans-serif;
  opacity: 1;
}
</style>
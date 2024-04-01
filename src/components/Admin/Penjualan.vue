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
        <!-- <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div> -->
        <div class="bg-white flex flex-col items-center justify-center">
          <div class="w-full px-2">
            <span class="p-text-secondary block mb-5 text-right">Total Transaksi Bulan {{ txtBlnGlobal }} = {{ countMasterData }} Transaksi </span>
            <div class="w-full overflow-x-scroll md:overflow-auto mt-2">
              <table class="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-0 borer ">
                <thead class="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                  <tr class="">
                    <th class=""></th>
                    <th class="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap  ">
                      No.
                    </th>
                    <th class="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                      No Jual
                    </th>
                    <th class="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                      Pelanggan Id
                    </th>
                    <th class="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                      TglTransaksi
                    </th>
                    <th class="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                      GrandTotal 
                    </th>

                  </tr>
                </thead>
                <tbody v-if="dataMasterOrder.length">
                  <template v-for="(item1, index1) in dataMasterOrder" :key="index1">
                    <tr class="cursor-pointer">
                      <td
                        class="py-9 px-2 text-base  font-normal flex items-center justify-center h-full border-t"
                      >
                        <svg
                          :class="`text-black w-6 h-6 z-40 ${openNestedTable[index1] ? 'rotate-180' : 'rotate-0'}`"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          @click="handleTable(index1)"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </td>
                      <td
                        class="py-2 px-3 font-normal text-base border-t whitespace-nowrap"
                      >
                        {{ index1 + 1}}
                      </td>
                      <td
                        class="py-2 px-3 font-normal text-base border-t whitespace-nowrap"
                      >
                        {{ item1.nojual }}
                      </td>
                      <td
                        class="py-2 px-3 font-normal text-base border-t whitespace-nowrap"
                      >
                        {{ item1.pelanggan_id }}
                      </td>
                      <td
                        class="py-2 px-3 text-base  font-normal border-t whitespace-nowrap"
                      >
                        {{ item1.tgltransaksi }}
                      </td>
                      <td
                        class="py-2 px-3 text-base  font-normal border-t"
                      >
                         Rp. {{ item1.grandtotal }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6" class="pl-10">
                        <h1 :class="`text-md ${openNestedTable[index1] ? 'block' : 'hidden'}`">Detail Barang</h1>
                      </td>
                    </tr>

                    <tr
                      :class="`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${
                        openNestedTable[index1] ? 'max-h-20' : 'max-h-0'
                      }`"
                    >
                      <td colspan="6">
                        <table
                          :class="`px-10 w-fit ${openNestedTable[index1] ? 'block mb-[40px]' : 'hidden'} mx-auto`"
                        >
                          <thead class="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">
                              No
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">
                              Nama Barang
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">
                              Qty
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">
                              Variant
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                              AddOn
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                              Total
                            </th>
                            <th class="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                              Total + Pajak
                            </th>
                          </thead>
                          <tbody>
                            <template v-for="(item2, index2) in loopDataDetilOrder(item1)" :key="index2">
                              <tr class="animate-fade-left whitespace-pre duration-500" :style="`transition-delay: ${index2 + 3}00ms`"> 
                                <td class="py-3 px-4">{{ index2 + 1}}</td>
                                <td class="py-3 px-4">{{ item2.nama_barang }}</td>
                                <td class="py-3 px-4">{{ item2.qty }}</td>
                                <td class="py-3 px-4 text-center">{{ item2.variant }}</td>
                                <td class="py-3 px-4 min-w-[400px]">
                                  <tr>
                                    <td>Ice Cube : {{ item2.ice_cube }}</td>
                                    <td class="pl-5">Ukuran Cup : {{ item2.ukuran_cup }}</td>
                                  </tr>
                                  <tr>
                                    <td>Sweetness :  {{ item2.sweetness }}</td>
                                    <td class="pl-5">Milk : {{ item2.milk }}</td>
                                  </tr>
                                  <tr>
                                    <td>Syrup : {{ item2.syrup }}</td>
                                    <td class="pl-5">Espresso : {{ item2.espresso }} Shot</td>
                                  </tr>
                                  <tr>
                                    <td>Topping : {{ item2.topping }} </td>
                                  </tr>
                                </td>
                                <td class="py-3 px-4 text-center">
                                  Rp. {{ item2.harga_seluruh }} 
                                </td>
                                <td class="py-3 px-4 text-center">
                                  Rp. {{ hitungPjk(item2.harga_seluruh)  }} 
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </template>
                  <!-- {products?.map((data, index) => (
                    <TableRows key={index} data={data} />
                  ))} -->
                  <tr>
                    <td colspan="6" class="border-t"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- <div class="flex flex-wrap" style="border: 1px solid black;" v-for="(item1, index1) in dataMasterOrder"  :key="index1">
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
        </div> -->
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
      counterTable: 0,
      txtBlnGlobal: '',
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
      }],
      openNestedTable: [], //Penjelasan kenapa di init sbg array ada di pdf penjelasanTableNested.
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

        let txtbln = this.translateBulan(bln[1]);
        // let txtbln;
        // switch(parseInt(bln[1])){
        //   case 1:
        //     txtbln = "Januari";
        //     break;
        //   case 2:
        //     txtbln = "Februari";
        //     break;
        //    danseterusny... ak dh pindahkan ke function translateBulan. ini sbg cth aj
        // }

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
    translateBulan: function(angkaBln){
      let txtbln;
      switch(parseInt(angkaBln)){
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

      return txtbln;
    },
    loopDataDetilOrder: function(item1){
      return this.dataDetilOrder.filter((item2) => item1.nojual == item2.nojual_id)
    },
    handleTable: function(index){
      this.openNestedTable[index] = !this.openNestedTable[index];
      // If openNestedTable is an empty string/bool instead of an array, 
      //you won’t be able to store the state of each row separately. 
      //In JavaScript, strings are immutable, 
      //which means you can’t change a character at a specific index like you can with an array.
      //So, if you want to track the state of each row individually, 
      //openNestedTable needs to be an array, not a string.
      //Penjelasan lengkap ada di pdf
      this.counterTable = 0;
    },

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

        this.txtBlnGlobal = this.translateBulan(monthOnly);
      } catch (error) {
        console.warn(error);
        return null;
      }
    },
    hitungPjk: function(total){
      let pjk = 0.11;
      let hitungPjk = total * pjk;
      let hasilPajak = total + hitungPjk;

      return hasilPajak;
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid;
} */

/* tr {
  border: 1px solid;
} */
</style>
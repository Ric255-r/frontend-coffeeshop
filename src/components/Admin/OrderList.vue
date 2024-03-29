<template>
  <div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="mb-3">Menu Order</div>

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
        <tbody v-if="filterData().length">
          <template v-for="(item, index) in filterData()" :key="index + refreshKey">
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
                  <button 
                    @click="openModal(item.jualdetil, item.buktiByr, item.nojual, item.grandtotal, 'pending')" 
                    class="block text-white bg-blue-700 
                    hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800" type="button">
                    View Details
                  </button>
                </td>
            </tr>
            
          </template>

        </tbody>
        <tbody v-else>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
            <td class="text-center py-5" colspan="7">Tidak Ada Data</td>
          </tr>
        </tbody>
      </table>

      <br>

      <div class="mb-2">Processed Order : </div>

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
        <tbody v-if="filterBrewing().length">
          <template v-for="(item, index) in filterBrewing()" :key="index + refreshKey">
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
                <button 
                  @click="openModal(item.jualdetil, item.buktiByr, item.nojual, item.grandtotal, 'process')" 
                  class="block text-white bg-blue-700 
                  hover:bg-blue-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                  dark:focus:ring-blue-800" type="button">
                  View Details
                </button>
              </td>
            </tr>
            
          </template>

        </tbody>
        <tbody v-else>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
            <td class="text-center py-5" colspan="7">Tidak Ada Data</td>
          </tr>
        </tbody>
      </table>

      <br>

      <div class="mb-2">Done Order : </div>

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
        <tbody v-if="filterDone().length">
          <template v-for="(item, index) in filterDone()" :key="index + refreshKey">
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
                <button 
                  @click="openModal(item.jualdetil, item.buktiByr, item.nojual, item.grandtotal, 'done')" 
                  class="block text-white bg-blue-700 
                  hover:bg-blue-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                  dark:focus:ring-blue-800" type="button">
                  View Details
                </button>
              </td>
            </tr>
            
          </template>

        </tbody>
        <tbody v-else>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
            <td class="text-center py-5" colspan="7">Tidak Ada Data</td>
          </tr>
        </tbody>
      </table>


      <Dialog v-model:visible="visible" header="Rincian Pesanan" class="w-full"  :modal="true" :draggable="false">
        <div class="flex flex-wrap align-items-center mb-3">
          <div class="w-1/12">
            <span class="p-text-secondary block mb-5">Bukti Bayar : </span>

          </div>
          <div class="w-5/12 text-center">
            <img 
              :src="`http://localhost:5500/apiAdmin/buktibayar/${modalBuktiByr}`" 
              alt="" :class="`mx-auto my-auto object-cover ${scaleImg == 2 ? ' hover:cursor-zoom-out' : ' hover:cursor-zoom-in'}`" 
              :style="`transform: scale(${scaleImg})`"
              @click="handleZoom()" srcset="" height="220" width="220" />
          </div>

          <template v-if="modeModal == 'done'"> 
            <!-- kalo direact pake <> -->
            <!-- kalo mode modal == done, ga ad aksi apepun -->

          </template>

          <template v-else>
            <div class="w-2/12 text-center" v-if="modeModal == 'pending'">
              <button :class="`bg-blue-600 text-white py-2 rounded w-[180px] ${styleButton}`" @click="handleAcc">Acc? </button>

              <form action="" :class="`${styleForm}`" method="post" @submit.prevent="submitAcc(noJual)">
                <div class="text-left">
                  <label for="gTotal">Input Harga dibayar</label>
                  <input 
                    type="text" 
                    name="gTotal" id="gTotal" 
                    class="rounded-lg w-full" 
                    v-model="bayarCash"
                  />
                </div>
                <button type="submit" class="bg-green-600 py-2 mt-2 w-full rounded-lg text-white">Acc And Brew</button>
              </form>
            </div>

            <div class="w-2/12 text-center" v-if="modeModal == 'process'">
              <form action="" method="post" @submit.prevent="submitAcc(noJual)">
                <button type="submit" class="bg-green-600 py-2 w-[180px] rounded-lg text-white">Done?</button>
              </form>
            </div>

            <div class="w-2/12 text-center">
              <form action="" method="post" @submit.prevent="handleAcc(noJual)">
                <button type="submit" class="bg-red-600 py-2 w-[180px] rounded-lg text-white">Decline</button>
              </form>
            </div>
          </template>

          <div class="w-2/12"></div>
        </div>
        <br />

        <span class="p-text-secondary block mb-5">Pesanan : </span>
        <div class="flex flex-wrap align-items-center mb-3" style="border: 1px solid;">
            <div class="w-2/12">
              <b>Gambar Produk</b>
            </div>
            <div class="w-2/12">
              <b>Nama Produk</b>
            </div>
            <div class="w-4/12">
              <b>Request</b>
            </div>
            <div class="w-2/12">
              <b>Qty</b>
            </div>
            <div class="w-2/12">
              <b>Harga</b>
            </div>
        </div>
        <div class="flex flex-wrap align-items-center mb-3" style="border: 1px solid;" v-for="(items, index) in isiJualDetil" :key="index">
            <div class="w-2/12">
              <img :src="`http://localhost:5500/apiBrg/images/${items.gambar}`" alt="Gbr">
            </div>
            <div class="w-2/12">
              {{ items.nama_barang }}
            </div>
            <div class="w-4/12">
              Variant : {{ items.variant == "" ? "Default" : items.variant }}
              <br />
              Ukuran Cup : {{ items.ukuran_cup == "" ? "Default " : items.ukuran_cup}}
              <br />
              Ice Cup : {{ items.ice_cube }}
              <br />
              Sweetness : {{ items.sweetness }}
              <br />
              Milk : {{ items.milk }}
              <br />
              Syrup : {{ items.syrup }}
              <br />
              Espresso : {{ items.espresso }}
              <br />
              Topping : {{ items.topping }}
            </div>
            <div class="w-2/12">
              Qty : {{ items.qty }}
            </div>
            <div class="w-2/12">
              Rp. {{ items.harga_seluruh }}
            </div>
        </div>
        <div class="flex flex-wrap align-items-center mb-3" style="border: 1px solid;">
            <div class="w-2/12">
            </div>
            <div class="w-2/12">
            </div>
            <div class="w-4/12">
            </div>
            <div class="w-2/12">
              <b>Total Semua</b>
            </div>
            <div class="w-2/12">
              <b>Rp {{grandtotal}} </b>
            </div>
        </div>
        <!-- <div class="flex align-items-center gap-3 mb-5">
            <label for="email" class="font-semibold w-6rem">Email</label>

        </div>
        <div class="flex justify-content-end gap-2">
            <button type="button" label="Cancel" severity="secondary" @click="visible = false"></button>
            <button type="button" label="Save" @click="visible = false"></button>
        </div> -->
      </Dialog>


    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import Dialog from 'primevue/dialog'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

export default {
  name: 'OrderList',
  data: function(){
      return {
        dataOrder: [],
        token: localStorage.getItem('token') || "",
        visible: false,
        isiJualDetil: [],
        modalBuktiByr: "",
        scaleImg: 1,
        noJual: "",
        grandtotal: 0,
        styleForm: ' hidden',
        styleButton: '',
        bayarCash: 0,
        refreshKey: 0,
        modeModal: '',
        statusOrderModal: ''
      }
  },
  components: {
    Dialog
  },
  computed: {

  },
  mounted: function(){
    this.fetchData();
  },
  methods: {
    fetchData: function(){
      axios.get(`http://localhost:5500/apiAdmin/dataOrderan`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        console.log(res);
        const resData = JSON.parse(res.data);

        this.dataOrder = resData;
        // alert("Berhasil");
        console.log(resData);
      }).catch((err) => {
        alert("Gagal");
        console.warn(err);
      });
    },
    filterData: function(){
      let filter = this.dataOrder.filter((items) => items.status_order == 'PENDING');
      return filter;
    },
    filterBrewing: function(){
      let filterBrew = this.dataOrder.filter((items) => items.status_order === 'BREWING');
      console.log(filterBrew);
      return filterBrew;
    },
    filterDone: function(){
      let filterBrew = this.dataOrder.filter((items) => items.status_order === 'DONE');
      console.log(filterBrew);
      return filterBrew;
    },
    openModal: function(jualdetil, buktibayar, nojual, gtotal, modeModal){
      this.isiJualDetil = jualdetil;
      this.modalBuktiByr = buktibayar;
      this.noJual = nojual;
      this.grandtotal = gtotal;
      this.modeModal = modeModal;

      this.styleForm= ' hidden';
      this.styleButton= '';

      console.log(buktibayar);

      this.visible = true;
    },
    handleZoom: function(){
      this.scaleImg = this.scaleImg === 1 ? 2 : 1
    },
    handleAcc: function(){
      this.styleForm = '';
      this.styleButton = ' hidden';
    },
    submitAcc: function(nojual){
      let data = {};

      if(this.modeModal == 'process'){
        data = {
          status_orderan: 'done'
        }
      }else{
        data = {
          bayar_cash: this.bayarCash,
          status_orderan: 'process'
        }
      }

      axios.put(`http://localhost:5500/apiAdmin/dataOrderan/${nojual}`, data , {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        toast("Success Process! ", {
          autoClose: 1500,
          type: 'success'
        });
        
        console.log(res);
        this.visible = false;
        
        this.refreshKey += 1;
        this.fetchData();
      }).catch((err) => {
        if(err.response.status == 402){
          toast("Bayarannya Kurang! ", {
            autoClose: 1500,
            type: 'error'
          })
        }

        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid;
} */
</style>
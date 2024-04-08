<template>
  <!-- Ini Ak ikuti struktur inspect dari menuawal.vue, krn malas mw ubah router ganti children lg -->
  <div class="home poppins-regular">
    <div>
      <div :style="styleBg" class="flex flex-wrap">
        <div class="lg:w-2/12 w-1/12"></div>

        <div class="lg:w-8/12 w-10/12 animate-fade-left bg-white rounded-lg shadow-md mt-10">
          <div class="text-center mt-5 animate-fade-left hidden">
            Anda Belum Memiliki Pesanan
          </div>

          <div class="text-center mt-5 animate-fade-left ">
            <b>Pesanan Anda : </b>
          </div>

          <div class="flex flex-wrap pb-3 pt-2 border-b-2" v-for="(items, i1) in dataPesanan" :key="i1">
            <div class="w-6/12 pl-7">Nomor Pesanan: </div>
            <div class="w-6/12 pr-[55px] text-right">{{ items.nojual }}</div>

            <div class="w-full mb-1"></div>
            <div class="w-6/12 pl-7">Status Pesanan: </div>
            <div class="w-6/12 pr-[55px] text-right">{{ items.status_order }}</div>
            <div class="w-full mb-3"></div>

            <div class="w-full lg:pl-0 pl-7">
              <div class="flex flex-wrap mb-2" v-for="(items2, i2) in items.jualdetil" :key="i2">
                <div class="w-2/12 text-center flex items-center justify-center">
                  <img :src="`http://localhost:5500/apiBrg/images/${JSON.parse(items2.gambar)[0]}`" alt="" class="object-cover h-[100px] w-[100px] rounded-lg" />
                </div>

                <div class="w-10/12">
                  <div class="font-bold lg:pl-0 pl-2">{{ items2.nama_barang }} </div>
                  <div class="py-1 text-xs lg:pl-0 pl-2">
                    Variant {{ items2.variant }}
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>

        <div class="lg:w-2/12 w-1/12"></div>

        <NavbarBottom class="mt-3"></NavbarBottom>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarBottom from "./NavbarBottom.vue";
import {toast} from 'vue3-toastify'

export default {
  name: "pesanan-component",
  data: function () {
    return {
      styleBg: "",
      token: localStorage.getItem('token') || "",
      dataPesanan: []
    };
  },
  components: {
    NavbarBottom,
  },
  mounted: function () {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.fetchData();
  },
  methods: {
    fetchData: function () {
      axios.get('http://localhost:5500/apiUser/pesanan', {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        const resData = JSON.parse(res.data);

        // alert("Sukses Get Data");
        console.log(resData);

        this.dataPesanan = resData;
      }).catch((err) => {
        toast("Gagal Get Pesanan", {
          autoClose: 2500,
          type: 'success'
        });

        console.log(err);
      })
    },
    handleResize: function () {
      if (window.innerWidth < 1000) {
        this.styleBg =
          "background: linear-gradient(to top,  #FFFFFF 85%, #057a55 15%)";
      } else {
        this.styleBg =
          "background: linear-gradient(to top,  #FFFFFF 85%, #057a55 15%)";
      }
    },
  },
};
</script>

<style scoped>
/* div {
  border: 1px solid;
} */
</style>
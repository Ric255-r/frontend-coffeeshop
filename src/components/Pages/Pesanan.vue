<template>
  <!-- Ini Ak ikuti struktur inspect dari menuawal.vue, krn malas mw ubah router ganti children lg -->
  <div class="home poppins-regular pesanan-page">
    <div>
      <div :style="styleBg" class="flex flex-wrap min-h-screen">
        <div class="lg:w-2/12 w-1/12"></div>

        <div class="lg:w-8/12 w-10/12 animate-fade-left bg-white/95 rounded-2xl shadow-2xl shadow-emerald-950/10 border border-white mt-10 mb-[100px] overflow-hidden pesanan-shell">

          <div class="flex flex-wrap items-center px-7 py-5 border-b border-emerald-50 pesanan-head">
            <div class="w-8/12">
              <div class="text-xs uppercase tracking-wide text-emerald-700 font-bold">Order History</div>
              <div class="font-bold text-2xl text-stone-900">Pesanan Anda</div>
              <div class="text-sm text-stone-500 mt-1">{{ dataPesanan.length }} pesanan tercatat</div>
            </div>
            <div class="w-4/12 text-right">
              <span class="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
                {{ dataPesanan.length }} Order
              </span>
            </div>
          </div>

          <div :class="`text-center animate-fade-left py-12 px-5 ${dataPesanan.length > 0 ? ' hidden' : ''}` ">
            <div class="mx-auto max-w-sm rounded-2xl bg-stone-50 border border-stone-100 p-6">
              <div class="text-4xl text-emerald-700 mb-3"><i class="fas fa-receipt"></i></div>
              <div class="font-bold text-stone-900">Anda Belum Memiliki Pesanan</div>
              <div class="text-sm text-stone-500 mt-1">Pesanan yang sudah diproses akan muncul di sini.</div>
              <router-link to="/home" class="inline-block mt-4 rounded-xl bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800 transition">Pilih Menu</router-link>
            </div>
          </div>

          <div :class="`flex flex-wrap px-5 py-5 border-b border-stone-100 pesanan-card ${dataPesanan.length > 0 ? '' : ' hidden'}`" v-for="(items, i1) in dataPesanan" :key="i1">
            <div class="w-full rounded-2xl border border-stone-100 bg-stone-50/70 p-4">
              <div class="flex flex-wrap items-center mb-4">
                <div class="w-7/12">
                  <div class="text-xs text-stone-500">Nomor Pesanan</div>
                  <div class="font-bold text-stone-900 text-lg">{{ items.nojual }}</div>
                </div>
                <div class="w-5/12 text-right">
                  <span class="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-semibold">{{ items.status_order }}</span>
                </div>
              </div>

              <div class="w-full">
                <div class="flex flex-wrap mb-3 rounded-2xl bg-white border border-white p-3 pesanan-item" v-for="(items2, i2) in items.jualdetil" :key="i2">
                  <div class="lg:w-2/12 md:w-2/12 sm:w-3/12 w-4/12 text-center flex items-center justify-center">
                    <img :src="getImg(JSON.parse(items2.gambar)[0], items2.source_data)" alt="" class="object-cover h-[100px] w-[100px] rounded-2xl shadow-md shadow-stone-900/10 border border-white" />
                  </div>

                  <div class="lg:w-10/12 md:w-10/12 sm:w-9/12 w-8/12 pl-3">
                    <div class="font-bold text-stone-900 text-base">{{ items2.nama_barang }} </div>
                    <div class="flex flex-wrap mt-2">
                      <span class="order-chip">Variant: {{ items2.variant }}</span>
                      <span class="order-chip">Cup: {{ items2.ukuran_cup }}</span>
                      <span class="order-chip">Ice: {{ items2.ice_cube }}</span>
                      <span class="order-chip">Espresso: {{ items2.espresso }}</span>
                      <span class="order-chip">Sweetness: {{ items2.sweetness }}</span>
                      <span class="order-chip">Milk: {{ items2.milk }}</span>
                      <span class="order-chip">Syrup: {{ JSON.parse(items2.syrup).length ? JSON.parse(items2.syrup).join(', ') : 'Tanpa Sirup' }}</span>
                      <span class="order-chip">Topping: {{ JSON.parse(items2.topping).length ? JSON.parse(items2.topping).join(', ') : 'Tanpa Topping' }}</span>
                    </div>
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
  beforeUnmount: function () {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getImg: function(img, srcData){
      console.log(srcData);
      if(srcData == 'import'){
        return img;
      }
      return `http://localhost:5500/api/images/${img}`;
    },
    fetchData: function () {
      axios.get('http://localhost:5500/api/pesanan', {
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
          "background: linear-gradient(to bottom, #057a55 0px, #057a55 170px, #FFFFFF 170px, #FFFFFF 100%)";
      } else {
        this.styleBg =
          "background: linear-gradient(to bottom, #057a55 0px, #057a55 210px, #FFFFFF 210px, #FFFFFF 100%)";
      }
    },
  },
};
</script>

<style scoped>
/* div {
  border: 1px solid;
} */

.pesanan-page {
  background-color: #ffffff;
}

.pesanan-shell {
  background:
    linear-gradient(135deg, rgba(236, 253, 245, 0.78), rgba(255, 255, 255, 0.98) 28%),
    #ffffff;
}

.pesanan-head {
  background: linear-gradient(135deg, rgba(236, 253, 245, 0.95), #ffffff);
}

.pesanan-card {
  transition: background-color 0.2s ease;
}

.pesanan-card:hover {
  background: rgba(236, 253, 245, 0.22);
}

.pesanan-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.pesanan-item:hover {
  transform: translateY(-1px);
  border-color: #bbf7d0;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
}

.order-chip {
  display: inline-flex;
  align-items: center;
  margin: 0.25rem 0.3rem 0 0;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid #e7eee9;
  background: #f8faf8;
  color: #57534e;
  font-size: 0.72rem;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .order-chip {
    font-size: 0.68rem;
  }
}
</style>

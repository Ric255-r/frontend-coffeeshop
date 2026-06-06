<template>
  <!-- Ini Ak ikuti struktur inspect dari menuawal.vue, krn malas mw ubah router ganti children lg -->
  <div class="home poppins-regular pesanan-page">
    <div>
      <div :style="styleBg" class="flex flex-wrap min-h-screen">
        <div class="lg:w-2/12 md:w-1/12 hidden md:block"></div>

        <div class="lg:w-8/12 md:w-10/12 w-full px-4 lg:px-0 md:px-0 animate-fade-left bg-white/95 rounded-2xl shadow-2xl shadow-emerald-950/10 border border-white mt-10 mb-[100px] overflow-hidden pesanan-shell">

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
              <div class="flex flex-wrap items-center mb-4 pb-3 border-b border-stone-200/40">
                <div class="w-7/12">
                  <div class="text-xs text-stone-500">Nomor Pesanan</div>
                  <div class="font-bold text-stone-900 text-lg">{{ items.nojual }}</div>
                </div>
                <div class="w-5/12 text-right flex items-center justify-end gap-2">
                  <span class="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-semibold">{{ items.status_order }}</span>
                </div>
              </div>

              <div class="w-full">
                <div class="flex flex-wrap mb-3 rounded-2xl bg-white border border-white p-3 pesanan-item" v-for="(items2, i2) in items.jualdetil" :key="i2">
                  <!-- Desktop View -->
                  <div class="hidden md:flex w-full">
                    <div class="lg:w-2/12 md:w-2/12 sm:w-3/12 w-3/12 text-center flex items-center justify-center">
                      <img :src="getImg(JSON.parse(items2.gambar)[0], items2.source_data)" alt="" class="object-cover h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-2xl shadow-md shadow-stone-900/10 border border-white" />
                    </div>

                    <div class="lg:w-10/12 md:w-10/12 sm:w-9/12 w-9/12 pl-3">
                      <div class="font-bold text-stone-900 text-base leading-tight">{{ items2.nama_barang }}</div>
                      
                      <!-- Desktop Order Chips -->
                      <div class="flex flex-wrap gap-x-2 gap-y-1.5 mt-2">
                        <span class="order-chip" v-if="items2.variant">Variant: {{ items2.variant }}</span>
                        <span class="order-chip" v-if="items2.ukuran_cup">Cup: {{ items2.ukuran_cup }}</span>
                        <span class="order-chip" v-if="items2.ice_cube">Ice: {{ items2.ice_cube === 'NONE' ? 'No Ice' : items2.ice_cube }}</span>
                        <span class="order-chip" v-if="items2.espresso">Espresso: {{ items2.espresso === '0' ? 'Normal' : items2.espresso }}</span>
                        <span class="order-chip" v-if="items2.sweetness">Sweetness: {{ items2.sweetness }}</span>
                        <span class="order-chip" v-if="items2.milk">Milk: {{ items2.milk }}</span>
                        <span class="order-chip" v-if="JSON.parse(items2.syrup).length">Syrup: {{ JSON.parse(items2.syrup).join(', ') }}</span>
                        <span class="order-chip" v-if="JSON.parse(items2.topping).length">Topping: {{ JSON.parse(items2.topping).join(', ') }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Mobile View (Tokopedia & Sketch Style) -->
                  <div class="md:hidden flex flex-col gap-3 w-full">
                    <div class="flex gap-3">
                      <!-- Product Image -->
                      <img :src="getImg(JSON.parse(items2.gambar)[0], items2.source_data)" alt="" class="object-cover h-20 w-20 rounded-2xl shadow-md shadow-stone-900/10 border border-white flex-shrink-0" />
                      
                      <!-- Product Details -->
                      <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div class="flex items-start justify-between gap-2">
                          <div class="font-bold text-stone-900 text-base leading-tight truncate">
                            {{ items2.nama_barang }}
                          </div>
                        </div>
                        
                        <!-- Separator Line -->
                        <div class="h-[1px] bg-stone-100 my-1.5 w-full"></div>
                        
                        <!-- Qty and Price -->
                        <div class="text-xs text-emerald-800 font-semibold">
                          {{ items2.qty }} barang x Rp. {{ items2.harga_akhir }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Structured Customization Grid (3 Columns) -->
                    <div class="mt-2 flex flex-wrap text-[10px] text-stone-500 bg-stone-50 border border-stone-100 rounded-xl p-2.5">
                      <div class="w-1/3 pr-1 mb-1.5 flex items-center">
                        <i :class="`${items2.variant === 'hot' ? 'fas fa-sun text-red-500' : 'far fa-snowflake text-cyan-500'} w-4 text-center mr-1.5`" title="Variant"></i>
                        <span class="font-medium text-stone-700 capitalize">{{ items2.variant }}</span>
                      </div>
                      <div class="w-1/3 px-0.5 mb-1.5 flex items-center">
                        <i class="fas fa-mug-hot w-4 text-center mr-1.5 text-stone-400" title="Cup Size"></i>
                        <span class="font-medium text-stone-700 uppercase">Cup {{ items2.ukuran_cup }}</span>
                      </div>
                      <div class="w-1/3 pl-1 mb-1.5 flex items-center">
                        <i class="fas fa-cube w-4 text-center mr-1.5 text-stone-400" title="Ice"></i>
                        <span class="font-medium text-stone-700 capitalize">{{ items2.ice_cube === 'NONE' ? 'No Ice' : items2.ice_cube.toLowerCase() + ' ice' }}</span>
                      </div>
                      <div class="w-1/3 pr-1 mb-1.5 flex items-center">
                        <i class="fas fa-coffee w-4 text-center mr-1.5 text-stone-400" title="Espresso"></i>
                        <span class="font-medium text-stone-700 capitalize">{{ items2.espresso === '0' ? 'Normal' : items2.espresso }}</span>
                      </div>
                      <div class="w-1/3 px-0.5 mb-1.5 flex items-center">
                        <i class="fas fa-cubes w-4 text-center mr-1.5 text-stone-400" title="Sweetness"></i>
                        <span class="font-medium text-stone-700 capitalize">{{ items2.sweetness.toLowerCase() + ' sweetness' }}</span>
                      </div>
                      <div class="w-1/3 pl-1 mb-1.5 flex items-center">
                        <i class="fas fa-cow w-4 text-center mr-1.5 text-stone-400" title="Milk"></i>
                        <span class="font-medium text-stone-700 capitalize">{{ items2.milk.toLowerCase() + ' milk' }}</span>
                      </div>
                      
                      <div class="w-full mt-1.5 pt-1.5 border-t border-stone-200/50 flex items-start">
                        <i class="fas fa-prescription-bottle w-4 text-center mr-1.5 mt-0.5 text-stone-400" title="Syrup"></i>
                        <span class="font-medium text-stone-700 text-left flex-1">
                          {{ JSON.parse(items2.syrup).length ? JSON.parse(items2.syrup).join(', ') : 'Tanpa Sirup' }}
                        </span>
                      </div>
                      <div class="w-full mt-1 flex items-start">
                        <i class="fas fa-cookie-bite w-4 text-center mr-1.5 mt-0.5 text-stone-400" title="Topping"></i>
                        <span class="font-medium text-stone-700 text-left flex-1">
                          {{ JSON.parse(items2.topping).length ? JSON.parse(items2.topping).join(', ') : 'Tanpa Topping' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom transaction summary (Tokopedia Style) -->
              <div class="w-full mt-4 flex items-center justify-between border-t border-stone-200/60 pt-3">
                <div class="text-[11px] text-stone-400">
                  Tanggal: {{ items.tgltransaksi }}
                </div>
                <div class="text-xs sm:text-sm font-semibold text-stone-900">
                  Total Belanja: <span class="text-emerald-700 font-bold">Rp. {{ items.grandtotal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-2/12 md:w-1/12 hidden md:block"></div>

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
    formatItemDetails: function (item) {
      let details = [];
      if (item.variant) {
        details.push(item.variant.charAt(0).toUpperCase() + item.variant.slice(1));
      }
      if (item.ukuran_cup) {
        details.push(`Cup ${item.ukuran_cup}`);
      }
      if (item.ice_cube && item.ice_cube !== 'NORMAL') {
        let ice = item.ice_cube;
        if (ice === 'NONE') ice = 'No Ice';
        details.push(`Ice: ${ice}`);
      }
      if (item.espresso && item.espresso !== '0' && item.espresso !== 'NORMAL') {
        details.push(`Espresso: ${item.espresso}`);
      }
      if (item.sweetness && item.sweetness !== 'NORMAL') {
        details.push(`Sweetness: ${item.sweetness}`);
      }
      if (item.milk && item.milk !== 'NORMAL') {
        details.push(`Milk: ${item.milk}`);
      }
      try {
        const syrups = JSON.parse(item.syrup);
        if (syrups && syrups.length > 0 && !syrups.includes('Tanpa Sirup') && !syrups.includes('Tanpa Syrup')) {
          details.push(`Syrup: ${syrups.join(', ')}`);
        }
      } catch (e) {
        // Ignored
      }
      try {
        const toppings = JSON.parse(item.topping);
        if (toppings && toppings.length > 0 && !toppings.includes('Tanpa Topping')) {
          details.push(`Topping: ${toppings.join(', ')}`);
        }
      } catch (e) {
        // Ignored
      }
      return details.join(' • ');
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
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: 1px solid #e2ece6;
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

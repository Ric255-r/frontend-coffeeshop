<template>
    <div class="poppins-regular text-stone-800 detail-page">
        <div class=" animate-fade items-center justify-center">
            <div class="flex flex-wrap">
                <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">
                    <!-- Hai -->
                </div>
                <div class="lg:w-8/12 lg:px-4 md:w-8/12 md:px-3 w-full px-3 bg-white/95 shadow-2xl shadow-emerald-950/10 border border-white rounded-2xl overflow-hidden detail-shell">
                    <div class="flex flex-wrap">
                        <div class="lg:w-3/12 md:w-3/12 w-full brands-listnya product-gallery">
                            <div class="wrappernya lg:py-2 md:py-2 sm:py-2 py-1">
                                <div class="" v-for="(item, index) in dataBarang.gambar" :key="index">
                                    <img :src="loadGbrCarousel(item, dataBarang.source_data)" alt="..." class="pl-1 w-full lg:h-56 md:h-[220px] h-72 object-cover rounded-2xl">
                                </div>
                                <!-- Mesti Load 2x biar kesannnya Infinite Looping Carouselnya -->
                                <div class="" v-for="(item, index) in dataBarang.gambar" :key="index">
                                    <img :src="loadGbrCarousel(item, dataBarang.source_data)" alt="..." class="pl-1 w-full lg:h-56 md:h-[220px] h-72 object-cover rounded-2xl">
                                </div>
                            </div>

                        </div>

                        <div class="lg:w-9/12 lg:pl-5 md:w-9/12 md:pl-4 w-full lg:mt-0 md:mt-0 sm:mt-0 mt-3">
                            <div class="flex flex-wrap product-intro">
                                <div class="w-full text-xs font-semibold uppercase text-emerald-700 tracking-wide lg:pl-2 md:pl-2">
                                    Coffee Detail
                                </div>
                                <div class="w-full lg:pt-1 font-bold capitalize text-[30px] lg:pl-2 md:pl-2 text-stone-900 leading-tight">
                                    {{ dataBarang.nama_barang }}
                                </div>
                            </div>
                            <div class="w-full mt-2 text-sm capitalize lg:pl-2 md:pl-2 text-stone-500 leading-relaxed">
                                {{ dataBarang.deskripsi }}  
                            </div>
                            <div class="w-full mt-4 lg:pl-2 md:pl-2">
                                <div class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2 font-bold shadow-sm">
                                    Rp. {{ dataBarang.harga }}
                                </div>
                            </div>

                            <!-- Utk Tampilan Web -->
                            <div class="w-full mt-5 lg:pl-2 md:pl-2 lg:block md:block  hidden">
                                <p class="font-semibold text-stone-900">Variant Tersedia :</p>
                                <div class="flex flex-wrap mt-3">
                                    <div class="w-6/12 pr-1.5">
                                        <button :class="`${selectedVariant == 'hot' ? 'bg-red-50/80 border-2 border-red-500 text-red-700 font-bold shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50' } text-base py-2.5 px-4 w-full rounded-xl transition flex items-center justify-center gap-2`" @click="handleVariant('hot')">
                                            <i class="fas fa-sun text-red-500"></i>
                                            <span class="text-sm font-semibold">Hot</span>
                                        </button>
                                    </div>

                                    <div class="w-6/12 pl-1.5">
                                        <button :class="`${selectedVariant == 'cold' ? 'bg-cyan-50/80 border-2 border-cyan-500 text-cyan-700 font-bold shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50' } text-base py-2.5 px-4 w-full rounded-xl transition flex items-center justify-center gap-2`" @click="handleVariant('cold')">
                                            <i class="far fa-snowflake text-cyan-500"></i>
                                            <span class="text-sm font-semibold">Cold</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <!-- Utk Tampilan Mobile -->
                        <div class="w-full mt-5 lg:hidden md:hidden option-card">
                            <b class="text-stone-900">Variant Tersedia :</b>
                            <div class="flex flex-wrap mt-3">
                                <div class="w-6/12 pr-1.5">
                                    <button :class="`${selectedVariant == 'hot' ? 'bg-red-50/80 border-2 border-red-500 text-red-700 font-bold shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50' } text-base py-2.5 px-4 w-full rounded-xl transition flex items-center justify-center gap-2`" @click="handleVariant('hot')">
                                        <i class="fas fa-sun text-red-500"></i>
                                        <span class="text-sm font-semibold">Hot</span>
                                    </button>
                                </div>

                                <div class="w-6/12 pl-1.5">
                                    <button :class="`${selectedVariant == 'cold' ? 'bg-cyan-50/80 border-2 border-cyan-500 text-cyan-700 font-bold shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50' } text-base py-2.5 px-4 w-full rounded-xl transition flex items-center justify-center gap-2`" @click="handleVariant('cold')">
                                        <i class="far fa-snowflake text-cyan-500"></i>
                                        <span class="text-sm font-semibold">Cold</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-6 option-card" v-if="showCup.length > 0">
                            <span v-if="showCup.length > 0"><b>Ukuran Cup : </b></span>

                            <div class="flex flex-wrap mt-2" v-for="(item, index) in showCup" :key="index">
                                <div class="w-3/12">
                                    {{ item.nama_topping }}
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. {{ item.harga }}
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="cup" :id="'rbCup' + index"
                                        :value="item.nama_topping"
                                        v-model="selectedCup" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 option-card">
                            <span><b>Ice Cube : </b></span>
                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    Normal
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="ice_cube" 
                                        id="" 
                                        :value="'NORMAL'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    LESS
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="ice_cube" 
                                        id="" 
                                        :value="'LESS'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    MORE
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="ice_cube" 
                                        id="" 
                                        :value="'MORE'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    No Ice
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="ice_cube" 
                                        id="" 
                                        :value="'NONE'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 option-card">
                            <span><b>Espresso : </b></span>
                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    Normal
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp.0
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" name="espresso" 
                                        :id="'rbEspresso0'" v-model="selectedExpresso" 
                                        :value="'0'" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2" v-for="(item, index) in showEspresso" :key="index">
                                <div class="w-3/12">
                                    {{ item.nama_topping }} Shot
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. {{ item.harga }}
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="espresso"
                                        :id="'rbEspresso' + (index+1)" v-model="selectedExpresso" 
                                        :value="item.nama_topping" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 option-card">
                            <span><b>Sweetness : </b></span>
                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    Normal
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="sweetness" 
                                        id="" 
                                        :value="'NORMAL'"
                                        v-model="selectedSweetness"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    Less
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="sweetness" 
                                        id="" 
                                        :value="'LESS'"
                                        v-model="selectedSweetness"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 option-card" v-if="showMilk.length > 0">
                            <span v-if="showMilk.length > 0"><b>{{ showMilk[0].kategori }}</b></span>

                            <div class="flex flex-wrap mt-2">
                                <div class="w-3/12">
                                    Normal
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="Milk" 
                                        id="radio_-1" 
                                        :value="'NORMAL'"
                                        v-model="selectedMilk"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-2" v-for="(item, index) in showMilk" :key="index">
                                <div class="w-3/12">
                                    {{ item.nama_topping }}
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. {{ item.harga }}
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="Milk" 
                                        :id="'radio_' + index" v-model="selectedMilk" 
                                        :value="item.nama_topping" @change="changeTotalSemua"
                                    /> 
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 option-card" v-if="showSyrup.length > 0">
                            <span v-if="showSyrup.length > 0"> <b>{{ showSyrup[0].kategori }}</b></span>

                            <div class="flex flex-wrap mt-2" v-for="item in showSyrup" :key="item.id">
                                <div class="w-3/12">
                                    {{ item.nama_topping }}
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. {{ item.harga }}
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="checkbox" 
                                        name="syrup" v-model="checkedSyrup" 
                                        :value="item.nama_topping" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-5 mb-5 option-card" v-if="showTopping.length > 0">
                            <span v-if="showTopping.length > 0"><b>{{ showTopping[0].kategori }}</b></span>

                            <div class="flex flex-wrap mt-2" v-for="item in showTopping" :key="item.id">
                                <div class="w-3/12">
                                    {{ item.nama_topping }}
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. {{ item.harga }}
                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="checkbox" 
                                        name="topping" v-model="checkedTopping" 
                                        :value="item.nama_topping" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block"> 
                    <div class="sticky top-4 rounded-2xl py-5 px-3 mt-1 mx-1 bg-white shadow-xl shadow-emerald-950/10 border border-emerald-100 order-sidebar">

                        <div class="flex flex-wrap" v-if="handleSubTotal()">
                            <div class="w-full mb-2">
                                <p class="text-[11px] uppercase tracking-wide text-emerald-700 font-bold">Keranjang</p>
                            </div>
                            <div class="w-full">
                                <div class="cursor-pointer mt-1" v-for="(item, index) in loadSameProducts()" :key="index" >
                                    <div class="flex flex-wrap mt-2 rounded-xl group/item hover:bg-emerald-50 transition"
                                        v-if="item.id_barang == dataBarang.id" 
                                        :style="`border: ${selectedProducts === index ? `1px solid #047857` : `1px solid transparent`}`">

                                        <div class="flex flex-wrap" >
                                            <div class="lg:w-2/12 md:w-2/12 w-4/12 text-center flex items-center justify-center" @click="handleSelectedProducts(index)">
                                                <img :src="loadGbr(dataBarang.gambar[0], dataBarang.source_data)" alt="" class="object-cover h-[50px] w-[50px] rounded-xl">
                                            </div>
                                            
                                            <div class="lg:w-9/12 md:w-9/12 w-8/12 capitalize text-[10px]" @click="handleSelectedProducts(index)">
                                                <p class="pl-1 font-bold">{{ dataBarang.nama_barang }}</p>
                                                <p class="pl-1 text-gray-800"><span class="font-bold">Summary :</span> {{ item.variant + ', ' + item.ukuran_cup + ', ' + item.ice_cube + ', ' }} {{item.espresso  == 0 ? 'No Espresso' : '1 Shot Espresso'}} , {{ item.sweetness }} Sweetness, {{ item.milk}} Milk, {{ item.syrup.length ? item.syrup + ', ' : ''}} {{ item.topping.length ? item.topping + ', ' : ''}}</p>

                                                
                                            </div>

                                            <div class="lg:w-1/12 mb-5 flex pt-1 justify-center invisible group-hover/item:visible hover:bg-slate-400 rounded-lg hover:cursor-pointer" @click="handleHapus(index)">
                                                <i class="fas fa-trash"></i>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>

                            <div class="w-full text-[12px] font-bold text-right mt-4 rounded-xl bg-emerald-50 text-emerald-800 px-3 py-2">
                                <p class="">Subtotal : {{ handleSubTotal() }}</p>
                            </div>

                            <div class="w-full text-right mt-1">
                                <span class="text-[10px] pr-3">Add New?</span>
                                <button 
                                    class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-[30px] w-[30px] transition"
                                    @click="handleTambahBaru"><i class="fas fa-plus-circle"></i></button>
                            </div>
                        </div>

                        <div class="flex flex-wrap" v-else>
                            <div class="w-full">
                                <p class="text-[11px] uppercase tracking-wide text-emerald-700 font-bold">Keranjang</p>
                                <p class="text-[12px] font-bold text-right pr-2 mt-3 rounded-xl bg-stone-50 px-3 py-2">Subtotal : 0</p>
                                <p class="text-right pt-2">
                                    <button 
                                        class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-[30px] w-[30px] transition"
                                        @click="handleTambahBaru"><i class="fas fa-plus-circle"></i>
                                    </button>
                                </p>
                                
                            </div>
                        </div>

                    </div>
                    
                </div>

            </div>

            <!-- Ksh Key utk Force update component -->
            <BubbleCartVue :key="componentKey" class="hidden lg:block md:block"></BubbleCartVue>

            <!-- Menu Responsive -->

            <div class="flex items-center justify-between text-white lg:hidden md:hidden sticky bottom-[68px] bg-white/95 backdrop-blur py-3 px-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] border-t border-emerald-100 mobile-order-bar">
                
                <div class="flex items-center gap-2">
                    <button @click="handleMinus()" class="rounded-full bg-red-500 hover:bg-red-600 text-white w-[30px] h-[30px] shadow-sm transition flex items-center justify-center" >
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" name="" id="idQtyResp" v-model="qty" class="w-12 rounded-xl text-center border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 p-1 text-black font-semibold">
                    <button @click="handlePlus()" class="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white w-[30px] h-[30px] shadow-sm transition flex items-center justify-center">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="flex items-center gap-2 flex-1 justify-end">
                    <button 
                        v-if="toggleAddBtn"
                        class="py-2.5 px-4 rounded-xl border border-emerald-600 bg-transparent text-emerald-700 hover:bg-emerald-700 hover:text-white transition text-sm font-semibold whitespace-nowrap" 
                        @click="handleTambahBaru">
                        Add New?
                    </button>

                    <router-link to="/checkout" 
                        class="relative bg-emerald-700 py-2.5 px-6 rounded-xl hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 transition text-sm font-semibold text-center whitespace-nowrap flex items-center justify-center">
                        <span>Go To Cart</span>
                        <span :key="updateBadge" :class="lengthCart > 0 ? 'absolute -top-2 -right-2 bg-red-600 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold px-1' : 'hidden'">{{ lengthCart }}</span>
                    </router-link>
                </div>
            </div>

            <NavbarBottom></NavbarBottom>
            
        </div>



    </div>


</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import axios from 'axios';
import BubbleCartVue from './BubbleCart.vue';
import {toast} from 'vue3-toastify'
import { getCart, setCart, getTotalHarga, setTotalHarga, hasCart } from '@/utils/cartStorage';
// import { initFlowbite } from 'flowbite';

export default {
    name: 'barang-detail',
    props: {
        // ini diambil dari queryString yg dipass lewat checkout.vue
        productOrder: {
            type: String,
            default: "-1"
        }
    },
    data: function(){
        return {
            params : this.$route.params.id,
            dataBarang: {},
            dataTopping: [],
            checkedSyrup: [],
            checkedTopping: [],
            selectedExpresso: "0",
            selectedIceCube: "NORMAL",
            selectedCup: "R",
            selectedSweetness: "NORMAL",
            selectedMilk: 'NORMAL',
            selectedVariant: '',
            allObj : {
                "id_barang": this.$route.params.id,
                "nama_barang": null,
                "ukuran_cup": null,
                "milk": null,
                "topping": [],
                "syrup": [],
                "variant": null,
                "ice_cube": null,
                "sweetness": null,
                "espresso": null,
                "qty": 1 // ini pas onchangeTopping. changeProcedure.
            },
            hargaAwal: 0,
            totalHarga: 0,
            componentKey: 0,
            widthCarousel: '',
            translateCarousel: '',
            selectedProducts: -1, // buat pilih product yg sama, dgn variant yg berbeda
            lengthCart: 0,
            toggleAddBtn: false,
            qty: 0, // ini pada saat event handleTambahBaru
        }
    },
    components: {
        NavbarBottom,
        BubbleCartVue,
    },
    mounted: function(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        // Supaya dia tetap stay diatas. pas onload.
        window.scrollTo(0,0);

        let token = localStorage.getItem('token');

        axios.get(`http://localhost:5500/api/barang/${this.params}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
            // harus pakai arrow function. 
            // karena this di vue merujuk ke dataBarang, kalo pake func biasa ntr dia ke scope function axios.
        }).then((response) => {
            // alert("Berhasil Tarik barang");
            // console.log(response.data);
            this.dataBarang = response.data.dataBarang;
            this.dataTopping = response.data.dataTopping;
            this.hargaAwal = response.data.dataBarang.harga;

            // Buat Nyesuain length gbr carousel
            // this.lengthCarousel = `calc(-${this.dataBarang.gambar.length} * 10rem)`;
            // this.lengthCarousel = `calc(-2 * 20rem)`;
            this.translateCarousel = `calc(-${this.dataBarang.gambar.length} * ${this.widthCarousel})`;

            let totalCup = 0;
            let totalMilk = 0;
            let totalSyrup = 0;
            let totalTopping = 0;
            let totalEspresso = 0;

            if(hasCart()){
                let ls = getCart();

                // Menu Responsive. buat check cartlength
                // this.lengthCart = ls.length;
                for (let i = 0; i < ls.length; i++) {
                    this.lengthCart = this.lengthCart + ls[i].qty 
                    
                }

                let cariIndex = ls.findIndex((item) => item.id_barang == this.params);

                //this.Productorder ini diambil dari props yang dipass oleh checkout.vue
                // bentuknya adalah queryString. jadi klo mw akses di child component ttp pake props
                // tapi pass dari komponent utama ke child itu pake query di router-link
                if(this.productOrder != "-1"){
                    let array = ls.map((item, index) => {
                        if(item.id_barang == this.params){
                            return index;
                        }
                    });

                    if(array.includes(parseInt(this.productOrder))){
                        cariIndex = parseInt(this.productOrder);
                        this.selectedProducts = cariIndex;
                    }else{
                        this.$router.push('/home');
                        return; // biar dia g jalanin code dibawahny. jd abis router push, stop
                    }

                    console.log(array);
                }else{
                    // Ini code original sblm tambah this.productOrder;
                    this.selectedProducts = cariIndex;
                }

                if(cariIndex !== -1){
                    // buat trigger btn addtocart pas menu responsive
                    this.toggleAddBtn = true;
                    // Rumus Perhitungan Cup & Susu
                    // Tanpa looping. langsung tembak ke index yg udh dicari
                    this.selectedMilk = ls[cariIndex].milk;
                    this.selectedCup = ls[cariIndex].ukuran_cup;
                    this.selectedExpresso = ls[cariIndex].espresso;
                    this.selectedIceCube = ls[cariIndex].ice_cube;
                    this.selectedSweetness = ls[cariIndex].sweetness;
                    this.qty = ls[cariIndex].qty;

                    // console.log(cariIndex)

                    for(let i = 0; i < this.dataTopping.length; i++){
                        if(this.dataTopping[i].nama_topping == ls[cariIndex].milk){
                            totalMilk = this.dataTopping[i].harga;
                        }
                        if(this.dataTopping[i].nama_topping == ls[cariIndex].ukuran_cup){
                            totalCup = this.dataTopping[i].harga;
                        }
                        if(this.dataTopping[i].nama_topping == ls[cariIndex].espresso){
                            totalEspresso = this.dataTopping[i].harga;
                        }
                    }
                    // End Rumus Susu & Cup

                    // Rumus Syrup
                    // Ini Cara Buat Checkbox KeCheck pas Mounted/Refresh.
                    // Setengah Mati Cari ini.. Ternyata Checkbox ga perlu pake :checked
                    // Cukup pakai v-model saja dia udh bs buat checked.
                    this.checkedSyrup = ls
                                        .filter(item => item.id_barang == this.params)
                                        .map(item => item.syrup)
                                        .flat();
                    // Flat bakal return jadi satu biji array yg digabung
                    // Kalo loop biasa kan dia bakal pecah berdasarkan index
                    // Kalo ini stelah dimap, lalu diflat, jadinya bentuk awal array lagi.

                    for (let i = 0; i < this.dataTopping.length; i++) {
                        if(this.checkedSyrup.includes(this.dataTopping[i].nama_topping)){
                            totalSyrup += this.dataTopping[i].harga;
                        }
                    }
                    // End Rumus Syrup

                    // Rumus Topping. aku ga filter lg kaya diatas, krn indexny sudh dapat.
                    this.checkedTopping = ls[cariIndex].topping.map(item => item).flat();
                    
                    for(let i = 0; i < this.dataTopping.length; i++){
                        if(this.checkedTopping.includes(this.dataTopping[i].nama_topping)){
                            totalTopping += this.dataTopping[i].harga;
                        }
                    }
                    // End Rumus Topping
                }
            }
            // kemungkinan g kepake lg, udh digantikan sm handleSubTotal. kedepanny akan coba rombak
            // Original
            // this.totalHarga = this.hargaAwal + totalEspresso + totalCup + totalMilk + totalSyrup + totalTopping;        
            // console.log(this.totalHarga);
            // End Original
            let totalHargaGKepake = this.totalHarga = this.hargaAwal + totalEspresso + totalCup + totalMilk + totalSyrup + totalTopping;        
            this.tampungVariableGKepake(totalHargaGKepake);
        }).catch((error) => {
            if (error.response && error.response.status == 401) {
                this.$router.push('/');
            } else if (error.response) {
                // If response exists but status is not 401
                console.warn("Request failed with status:", error.response.status);
            } else {
                // If there is no response object
                console.error("Request failed without a response:", error.message);
            }
        });
    },
    computed: {
        showMilk: function(){
            // console.log("Computed Showmilk Terpanggil");
            return this.dataTopping.filter((item) => item.kategori == 'Milk');
        },
        showSyrup: function(){
            // console.log("Computed Syrp Terpnggil");
            return this.dataTopping.filter((item) => item.kategori == 'Syrup');
        },
        showTopping: function(){
            // console.log("Computed Topping Terpnggil");
            return this.dataTopping.filter((item) => item.kategori == 'Topping');
        },
        showCup: function(){
            return this.dataTopping.filter((item) => item.kategori == 'CUP');
        },
        showEspresso: function(){
            return this.dataTopping.filter((item) => item.kategori == 'Espresso');
        }
    },
    methods: {
        handleDataKosong: function(){
            this.selectedCup = 'R';
            this.selectedIceCube = 'NORMAL';
            this.selectedExpresso = '0';
            this.selectedSweetness = 'NORMAL';
            this.selectedMilk = 'NORMAL';
            this.checkedSyrup = [];
            this.checkedTopping = [];
            this.selectedVariant = '';

            this.componentKey += 1;
        },
        handleHapus: function(index){
            // alert("Trigger Handle Hapus");
            let cartObj = getCart();
            let total = getTotalHarga();

            cartObj.splice(index, 1);
            total.splice(index, 1);

            let resetIndex;

            for (let i = 0; i < cartObj.length; i++) {
                if(cartObj[i].id_barang == this.params){
                    resetIndex = i;
                    // break; 
                    // kalo d break, dia bkl ambil index pertama klo ktemu, kalo g d break, ambil index terakhir
                    // jd kalo mw ambil data terakhir, g ush d break. kecuali mw ambil data pertamakali;
                }
            }
            console.log(`ini di func handleHapus reset index ${resetIndex} ini selectedProduct ${this.selectedProducts}`)

            setCart(cartObj);
            setTotalHarga(total);

            if(resetIndex === undefined){
                this.selectedProducts = -1;
                this.toggleAddBtn = false; // utk toggle btn di menu responsive
                this.handleDataKosong();

                // reset input type yg idQtyResp ke 0 pas brg ini undefined
                this.qty = 0;

            }else{
                this.handleSelectedProducts(resetIndex);
            }

            let cekLength = getCart().length;
            this.lengthCart = cekLength;

            if(cekLength == 0){
                this.handleDataKosong();
            }
        },
        handleSelectedProducts: function(index){
            // alert("Trigger SelectedProduct");

            let cartObj = getCart();
            let existsObjIndex;

            let cekExists = cartObj.some((item) => item.id_barang == this.params);
            // alert(cekExists);

            if(!cekExists){
                // Cek apkh this.params ad di array LS atau ngga
                existsObjIndex = -1;
            }else{
                // cek apkh argumen index yg dilempar null atau bkn
                if(index !== null){
                    existsObjIndex = index;
                }else{
                    existsObjIndex = -1;
                }
            }

            // alert(existsObjIndex);

            if(cartObj[existsObjIndex]){
                this.selectedMilk = cartObj[existsObjIndex].milk;
                this.selectedCup = cartObj[existsObjIndex].ukuran_cup;
                this.checkedSyrup = cartObj[existsObjIndex].syrup;
                this.checkedTopping = cartObj[existsObjIndex].topping;
                this.selectedExpresso = cartObj[existsObjIndex].espresso;
                this.selectedIceCube = cartObj[existsObjIndex].ice_cube;
                this.selectedSweetness = cartObj[existsObjIndex].sweetness;
                this.selectedVariant = cartObj[existsObjIndex].variant;
                this.qty = cartObj[existsObjIndex].qty;

                this.selectedProducts = index;
            }else{
                console.warn("Data Kosong");
                this.handleDataKosong();
            }

            this.componentKey += 1;
        },
        handleTambahBaru: function(){
            let cart = getCart();
            let totalHarga = getTotalHarga();
            let filter = cart.filter((item) => item.id_barang == this.params);

            if(filter){
                this.handleDataKosong(); // pas add new, kosongkan data

                let newCart = [...cart];
                let newTotalHarga = [...totalHarga];

                this.qty = 1;

                this.selectedVariant = this.selectedVariant ? this.selectedVariant : 'cold';

                newCart.push({
                    ...this.allObj,
                    'nama_barang' : this.dataBarang.nama_barang,
                    'espresso' : this.selectedExpresso,
                    'ice_cube' : this.selectedIceCube,
                    'milk' : this.selectedMilk,
                    'sweetness' : this.selectedSweetness,
                    'ukuran_cup' : this.selectedCup,
                    'variant' : this.selectedVariant,
                    'qty': this.qty,
                });

                newTotalHarga.push({
                    id_barang: this.params,
                    totalHarga: this.hargaAwal,
                    totalSeluruh: this.hargaAwal // buat akumulasi qty * totalharga
                });

                setCart(newCart);
                setTotalHarga(newTotalHarga);

                // Ambil Index terakhir dari data
                let cart2 = getCart();
                let filter2 = cart2.map((item) => item.id_barang);
                let lastIndex = filter2.lastIndexOf(this.params);
                
                this.selectedProducts = lastIndex;
                this.componentKey += 1;
                this.lengthCart = cart2.length;
                // this.handleDataKosong();

                // Buat Akumulasi Quantity menu Responsive
                let sumQty = 0;
                for (let i = 0; i < cart2.length; i++) {
                    sumQty += cart2[i].qty 
                }
                this.lengthCart = sumQty;
                // End Akumulasi qty
            }
        },
        handleSubTotal: function(){
            let total = getTotalHarga();
            let arrSubtotal = 0;
            
            for (let i = 0; i < total.length; i++) {
                if(total[i].id_barang == this.params){
                    arrSubtotal += total[i].totalSeluruh;
                }
            }

            return arrSubtotal;
        },
        handleVariant: function(variant){
            this.selectedVariant = variant;
            this.changeTotalSemua();

            toast(`Variant Terpilih : ${this.selectedVariant.toUpperCase()}`, {
                autoClose: 1800,
            });

            console.log(this.selectedVariant);
        },
        handleResize: function(){
            if(window.innerWidth < 800){
                this.widthCarousel = '20rem';
            }else{
                this.widthCarousel = '10rem';
            }
        },
        loadGbr: function(img, srcData){
            if(srcData == 'import'){
                return img;
            }
            return `http://localhost:5500/api/images/${img}`
        },
        loadGbrCarousel: function(gambar, srcData){
            // cek jika databarang.gambar ada atau ngga
            if(this.dataBarang.gambar){
                // Cek jika ini adalah array atau bkn
                if(Array.isArray(this.dataBarang.gambar)){
                    // console.log("ini array")
                    if(srcData == 'import'){
                        return gambar;
                    }

                    return `http://localhost:5500/api/images/${gambar}`;
                }else{
                    // console.log("ini bkn array");
                    return [this.dataBarang.gambar.toString()]
                }
            }else{
                // Kalo dataBarang.gbr itu undefined
                return [];
            }
        },
        loadSameProducts: function(){
            let la = getCart();
            return la;
        },
        changeCup: function(){
            // Penjelasan Rinci di changeMilk. itu original, ak g bkl ubah
            // Aku ringkas jadi changeProcedure. krn kurleb semuany.
            // this.changeProcedure();

            if(!hasCart()){
                setCart([this.allObj]);
            }
            let cartObj = getCart();

            let totalCup = 0;
            for(let i = 0; i < this.dataTopping.length; i++ ){
                if(this.dataTopping[i].nama_topping == this.selectedCup){
                    totalCup = this.dataTopping[i].harga;
                }
            }

            setCart(cartObj);
            // console.log(cartObj);
            return totalCup;
        },
        changeEspresso: function(){
            // this.changeProcedure();

            if(!hasCart()){
                setCart([this.allObj]);
            }
            let cartObj = getCart();

            let totalEspresso = 0;
            for(let i = 0; i < this.dataTopping.length; i++){
                if(this.dataTopping[i].nama_topping == this.selectedExpresso){
                    totalEspresso = this.dataTopping[i].harga;
                }
            }

            setCart(cartObj);
            return totalEspresso;
        },  
        changeMilk: function(){
            if(!hasCart()){
                setCart([this.allObj]);
            }
            let cartObj = getCart();
            let existsObjIndex = -1;

            // Ketika user mau tambahkan produk yg sama dgn variant berbeda.
            if(this.selectedProducts !== -1){
                existsObjIndex = this.selectedProducts;
            }else{
                // the logic in these loop are if the same obj.id_barang exists then replace it
                // but if obj.id_barang does not exists then push the key value with same structure
                // to localstorage
                // logika cariIndex. ini cara konvensional. bisa pakai findIndex 
                for (let i = 0; i < cartObj.length; i++) {
                    if(cartObj[i].id_barang === this.params) {
                        existsObjIndex = i;
                        break;
                    }
                }
            }
            

            if(existsObjIndex !== -1){
                cartObj[existsObjIndex].id_barang = this.params;
                cartObj[existsObjIndex].nama_barang= this.dataBarang.nama_barang;
                cartObj[existsObjIndex].milk = this.selectedMilk;
                cartObj[existsObjIndex].ukuran_cup = this.selectedCup;
                cartObj[existsObjIndex].espresso = this.selectedExpresso;
                // Tambahan
                cartObj[existsObjIndex].syrup = this.checkedSyrup;
                cartObj[existsObjIndex].topping = this.checkedTopping;
                cartObj[existsObjIndex].ice_cube = this.selectedIceCube;
                cartObj[existsObjIndex].sweetness = this.selectedSweetness;

            }else{
                cartObj.push({...this.allObj, id_barang: this.params, milk: this.selectedMilk, nama_barang: this.dataBarang.nama_barang});
            }

            let dataTopping = this.dataTopping;
            let totalMilk = 0;

            // console.log(dataTopping)

            for(let i = 0; i < dataTopping.length; i++){
                if(dataTopping[i].nama_topping == this.selectedMilk){
                    totalMilk = dataTopping[i].harga;
                }
            }

            setCart(cartObj);

            return totalMilk;
        },
        changeSyrup: function(){
            if(!hasCart()){
                setCart([this.allObj]);
            }
            let cartObj = getCart();
            let existsObjIndex = -1;

            // Ketika User mau tambah produk yg sama dgn variant lain
            if(this.selectedProducts !== -1){
                existsObjIndex = this.selectedProducts;
            }else{
                existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);
            }

            // Ini kalau ada indexnya 
            if(existsObjIndex !== -1){
                // simplenya. set adlh array versi unique
                let arrSyrup = new Set(cartObj[existsObjIndex].syrup);
                // console.log(arrSyrup);

                // Clear the Set sebelum nambah.
                // This ensures that only the currently checked items will be in the Set.
                arrSyrup.clear(); // clear adlh method dari new Set
                
                let syrup = this.checkedSyrup;
                for(let i = 0; i < syrup.length; i++){
                    arrSyrup.add(syrup[i]); // add ini adlh method dr new Set
                }

                cartObj[existsObjIndex].id_barang = this.params;
                cartObj[existsObjIndex].nama_barang= this.dataBarang.nama_barang;
                cartObj[existsObjIndex].milk = this.selectedMilk;
                cartObj[existsObjIndex].ukuran_cup = this.selectedCup;
                cartObj[existsObjIndex].espresso = this.selectedExpresso;
                // ubah balik arrSyrup yg bentuk set, ke bentuk array
                cartObj[existsObjIndex].syrup = [...arrSyrup];
                // End Ubah Balik
                cartObj[existsObjIndex].topping = this.checkedTopping;
                cartObj[existsObjIndex].ice_cube = this.selectedIceCube;
                cartObj[existsObjIndex].sweetness = this.selectedSweetness;

            }else{
                cartObj.push({...this.allObj, id_barang: this.params, syrup: this.checkedSyrup})
            }

            // Fungsi Buat Ngecount Harga SYrup
            let syrup = this.checkedSyrup;
            let dataTopping = this.dataTopping;
            let hargaAwal = [];
            let total = 0;

            for(let i = 0; i < syrup.length; i++){
                for (let j = 0; j < dataTopping.length; j++) {
                    if(dataTopping[j].nama_topping === syrup[i]){
                        hargaAwal.push(dataTopping[j].harga);
                    }
                }
            }

            for (let i = 0; i < hargaAwal.length; i++) {
                total += hargaAwal[i]
            }
            setCart(cartObj);

            return total;
        },
        changeTopping: function(){
            if(!hasCart()){
                setCart([this.allObj]);
            }

            let cartObj = getCart();

            // Cari Indexnya

            let existsObjIndex = -1;

            if(this.selectedProducts !== -1){
                existsObjIndex = this.selectedProducts;
            }else{
                existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);
            }
            
            // Kalo Ga ad, buat array object baru di LS, kalo ad bakal update
            if(existsObjIndex !== -1){
                // Update
                // Buat Set. array versi unique
                let arrTopping = new Set(cartObj[existsObjIndex].topping);

                // Clear Set Dulu biar setnya kosong, lalu add data yg kechecked Baru.
                arrTopping.clear();

                for(let i = 0; i < this.checkedTopping.length; i++){
                    arrTopping.add(this.checkedTopping[i]); //Push versi set
                }

                cartObj[existsObjIndex].id_barang = this.params;
                cartObj[existsObjIndex].nama_barang= this.dataBarang.nama_barang;
                cartObj[existsObjIndex].milk = this.selectedMilk;
                cartObj[existsObjIndex].ukuran_cup = this.selectedCup;
                cartObj[existsObjIndex].syrup = this.checkedSyrup;
                cartObj[existsObjIndex].espresso = this.selectedExpresso;
                // Ubah balik set ke array
                cartObj[existsObjIndex].topping = [...arrTopping];
                // End Ubah Balik
                cartObj[existsObjIndex].ice_cube = this.selectedIceCube;
                cartObj[existsObjIndex].sweetness = this.selectedSweetness;
                cartObj[existsObjIndex].variant = this.selectedVariant;
                cartObj[existsObjIndex].qty = this.qty;
            }else{
                // Buat Baru
                cartObj.push({...this.allObj, id_barang: this.params, topping: this.checkedTopping});
            }

            // Fungsi Ngecount Harga Topping
            let checkedTopping = this.checkedTopping;
            let dataTopping = this.dataTopping; //Data topping ini diambil dari backend fetch axios
            let total = 0;
            let hargaAwal = [];

            for(let i = 0; i < checkedTopping.length; i++){
                for(let j = 0; j < dataTopping.length; j++){
                    if(dataTopping[j].nama_topping === checkedTopping[i]){
                        hargaAwal.push(dataTopping[j].harga);
                    }
                }
            }

            for(let i = 0; i < hargaAwal.length; i++){
                total += hargaAwal[i];
            }

            setCart(cartObj);

            return total;
        },
        // isMilkSelected: function(milk, nama_brg){
        //     let cart = getCart();

        //     // console.log(cart && cart.some(item => item.milk == milk && item.nama_barang == nama_brg));
        //     // ini kondisi and. cek kalo cart ada dan cart.some returns true, maka true.. kekbiasa
        //     return cart && cart.some(item => item.milk == milk && item.nama_barang == nama_brg);
        // },

        changeProcedure: function(){
            // alert("Trigger ChangeProcedure");

            if(!hasCart()){
                setCart([this.allObj]);
            }

            let cartObj = getCart();

            let existsObjIndex = -1;

            if(this.selectedProducts !== -1){
                existsObjIndex = this.selectedProducts;
            }else{
                existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);
            }

            // alert(`ini existsobj ${existsObjIndex}, ini selected ${this.selectedProducts}`);

            if(existsObjIndex !== -1){
                this.qty = this.qty == 0 ? 1 : this.qty;
                this.selectedVariant = this.selectedVariant == '' ? 'cold' : this.selectedVariant;

                cartObj[existsObjIndex].id_barang = this.params;
                cartObj[existsObjIndex].nama_barang= this.dataBarang.nama_barang;
                cartObj[existsObjIndex].milk = this.selectedMilk;
                cartObj[existsObjIndex].ukuran_cup = this.selectedCup;
                cartObj[existsObjIndex].syrup = this.checkedSyrup;
                cartObj[existsObjIndex].topping = this.checkedTopping;
                cartObj[existsObjIndex].espresso = this.selectedExpresso;
                cartObj[existsObjIndex].ice_cube = this.selectedIceCube;
                cartObj[existsObjIndex].sweetness = this.selectedSweetness;
                cartObj[existsObjIndex].variant = this.selectedVariant;
                cartObj[existsObjIndex].qty = this.qty;
            }else{
                this.qty = 1;
                this.selectedVariant = this.selectedVariant ? this.selectedVariant : 'cold';    

                cartObj.push({
                    ...this.allObj, 
                    id_barang: this.params, 
                    nama_barang: this.dataBarang.nama_barang, 
                    ice_cube: this.selectedIceCube,
                    sweetness: this.selectedSweetness,
                    ukuran_cup: this.selectedCup,
                    espresso: this.selectedExpresso,
                    variant: this.selectedVariant,
                    qty: this.qty
                });
            }

            this.toggleAddBtn = true;



            setCart(cartObj);

        },

        changeTotalSemua: function(){
            this.changeProcedure(); // cmn buat store ke LS aja pas Changes.

            // Rumus Total Semua
            // Original
            this.totalHarga = this.hargaAwal + this.changeCup() + this.changeEspresso() + this.changeMilk() + this.changeSyrup() + this.changeTopping();
            // console.log(this.totalHarga);

            let items = getTotalHarga();
            let newItem = {
                id_barang: this.params,
                totalHarga: this.totalHarga,
                totalSeluruh: this.totalHarga // buat akumulasi qty * totalharga
            }

            let index = -1;

            if(this.selectedProducts !== -1){
                index = this.selectedProducts;
            }else{
                index = items.findIndex((item) => item.id_barang === newItem.id_barang);
            }


            // Note : totalHarga itu harga produk plus topping
            // totalSeluruh itu buat akumulasi qty * totalharga
            if(index !== -1){
                items[index].totalHarga = this.totalHarga;
                items[index].totalSeluruh = this.totalHarga * this.qty;
            }else{
                items.push(newItem);
            }

            setTotalHarga(items);

            // Referensi
            // https://michaelnthiessen.com/force-re-render/
            this.componentKey += 1;
            this.handleSubTotal(); //ini subtotal utk produk + topping dimenu brg detail.
            // Pas ubah topping, tampilkan length cart jg
            // Buat Akumulasi Quantity menu Responsive

            let cartObj = getCart();
            let sumQty = 0;
            for (let i = 0; i < cartObj.length; i++) {
                sumQty += cartObj[i].qty 
            }
            this.lengthCart = sumQty;
            // End Akumulasi qty
        },
        handlePlus: function(){
            
            this.qty = this.qty += 1;
            this.changeTotalSemua(); // utk trigger totalHarga

            let cart = getCart()
            let cartTotal = getTotalHarga();

            // Buat Akumulasi Quantity menu Responsive
            let sumQty = 0;
            for (let i = 0; i < cart.length; i++) {
                sumQty += cart[i].qty 
            }
            this.lengthCart = sumQty;
            // End Akumulasi qty

            let hitung = this.totalHarga * this.qty;

            // console.log(this.selectedProducts);
            let resetIndex = this.selectedProducts;

            if(cart.length == 0  && this.selectedProducts == -1){
                resetIndex = 0;
            }

            // ini ceritanya cartnya udah masuk lewat ketrigger oleh this.changeTotalSemua()
            if(cart.length > 0 && this.selectedProducts == -1){
                for (let i = 0; i < cart.length; i++) {
                    if(cart[i].id_barang == this.params){
                        resetIndex = i;
                        // break; 
                        // kalo d break, dia bkl ambil index pertama klo ktemu, kalo g d break, ambil index terakhir
                        // jd kalo mw ambil data terakhir, g ush d break. kecuali mw ambil data pertamakali;
                    }
                }
            }

            this.handleSelectedProducts(resetIndex);

            cart[resetIndex].qty = this.qty;
            cartTotal[resetIndex].totalSeluruh = hitung;

            setCart(cart);
            setTotalHarga(cartTotal);


            // console.log(this.totalHarga * this.qty);
            // console.log(this.qty);

        },

        handleMinus: function(){
            let cart = getCart()
            let cartTotal = getTotalHarga();

            // Buat Akumulasi Quantity menu Responsive
            let sumQty = 0;
            for (let i = 0; i < cart.length; i++) {
                sumQty += cart[i].qty 
            }
            this.lengthCart = sumQty;
            // End Akumulasi qty

            // Buat Cegah Minus
            if(this.qty <= 1){
                this.changeTotalSemua(); // utk trigger totalHarga

                let resetIndex;
                let lengthItemYgSama = 0;
                let editMode = false;

                for (let i = 0; i < cart.length; i++) {
                    if(cart[i].id_barang == this.params){
                        resetIndex = i;
                        lengthItemYgSama++;
                        // break; 
                        // kalo d break, dia bkl ambil index pertama klo ktemu, kalo g d break, ambil index terakhir
                        // jd kalo mw ambil data terakhir, g ush d break. kecuali mw ambil data pertamakali;
                    }
                }

                if(this.productOrder != "-1"){
                    editMode = true;
                }

                if(editMode == true){
                    this.handleHapus(this.selectedProducts);
                    this.qty = 0;

                    // Logika supaya klo ad 2 item yang sama, lalu mau di kurangi
                    if(resetIndex != undefined && lengthItemYgSama > 1){
                        this.$router.push('/checkout');
                    }else{
                        this.$router.push('/home');
                    }
                }else{
                    // Logika supaya klo ad 2 item yang sama, lalu mau di kurangi
                    if(resetIndex != undefined && lengthItemYgSama > 1){
                        // Opsi Pertama, Bikin dia select indexnya ke index yang pertama
                        // jadi misalkan ada 2 index(0, 1) berisi 2item,  3 item. 
                        // 3 item ddikurang sampai habis, nanti piindah ke index pertama dengan qty nya berisi 2
                        // this.handleHapus(this.selectedProducts);
                        // this.handleSelectedProducts(resetIndex);

                        // toast(`Berpindah Ke Urutan Item : ${resetIndex}`, {
                        //     autoClose: 1800,
                        //     type: 'success'
                        // });

                        // Opsi Kedua, pentalkan dia ke halaman checkout dgn router.push
                        this.handleHapus(this.selectedProducts);
                        this.$router.push('/checkout');
                    }else{
                        this.handleHapus(this.selectedProducts);
                        this.qty = 0;
                    }
                }
            }else{
                this.qty = this.qty -= 1;
                this.changeTotalSemua(); // utk trigger totalHarga

                let hitung = this.totalHarga * this.qty;

                // console.log(this.selectedProducts);
                let resetIndex = this.selectedProducts;

                if(cart.length == 0  && this.selectedProducts == -1){
                    resetIndex = 0;
                }

                // ini ceritanya cartnya udah masuk lewat ketrigger oleh this.changeTotalSemua()
                if(cart.length > 0 && this.selectedProducts == -1){
                    for (let i = 0; i < cart.length; i++) {
                        if(cart[i].id_barang == this.params){
                            resetIndex = i;
                            // break; 
                            // kalo d break, dia bkl ambil index pertama klo ktemu, kalo g d break, ambil index terakhir
                            // jd kalo mw ambil data terakhir, g ush d break. kecuali mw ambil data pertamakali;
                        }
                    }
                }

                cart[resetIndex].qty = this.qty;
                cartTotal[resetIndex].totalSeluruh = hitung;

                setCart(cart);
                setTotalHarga(cartTotal);


                // console.log(this.totalHarga * this.qty);
                // console.log(this.qty);
            }




        },

        tampungVariableGKepake: function(...args){
            // Buat nampung variable g kepake klo takut error.. 
            // gegara no nouses variable yg bangsat
            console.log(...args);
        }
    }
}
</script>

<style scoped>
/* div {
    border: 1px solid red;
}  */

.detail-page {
    padding-top: 0.75rem;
}

.detail-shell {
    background:
        linear-gradient(135deg, rgba(236, 253, 245, 0.74), rgba(255, 255, 255, 0.96) 26%),
        #ffffff;
}

.product-gallery {
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0));
    border-radius: 1.25rem;
}

.product-intro {
    position: relative;
}

.option-card {
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid #edf2ef;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
}

.option-card > span,
.option-card > b {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #1c1917;
    font-size: 0.95rem;
}

.option-card > span::before,
.option-card > b::before {
    content: "";
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: #059669;
    box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1);
}

.option-card .flex.flex-wrap.mt-2 {
    align-items: center;
    min-height: 2.25rem;
    border-bottom: 1px solid #f1f5f2;
    padding: 0.35rem 0;
}

.option-card .flex.flex-wrap.mt-2:last-child {
    border-bottom: 0;
}

.option-card .w-3\/12 {
    color: #44403c;
    font-size: 0.9rem;
}

.option-card .w-8\/12 {
    color: #047857;
    font-size: 0.85rem;
    font-weight: 600;
}

.option-card input[type="radio"],
.option-card input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    color: #059669;
    border-color: #cbd5cf;
}

.option-card input[type="radio"]:focus,
.option-card input[type="checkbox"]:focus {
    --tw-ring-color: rgba(5, 150, 105, 0.25);
}

.order-sidebar {
    background:
        linear-gradient(180deg, rgba(236, 253, 245, 0.78), rgba(255, 255, 255, 1) 38%),
        #ffffff;
}

.mobile-order-bar {
    z-index: 20;
}

.brands-listnya {
    overflow: hidden;
}

.wrappernya {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: v-bind('widthCarousel');

    justify-items: stretch;
}

@keyframes scroll {
    /* Ini Sesuaikan dgn Banyak Gbr Asli  */
    /* Argumen pertama itu jlh length gbr, argumen ke2 itu size colnya */
    /* Aku pindahkan dia ke mounted vue biar dinamis */
    to {
        translate: v-bind('translateCarousel');
    }
}


.wrappernya {
    animation: scroll 10s linear infinite;
}

.wrappernya:hover {
    animation-play-state: paused;
}

/* Buat Hilangkan Arrow di INput Number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* End Buat Notif - Refactored to tailwind */


/* 
div {
    border: 1px solid black;
} */
</style>


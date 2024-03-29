<template>
    <div class="poppins-regular">
        <div class=" animate-fade items-center justify-center ">
            <div class="flex flex-wrap">
                <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">
                    <!-- Hai -->
                </div>
                <div class="lg:w-8/12 lg:px-0 md:w-8/12 md:px-0 w-full px-2">
                    <div class="flex flex-wrap">
                        <div class="lg:w-3/12 md:w-3/12 w-full brands-listnya">
                            <div class="wrappernya lg:py-2 md:py-2 sm:py-2 py-1">
                                <div class="" v-for="(item, index) in dataBarang.gambar" :key="index">
                                    <img :src="loadGbrCarousel(item)" alt="..." class="pl-1 w-full h-full object-cover rounded">
                                </div>
                                <!-- Mesti Load 2x biar kesannnya Infinite Looping Carouselnya -->
                                <div class="" v-for="(item, index) in dataBarang.gambar" :key="index">
                                    <img :src="loadGbrCarousel(item)" alt="..." class="pl-1 w-full h-full object-cover rounded">
                                </div>
                            </div>

                        </div>

                        <div class="lg:w-9/12 lg:pl-2 md:w-9/12 md:pl-2 w-full lg:mt-0 md:mt-0 sm:mt-0 mt-2">
                            <div class="flex flex-wrap">
                                <div class="w-full lg:pt-1 font-bold capitalize text-[30px] lg:pl-2 md:pl-2">
                                    {{ dataBarang.nama_barang }}
                                </div>
                            </div>
                            <div class="w-full mt-2 text-sm capitalize lg:pl-2 md:pl-2">
                                {{ dataBarang.deskripsi }} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum odio impedit quidem doloribus nobis magnam, sequi, quasi possimus asperiores iusto porro est facilis molestiae. Placeat ut tenetur expedita deserunt. Asperiores?
                                Blanditiis accusamus rerum temporibus maxime?m?
                            </div>
                            <div class="w-full mt-2 text-right">
                                <b>Rp. {{ dataBarang.harga }}</b>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->


                        <div class="w-full mt-5">
                            <b>Variant Tersedia :</b>
                            <div class="flex flex-wrap mt-3">

                                <div class="lg:w-auto w-6/12">
                                    <button class="bg-red-600 hover:bg-red-400 text-white py-[15px] lg:px-[100px] w-full rounded" @click="handleVariant('hot')">Hot</button>
                                </div>

                                <div class="lg:w-auto lg:ml-3 w-6/12">
                                    <button class="bg-cyan-600 hover:bg-cyan-400 text-white py-[15px] lg:px-[100px] w-full ml-1 rounded" @click="handleVariant('cold')">Cold</button>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div> -->

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10">
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

                        <div class="w-full mt-10 mb-3">
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
                    <div class="sticky top-1 rounded-lg py-5 px-1 mt-1 mx-1" style="border: 2px solid green">

                        <div class="flex flex-wrap" v-if="handleSubTotal()">
                            <div class="w-full">
                                <div class="cursor-pointer mt-1" v-for="(item, index) in loadSameProducts()" :key="index" >
                                    <div class="flex flex-wrap mt-2 rounded group/item hover:bg-slate-100"
                                        v-if="item.id_barang == dataBarang.id" 
                                        :style="`border: ${selectedProducts === index ? `1px solid black` : `none`}`">

                                        <div class="flex flex-wrap" @click="handleSelectedProducts(index)">
                                            <div class="lg:w-2/12 md:w-2/12 w-4/12 text-center flex items-center justify-center">
                                                <img :src="loadGbr(dataBarang.gambar[0])" alt="" class="object-cover h-[50px] w-[50px] rounded-lg">
                                            </div>
                                            
                                            <div class="lg:w-9/12 md:w-9/12 w-8/12 capitalize text-[10px]">
                                                <p>{{ dataBarang.nama_barang }}</p>
                                                <p>{{ 'Summary : ' + item.ukuran_cup + ', ' + item.milk + ', ' +  item.espresso + ', ' + item.ice_cube +  ', ' + item.sweetness + ', ' + item.variant + ', ' + item.syrup + ', ' + item.topping }}</p>
                                            </div>
                                        </div>


                                        <div class="lg:w-1/12 invisible group-hover/item:visible hover:bg-slate-400 hover:cursor-auto" @click="handleHapus(index)">
                                            <i class="fas fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full text-[10px] font-bold text-right">
                                <p class="">Subtotal : {{ handleSubTotal() }}</p>
                            </div>

                            <div class="w-full text-right mt-1">
                                <span class="text-[10px] pr-3">Add New?</span>
                                <button 
                                    class="bg-cyan-400 rounded-full h-[30px] w-[30px]"
                                    @click="handleTambahBaru"><i class="fas fa-plus-circle"></i></button>
                            </div>
                        </div>

                        <div class="flex flex-wrap" v-else>
                            <div class="w-full">
                                <p class="">Subtotal : 0</p>
                                <p class="text-right">
                                    <button 
                                        class="bg-cyan-400 rounded-full h-[30px] w-[30px]"
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

            <div class="flex flex-wrap text-white lg:hidden md:hidden block sticky bottom-[53px] bg-white py-2">
                
                <div class="lg:w-1/12 md:w-1/12 sm:w-1/12 w-1/12 block lg:hidden md:hidden text-black text-center py-1 mt-1">
                    <button @click="handleMinus()" class="rounded-full bg-red-500 w-[30px] h-[30px]" >
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 w-2/12 block lg:hidden md:hidden text-black mt-1">
                    <input type="number" name="" id="idQtyResp" v-model="qty" class="w-full rounded text-center">
                </div>
                <div class="lg:w-1/12 md:w-1/12 sm:w-1/12 w-1/12 block lg:hidden md:hidden text-black text-center py-1 mt-1">
                    <button @click="handlePlus()" class="rounded-full bg-green-300 w-[30px] h-[30px]">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div :class="`lg:w-4/12 md:w-4/12 sm:w-4/12 w-4/12 mt-3 cursor-pointer ${toggleAddBtn == false ? ' hidden' : ''}`" >
                    <div class="flex flex-wrap">
                        <div class="w-full text-center">
                            <span 
                            class="py-3 px-9 rounded-lg border-red-600 bg-transparent text-black hover:bg-green-400 hover:text-white" 
                            style="border: 1px solid green;" @click="handleTambahBaru">
                                Add New?
                            </span>
                        </div>
                    </div>
                </div>

                <div :class="`${toggleAddBtn == false ? 'lg:w-8/12 md:w-8/12 sm:w-8/12 w-8/12' : 'lg:w-4/12 md:w-4/12 sm:w-4/12 w-4/12'} mt-3 cursor-pointer `">
                    <div class="flex flex-wrap">
                        <div class="w-full notification">
                            <router-link to="/checkout" 
                                :class="`bg-green-600 py-3 rounded-lg hover:bg-green-900 ${toggleAddBtn == false ? '': ' px-10'}`" :style="`${toggleAddBtn == false ? 'display: inline-block; width: 100%;' : ''}`">
                                <span>Go To Cart</span>
                                <span :class="lengthCart > 0 ? ' badge' : ' hidden'">{{ lengthCart }}</span>

                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

                </div> -->
            </div>

            <NavbarBottom></NavbarBottom>
            
        </div>



    </div>


</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import axios from 'axios';
import BubbleCartVue from './BubbleCart.vue';
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

        axios.get(`http://localhost:5500/apiBrg/barang/${this.params}`, {
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

            if(localStorage.getItem("cart") !== null){
                let ls = JSON.parse(localStorage.getItem("cart"));

                // Menu Responsive. buat check cartlength
                this.lengthCart = ls.length;

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

                    console.log(cariIndex)

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
            this.totalHarga = this.hargaAwal + totalEspresso + totalCup + totalMilk + totalSyrup + totalTopping;        
            console.log(this.totalHarga);
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

            this.componentKey += 1;
        },
        handleHapus: function(index){
            // alert("Trigger Handle Hapus");
            let cartObj = JSON.parse(localStorage.getItem('cart')) || [];
            let total = JSON.parse(localStorage.getItem('totalHarga')) || [];

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
            console.log(`ini reset index ${resetIndex} ini selectedProduct ${this.selectedProducts}`)

            localStorage.setItem('cart', JSON.stringify(cartObj));
            localStorage.setItem('totalHarga', JSON.stringify(total));

            if(resetIndex === undefined){
                this.selectedProducts = -1;
                this.toggleAddBtn = false; // utk toggle btn di menu responsive
                this.handleDataKosong();

            }else{
                this.handleSelectedProducts(resetIndex);
            }

            let cekLength = JSON.parse(localStorage.getItem('cart')).length;
            this.lengthCart = cekLength;

            if(cekLength == 0){
                this.handleDataKosong();
            }
        },
        handleSelectedProducts: function(index){
            // alert("Trigger SelectedProduct");

            let cartObj = JSON.parse(localStorage.getItem('cart')) || [];
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

                this.selectedProducts = index;
            }else{
                console.warn("Data Kosong");
                this.handleDataKosong();
            }

            this.componentKey += 1;
        },
        handleTambahBaru: function(){
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let totalHarga = JSON.parse(localStorage.getItem('totalHarga')) || [];
            let filter = cart.filter((item) => item.id_barang == this.params);

            if(filter){
                this.handleDataKosong(); // pas add new, kosongkan data

                let newCart = [...cart];
                let newTotalHarga = [...totalHarga];

                this.qty = 1;

                newCart.push({
                    ...this.allObj,
                    'nama_barang' : this.dataBarang.nama_barang,
                    'espresso' : this.selectedExpresso,
                    'ice_cube' : this.selectedIceCube,
                    'milk' : this.selectedMilk,
                    'sweetness' : this.selectedSweetness,
                    'ukuran_cup' : this.selectedCup,
                    'variant' : this.selectedVariant,
                    'qty': this.qty
                });

                newTotalHarga.push({
                    id_barang: this.params,
                    totalHarga: this.hargaAwal,
                    totalSeluruh: this.hargaAwal // buat akumulasi qty * totalharga
                });

                localStorage.setItem('cart', JSON.stringify(newCart));
                localStorage.setItem('totalHarga', JSON.stringify(newTotalHarga));

                // Ambil Index terakhir dari data
                let cart2 = JSON.parse(localStorage.getItem('cart')) || [];
                let filter2 = cart2.map((item) => item.id_barang);
                let lastIndex = filter2.lastIndexOf(this.params);
                
                this.selectedProducts = lastIndex;
                this.componentKey += 1;
                this.lengthCart = cart2.length;
                // this.handleDataKosong();
            }
        },
        handleSubTotal: function(){
            let total = JSON.parse(localStorage.getItem('totalHarga')) || [];
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
            console.log(this.selectedVariant);
        },
        handleResize: function(){
            if(window.innerWidth < 800){
                this.widthCarousel = '20rem';
            }else{
                this.widthCarousel = '10rem';
            }
        },
        loadGbr: function(img){
            return `http://localhost:5500/apiBrg/images/${img}`
        },
        loadGbrCarousel: function(gambar){
            // cek jika databarang.gambar ada atau ngga
            if(this.dataBarang.gambar){
                // Cek jika ini adalah array atau bkn
                if(Array.isArray(this.dataBarang.gambar)){
                    // console.log("ini array")
                    return `http://localhost:5500/apiBrg/images/${gambar}`;
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
            let la = JSON.parse(localStorage.getItem('cart')) || [];
            return la;
        },
        changeCup: function(){
            // Penjelasan Rinci di changeMilk. itu original, ak g bkl ubah
            // Aku ringkas jadi changeProcedure. krn kurleb semuany.
            // this.changeProcedure();

            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }
            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

            let totalCup = 0;
            for(let i = 0; i < this.dataTopping.length; i++ ){
                if(this.dataTopping[i].nama_topping == this.selectedCup){
                    totalCup = this.dataTopping[i].harga;
                }
            }

            localStorage.setItem("cart", JSON.stringify(cartObj));
            // console.log(cartObj);
            return totalCup;
        },
        changeEspresso: function(){
            // this.changeProcedure();

            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }
            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

            let totalEspresso = 0;
            for(let i = 0; i < this.dataTopping.length; i++){
                if(this.dataTopping[i].nama_topping == this.selectedExpresso){
                    totalEspresso = this.dataTopping[i].harga;
                }
            }

            localStorage.setItem("cart", JSON.stringify(cartObj));
            return totalEspresso;
        },  
        changeMilk: function(){
            let cart;

            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }
            cart = localStorage.getItem("cart");
            let cartObj = JSON.parse(cart) || [];
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

            localStorage.setItem("cart", JSON.stringify(cartObj));

            return totalMilk;
        },
        changeSyrup: function(){
            let cart;

            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }
            cart = localStorage.getItem("cart");

            let cartObj = JSON.parse(cart) || [];
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
            localStorage.setItem("cart", JSON.stringify(cartObj));

            return total;
        },
        changeTopping: function(){
            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }

            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

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

            localStorage.setItem("cart", JSON.stringify(cartObj));

            return total;
        },
        // isMilkSelected: function(milk, nama_brg){
        //     let cart = JSON.parse(localStorage.getItem("cart"));

        //     // console.log(cart && cart.some(item => item.milk == milk && item.nama_barang == nama_brg));
        //     // ini kondisi and. cek kalo cart ada dan cart.some returns true, maka true.. kekbiasa
        //     return cart && cart.some(item => item.milk == milk && item.nama_barang == nama_brg);
        // },

        changeProcedure: function(){
            // alert("Trigger ChangeProcedure");

            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }

            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

            let existsObjIndex = -1;

            if(this.selectedProducts !== -1){
                existsObjIndex = this.selectedProducts;
            }else{
                existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);
            }

            alert(`ini existsobj ${existsObjIndex}, ini selected ${this.selectedProducts}`);

            if(existsObjIndex !== -1){
                cartObj[existsObjIndex].id_barang = this.params;
                cartObj[existsObjIndex].nama_barang= this.dataBarang.nama_barang;
                cartObj[existsObjIndex].milk = this.selectedMilk;
                cartObj[existsObjIndex].ukuran_cup = this.selectedCup;
                cartObj[existsObjIndex].syrup = this.checkedSyrup;
                cartObj[existsObjIndex].topping = this.checkedTopping;
                cartObj[existsObjIndex].espresso = this.selectedExpresso;
                cartObj[existsObjIndex].ice_cube = this.selectedIceCube;
                cartObj[existsObjIndex].sweetness = this.selectedSweetness;
            }else{
                cartObj.push({
                    ...this.allObj, 
                    id_barang: this.params, 
                    nama_barang: this.dataBarang.nama_barang, 
                    ice_cube: this.selectedIceCube,
                    sweetness: this.selectedSweetness,
                    ukuran_cup: this.selectedCup,
                    espresso: this.selectedExpresso
                });
            }

            this.toggleAddBtn = true;

            localStorage.setItem("cart", JSON.stringify(cartObj));

        },

        changeTotalSemua: function(){
            this.changeProcedure(); // cmn buat store ke LS aja pas Changes.

            // Rumus Total Semua
            // Original
            this.totalHarga = this.hargaAwal + this.changeCup() + this.changeEspresso() + this.changeMilk() + this.changeSyrup() + this.changeTopping();
            // console.log(this.totalHarga);

            let items = JSON.parse(localStorage.getItem("totalHarga")) || [];
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
                items[index].totalSeluruh = this.totalHarga;
            }else{
                items.push(newItem);
            }

            localStorage.setItem("totalHarga", JSON.stringify(items));

            // Referensi
            // https://michaelnthiessen.com/force-re-render/
            this.componentKey += 1;
            this.handleSubTotal(); //ini subtotal utk produk + topping dimenu brg detail.
            // Pas ubah topping, tampilkan length cart jg
            this.lengthCart = items.length;
        },
        handlePlus: function(){
            
            this.qty = this.qty += 1;
            this.changeTotalSemua(); // utk trigger totalHarga

            let cart = JSON.parse(localStorage.getItem('cart')) || []
            let cartTotal = JSON.parse(localStorage.getItem('totalHarga')) || [];

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

            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("totalHarga", JSON.stringify(cartTotal));


            // console.log(this.totalHarga * this.qty);
            // console.log(this.qty);

        },

        handleMinus: function(){
            if(this.qty == 1){
                this.qty = 0;
                this.changeTotalSemua(); // utk trigger totalHarga\
                this.handleHapus(this.selectedProducts);
            }else{
                this.qty = this.qty -= 1;
                this.changeTotalSemua(); // utk trigger totalHarga

                let cart = JSON.parse(localStorage.getItem('cart')) || []
                let cartTotal = JSON.parse(localStorage.getItem('totalHarga')) || [];

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

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("totalHarga", JSON.stringify(cartTotal));


                // console.log(this.totalHarga * this.qty);
                // console.log(this.qty);
            }


        },
    }
}
</script>

<style scoped>
/* div {
    border: 1px solid red;
}  */

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

/* Buat Notif Button */
.notification {
  color: white;
  text-decoration: none;
  text-align: center;
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.notification .badge {
  position: absolute;
  top: -20px;
  right: -5px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}

/* End Buat Notif */


/* div {
    border: 1px solid black;
} */
</style>
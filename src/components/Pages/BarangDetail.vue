<template>
    <div>
        <div class=" animate-fade items-center justify-center ">
            <div class="flex flex-wrap">
                <div class="w-2/12">
                    <!-- Hai -->
                    hai
                </div>
                <div class="w-8/12">
                    <div class="flex flex-wrap">
                        <div class="w-3/12">
                            Gambar
                        </div>
                        <div class="w-9/12 font-bold">
                            {{ dataBarang.nama_barang }}
                        </div>
                        <div class="w-full mt-2 text-sm">
                            {{ dataBarang.deskripsi }}
                        </div>
                        <div class="w-full mt-2">
                            Rp. {{ dataBarang.harga }}
                        </div>
                        

                        <div class="w-full">
                            Variant Tersedia :
                        </div>

                        <div class="w-6/12">Hot</div>

                        <div class="w-6/12">Cold</div>

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full">
                            <span v-if="showCup.length > 0"><b>Ukuran Cup : </b></span>

                            <div class="flex flex-wrap" v-for="(item, index) in showCup" :key="index">
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

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full">
                            <span><b>Ice Cube : </b></span>
                            <div class="flex flex-wrap">
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
                                        :value="'Normal'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap">
                                <div class="w-3/12">
                                    Less
                                </div>
                                <div class="w-8/12 text-right">

                                </div>
                                <div class="w-1/12 text-center">
                                    <input 
                                        type="radio" 
                                        name="ice_cube" 
                                        id="" 
                                        :value="'Less'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap">
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
                                        :value="'No_Ice'"
                                        v-model="selectedIceCube"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full ">
                            <span><b>Espresso : </b></span>
                            <div class="flex flex-wrap">
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
                                        :value="'Normal'" @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap" v-for="(item, index) in showEspresso" :key="index">
                                <div class="w-3/12">
                                    {{ item.nama_topping }}
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

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full ">
                            <span><b>Sweetness : </b></span>
                            <div class="flex flex-wrap">
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
                                        :value="'Normal'"
                                        v-model="selectedSweetness"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap">
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
                                        :value="'Less'"
                                        v-model="selectedSweetness"
                                        @change="changeTotalSemua"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full ">
                            <span v-if="showMilk.length > 0"><b>{{ showMilk[0].kategori }}</b></span>

                            <div class="flex flex-wrap" v-for="(item, index) in showMilk" :key="index">
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

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full ">
                            <span v-if="showSyrup.length > 0"> <b>{{ showSyrup[0].kategori }}</b></span>

                            <div class="flex flex-wrap" v-for="item in showSyrup" :key="item.id">
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

                        <div class="w-full bg-gray-700 h-[0.2px] mt-2 mb-2"></div>

                        <div class="w-full ">
                            <span v-if="showTopping.length > 0"><b>{{ showTopping[0].kategori }}</b></span>

                            <div class="flex flex-wrap" v-for="item in showTopping" :key="item.id">
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
                <div class="w-2/12"> 
                    <p class="sticky top-0">Total Harga : {{ totalHarga }}</p>
                </div>

            </div>

            <button>Pesan Sekarang?</button>

            <!-- Ksh Key utk Force update component -->
            <BubbleCartVue :key="componentKey"></BubbleCartVue>
            <NavbarBottom></NavbarBottom>
            
        </div>



    </div>


</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import axios from 'axios'
import BubbleCartVue from './BubbleCart.vue'

export default {
    name: 'barang-detail',
    data: function(){
        return {
            params : this.$route.params.id,
            dataBarang: {},
            dataTopping: [],
            checkedSyrup: [],
            checkedTopping: [],
            selectedExpresso: null,
            selectedIceCube: null,
            selectedCup: null,
            selectedSweetness: null,
            selectedMilk: '',
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
                "espresso": null
            },
            hargaAwal: 0,
            totalHarga: 0,
            sumAll: 0,
            componentKey: 0
        }
    },
    components: {
        NavbarBottom,
        BubbleCartVue
    },
    mounted: function(){

        let token = localStorage.getItem('token');

        axios.get(`http://localhost:5500/apiBrg/barang/${this.params}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
            // harus pakai arrow function. 
            // karena this di vue merujuk ke dataBarang, kalo pake func biasa ntr dia ke scope function axios.
        }).then((response) => {
            // alert("Berhasil Tarik barang");
            console.log(response.data);
            this.dataBarang = response.data.dataBarang;
            this.dataTopping = response.data.dataTopping;
            this.hargaAwal = response.data.dataBarang.harga;

            let totalCup = 0;
            let totalMilk = 0;
            let totalSyrup = 0;
            let totalTopping = 0;
            let totalEspresso = 0;

            if(localStorage.getItem("cart") !== null){
                let ls = JSON.parse(localStorage.getItem("cart"));

                const cariIndex = ls.findIndex((item) => item.id_barang == this.params);

                if(cariIndex !== -1){
                    // Rumus Perhitungan Cup & Susu
                    // Tanpa looping. langsung tembak ke index yg udh dicari
                    this.selectedMilk = ls[cariIndex].milk;
                    this.selectedCup = ls[cariIndex].ukuran_cup;
                    this.selectedExpresso = ls[cariIndex].espresso;
                    this.selectedIceCube = ls[cariIndex].ice_cube;
                    this.selectedSweetness = ls[cariIndex].sweetness;

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

            this.totalHarga = this.hargaAwal + totalEspresso + totalCup + totalMilk + totalSyrup + totalTopping;
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
        changeCup: function(){
            // Penjelasan Rinci di changeMilk
            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }

            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

            const existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);

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
                cartObj.push({...this.allObj, id_barang: this.params, nama_barang: this.dataBarang.nama_barang, ukuran_cup: this.selectedCup})
            }

            let totalCup = 0;

            for(let i = 0; i < this.dataTopping.length; i++ ){
                if(this.dataTopping[i].nama_topping == this.selectedCup){
                    totalCup = this.dataTopping[i].harga;
                }
            }

            localStorage.setItem("cart", JSON.stringify(cartObj));

            return totalCup;
        },
        changeEspresso: function(){
            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }

            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];
            const existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);

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
                cartObj.push({...this.allObj, id_barang: this.params, nama_barang: this.dataBarang.nama_barang, espresso: this.selectedExpresso});
            }

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

            // Cari Indexnya
            for(let i = 0; i < cartObj.length; i++){
                if(cartObj[i].id_barang == this.params){
                    existsObjIndex = i;
                }
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
            const existsObjIndex = cartObj.findIndex(item => item.id_barang == this.params);

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
            if(localStorage.getItem("cart") === null){
                localStorage.setItem("cart", JSON.stringify([this.allObj]));
            }

            let cartObj = JSON.parse(localStorage.getItem("cart")) || [];

            const existsObjIndex = cartObj.findIndex((item) => item.id_barang == this.params);

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
                    sweetness: this.selectedSweetness
                });
            }

            localStorage.setItem("cart", JSON.stringify(cartObj));
        },

        changeTotalSemua: function(){
            this.changeProcedure(); // cmn buat store ke LS aja pas Changes.

            // Rumus Total Semua
            this.totalHarga = this.hargaAwal + this.changeCup() + this.changeEspresso() + this.changeMilk() + this.changeSyrup() + this.changeTopping();
            console.log(this.totalHarga);

            let items = JSON.parse(localStorage.getItem("totalHarga")) || [];
            let newItem = {
                id_barang: this.params,
                totalHarga: this.totalHarga
            }

            let index = items.findIndex((item) => item.id_barang === newItem.id_barang);

            if(index !== -1){
                items[index].totalHarga = this.totalHarga;
            }else{
                items.push(newItem);
            }

            localStorage.setItem("totalHarga", JSON.stringify(items));

            // Referensi
            // https://michaelnthiessen.com/force-re-render/
            this.componentKey += 1;
        }
    }
}
</script>

<!-- <style scoped>
div {
    border: 1px solid red;
}
</style> -->
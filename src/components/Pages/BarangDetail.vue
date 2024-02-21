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
                            <span><b>Ukuran Cup : </b></span>
                            <div class="flex flex-wrap">
                                <div class="w-3/12">
                                    Regular
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp.6000
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="cup" id="">
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
                                    Rp.0
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="ice_cube" id="">
                                </div>
                            </div>

                            <div class="flex flex-wrap">
                                <div class="w-3/12">
                                    Less
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp.0
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="ice_cube" id="">
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
                                    <input type="radio" name="espresso" id="">
                                </div>
                            </div>

                            <div class="flex flex-wrap">
                                <div class="w-3/12">
                                    1 Shot
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. 6000
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="espresso" id="">
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
                                    Rp.0
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="sweetness" id="">
                                </div>
                            </div>

                            <div class="flex flex-wrap">
                                <div class="w-3/12">
                                    Less
                                </div>
                                <div class="w-8/12 text-right">
                                    Rp. 6000
                                </div>
                                <div class="w-1/12 text-center">
                                    <input type="radio" name="sweetness" id="">
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
                            <span v-if="showSyrup.length > 0"><b>{{ showTopping[0].kategori }}</b></span>

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
                                        :value="item.nama_topping" 
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

        </div>
        

        <NavbarBottom></NavbarBottom>

    </div>


</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import axios from 'axios'

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
            selectedMilk: 'None',
            allObj : {
                "id_barang": this.$route.params.id,
                "nama_barang": null,
                "ukuran_cup": null,
                "milk": null,
                "topping": [],
                "syrup": [],
                "variant": null,
                "ice_cube": null,
                "sweetness": null
            },
            hargaAwal: 0,
            totalHarga: 0,
        }
    },
    components: {
        NavbarBottom
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
        }).catch((error) => {
            if(error.response.status == 401){
                this.$router.push('/');
            }

            alert("gagal");
            console.warn(error);
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

        }
    },
    methods: {
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
            // diexpressJs backend-sosmed yg pernah kubuat.
            for (let i = 0; i < cartObj.length; i++) {
                if(cartObj[i].id_barang === this.params) {
                    existsObjIndex = i;
                    break;
                }
            }

            if(existsObjIndex !== -1){
                cartObj[existsObjIndex].milk = this.selectedMilk;
            }else{
                cartObj.push({...this.allObj, id_barang: this.params, milk: this.selectedMilk});
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

                // ubah balik arrSyrup yg bentuk set, ke bentuk array
                cartObj[existsObjIndex].syrup = [...arrSyrup];
            }else{
                cartObj.push({...this.allObj, id_barang: this.params, syrup: this.checkedSyrup})
            }

            // Fungsi Buat Ngecount Harga Topping
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
        changeTotalSemua: function(){
            this.totalHarga = this.hargaAwal + this.changeMilk() + this.changeSyrup();
            console.log(this.totalHarga);
        }
    }
}
</script>

<!-- <style scoped>
div {
    border: 1px solid red;
}
</style> -->
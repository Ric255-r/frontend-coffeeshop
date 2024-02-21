<template>
    <div>
        <div>

        </div>
        <div class="container animate-fade items-center justify-center ">
            <p>{{ $route.params.id }} ||||||||||||||||||||||| <span>Total harga adalah {{ totalHarga }}</span> </p>
            

            <p>{{ dataBarang.nama_barang }}</p>

            <p>Rp. {{ dataBarang.harga }}</p>

            <div>
                {{ dataBarang.deskripsi }}
            </div>

            <br />


            <br />

            <h2 v-if="showMilk.length > 0">Kategori : {{ showMilk[0].kategori }}</h2>

            <div>SelectedMilk : {{ selectedMilk }}</div>
            <div v-for="(item, index) in showMilk" :key="index">
                <p>
                    <input type="radio" name="Milk" :id="'radio_' + index" v-model="selectedMilk" :value="item.nama_topping" @change="changeTotalSemua"> 
                    {{ item.nama_topping }}
                </p>
                
                <p>{{ item.harga }}</p>
                <p>{{ item.kategori }}</p>
            </div>

            <br />

            <h2 v-if="showSyrup.length > 0">Kategori : {{ showSyrup[0].kategori }}</h2>

            <p>Checked Syrup : {{ checkedSyrup }} </p>

            <div v-for="item in showSyrup" :key="item.id">
                <p><input type="checkbox" name="syrup" v-model="checkedSyrup" :value="item.nama_topping" @change="changeTotalSemua">{{ item.nama_topping }}</p>
                <p>{{ item.nama_topping }}</p>
                <p>{{ item.harga }}</p>
                <p>{{ item.kategori }}</p>
            </div>

            <br />

            <p>Checked Topping : {{ checkedTopping }} </p>

            <h2 v-if="showTopping.length > 0">Kategori : {{ showTopping[0].kategori }}</h2>

            <div v-for="item in showTopping" :key="item.id">
                <p><input type="checkbox" name="topping" v-model="checkedTopping" :value="item.nama_topping">{{ item.nama_topping }}</p>
                <p>{{ item.harga }}</p>
                <p>{{ item.kategori }}</p>
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
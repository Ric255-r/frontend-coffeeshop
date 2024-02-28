<template>
    <div>
        <div class="flex flex-wrap">
            <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

            </div>
            <div class="lg:w-8/12 md:w-8/12 sm:w-8/12 py-2 w-full">
                <div class="flex flex-wrap mb-2" v-for="(item, index) in dataBeli" :key="index">
                    <div class="w-1/12 pl-5">
                        <img :src="getImg(item.gambar)" alt="" class="object-cover h-[100px] w-[100px] rounded-lg">
                    </div>
                    <div class="w-11/12">
                        <div class="flex flex-wrap">
                            <div class="w-full">
                                {{ item.nama_barang }}
                            </div>
                            <div class="w-full">
                                Topping : {{ item.topping }}
                            </div>
                            <div class="w-full">
                                Syrup : {{ item.syrup }}
                            </div>
                            <div class="w-full">
                                Ice Cube : {{ item.ice_cube }}
                            </div>
                            <div class="w-full">
                                Espresso : {{ item.espresso }}
                            </div>
                            <div class="w-full">
                                Variant : {{ item.variant }}
                            </div>
                            <div class="w-full">
                                Sweetness : {{ item.sweetness }}
                            </div>
                            <div class="w-full">
                                Milk : {{ item.milk }}
                            </div>
                            <div class="w-full text-right text-bold">
                                Total : {{ item.harga_akhir }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full">
                        Cek Ringkasan Belanjamu
                    </div>
                    <div class="w-8/12">
                        Total Harga ({{ dataBeli.length }}) Item
                    </div>
                    <div class="w-4/12">
                        Rp. {{ subtotal }}
                    </div>

                    <div class="w-8/12">
                        Pajak (11%)
                    </div>
                    <div class="w-4/12">
                        Rp. {{ nilaiPjk }}
                    </div>

                    <div class="w-8/12">
                        GrandTotal
                    </div>
                    <div class="w-4/12">
                        Rp. {{ grandTotal }}
                    </div>
                </div>
            </div>
            <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

            </div>
        </div>



        <NavbarBottom></NavbarBottom>
    </div>
</template>

<script>
import axios from "axios";
import NavbarBottom from "./NavbarBottom.vue";

export default {
    name: "payment-component",
    data: function () {
        return {
            id: this.$route.params.id,
            dataBeli: [],
        };
    },
    mounted: function () {
        axios
            .get(`http://localhost:5500/apiJual/detailPenjualan/${this.id}`)
            .then((res) => {
                this.dataBeli = res.data;
                console.log(this.dataBeli)
            })
            .catch((err) => {
                console.warn(err);
            });
    },
    components: {
        NavbarBottom,
    },
    computed: {
        subtotal: function(){
            let subtotal = 0;

            for (let i = 0; i < this.dataBeli.length; i++) {
                subtotal += this.dataBeli[i].harga_akhir
            }

            return subtotal;
        },
        nilaiPjk: function(){

            let subtotal = this.subtotal; //akses computed ga ush pake ()
            let pajak = 0.11;
            let hasilPjk = subtotal * pajak;

            return hasilPjk;
        },
        grandTotal: function(){
            return this.subtotal + this.nilaiPjk
        }
    },
    methods: {
        getImg: function(img){
            const convertStrToJson = JSON.parse(img);
            const gbrPertama = convertStrToJson[0];

            return `http://localhost:5500/apiBrg/images/${gbrPertama}`
        },
    }
};
</script>

<style scoped>
div {
    border: 1px solid black;
}
</style>
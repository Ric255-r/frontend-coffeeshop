<template>
    <div class="animate-fade-left poppins-regular mt-1 text-stone-800">
        <div class="flex flex-wrap">
            <div class=" lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            <div :class="`lg:w-8/12 md:w-8/12 lg:pl-0 md:pl-0 pl-4 w-full text-white poppins-regular mb-3`">
                <div class="text-sm text-emerald-50/90">Welcome</div>
                <div class="font-semibold tracking-wide">{{ dataUser.email }}</div>
            </div>

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            <div class="lg:w-8/12 md:w-8/12 lg:mx-0 mx-3 w-full flex items-center justify-center">
                <CarouselBrgVue></CarouselBrgVue>
            </div>
            
            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>


        </div>

        <div class="flex flex-wrap mt-2 mb-2">
            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
            <div class="lg:w-8/12 md:w-8/12 lg:pl-0 md:pl-0 pl-4 w-full">
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-stone-900">Choose Your Favourite</span>
                    <span class="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">Fresh today</span>
                </div>
            </div>

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
        </div>

        <div class="flex flex-wrap mb-3" v-for="(item, index) in dataBarang" :key="index">

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
            
            <div class="lg:w-1/12 md:w-1/12 w-3/12 text-center flex items-center justify-center">   
                <router-link :to="{ name: 'BarangDetail', params: { id: item.id } }">
                    <img :src="getImg(item.gambar[0], item.source_data)" alt="" class="object-cover h-[100px] w-[100px] rounded-2xl shadow-md shadow-stone-900/10 border border-white">
                </router-link>
            </div>

            <div class="lg:w-7/12 md:w-7/12 w-9/12 lg:pl-3 md:pl-3 pl-3 pt-1" >
                <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-stone-100 px-4 py-3 transition">
                <div class="font-bold text-stone-900">
                    <router-link class="hover:text-emerald-700 transition" :to="{ name: 'BarangDetail', params: { id: item.id } }">{{ item.nama_barang }}</router-link>
                </div>
                <div class="py-1 text-xs text-stone-500 leading-relaxed">
                    {{item.deskripsi}}
                </div>
                <div class="text-emerald-700 font-semibold">
                    Rp. {{ item.harga }}
                </div>

                <div class="text-right pr-3">
                    <router-link :to="{ name: 'BarangDetail', params: { id: item.id } }">
                        <i class="fas fa-plus-circle text-emerald-600 hover:text-emerald-800 text-xl transition"></i>
                    </router-link>
                </div>
                </div>


            </div>


            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
        </div>

        <BubbleCartVue ></BubbleCartVue>
    </div>
</template>

<script>
import axios from 'axios'
import CarouselBrgVue from './CarouselBrg.vue'
import BubbleCartVue from './BubbleCart.vue'
import {toast} from 'vue3-toastify'

export default {
    name: 'barang-component',
    data: function(){
        return {
            dataBarang: null,
            dataUser: {}
        }
    },
    components: {
        CarouselBrgVue,
        BubbleCartVue
    },
    mounted: function(){
        let token = localStorage.getItem('token');

        axios.get('http://localhost:5500/api/barang', {
            headers: {
                Authorization: 'Bearer ' + token
            }
            // harus pakai arrow function. 
            // karena this di vue merujuk ke dataBarang, kalo pake func biasa ntr dia ke scope function axios.
        }).then((response) => {
            // alert("Berhasil Tarik barang");
            console.log(response.data);
            this.dataBarang = response.data;

            this.getDataUser();
        }).catch((error) => {
            if(error.response.status == 401){
                this.$router.push('/');
            }

            // alert("gagal");
            toast("Gagal", {
              autoClose: 2500,
              type: 'error'
            });

            console.warn(error);
        })
    },
    methods: {
        getImg: function(img, source){
            if(source == 'import'){
                return img;
            }
            return `http://localhost:5500/api/images/${img}`
        },
        getDataUser: function(){
            let token = localStorage.getItem('token');

            axios.get(`http://localhost:5500/api/me`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((res) => {
                this.dataUser = res.data;
                console.log(res);
            }).catch((err) => {
                toast("Error Authentikasi", {
                    autoClose: 2500,
                    type: 'error'
                });
                console.warn(err);
            });
        }
    }
}
</script>

<!-- <style scoped>
    div {
        border: 1px solid black;
    }
</style> -->

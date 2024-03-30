<template>
    <div class="animate-fade-left poppins-regular mt-4">
        <div class="flex flex-wrap">
            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            <div class="lg:w-8/12 md:w-8/12 w-full flex items-center justify-center">
                <CarouselBrgVue></CarouselBrgVue>
            </div>
            
            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>


        </div>

        <div class="flex flex-wrap mt-2 mb-2">
            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
            <div class="lg:w-8/12 md:w-8/12 w-full">
                Choose Your Favourite : 
            </div>

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
        </div>

        <div class="flex flex-wrap mb-3" v-for="(item, index) in dataBarang" :key="index">

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block">

            </div>
            
            <div class="lg:w-1/12 md:w-1/12 w-4/12 text-center flex items-center justify-center">   
                <router-link :to="{ name: 'BarangDetail', params: { id: item.id } }">
                    <img :src="getImg(item.gambar[0], item.source_data)" alt="" class="object-cover h-[100px] w-[100px] rounded-lg">
                </router-link>
            </div>

            <div class="lg:w-7/12 md:w-7/12 w-8/12 lg:pl-2 md:pl-2 pt-1" >
                <div class="font-bold">
                    <router-link :to="{ name: 'BarangDetail', params: { id: item.id } }">{{ item.nama_barang }}</router-link>
                </div>
                <div class="py-1 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum qui enim, corrupti labore beatae sapiente aliquid, temporibus eveniet, provident vel minima. Voluptates, asperiores quod? Hic dignissimos culpa aliquid deleniti cupiditate.
                </div>
                <div class="text-green-400">
                    Rp. {{ item.harga }}
                </div>

                <div class="text-right">
                    <router-link :to="{ name: 'BarangDetail', params: { id: item.id } }">
                        <i class="fas fa-plus-circle text-green-600"></i>
                    </router-link>
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

export default {
    name: 'barang-component',
    data: function(){
        return {
            dataBarang: null,
        }
    },
    components: {
        CarouselBrgVue,
        BubbleCartVue
    },
    mounted: function(){
        let token = localStorage.getItem('token');

        axios.get('http://localhost:5500/apiBrg/barang', {
            headers: {
                Authorization: 'Bearer ' + token
            }
            // harus pakai arrow function. 
            // karena this di vue merujuk ke dataBarang, kalo pake func biasa ntr dia ke scope function axios.
        }).then((response) => {
            // alert("Berhasil Tarik barang");
            console.log(response.data);
            this.dataBarang = response.data;
        }).catch((error) => {
            if(error.response.status == 401){
                this.$router.push('/');
            }

            alert("gagal");
            console.warn(error);
        })
    },
    methods: {
        getImg: function(img, source){
            if(source == 'import'){
                return img;
            }
            return `http://localhost:5500/apiBrg/images/${img}`
        }
    }
}
</script>

<!-- <style scoped>
    div {
        border: 1px solid black;
    }
</style> -->
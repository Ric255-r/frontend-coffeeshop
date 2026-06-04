<template>
    <div class="poppins-regular">
        <div class="w-full text-center"><span class="text-sm tracking-wide text-emerald-700">Registrasi</span><h3 class="font-bold text-5xl text-stone-900 mt-1"> CoffeeKu</h3></div>

        <form action="" class="w-full mt-8 " method="post" @submit.prevent="buatRegis">
            <!-- <div class=" mt-3">
                <label for="">Nama</label>
                <input type="text" v-model="nama" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
            </div> -->
            <div class="">
                <label for="" class="text-sm font-medium text-stone-700">Email</label>
                <input type="text" v-model="email" name="" id="" class="w-full rounded-xl border-stone-200 bg-stone-50 focus:border-emerald-500 focus:ring-emerald-500 mt-1">
            </div>
            <div class=" mt-3">
                <label for="" class="text-sm font-medium text-stone-700">Password</label>
                <input type="password" v-model="password" name=""  id="" class="w-full rounded-xl border-stone-200 bg-stone-50 focus:border-emerald-500 focus:ring-emerald-500 mt-1">
            </div>
            <div class=" mt-3">
                <label for="" class="text-sm font-medium text-stone-700">Konfirmasi Password</label>
                <input type="password" v-model="konfirPass" name="" id="" class="w-full rounded-xl border-stone-200 bg-stone-50 focus:border-emerald-500 focus:ring-emerald-500 mt-1">
            </div>

            
            <button class="w-full text-white bg-emerald-700 hover:bg-emerald-800 mt-5 py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition">Submit</button>
        </form>

    </div>
</template>

<script>
// import Login from './Login.vue';
import axios from 'axios';
import {toast} from 'vue3-toastify'

export default {
    name: 'register-component',
    props: {
        klikRegis: Boolean
    },
    data: function(){
        return {
            email: null,
            password: null,
            konfirPass: null
        }
    },
    // components: {
    //     Login
    // }
    methods: {
        buatRegis: function(){
            const checkpass = () => {
                if(this.password === this.konfirPass){
                    return true;
                }else{
                    return false;
                }
            };

            if(checkpass()){
                axios.post('http://localhost:5500/api/register', {
                    email: this.email,
                    passwd: this.password
                }).then((res) => {
                    console.log(res);
                    // alert("Sudah Teregis, Silahkan Login");

                    toast("Sudah Teregis. Silahkan Login!", {
                        autoClose: 2500,
                        type: 'success'
                    });

                    this.$emit("update:klikRegis", false);
                }).catch((err) => {
                    console.warn(err);
                })
                
            }else{
                toast("Pastikan Konfirmasi password sama dengan pass yg anda isi", {
                    toastClassName: 'w-full mr-5 pr-5',
                    autoClose: 2500,
                    type: 'error'
                });
            }



        }
    }
}
</script>

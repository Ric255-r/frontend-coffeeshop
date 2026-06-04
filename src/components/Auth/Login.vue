<template>
    <div>
        <div v-if="!klikRegis" class="animate-flip-up flex flex-wrap poppins-regular bg-white/95 rounded-2xl shadow-2xl shadow-emerald-900/20 border border-white/70 px-6 py-8">
            <div class="w-full text-center"><span class="text-sm tracking-wide text-emerald-700">Selamat Datang di</span><h3 class="font-bold text-5xl text-stone-900 mt-1"> CoffeeKu</h3></div>

            <form action="" class="w-full mt-8" method="post" @submit.prevent="buatLogin()">
                <div class="mb-3">
                    <label for="" class="text-sm font-medium text-stone-700">Email</label>
                    <input type="text" v-model="email" name="" id="" class="w-full rounded-xl border-stone-200 bg-stone-50 focus:border-emerald-500 focus:ring-emerald-500 mt-1">
                </div>
                <div class="mt-3 mb-4">
                    <label for="" class="text-sm font-medium text-stone-700">Password</label>
                    <input type="password" v-model="password" name="" id="" class="w-full rounded-xl border-stone-200 bg-stone-50 focus:border-emerald-500 focus:ring-emerald-500 mt-1">
                </div>
                
                <button class="w-full text-white bg-emerald-700 hover:bg-emerald-800 mt-5 py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition">Submit</button>
            </form>
            
            <button class="w-full mt-3 rounded-xl py-3 text-emerald-700 hover:bg-emerald-50 transition" @click="formRegis">Register</button>
        </div>

        <div v-if="klikRegis" class="animate-flip-up bg-white/95 rounded-2xl shadow-2xl shadow-emerald-900/20 border border-white/70 px-6 py-8">
            <Register v-model:klikRegis="klikRegis"></Register>
            <div class="mt-5 text-sm text-stone-600">Already Have An Account? <button @click="formRegis" class="text-emerald-700 font-semibold hover:text-emerald-900" >Login Now</button></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Register from './Register.vue';
import store from '@/router/store'
import {toast} from 'vue3-toastify'

export default {
    name: 'login-component',
    components: {
        Register
    },
    data: function(){
        return {
            klikRegis: false,
            email: null,
            password: null
        }
    },
    methods: {
        formRegis: function(){
            this.klikRegis = !this.klikRegis
            console.log("Nilai Klik Regis", this.klikRegis)
        },
        buatLogin: function(){
            let email = this.email;
            let password = this.password;

            axios.post(`http://localhost:5500/apiUser/login`, {
                email: email,
                passwd: password
            }).then((res) => {
                // alert('Bisa Login');
                // console.log(res);
                // localStorage.setItem('token', res.data.access_token);
                store.commit('setLoggedIn', res.data.access_token);

                // tembak ke halaman lain
                if(res.data.usernya.roles == 'Admin'){
                    this.$router.push('/admin');
                }else{
                    this.$router.push('/home');

                }

            }).catch((err) => {
                
                toast("Gagal Login", {
                    autoClose: 2500,
                    type: 'error'
                });
                store.commit('setLoggedIn', false);
                this.$router.push('/');

                console.warn(err);
            })
        }
    }
}
</script>

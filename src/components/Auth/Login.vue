<template>
    <div>
        <div v-if="!klikRegis" class="animate-flip-up flex flex-wrap poppins-regular">
            <div class="w-full text-center"><span>Selamat Datang di </span><h3 class="font-bold text-5xl "> CoffeeKu</h3></div>

            <form action="" class="w-full mt-8" method="post" @submit.prevent="buatLogin()">
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="email" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
                </div>
                <div class="mt-3 mb-4">
                    <label for="">Password</label>
                    <input type="password" v-model="password" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
                </div>
                
                <button class="w-full text-white bg-blue-600 hover:bg-blue-700 mt-5 py-3 rounded-br-lg rounded-tl-lg">Submit</button>
            </form>
            
            <button class="w-full mt-3 rounded-br-lg rounded-tl-lg" @click="formRegis">Register</button>
        </div>

        <div v-if="klikRegis" class="animate-flip-up ">
            <Register v-model:klikRegis="klikRegis"></Register>
            <div class="mt-5">Already Have An Account? <button @click="formRegis" class="text-blue-600" >Login Now</button></div>
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
<template>
    <div>
        <div class="w-full text-center font-sophia"><h3>Registrasi CoffeeKu</h3></div>

        <form action="" class="w-full mt-3 font-sophia" method="post" @submit.prevent="buatRegis">
            <!-- <div class=" mt-3">
                <label for="">Nama</label>
                <input type="text" v-model="nama" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
            </div> -->
            <div class="">
                <label for="">Email</label>
                <input type="text" v-model="email" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
            </div>
            <div class=" mt-3">
                <label for="">Password</label>
                <input type="text" v-model="password" name=""  id="" class="w-full rounded-br-lg rounded-tl-lg">
            </div>
            <div class=" mt-3">
                <label for="">Konfirmasi PAssword</label>
                <input type="text" v-model="konfirPass" name="" id="" class="w-full rounded-br-lg rounded-tl-lg">
            </div>

            
            <button class="w-full text-white bg-blue-600 hover:bg-blue-700 mt-3 rounded-br-lg rounded-tl-lg">Submit</button>
        </form>

    </div>
</template>

<script>
// import Login from './Login.vue';
import axios from 'axios';

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
                axios.post('http://localhost:5500/apiUser/register', {
                    email: this.email,
                    passwd: this.password
                }).then((res) => {
                    console.log(res);
                    alert("Sudah Teregis, Silahkan Login");
                    this.$emit("update:klikRegis", false);
                }).catch((err) => {
                    console.warn(err);
                })
                
            }else{
                alert("Pastikan Konfirmasi password sama dengan pass yg anda isi");
            }



        }
    }
}
</script>
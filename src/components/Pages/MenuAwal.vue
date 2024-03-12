<template>
    <div>
        <div class="flex flex-wrap" :style="styleBg">
            <div class=" lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            <div class="lg:w-8/12 md:w-8/12 lg:pl-0 md:pl-0 pl-2 w-full text-white poppins-regular">
                Welcome <br /> {{ dataUser.email }}
            </div>

            <div class="lg:w-2/12 md:w-2/12 hidden lg:block md:block ">

            </div>

            <BarangVue></BarangVue>
            
            <NavbarBottom></NavbarBottom>

        </div>

    </div>
</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import BarangVue from './Barang.vue';
import axios from 'axios';

export default {
    name: 'menu-awal',
    data: function(){
        return {
            dataUser: {},
            styleBg: ''
        }
    },
    components: {
        NavbarBottom,
        BarangVue
    },
    mounted: function(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        let token = localStorage.getItem('token');

        axios.get(`http://localhost:5500/apiUser/me`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            this.dataUser = res.data;
            console.log(res);
        }).catch((err) => {
            alert("Error");
            console.warn(err);
        })
    },
    methods: {
        handleResize: function(){
            if(window.innerWidth < 1000){
                this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 93%, #057a55 7%)'
            }else{
                this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 90%, #057a55 10%)'
            }
        }
    }

}
</script>
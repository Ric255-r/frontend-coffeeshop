<template>
    <div>
        <div class="flex flex-wrap" :style="styleBg">


            <router-view></router-view> 
            <!-- Awalny <BarangVue /> -->
            
            <NavbarBottom @some-event="panggilBalik"></NavbarBottom>

        </div>

    </div>
</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
// import BarangVue from './Barang.vue';
// import axios from 'axios';

export default {
    name: 'menu-awal',
    data: function(){
        return {
            // dataUser: {},
            styleBg: '',
            hideAwal: '',
            styleHome: 'background: linear-gradient(to top,  #FFFFFF 90%, #057a55 10%)',
            styleProfile: 'background: linear-gradient(to top,  #FFFFFF 70%, #057a55 30%)',
            namaUrl: 'home'
        }
    },
    components: {
        NavbarBottom,
        // BarangVue
    },
    mounted: function(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();   
        
    },
    // watch: {
    //     '$route' (to, from){
    //         console.log(to);
    //         console.log(from);

    //         if(to.path == '/home/profile'){
    //             this.styleBg = `background: linear-gradient(to top,  #FFFFFF 70%, #057a55 30%)`
    //         }else{
    //             this.handleResize();
    //         }
    //     }
    // },
    methods: {
        panggilBalik: function(urlName){
            if(urlName == 'home'){
                this.styleBg = this.styleHome;
            }else{
                this.styleBg = this.styleProfile;
            }
            this.namaUrl = urlName;
            this.handleResize();
        },
        handleResize: function(){
            if(this.namaUrl == 'home'){
                if(window.innerWidth < 1000){
                    this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 93%, #057a55 7%)'
                }else{
                    this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 90%, #057a55 10%)'
                }
            }else{
                this.styleBg = this.styleProfile;
            }
        }
    }

}
</script>
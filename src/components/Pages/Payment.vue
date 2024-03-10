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
                            <div class="w-full font-bold mb-1">
                                {{ item.nama_barang }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Topping : {{ item.topping }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Syrup : {{ item.syrup }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Ice Cube : {{ item.ice_cube }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Espresso : {{ item.espresso }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Variant : {{ item.variant }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Sweetness : {{ item.sweetness }}
                            </div>
                            <div class="w-full text-[10px] text-gray-600">
                                Milk : {{ item.milk }}
                            </div>
                            <div class="w-full text-right font-bold">
                                Total : {{ item.harga_akhir }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap ">
                    <div class="w-full text-[14px] text-gray-600">
                        Cek Ringkasan Belanjamu
                    </div>
                    <div class="w-8/12 mt-2">
                        Total Harga ({{ dataBeli.length }}) Item
                    </div>
                    <div class="w-4/12 text-right">
                        Rp. {{ subtotal }}
                    </div>

                    <div class="w-8/12">
                        Pajak (11%)
                    </div>
                    <div class="w-4/12 text-right">
                        Rp. {{ nilaiPjk }}
                    </div>

                    <div class="w-8/12">
                        GrandTotal
                    </div>
                    <div class="w-4/12 text-right">
                        Rp. {{ grandTotal }}
                    </div>
                </div>

                <div class="flex justify-center p-4">
                    <button id="button" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show modal</button>
                </div>
            </div>
            <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

            </div>
        </div>


        <div id="modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                            Terms of Service
                        </h3>
                        <button id="closeButton" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button type="button" id="footerClose" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>

        <NavbarBottom></NavbarBottom>
    </div>
</template>

<script>
import axios from "axios";
import NavbarBottom from "./NavbarBottom.vue";
// import { initFlowbite } from 'flowbite'
import { Modal } from "flowbite";

export default {
    name: "payment-component",
    data: function () {
        return {
            id: this.$route.params.id,
            dataBeli: [],
        };
    },
    beforeRouteLeave(to, from, next) {
        if (from.name === 'payment') { // ambil dari name router.js
            let r = confirm("Apakah Yakin Ingin Membatalkan?");

            if(r == true){
                axios.delete(`http://localhost:5500/apiJual/cancelTransaction/${this.id}`)
                .then((res) => {
                    console.log(res);
                    next();
                })
                .catch((err) => {
                    console.warn(err)
                    next(false); // Mencegah Navigasi
                    return false; // Harus tambah return supaya navigasiny d cekal

                });
            }else{
                next(false); // Mencegah Navigasi
                return false; // Harus tambah return supaya navigasiny d cekal
            }
        } else {
            next();
        }
    },
    mounted: function () {
        // Fungsi Modal
        // initFlowbite();
        const $buttonElement = document.querySelector('#button');
        const $modalElement = document.querySelector('#modal');
        const $closeButton1 = document.querySelector('#closeButton');

        const modalOption = {
            backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            backdrop: 'static'
        }

        if($modalElement){
            const modal = new Modal($modalElement, modalOption);

            $buttonElement.addEventListener('click', () => {
                $modalElement.classList.add("animate-fade");
                modal.toggle();

                setTimeout(() => {
                    $modalElement.classList.remove("animate-fade");
                }, 500);
            })

            $closeButton1.addEventListener('click', () => {
                // Add animate-fade class when hiding the modal
                $modalElement.classList.add('animated');
                $modalElement.classList.add('fadeOut');

                setTimeout(() => {
                    modal.hide();
                    $modalElement.classList.remove('animated');
                    $modalElement.classList.remove('fadeOut');

                }, 1000); // Adjust the timeout based on your animation duration
            });
        }

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
/* div {
    border: 1px solid black;
} */

.animated {
    background-repeat: no-repeat;
    -webkit-animation-duration:1s;animation-duration: 1s;
    -webkit-animation-fill-mode: both;animation-fill-mode: both;
}

@-webkit-keyframes fadeOut {
    0% {opacity: 1;}
    100% {opacity: 0;}
}

@keyframes fadeOut {
    0% {opacity: 1;}
    100% {opacity: 0;}
}

.fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
}
</style>
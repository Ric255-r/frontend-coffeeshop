<template>
    <div class="poppins-regular payment-page">
        <div class="flex flex-wrap">
            <div class="lg:w-2/12 md:w-1/12 sm:w-1/12 hidden lg:block md:block sm:block">

            </div>
            <div class="lg:w-8/12 md:w-10/12 sm:w-10/12 py-4 w-full lg:px-0 md:px-0 px-4">

                <div class="flex flex-wrap bg-white rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-100 p-5 mb-[90px] payment-shell">
                    <div class="w-full">
                        <div class="flex flex-wrap items-center">
                            <div class="w-8/12">
                                <div class="text-xs uppercase tracking-wide text-emerald-700 font-bold">Payment</div>
                                <div class="font-bold text-2xl text-stone-900">Payment Summary</div>
                                <div class="text-sm text-stone-500 mt-1">No. Transaksi {{ id }}</div>
                            </div>
                            <div class="w-4/12 text-right">
                                <span class="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
                                    {{ dataBeli.length }} item
                                </span>
                            </div>
                        </div>
                    </div>

                <div class="w-full bg-emerald-50 h-[7px] rounded-full mt-2 mb-4"></div>

                <div class="flex flex-wrap mb-3 rounded-2xl border border-stone-100 bg-stone-50/60 p-3 payment-item" v-for="(item, index) in dataBeli" :key="index">
                    <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 w-3/12">
                        <img :src="getImg(item.gambar, item.source_data)" alt="" class="object-cover h-[100px] w-[100px] rounded-2xl shadow-md shadow-stone-900/10 border border-white">
                    </div>
                    <div class="lg:w-10/12 md:w-10/12 sm:w-10/12 w-9/12 pl-3">
                        <div class="flex flex-wrap">
                            <div class="w-8/12 font-bold mb-2 text-stone-900 text-base">
                                {{ item.nama_barang }}
                            </div>
                            <div class="w-4/12 text-right font-bold text-emerald-700">
                                Rp.{{ item.harga_seluruh }}
                            </div>
                            <div class="w-full">
                                <span class="payment-chip">Topping: {{ JSON.parse(item.topping).toString().length > 0 ? JSON.parse(item.topping).toString().replace(/[{}]/g, '') : 'Tidak Memilih Topping' }}</span>
                                <span class="payment-chip">Syrup: {{ JSON.parse(item.syrup).toString().length > 0 ? JSON.parse(item.syrup).toString().replace(/[{}]/g, '') : 'Tidak Memilih Sirup' }}</span>
                                <span class="payment-chip">Ice: {{ item.ice_cube }}</span>
                                <span class="payment-chip">Espresso: {{ item.espresso }}</span>
                                <span class="payment-chip">Variant: {{ item.variant }}</span>
                                <span class="payment-chip">Sweetness: {{ item.sweetness }}</span>
                                <span class="payment-chip">Milk: {{ item.milk }}</span>
                                <span class="payment-chip payment-chip-qty">Qty: {{ item.qty }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full bg-emerald-50 h-[7px] rounded-full mt-2 mb-4"></div>

                <div class="w-full payment-total-panel">
                    <div class="flex flex-wrap items-stretch">
                        <div class="w-full lg:w-8/12 lg:pr-3">
                            <div class="flex flex-wrap payment-receipt">
                                <div class="w-full text-[14px] text-gray-600 font-semibold mb-2">
                                    Cek Ringkasan Belanjamu
                                </div>
                                <div class="w-8/12 mt-2 text-stone-500">
                                    Total Harga 
                                </div>
                                <div class="w-4/12 text-right font-semibold text-stone-800">
                                    Rp. {{ subtotal }}
                                </div>

                                <div class="w-8/12 text-stone-500">
                                    Pajak (11%)
                                </div>
                                <div class="w-4/12 text-right font-semibold text-stone-800">
                                    Rp. {{ nilaiPjk }}
                                </div>

                                <div class="w-full h-[1px] bg-stone-100 my-3"></div>

                                <div class="w-8/12 font-bold text-stone-900">
                                    GrandTotal
                                </div>
                                <div class="w-4/12 text-right text-emerald-700 text-lg">
                                    <b>Rp. {{ grandTotal }}</b>
                                </div>
                            </div>
                        </div>

                        <div class="w-full lg:w-4/12 lg:pl-3 mt-3 lg:mt-0">
                            <div class="payment-action-card">
                                <div class="text-xs uppercase tracking-wide text-emerald-100 font-bold">
                                    Total Bayar
                                </div>
                                <div class="text-2xl font-bold text-white mt-1">
                                    Rp. {{ grandTotal }}
                                </div>
                                <div class="text-xs text-emerald-50/80 mt-1">
                                    Termasuk pajak 11%
                                </div>
                                <button id="button" type="button" class="payment-pay-button">
                                    Process To Pay
                                    <i class="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="lg:w-2/12 md:w-1/12 sm:w-1/12 hidden lg:block md:block sm:block">

            </div>
        </div>


        <div id="modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-3xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-700 overflow-hidden">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-5 border-b border-stone-100 rounded-t dark:border-gray-600 modal-head">
                        <div>
                            <div class="text-xs uppercase tracking-wide text-emerald-700 font-bold">Transfer Payment</div>
                            <h3 class="text-xl font-bold text-gray-900 lg:text-2xl dark:text-white">
                                Lengkapi Pembayaran
                            </h3>
                        </div>
                        <button id="closeButton" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <form action="" method="post" @submit.prevent="submitBukti">
                            <div class="flex flex-wrap">
                                <div class="w-full mb-3 text-stone-600 text-sm">
                                    Pilih salah satu rekening, lalu upload bukti pembayaran.
                                </div>
                                <div class="w-6/12">
                                    <div class="flex flex-wrap border border-stone-200 mr-2 rounded-2xl px-3 py-4 bg-stone-50 bank-card">
                                        <div class="w-full mb-4">
                                            <img :src="require('@/assets/bca.png')" alt="">
                                        </div>

                                        <div class="w-6/12 text-stone-500">
                                            No. Rek
                                        </div>
                                        <div class="w-6/12 font-semibold text-stone-900">
                                            91919191
                                        </div>
                                        
                                        <div class="w-6/12 mt-1 text-stone-500">
                                            Penerima
                                        </div>
                                        <div class="w-6/12 mt-1 font-semibold text-stone-900">
                                            CoffeShop
                                        </div>
                                    </div>
                                </div>
                                <div class="w-6/12">
                                    <div class="flex flex-wrap border border-stone-200 rounded-2xl px-3 py-4 bg-stone-50 bank-card">
                                        <div class="w-full mb-4">
                                            <img :src="require('@/assets/bni.png')" alt="">
                                        </div>

                                        <div class="w-6/12 text-stone-500">
                                            No. Rek
                                        </div>
                                        <div class="w-6/12 font-semibold text-stone-900">
                                            91919191
                                        </div>
                                        
                                        <div class="w-6/12 mt-1 text-stone-500">
                                            Penerima
                                        </div>
                                        <div class="w-6/12 mt-1 font-semibold text-stone-900">
                                            CoffeShop
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-3">
                                    <label for="" class="payment-label">Nama Pemesan</label>
                                    <input type="text" name="" id="" class="w-full rounded-xl border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50" v-model="nama_pemesan">
                                </div>
                                <div class="w-full mt-3">
                                    <label for="" class="payment-label">Nomor HP</label>
                                    <input type="text" name="" id="" class="w-full rounded-xl border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 bg-stone-50" v-model="nohp_pemesan">
                                </div>
                                <div class="w-full mt-3">
                                    <label for="" class="payment-label">Upload Bukti Pembayaran</label>
                                    <input type="file" name="payment" id="payment" v-on:change="handleBukti" class="w-full mt-2 file-input">
                                </div>
                                <div class="w-full">
                                    <button type="submit" class="bg-emerald-700 w-full py-3 mt-3 rounded-xl hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 transition">Submit Bukti Pembayaran</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- Modal footer -->
                    <!-- <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button type="button" id="footerClose" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Decline</button>
                    </div> -->
                </div>
            </div>
        </div>
        <ConfirmDialog></ConfirmDialog>
        <NavbarBottom></NavbarBottom>
    </div>
</template>

<script>
import axios from "axios";
import NavbarBottom from "./NavbarBottom.vue";
// import { initFlowbite } from 'flowbite'
import { Modal } from "flowbite";
import ConfirmDialog from 'primevue/confirmdialog';
import {toast} from 'vue3-toastify'

export default {
    name: "payment-component",
    data: function () {
        return {
            id: this.$route.params.id,
            dataBeli: [],
            buktiGbr: null,
            token: localStorage.getItem('token') || "",
            nama_pemesan: '',
            nohp_pemesan: ''
        };
    },
    beforeRouteLeave(to, from, next) {
        if (from.name === 'payment') { // ambil dari name router.js

            // Primevue ConfirmDialog
            this.$confirm.require({
                message: "Anda Yakin Ingin Membatalkan?",
                header: "Confirmation",
                icon: 'fas fa-exclamation-triangle',
                rejectClass: 'px-4 py-2 bg-red-600 rounded-lg text-white',
                rejectLabel: 'Cancel',
                acceptLabel: 'Proses',
                acceptClass: 'px-4 py-2 bg-green-600 rounded-lg text-white',
                accept: () => {
                    axios.delete(`http://localhost:5500/api/cancelTransaction/${this.id}`)
                    .then((res) => {
                        console.log(res);
                        next();
                    })
                    .catch((err) => {
                        console.warn(err)
                        next(false); // Mencegah Navigasi
                        return false; // Harus tambah return supaya navigasiny d cekal

                    });
                },
                reject: () => {
                    next(false); // Mencegah Navigasi
                    return false; // Harus tambah return supaya navigasiny d cekal
                }
            });

            // Original
            // let r = confirm("Apakah Yakin Ingin Membatalkan?");

            // if(r == true){
            //     axios.delete(`http://localhost:5500/api/cancelTransaction/${this.id}`)
            //     .then((res) => {
            //         console.log(res);
            //         next();
            //     })
            //     .catch((err) => {
            //         console.warn(err)
            //         next(false); // Mencegah Navigasi
            //         return false; // Harus tambah return supaya navigasiny d cekal

            //     });
            // }else{
            //     next(false); // Mencegah Navigasi
            //     return false; // Harus tambah return supaya navigasiny d cekal
            // }
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
            .get(`http://localhost:5500/api/detailPenjualan/${this.id}`)
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
        ConfirmDialog
    },
    computed: {
        subtotal: function(){
            let subtotal = 0;

            for (let i = 0; i < this.dataBeli.length; i++) {
                subtotal += this.dataBeli[i].harga_seluruh
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
        getImg: function(img, srcData){
            const convertStrToJson = JSON.parse(img);
            const gbrPertama = convertStrToJson[0];

            if(srcData == 'import'){
                return gbrPertama;
            }
            return `http://localhost:5500/api/images/${gbrPertama}`
        },
        handleBukti: function(e){
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            this.buktiGbr = files[0];
        },
        submitBukti: function(){
            if(this.buktiGbr != null){
                console.log(this.buktiGbr);

                let formData = new FormData();
                formData.append('nama_pemesan', this.nama_pemesan);
                formData.append('nohp_pemesan', this.nohp_pemesan);
                formData.append('buktiByr', this.buktiGbr);

                axios.post(`http://localhost:5500/api/finalizeTransaction/${this.id}`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                        "Content-Type" : "multipart/form-data"
                    }
                }).then((res) => {
                    toast("Pembayaran Berhasil", {
                        autoClose: 2500,
                        type: 'success'
                    });

                    console.log(res);
                    // gk bs pake push router
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 1500);

                    localStorage.removeItem('cart');
                    localStorage.removeItem('totalHarga');
                }).catch((err) => {
                    toast("Gagal bayar", {
                        autoClose: 2500,
                        type: 'errpr'
                    });
                    console.warn(err);
                })
            }else{
                toast("Gagal Submit", {
                    autoClose: 2500,
                    type: 'error'
                });
            }
        }
    }
};
</script>

<style scoped>
/* div {
    border: 1px solid black;
} */

.payment-page {
    min-height: 100vh;
    background:
        linear-gradient(to bottom, #057a55 0 220px, #f8faf8 220px 100%);
}

.payment-shell {
    background:
        linear-gradient(135deg, rgba(236, 253, 245, 0.78), rgba(255, 255, 255, 0.98) 28%),
        #ffffff;
}

.payment-item {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.payment-item:hover {
    transform: translateY(-1px);
    background: rgba(236, 253, 245, 0.55);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
}

.payment-chip {
    display: inline-flex;
    align-items: center;
    margin: 0.25rem 0.3rem 0 0;
    padding: 0.25rem 0.55rem;
    border-radius: 9999px;
    border: 1px solid #e7eee9;
    background: #ffffff;
    color: #57534e;
    font-size: 0.72rem;
    line-height: 1.2;
}

.payment-chip-qty {
    color: #047857;
    border-color: #bbf7d0;
    background: #ecfdf5;
    font-weight: 700;
}

.payment-receipt {
    border: 1px solid #edf2ef;
    border-radius: 1rem;
    background: #f8faf8;
    padding: 1rem;
    height: 100%;
}

.payment-total-panel {
    margin-top: 0.25rem;
}

.payment-action-card {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 34%),
        linear-gradient(135deg, #059669, #047857);
    padding: 1rem;
    box-shadow: 0 18px 34px rgba(4, 120, 87, 0.22);
}

.payment-pay-button {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    border-radius: 0.85rem;
    background: #ffffff;
    color: #047857;
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
    font-weight: 800;
    box-shadow: 0 12px 22px rgba(15, 23, 42, 0.14);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.payment-pay-button:hover {
    background: #ecfdf5;
    box-shadow: 0 16px 26px rgba(15, 23, 42, 0.18);
    transform: translateY(-1px);
}

.payment-pay-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.24), 0 16px 26px rgba(15, 23, 42, 0.18);
}

.modal-head {
    background: linear-gradient(135deg, rgba(236, 253, 245, 0.95), #ffffff);
}

.bank-card {
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.bank-card:hover {
    border-color: #86efac;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
    transform: translateY(-1px);
}

.bank-card img {
    max-height: 42px;
    width: auto;
    object-fit: contain;
}

.payment-label {
    display: inline-block;
    margin-bottom: 0.35rem;
    color: #44403c;
    font-size: 0.85rem;
    font-weight: 600;
}

.file-input {
    border: 1px dashed #bbf7d0;
    border-radius: 1rem;
    background: #f8faf8;
    padding: 0.85rem;
    color: #57534e;
}

.file-input::file-selector-button {
    border: 0;
    border-radius: 0.75rem;
    background: #047857;
    color: #ffffff;
    padding: 0.55rem 0.9rem;
    margin-right: 0.75rem;
    cursor: pointer;
}

@media (max-width: 640px) {
    .payment-chip {
        font-size: 0.68rem;
    }

    .bank-card {
        margin-bottom: 0.75rem;
    }

    .payment-action-card {
        min-height: auto;
    }
}

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

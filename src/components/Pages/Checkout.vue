<template>
    <div>
        <!-- Template By JaxStone -->
        <!-- https://tailwindflex.com/@jaxstone/checkout-page-template -->
        <div class="h-screen py-8" :style="styleBg">
            <div class="container mx-auto px-4">
                <h1 class="text-2xl font-semibold mb-4 text-center text-gray-800">Pesanan Sementara</h1>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-full">
                        <div class="bg-white rounded-lg shadow-md p-6 mb-[100px]" style="overflow-x: auto;">
                            <table class="w-full mb-[30px] whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th class="text-left font-semibold">Beverages</th>
                                        <th class="text-left font-semibold">Price</th>
                                        <th class="text-left font-semibold">Quantity</th>
                                        <th class="text-left font-semibold">Total</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4">
                                            <div class="mt-3 w-full h-[0.1px]"></div>
                                        </th>
                                    </tr>
                                </thead>

                    
                                <tbody v-if="showCart.cart.length">
                                    <tr v-for="(item, index) in showCart.cart" :key="index">
                                        <td class="py-4">
                                            <div class="flex items-center">
                                                <template v-for="(item2, index2) in dataBarang" :key="index2">
                                                    <img class="h-16 w-16 mr-4 lg:block md:block sm:block hidden" v-if="item.id_barang == item2.id" :src="getImg(item2.gambar[0], item2.source_data)" alt="Product image">

                                                </template>
                                                <span>
                                                    <span class="font-semibold">
                                                        <router-link :to="{ name: 'BarangDetail', params: { id: item.id_barang},  query: { productOrder: index } }">{{ item.nama_barang }}</router-link> <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.ukuran_cup">
                                                        Ukuran Cup : {{ item.ukuran_cup }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.ice_cube">
                                                        Ice Cube : {{ item.ice_cube }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.espresso">
                                                        Espresso : {{ item.espresso }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.sweetness">
                                                        Sweetness : {{ item.sweetness }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.variant">
                                                        Variant : {{ item.variant }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px] whitespace-normal" v-if="item.topping.length > 0">
                                                        Topping : 
                                                        <span v-for="(items, index) in item.topping" :key="index">
                                                            {{ items }}
                                                            {{  index !== item.topping.length - 1 ? ', ': '' }}
                                                        </span> <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.syrup.length > 0">
                                                        Syrup : {{ item.syrup }} <br />
                                                    </span> 
                                                    <span class="lg:text-[12px] md:text-[12px] sm:text-[12px]   text-[9px]" v-if="item.milk">
                                                        Milk : {{ item.milk }} <br />
                                                    </span> 
                                                    
                                                </span>
                                            </div>
                                        </td>
                                        <td class="py-4">Rp. {{ item.harga }}</td>
                                        <td class="py-4">
                                            <div class="flex items-center">
                                                <button 
                                                    class="border rounded-md lg:py-2 lg:px-4 md:py-2 md:px-4 py-1 px-2 mr-2"
                                                    @click="handleMinus(index, item.qty == null ? 1 : item.qty)">-</button>

                                                <span class="text-center w-8">{{ item.qty == null ? 1 :  item.qty }}</span>
                                                <button 
                                                    class="border rounded-md lg:py-2 lg:px-4 md:py-2 md:px-4 py-1 px-2 ml-2" 
                                                    @click="handlePlus(index, item.qty == null ? 1 : item.qty)">
                                                +
                                                </button>
                                            </div>
                                        </td>
                                        <td class="py-4">Rp {{ showCart.harga[index].totalSeluruh }}</td>
                                    </tr>
                                    <!-- More product rows -->

                                    <tr>
                                        <td colspan="4">
                                            <form method="post" @submit.prevent="postTransaction">
                                                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                                            </form>
                                        </td>

                                    </tr>
                                </tbody>

                                <tbody v-else>
                                    <br><br>
                                    <tr class="text-center">
                                        <td colspan="4" class="py-5">Tidak Ada List Minuman</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- <div class="md:w-1/4">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-lg font-semibold mb-4">Summary</h2>
                            <div class="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$19.99</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr class="my-2">
                            <div class="flex justify-between mb-2">
                                <span class="font-semibold">Total</span>
                                <span class="font-semibold">Rp. {{ showTotalSemua }}</span>
                            </div>
                            <form method="post" @submit.prevent="postTransaction">
                                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                            </form>
                        </div>
                    </div> -->
                    
                </div>
            </div>
        </div>

        <!-- {{ dataNota }} -->

        <!-- {{ showCart.cart }} -->

        <NavbarBottom ></NavbarBottom>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarBottom from './NavbarBottom.vue';

export default {
    name: 'checkout-component',
    components: {
        NavbarBottom
    },
    data: function(){
        return {
            dataCart: JSON.parse(localStorage.getItem('cart')) || [],
            dataBarang: [],
            dataTotal: JSON.parse(localStorage.getItem('totalHarga')) || [],
            dataNota: '',
            quantity: 0,
            styleBg: ''

        }
    },
    computed: {
        showCart: function(){
            let cart = [];
            // let cartTotal = [];

            for (let i = 0; i < this.dataCart.length; i++) {
                // Supaya Urutannya sama dengan yg dilocalStorage
                let find = this.dataBarang.find((item) => item.id == this.dataCart[i].id_barang);

                if(find){
                    cart.push(find);
                }
                // console.log(cart);
            }
            // Copy ulang isi dari cart yg udh difilter ke arrCart
            let arrCart = [...cart];

            for (let i = 0; i < arrCart.length; i++) {
                // Adding a new key to the first object in the array
                arrCart[i] = {
                    ...arrCart[i], // ini obj yg sudh ad
                    'ukuran_cup': this.dataCart[i].ukuran_cup,
                    'milk': this.dataCart[i].milk,
                    'espresso': this.dataCart[i].espresso,
                    'ice_cube': this.dataCart[i].ice_cube,
                    'sweetness': this.dataCart[i].sweetness,
                    'syrup': this.dataCart[i].syrup,
                    'topping': this.dataCart[i].topping,
                    'variant': this.dataCart[i].variant,
                    'qty': this.dataCart[i].qty,
                    'id_barang': this.dataCart[i].id_barang
                };
            }

            let harga = this.dataTotal.filter((item) => {
                let find = this.dataCart.find((item2) => item.id_barang == item2.id_barang);
                // console.log(find);
                return find
            })

            return {
                cart: arrCart,
                harga: harga
            };
        },
        showTotalSemua: function(){
            let total = 0
            for (let i = 0; i < this.dataTotal.length; i++) {
                total += this.dataTotal[i].totalHarga
            }

            return total;
        }
    },
    mounted: function(){
        this.getBrgNota();

        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    methods: {
        getImg: function(img, srcData){
            if(srcData == 'import'){
                return img;
            }
            return `http://localhost:5500/apiBrg/images/${img}`

        },
        handleResize: function(){
            if(window.innerWidth < 1000){
                this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 65%, #057a55 35%)'
            }else{
                this.styleBg = 'background: linear-gradient(to top,  #FFFFFF 65%, #057a55 35%)'
            }
        },
        handlePlus: function(index, qty){
            let dataCart = this.dataCart;
            let dataTotal = this.dataTotal;
            
            dataCart[index].qty = qty + 1;
            dataTotal[index].totalSeluruh = dataTotal[index].totalHarga * dataCart[index].qty; 

            console.log(dataCart);

            localStorage.setItem('cart', JSON.stringify(dataCart));
            localStorage.setItem('totalHarga', JSON.stringify(dataTotal));
        },
        handleMinus: function(index, qty){
            let dataCart = this.dataCart;
            let dataTotal = this.dataTotal;

            dataCart[index].qty = qty - 1;

            if(dataCart[index].qty == 0){
                // Buat Hapus
                dataCart.splice(index, 1);
                dataTotal.splice(index, 1);
            }else{
                dataTotal[index].totalSeluruh = dataTotal[index].totalHarga * dataCart[index].qty; 
            }

            localStorage.setItem('cart', JSON.stringify(dataCart));
            localStorage.setItem('totalHarga', JSON.stringify(dataTotal));
        },
        getBrgNota: async function(){
            let token = localStorage.getItem('token');

            try {
                const responseBrg = await axios.get('http://localhost:5500/apiBrg/barang/', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                const responseNota = await axios.get('http://localhost:5500/apiJual/startTransaction/', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                this.dataBarang = responseBrg.data;
                this.dataNota = responseNota.data.nojual;

            } catch (err) {
                console.log(err);
                return null //wajib
            }
        },
        postTransaction: async function(){
            let token = localStorage.getItem('token');
            let dataCart = JSON.parse(localStorage.getItem('cart')) || []

            try {
                const resNota = await axios.post(`http://localhost:5500/apiJual/bukaNota/${this.dataNota}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                for (let i = 0; i < dataCart.length; i++) {
                    console.log(dataCart[i].id_barang);

                    let data = new FormData();
                    data.append('nojual_id', this.dataNota);
                    data.append('id_barang', dataCart[i].id_barang);
                    data.append('ukuran_cup', dataCart[i].ukuran_cup);
                    data.append('variant', dataCart[i].variant);
                    data.append('ice_cube', dataCart[i].ice_cube);
                    data.append('sweetness', dataCart[i].sweetness);
                    data.append('milk', dataCart[i].milk);
                    data.append('topping', JSON.stringify(dataCart[i].topping));
                    data.append('syrup', JSON.stringify(dataCart[i].syrup));
                    data.append('espresso', dataCart[i].espresso);
                    data.append('qty', dataCart[i].qty == null ? 1 : dataCart[i].qty);

                    const element = await axios.post(`http://localhost:5500/apiJual/detailPenjualan/`, data , {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    
                    if(element){
                        // alert(`Sukses diarray ke ${i}`)
                    }else{
                        console.warn(`Gagal diarray ke ${i}`)
                    }

                    // console.log(element);
                }

                console.log(resNota);

                this.$router.push(`/payment/${this.dataNota}`);
            } catch (error) {
                console.warn(error);
                return null
            }
        }
    }
}
</script>
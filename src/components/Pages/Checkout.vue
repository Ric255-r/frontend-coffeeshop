<template>
    <div>
        <!-- Template By JaxStone -->
        <!-- https://tailwindflex.com/@jaxstone/checkout-page-template -->
        <div class="min-h-screen py-8 poppins-regular checkout-page" :style="styleBg">
            <div class="container mx-auto px-4">
                <div class="text-center text-white mb-6">
                    <div class="text-sm uppercase tracking-wide text-emerald-50/90">CoffeeKu Cart</div>
                    <h1 class="text-3xl font-bold tracking-wide">Pesanan Sementara</h1>
                    <p class="text-sm text-emerald-50/80 mt-1">Review pesananmu sebelum lanjut ke pembayaran.</p>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-full">
                        <div class="bg-white/95 rounded-2xl shadow-2xl shadow-emerald-950/10 border border-white p-4 lg:p-6 mb-[100px] checkout-shell">
                            <div class="flex flex-wrap items-center mb-5">
                                <div class="w-8/12">
                                    <div class="font-bold text-stone-900">Daftar Minuman</div>
                                    <div class="text-xs text-stone-500">{{ showCart.cart.length }} item di keranjang</div>
                                </div>
                                <div class="w-4/12 text-right">
                                    <div class="inline-flex rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2 text-sm font-bold">
                                        Rp. {{ showTotalSemua }}
                                    </div>
                                </div>
                            </div>

                            <!-- Desktop/Tablet View (Original Table) -->
                            <div v-if="showCart.cart.length" class="checkout-table-wrap hidden md:block">
                                <table class="w-full mb-[30px] whitespace-nowrap checkout-table">
                                    <thead class="text-stone-600">
                                        <tr>
                                            <th class="text-left font-semibold">Beverages</th>
                                            <th class="text-left font-semibold">Price</th>
                                            <th class="text-left font-semibold">Quantity</th>
                                            <th class="text-left font-semibold">Total</th>
                                        </tr>
                                        <tr>
                                            <th colspan="4">
                                                <div class="mt-3 w-full h-[1px] bg-stone-100"></div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="border-b border-stone-100 last:border-0 checkout-row" v-for="(item, index) in showCart.cart" :key="index">
                                            <td class="py-4 lg:pr-4">
                                                <div class="flex items-center">
                                                    <template v-for="(item2, index2) in dataBarang" :key="index2">
                                                        <img class="h-20 w-20 mr-4 lg:block md:block sm:block hidden object-cover rounded-2xl shadow-md shadow-stone-900/10 border border-white" v-if="item.id_barang == item2.id" :src="getImg(item2.gambar[0], item2.source_data)" alt="Product image">
                                                    </template>
                                                    <span class="min-w-[230px]">
                                                        <span class="font-bold text-stone-900 text-base">
                                                            <router-link class="hover:text-emerald-700 transition" :to="{ name: 'BarangDetail', params: { id: item.id_barang},  query: { productOrder: index } }">{{ item.nama_barang }}</router-link>
                                                        </span> 
                                                        <div class="flex flex-wrap gap-x-2 gap-y-1.5 mt-1">
                                                            <span class="checkout-chip" v-if="item.ukuran_cup">
                                                                Cup: {{ item.ukuran_cup }}
                                                            </span> 
                                                            <span class="checkout-chip" v-if="item.ice_cube">
                                                                Ice: {{ item.ice_cube === 'NONE' ? 'No Ice' : item.ice_cube }}
                                                            </span> 
                                                            <span class="checkout-chip" v-if="item.espresso">
                                                                Espresso: {{ item.espresso === '0' ? 'Normal' : item.espresso }}
                                                            </span> 
                                                            <span class="checkout-chip" v-if="item.sweetness">
                                                                Sweetness: {{ item.sweetness }}
                                                            </span> 
                                                            <span class="checkout-chip" v-if="item.variant">
                                                                Variant: {{ item.variant }}
                                                            </span> 
                                                            <!-- Cara Pertama Utk Hilangkan Kurung Array -->
                                                            <span class="checkout-chip whitespace-normal" v-if="item.topping && item.topping.length > 0">
                                                                Topping: 
                                                                <span v-for="(items, index) in item.topping" :key="index">
                                                                    {{ items }}
                                                                    {{  index !== item.topping.length - 1 ? ', ': '' }}
                                                                </span>
                                                            </span> 
                                                            <!-- Cara Kedua utk Hilangkan Kurung Array -->
                                                            <span class="checkout-chip" v-if="item.syrup && item.syrup.length > 0">
                                                                Syrup: {{ Array.isArray(item.syrup) ? item.syrup.join(', ') : 'Tanpa Syrup' }}
                                                            </span> 
                                                            <span class="checkout-chip" v-if="item.milk">
                                                                Milk: {{ item.milk }}
                                                            </span> 
                                                        </div>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="py-4 font-semibold text-stone-700">Rp. {{ item.harga }}</td>
                                            <td class="py-4">
                                                <div class="flex items-center quantity-control">
                                                    <button 
                                                        class="border border-red-100 text-red-600 rounded-full lg:py-2 lg:px-4 md:py-2 md:px-4 py-1 px-3 mr-2 hover:bg-red-50 transition"
                                                        @click="handleMinus(index, item.qty == null ? 1 : item.qty)">-</button>

                                                    <span class="text-center w-8 font-bold text-stone-900">{{ item.qty == null ? 1 :  item.qty }}</span>
                                                    <button 
                                                        class="border border-emerald-100 text-emerald-700 rounded-full lg:py-2 lg:px-4 md:py-2 md:px-4 py-1 px-3 ml-2 hover:bg-emerald-50 transition" 
                                                        @click="handlePlus(index, item.qty == null ? 1 : item.qty)">
                                                    +
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="py-4 font-bold text-emerald-700">Rp {{ showCart.harga[index].totalSeluruh }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Mobile/Tablet View (Tokopedia-Style Cards) -->
                            <div v-if="showCart.cart.length" class="md:hidden space-y-4 mb-[30px]">
                                <div class="bg-stone-50/50 border border-stone-100 rounded-2xl p-4 flex flex-col gap-3" v-for="(item, index) in showCart.cart" :key="index">
                                    <div class="flex gap-3">
                                        <!-- Product Image -->
                                        <template v-for="(item2, index2) in dataBarang" :key="index2">
                                            <img class="h-20 w-20 object-cover rounded-2xl shadow-md shadow-stone-900/10 border border-white flex-shrink-0" v-if="item.id_barang == item2.id" :src="getImg(item2.gambar[0], item2.source_data)" alt="Product image">
                                        </template>
                                        
                                        <!-- Product details -->
                                        <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                            <div class="font-bold text-stone-900 text-base truncate">
                                                <router-link class="hover:text-emerald-700 transition" :to="{ name: 'BarangDetail', params: { id: item.id_barang},  query: { productOrder: index } }">{{ item.nama_barang }}</router-link>
                                            </div>
                                            
                                            <!-- Separator line -->
                                            <div class="h-[1px] bg-stone-100 my-1.5 w-full"></div>
                                            
                                            <div class="text-xs text-emerald-700 font-semibold">
                                                Rp. {{ item.harga }}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Structured Customization Grid (3 Columns) -->
                                    <div class="mt-2 flex flex-wrap text-[10px] text-stone-500 bg-stone-50 border border-stone-100/60 rounded-xl p-2.5">
                                        <div class="w-1/3 pr-1 mb-1.5 flex items-center">
                                            <i :class="`${item.variant === 'hot' ? 'fas fa-sun text-red-500' : 'far fa-snowflake text-cyan-500'} w-4 text-center mr-1.5`" title="Variant"></i>
                                            <span class="font-medium text-stone-700 capitalize">{{ item.variant }}</span>
                                        </div>
                                        <div class="w-1/3 px-0.5 mb-1.5 flex items-center">
                                            <i class="fas fa-mug-hot w-4 text-center mr-1.5 text-stone-400" title="Cup Size"></i>
                                            <span class="font-medium text-stone-700 uppercase">Cup {{ item.ukuran_cup }}</span>
                                        </div>
                                        <div class="w-1/3 pl-1 mb-1.5 flex items-center">
                                            <i class="fas fa-cube w-4 text-center mr-1.5 text-stone-400" title="Ice"></i>
                                            <span class="font-medium text-stone-700 capitalize">{{ item.ice_cube === 'NONE' ? 'No Ice' : item.ice_cube.toLowerCase() + ' ice' }}</span>
                                        </div>
                                        <div class="w-1/3 pr-1 mb-1.5 flex items-center">
                                            <i class="fas fa-coffee w-4 text-center mr-1.5 text-stone-400" title="Espresso"></i>
                                            <span class="font-medium text-stone-700 capitalize">{{ item.espresso === '0' ? 'Normal' : item.espresso }}</span>
                                        </div>
                                        <div class="w-1/3 px-0.5 mb-1.5 flex items-center">
                                            <i class="fas fa-cubes w-4 text-center mr-1.5 text-stone-400" title="Sweetness"></i>
                                            <span class="font-medium text-stone-700 capitalize">{{ item.sweetness.toLowerCase() + ' sweetness' }}</span>
                                        </div>
                                        <div class="w-1/3 pl-1 mb-1.5 flex items-center">
                                            <i class="fas fa-cow w-4 text-center mr-1.5 text-stone-400" title="Milk"></i>
                                            <span class="font-medium text-stone-700 capitalize">{{ item.milk.toLowerCase() + ' milk' }}</span>
                                        </div>
                                        
                                        <div class="w-full mt-1.5 pt-1.5 border-t border-stone-200/50 flex items-start">
                                            <i class="fas fa-prescription-bottle w-4 text-center mr-1.5 mt-0.5 text-stone-400" title="Syrup"></i>
                                            <span class="font-medium text-stone-700 text-left flex-1">
                                                {{ item.syrup && item.syrup.length > 0 ? (Array.isArray(item.syrup) ? item.syrup.join(', ') : item.syrup) : 'Tanpa Syrup' }}
                                            </span>
                                        </div>
                                        <div class="w-full mt-1 flex items-start">
                                            <i class="fas fa-cookie-bite w-4 text-center mr-1.5 mt-0.5 text-stone-400" title="Topping"></i>
                                            <span class="font-medium text-stone-700 text-left flex-1">
                                                {{ item.topping && item.topping.length > 0 ? (Array.isArray(item.topping) ? item.topping.join(', ') : item.topping) : 'Tanpa Topping' }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <!-- Separator line -->
                                    <div class="h-[1px] bg-stone-100 w-full"></div>
                                    
                                    <!-- Quantity and Total Price on bottom row (Tokopedia Style) -->
                                    <div class="flex items-center justify-between mt-1">
                                        <div class="text-sm text-stone-500 font-semibold">
                                            Total: <span class="text-emerald-700 font-bold">Rp {{ showCart.harga[index].totalSeluruh }}</span>
                                        </div>
                                        
                                        <div class="flex items-center quantity-control">
                                            <button 
                                                class="border border-red-100 text-red-600 rounded-full py-1 px-3 hover:bg-red-50 transition font-bold"
                                                @click="handleMinus(index, item.qty == null ? 1 : item.qty)">-</button>
                                            <span class="text-center w-8 font-bold text-stone-900 text-sm">{{ item.qty == null ? 1 :  item.qty }}</span>
                                            <button 
                                                class="border border-emerald-100 text-emerald-700 rounded-full py-1 px-3 hover:bg-emerald-50 transition font-bold" 
                                                @click="handlePlus(index, item.qty == null ? 1 : item.qty)">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Standalone Empty Cart State -->
                            <div v-if="!showCart.cart.length" class="py-12">
                                <div class="mx-auto max-w-sm rounded-2xl bg-stone-50 border border-stone-100 p-6 text-center">
                                    <div class="text-4xl text-emerald-700 mb-3"><i class="fas fa-mug-hot"></i></div>
                                    <div class="font-bold text-stone-900">Tidak Ada List Minuman</div>
                                    <div class="text-sm text-stone-500 mt-1">Keranjangmu masih kosong.</div>
                                    <router-link to="/home" class="inline-block mt-4 rounded-xl bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800 transition">Pilih Menu</router-link>
                                </div>
                            </div>

                            <form v-if="showCart.cart.length" method="post" @submit.prevent="postTransaction" class="checkout-action">
                                <div class="flex flex-wrap items-center">
                                    <div class="w-full md:w-7/12 text-stone-500 text-sm mb-3 md:mb-0">
                                        Pastikan semua item sudah sesuai sebelum checkout.
                                    </div>
                                    <div class="w-full md:w-5/12">
                                        <button type="submit" class="bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-xl w-full shadow-lg shadow-emerald-900/20 transition font-semibold">Checkout</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <NavbarBottom></NavbarBottom>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarBottom from './NavbarBottom.vue';
import { getCart, setCart, getTotalHarga, setTotalHarga } from '@/utils/cartStorage'

export default {
    name: 'checkout-component',
    components: {
        NavbarBottom
    },
    data: function(){
        return {
            dataCart: getCart(),
            dataBarang: [],
            dataTotal: getTotalHarga(),
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
            return `http://localhost:5500/api/images/${img}`

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

            setCart(dataCart);
            setTotalHarga(dataTotal);
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

            setCart(dataCart);
            setTotalHarga(dataTotal);
        },
        getBrgNota: async function(){
            let token = localStorage.getItem('token');

            try {
                const responseBrg = await axios.get('http://localhost:5500/api/barang/', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                const responseNota = await axios.get('http://localhost:5500/api/startTransaction/', {
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
            let dataCart = getCart()

            try {
                const resNota = await axios.post(`http://localhost:5500/api/bukaNota/${this.dataNota}`, {
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

                    const element = await axios.post(`http://localhost:5500/api/detailPenjualan/`, data , {
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

<style scoped>
.checkout-page {
    background-attachment: fixed;
}

.checkout-shell {
    background:
        linear-gradient(135deg, rgba(236, 253, 245, 0.72), rgba(255, 255, 255, 0.98) 28%),
        #ffffff;
}

.checkout-table-wrap {
    overflow-x: auto;
}

.checkout-table {
    border-collapse: separate;
    border-spacing: 0;
}

.checkout-table th {
    padding: 0.75rem 1rem;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.checkout-row {
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.checkout-row:hover {
    background: rgba(236, 253, 245, 0.42);
}

.checkout-row td {
    padding-left: 1rem;
    padding-right: 1rem;
    vertical-align: middle;
}

.checkout-chip {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
    border: 1px solid #e2ece6;
    background: #f8faf8;
    color: #57534e;
    font-size: 0.72rem;
    line-height: 1.2;
}

.quantity-control {
    width: max-content;
    border-radius: 9999px;
    background: #f8faf8;
    border: 1px solid #edf2ef;
    padding: 0.25rem;
}

.checkout-action {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background: #f8faf8;
    border: 1px solid #edf2ef;
}

@media (max-width: 768px) {
    .checkout-table {
        min-width: 760px;
    }
}
</style>

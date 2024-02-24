<template>
    <div v-if="dataCart.length">
        <div v-for="(items, index) in dataCart" :key="index">
            <div>{{ items.nama_barang }}</div>
        </div>
    </div>
    <div v-else>
        Belum Ada CheckoutAn
    </div>
</template>

<script>
export default {
    name: 'checkout-component',
    data: function(){
        return {
            dataCart: JSON.parse(localStorage.getItem('cart')) || []
        }
    }
}
</script>
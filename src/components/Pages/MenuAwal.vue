<template>
    <div>
        <BarangVue></BarangVue>

        <NavbarBottom></NavbarBottom>
    </div>
</template>

<script>
import NavbarBottom from './NavbarBottom.vue';
import BarangVue from './Barang.vue';

export default {
    name: 'menu-awal',
    components: {
        NavbarBottom,
        BarangVue
    },

}
</script>
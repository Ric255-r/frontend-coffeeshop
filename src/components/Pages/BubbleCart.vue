<template>
    <div v-if="totalHarga.length > 0" class="sticky bottom-[4rem]">
        <div class="flex flex-wrap text-white">
            <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

            </div>
            <div class="hover:animate-jump lg:w-8/12 md:w-8/12 sm:w-8/12 py-2 w-full bg-green-600 cursor-pointer rounded-full" @click="handleClick">
                <div class="flex flex-wrap">
                    <div class="w-1/12 pl-5">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="w-9/12">
                        Checkout {{ totalHarga.length }} Item
                    </div>
                    <div class="w-2/12">
                        Rp. {{ showTotal }}
                    </div>
                </div>
            </div>
            <div class="lg:w-2/12 md:w-2/12 sm:w-2/12 hidden lg:block md:block sm:block">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "bubble-cart",
    data: function(){
        return {
            totalHarga: JSON.parse(localStorage.getItem("totalHarga")) || []
        }
    },
    computed: {
        showTotal: function(){
            let total = 0;

            for(let i = 0; i < this.totalHarga.length; i++){
                total += this.totalHarga[i].totalSeluruh;
            }

            return total;
        }
    },
    methods: {
        handleClick: function(){
            this.$router.push('/checkout');
        }
    }
}
</script>
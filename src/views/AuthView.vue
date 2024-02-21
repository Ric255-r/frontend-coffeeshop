<template>
<div class="container">
    <div class="flex flex-wrap items-center justify-center h-screen">
        <div class="w-4/6 h-auto">
            <!-- Box div wrapping child elements -->
            <div class="bg-gray-200 rounded-lg">
                <div class="flex py-[50px] flex-wrap items-center justify-center">
                    <div class="w-2/6">
                        <img :src="require('@/assets/coffeehome.png')" alt="" class="object-cover animate-fade-left">
                    </div>
                    <div class="w-2/6">
                        <login-component></login-component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


</template>

<script>
import LoginComponent from '../components/Auth/Login.vue'

export default {
    name: 'auth-view',
    components: {
        LoginComponent
    }
}
</script>
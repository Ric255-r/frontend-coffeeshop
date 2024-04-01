<!-- Referensi https://www.youtube.com/watch?v=YyQUdyak3i4 -->
<template>
  <div class="bgAbu">
    <section class="flex gap-6">
      <div :class="`bg-[#0e0e0e] min-h-screen ${stateNavbar ? ' w-72' : ' w-16'} duration-500 px-4 text-gray-100`" >
        <div class="py-3 flex justify-end cursor-pointer sticky top-0" @click="openNavbar(!stateNavbar)">
          <i class="fas fa-ellipsis-h" style="height: 20px; width: 20px;"></i>
        </div>
        <div class="mt-4 flex flex-col gap-4 relative sticky top-[60px]">
          <!-- Ntr Bagian ini di loop -->
          <router-link  
            v-for="(item, index) in menuLoop" 
            :key="index" 
            :class="`${item.margin ? 'mt-5 ': ''} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`"
            :to="item.link">
              
            <div><i :class="item.icon"></i></div>

            <h2 
                :style="`transition-delay: ${index + 3}00ms`" 
                :class="`whitespace-pre duration-500 ${!stateNavbar ? 'opacity-0 translate-x-28 overflow-hidden' : ''}`"
                >
                {{ item.name }}
            </h2>
            <h2 :class="`${stateNavbar ? 'hidden ' : ''} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`">{{ item.name }}</h2>
          </router-link>

        </div>
      </div>
      <div class="m-3 text-xl text-gray 900 font-semibold w-full">
          <!-- Sama kaya outlet di react -->
        <router-view class="animate-fade-left"></router-view>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'dashboard-admin',
  data: function(){
    return {
        stateNavbar: true
    }
  },
  computed: {
    menuLoop: function(){
      const menu = [
        {
          name: "Dashboard", 
          link: '/admin',
          icon: 'fas fa-bars'
        },
        {
          name: "Order List", 
          link: '/admin/order',
          icon: 'fas fa-shopping-cart'
        },
        {
          name: "Penjualan", 
          link: '/admin/penjualan',
          icon: 'fas fa-dollar-sign'
        },
        {
          name: "Input Data Menu", 
          link: '/admin/barang',
          icon: 'fas fa-pencil-alt',
          margin: true
        },
        {
          name: "File Manager", 
          link: '/',
          icon: 'fas fa-file'
        },
        {
          name: "Data User",
          link: '/admin/daftaruser',
          icon: 'fas fa-user',
          margin: true
        },
        // {
        //     name: "Saved",
        //     link: '/',
        //     icon: 'fas fa-save'
        // }
      ];

      return menu;
    }
  },
  methods: {
    openNavbar: function(state){
        this.stateNavbar = state;
    }
  }
}
</script>

<style scoped>
.bgAbu {
    background-color: #F1F2F7;
}
</style>

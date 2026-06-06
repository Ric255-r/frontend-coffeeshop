<template>
  <!-- <Splide :options="aturan" aria-label="My Favorite Images">
    <SplideSlide data-splide-interval="2500">
      <img class="max-w-full h-auto" :src="require('@/assets/milklatte-banner.jpg')" alt="Sample 1">
    </SplideSlide>
    <SplideSlide data-splide-interval="2500">
      <img class="max-w-full h-auto" :src="require('@/assets/coffee-bread.jpg')" alt="Sample 2">
    </SplideSlide>
  </Splide> -->
  <div ref="splide" class="splide coffee-splide w-full">
    <div class="splide__track shadow-xl shadow-emerald-950/15 border border-white/70" style="border-radius: 1.25rem;">
        <ul class="splide__list">

            <li class="splide__slide">
                <img class="w-full h-full object-cover" :src="require('@/assets/coffeebanner3.jpg')" alt="Sample 3" @load="refreshSplide">
            </li>
            <li class="splide__slide">
                <img class="w-full h-full object-cover" :src="require('@/assets/coffeebanner4.jpg')" alt="Sample 4" @load="refreshSplide">
            </li>
            <li class="splide__slide">
                <img class="w-full h-full object-cover" :src="require('@/assets/milklatte-banner.jpg')" alt="Sample 1" @load="refreshSplide">
            </li>
            <li class="splide__slide">
                <img class="w-full h-full object-cover" :src="require('@/assets/coffee-bread.jpg')" alt="Sample 2" @load="refreshSplide">
            </li>

            <!-- <li class="splide__slide">Slide 03</li> -->
        </ul>
    </div>
  </div>
</template>


<script>
// Default theme
import '@splidejs/vue-splide/css';

import Splide from '@splidejs/splide';


export default {
  components: {
    // Splide,
    // SplideSlide,
  },
  setup: function(){
    // const option = {
    //     rewind: true,
    //     gap: '1rem',
    //     autoplay: true,
    //     // heightRatio: 0.2,
    //     height: '300px'
    //     // width: '95%'
    //     // padding: { left: 10, right: 100 }
    // }

    // return { aturan: option }
  },
  data: function(){
    return {
      splide: null
    }
  },
  mounted: function(){
    // let banner = document.getElementById('splide01-track');
    // banner.classList.add('rounded-tl-lg');
    // banner.classList.add('rounded-br-lg');
    this.$nextTick(() => {
      this.splide = new Splide(this.$refs.splide, {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: 0,
        autoplay: true,
        arrows: true,
        pagination: true,
        // heightRatio: 0.2,
        height: '168px',
      });
      this.splide.mount();

      setTimeout(() => {
        this.refreshSplide();
      }, 150);
    });
  },
  beforeUnmount: function(){
    if(this.splide){
      this.splide.destroy();
      this.splide = null;
    }
  },
  methods: {
    refreshSplide: function(){
      if(this.splide){
        this.splide.refresh();
      }
    }
  }
};
</script>

<style scoped>
.coffee-splide :deep(.splide__track) {
  overflow: hidden;
}

.coffee-splide :deep(.splide__slide) {
  border-radius: 1.25rem;
  overflow: hidden;
}

.coffee-splide img {
  display: block;
}
</style>

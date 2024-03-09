<template>
  <!-- <Splide :options="aturan" aria-label="My Favorite Images">
    <SplideSlide data-splide-interval="2500">
      <img class="max-w-full h-auto" :src="require('@/assets/milklatte-banner.jpg')" alt="Sample 1">
    </SplideSlide>
    <SplideSlide data-splide-interval="2500">
      <img class="max-w-full h-auto" :src="require('@/assets/coffee-bread.jpg')" alt="Sample 2">
    </SplideSlide>
  </Splide> -->
  <div class="splide">
    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide">
                <img class="max-w-full h-auto" :src="require('@/assets/milklatte-banner.jpg')" alt="Sample 1">
            </li>
            <li class="splide__slide">
                <img class="max-w-full h-auto" :src="require('@/assets/coffee-bread.jpg')" alt="Sample 2">
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
  mounted: function(){
    // let banner = document.getElementById('splide01-track');
    // banner.classList.add('rounded-tl-lg');
    // banner.classList.add('rounded-br-lg');
    var splide = new Splide( '.splide' , {
        type: 'loop',
        gap: '1rem',
        autoplay: true,
        // heightRatio: 0.2,
        height: '168px'
    });
    splide.mount();
  }
};
</script>